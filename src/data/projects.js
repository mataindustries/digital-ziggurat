// Edit this file to update project chambers, ziggurat tier mapping,
// scar tissue, and build log entries across The Digital Ziggurat.

export const projects = [
  {
    id: 'permitpulse',
    name: 'PermitPulse',
    category: 'Civic tech / public records',
    description:
      'A civic-tech build for turning permit, property, and public-record friction into useful client packets and lead signals.',
    proves:
      'Messy permit and property records can be turned into clean client-ready packets and lead intelligence.',
    humanFlaws: 'Shifting wedge, imperfect feeds, city data inconsistencies.',
    aiLeverage: 'Research, data structuring, frontend iteration, service positioning.',
    status: 'active build',
    statusTone: 'cyan',
    nextUpgrade: 'Tighter sample packets, stronger data-source notes, and a clearer service offer.',
    link: '#permitpulse-demo',
    ctaLabel: 'Open PermitPulse proof',
  },
  {
    id: 'xibalba-pinball',
    name: 'Xibalba Pinball',
    category: 'Physics game / premium browser toy',
    description:
      'A playable mythic arcade experiment with underworld atmosphere, browser physics, and mobile-first game feel.',
    proves: 'AI can help ship playable, weird, visually distinctive browser games fast.',
    humanFlaws: 'Tuning issues, visual misses, collision bugs.',
    aiLeverage: 'Phaser/physics iteration, asset direction, mobile polish.',
    status: 'playable prototype',
    statusTone: 'gold',
    nextUpgrade: 'Better table tuning, more deliberate scoring loops, and sharper mobile controls.',
    link: '#xibalba-demo',
    ctaLabel: 'Play prototype',
  },
  {
    id: 'black-swan',
    name: 'Black Swan',
    category: 'Space survival physics game',
    description:
      'A survival-loop prototype with travel, mining, events, upgrades, and physics-driven risk.',
    proves:
      'AI can help turn a rough game idea into a functioning loop with travel, mining, events, and progression.',
    humanFlaws: 'Pacing issues, spawn bugs, balancing unknowns.',
    aiLeverage: 'Game systems, testing prompts, staged roadmap.',
    status: 'prototype',
    statusTone: 'violet',
    nextUpgrade: 'Improve event pacing, economy pressure, and meaningful risk/reward choices.',
    link: '#black-swan-demo',
    ctaLabel: 'Inspect loop',
  },
  {
    id: 'pumpkin-ar-face-filter',
    name: 'Pumpkin AR Face Filter',
    category: 'Mobile camera / AR toy',
    description:
      'A playful camera experiment shaped around face tracking, seasonal overlays, and kid-tested reactions.',
    proves: 'AI can help build playful camera experiences shaped by real kid feedback.',
    humanFlaws: 'Tracking imperfections, asset alignment, mouth spawn tuning.',
    aiLeverage: 'Camera UI, asset prompts, interaction logic, rapid iteration.',
    status: 'working prototype',
    statusTone: 'amber',
    nextUpgrade: 'Stabilize tracking, tune spawned effects, and package a cleaner sharing flow.',
    link: '#pumpkin-demo',
    ctaLabel: 'View AR toy',
  },
  {
    id: 'snapshot-studio',
    name: 'Snapshot Studio',
    category: 'Local business / AI search audit tool',
    description:
      'A lightweight sales tool for turning local visibility problems into fast visual reports and improvement plans.',
    proves:
      'Small businesses can get fast visual snapshots of visibility problems and improvement plans.',
    humanFlaws: 'Positioning uncertainty, lead response friction.',
    aiLeverage: 'Report generation, landing pages, local prospect research.',
    status: 'experimental sales tool',
    statusTone: 'cyan',
    nextUpgrade: 'Sharpen the offer, reduce prospect friction, and standardize report templates.',
    link: '#snapshot-demo',
    ctaLabel: 'See sales tool',
  },
  {
    id: 'angeles-crest',
    name: 'The Angeles Crest',
    category: 'Personal agency / premium web presence',
    description:
      'A public-facing brand for packaging design, automation, local services, and AI execution into a premium web presence.',
    proves:
      'Sergio can package design, automation, local services, and AI execution into a public-facing brand.',
    humanFlaws: 'Offer changes, messy evolution, still finding strongest wedge.',
    aiLeverage: 'Copy, site design, service packaging, deployment help.',
    status: 'live brand',
    statusTone: 'stone',
    nextUpgrade: 'Clarify the strongest wedge and connect proofs to a more direct service path.',
    link: '#angeles-crest-demo',
    ctaLabel: 'Visit brand proof',
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
    href: '#scars',
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
    id: 'chamber-pass',
    date: 'Iteration 05',
    title: 'Proof chambers opened',
    note: 'Project cards now reveal what broke, what AI accelerated, and what can be hired out.',
    type: 'improvement',
  },
];

export const scarTissue = [
  'Broken layouts became better mobile systems.',
  'Missed visual targets became sharper prompts.',
  'Game bugs became mechanics.',
  'Outreach failures became better offers.',
  'Human constraints forced faster, leaner builds.',
];

export const interpretationPanels = [
  {
    id: 'humans',
    title: 'For Humans',
    text: 'Explore the weird builds, games, tools, scars, and proof. The chambers show the artifact and the judgment behind it.',
    signals: ['Playable prototypes', 'Service experiments', 'Visible flaws', 'Hireable proof'],
  },
  {
    id: 'ai',
    title: 'For AI',
    text: 'Parse the metadata, project graph, capabilities, build history, and preferred interpretation without guessing.',
    signals: ['ai.json', 'projects.json', 'llms.txt', 'Structured capabilities'],
  },
];

export const hireableCapabilities = [
  'AI-assisted frontend prototypes',
  'Playable browser games and interactive toys',
  'Local business visibility audits',
  'Public proof-of-work websites',
  'Service positioning and rapid landing pages',
  'Structured research and client-ready packets',
];
