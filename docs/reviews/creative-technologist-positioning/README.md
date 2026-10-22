# Creative-technologist positioning review

Review date: October 22, 2026 (America/Los_Angeles).
Base: `25838be66e7ca8c55ddbfdf97191e45e2f2232ed`, verified against current `origin/main`.

The portfolio now leads with **Creative Technologist & AI Builder**, explains the
software and interactive experiences a buyer can commission, and starts inquiries
with a scoped paid first step and quote. Shoot the Moon remains the sole flagship.

Ownership notes on the flagship and three major projects explain the goal,
Sergio’s decisions, AI contributions, recorded verification, working result and
buyer application. Existing project evidence, versions and approved film credits
are preserved. Public metadata and the static proof page use the same registry.
The two existing offer routes and separate agency-overflow route retain their IDs;
legacy sprint email subjects are retained. The 48-hour option depends on confirmed
small scope and ready assets/access; no public rates or unlimited revisions are added.

## Before and after

Screenshots use the local Vite development server. Contact images capture the full
contact panel; homepage images capture the viewport. The absent private film is not
used in these comparison images.

| Surface / viewport | Before | After |
| --- | --- | --- |
| Homepage / 390 × 844 | [Before](before-home-390.png) | [After](after-home-390.png) |
| Homepage / 1440 × 1000 | [Before](before-home-1440.png) | [After](after-home-1440.png) |
| Contact / 390 px | [Before](before-contact-390.png) | [After](after-contact-390.png) |
| Contact / 1440 px | [Before](before-contact-1440.png) | [After](after-contact-1440.png) |

## Completed checks

- Browser inspection at 360, 390, 768 and 1440 px: homepage, contact offers and both
  case-study routes. Headline, navigation and CTA text fit without horizontal overflow.
- Native mailto links retain the public recipient and decode to the intended
  subject/body. Main commission, launch polish, prototype/tool, agency overflow and
  case-study inquiries were checked without sending messages.
- Native clipboard and clipboard-rejection fallback both copy the public email;
  status feedback and temporary-field cleanup work.
- PermitPulse and DaemonV12 detail dialogs: accessible labels, initial close focus,
  Tab/Shift+Tab wrapping, Escape, trigger-focus restoration and body-scroll restoration.
- Ziggurat targets and keyboard focus, native media-dialog controls, reduced-motion
  and Save-Data behavior, plus the no-JavaScript fallback. No JavaScript runtime errors.
- `npm run metadata:code` twice: all four generated files are byte-identical.
- Syntax checks and `git diff --check` pass. Independent source review found no
  unsupported ownership claims or release changes.
- Isolated metadata checks confirm code-review mode still rejects unrelated missing
  media, mismatched homepage title/description and unknown flags. Default metadata
  generation still rejects missing approved film media.
- `npm run check:dead-channel` passes its code-only checks. No private film assets
  or review packages are tracked or staged.

## Existing validation blockers

Baseline checks recorded the caption and missing-media failures before editing.
Final validation confirms these blockers remain:

| Command | Result |
| --- | --- |
| `npm run metadata` | Fails: `Caption too fast: surge` in existing DEAD CHANNEL caption data. |
| `npm run build` | Fails at the same existing caption check. |
| `node scripts/generate-public-metadata.mjs` | Fails for the six missing approved DEAD CHANNEL assets. |
| `npm run check:dead-channel:release` | Fails: complete verified release media and caption sidecar are absent. |
| `npm run build:release` | Fails at that media completeness gate. |

The exact approved private package was located, but its size exceeds the available
32 MiB transfer limit and its download host is denied by the environment’s network
policy. No older film or replacement assets were staged. Current main’s caption
revision also conflicts with the existing reading-speed and final-cue assertions;
this positioning change leaves that data and those checks intact.

`npm run metadata:code` is an explicit content-review command. It regenerates only
public metadata, warns about the six known missing film assets and leaves all
standard caption, build, media-hash and release checks enforced. It does not
establish audiovisual correctness or deployability. Browser verification used the
development server; production-build, film playback and caption audiovisual checks
remain blocked.

## Publication handling

This is a draft for review. The review commit uses Cloudflare’s documented
`[CF-Pages-Skip]` prefix to omit deployment on push. Account-side deployment settings
could not be read with the available credentials; they were not changed. No merge,
manual deployment or production publication was performed.

Before a later release, resolve the existing caption inconsistency, stage the exact
approved media, confirm actual Cloudflare deployment settings and pass
`npm run build:release`.
