# DEAD CHANNEL V4.2 deployment

The owner authorized the complete corrected candidate at commit
`b72a10bfd534e7421648f71ada4496931f2a8a04` for public release, including GitHub
push, PR, merge and Cloudflare Pages deployment. Authorization is recorded in
`src/data/deadChannelRelease.json`; the approved activation patch changes only
public presentation, indexing and generated metadata.

That historical approval records the V4.2 film release. The current portfolio
change remains a review candidate: merging it and publishing a new deployment
are future review decisions. The commands below are resume instructions, not a
record that publication or account configuration verification has occurred.

Keep the review ZIP, extracted review package and all DEAD CHANNEL media out of
public Git. Use the exact reviewed source commit, preserving GA4 `G-QBSGMKSJLT`
and the existing portfolio. The old recovery bundle based on `136d1f1` is
historical recovery material; do not replay it over the current reviewed code.
Copy existing approved media only. Do not recreate, re-encode, remux, normalize
or replace the film, audio, posters or preview loop. Caption generation below
must reproduce the approved sidecar exactly.

## Access and Cloudflare readback

On October 22, 2026, release preparation could not confirm the current account
settings: the environment had no configured Cloudflare credentials or identity,
no Wrangler installation/configuration, and its inherited network proxy denied
CONNECT requests to both `api.cloudflare.com` and `ziggurat.pages.dev` with HTTP
403. This is an access blocker, not evidence of the account's actual settings.
The approved private review ZIP was found, but its 70,797,480-byte size exceeds
the environment's 32 MiB file-transfer limit; its authenticated download host was
also denied by the proxy. No audiovisual media has been recovered through that
route; the standalone approved caption sidecar was retrieved separately.

Resume with authorized egress to `api.cloudflare.com` and `ziggurat.pages.dev`
and a securely bound Cloudflare account ID and API token with Pages Read access.
Later upload needs Pages Edit/deployment authorization and any upload hosts
required by the normal Wrangler client. An authorized local copy of the private
package is an alternative media source. Keep inherited proxy and TLS settings;
do not bypass a destination denial, disable certificate verification, print
tokens, or commit credentials. Do not run interactive login or change account
settings as part of preparation.

Read the existing `ziggurat` project and retain only the following projection.
It deliberately excludes `deployment_configs` and environment variables.
The token and account ID must be provided externally through secure bindings.

```sh
python3 - <<'PY'
import json
import os
import urllib.request

account = os.environ['CLOUDFLARE_ACCOUNT_ID']
token = os.environ['CLOUDFLARE_API_TOKEN']
request = urllib.request.Request(
    f'https://api.cloudflare.com/client/v4/accounts/{account}/pages/projects/ziggurat',
    headers={'Authorization': 'Bearer ' + token},
)
with urllib.request.urlopen(request, timeout=30) as response:
    envelope = json.load(response)
if envelope.get('success') is not True:
    raise SystemExit('Cloudflare project read failed; stop release preparation.')
project = envelope['result']
source = project.get('source') or {}
config = source.get('config') or {}
build = project.get('build_config') or {}
actual = {
    'project': project.get('name'),
    'production_branch': project.get('production_branch'),
    'source_type': source.get('type'),
    'owner': config.get('owner'),
    'repository': config.get('repo_name'),
    'source_production_branch': config.get('production_branch'),
    'production_deployments_enabled': config.get('production_deployments_enabled'),
    'preview_deployment_setting': config.get('preview_deployment_setting'),
    'build_command': build.get('build_command'),
    'destination_dir': build.get('destination_dir'),
    'root_dir': build.get('root_dir'),
}
print(json.dumps(actual, indent=2))
expected = {
    'project': 'ziggurat',
    'production_branch': 'main',
    'source_type': 'github',
    'owner': 'mataindustries',
    'repository': 'digital-ziggurat',
    'source_production_branch': 'main',
    'production_deployments_enabled': False,
    'preview_deployment_setting': 'none',
    'build_command': 'npm run build:release',
    'destination_dir': 'dist',
}
if any(actual[key] != value for key, value in expected.items()):
    raise SystemExit('Settings differ from the release requirements; stop for review.')
if actual['root_dir'] not in ('', '/', None):
    raise SystemExit('Unexpected build root; stop for review.')
PY
```

These expected values come from the repository's release requirements. They
become verified only after a successful current account readback. If either Git
deployment control differs, stop; account changes need a separate decision.
Keep automatic production and preview Git deployments disabled. Until readback,
review-only commits use the documented `[CF-Pages-Skip]` message prefix; this
suppresses that commit's Pages deployment but does not prove account settings.

## Exact media recovery

