import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const media = resolve(root, 'public/media/dead-channel');
const data = JSON.parse(readFileSync(resolve(root, 'src/data/deadChannelSignal.json'), 'utf8'));
const release = JSON.parse(readFileSync(resolve(root, 'src/data/deadChannelRelease.json'), 'utf8'));
const captions = JSON.parse(readFileSync(resolve(root, 'src/data/deadChannelCaptions.json'), 'utf8'));
const filmIdentity = JSON.parse(readFileSync(resolve(root, 'src/data/deadChannelFilm.json'), 'utf8'));
const expected = '43cab0916f52519afcb67c96a3d69aa3ff6e891ba7cd0a43e9f104aefa918fc9';
const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');
const hashPattern = /^[a-f0-9]{64}$/;
const finite = (value) => typeof value === 'number' && Number.isFinite(value);

assert.equal(data.schemaVersion, 1);
assert.deepEqual(filmIdentity, data.film, 'Shared film facts must be generated from the same verified source');
assert.equal(data.film.duration, 22);
assert.equal(data.film.frames, 1320);
assert.equal(data.film.fps, 60);
assert.equal(data.film.width, 1280);
assert.equal(data.film.height, 720);
assert.equal(data.film.sourceCount, 240);
assert.equal(data.film.sha256, expected);
assert.equal(data.film.streams.video, '8e8015acdbb7fd4e32e256dddcaa10e85004cb26f4a63b3ea72b31fe0e42b104');
assert.equal(data.film.streams.audio, '931f68c9667487217b8d3921f7724b51ee89ba683a9b1a10df7af726ae611628');
assert.equal(data.provenance.eventMap, null, 'Do not imply an event map was recovered');
for (const item of ['profile', 'measurementScript', 'blueprint']) {
  assert.match(data.provenance[item].sha256, hashPattern);
}
assert.equal(data.windows.length, 88, 'Keep every supplied 250 ms bin');
for (const [index, window] of data.windows.entries()) {
  assert.equal(window.t0, index / 4);
  assert.equal(window.t1, (index + 1) / 4);
  for (const field of ['rmsL', 'rmsR', 'balance', 'sideMid', 'centroid', 'hfPercent']) {
    assert.ok(finite(window[field]), `Window ${index}: invalid ${field}`);
  }
  assert.ok(window.correlation === null || (finite(window.correlation) && Math.abs(window.correlation) <= 1));
}
const eventIds = ['discovery', 'surge', 'flanks', 'shutdown', 'detector-glitch', 'range-zero', 'entity-zero', 'convergence', 'silence', 'tutorial', 'reveal'];
assert.deepEqual(data.events.map(({ id }) => id), eventIds);
for (const event of data.events) {
  assert.ok(finite(event.time) && event.time >= 0 && event.time <= data.film.duration);
  if (event.end !== undefined) assert.ok(event.end >= event.time && event.end <= data.film.duration);
  if (event.frame !== undefined) assert.equal(event.frame / data.film.fps, event.time);
  assert.ok(event.basis, `Event ${event.id} lacks a measurement basis`);
}
assert.equal(data.events.find(({ id }) => id === 'range-zero').time, 19.05);
assert.equal(data.events.find(({ id }) => id === 'entity-zero').frame, 1192);
assert.equal(data.events.find(({ id }) => id === 'entity-zero').time, 1192 / 60);
assert.equal(data.measurements.entityZero.time, 1192 / 60);
assert.equal(data.measurements.entityZero.previousFrame, 1191);
assert.equal(data.measurements.detectorGlitch.onsetClaimed, false);
assert.equal(data.provenance.pictureRevision.sha256, expected);
assert.equal(data.provenance.pictureRevision.entityCountReturn.readout, '0');
assert.equal(data.film.version, 'V4.2 review');
assert.equal(data.events.find(({ id }) => id === 'convergence').time, 19.91);
assert.ok(data.measurements.rangeZero.time < data.measurements.entityZero.time);
assert.ok(data.measurements.entityZero.time < data.measurements.convergence.time);

