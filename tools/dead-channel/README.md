# DEAD CHANNEL private media and measurement tools

These tools prepare a **private local review**, not a publication. The repository is public; film bytes, stills and derivatives are ignored before preparation. There is no owner approval to commit media, push, merge or deploy. The original is never modified, remuxed, normalized, retitled or upscaled. The local film is an exact file copy, including its original private metadata.

Requirements: Python 3.11+, FFmpeg/ffprobe and NumPy (only for independent signal remeasurement). No runtime JavaScript dependency is added. Commands accept private input paths; no staging location or credential is embedded in code.

```sh
bash tools/dead-channel/prepare_media.sh --input /private/path/DEAD_CHANNEL_V4_1_PICTURE_LOCK.mp4
bash tools/dead-channel/verify_media.sh --input /private/path/DEAD_CHANNEL_V4_1_PICTURE_LOCK.mp4
python3 -I tools/dead-channel/prepare_captions.py
python3 -I tools/dead-channel/measure_master.py \
  --input /private/path/DEAD_CHANNEL_V4_1_PICTURE_LOCK.mp4 \
  --profile /private/path/master_stereo_profile_250ms.txt \
  --reference-script /private/path/measure_master_reference.py \
  --blueprint /private/path/DEAD_CHANNEL_ZIGGURAT_BLUEPRINT.md
node scripts/check-dead-channel.mjs
node scripts/check-dead-channel.mjs --release
```

The last command intentionally fails while release gates remain unresolved. It cannot be used to approve a release. `--check` on `measure_master.py` compares both generated JSON files without writing them. `deadChannelFilm.json` is the small shared film-identity projection for the homepage; measurement windows remain in the case-study bundle. Re-decoding all 88 windows is independent of the supplied profile parser and uses the reference algorithm and rounding precision; any mismatch fails. Missing/undefined correlations serialize as `null`, never fabricated zeros.

`prepare_media.sh` verifies the original SHA-256 before writing, verifies the destination is already gitignored, and creates:

- `film-22s-1280x720p60.mp4`: exact original bytes; 22 s, 1,320 frames, native 1280×720 at 60 fps, original H.264/AAC.
- `poster-1280.webp` and `.jpg`: source frame 594; WebP ≤80,000 bytes.
- `loop-8s-1280.mp4`: frames 408…898 (end frame 899 exclusive), 8.183333 s, silent H.264 at native size. Only this preview is re-encoded; ≤1,500,000 bytes.
- `og-1200x630.jpg`: source frame 1230 downscaled to 1120×630 inside a 1200×630 canvas, with a title lockup if the requested font exists. No film upscaling or generated imagery.

`verify_media.sh` records source/copy container hashes, elementary-stream hashes, actual decoded frame count, ffprobe metadata, EBU R128 summary, derivative sizes and hashes in `verification/`. Logs omit private staging paths. Source SHA-256 is checked again after preparation. The file/container and elementary-stream hashes are separate concepts; the private copy currently matches both.

`src/data/deadChannelSignal.json` contains all 88 supplied 250 ms bins, their input hashes, and separately labeled event timings taken from the blueprint's finer-window/frame analysis. The 19.050 s zero-range readout precedes the 19.910 s sound climax; these are distinct events. The quarter-second pre-reveal silence comes from fine-window analysis, not invented detail within the coarser bins. The number 240 is a supplied production fact about the separately synthesized Python/NumPy score. No original source positions, event map, interactive spatial rendering or Transmission Room are claimed.

The tutorial audio remains approximately 20 dB right-weighted; its artistic intent needs owner review. Captions/transcript require the owner's approved verbatim tutorial line and descriptive sound text. Preparation notes stay in ignored `work/dead-channel-private/`; no empty or invented public VTT is generated.

Publication remains blocked on explicit film release approval, approved captions/transcript, tutorial stereo-intent review, credits and an actual publication date. Teaser, BTS, map poster and Transmission Room remain deferred. Build output includes ignored local media when present; **do not upload `dist/`** as part of private review. Use local preview or an explicitly authorized private hosting target only.
