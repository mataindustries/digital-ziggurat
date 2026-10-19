// Private review copy, grounded in the supplied launch handoff and V4.1 measurements.
// Film identity and measurements live in deadChannelSignal.json. No event-map data,
// publication date, detailed production credits, or unapproved dialog is inferred.
import signal from './deadChannelSignal.json';
import { buildMailto } from './projects';

const { film } = signal;
export const deadChannelCaseStudy = {
  positioning: `A ${film.duration}-second horror-comedy about a spirit detector that can't see anything, and can be heard by everything.`,
  summary:
    'An investigator enters a fictional abandoned aerospace plant with a vibe-coded spirit detector. It reports nothing. It broadcasts to everything. The swarm that answers is carried by original sound and the air of the building.',
  thesis: `0 detected. ${film.sourceCount} present.`,
  specs: [
    {
      label: 'Runtime',
      value: `${film.duration} s · ${film.frames.toLocaleString('en-US')} frames`,
    },
    {
      label: 'Picture',
      value: `${film.width} × ${film.height} · ${film.fps} fps`,
    },
    { label: 'Sound', value: `Stereo · ${film.sourceCount} virtual sources` },
    { label: 'Version', value: film.version },
  ],
  beats: [
    {
      title: 'SETUP COMPLETE',
      body: 'Source: AI web guide. The detector is ready.',
    },
    {
      title: 'DISCOVERY ON',
      body: 'The display reports zero entities. The building answers.',
    },
    {
      title: 'DISCOVERABLE: EVERYONE',
      body: 'The device was broadcasting all along.',
    },
  ],
  process: [
    {
      title: 'Picture',
      body: 'Developed through iterative collaboration with frontier coding models. The unseen swarm is suggested through the environment and VFX.',
    },
    {
      title: 'Sound',
      body: `THE CONVERGENCE was synthesized separately using original Python/NumPy DSP and ${film.sourceCount} coordinated virtual sound sources. This score was not made with DaemonV12; it came from a separate pipeline written for this film.`,
    },
    {
      title: 'Finish',
      body: `The ${film.version} master stays at its native ${film.width} × ${film.height} and ${film.fps} fps. The private screening uses the original file, with picture and sound unchanged.`,
    },
  ],
  // Reuse the site's existing paid-work offer; the proposed new service cards await
  // owner review and do not expand the established public contact routes.
  contactHref: buildMailto(
    'Cinematic web project for Sergio',
    `Hi Sergio,\n\nI would like help with a cinematic web experience.\n\nProduct or project link:\n\nAudience and desired outcome:\n\nWhat needs building:\n\nBudget and deadline:\n`,
  ),
};
