# DEAD CHANNEL V4.2 deployment

The owner authorized the complete corrected candidate at commit
`b72a10bfd534e7421648f71ada4496931f2a8a04` for public release, including GitHub
push, PR, merge and Cloudflare Pages deployment. Authorization is recorded in
`src/data/deadChannelRelease.json`; the approved activation patch changes only
public presentation, indexing and generated metadata.

Keep the review ZIP, extracted review package and all DEAD CHANNEL media out of
public Git. Recover source from the bundle based on main `136d1f1`, preserving
GA4 `G-QBSGMKSJLT` and the existing portfolio. Stage the six supplied files from
the package's `site/media/dead-channel/` in an isolated deployment worktree at
`public/media/dead-channel/`. Copy existing assets; do not run media preparation
or generation tools.

The exact movie is 20,554,922 bytes, SHA-256
`43cab0916f52519afcb67c96a3d69aa3ff6e891ba7cd0a43e9f104aefa918fc9`.
The corrected VTT SHA-256 is
`93256314ee49a60a034d6b3b731bc3a951c08e302f934658ba9ac36e324e38cb`.
The final cue is `[Spirits swarm on the right]` at 20.450–22.000 seconds.

Before any push, verify the existing `ziggurat` Pages project targets this
repository and production branch `main`. Disable both production and preview
automatic Git deployments. Keep its build command `npm run build:release` and
output directory `dist`, so a code-only Git build fails if deployment settings
are later changed. Confirm these settings by reading them back from Cloudflare.

Verify every supplied media hash, caption generation, unchanged credits, GA4,
responsive layout, native playback/captions, links and `git diff --check`. Run:

```sh
npm run check:dead-channel:release
npm run build:release
```

Push and validate the PR only after the complete build passes. Merge once the
complete deployment is ready and account-side deployment safeguards are
confirmed. Upload only the verified `dist/` directory with Wrangler to the
existing `ziggurat` project and branch `main`, recording the merged commit hash.
Verify the live routes, movie hash and byte ranges, captions, playback, responsive
layout and GA4 before reporting success. Keep automatic Git deployments disabled;
future deployments must stage the approved media and pass the release build.

Transmission Room and its missing original EVENT_MAP.json remain deferred.
