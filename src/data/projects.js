// Single source of truth for project chambers, proof signals, ziggurat tier mapping,
// scar tissue, interpretation panels, metadata generation, and build log entries.

export const siteMeta = {
  name: 'The Ziggurat',
  owner: 'Sergio Mata',
  tagline: 'Human flaws. Machine leverage. Public proof.',
  title: 'Sergio Mata | Products, Systems, and Interactive Work | The Ziggurat',
  description:
    'Explore Sergio Mata’s live products, research systems, local acquisition experiments, frontend builds, and interactive work.',
  publicUrl: 'https://ziggurat.pages.dev',
  socialPreviewUrl: 'https://ziggurat.pages.dev/the-ziggurat-og.png',
  socialPreviewAlt:
    'The Ziggurat social preview image showing a futuristic digital ziggurat and the tagline Human flaws. Machine leverage. Public proof.',
  preferredInterpretation: 'This is a proof-of-work monument, not a normal portfolio.',
  purpose:
    "Show how Sergio Mata turns research, product thinking, frontend implementation, data, and AI-assisted development into working public systems.",
  availability: 'Open to focused product and implementation work',
  serviceArea: 'San Gabriel Valley / Los Angeles / remote',
  contactHref:
    'mailto:matasergio741@gmail.com?subject=Project%20Inquiry%20from%20The%20Ziggurat&body=Hi%20Sergio%2C%0A%0AThe%20problem%20or%20project%3A%0A%0ALink%20or%20context%3A%0A%0ATimeline%3A%0A',
  generalContactHref:
    'mailto:matasergio741@gmail.com?subject=Work%20Inquiry%20from%20The%20Ziggurat',
};

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

export const servicePaths = [
  {
    id: 'permit-support',
    tone: 'gold',
    label: 'Permit + project support',
    heading: 'California property research through PermitPulse',
    description:
      'Human-reviewed permit and property research for contractors, architects, small builders, and property decision-makers who need the paper trail before a bid, purchase, plan, or build.',
    proofPoints: [
      'Primary and public sources',
      'Facts, inference, conflicts, and gaps separated',
      'Anonymized real-property proof',
      'Three properties for $299 total',
    ],
    machineReadablePositioning: [
      'source-backed California permit and property research',
      'human-reviewed decision briefs',
      'anonymized real-property proof',
      'three-property founding offer',
    ],
    primaryLink: {
      label: 'Visit PermitPulse live',
      href: 'https://getpermitpulse.com',
      format: 'Live founding offer',
      newTab: true,
    },
    secondaryLink: {
      label: 'Ask about an address',
      href: 'mailto:matasergio741@gmail.com?subject=PermitPulse%20Property%20Research&body=Hi%20Sergio%2C%0A%0AProperty%20address%3A%0A%0AWhat%20I%20need%20to%20understand%3A%0A',
    },
  },
  {
    id: 'web-workflow-support',
    tone: 'cyan',
    label: 'Web + workflow support',
    heading: 'Fast web fixes for local businesses and agencies',
    description:
      'Focused help with broken forms, WordPress and Elementor issues, landing pages, website audits, and lightweight workflow automation.',
    proofPoints: [
      'Contact forms and email routing',
      'WordPress / Elementor fixes',
      'Landing and quote pages',
      'Website audits and intake automation',
    ],
    machineReadablePositioning: [
      'WordPress and Elementor fixes',
      'contact form and email-routing fixes',
      'landing pages',
      'website audits',
      'small business workflow automation',
    ],
    primaryLink: {
      label: 'Send your website',
      href: 'mailto:matasergio741@gmail.com?subject=Website%20Fix%20Request&body=Hi%20Sergio%2C%0A%0AWebsite%20link%3A%0A%0AThe%20one%20thing%20I%20need%20fixed%3A%0A%0ATimeline%3A%0A',
      format: 'Direct email',
    },
    secondaryLink: {
      label: 'Inspect live work',
      href: '/#projects',
    },
  },
];

