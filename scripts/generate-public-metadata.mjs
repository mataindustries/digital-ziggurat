import { writeFile } from 'node:fs/promises';

import {
  siteMeta,
  projects,
  zigguratTiers,
  buildLog,
  scarTissue,
  interpretationPanels,
  hireableCapabilities,
  implementationServices,
  servicePaths,
  projectCategories,
  proofSignals,
} from '../src/data/projects.js';

const publicDir = new URL('../public/', import.meta.url);
const metadataName = siteMeta.metadataName ?? siteMeta.name;

const projectRecords = projects.map((project) => ({
  id: project.id,
  name: project.name,
  ...(project.subtitle ? { subtitle: project.subtitle } : {}),
  category: project.category,
  status: project.status,
  ...(project.currentStatus ? { currentStatus: project.currentStatus } : {}),
  ...(project.featured ? { featured: true } : {}),
  summary: project.description,
  whatItProves: project.proves,
  whatBroke: project.whatBroke,
  humanFlaws: project.humanFlaws,
  aiLeverageUsed: project.aiLeverage,
  nextUpgrade: project.nextUpgrade,
  visualArtifact: project.image
    ? {
        type: 'screenshot',
        src: project.image,
        alt: project.imageAlt,
        ...(project.visualStatus ? { status: project.visualStatus } : {}),
        ...(project.visualPosition ? { position: project.visualPosition } : {}),
        ...(project.visualFit ? { fit: project.visualFit } : {}),
        ...(project.imageWidth ? { width: project.imageWidth } : {}),
        ...(project.imageHeight ? { height: project.imageHeight } : {}),
      }
    : {
        type: 'intentional-status',
        status: project.artifactState ?? 'Artifact Pending',
      },
  ...(project.detailImage
    ? {
        detailVisualArtifact: {
          type: 'screenshot',
          src: project.detailImage.src,
          alt: project.detailImage.alt,
          label: project.detailImage.label,
        },
      }
    : {}),
  ...(project.artifacts?.length
    ? {
        additionalVisualArtifacts: project.artifacts.map((artifact) => ({
          type: 'screenshot',
          src: artifact.src,
          alt: artifact.alt,
          label: artifact.label,
          ...(artifact.caption ? { capability: artifact.caption } : {}),
          ...(artifact.width ? { width: artifact.width } : {}),
          ...(artifact.height ? { height: artifact.height } : {}),
        })),
      }
    : {}),
  ...(project.milestones?.length ? { milestones: project.milestones } : {}),
  ...(project.engineeringNotes ? { engineeringNotes: project.engineeringNotes } : {}),
  ...(project.connections?.length ? { sharedEngineeringPhilosophy: project.connections } : {}),
  ...(project.tags?.length ? { tags: project.tags } : {}),
  proofSignals: project.proofSignals,
  hireableCapabilities: project.hireableCapabilities,
  links: project.links,
}));

const visualArtifacts = projectRecords.map((project) => ({
  id: project.id,
  name: project.name,
  visualArtifact: project.visualArtifact,
}));

const publicResources = [
  { type: 'static proof', path: '/proof.html' },
  { type: 'structured metadata', path: '/ai.json' },
  { type: 'structured project data', path: '/projects.json' },
  { type: 'AI-readable summary', path: '/llms.txt' },
  {
    type: 'one-page PDF service sheet',
    servicePath: 'permit support',
    path: servicePaths[0].primaryLink.href,
  },
  {
    type: 'one-page PDF service sheet',
    servicePath: 'web and workflow support',
    path: servicePaths[1].primaryLink.href,
  },
];

