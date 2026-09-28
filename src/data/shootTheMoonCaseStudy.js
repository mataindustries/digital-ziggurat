// Copy for the Shoot the Moon case study at /work/shoot-the-moon/. Imported only by that
// page, so none of it ships in the homepage bundle.
//
// Every figure and technical claim was checked against mataindustries/shootthemoon at
// 2d9042f on 2026-09-28: `npx vitest run` (576 passed, 63 files), e2e/*.spec.ts (24),
// src/persistence/outpostSave.ts (OUTPOST_SAVE_SCHEMA_VERSION = 9, v1 to v8 migrate),
// package.json, ASSETS.md, ARCHITECTURE.md, PERFORMANCE_BUDGET.md, VISUAL_DIRECTION.md,
// src/camera/strikeRoute.ts and capture/README.md. Re-verify there before changing one.
//
// Deliberately absent: measured phone frame rates and the current bundle size.
// PERFORMANCE_BUDGET.md still lists physical Pixel 6a acceptance as open, and the last
// recorded gzip size is commit-specific.

export const shootTheMoonCaseStudy = {
  verification: {
    repo: 'mataindustries/shootthemoon',
    commit: '2d9042f',
    date: '28 September 2026',
  },

  positioning: 'A browser strategy game built as a deterministic real-time 3D system.',
  summary:
    'Two rival commanders race to claim the same Moon. Built for phone browsers with React, TypeScript and Three.js, and tested like production software.',

  specs: [
    { label: 'Role', value: 'Product, architecture, visual direction, QA' },
    { label: 'Platform', value: 'Phone-first browser game, WebGL\u00a02' },
    { label: 'Stack', value: 'React 19 · TypeScript · Three.js · React Three Fiber · Vite' },
    { label: 'Status', value: 'Feature-frozen and playable' },
  ],

  project: {
    title: 'A lunar land grab you play in a phone browser.',
    // The game's own opening lines (src/app/LaunchGate.tsx).
    quote: 'You landed first. Vesper landed anyway. Neither intends to share.',
    body: 'You and a rival commander, Vesper of Null Meridian, both claim the same Moon. Every step is a real 3D scene, from orbit down to the surface.',
    loop: [
      {
        title: 'Land',
        body: 'Pick any point on a NASA-textured Moon. The capsule lands exactly there.',
      },
      {
        title: 'Mine',
        body: 'Deploy a miner, haul Lunar Ore back to base and build an extractor.',
      },
      {
        title: 'Build',
        body: 'Expand the outpost with solar power, storage or repair, run by three robots.',
      },
      {
        title: 'Strike',
        body: 'Find Vesper’s base and launch a warhead. Then survive the counterstrike and an orbital siege.',
      },
      {
        title: 'Claim',
        body: 'Raise one of four territory monuments and hold it through three attacks. The claim shows from orbit and survives a refresh.',
      },
    ],
  },

  challenges: [
    {
      title: 'State that cannot drift',
      problem:
        'Saves, replays and cinematics all depend on knowing exactly what happened. The renderer cannot be the one deciding.',
      approach:
        'Game rules run as pure reducers that take time as an explicit input, separate from React and the 3D scene. Rendering reads state and never writes it back.',
    },
    {
      title: 'Cinematic cameras that hand control back cleanly',
      problem:
        'Landings, reveals and strikes are authored camera shots on a Moon the player can also spin and pinch.',
      approach:
        'One camera rig owns every move. Missile and camera paths are sampled 2,048 times against a minimum altitude, across poles and opposite sides of the Moon, and leftover gesture momentum is cleared before control returns.',
    },
    {
      title: 'No asset pipeline to lean on',
      problem:
        'There are no 3D model files, sprites or audio files to import. Everything on screen had to be built.',
      approach:
        'The capsule, robots, rival citadel, monuments, warheads, craters and debris are generated in TypeScript from Three.js primitives, and every sound is synthesized at runtime with Web Audio. The only outside art is two NASA lunar textures.',
    },
    {
      title: 'A real 3D scene on a mid-range phone',
      problem:
        'It had to hold together in a phone browser, not on a gaming PC.',
      approach:
        'A written budget sets hard ceilings for draw calls, triangles, textures and memory against a Pixel 6a reference phone. The drawing buffer is capped near one megapixel, quality steps down by tier, and settled views stop requesting frames.',
    },
  ],

  proof: {
    stats: [
      { value: '576', label: 'unit tests passing across 63 files' },
      { value: '24', label: 'Playwright end-to-end spec files' },
      { value: 'v9', label: 'save schema, migrating saves from every earlier version' },
      { value: '0', label: 'external 3D model or audio files' },
    ],
    decisions: [
      {
        title: 'Positions stored as lunar coordinates',
        body: 'Latitude, longitude and height in metres, in double precision. Nearby objects are projected into a local frame, so metre-scale machines do not jitter 1,737 km from the Moon’s centre.',
      },
      {
        title: 'Saves hold facts, never camera state',
        body: 'A refresh mid-launch returns to the armed state instead of skipping or replaying the strike. Older saves upgrade through each schema version.',
      },
      {
        title: 'One quality gate',
        body: 'A single check command runs lint, type-checking, the unit suite and a production build.',
      },
      {
        title: 'Tested where it will be played',
        body: 'Browser tests run against the production build in a 390 × 844 touch viewport, not the dev server.',
      },
    ],
    stack: [
      'React 19',
      'TypeScript',
      'Three.js',
      'React Three Fiber',
      'Vite',
      'Vitest',
      'Playwright',
      'Web Audio',
      'GitHub Actions',
    ],
  },

  reel: {
    title: 'A 57.6-second reel rendered by CI, not screen-recorded.',
    pipeline: [
      {
        title: 'Capture',
        body: 'A Playwright harness drives the real production build through its test hooks and steps the game clock frame by frame.',
      },
      {
        title: 'Render',
        body: 'GitHub Actions runners render each clip, then verify, hash and encode every frame. Slow motion uses real frames, never interpolation.',
      },
      {
        title: 'Assemble',
        body: 'A second workflow cuts 3,456 frames at 60 fps into the final reel and checks each output frame against the locked edit.',
      },
    ],
    direction: [
      'Hard sunlight stays fixed to the Moon through every camera cut.',
      'Two factions, two design languages: blackened amber industry against cyan-white surgical machinery.',
      'Physical damage: irregular craters, broken rims and embedded wreckage, never perfect discs.',
    ],
  },

  workflow: {
    title: 'Fast AI implementation loops. My decisions.',
    intro:
      'Features were built in short loops with AI coding agents: a written brief, an implementation pass, then tests and a verification record before anything was accepted. I stayed responsible for the calls that shape the product.',
    owners: [
      {
        title: 'Product direction',
        body: 'What the game is, what each milestone adds and what stays out of scope.',
      },
      {
        title: 'Visual decisions',
        body: 'Lighting, faction design, damage and the locked reel edit.',
      },
      {
        title: 'Architecture',
        body: 'Coordinate model, state boundaries, save format and the performance budget.',
      },
      {
        title: 'Testing and QA',
        body: 'Test gates, production-build browser runs and frame-by-frame capture review.',
      },
      {
        title: 'Acceptance',
        body: 'Every agent output accepted or rejected against its brief and its tests.',
      },
    ],
  },
};