export const projects = [
  {
    id: 'permitpulse',
    name: 'PermitPulse',
    subtitle:
      'Public-record software evolved into a human-reviewed California property research service.',
    category: 'Permit + property research / evidence systems',
    description:
      'Source-backed research distilled into concise briefs that separate verified facts, inference, conflicts, unknowns, and missing records.',
    proves:
      'A software and data experiment can become a disciplined research workflow, real-property proof, and paid-service offer.',
    whatBroke:
      'Jurisdiction records arrived with inconsistent structure, incomplete ownership signals, stale portal states, and chronology that had to be reconstructed rather than assumed.',
    humanFlaws:
      'The brief preserves source limits and unknowns. It does not make legal, title, architectural, engineering, entitlement, code-compliance, or government determinations.',
    aiLeverage:
      'AI assists with organizing and reviewing case material, implementation passes, and quality checks. It never approves evidence or acts as an autonomous permit reviewer; findings and delivery require human approval.',
    status: 'Founding offer live',
    currentStatus:
      'Three California properties for $299 total. Target turnaround is within 48 business hours per address after scope confirmation.',
    statusTone: 'gold',
    featured: true,
    flagshipLabel: 'In market now',
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
    connections: [
      {
        name: 'Snapshot Studio',
        note: 'Turns irregular source material into a concise, inspectable report.',
      },
      {
        name: 'Portfolio',
        note: 'Treats visible proof, metadata, and delivery craft as parts of the same artifact.',
      },
      {
        name: 'Danger Close',
        note: 'Makes dense system state legible through a focused mission-control interface.',
      },
      {
        name: 'Xibalba',
        note: 'Uses atmosphere in service of interaction instead of as decoration alone.',
      },
      {
        name: 'BounceBox',
        note: 'Builds a serious mobile control surface around an unconventional workflow.',
      },
    ],
    nextUpgrade:
      'Test the founding offer with real property questions while hardening source checks, review safeguards, and brief quality.',
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
      demo: {
        label: 'Visit PermitPulse live',
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
    id: 'sgvturf',
    name: 'SGVTurf',
    subtitle: 'An SGV homeowner planning and contractor-discovery system.',
    category: 'Local search / homeowner acquisition system',
    description:
      'Connects local homeowner search intent to city guidance, official-source rebate context, a structured project brief, and relevant contractor discovery.',
    proves:
      'Useful local information can form a clear acquisition path from search intent to a contractor-ready inquiry.',
    whatBroke:
      'Rebate rules change, city context varies, and an empty contractor roster must not look like participation.',
    humanFlaws:
      'The founding test is explicit about its limits. No contractor participation, lead volume, revenue, or result is claimed.',
    aiLeverage:
      'AI assists with research organization, city-page implementation, funnel iteration, and outreach preparation. Rebate claims are checked against official sources.',
    status: 'Live market test',
    currentStatus:
      'The homeowner brief, 2026 turf-replacement rebate resource, city guides, and editorial system are live. Founding-contractor outreach is testing the referral side.',
    statusTone: 'cyan',
    flagshipLabel: 'In market now',
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
    nextUpgrade:
      'Run the founding-contractor test without overstating participation, traffic, or outcomes.',
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
      demo: {
        label: 'Visit SGVTurf live',
        href: 'https://sgvturf.com',
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
      'A mythic five-ball score attack with touch controls, browser physics, and a global Wall of Champions.',
    proves: 'AI-assisted development can ship a weird, playable, visually distinctive browser game.',
    whatBroke:
      'Table tuning fought the art direction, collisions misbehaved, and several visual passes missed the intended underworld mood.',
    humanFlaws:
      'Imperfect tuning, collision edge cases, mobile control pressure, and taste decisions that had to be earned through failed passes.',
    aiLeverage:
      'Physics implementation support, Phaser iteration, asset direction prompts, debugging loops, and mobile polish.',
    status: 'Live game',
    statusTone: 'gold',
    image: '/projects/xibalba.jpg',
    imageAlt: 'Xibalba Pinball live game screenshot',
    imageWidth: 720,
    imageHeight: 1319,
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
        label: 'Play live',
        href: 'https://xibalba.pages.dev',
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
    id: 'danger-close',
    name: 'Danger Close',
    category: 'Browser game / drone survival prototype',
    description:
      'A tactical browser survival game about piloting a salvage drone through dead zones, collecting resources, surviving enemy pressure, and upgrading hardware between runs.',
    proves:
      'AI-assisted development can ship a polished browser game loop with sector selection, upgrade systems, enemy pressure, resource collection, survival pacing, and premium sci-fi interface design.',
    whatBroke:
      'Early balancing passes created uneven pressure, dense combat states reduced clarity, and experimental systems did not always share a clean plan.',
    humanFlaws:
      'Balancing is still evolving, visual density needs tuning, and some systems grew from rough experiments rather than a perfect plan.',
    aiLeverage:
      'Used Codex and frontier AI models for gameplay systems, UI polish, enemy behavior, upgrade design, copy, testing checklists, and rapid iteration.',
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
    nextUpgrade:
      'More enemy variety, better map drama, stronger audio/impact polish, and a sharper onboarding flow.',
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
      demo: {
        label: 'Play live',
        href: 'https://dangerclose.pages.dev',
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
    id: 'bouncebox',
    name: 'BounceBox',
    subtitle: 'Physics Groovebox',
    category: 'Experimental Browser Instrument',
    description:
      'A mobile-first physics groovebox that turns bouncing balls and AI-generated MIDI patterns into a playable instrument.',
    proves:
      'Browser-native physics, audio, generative controls, and mobile UI can become a distinctive playable instrument.',
    whatBroke:
      'Rhythm feel, touch ergonomics, MIDI prompt boundaries, and dense performance controls all had to be tuned into something playable.',
    humanFlaws:
      'Ambitious scope, strange interaction design, performance-control density, and the taste work of making weird mechanics feel intentional.',
    aiLeverage:
      'Custom ChatGPT MIDI Lab, generative pattern design, TypeScript iteration, mobile UI passes, control naming, and performance-state testing.',
    status: 'Live instrument',
    statusTone: 'gold',
    image: '/images/bouncebox/bouncebox-808-performance.png',
    imageAlt: 'BounceBox 808 performance screen',
    imageWidth: 720,
    imageHeight: 1342,
    detailImage: {
      src: '/images/bouncebox/bouncebox-midi-lab.png',
      alt: 'BounceBox MIDI Lab screen',
      label: 'MIDI Lab',
      width: 720,
      height: 1457,
    },
    visualStatus: 'Live performance',
    visualPosition: 'center center',
    nextUpgrade:
      'Deepen the MIDI Lab, refine groove snapshot recall, and document the performance workflow as a public case study.',
    proofSignals: [
      'Physics groovebox',
      'AI-generated MIDI',
      'Mobile performance UI',
    ],
    hireableCapabilities: [
      'Creative coding',
      'Interactive audio systems',
      'Generative UI',
      'Mobile-first web instruments',
    ],
    links: {
      demo: {
        label: 'Open live instrument',
        href: 'https://bouncebox.pages.dev',
        status: 'live',
      },
      github: {
        label: 'GitHub Repo',
        href: null,
        status: 'repo pending',
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
    status: 'Private prototype',
    statusTone: 'violet',
    artifactState: 'Private Build',
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
    status: 'Working prototype',
    statusTone: 'amber',
    artifactState: 'Artifact Pending',
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
    status: 'Live sample tool',
    statusTone: 'cyan',
    image: '/projects/snapshot-studio.jpg',
    imageAlt: 'Snapshot Studio lead-to-report workflow interface',
    imageWidth: 720,
    imageHeight: 1368,
    visualStatus: 'Live workflow interface',
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
        label: 'Open live sample',
        href: 'https://snapshot-studio.pages.dev',
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
    id: 'angeles-crest',
    name: 'The Angeles Crest',
    category: 'Editorial resource / local endurance guide',
    description:
      'An unofficial AC100 guide covering training, course strategy, crew logistics, qualifiers, gear, and local San Gabriel knowledge.',
    proves:
      'Research, editorial structure, local context, and frontend implementation can become a useful niche information system.',
    whatBroke:
      'A broad brand concept had to narrow into one useful editorial resource with clearer reader intent.',
    humanFlaws:
      'The project evolved in public, changed direction, and still carries the limits of an unofficial guide.',
    aiLeverage:
      'Research organization, editorial structure, site implementation, visual direction, and deployment support.',
    status: 'Public draft',
    statusTone: 'stone',
    image: '/projects/angeles-crest.jpg',
    imageAlt: 'The Angeles Crest unofficial AC100 guide draft screenshot',
    imageWidth: 719,
    imageHeight: 1348,
    visualStatus: 'Draft editorial guide',
    nextUpgrade:
      'Repair the public contact and canonical domain, then keep high-stakes race details source-linked and current.',
    proofSignals: ['Editorial research system', 'Local endurance guide', 'Niche web resource'],
    hireableCapabilities: [
      'Editorial information design',
      'Research organization',
      'Niche content systems',
      'Frontend implementation',
    ],
    links: {
      demo: {
        label: 'Open public draft',
        href: 'https://theangelescrest.pages.dev',
        status: 'live',
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
    projectIds: [
      'bouncebox',
      'xibalba-pinball',
      'danger-close',
      'snapshot-studio',
      'pumpkin-ar-face-filter',
    ],
  },
  {
    id: 'codex-forge',
    name: 'Codex Forge',
    title: 'PermitPulse anchors the engineering forge.',
    description:
      'The system turns fragmented records into source-backed, human-reviewed briefs and carries that workflow into a live service offer.',
    signal: 'Research systems engineering',
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
    projectIds: [
      'permitpulse',
      'sgvturf',
      'bouncebox',
      'xibalba-pinball',
      'snapshot-studio',
      'angeles-crest',
    ],
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
  'focused product and implementation work',
  'source-backed permit and property research',
  'local search and acquisition systems',
  'Cloudflare Workers, D1, and R2 systems',
  'review workflows and deterministic PDF generation',
  'WordPress and Elementor support',
  'contact form and email-routing fixes',
  'landing pages and quote-request pages',
  'AI-assisted workflow cleanup',
  'local business website audits',
  'human-reviewed research briefs',
  'frontend prototyping',
  'small business automation',
  'San Gabriel Valley / Los Angeles / remote',
  'browser game prototypes',
  'interactive audio toys',
  'Cloudflare Pages deployment',
  'visual proof-of-work systems',
  'rapid prototype iteration with Codex and frontier AI models',
];

export const projectCategories = [...new Set(projects.map((project) => project.category))];

export const proofSignals = [
  'PermitPulse live founding offer',
  'SGVTurf local acquisition experiment',
  'Evidence-backed human review workflows',
  'Playable prototypes',
  'Visible build scars',
  'AI-assisted iteration',
  'Client-ready service packaging',
  'Structured public metadata',
  'Mobile-first interactive web experiences',
  'Audio/visual experimentation',
  'Clear proof fields for each artifact',
];