The five audiovisual/image records come from
[`verification/media-integrity.json`](verification/media-integrity.json).
Its historical approval-status prose predates the authorization above; preserve
its immutable byte/hash evidence. The corrected VTT is the approved 1,007-byte
sidecar. All six destination filenames below are relative to
`public/media/dead-channel/`.

| File | Bytes | SHA-256 |
| --- | ---: | --- |
| `film-22s-1280x720p60.mp4` | 20,554,922 | `43cab0916f52519afcb67c96a3d69aa3ff6e891ba7cd0a43e9f104aefa918fc9` |
| `loop-8s-1280.mp4` | 930,098 | `fac78dfbd5223b0df5136380320b488773c25b11bfb22d446988821b47d41b9d` |
| `og-1200x630.jpg` | 105,107 | `5e497dfb45ea5c6b126580c25fbc109f1d7f92f91bab613a5a0e595e5f32bf56` |
| `poster-1280.jpg` | 55,498 | `f3f4db379b495bd5a3766c258c298bb0b48c22eea762459a6eb64dd0f37a0d87` |
| `poster-1280.webp` | 28,908 | `f259a5cc0cc6a4b7a3fa38ab417527081ba81c21d649c19b2ba35c11ede57ad0` |
| `captions-en.vtt` | 1,007 | `93256314ee49a60a034d6b3b731bc3a951c08e302f934658ba9ac36e324e38cb` |

After network access is authorized, try recovering each existing live asset
without changing its bytes. Run the remaining preparation commands in the same
shell, starting at the repository root. Set `release_commit` externally to the
full reviewed source SHA; do not substitute an unreviewed branch tip.

```sh
set -eu
: "${release_commit:?Set release_commit to the full reviewed source SHA}"
umask 077
release_scratch="$(mktemp -d /tmp/ziggurat-release.XXXXXX)"
media_recovery_dir="$release_scratch/recovered"
mkdir "$media_recovery_dir"
for asset in film-22s-1280x720p60.mp4 loop-8s-1280.mp4 og-1200x630.jpg poster-1280.jpg poster-1280.webp captions-en.vtt
do
  curl --fail --silent --show-error --location --max-time 120 \
    --proto '=https' --proto-redir '=https' \
    "https://ziggurat.pages.dev/media/dead-channel/$asset" \
    --output "$media_recovery_dir/$asset"
done
```

A missing, denied or mismatching response is a blocker. Do not stage an older
V4.1 candidate or accept a live asset solely because its filename matches. If
live recovery fails, use the owner's authorized local
`DEAD_CHANNEL_V4_2_CORRECTED_FINAL_PRIVATE_REVIEW.zip` (70,797,480 bytes, SHA-256
`b71163e0ac60324ebf13b5c514b47e1e667c05d6a4dfca638518b2e992e82ce4`).
If the failed recovery terminated the shell, initialize a fresh private scratch
directory using the setup lines above before continuing with the local package.
Verify that archive before extracting it privately, then copy only its six
existing `site/media/dead-channel/` files into `$media_recovery_dir`. Keep all
other package contents outside public assets and Git. Do not run package scripts
or media preparation tools. If neither exact source is available, leave release
validation blocked and record the missing filenames.

Verify every recovered file before staging; compare byte counts with the table:

```sh
(
  cd "$media_recovery_dir"
  wc -c film-22s-1280x720p60.mp4 loop-8s-1280.mp4 og-1200x630.jpg poster-1280.jpg poster-1280.webp captions-en.vtt
  sha256sum --check <<'SHA256'
43cab0916f52519afcb67c96a3d69aa3ff6e891ba7cd0a43e9f104aefa918fc9  film-22s-1280x720p60.mp4
fac78dfbd5223b0df5136380320b488773c25b11bfb22d446988821b47d41b9d  loop-8s-1280.mp4
5e497dfb45ea5c6b126580c25fbc109f1d7f92f91bab613a5a0e595e5f32bf56  og-1200x630.jpg
f3f4db379b495bd5a3766c258c298bb0b48c22eea762459a6eb64dd0f37a0d87  poster-1280.jpg
f259a5cc0cc6a4b7a3fa38ab417527081ba81c21d649c19b2ba35c11ede57ad0  poster-1280.webp
93256314ee49a60a034d6b3b731bc3a951c08e302f934658ba9ac36e324e38cb  captions-en.vtt
SHA256
)
git worktree add --detach "$release_scratch/site" "$release_commit"
cd "$release_scratch/site"
test "$(git rev-parse HEAD)" = "$release_commit"
mkdir -p public/media/dead-channel
for asset in film-22s-1280x720p60.mp4 loop-8s-1280.mp4 og-1200x630.jpg poster-1280.jpg poster-1280.webp captions-en.vtt
do
  git check-ignore "public/media/dead-channel/$asset"
  cp "$media_recovery_dir/$asset" "public/media/dead-channel/$asset"
done
test -z "$(git ls-files public/media/dead-channel/)"
```

