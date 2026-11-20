// Single source for the Latest Creative Work, Behind the Build and applications copy.
// The homepage, public metadata, llms.txt and the proof page all read from here so the
// production-velocity caveat cannot drift between them.
// Add spec ads to `latestCreativeWork` only after publication approval and verification
// of the public watch URL.

export const latestCreativeWork = [
  {
    id: 'gmerica',
    title: 'GMErica',
    identity: 'GMErica — GameStop, 2021',
    headline: 'I turned a stock chart into a roller coaster.',
    type: 'Original short film',
    status: 'Released',
    url: 'https://youtube.com/shorts/iJUDgjDFoWg',
    duration: 'PT30S',
    width: 1080,
    height: 1920,
    format: '30 seconds · 1080 × 1920',
    tools: ['ENM Sandbox', 'DaemonV12'],
    poster: '/media/gmerica/gmerica-chart-reveal-1080x1920.webp',
    posterAlt:
      'GMErica poster. A glowing neon ribbon traces GameStop’s daily closing price through a dark city of skyscrapers like a roller-coaster track, climbing from $17.25 on January 4, 2021 to $347.51 on January 27 and $325 on January 29.',
    posterCaption: 'Chart-reveal poster · final film',
    description:
      'Historical GameStop price movements become a first-person 3D roller-coaster ride, and the original music follows the chart’s rises and falls.',
    approach:
      'The film interprets price movement for dramatic effect. The same workflow can map other datasets to 3D motion and musical cues.',
    facts: ['30 seconds', '1080 × 1920', 'Original music', 'Daily closes · Jan 4 – Feb 19, 2021'],
    readoutLabel: 'Read the track',
    readout: [
      { date: 'Jan 4', price: '$17.25', note: 'The ride starts' },
      { date: 'Jan 27', price: '$347.51', note: 'First crest' },
      { date: 'Jan 29', price: '$325', note: 'Second crest' },
    ],
    readoutNote: 'As labelled on the poster: ride path smoothed, big days given more track.',
  },
];

// Stage and toolkit descriptions follow the ENM Sandbox and DaemonV12 documentation.
export const behindTheBuild = {
  kicker: 'Behind the build',
  title: 'From historical data to a verified film.',
  intro:
    'GMErica was made with ENM Sandbox, my 3D scene and camera toolkit, and DaemonV12, my music engine. Each stage is a reusable tool, so a new dataset or product can take the same path.',
  stagesLabel: 'GMErica production pipeline',
  stages: [
    {
      id: 'data',
      label: 'Historical data',
      summary: 'Daily closes from January 4 to February 19, 2021. The ride path is smoothed, and big days get more track.',
      proof: 'Daily closes · 2021',
    },
    {
      id: 'sandbox',
      label: 'ENM Sandbox',
      summary: 'Scene descriptions place named camera moves, looks and props in 3D. The tool validates each scene, then renders it.',
      proof: '22 camera moves · 8 looks · 25 props',
    },
    {
      id: 'daemonv12',
      label: 'DaemonV12',
      summary: 'Original music written as data and rendered the same way every time, with cues timed to the picture.',
      proof: '9 MCP tools · WAV + stems',
    },
    {
      id: 'film',
      label: 'Verified film',
      summary: 'Each rendered frame is checked and hashed before the film is assembled, and the soundtrack’s sync is measured against its master.',
      proof: 'Frame checks · audio sync',
    },
  ],
  toolkitLabel: 'Reusable production tools',
  toolkit: [
    {
      id: 'scenes',
      name: 'Scene descriptions',
      body: 'A scene is one small JSON file. It names the camera moves, a look and props, and the tool writes a valid scene with cuts on the bars.',
    },
    {
      id: 'camera',
      name: '3D camera moves',
      body: '22 named moves, from drone orbit and tornado POV to scale reveal and freefall dive, each with settings you can tune.',
    },
    {
      id: 'environments',
      name: 'Environments',
      body: 'Eight looks, from chrome and gold to neon and toxic, with 25 props. One continuous take can pass through several rooms.',
    },
    {
      id: 'instruments',
      name: 'Custom instruments',
      body: 'DaemonV12 instruments are played as data, so an agent can compose a score and render it offline to WAV and stems.',
    },
    {
      id: 'cues',
      name: 'Cue sheets',
      body: 'Sound briefs list each score event in seconds from the first visible frame, tied to camera moves, hits and loop points.',
    },
    {
      id: 'verification',
      name: 'Frame verification',
      body: 'Scenes are validated and loop seams checked. Every rendered frame is verified and hashed before assembly.',
    },
  ],
  // Real renders from the Sandbox's own one-take studio tour. They are not GMErica footage.
  stageRenders: [
    { id: 'lobby', src: '/media/enm-sandbox/stage-lobby.webp', name: 'The lobby', setting: 'chrome · drone orbit', alt: 'A stepped monument ringed by white light in the chrome look' },
    { id: 'reactor', src: '/media/enm-sandbox/stage-reactor.webp', name: 'The reactor', setting: 'gold · tornado POV', alt: 'A gold reactor tower with glowing orange door frames' },
    { id: 'lowrider-bay', src: '/media/enm-sandbox/stage-lowrider-bay.webp', name: 'Lowrider bay', setting: 'neon · lowrider hop', alt: 'A lowrider car above a violet pillar, ringed by pink neon' },
    { id: 'nest', src: '/media/enm-sandbox/stage-nest.webp', name: 'The nest', setting: 'toxic · micro to mega', alt: 'A glowing green capsule in the toxic look' },
  ],
  stageRendersCaption:
    'ENM Sandbox renders from its one-take studio tour. Each stage pairs a look with a camera move over a range of bars. These are Sandbox test scenes, not GMErica footage.',
};