// Read the index without spawning a child process (restricted build hosts may forbid it).
// Git index v2/v3 stores full paths; v4 prefix-compresses each path against its predecessor.
function indexPaths(buffer) {
  assert.equal(buffer.toString('ascii', 0, 4), 'DIRC', 'Invalid Git index');
  const version = buffer.readUInt32BE(4);
  assert.ok([2, 3, 4].includes(version), `Unsupported Git index v${version}`);
  const result = [];
  let offset = 12;
  let previous = '';
  for (let entry = 0; entry < buffer.readUInt32BE(8); entry += 1) {
    const start = offset;
    const flags = buffer.readUInt16BE(offset + 60);
    offset += 62 + (flags & 0x4000 ? 2 : 0);
    let strip = 0;
    if (version === 4) {
      let byte = buffer[offset++];
      strip = byte & 0x7f;
      while (byte & 0x80) {
        byte = buffer[offset++];
        strip = ((strip + 1) << 7) + (byte & 0x7f);
      }
    }
    const end = buffer.indexOf(0, offset);
    assert.ok(end >= offset, 'Invalid Git index path');
    const suffix = buffer.toString('utf8', offset, end);
    const path = version === 4 ? previous.slice(0, previous.length - strip) + suffix : suffix;
    result.push(path);
    previous = path;
    offset = version === 4 ? end + 1 : start + Math.ceil((end + 1 - start) / 8) * 8;
  }
  return result;
}

// This repository is public. Even a locally staged media addition is an unsafe review candidate.
let gitDirectory = resolve(root, '.git');
if (statSync(gitDirectory).isFile()) {
  gitDirectory = resolve(root, readFileSync(gitDirectory, 'utf8').replace(/^gitdir:\s*/, '').trim());
}
const trackedMedia = indexPaths(readFileSync(resolve(gitDirectory, 'index')))
  .filter((path) => path.startsWith('public/media/dead-channel/'));
assert.deepEqual(trackedMedia, [], 'Private DEAD CHANNEL media must not be tracked or staged');
const ignoreRules = readFileSync(resolve(root, '.gitignore'), 'utf8').split(/\r?\n/).map((line) => line.trim());
assert.ok(ignoreRules.includes('/public/media/dead-channel/'), 'Ignore all private DEAD CHANNEL media before staging');
assert.ok(!ignoreRules.some((line) => /^!\/?public\/media\/dead-channel/.test(line)), 'Do not unignore private media');
assert.ok(!existsSync(resolve(media, 'transmission/transmission.v1.json')), 'Transmission Room remains deferred until the original source map is validated');
const assets = [
  ['film-22s-1280x720p60.mp4', 25 * 1024 * 1024],
  ['poster-1280.webp', 80_000],
  ['poster-1280.jpg', 500_000],
  ['loop-8s-1280.mp4', 1_500_000],
  ['og-1200x630.jpg', 500_000],
];
const available = assets.filter(([name]) => existsSync(resolve(media, name)));
if (available.length) {
  assert.equal(available.length, assets.length, 'Private local review assets are incomplete; run prepare_media.sh');
  for (const [name, maximum] of assets) assert.ok(statSync(resolve(media, name)).size <= maximum, `${name} exceeds its budget`);
  assert.equal(sha256(resolve(media, assets[0][0])), expected, 'Do not silently remux or alter the supplied V4.2 review');
  console.log('DEAD CHANNEL: private film hash, media budgets, 88 measured bins and no tracked media verified.');
} else {
  console.log('DEAD CHANNEL: code-only checks passed; private film assets must be staged for audiovisual review.');
}

// Private preparation and public-release authorization are separate checks.
if (process.argv.includes('--release')) {
  const blockers = [];
  if (!release.captionsApproved) blockers.push('owner approval of the complete final captioned candidate');
  if (!release.publicReleaseApproved) blockers.push('explicit owner approval of the final candidate and public media release');
  if (available.length !== assets.length || !existsSync(resolve(media, 'captions-en.vtt'))) blockers.push('complete verified release media and caption sidecar');
  assert.ok(release.pictureApproved && release.creditsApproved && release.originalMixPreservationApproved, 'Preserve the approved picture, credits and original stereo mix');
  assert.equal(captions.filmSha256, expected);
  if (blockers.length) throw new Error(`PUBLIC RELEASE BLOCKED: ${blockers.join('; ')}. Private build success is not publication authorization.`);
}
