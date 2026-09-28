// Single source of truth for the homepage, project chambers, ziggurat section
// navigation, contact routes, and generated public metadata.

const contactEmail = 'matasergio741@gmail.com';

const buildMailto = (subject, body) =>
  `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ''
  }`;

export const siteMeta = {
  name: 'The Ziggurat',
  owner: 'Sergio Mata',
  role: 'Frontend + AI implementation',
  tagline: 'Human flaws. Machine leverage. Public proof.',
  title: 'Sergio Mata | Frontend + AI Implementation',
  description:
    'Frontend and AI implementation engineer in Los Angeles. Flagship: Shoot the Moon, a tested 3D strategy game for phone browsers. Plus PermitPulse, source-backed permit research.',
  publicUrl: 'https://ziggurat.pages.dev',
  socialPreviewUrl: 'https://ziggurat.pages.dev/media/shoot-the-moon/og-home-1200x630.jpg',
  socialPreviewAlt:
    'Shoot the Moon, a 3D lunar strategy game by Sergio Mata: a warhead trailing its exhaust across the lit edge of the Moon',
  preferredInterpretation:
    'An engineering portfolio. Sergio Mata builds ambitious frontend and AI implementation products, ships them, and proves they work.',
  purpose:
    'Show how Sergio Mata turns research, product thinking, frontend implementation, data, and AI-assisted development into working public systems.',
  availability: 'Open to contract work, agency overflow and full-time roles.',
  serviceArea: 'Los Angeles / remote',
  email: contactEmail,
  contactHref: buildMailto('Work inquiry for Sergio'),
  githubUrl: 'https://github.com/mataindustries',
  // Only set these once a verified, current destination exists.
  linkedinUrl: null,
  resumeUrl: null,
};

export const contactRoutes = [
  {
    id: 'frontend',
    label: 'I need a site or frontend built',
    subject: 'Frontend project for Sergio',
    body: `Hi Sergio,

I have a frontend or web project I would like to discuss.

The problem:

Timeline:

Budget or scope:
`,
  },
  {
    id: 'ai-workflow',
    label: 'I need an AI workflow implemented',
    subject: 'AI implementation project for Sergio',
    body: `Hi Sergio,

I have a workflow I think could be improved with AI or automation.

The current process:

The biggest pain point:

What I would like to improve:
`,
  },
  {
    id: 'overflow',
    label: 'I have overflow work',
    subject: 'Agency overflow work for Sergio',
    body: `Hi Sergio,

I am looking for implementation help on an existing project.

Stack:

Work needed:

Timeline:
`,
  },
].map((route) => ({ ...route, href: buildMailto(route.subject, route.body) }));

export const implementationServices = [
  {
    title: 'WordPress / Elementor fixes',
    description: 'Layout problems, mobile cleanup, content updates, and broken sections.',
  },
  {
    title: 'Contact forms + email routing',
    description:
      'Form notifications, forwarding problems, aliases, missed leads, and delivery testing.',
  },
  {
    title: 'Landing pages',
    description: 'Focused service, campaign, intake, booking, or quote-request pages.',
  },
  {
    title: 'AI-assisted workflow cleanup',
    description: 'Research, drafting, sorting, reporting, and repetitive internal processes.',
  },
  {
    title: 'Google Business + website audit',
    description:
      'Find conversion friction, inconsistent information, and missing calls to action.',
  },
  {
    title: 'Permit + property research briefs',
    description:
      'Source-backed research that separates verified facts, inference, conflicts, and gaps.',
  },
  {
    title: 'Frontend prototypes',
    description: 'Interactive concepts, browser tools, playable demos, and unusual interfaces.',
  },
  {
    title: 'Small business automation',
    description:
      'Lead intake, follow-up, report generation, and lightweight operational tools.',
  },
];

export const processSteps = [
  {
    title: 'Find the real problem',
    body: 'Start with the workflow, constraint or failure that is actually costing someone time.',
  },
  {
    title: 'Specify the behavior',
    body: 'Define what should happen, what must not change and how success will be tested.',
  },
  {
    title: 'Use the right model for the job',
    body: 'Give coding agents narrow, testable work instead of asking one model to own the whole product.',
  },
  {
    title: 'Verify before it ships',
    body: 'Run the tests, inspect the output and keep the evidence.',
  },
];

