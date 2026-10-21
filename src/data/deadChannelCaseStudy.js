// Film copy grounded in V4.2 picture checks and the unchanged original audio.
// Film identity and measurements live in deadChannelSignal.json. No event-map data,
// publication date or unapproved dialogue is inferred. Credits are owner-supplied.
import signal from './deadChannelSignal.json';
import { buildMailto } from './projects';

const { film } = signal;
export const deadChannelCaseStudy = {
  positioning: `A ${film.duration}-second horror-comedy about a spirit detector that can't see anything, and can be heard by everything.`,
  summary:
    'An investigator enters a fictional abandoned aerospace plant with a vibe-coded spirit detector. Its readout glitches during the approach, then returns to zero. It has been broadcasting all along. The unseen swarm is carried by original sound and the air of the building.',
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
    { label: 'Version', value: film.version.replace(' review', '') },
  ],
  beats: [
    {
      title: 'SETUP COMPLETE',
      body: 'Source: AI web guide. The detector is ready.',
    },
    {
      title: 'DISCOVERY ON',
      body: 'The building answers. During the approach, the readout glitches before returning to zero.',
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
      body: `The ${film.version.replace(' review', '')} movie stays at its native ${film.width} × ${film.height} and ${film.fps} fps. The screening uses the supplied file without re-encoding or changing its original audio and ending.`,
    },
  ],
  // Reuse the site's existing paid-work offer; the proposed new service cards await
  // owner review and do not expand the established public contact routes.
  contactHref: buildMailto(
    'Cinematic web project for Sergio',
    `Hi Sergio,\n\nI would like help with a cinematic web experience.\n\nProduct or project link:\n\nAudience and desired outcome:\n\nWhat needs building:\n\nBudget and deadline:\n`,
  ),
};
