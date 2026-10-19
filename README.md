# The Digital Ziggurat

A standalone Vite React public site for Sergio's cinematic proof-of-work monument.

## Local setup

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The generated `dist/` folder is compatible with Cloudflare Pages.

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Framework preset: Vite

## Editing content

Project cards, ziggurat tier mapping, and build log entries live in:

```text
src/data/projects.js
```

The Shoot the Moon case study is a second Vite page entry at `/work/shoot-the-moon/`:

```text
work/shoot-the-moon/index.html      page title, canonical and social tags
src/case-study.jsx                  page sections
src/data/shootTheMoonCaseStudy.js   copy, with the commit its facts were verified against
src/case-study.css                  page-only styles
```

Components shared by all pages live in `src/shared.jsx`.

## DEAD CHANNEL private review

The local `feature/dead-channel-showcase` candidate adds DEAD CHANNEL as the third
major project and `/work/dead-channel/` as a real Vite entry. Shoot the Moon remains
the sole flagship. Analytics draft PR #10 is independent and is not included here.

This candidate has **not been published**. The film, extracted stills and silent
preview are ignored under `public/media/dead-channel/`. A code-only checkout builds
without them; audiovisual review requires privately staging the owner's master.
See [the media workflow](tools/dead-channel/README.md) for exact preparation and
verification commands. Never add these ignored files to the public repository
without explicit release approval.

```sh
npm run build
npm run preview -- --host 127.0.0.1
# Local review: http://127.0.0.1:4173/work/dead-channel/
npm run check:dead-channel:release
```

The release check intentionally fails until the owner approves publication,
credits, a complete transcript and descriptive captions, and the tutorial's
approximately 20 dB right-channel bias. The original mix is unchanged. `noindex`
is a crawler hint, not access control; keep review local or behind a separately
approved authenticated private host. Do not deploy this candidate to public Pages.

`src/data/deadChannelSignal.json` contains the supplied 250 ms stereo observations
and separately attributed fine-window/frame events. `deadChannelFilm.json` is its
generated small identity manifest, used by the homepage without loading the entire
measurement dataset. The source count is a supplied production fact, not a map.
Signal Trace exposes the measurements and silent seeking; it makes no claim of
interactive spatial rendering. The unavailable original EVENT_MAP.json blocks only
the deferred Transmission Room and map-based artwork. No source dots are drawn.

Captions support is wired but no VTT or spoken dialog is fabricated. The page's
viewing notes are explicitly incomplete. After caption approval, set the project's
`media.captions` to the reviewed VTT and replace the private caption status with the
approved transcript. Public release also requires approved delivery metadata,
removing the private robots tag, adding the sitemap URL, and using an actual
publication date if adding VideoObject structured data.

Public AI-readable files live in:

```text
public/ai.json
public/projects.json
public/llms.txt
```