export const processEvidence =
  'Shoot the Moon reached 576 passing unit tests before feature freeze.';

// Tiers, in display order: flagship > major > supporting > lab. Archive projects
// stay in source for reference but never render or export publicly.
export const projectTiers = ['flagship', 'major', 'supporting', 'lab', 'archive'];

export const projects = [
  {
    id: 'shoot-the-moon',
    name: 'Shoot the Moon',
    tier: 'flagship',
    category: '3D strategy game / phone browsers',
    description:
      'A 3D lunar strategy game built for phone browsers. Land, mine, build, strike, survive the counterattack and defend your claim on the Moon.',
    feature: {
      eyebrow: 'Flagship project',
      facts: ['576 unit tests', '24 Playwright spec files', 'React + TypeScript + Three.js', 'Save schema v9'],
    },
    proves:
      'Ambitious 3D browser work can be built with real test coverage behind it.',
    hardPart:
      'Keeping player saves compatible while the game kept growing. The save schema is at v9, with migration support for saves from v1 through v8.',
    howBuilt:
      'React 19, TypeScript, Three.js and React Three Fiber on Vite. The game uses zero external 3D model files and two NASA lunar textures. Verification: 576 unit tests across 63 files and 24 Playwright spec files.',
    status: 'Feature freeze',
    statusTone: 'gold',
    badge: 'Flagship project',
    // 16:9 flagship media from the Shoot the Moon final reel assembly, committed under
    // public/media/shoot-the-moon/; the build fails if a set path is missing. A slot set
    // to null drops its control: no poster renders the CSS-only lunar fallback, and no
    // loop or reel hides the preview video or the Watch reel button.
    media: {
      width: 1280,
      height: 720,
      poster: {
        webp: '/media/shoot-the-moon/poster-1280.webp',
        jpg: '/media/shoot-the-moon/poster-1280.jpg',
      },
      alt: 'A Shoot the Moon warhead trailing its exhaust across the lit edge of the Moon',
      // Silent 13.8s preview loop.
      loop: '/media/shoot-the-moon/loop-13s-1280.mp4',
      // Full 57.6s reel with native controls, loaded only from Watch reel. It has no audio.
      reel: '/media/shoot-the-moon/reel-57s-1080.mp4',
    },
    proofSignals: [
      '576 unit tests across 63 files',
      '24 Playwright spec files',
      'Zero external 3D model files',
      'Save schema v9 with v1 to v8 migrations',
    ],
    hireableCapabilities: [
      '3D browser interfaces',
      'React and TypeScript',
      'Automated testing',
      'Mobile-first game UI',
    ],
    tags: ['React 19', 'TypeScript', 'Three.js', 'React Three Fiber', 'Vite', 'NASA lunar textures'],
    links: {
      live: {
        label: 'Play Shoot the Moon',
        href: 'https://shootthemoon.pages.dev/',
      },
      source: {
        label: 'View Shoot the Moon source',
        href: 'https://github.com/mataindustries/shootthemoon',
      },
      // Site-relative: rendered as an in-tab link and made absolute in public metadata.
      caseStudy: {
        label: 'Shoot the Moon case study',
        href: '/work/shoot-the-moon/',
      },
    },
  },
  {
    id: 'permitpulse',
    name: 'PermitPulse',
    tier: 'major',
    subtitle:
      'Public-record software evolved into a human-reviewed California property research service.',
    category: 'Permit + property research / evidence systems',
    description:
      'Source-backed research distilled into concise briefs that separate verified facts, inference, conflicts, unknowns, and missing records.',
    feature: {
      eyebrow: 'Real-world product',
      body: 'Permit and development research gets messy when the answer is spread across city portals, PDFs, maps and conflicting records. PermitPulse follows the paper trail and separates what is verified from what still needs confirmation.',
      facts: ['Source-backed research', 'Unknown stays unknown', 'Human scope review'],
    },
    proves:
      'A software and data experiment can become a disciplined research workflow, real-property proof, and paid-service offer.',
    hardPart:
      'Jurisdiction records arrived with inconsistent structure, incomplete ownership signals, stale portal states, and chronology that had to be reconstructed rather than assumed.',
    howBuilt:
      'AI assists with organizing and reviewing case material, implementation passes, and quality checks. It never approves evidence or acts as an autonomous permit reviewer; findings and delivery require human approval. Briefs preserve source limits and unknowns and do not make legal, title, architectural, engineering, entitlement, code-compliance, or government determinations.',
    status: 'Founding offer live',
    currentStatus:
      'Three California properties for $299 total. Target turnaround is within 48 business hours per address after scope confirmation.',
    statusTone: 'gold',
    badge: 'In market now',
    image: '/projects/permitpulse/permitpulse-00-mission-control-collage.webp',
    imageAlt:
      'PermitPulse research system collage showing Mission Control, evidence records, review workflow, and client brief output',
    imageWidth: 1200,
    imageHeight: 800,
    visualStatus: 'Research workflow + brief',
    visualPosition: 'center center',
    chamberVariant: 'permitpulse',
    operationalFlow: [
      'Research public sources',
      'Separate certainty',
      'Human review',
      'Deliver concise brief',
    ],
    artifacts: [
      {
        src: '/projects/permitpulse/permitpulse-01-mission-control.png',
        alt: 'PermitPulse Mission Control workspace showing case status, investigation health, evidence, timeline, reviewer, and packet navigation',
        label: 'Mission Control',
        caption:
          'A single authenticated workspace holds case state, investigation health, review readiness, and packet operations.',
        width: 720,
        height: 1341,
      },
      {
        src: '/projects/permitpulse/permitpulse-02-evidence-register.png',
        alt: 'PermitPulse evidence register showing verified source records with provenance and contributor details',
        label: 'Evidence Register',
        caption:
          'Source records retain provenance, dates, contributors, verification state, and the boundary between evidence and analysis.',
        width: 719,
        height: 1443,
      },
      {
        src: '/projects/permitpulse/permitpulse-03-case-timeline.png',
        alt: 'PermitPulse reconstructed case timeline with dated permit and communication events',
        label: 'Timeline',
        caption:
          'Dated records are assembled into a reviewable chronology while gaps and unresolved handoffs remain visible.',
        width: 719,
        height: 1350,
      },
      {
        src: '/projects/permitpulse/permitpulse-04-packet-preview.png',
        alt: 'PermitPulse packet preview workspace with readiness checks and generated document pages',
        label: 'Packet Preview',
        caption:
          'Readiness checks gate a deterministic preview before reviewed case material becomes a client deliverable.',
        width: 719,
        height: 1465,
      },
      {
        src: '/projects/permitpulse/permitpulse-05-review-packet-cover.png',
        alt: 'PermitPulse permit review packet cover for an ADU resubmittal case',
        label: 'Review Packet',
        caption:
          'A restrained, client-ready cover records jurisdiction, permit identity, packet version, and generation state.',
        width: 717,
        height: 866,
      },
      {
        src: '/projects/permitpulse/permitpulse-06-executive-summary.png',
        alt: 'PermitPulse executive summary distinguishing confirmed records, unknowns, risks, and strengths',
        label: 'Executive Summary',
        caption:
          'Confirmed facts, missing confirmation, material risks, and useful strengths are separated for human review.',
        width: 719,
        height: 932,
      },
      {
        src: '/projects/permitpulse/permitpulse-07-dependency-map.png',
        alt: 'PermitPulse agency dependency map showing review blockers, supporting evidence, and recommended next steps',
        label: 'Agency Dependency Map',
        caption:
          'Evidence-grounded blockers are translated into agency dependencies and concrete follow-up questions.',
        width: 719,
        height: 925,
      },
      {
        src: '/projects/permitpulse/permitpulse-08-supporting-evidence.png',
        alt: 'PermitPulse supporting evidence page preserving source, review, provenance, and verification details',
        label: 'Supporting Evidence',
        caption:
          'The rendered packet carries evidence summaries and provenance forward so conclusions remain inspectable.',
        width: 720,
        height: 924,
      },
    ],
    milestones: [
      'Primary and public-source research',
      'Facts, inference, conflicts, and unknowns separated',
      'Anonymized real-property proof',
      'Human-reviewed briefs',
      'Decision-ready output',
      'Live founding offer',
    ],
    engineeringNotes: {
      summary:
        'React and TypeScript shape the operational interface. Cloudflare Workers run the application edge, D1 holds structured case state, R2 keeps evidence private, and Better Auth protects the workspace. The packet engine produces consistent HTML and PDF deliverables from reviewed records.',
      technologies: [
        'React',
        'TypeScript',
        'Cloudflare Workers',
        'Cloudflare D1',
        'Cloudflare R2',
        'Better Auth',
        'Deterministic rendering',
        'PDF generation',
        'AI-assisted review',
        'Human approval',
      ],
    },
    proofSignals: [
      'Anonymized real-property proof',
      'Human-reviewed research briefs',
      'Live three-property founding offer',
      'Evidence-centered workflow',
    ],
    hireableCapabilities: [
      'Public-record systems',
      'Evidence-centered interfaces',
      'Operational workflow design',
      'Document generation',
    ],
    tags: [
      'Civic operations',
      'Evidence provenance',
      'Reviewer workflow',
      'Cloudflare infrastructure',
      'Private storage',
      'Deterministic rendering',
    ],
    links: {
      live: {
        label: 'Visit PermitPulse',
        href: 'https://getpermitpulse.com',
      },
      source: null,
      caseStudy: null,
    },
  },
  {
    id: 'sgvturf',
    name: 'SGVTurf',
    tier: 'supporting',
    subtitle: 'An SGV homeowner planning and contractor-discovery system.',
    category: 'Local search / homeowner acquisition system',
    oneLiner:
      'A local-service site built around search intent, service-area pages and lead capture.',
    stack: 'Local search · Official-source research · Lead capture',
    description:
      'Connects local homeowner search intent to city guidance, official-source rebate context, a structured project brief, and relevant contractor discovery.',
    proves:
      'Useful local information can form a clear acquisition path from search intent to a contractor-ready inquiry.',
    hardPart:
      'Rebate rules change, city context varies, and an empty contractor roster must not look like participation.',
    howBuilt:
      'AI assists with research organization, city-page implementation, funnel iteration, and outreach preparation. Rebate claims are checked against official sources. The founding test is explicit about its limits: no contractor participation, lead volume, revenue, or result is claimed.',
    status: 'Live market test',
    currentStatus:
      'The homeowner brief, 2026 turf-replacement rebate resource, city guides, and editorial system are live. Founding-contractor outreach is testing the referral side.',
    statusTone: 'cyan',
    image: '/projects/sgvturf.webp',
    imageType: 'project image',
    imageAlt: 'Drought-smart front yard visual used by SGVTurf',
    imageWidth: 1672,
    imageHeight: 941,
    visualStatus: 'Live SGV planning system',
    visualPosition: 'center center',
    operationalFlow: [
      'Local search intent',
      'Planning + rebate context',
      'Structured project brief',
      'Contractor discovery',
    ],
    proofSignals: [
      'Official-source rebate research',
      'Homeowner-to-contractor funnel',
      'SGV city planning guides',
    ],
    hireableCapabilities: [
      'Local search strategy',
      'Acquisition funnel design',
      'Research systems',
      'Structured intake',
    ],
    tags: [
      'San Gabriel Valley',
      'Local acquisition',
      'Official-source research',
      'Editorial systems',
      'Contractor discovery',
    ],
    links: {
      live: {
        label: 'Visit SGVTurf',
        href: 'https://sgvturf.com',
      },
      source: null,
      caseStudy: null,
    },
  },
  {
    id: 'snapshot-studio',
    name: 'Snapshot Studio',
    tier: 'supporting',
    category: 'Local business / AI search audit tool',
    oneLiner:
      'Turns a business intake into a structured improvement snapshot and action plan.',
    stack: 'Report generation · Local visibility audits',
    description:
      'A lightweight sales tool for turning local visibility problems into fast visual reports and improvement plans.',
    proves:
      'Small businesses can receive fast, visual snapshots of search visibility problems and practical improvement plans.',
    hardPart:
      'The offer started too broad, outreach responses were inconsistent, and report value had to be made obvious faster.',
    howBuilt:
      'AI supports prospect research, report drafting, local search framing, landing-page passes, and a repeatable audit structure. The human work is closing the gap between a useful audit and a paid offer.',
    status: 'Live sample tool',
    statusTone: 'cyan',
    image: '/projects/snapshot-studio.jpg',
    imageAlt: 'Snapshot Studio lead-to-report workflow interface',
    imageWidth: 720,
    imageHeight: 1368,
    visualStatus: 'Live workflow interface',
    thumbPosition: 'center top',
    proofSignals: ['Local visibility audit', 'Report generation', 'Offer testing'],
    hireableCapabilities: [
      'Local business audits',
      'Report systems',
      'Prospect research',
      'Landing pages',
    ],
    links: {
      live: {
        label: 'Open live sample',
        href: 'https://snapshot-studio.pages.dev',
      },
      source: null,
      caseStudy: null,
    },
  },
  {
    id: 'xibalba-pinball',
    name: 'Xibalba Pinball',
    tier: 'supporting',
    category: 'Physics game / premium browser toy',
    oneLiner: 'Browser pinball with physics, scoring and a global leaderboard.',
    stack: 'Phaser · Browser physics · Touch controls',
    description:
      'A mythic five-ball score attack with touch controls, browser physics, and a global Wall of Champions.',
    proves: 'AI-assisted development can ship a weird, playable, visually distinctive browser game.',
    hardPart:
      'Table tuning fought the art direction, collisions misbehaved, and several visual passes missed the intended underworld mood.',
    howBuilt:
      'Built with AI support for physics implementation, Phaser iteration, asset direction prompts, debugging loops, and mobile polish. Table feel, collision edge cases, and taste decisions were earned through failed passes.',
    status: 'Live game',
    statusTone: 'gold',
    image: '/projects/xibalba.jpg',
    imageAlt: 'Xibalba Pinball live game screenshot',
    imageWidth: 720,
    imageHeight: 1319,
    thumbPosition: 'center 30%',
    proofSignals: ['Playable browser game', 'Physics iteration', 'Premium toy direction'],
    hireableCapabilities: [
      'Game prototyping',
      'Interactive browser toys',
      'Mobile-first game UI',
      'Rapid polish passes',
    ],
    links: {
      live: {
        label: 'Play live',
        href: 'https://xibalba.pages.dev',
      },
      source: null,
      caseStudy: null,
    },
  },
  {
    id: 'bouncebox',
    name: 'BounceBox',
    tier: 'supporting',
    subtitle: 'Physics Groovebox',
    category: 'Experimental Browser Instrument',
    oneLiner:
      'A mobile music playground built with Web Audio, generative MIDI and dense touch controls.',
    stack: 'TypeScript · Web Audio · Generative MIDI',
    description:
      'A mobile-first physics groovebox that turns bouncing balls and AI-generated MIDI patterns into a playable instrument.',
    proves:
      'Browser-native physics, audio, generative controls, and mobile UI can become a distinctive playable instrument.',
    hardPart:
      'Rhythm feel, touch ergonomics, MIDI prompt boundaries, and dense performance controls all had to be tuned into something playable.',
    howBuilt:
      'TypeScript iteration with a custom ChatGPT MIDI Lab for generative pattern design, plus mobile UI passes, control naming, and performance-state testing. The taste work was making unusual mechanics feel intentional.',
    status: 'Live instrument',
    statusTone: 'gold',
    image: '/images/bouncebox/bouncebox-808-performance.png',
    imageAlt: 'BounceBox 808 performance screen',
    imageWidth: 720,
    imageHeight: 1342,
    thumbPosition: 'center top',
    detailImage: {
      src: '/images/bouncebox/bouncebox-midi-lab.png',
      alt: 'BounceBox MIDI Lab screen',
      label: 'MIDI Lab',
      width: 720,
      height: 1457,
    },
    visualStatus: 'Live performance',
    visualPosition: 'center center',
    proofSignals: ['Physics groovebox', 'AI-generated MIDI', 'Mobile performance UI'],
    hireableCapabilities: [
      'Creative coding',
      'Interactive audio systems',
      'Generative UI',
      'Mobile-first web instruments',
    ],
    links: {
      live: {
        label: 'Open live instrument',
        href: 'https://bouncebox.pages.dev',
      },
      source: null,
      caseStudy: null,
    },
  },
  {
    id: 'danger-close',
    name: 'Danger Close',
    tier: 'lab',
    category: 'Browser game / drone survival prototype',
    oneLiner: 'Interactive browser experiment focused on fast tactical feedback.',
    description:
      'A tactical browser survival game about piloting a salvage drone through dead zones, collecting resources, surviving enemy pressure, and upgrading hardware between runs.',
    proves:
      'AI-assisted development can ship a polished browser game loop with sector selection, upgrade systems, enemy pressure, resource collection, survival pacing, and premium sci-fi interface design.',
    hardPart:
      'Early balancing passes created uneven pressure, dense combat states reduced clarity, and experimental systems did not always share a clean plan.',
    howBuilt:
      'Used Codex and frontier AI models for gameplay systems, UI polish, enemy behavior, upgrade design, copy, testing checklists, and rapid iteration. Balancing is still evolving and visual density needs tuning.',
    status: 'Live game',
    currentStatus: 'Live playable prototype',
    statusTone: 'cyan',
    image: '/projects/danger-close.jpg',
    imageAlt: 'Danger Close browser survival game screenshot',
    imageWidth: 720,
    imageHeight: 1357,
    visualStatus: 'live project',
    visualPosition: 'center center',
    artifacts: [
      {
        src: '/projects/danger-close-sector.jpg',
        alt: 'Danger Close sector selection screenshot',
        label: 'Sector selection',
        width: 720,
        height: 1351,
      },
      {
        src: '/projects/danger-close-upgrades.jpg',
        alt: 'Danger Close hangar upgrades screenshot',
        label: 'Hangar upgrades',
        width: 719,
        height: 1302,
      },
      {
        src: '/projects/danger-close-combat.jpg',
        alt: 'Danger Close combat in the Dead Datacenter screenshot',
        label: 'Combat / Dead Datacenter',
        width: 720,
        height: 1350,
      },
    ],
    tags: [
      'Browser game',
      'Survival loop',
      'Drone combat',
      'Upgrade systems',
      'AI-assisted game design',
      'Cloudflare Pages',
      'Playable prototype',
    ],
    proofSignals: ['Playable browser game', 'Drone survival loop', 'AI-assisted game design'],
    hireableCapabilities: [
      'Browser game prototyping',
      'Gameplay system design',
      'Premium sci-fi interfaces',
      'AI-assisted iteration',
    ],
    links: {
      live: {
        label: 'Play live',
        href: 'https://dangerclose.pages.dev',
      },
      source: null,
      caseStudy: null,
    },
  },
  {
    id: 'angeles-crest',
    name: 'The Angeles Crest',
    tier: 'lab',
    category: 'Editorial resource / local endurance guide',
    oneLiner: 'An ongoing local publishing and web experiment.',
    description:
      'An unofficial AC100 guide covering training, course strategy, crew logistics, qualifiers, gear, and local San Gabriel knowledge.',
    proves:
      'Research, editorial structure, local context, and frontend implementation can become a useful niche information system.',
    hardPart:
      'A broad brand concept had to narrow into one useful editorial resource with clearer reader intent.',
    howBuilt:
      'AI supports research organization, editorial structure, site implementation, visual direction, and deployment. The project evolved in public, changed direction, and still carries the limits of an unofficial guide.',
    status: 'Public draft',
    statusTone: 'stone',
    image: '/projects/angeles-crest.jpg',
    imageAlt: 'The Angeles Crest unofficial AC100 guide draft screenshot',
    imageWidth: 719,
    imageHeight: 1348,
    visualStatus: 'Draft editorial guide',
    proofSignals: ['Editorial research system', 'Local endurance guide', 'Niche web resource'],
    hireableCapabilities: [
      'Editorial information design',
      'Research organization',
      'Niche content systems',
      'Frontend implementation',
    ],
    links: {
      live: {
        label: 'Open public draft',
        href: 'https://theangelescrest.pages.dev',
      },
      source: null,
      caseStudy: null,
    },
  },
  {
    id: 'black-swan',
    name: 'Black Swan',
    tier: 'archive',
    category: 'Space survival physics game',
    description:
      'A survival-loop prototype with travel, mining, events, upgrades, and physics-driven risk.',
    proves:
      'A rough game premise can become a functioning loop with movement, resources, upgrades, event pressure, and progression.',
    hardPart:
      'Pacing was uneven, spawn logic created strange difficulty spikes, and balancing exposed how much design judgment still matters.',
    howBuilt:
      'Game-system scaffolding, debugging prompts, staged roadmap planning, event design, and test-case generation.',
    status: 'Private prototype',
    statusTone: 'violet',
    proofSignals: ['Survival loop', 'Physics risk', 'Systems roadmap'],
    hireableCapabilities: [
      'Game-loop design',
      'Prototype systems',
      'AI-assisted debugging',
      'Roadmap staging',
    ],
    links: {
      live: null,
      source: null,
      caseStudy: null,
    },
  },
  {
    id: 'pumpkin-ar-face-filter',
    name: 'Pumpkin AR Face Filter',
    tier: 'archive',
    category: 'Mobile camera / AR toy',
    description:
      'A playful camera experiment shaped around face tracking, seasonal overlays, and kid-tested reactions.',
    proves:
      'AI-assisted prototyping can produce playful camera experiences that respond to real feedback, not just a spec.',
    hardPart:
      'Face tracking drifted, assets needed repeated alignment, and spawned effects needed more restraint than the first pass had.',
    howBuilt:
      'Camera UI support, asset-prompt iteration, interaction logic, edge-case debugging, and quick feedback loops.',
    status: 'Working prototype',
    statusTone: 'amber',
    proofSignals: ['Camera UI', 'AR interaction', 'Feedback-driven toy'],
    hireableCapabilities: [
      'Mobile camera interfaces',
      'Playful prototypes',
      'Asset prompt direction',
      'Feedback-driven iteration',
    ],
    links: {
      live: null,
      source: null,
      caseStudy: null,
    },
  },
];

