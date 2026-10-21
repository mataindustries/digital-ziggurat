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

The current candidate uses the supplied V4.2 review movie. The detector glitches
during the approach, then its entity count returns from `ERR` to `0` at frame
1192 (19.8667 s at 60 fps). This is distinct from `RANGE: 0.00 m` at frame 1143.
The original audio is preserved. V4.1 media, data and evidence remain backed up
privately outside `public/`, and the original private review archive is retained.

The local `release/dead-channel-v4.2` branch starts from current main's GA4
merge `136d1f1` and replays the two completed showcase commits. The original
`feature/dead-channel-showcase` branch remains at `89c51e0`. Shoot the Moon stays
the sole flagship; DEAD CHANNEL is the third major project. All three HTML
entrypoints use the approved GA4 measurement ID `G-QBSGMKSJLT` exactly once.

This candidate has **not been published**. The film, stills, silent preview and
caption sidecar remain ignored under `public/media/dead-channel/`. A code-only
checkout builds without the private media; audiovisual review requires staging
the owner's unchanged V4.2 master. See [the media workflow](tools/dead-channel/README.md).
Never add private media to public Git or upload `dist/` before release approval.

```sh
npm run build
npm run preview -- --host 127.0.0.1
# Local review: http://127.0.0.1:4173/work/dead-channel/
npm run build:release # intentionally blocked pending final approvals
```

Owner-supplied credits, picture correction and preservation of the original
right-sided stereo mix are approved. `src/data/deadChannelRelease.json` records
that scope. Final captions and public release remain unapproved; the release
check must fail until those decisions are explicitly granted. `noindex` is a
crawler hint, not access control: review stays local or in owner-only storage.

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

Public activation must update private labels, robots and sitemap, verify complete
media injection in a private deployment workspace, and use `npm run build:release`.
The media can remain excluded from public Git. No VideoObject upload date is
invented; the existing CreativeWork metadata does not need one.

Public AI-readable files live in:

```text
public/ai.json
public/projects.json
public/llms.txt
```