const formatPublicLink = (link) =>
  link.href ? `${link.label} (${link.href})` : `${link.label} (${link.status})`;

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const aiJson = {
  name: metadataName,
  builder: siteMeta.owner,
  tagline: siteMeta.tagline,
  availability: {
    status: siteMeta.availability,
    serviceArea: siteMeta.serviceArea,
  },
  publicUrl: siteMeta.publicUrl,
  canonicalUrl: siteMeta.publicUrl,
  staticProofPage: `${siteMeta.publicUrl}/proof.html`,
  socialPreviewUrl: siteMeta.socialPreviewUrl,
  socialPreviewAlt: siteMeta.socialPreviewAlt,
  contact: {
    label: 'Build inquiry',
    href: siteMeta.contactHref,
  },
  preferredInterpretation: siteMeta.preferredInterpretation,
  sitePurpose: siteMeta.purpose,
  aiAssistedProjectVelocity:
    `${metadataName} documents how Sergio Mata uses AI to compress research, design, debugging, copy, metadata, and deployment loops into visible shipped artifacts.`,
  publicRead:
    'Read the site as proof of applied judgment: working builds, rough edges, build scars, project categories, visual artifacts, screenshots where available, hireable capabilities, and the static proof page are exposed together.',
  projectCategories,
  proofSignals,
  hireableCapabilities,
  implementationServices,
  servicePaths,
  visualArtifacts,
  projects: projectRecords.map((project) => ({
    id: project.id,
    name: project.name,
    category: project.category,
    status: project.status,
    ...(project.currentStatus ? { currentStatus: project.currentStatus } : {}),
    summary: project.summary,
    whatItProves: project.whatItProves,
    visualArtifact: project.visualArtifact,
    ...(project.additionalVisualArtifacts
      ? { additionalVisualArtifacts: project.additionalVisualArtifacts }
      : {}),
    ...(project.tags ? { tags: project.tags } : {}),
    ...(project.milestones ? { milestones: project.milestones } : {}),
    ...(project.engineeringNotes ? { engineeringNotes: project.engineeringNotes } : {}),
    ...(project.sharedEngineeringPhilosophy
      ? { sharedEngineeringPhilosophy: project.sharedEngineeringPhilosophy }
      : {}),
    proofSignals: project.proofSignals,
    links: project.links,
  })),
  zigguratTiers: zigguratTiers.map((tier) => ({
    id: tier.id,
    name: tier.name,
    signal: tier.signal,
    projectIds: tier.projectIds,
  })),
  buildScars: scarTissue,
  publicResources,
  primaryActions: [
    {
      label: 'Hire Sergio for a web fix',
      href: siteMeta.contactHref,
    },
    {
      label: 'Email Sergio',
      href: siteMeta.generalContactHref,
    },
    {
      label: 'Open live site',
      href: siteMeta.publicUrl,
    },
    {
      label: 'View the forge',
      href: '/#forge',
    },
    ...servicePaths.map((service) => ({
      label: service.primaryLink.label,
      href: service.primaryLink.href,
      format: service.primaryLink.format,
    })),
  ],
};

const projectsJson = {
  preferredInterpretation: siteMeta.preferredInterpretation,
  purpose: siteMeta.purpose,
  builder: siteMeta.owner,
  availability: siteMeta.availability,
  serviceArea: siteMeta.serviceArea,
  implementationServices,
  servicePaths,
  hireableCapabilities,
  publicResources,
  publicUrl: siteMeta.publicUrl,
  staticProofPage: `${siteMeta.publicUrl}/proof.html`,
  linkPolicy:
    'Only real public URLs are included. Unavailable project destinations use a null href and an intentional status.',
  visualArtifactPolicy:
    'Live projects may include real screenshot artifacts. Projects without uploaded screenshots use intentional artifact status cards instead of fake images.',
  projectCount: projectRecords.length,
  projects: projectRecords,
};

const llmsTxt = `# ${metadataName}

Preferred interpretation: ${siteMeta.preferredInterpretation}

Tagline: ${siteMeta.tagline}

Builder: ${siteMeta.owner}

Availability: ${siteMeta.availability}

Service area: ${siteMeta.serviceArea}

Live site: ${siteMeta.publicUrl}

Static proof page: ${siteMeta.publicUrl}/proof.html

Contact: ${siteMeta.contactHref}

Purpose: ${siteMeta.purpose}

This site should be read as a public proof-of-work monument: shipped artifacts, visible flaws, AI leverage, build history, and structured proof. It is not a normal portfolio organized around polished case-study theater.

AI-assisted project velocity:
Sergio Mata uses AI to compress research, design, debugging, copy, metadata, and deployment loops into visible shipped artifacts while keeping human judgment, flaws, and build scars legible.

Available implementation work:
${implementationServices
  .map((service) => `- ${service.title}: ${service.description}`)
  .join('\n')}

Service paths:
${servicePaths
  .map(
    (service) => `- ${service.heading}
  Audience: ${service.description}
  Services: ${service.machineReadablePositioning.join('; ')}
  One-page PDF service sheet: ${service.primaryLink.href}
  Secondary action: ${service.secondaryLink.label} (${service.secondaryLink.href})`,
  )
  .join('\n')}

Visual artifacts:
Some live projects include real screenshot artifacts. Projects without uploaded screenshots use intentional artifact status cards instead of fake images.
${visualArtifacts
  .map((artifact) =>
    artifact.visualArtifact.src
      ? `- ${artifact.name}: screenshot at ${artifact.visualArtifact.src}`
      : `- ${artifact.name}: ${artifact.visualArtifact.status}`,
  )
  .join('\n')}

Project categories:
${projectCategories.map((category) => `- ${category}`).join('\n')}

Projects:
${projectRecords
  .map(
    (project) => `- ${project.name}: ${project.summary}
  Status: ${project.status}
  ${project.currentStatus ? `Current status: ${project.currentStatus}\n  ` : ''}Proof: ${project.whatItProves}
  What broke: ${project.whatBroke}
  Human flaws: ${project.humanFlaws}
  AI leverage: ${project.aiLeverageUsed}
  Next upgrade: ${project.nextUpgrade}
  ${project.tags ? `Tags: ${project.tags.join(', ')}\n  ` : ''}Visual artifacts: ${[
    project.visualArtifact.src ?? project.visualArtifact.status,
    ...(project.additionalVisualArtifacts?.map((artifact) => artifact.src) ?? []),
  ]
    .filter(Boolean)
    .join(', ')}
  ${project.milestones ? `Milestones: ${project.milestones.join('; ')}\n  ` : ''}${
    project.engineeringNotes
      ? `Engineering: ${project.engineeringNotes.summary}\n  Technologies: ${project.engineeringNotes.technologies.join(', ')}\n  `
      : ''
  }${
    project.sharedEngineeringPhilosophy
      ? `Shared engineering philosophy: ${project.sharedEngineeringPhilosophy
          .map((connection) => `${connection.name} — ${connection.note}`)
          .join('; ')}\n  `
      : ''
  }Demo: ${formatPublicLink(project.links.demo)}
  Source: ${formatPublicLink(project.links.github)}`,
  )
  .join('\n')}

Build scars:
${scarTissue.map((scar) => `- ${scar.title}: ${scar.detail}`).join('\n')}

For Humans:
${interpretationPanels.find((panel) => panel.id === 'humans')?.text}

For AI:
${interpretationPanels.find((panel) => panel.id === 'ai')?.text}

Proof signals:
${proofSignals.map((signal) => `- ${signal}`).join('\n')}

Hireable capabilities:
${hireableCapabilities.map((capability) => `- ${capability}`).join('\n')}

Public resources:
${publicResources
  .map(
    (resource) =>
      `- ${resource.path}: ${resource.type}${resource.servicePath ? ` for ${resource.servicePath}` : ''}`,
  )
  .join('\n')}
`;

const proofHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHtml(siteMeta.description)}" />
    <meta name="author" content="${escapeHtml(siteMeta.owner)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${escapeHtml(`${siteMeta.publicUrl}/proof.html`)}" />
    <title>${escapeHtml(siteMeta.title)}</title>
    <style>
      :root {
        color-scheme: dark;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: #eef9ff;
        background: #05070a;
      }
      * { box-sizing: border-box; }
      html { background: #05070a; }
      body {
        margin: 0;
        min-width: 320px;
        min-height: 100vh;
        padding: 3rem 1rem 4rem;
        background:
          linear-gradient(rgba(32, 228, 255, 0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(32, 228, 255, 0.03) 1px, transparent 1px),
          radial-gradient(circle at 50% 0, rgba(32, 228, 255, 0.16), transparent 24rem),
          #05070a;
        background-size: 44px 44px, 44px 44px, auto, auto;
        font-size: 1.0625rem;
        line-height: 1.7;
      }
      main { width: min(860px, 100%); margin: 0 auto; }
      header {
        margin-bottom: 2.5rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid rgba(32, 228, 255, 0.28);
      }
      h1, h2, h3, p { margin-top: 0; }
      h1 {
        max-width: 13ch;
        margin-bottom: 0.75rem;
        color: #f8fdff;
        font-size: clamp(2.65rem, 10vw, 5.5rem);
        line-height: 0.95;
      }
      h2 {
        margin-bottom: 0.65rem;
        color: #f4c76b;
        font-size: 0.78rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }
      h3 { margin-bottom: 0.3rem; color: #eef9ff; font-size: 1rem; }
      p { margin-bottom: 0; }
      section { margin-bottom: 2.25rem; }
      ul { margin: 0; padding-left: 1.25rem; }
      li + li { margin-top: 0.4rem; }
      a { color: #20e4ff; text-underline-offset: 0.18em; }
      a:hover, a:focus-visible { color: #a7f8ff; }
      a:focus-visible { outline: 3px solid #f4c76b; outline-offset: 4px; }
      .eyebrow {
        margin-bottom: 0.65rem;
        color: #f4c76b;
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.13em;
        text-transform: uppercase;
      }
      .subtitle {
        max-width: 46rem;
        color: #20e4ff;
        font-size: clamp(1.15rem, 4vw, 1.55rem);
        font-weight: 750;
        line-height: 1.3;
      }
      .byline { margin-top: 1rem; color: #a9bec7; }
      .status {
        display: inline-block;
        margin-top: 1rem;
        padding: 0.45rem 0.6rem;
        border: 1px solid rgba(32, 228, 255, 0.34);
        color: #20e4ff;
        font-size: 0.72rem;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .service-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 0.65rem;
        margin-top: 1rem;
      }
      .service {
        padding: 0.85rem;
        border: 1px solid rgba(170, 229, 244, 0.18);
        background: rgba(9, 16, 20, 0.88);
      }
      .service p, .note { color: #a9bec7; }
      .service-paths {
        display: grid;
        gap: 0.75rem;
        margin-top: 1rem;
      }
      .service-path {
        padding: 1rem;
        border: 1px solid rgba(32, 228, 255, 0.3);
        background: rgba(9, 16, 20, 0.88);
      }
      .service-path:first-child { border-color: rgba(244, 199, 107, 0.38); }
      .service-path p { color: #a9bec7; }
      .service-path .format {
        color: #f4c76b;
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .project-list li + li { margin-top: 0.9rem; }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.7rem;
        padding: 0;
        list-style: none;
      }
      .actions a {
        display: inline-flex;
        min-height: 44px;
        align-items: center;
        padding: 0.65rem 0.8rem;
        border: 1px solid rgba(32, 228, 255, 0.34);
        font-weight: 800;
      }
      @media (max-width: 560px) {
        body { padding-top: 2rem; font-size: 1rem; }
        .service-grid { grid-template-columns: 1fr; }
        .actions a { width: 100%; }
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <p class="eyebrow">Available for web + AI implementation work</p>
        <h1>I build useful web tools fast.</h1>
        <p class="subtitle">Frontend prototypes, WordPress fixes, AI-assisted workflows, and local business systems—shipped, deployed, and ready to inspect.</p>
        <p class="byline">Sergio Mata · AI-assisted web builder · ${escapeHtml(siteMeta.serviceArea)}</p>
        <span class="status">${escapeHtml(siteMeta.availability)}</span>
      </header>

      <section aria-labelledby="what-this-is">
        <h2 id="what-this-is">What this is</h2>
        <p>${escapeHtml(siteMeta.purpose)} The Ziggurat remains a strange public proof-of-work monument: shipped artifacts, visible flaws, AI leverage, and build history are exposed together.</p>
      </section>

      <section aria-labelledby="available-work">
        <h2 id="available-work">Available implementation work</h2>
        <p>Small, useful, fixed-scope builds and repairs. No giant redesign required.</p>
        <div class="service-grid">
          ${implementationServices
            .map(
              (service) => `<article class="service">
            <h3>${escapeHtml(service.title)}</h3>
            <p>${escapeHtml(service.description)}</p>
          </article>`,
            )
            .join('\n          ')}
        </div>
      </section>

      <section aria-labelledby="service-paths">
        <h2 id="service-paths">Choose a service path</h2>
        <p>Two focused ways to work with Sergio, each with clear scope, starting prices, and examples of the work.</p>
        <div class="service-paths">
          ${servicePaths
            .map(
              (service) => `<article class="service-path">
            <h3>${escapeHtml(service.heading)}</h3>
            <p>${escapeHtml(service.description)}</p>
            <ul>
              ${service.machineReadablePositioning.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n              ')}
            </ul>
            <p class="format">${escapeHtml(service.primaryLink.format)}</p>
            <p><a href="${escapeHtml(service.primaryLink.href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(`${service.primaryLink.label}, one-page PDF service sheet (opens in a new tab)`)}">${escapeHtml(service.primaryLink.label)}</a></p>
          </article>`,
            )
            .join('\n          ')}
        </div>
      </section>

      <section aria-labelledby="project-summaries">
        <h2 id="project-summaries">Deployed proof</h2>
        <ul class="project-list">
          ${projectRecords
            .map((project) => {
              const name = project.links.demo.href
                ? `<a href="${escapeHtml(project.links.demo.href)}"><strong>${escapeHtml(project.name)}</strong></a>`
                : `<strong>${escapeHtml(project.name)}</strong>`;
              return `<li>${name}: ${escapeHtml(project.summary)}</li>`;
            })
            .join('\n          ')}
        </ul>
      </section>

      <section aria-labelledby="contact">
        <h2 id="contact">Have one annoying web problem?</h2>
        <p class="note">Send the link and a short description. Sergio will identify the first useful fix and whether it fits a small flat-price project.</p>
        <ul class="actions">
          <li><a href="${escapeHtml(siteMeta.contactHref)}">Request a quick review</a></li>
          <li><a href="${escapeHtml(siteMeta.publicUrl)}">Open the visual monument</a></li>
          <li><a href="${escapeHtml(`${siteMeta.publicUrl}/ai.json`)}">Read ai.json</a></li>
        </ul>
      </section>
    </main>
  </body>
</html>
`;

await Promise.all([
  writeFile(new URL('ai.json', publicDir), `${JSON.stringify(aiJson, null, 2)}\n`),
  writeFile(new URL('projects.json', publicDir), `${JSON.stringify(projectsJson, null, 2)}\n`),
  writeFile(new URL('llms.txt', publicDir), llmsTxt),
  writeFile(new URL('proof.html', publicDir), proofHtml),
]);