export const productionVelocity = {
  kicker: 'Production velocity',
  figure: 'About 24 hours',
  label: 'from first concept to published film',
  body: 'GMErica went from initial concept to a published film in about 24 hours. That figure is the creator’s own report of one individual production run.',
  caveat:
    'It is not a guaranteed turnaround for client projects. Commission timelines are scoped and agreed for each project.',
  trackStart: 'Concept',
  trackEnd: 'Published film',
  // Plain-text form for llms.txt, ai.json and the proof page.
  summary:
    'GMErica went from initial concept to a published film in about 24 hours, as reported by the creator, Sergio Mata. This describes one individual production run. It is not a guaranteed turnaround for client projects; commission timelines are scoped and agreed for each project.',
};

export const creativeApplications = {
  kicker: 'Where it applies',
  title: 'The same pipeline, aimed at your project.',
  intro:
    'The tools behind GMErica are general: scenes, camera, environments, music and verification. These are the commissions they suit.',
  listLabel: 'Commercial applications',
  items: [
    {
      id: 'launches',
      title: 'Cinematic product launches & spec advertising',
      body: 'Camera-led product films with end cards and store-ready loops, built on reusable spec-ad templates.',
    },
    {
      id: 'interactive',
      title: 'Interactive brand experiences',
      body: '3D scenes that run in the browser, so a launch can be something people explore, not only watch.',
    },
    {
      id: 'data',
      title: 'Data-driven animations',
      body: 'Prices, growth curves or timelines drive the camera and the pacing, the way the chart drove GMErica.',
    },
    {
      id: 'films',
      title: 'Original music-synchronized short films',
      body: 'Original scores timed to the picture with cue sheets, so cuts, hits and loops land on the beat.',
    },
  ],
  // Sample Co. is the fictional client used by the Sandbox's spec-ad templates.
  specAdFrames: [
    { id: 'light-trace', src: '/media/enm-sandbox/spec-ad-light-trace.webp', time: '0.00 s', name: 'Light trace', alt: 'Close-up of an emerald-cut green stone catching light, with the line “Worth the weight.”' },
    { id: 'scale-reveal', src: '/media/enm-sandbox/spec-ad-scale-reveal.webp', time: '5.60 s', name: 'Scale reveal', alt: 'The camera pulling back to show a gold ring holding the emerald' },
    { id: 'end-card', src: '/media/enm-sandbox/spec-ad-end-card.webp', time: '14.00 s', name: 'End card', alt: 'The finished gold and emerald ring with the call to action “Arrange a private viewing”' },
  ],
  specAdCaption:
    'Weight of Gold, a Sandbox spec-ad template, rendered for Sample Co., a fictional client. It is a template demonstration, not client work.',
  ctaHeading: 'Have a launch, a dataset or a story that needs motion?',
  ctaNote: 'Scope, deliverables and timeline are agreed and quoted for each project.',
};

// Every image the homepage references, so the metadata generator can verify each file.
export const creativeProductionAssets = [
  ...latestCreativeWork.map(({ poster }) => poster),
  ...behindTheBuild.stageRenders.map(({ src }) => src),
  ...creativeApplications.specAdFrames.map(({ src }) => src),
].filter(Boolean);
