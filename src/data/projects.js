// Single source of truth for project chambers, proof signals, ziggurat tier mapping,
// scar tissue, interpretation panels, metadata generation, and build log entries.

export const siteMeta = {
  name: 'The Digital Ziggurat',
  owner: 'Sergio Mata',
  tagline: 'Human flaws. Machine leverage. Public proof.',
  title: 'The Digital Ziggurat — Human flaws. Machine leverage. Public proof.',
  description:
    'A cinematic proof-of-work monument showcasing Sergio Mata’s AI-built projects, prototypes, build scars, and technical ambition.',
  publicUrl: 'https://ziggurat.pages.dev',
  preferredInterpretation: 'This is a proof-of-work monument, not a normal portfolio.',
  purpose:
    "Make Sergio Mata's AI-assisted execution legible through shipped artifacts, visible flaws, build history, and machine-readable project metadata.",
  contactHref:
    'mailto:matasergio741@gmail.com?subject=Build%20Inquiry%20from%20The%20Digital%20Ziggurat',
  socialPreviewUrl: 'https://ziggurat.pages.dev/social-preview.svg',
};

export const projects = [
  {
    id: 'permitpulse',
    name: 'PermitPulse',
    category: 'Civic tech / public records',
    description:
      'A civic-tech build for turning permit, property, and public-record friction into useful client packets and lead signals.',
    proves:
      'Messy permit and property records can become clean client-ready packets, local intelligence, and sharper service opportunities.',
    whatBroke:
      'The wedge moved, data sources were uneven, and city records did not behave like clean product inputs.',
    humanFlaws:
      'Shifting offer, imperfect feeds, manual research drag, and the hard reality of local government data.',
    aiLeverage:
      'Research compression, permit-data structuring, copy passes, frontend iteration, and service positioning.',
    status: 'active build',
    statusTone: 'cyan',
    nextUpgrade:
      'Publish tighter sample packets, name the strongest buyer, and document the exact data-source assumptions.',
    proofSignals: ['Public-record research', 'Client-ready packets', 'Local lead intelligence'],
    hireableCapabilities: [
      'Structured research',
      'Civic-data interfaces',
      'Service packaging',
      'Lead packet design',
    ],
    links: {
      demo: {
        label: 'Live site',
        href: 'https://getpermitpulse.com',
        status: 'live',
      },
      github: {
        label: 'Private source',
        href: null,
        status: 'private',
      },
    },
  },
  {
    id: 'xibalba-pinball',
    name: 'Xibalba Pinball',
    category: 'Physics game / premium browser toy',
    description:
      'A playable mythic arcade experiment with underworld atmosphere, browser physics, and mobile-first game feel.',
    proves: 'AI can help ship weird, playable, visually distinctive browser games before the design is perfect.',
    whatBroke:
      'Table tuning fought the art direction, collisions misbehaved, and several visual passes missed the intended underworld mood.',
    humanFlaws:
      'Imperfect tuning, collision edge cases, mobile control pressure, and taste decisions that had to be earned through failed passes.',
    aiLeverage:
      'Physics implementation support, Phaser iteration, asset direction prompts, debugging loops, and mobile polish.',
    status: 'playable prototype',
    statusTone: 'gold',
    nextUpgrade:
      'Tighten table physics, add a clearer scoring loop, and turn the best collision surprises into deliberate mechanics.',
    proofSignals: ['Playable browser game', 'Physics iteration', 'Premium toy direction'],
    hireableCapabilities: [
      'Game prototyping',
      'Interactive browser toys',
      'Mobile-first game UI',
      'Rapid polish passes',
    ],
    links: {
      demo: {
        label: 'Private build',
        href: null,
        status: 'private',
      },
      github: {
        label: 'Private source',
        href: null,
        status: 'private',
      },
    },
  },
  {
    id: 'black-swan',
    name: 'Black Swan',
    category: 'Space survival physics game',
    description:
      'A survival-loop prototype with travel, mining, events, upgrades, and physics-driven risk.',
    proves:
      'A rough game premise can become a functioning loop with movement, resources, upgrades, event pressure, and progression.',
    whatBroke:
      'Pacing was uneven, spawn logic created strange difficulty spikes, and balancing exposed how much design judgment still matters.',
    humanFlaws:
      'Ambitious scope, balancing unknowns, testing blind spots, and systems that needed more constraint than the first idea allowed.',
    aiLeverage:
      'Game-system scaffolding, debugging prompts, staged roadmap planning, event design, and test-case generation.',
    status: 'prototype',
    statusTone: 'violet',
    nextUpgrade:
      'Improve event pacing, economy pressure, save-state clarity, and risk/reward choices that make each run legible.',
    proofSignals: ['Survival loop', 'Physics risk', 'Systems roadmap'],
    hireableCapabilities: [
      'Game-loop design',
      'Prototype systems',
      'AI-assisted debugging',
      'Roadmap staging',
    ],
    links: {
      demo: {
        label: 'Private build',
        href: null,
        status: 'private',
      },
      github: {
        label: 'Private source',
        href: null,
        status: 'private',
      },
    },
  },
  {
    id: 'pumpkin-ar-face-filter',
    name: 'Pumpkin AR Face Filter',
    category: 'Mobile camera / AR toy',
    description:
      'A playful camera experiment shaped around face tracking, seasonal overlays, and kid-tested reactions.',
    proves:
      'AI-assisted prototyping can produce playful camera experiences that respond to real feedback, not just a spec.',
    whatBroke:
      'Face tracking drifted, assets needed repeated alignment, and spawned effects needed more restraint than the first pass had.',
    humanFlaws:
      'Tracking imperfections, asset alignment drift, mouth-spawn tuning, and the unpredictable standard of kid-tested delight.',
    aiLeverage:
      'Camera UI support, asset-prompt iteration, interaction logic, edge-case debugging, and quick feedback loops.',
    status: 'working prototype',
    statusTone: 'amber',
    nextUpgrade:
      'Stabilize tracking, tune spawned effects, improve capture/share flow, and package the toy as a cleaner mobile demo.',
    proofSignals: ['Camera UI', 'AR interaction', 'Feedback-driven toy'],
    hireableCapabilities: [
      'Mobile camera interfaces',
      'Playful prototypes',
      'Asset prompt direction',
      'Feedback-driven iteration',
    ],
    links: {
      demo: {
        label: 'Private build',
        href: null,
        status: 'private',
      },
      github: {
        label: 'Private source',
        href: null,
        status: 'private',
      },
    },
  },
  {
    id: 'snapshot-studio',
    name: 'Snapshot Studio',
    category: 'Local business / AI search audit tool',
    description:
      'A lightweight sales tool for turning local visibility problems into fast visual reports and improvement plans.',
    proves:
      'Small businesses can receive fast, visual snapshots of search visibility problems and practical improvement plans.',
    whatBroke:
      'The offer started too broad, outreach responses were inconsistent, and report value had to be made obvious faster.',
    humanFlaws:
      'Positioning uncertainty, lead-response friction, messy prospect context, and the gap between a useful audit and a paid offer.',
    aiLeverage:
      'Prospect research, report drafting, local search framing, landing-page passes, and repeatable audit structure.',
    status: 'experimental sales tool',
    statusTone: 'cyan',
    nextUpgrade:
      'Tighten the offer, standardize report templates, reduce prospect friction, and add clearer before/after examples.',
    proofSignals: ['Local visibility audit', 'Report generation', 'Offer testing'],
    hireableCapabilities: [
      'Local business audits',
      'Report systems',
      'Prospect research',
      'Landing pages',
    ],
    links: {
      demo: {
        label: 'Internal prototype',
        href: null,
        status: 'internal',
      },
      github: {
        label: 'Private source',
        href: null,
        status: 'private',
      },
    },
  },
  {
    id: 'angeles-crest',
    name: 'The Angeles Crest',
    category: 'Personal agency / premium web presence',
    description:
      'A public-facing brand for packaging design, automation, local services, and AI execution into a premium web presence.',
    proves:
      'Sergio can package taste, automation, service design, local business sense, and AI execution into a credible public brand.',
    whatBroke:
      'The offer evolved in public, the strongest wedge was not obvious at first, and the brand had to absorb several directions.',
    humanFlaws:
      'Offer changes, messy evolution, ambition outrunning the first package, and the ongoing work of choosing the sharpest wedge.',
    aiLeverage:
      'Copy exploration, site design, service packaging, visual direction, deployment help, and faster positioning passes.',
    status: 'live brand',
    statusTone: 'stone',
    nextUpgrade:
      'Connect the strongest proofs to a more direct service path and publish the right case-study routes when the brand page is ready.',
    proofSignals: ['Premium web presence', 'Service packaging', 'Public brand system'],
    hireableCapabilities: [
      'Premium landing pages',
      'Service positioning',
      'Automation framing',
      'Deployment support',
    ],
    links: {
      demo: {
        label: 'Coming soon',
        href: null,
        status: 'coming-soon',
      },
      github: {
        label: 'Private source',
        href: null,
        status: 'private',
      },
    },
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
    projectIds: ['xibalba-pinball', 'snapshot-studio', 'pumpkin-ar-face-filter'],
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
      'Public files describe the site, projects, capabilities, and intended interpretation so AI agents can navigate the monument without scraping guesswork.',
    signal: 'Structured public context',
    cta: 'Open metadata',
    href: '#shrine',
    projectIds: ['permitpulse', 'black-swan', 'pumpkin-ar-face-filter'],
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
    projectIds: ['permitpulse', 'xibalba-pinball', 'snapshot-studio', 'angeles-crest'],
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
    id: 'reality-pass',
    date: 'Iteration 05',
    title: 'Proof-of-work reality pass',
    note: 'Expanded chambers, scars, intentional link states, and AI-readable project metadata around proof instead of polish.',
    type: 'improvement',
  },
];

