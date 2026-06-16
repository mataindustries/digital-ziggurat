// Edit this file to update the public project cards, ziggurat tier mapping,
// and build log entries shown across The Digital Ziggurat.

export const projects = [
  {
    id: 'permitpulse',
    name: 'PermitPulse',
    description: 'A civic-tech interface for surfacing permit workflow signals and local friction.',
    proves: 'Operational software can make bureaucratic patterns readable.',
    status: 'Prototype',
    statusTone: 'cyan',
    link: '#permitpulse-demo',
  },
  {
    id: 'xibalba-pinball',
    name: 'Xibalba Pinball',
    description: 'A playable mythic arcade experiment with a dark underworld pinball atmosphere.',
    proves: 'Game feel, theme, and browser-native interaction can ship quickly.',
    status: 'Playable',
    statusTone: 'gold',
    link: '#xibalba-demo',
  },
  {
    id: 'black-swan',
    name: 'Black Swan',
    description: 'A strategy prototype exploring rare-event thinking through interactive systems.',
    proves: 'Abstract risk ideas can become tactile decision tools.',
    status: 'Experiment',
    statusTone: 'violet',
    link: '#black-swan-demo',
  },
  {
    id: 'pumpkin-ar-face-filter',
    name: 'Pumpkin AR Face Filter',
    description: 'A seasonal AR concept for face tracking, playful overlays, and shareable effects.',
    proves: 'Computer vision features can become approachable public demos.',
    status: 'Concept',
    statusTone: 'amber',
    link: '#pumpkin-demo',
  },
  {
    id: 'snapshot-studio',
    name: 'Snapshot Studio',
    description: 'A lightweight creative tool for producing polished visual snapshots and assets.',
    proves: 'Small tools can compress repeatable creative workflows.',
    status: 'MVP',
    statusTone: 'cyan',
    link: '#snapshot-demo',
  },
  {
    id: 'angeles-crest',
    name: 'The Angeles Crest',
    description: 'A location-driven experience shaped around terrain, atmosphere, and memory.',
    proves: 'Place-based storytelling can feel cinematic on the web.',
    status: 'Draft',
    statusTone: 'stone',
    link: '#angeles-crest-demo',
  },
];

export const zigguratTiers = [
  {
    id: 'human-floor',
    name: 'Human Floor',
    title: 'Flawed prototypes belong in the foundation.',
    description:
      'Constraints, rough edges, half-working experiments, and visible lessons are treated as structural material instead of hidden residue.',
    signal: 'Constraints, experiments, scars',
    cta: 'Inspect flaws',
    href: '#forge',
    projectIds: ['black-swan', 'angeles-crest'],
  },
  {
    id: 'workshop',
    name: 'Workshop',
    title: 'Live demos and playable builds face the public.',
    description:
      'The workshop tier favors browser-native artifacts, interactive proofs, and demos that can be touched before they are perfect.',
    signal: 'Playable systems',
    cta: 'Start a build',
    href: '#projects',
    projectIds: ['xibalba-pinball', 'snapshot-studio'],
  },
  {
    id: 'codex-forge',
    name: 'Codex Forge',
    title: 'AI-assisted build logs become part of the artifact.',
    description:
      'The forge records prompt-driven iteration, bugs, fixes, and judgment calls so the process is visible alongside the output.',
    signal: 'Logs, diffs, iteration',
    cta: 'View the forge',
    href: '#forge',
    projectIds: ['permitpulse', 'snapshot-studio'],
  },
  {
    id: 'ai-readable-shrine',
    name: 'AI-Readable Shrine',
    title: 'Metadata is exposed for humans and agents.',
    description:
      'Public files describe the site, projects, and intended interpretation so AI agents can navigate the monument without scraping guesswork.',
    signal: 'Structured public context',
    cta: 'Open metadata',
    href: '#shrine',
    projectIds: ['permitpulse', 'black-swan'],
  },
  {
    id: 'signal-beacon',
    name: 'Signal Beacon',
    title: 'The top tier turns proof into a hiring signal.',
    description:
      'The beacon points collaborators, clients, and technical reviewers toward the strongest evidence of taste, execution, and leverage.',
    signal: 'Contact, credibility, ambition',
    cta: 'Send signal',
    href: '#signal',
    projectIds: ['permitpulse', 'xibalba-pinball', 'snapshot-studio'],
  },
];

export const buildLog = [
  {
    id: 'identity-pass',
    date: 'Iteration 01',
    title: 'Core identity established',
    note: 'Defined the Ziggurat as a standalone public monument, not a portfolio subpage.',
    type: 'improvement',
  },
  {
    id: 'prototype-floor',
    date: 'Iteration 02',
    title: 'Flaws kept visible',
    note: 'Moved rough prototypes into the Human Floor so constraints are framed as evidence.',
    type: 'fix',
  },
  {
    id: 'visual-system',
    date: 'Iteration 03',
    title: 'CSS ziggurat built',
    note: 'Replaced static imagery with a clickable five-tier temple structure and animated glow.',
    type: 'improvement',
  },
  {
    id: 'metadata-pass',
    date: 'Iteration 04',
    title: 'Agent-readable files exposed',
    note: 'Added public metadata routes for AI inspection: ai.json, projects.json, and llms.txt.',
    type: 'bug',
  },
  {
    id: 'mobile-pass',
    date: 'Iteration 05',
    title: 'Mobile-first polishing',
    note: 'Compressed navigation, stabilized tap targets, and preserved cinematic density on small screens.',
    type: 'improvement',
  },
];
