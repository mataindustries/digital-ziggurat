import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const captions = JSON.parse(
  readFileSync(new URL('src/data/deadChannelCaptions.json', root)),
);
const release = JSON.parse(
  readFileSync(new URL('src/data/deadChannelRelease.json', root)),
);
const film = JSON.parse(
  readFileSync(new URL('src/data/deadChannelFilm.json', root)),
);
assert.equal(captions.filmSha256, film.sha256);
assert.equal(captions.duration, film.duration);
let previousEnd = 0;
const timestamp = (time) =>
  new Date(Math.round(time * 1000)).toISOString().slice(11, 23);
const escape = (text) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
for (const cue of captions.cues) {
  assert.ok(Number.isFinite(cue.start) && Number.isFinite(cue.end));
  assert.ok(
    cue.start >= previousEnd &&
      cue.end <= film.duration &&
      cue.end - cue.start >= 1,
    `Invalid timing: ${cue.id}`,
  );
  assert.ok(
    cue.text && !/[<>]/.test(cue.text),
    `Invalid caption text: ${cue.id}`,
  );
  assert.ok(
    cue.text.split('\n').length <= 2 &&
      cue.text.split('\n').every((line) => line.length <= 42),
  );
  assert.ok(
    cue.text.length / (cue.end - cue.start) <= 20,
    `Caption too fast: ${cue.id}`,
  );
  previousEnd = cue.end;
}
const convergence = captions.cues.find(({ id }) => id === 'right-convergence');
assert.equal(convergence.start, 20.45);
assert.equal(convergence.end, 22);
assert.equal(convergence.text, '[Spirits swarm on the right]');
assert.equal(
  captions.dialoguePresent,
  false,
  'The owner identified the final sound as the spirit convergence effect',
);
// Only stage the sidecar when the owner has staged the private movie. Code-only
// checkouts still build; their missing media cannot pass the public-release gate.
const media = new URL('public/media/dead-channel/', root);
if (existsSync(new URL('film-22s-1280x720p60.mp4', media))) {
  mkdirSync(media, { recursive: true });
  const vtt =
    'WEBVTT\n\n' +
    captions.cues
      .map(
        (cue) =>
          `${cue.id}\n${timestamp(cue.start)} --> ${timestamp(cue.end)} line:10% position:50% size:90% align:center\n${cue.text}\n`,
      )
      .join('\n');
  writeFileSync(new URL('captions-en.vtt', media), vtt);
}
const entry = new URL('work/dead-channel/index.html', root);
const block = `<!-- BEGIN GENERATED ACCESSIBLE FILM TEXT -->
      <h2>Descriptive transcript</h2>
      <p>${escape(captions.soundDescriptionNote)}</p>
      <ol>${captions.transcript.map(({ time, text }) => `<li><strong>${escape(time)}.</strong> ${escape(text)}</li>`).join('')}</ol>
      <p><a href="/media/dead-channel/captions-en.vtt">English SDH captions (${escape(captions.status)})</a></p>
      <h2>Credits</h2>
      ${release.credits.map((line) => `<p>${escape(line)}</p>`).join('\n      ')}
      <!-- END GENERATED ACCESSIBLE FILM TEXT -->`;
const html = readFileSync(entry, 'utf8');
writeFileSync(
  entry,
  html.replace(
    /<!-- BEGIN GENERATED ACCESSIBLE FILM TEXT -->[\s\S]*?<!-- END GENERATED ACCESSIBLE FILM TEXT -->/,
    block,
  ),
);
console.log(
  `DEAD CHANNEL: ${captions.cues.length} readable, nonoverlapping English SDH cues validated against ${film.duration} s; final sound: owner-confirmed right-weighted spirit convergence.`,
);