export const publicProjects = projects.filter((project) => project.tier !== 'archive');

export const projectsByTier = (tier) => projects.filter((project) => project.tier === tier);

export const getProject = (id) => projects.find((project) => project.id === id);

// The visual Ziggurat tiers are section navigation, listed bottom to top.
export const zigguratTiers = [
  { id: 'lab', name: 'Lab', href: '#lab' },
  { id: 'process', name: 'How I build', href: '#process' },
  { id: 'work', name: 'Shipped work', href: '#work' },
  { id: 'permitpulse', name: 'PermitPulse', href: '#permitpulse' },
  { id: 'shoot-the-moon', name: 'Shoot the Moon', href: '#shoot-the-moon' },
];

export const hireableCapabilities = [
  'Frontend engineering with React and TypeScript',
  '3D web interfaces with Three.js and React Three Fiber',
  'AI-assisted workflow implementation',
  'Automated testing with unit tests and Playwright',
  'Cloudflare Workers, D1, and R2 systems',
  'Review workflows and deterministic PDF generation',
  'Landing pages and local-service sites',
  'WordPress and Elementor support',
];

export const projectCategories = [
  ...new Set(publicProjects.map((project) => project.category)),
];

export const proofSignals = [
  'Shoot the Moon: 576 unit tests across 63 files',
  'Shoot the Moon: 24 Playwright spec files',
  'PermitPulse: live source-backed research product',
  'Human review before research delivery',
  'Live deployed browser projects',
  'Structured public metadata',
];
