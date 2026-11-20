// The single switch for how DEAD CHANNEL is published. Everything that depends on the
// private film media (homepage section, navigation step, player, social card, media
// links, release gate) reads this value, so the site cannot half-publish the film.
//
//   film     The full verified release: strict media, hash, caption and approval
//            checks, the homepage showcase and the screening page. This is the
//            behaviour that existed before the archive.
//   archived The film is not part of the release. The case study stays public as
//            text only, and no page may reference the film, posters or captions.
//
// Restore the film release with tools/dead-channel/RELEASE.md#restoring-the-film-release.
import publication from './deadChannelPublication.json' with { type: 'json' };

export const deadChannelModes = ['film', 'archived'];

if (!deadChannelModes.includes(publication.mode)) {
  throw new Error(
    `deadChannelPublication.json: mode must be one of ${deadChannelModes.join(', ')}, not ${JSON.stringify(publication.mode)}.`,
  );
}

export const deadChannelPublication = publication;
export const deadChannelArchived = publication.mode === 'archived';
