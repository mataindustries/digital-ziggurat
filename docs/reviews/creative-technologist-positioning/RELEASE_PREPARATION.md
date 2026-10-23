# DEAD CHANNEL V4.2 release-preparation evidence

Checked October 22, 2026 (America/Los_Angeles), continuing PR #13 from
`5d24f0cc35479c318e950abf55681b46fd67a182`.

## Resolved

All nine caption cues now use the exact approved V4.2 sidecar wording, IDs and
timings. The final cue is `[Spirits swarm on the right]` at 20.450–22.000 s.
The approved sidecar was recovered as an individual file and staged under the
ignored `public/media/dead-channel/` directory. Its SHA-256 is exactly
`93256314ee49a60a034d6b3b731bc3a951c08e302f934658ba9ac36e324e38cb`.
The approved private package’s checksum list independently confirms that value.

The caption generator passes all nine cues; maximum reading speed is 18.67
characters/second, below the existing 20-character/second limit. Independent
parsing and byte reconstruction match the approved sidecar. Repeated caption
HTML generation is deterministic. The descriptive transcript uses consistent
sound wording; source bases, timings and all numerical/frame facts are preserved.

The release checker now enforces the pinned byte count and SHA-256 of every
present film, preview and image, and the exact approved sidecar hash. It retains
the complete-media requirement, media budgets, film identity, approval flags,
Git exclusion and deferred Transmission Room checks. Ten isolated guard checks
passed, including exact-size incorrect bytes for each of the six assets and a
same-size one-byte mutation of the approved sidecar. These negative checks do
not establish acceptance of a complete approved-media release.

The portfolio positioning/design, project hierarchy, original film and soundtrack,
credits, approval data, signal evidence and historical media-integrity records
are unchanged. No film/preview/image was regenerated, replaced, or added to Git.

## Exact media inventory

All filenames are relative to `public/media/dead-channel/`. The first five hashes
and byte counts are pinned in `tools/dead-channel/verification/media-integrity.json`;
the sidecar pin is recorded in `tools/dead-channel/RELEASE.md` and the approved
private checksum list.

| File | Expected bytes | Expected SHA-256 | Current state |
| --- | ---: | --- | --- |
| `film-22s-1280x720p60.mp4` | 20,554,922 | `43cab0916f52519afcb67c96a3d69aa3ff6e891ba7cd0a43e9f104aefa918fc9` | Missing |
| `loop-8s-1280.mp4` | 930,098 | `fac78dfbd5223b0df5136380320b488773c25b11bfb22d446988821b47d41b9d` | Missing |
| `og-1200x630.jpg` | 105,107 | `5e497dfb45ea5c6b126580c25fbc109f1d7f92f91bab613a5a0e595e5f32bf56` | Missing |
| `poster-1280.jpg` | 55,498 | `f3f4db379b495bd5a3766c258c298bb0b48c22eea762459a6eb64dd0f37a0d87` | Missing |
| `poster-1280.webp` | 28,908 | `f259a5cc0cc6a4b7a3fa38ab417527081ba81c21d649c19b2ba35c11ede57ad0` | Missing |
| `captions-en.vtt` | 1,007 | `93256314ee49a60a034d6b3b731bc3a951c08e302f934658ba9ac36e324e38cb` | Staged and verified; Git ignored |

## Standard validation results

| Check | Result |
| --- | --- |
| `node scripts/generate-dead-channel-captions.mjs` | PASS: nine readable nonoverlapping cues; repeated HTML output identical. |
| `npm run metadata` | BLOCKED: caption phase passes, then the five missing approved media assets fail the standard asset check. |
| `npm run check:dead-channel` | PASS for the code-only state and staged sidecar; no complete-media/audiovisual claim. |
| `npm run check:dead-channel:release` | BLOCKED: complete verified release media is absent. |
| `npm run build` | BLOCKED by the five missing media files in standard metadata generation. |
| `npm run build:release` | BLOCKED by the release-media completeness gate. |
| `node --check scripts/check-dead-channel.mjs` | PASS. |
| `git diff --check` | PASS. |
| All six asset hash rejection cases and four supporting fixture checks | PASS: 10/10 isolated checks; original staged sidecar unchanged. |

No `metadata:code` result is used as release evidence. A successful production
build, full standard-metadata determinism run, native film/caption playback and
post-build `dist/` identity verification are still outstanding. The earlier
positioning browser review and screenshots remain recorded in [README.md](README.md).

## Access blockers and resume point

The direct individual live-asset request to
`https://ziggurat.pages.dev/media/dead-channel/captions-en.vtt` returned HTTP 403
from the enforced environment proxy. Requests to `api.cloudflare.com` were also
denied with CONNECT 403. All five missing media URLs use the same blocked
`https://ziggurat.pages.dev/media/dead-channel/` base, so no repeated full-archive
or redundant per-file retries were made after the destination denial.

The exact approved corrected-final private archive was already located:
`DEAD_CHANNEL_V4_2_CORRECTED_FINAL_PRIVATE_REVIEW.zip`, 70,797,480 bytes,
SHA-256 `b71163e0ac60324ebf13b5c514b47e1e667c05d6a4dfca638518b2e992e82ce4`.
It is larger than the 32 MiB workspace transfer limit and its authenticated
storage download host is blocked. Earlier targeted folder inspection found no
separately stored film or derivatives. The individual approved caption sidecar
was accessible and is the one staged above. Keep archive URLs and all private
package bytes outside public Git.

To resume without repeating discovery, provide either:

1. Authorized HTTPS egress to `ziggurat.pages.dev`, permitting the five exact
   individual downloads listed above; each is below 32 MiB. Download into private
   scratch space and verify all pins before staging. Or provide the five exact
   existing files from the approved archive’s `site/media/dead-channel/` directory.
2. For actual Cloudflare configuration confirmation, authorized HTTPS egress to
   `api.cloudflare.com` plus a securely bound Cloudflare account ID and API token
   with Pages Read access for `ziggurat`. This environment currently has no
   Cloudflare credentials or outbound identity. Do not paste secrets into chat.

Actual Cloudflare repository/branch/build settings and both automatic Git
deployment controls remain **unverified**. Repository-documented expectations
are `mataindustries/digital-ziggurat`, production `main`, build command
`npm run build:release`, output `dist`, production Git deployments disabled and
preview deployment setting `none`. Account settings were not changed.

The updated [release procedure](../../../tools/dead-channel/RELEASE.md) contains
an exact read-only settings projection, individual-file recovery/hash commands,
fresh-worktree validation at the reviewed/merged SHA and the later manual
publication command. It also covers native media/SDH, byte-range, live hash and
route checks. Review-only commits retain `[CF-Pages-Skip]`; that marker skips the
commit’s deployment and does not verify account settings. PR #13 remains a draft;
no merge or publication was performed in this preparation pass.
