// REFERENCE PROTOTYPE (not production) for the reel-titles cue sheet: renders style frames and the
// transparent titles layer used for the preview. See README.md in this folder.
// usage:
//   node render.cjs frames <out-dir> <frame>:<plate.png|black|none> ...   (style frames over a plate)
//   node render.cjs overlay <out-dir> <from>-<to> [<from>-<to> ...]       (transparent RGBA PNGs named by reel frame)
const fs = require('fs');
const path = require('path');
// Uses whichever Playwright is installed (the shootthemoon repo has @playwright/test).
const { chromium } = (() => {
  for (const id of ['playwright', '@playwright/test', '/opt/node22/lib/node_modules/playwright']) {
    try { return require(id); } catch {}
  }
  throw new Error('Playwright not found: npm i -D playwright (or run from the shootthemoon repo)');
})();

const here = __dirname;
const cues = JSON.parse(fs.readFileSync(path.join(here, '..', 'reel-titles.cues.json'), 'utf8'));
const font = (file, family, weight, extra = '') =>
  `@font-face{font-family:'${family}';src:url(data:font/ttf;base64,${fs.readFileSync(path.join(here, 'fonts', file)).toString('base64')}) format('truetype');font-weight:${weight};${extra}}`;
const fonts = [
  font('Saira-VF.ttf', 'Saira', '100 900', 'font-stretch:50% 125%;'),
  font('IBMPlexMono-Light.ttf', 'IBM Plex Mono', 300),
  font('IBMPlexMono-Regular.ttf', 'IBM Plex Mono', 400),
  font('IBMPlexMono-Medium.ttf', 'IBM Plex Mono', 500),
].join('\n');
const html = fs.readFileSync(path.join(here, 'titles.html'), 'utf8').replace('/*FONTS*/', fonts).replace('/*CUES*/null', JSON.stringify(cues));

const dataUrl = (file) => (file.endsWith('.jpg') ? 'data:image/jpeg;base64,' : 'data:image/png;base64,') + fs.readFileSync(file).toString('base64');

(async () => {
  const [mode, outDir, ...rest] = process.argv.slice(2);
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  await page.setContent(html);
  await page.evaluate(() => Promise.all([
    document.fonts.load("500 36px 'Saira'"), document.fonts.load("300 128px 'Saira'"), document.fonts.load("400 26px 'Saira'"),
    document.fonts.load("300 16px 'IBM Plex Mono'"), document.fonts.load("400 16px 'IBM Plex Mono'"), document.fonts.load("500 16px 'IBM Plex Mono'")]));
  await page.evaluate(() => document.fonts.ready);
  const ok = await page.evaluate(() => [
    document.fonts.check("36px 'Saira'"), document.fonts.check("300 16px 'IBM Plex Mono'"),
    document.fonts.check("400 16px 'IBM Plex Mono'"), document.fonts.check("500 16px 'IBM Plex Mono'")]);
  if (ok.includes(false)) throw new Error('fonts not loaded: ' + ok);
  // warm up text layout so the first measured frame is stable
  await page.evaluate(() => window.renderFrame(3400, { blackPlate: true }));
  const stage = await page.$('#stage');
  if (mode === 'frames') {
    for (const spec of rest) {
      const [f, plate] = spec.split(':');
      const opts = plate === 'black' ? { blackPlate: true } : plate === 'none' || !plate ? {} : { plate: dataUrl(plate) };
      await page.evaluate(([fr, o]) => window.renderFrame(fr, o), [Number(f), opts]);
      await stage.screenshot({ path: path.join(outDir, `sf_${String(f).padStart(4, '0')}.png`), omitBackground: !plate || plate === 'none' });
      console.log('frame', f);
    }
  } else if (mode === 'overlay') {
    for (const range of rest) {
      const [from, to] = range.split('-').map(Number);
      for (let f = from; f <= to; f++) {
        await page.evaluate((fr) => window.renderFrame(fr, {}), f);
        await stage.screenshot({ path: path.join(outDir, `${String(f).padStart(6, '0')}.png`), omitBackground: true });
      }
      console.log('overlay', from, to);
    }
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
