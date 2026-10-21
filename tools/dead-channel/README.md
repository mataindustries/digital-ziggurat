# DEAD CHANNEL private media and measurement tools

These tools prepare a **private local review**, not a publication. The repository is public; film bytes, stills and derivatives are ignored before preparation. There is no owner approval to commit media, push, merge or deploy. The original is never modified, remuxed, normalized, retitled or upscaled. The local film is an exact file copy, including its original private metadata.

Requirements: Python 3.11+, FFmpeg/ffprobe and NumPy (for independent signal remeasurement and revision comparison). No runtime JavaScript dependency is added. Commands accept private input paths; no staging location or credential is embedded in code.

```sh
bash tools/dead-channel/prepare_media.sh --input /private/path/DEAD_CHANNEL_V4_2_REVIEW.mp4
bash tools/dead-channel/verify_media.sh --input /private/path/DEAD_CHANNEL_V4_2_REVIEW.mp4
node scripts/generate-dead-channel-captions.mjs
python3 -I tools/dead-channel/measure_master.py \
  --input /private/path/DEAD_CHANNEL_V4_2_REVIEW.mp4 \
  --profile /private/path/master_stereo_profile_250ms.txt \
  --reference-script /private/path/measure_master_reference.py \
  --blueprint /private/path/DEAD_CHANNEL_ZIGGURAT_BLUEPRINT.md
python3 -I tools/dead-channel/verify_revision.py \
  --input /private/path/DEAD_CHANNEL_V4_2_REVIEW.mp4 \
  --baseline /private/backup-v41/media/film-22s-1280x720p60.mp4 \
  --baseline-signal /private/backup-v41/data/deadChannelSignal.json
node scripts/check-dead-channel.mjs
node scripts/check-dead-channel.mjs --release
```

Before replacing media, preserve V4.1 media, data and verification logs in a private directory outside `public/` and `dist/`, with a SHA-256 manifest. Never overwrite that backup or the original private review package. The active V4.2 review source must match SHA-256 `43cab0916f52519afcb67c96a3d69aa3ff6e891ba7cd0a43e9f104aefa918fc9` (20,554,922 bytes). The version label is **V4.2 review**; the owner has approved the picture correction for final preparation, while public release remains unapproved.

The last command intentionally fails while release gates remain unresolved. It cannot be used to approve a release. `--check` on `measure_master.py` compares both generated JSON files without writing them. `deadChannelFilm.json` is the small shared film-identity projection for the homepage; measurement windows remain in the case-study bundle. Re-decoding all 88 windows is independent of the supplied profile parser and uses the reference algorithm and rounding precision; any mismatch fails. Missing/undefined correlations serialize as `null`, never fabricated zeros.

`prepare_media.sh` verifies the original SHA-256 before writing, verifies the destination is already gitignored, and creates:

- `film-22s-1280x720p60.mp4`: exact original bytes; 22 s, 1,320 frames, native 1280×720 at 60 fps, original H.264/AAC.
- `poster-1280.webp` and `.jpg`: source frame 594; WebP ≤80,000 bytes.
- `loop-8s-1280.mp4`: frames 408…898 (end frame 899 exclusive), 8.183333 s, silent H.264 at native size. Only this preview is re-encoded; ≤1,500,000 bytes.
- `og-1200x630.jpg`: source frame 1230 downscaled to 1120×630 inside a 1200×630 canvas, with a title lockup if the requested font exists. No film upscaling or generated imagery.

`verify_revision.py` compares V4.2 against the immutable V4.1 backup. The compressed AAC stream and decoded float PCM are identical, all 88 audio bins remeasure without changes, and all 75 decoded RGB tutorial-ending frames (1245…1319) are pixel-identical. Its report distinguishes container hashes, audio hashes and decoded picture identity; it does not infer that other frames are unchanged. NumPy is required for this comparison.

`verify_media.sh` records source/copy container hashes, elementary-stream hashes, actual decoded frame count, ffprobe metadata, EBU R128 summary, derivative sizes and hashes in `verification/`. Logs omit private staging paths. Source SHA-256 is checked again after preparation. The file/container and elementary-stream hashes are separate concepts; the private copy currently matches both.

`src/data/deadChannelSignal.json` retains all 88 supplied 250 ms audio bins and their input hashes after V4.2 remeasurement. Original audio event timings come from the blueprint's finer-window analysis. New picture events come from direct zero-based V4.2 source-frame inspection: the detector alternates between `--` and `ERR` during the approach. The trace samples `ERR` at frame 900 (15 s), with `--` at frame 960 (16 s); this is a sampled glitch marker, not an onset claim. The entity count changes from `ERR` at frame 1191 to `0` at frame 1192 (19.866666666666667 s). The separate range readout reaches `0.00 m` at frame 1143 (19.050 s) while the entity display reads `ERR`. The 19.910 s sound climax is a third distinct event. The JSON records the V4.1 audio reference and V4.2 picture provenance separately. The quarter-second pre-reveal silence comes from fine-window analysis, not invented detail within the coarser bins. The number 240 is a supplied production fact about the separately synthesized Python/NumPy score. No original source positions, event map, interactive spatial rendering or Transmission Room are claimed.

The original right-sided stereo mix is preserved exactly as approved by Sergio Mata. The three owner-supplied credits live in `src/data/deadChannelRelease.json` and are reproduced verbatim in the case page and no-JavaScript fallback.

`src/data/deadChannelCaptions.json` supplies nine draft English SDH cues and a descriptive transcript. `scripts/generate-dead-channel-captions.mjs` validates duration, ordering, reading speed and source identity, then generates the ignored VTT sidecar only when the private film is present. It also synchronizes the accessible no-JavaScript transcript and credits. The owner-confirmed final cue is `[Spirits swarm on the right]` at 20.450–22.000 s, describing the intentionally right-weighted spirit convergence effect. The fictional tutorial is the visual punchline, not the audio source. No dialogue transcription is pending. The older `prepare_captions.py` scaffold is retained for provenance and is not the active caption generator.

`npm run build:release` intentionally fails until the owner approves the complete final captioned candidate and the final candidate's public media release. Credits, picture and preservation of the original mix are already approved; no publication date is invented or required by the existing CreativeWork metadata. Teaser, BTS, map poster and Transmission Room remain deferred. Build output includes ignored local media when present: **do not upload `dist/`** before explicit release approval. Use local review or owner-only storage.
