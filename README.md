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

The generated `dist/` folder is compatible with Cloudflare Pages. The approved
DEAD CHANNEL media must be staged separately before building the public site.

## Cloudflare Pages

- Build command: `npm run build:release`
- Build output directory: `dist`
- Framework preset: Vite
- Automatic production and preview Git deployments: disabled

Use the guarded [V4.2 release procedure](tools/dead-channel/RELEASE.md).

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

## DEAD CHANNEL V4.2

The approved release uses the supplied V4.2 movie. The detector glitches
during the approach, then its entity count returns from `ERR` to `0` at frame
1192 (19.8667 s at 60 fps). This is distinct from `RANGE: 0.00 m` at frame 1143.
The original audio is preserved. V4.1 media, data and evidence remain backed up
privately outside `public/`, and the original private review archive is retained.

The local `release/dead-channel-v4.2` branch starts from current main's GA4
merge `136d1f1` and replays the two completed showcase commits. The original
`feature/dead-channel-showcase` branch remains at `89c51e0`. Shoot the Moon stays
the sole flagship; DEAD CHANNEL is the third major project. All three HTML
entrypoints use the approved GA4 measurement ID `G-QBSGMKSJLT` exactly once.

The owner has authorized public release of the complete corrected candidate.
The film, stills, silent preview and
caption sidecar remain ignored under `public/media/dead-channel/`. A code-only
checkout must fail the public build without those media; deployment requires staging
the owner's unchanged V4.2 master. See [the media workflow](tools/dead-channel/README.md).
Never add the movie or private review package to public Git.

```sh
npm run build:release
npm run preview -- --host 127.0.0.1
# Local verification: http://127.0.0.1:4173/work/dead-channel/
```

Owner-supplied credits, picture correction, preservation of the original
right-sided stereo mix, corrected captions and public release are approved.
`src/data/deadChannelRelease.json` records that authorization. The release
check still fails if the complete verified media and captions are absent.

`src/data/deadChannelCaptions.json` is the single source for nine English SDH
cues and the descriptive transcript. The metadata build validates cue timing,
reading speed and the 22-second film identity, generates the private VTT when
the film is staged, and synchronizes the no-JavaScript transcript and credits.
The owner identifies the final sound as the intentionally right-weighted spirit
convergence effect. The final cue is `[Spirits swarm on the right]` at
20.450–22.000 s. The fictional tutorial is the visual punchline, not an identified
audio source. No speech transcription is pending for this effect.

`src/data/deadChannelSignal.json` retains all 88 supplied 250 ms stereo bins and
separately attributed fine-window/frame events. The homepage uses its generated
small identity manifest `deadChannelFilm.json`. Signal Trace provides measured
observations and silent seeking. The unavailable EVENT_MAP.json continues to
defer only the Transmission Room and map artwork; no source positions are invented.

Public activation uses the approved patch for labels, robots and sitemap. Verify
complete media staging in a private deployment workspace and use `npm run build:release`.
The media remains excluded from public Git. No VideoObject upload date is
invented; the existing CreativeWork metadata does not need one.

Public AI-readable files live in:

```text
public/ai.json
public/projects.json
public/llms.txt
```

For a code-only content review without the separately staged DEAD CHANNEL media,
run `npm run metadata:code`. This regenerates the public metadata and static proof
page while reporting the six known missing film assets. Other missing public assets
and inconsistent homepage metadata still fail. This command does not validate
captions or produce a release build. The standard `metadata`, `build` and
`build:release` commands retain their caption and media requirements.