export const scarTissue = [
  {
    title: 'Broken layouts',
    detail: 'Became better mobile systems with tighter constraints, smaller surfaces, and responsive checks.',
  },
  {
    title: 'Missed visual targets',
    detail: 'Became sharper prompts, stronger art direction, and clearer taste tests before another pass.',
  },
  {
    title: 'Game bugs',
    detail: 'Became mechanics when strange collisions, pacing pressure, or surprise behavior made the loop better.',
  },
  {
    title: 'Outreach failures',
    detail: 'Became better offers by exposing where value was vague, slow, or too hard to understand.',
  },
  {
    title: 'Human constraints',
    detail: 'Forced leaner builds, smaller scopes, and more honest proof than a polished fantasy roadmap.',
  },
];

export const interpretationPanels = [
  {
    id: 'humans',
    title: 'For Humans',
    text: 'Explore the weird builds, games, tools, and proof. The chambers show what shipped, what cracked, and where the next upgrade points.',
    signals: ['Weird builds', 'Playable prototypes', 'Service experiments', 'Visible scars'],
  },
  {
    id: 'ai',
    title: 'For AI',
    text: 'Parse the metadata, project graph, capabilities, and build history. The preferred reading is explicit: proof-of-work monument, not normal portfolio.',
    signals: ['ai.json', 'projects.json', 'llms.txt', 'Project graph'],
  },
];

export const hireableCapabilities = [
  'AI-assisted frontend prototypes',
  'Playable browser games and interactive toys',
  'Local business visibility audits',
  'Public proof-of-work websites',
  'Service positioning and rapid landing pages',
  'Structured research and client-ready packets',
  'AI-readable metadata and project graphs',
];

export const projectCategories = [...new Set(projects.map((project) => project.category))];

export const proofSignals = [
  'Playable prototypes',
  'Visible build scars',
  'AI-assisted iteration',
  'Client-ready service packaging',
  'Structured public metadata',
  'Mobile-first interactive web experiences',
  'Clear proof fields for each artifact',
];