## Full validation at the reviewed SHA

Install locked dependencies normally. Run the standard metadata path twice and
compare every generated output, including the accessible transcript and VTT.
`metadata:code` is for code review only and cannot satisfy a release check.

```sh
npm ci
npm run metadata
sha256sum public/ai.json public/projects.json public/llms.txt public/proof.html \
  work/dead-channel/index.html public/media/dead-channel/captions-en.vtt \
  > "$release_scratch/metadata-first.sha256"
npm run metadata
sha256sum public/ai.json public/projects.json public/llms.txt public/proof.html \
  work/dead-channel/index.html public/media/dead-channel/captions-en.vtt \
  > "$release_scratch/metadata-second.sha256"
cmp "$release_scratch/metadata-first.sha256" "$release_scratch/metadata-second.sha256"
npm run check:dead-channel
npm run check:dead-channel:release
npm run build
npm run build:release
git diff --check
git diff --exit-code
for asset in film-22s-1280x720p60.mp4 loop-8s-1280.mp4 og-1200x630.jpg poster-1280.jpg poster-1280.webp captions-en.vtt
do
  cmp "$media_recovery_dir/$asset" "public/media/dead-channel/$asset"
  cmp "public/media/dead-channel/$asset" "dist/media/dead-channel/$asset"
done
```

Stop on any failure, changed generated source or media mismatch; do not alter
hashes, weaken guards or remove the media requirement to obtain a green build.
Review `dist/` locally using `npm run preview -- --host 127.0.0.1` before any
upload. Check the homepage and both case-study routes at 360/390, 768 and 1280+
pixel widths; verify navigation, project dialogs, keyboard focus, mailto drafts,
copy-email fallback, reduced motion and Save-Data behavior. Shoot the Moon stays
the sole flagship.

Run the full 22-second film with native controls and English SDH in both the
homepage dialog and DEAD CHANNEL case study. Verify all nine cue texts/timings
against the approved VTT, including `[Spirits swarm on the right]` at
20.450–22.000 s; captions stay absent during the recorded silence. Preserve
approved credits and the original intentionally right-weighted convergence
audio. Confirm 1280×720, 60 fps, 1,320 frames and the frame-1192 entity-count
return at 19.8667 s, distinct from frame 1143's range-zero reading and the
19.910 s sound climax. Compare film/stream identity with the checked-in
verification records; do not treat a generated replacement as equivalent.
Verify served film SHA-256 and HTTP 206 byte ranges locally. Record what was
actually inspected; browser emulation is not physical-device or listening proof.

## Review decision and publication

Keep the draft PR unmerged during preparation. Once the completed result and
release evidence are reviewed and publication is authorized, merge the reviewed
change. Set `release_commit` to the full resulting merged SHA and repeat the
fresh-worktree recovery and full validation above at that SHA. Read back the
Cloudflare settings again immediately before upload. Do not reuse a build made
from a different commit or manually upload a code-only `dist/` directory.

Only from the validated merged worktree, using externally bound credentials:

```sh
test "$(git rev-parse HEAD)" = "$release_commit"
git diff --exit-code
npx wrangler pages deploy dist --project-name ziggurat --branch main \
  --commit-hash "$release_commit"
```

Record the merged SHA, Wrangler version, deployment ID/URL and validation
evidence. Verify the live homepage, `/work/shoot-the-moon/` and
`/work/dead-channel/`; recheck all six served asset hashes, full movie bytes and
HTTP 206 byte ranges, native playback/SDH, responsive behavior and contact links.
Confirm exactly one GA4 `G-QBSGMKSJLT` initialization per HTML entrypoint, with
analytics requests intercepted during automated QA. Read back that both Git
deployment controls remain disabled. A successful upload alone is not completed
live verification; report any access or playback blocker accurately.

Reference: [Cloudflare's GitHub integration and commit skip behavior](https://github.com/cloudflare/cloudflare-docs/blob/production/src/content/docs/pages/configuration/git-integration/github-integration.mdx),
[Pages project API fields](https://github.com/cloudflare/cloudflare-typescript/blob/main/src/resources/pages/projects/projects.ts),
and [Wrangler Pages deployment options](https://github.com/cloudflare/workers-sdk/blob/main/packages/wrangler/src/pages/deploy.ts).

Transmission Room and its missing original EVENT_MAP.json remain deferred.
