# Reference prototype — reel titles

Not production code. It exists so the cue sheet (`../reel-titles.cues.json`) has one executable
reading: the style frames in `../style-frames/` and the review preview were rendered with it.
The production renderer belongs in `mataindustries/shootthemoon` (see the implementation spec
in `../MOTION_TREATMENT.md`) and must reproduce these frames.

- `titles.html` — a 1920×1080 SVG stage. `window.renderFrame(f, opts)` rebuilds the stage for
  reel frame `f` from the cue sheet. It is a pure function of `f`: no CSS animation or
  transition, no timers, no clock reads.
- `render.cjs` — Playwright/Chromium driver. Embeds the fonts as data URLs, waits for them, then
  screenshots the stage.
- `fonts/` — Saira (variable, `wdth` 50–125, `wght` 100–900) and IBM Plex Mono Light, Regular
  and Medium, from `google/fonts` (`ofl/saira`, `ofl/ibmplexmono`). Both are SIL OFL 1.1; the
  licence texts are next to them.

```sh
# a style frame over a reel frame, over black, or transparent
ffmpeg -i reel-57s-1080.mp4 -vf "select=eq(n\,530)" -vsync 0 -frames:v 1 plate.png
node render.cjs frames out 530:plate.png 3455:black 1230:none

# the transparent titles layer, named by reel frame (000036.png …)
node render.cjs overlay out 36-142 432-574 792-863 1152-1289 1800-1864 2016-2159 2448-2842 3168-3455
```

Plate moves (the slow pushes on held frames) are not rendered here: they are an ffmpeg step on
the footage, specified in the treatment.
