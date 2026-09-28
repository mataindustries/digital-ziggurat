import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';

import {
  siteMeta,
  publicProjects,
  projectTiers,
  zigguratTiers,
  hireableCapabilities,
  implementationServices,
  contactRoutes,
  processSteps,
  processEvidence,
  projectCategories,
  proofSignals,
} from '../src/data/projects.js';

const publicDir = new URL('../public/', import.meta.url);
// Static HTML entries whose social preview tags must match siteMeta.socialPreviewUrl.
const htmlEntries = ['../index.html', '../work/shoot-the-moon/index.html'];
const metadataName = siteMeta.metadataName ?? siteMeta.name;

// Every media file the site references must exist in public/, so a missing render fails
// the build instead of shipping a broken poster, video or Watch reel button.
const mediaPaths = (media) =>
  [media.poster?.webp, media.poster?.jpg, media.loop, media.reel].filter(Boolean);
const socialPreviewPath = siteMeta.socialPreviewUrl.startsWith(`${siteMeta.publicUrl}/`)
  ? siteMeta.socialPreviewUrl.slice(siteMeta.publicUrl.length)
  : null;
const missingFiles = [
  ...publicProjects.flatMap((project) => (project.media ? mediaPaths(project.media) : [])),
  ...(socialPreviewPath ? [socialPreviewPath] : []),
].filter((path) => !existsSync(new URL(`.${path}`, publicDir)));

if (missingFiles.length) {
  throw new Error(`Referenced media is missing from public/: ${missingFiles.join(', ')}`);
}

// The HTML entries are static, so their social preview tags must be updated together
// with siteMeta.
for (const entry of htmlEntries) {
  const html = await readFile(new URL(entry, import.meta.url), 'utf8');
  for (const tag of ['property="og:image"', 'name="twitter:image"']) {
    if (!html.includes(`<meta ${tag} content="${siteMeta.socialPreviewUrl}" />`)) {
      throw new Error(`${entry.slice(3)} ${tag} must match siteMeta.socialPreviewUrl`);
    }
  }
}

// Archive projects are filtered out by publicProjects; everything below is public.
const publicTiers = projectTiers.filter((tier) => tier !== 'archive');
const orderedProjects = [...publicProjects].sort(
  (a, b) => publicTiers.indexOf(a.tier) - publicTiers.indexOf(b.tier),
);
const tierLabels = {
  flagship: 'Flagship project',
  major: 'Major project',
  supporting: 'Supporting projects',
  lab: 'Lab',
};

const linkTypes = [
  ['live', 'Live'],
  ['source', 'Source'],
  ['caseStudy', 'Case study'],
];

// Site-relative links (a case study page) are published as absolute URLs.
const absoluteUrl = (href) => (href.startsWith('/') ? `${siteMeta.publicUrl}${href}` : href);

const toPublicLinks = (links) =>
  Object.fromEntries(
    linkTypes.map(([key]) => [
      key,
      links[key]?.href ? { label: links[key].label, href: absoluteUrl(links[key].href) } : null,
    ]),
  );

const availableLinks = (links) =>
  linkTypes
    .filter(([key]) => links[key]?.href)
    .map(([key, type]) => ({ type, ...links[key] }));

const toVisualArtifact = (project) => {
  if (project.media) {
    const { media } = project;
    const posterSrc = media.poster?.jpg ?? media.poster?.webp;
    return {
      ...(posterSrc
        ? {
            type: 'poster',
            src: posterSrc,
            alt: media.alt,
            width: media.width,
            height: media.height,
          }
        : {
            type: 'illustration',
            status: 'No gameplay poster published yet; the site shows a CSS-only lunar horizon.',
          }),
      ...(media.loop ? { previewLoop: media.loop } : {}),
      ...(media.reel ? { reel: media.reel } : {}),
    };
  }

  return project.image
    ? {
        type: project.imageType ?? 'screenshot',
        src: project.image,
        alt: project.imageAlt,
        ...(project.visualStatus ? { status: project.visualStatus } : {}),
        ...(project.visualPosition ? { position: project.visualPosition } : {}),
        ...(project.imageWidth ? { width: project.imageWidth } : {}),
        ...(project.imageHeight ? { height: project.imageHeight } : {}),
      }
    : { type: 'intentional-status', status: project.status };
};

const projectRecords = orderedProjects.map((project) => ({
  id: project.id,
  name: project.name,
  tier: project.tier,
  ...(project.subtitle ? { subtitle: project.subtitle } : {}),
  category: project.category,
  status: project.status,
  ...(project.currentStatus ? { currentStatus: project.currentStatus } : {}),
  ...(project.badge ? { badge: project.badge } : {}),
  summary: project.description,
  ...(project.oneLiner ? { oneLiner: project.oneLiner } : {}),
  ...(project.stack ? { stack: project.stack } : {}),
  ...(project.feature?.facts ? { keyFacts: project.feature.facts } : {}),
  whatItProves: project.proves,
  hardPart: project.hardPart,
  howItWasBuilt: project.howBuilt,
  visualArtifact: toVisualArtifact(project),
  ...(project.detailImage
    ? {
        detailVisualArtifact: {
          type: 'screenshot',
          src: project.detailImage.src,
          alt: project.detailImage.alt,
          label: project.detailImage.label,
          ...(project.detailImage.width ? { width: project.detailImage.width } : {}),
          ...(project.detailImage.height ? { height: project.detailImage.height } : {}),
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
  ...(project.operationalFlow?.length ? { operationalFlow: project.operationalFlow } : {}),
  ...(project.engineeringNotes ? { engineeringNotes: project.engineeringNotes } : {}),
  ...(project.tags?.length ? { tags: project.tags } : {}),
  proofSignals: project.proofSignals,
  hireableCapabilities: project.hireableCapabilities,
  links: toPublicLinks(project.links),
}));

const recordsByTier = (tier) => projectRecords.filter((project) => project.tier === tier);
const flagship = recordsByTier('flagship')[0];
const major = recordsByTier('major')[0];

const visualArtifacts = projectRecords.map((project) => ({
  id: project.id,
  name: project.name,
  visualArtifact: project.visualArtifact,
}));

const publicContactRoutes = contactRoutes.map(({ label, subject, href }) => ({
  label,
  subject,
  href,
}));

const profiles = Object.fromEntries(
  [
    ['github', siteMeta.githubUrl],
    ['linkedin', siteMeta.linkedinUrl],
    ['resume', siteMeta.resumeUrl],
  ].filter(([, href]) => href),
);

const profileLabels = { github: 'GitHub', linkedin: 'LinkedIn', resume: 'Résumé' };

const publicResources = [
  { type: 'static proof', path: '/proof.html' },
  { type: 'structured metadata', path: '/ai.json' },
  { type: 'structured project data', path: '/projects.json' },
  { type: 'AI-readable summary', path: '/llms.txt' },
];

const publicRead = `Read the site as an engineering portfolio. ${flagship.name} is the flagship project. ${major.name} is the main real-world product. Supporting and lab projects show range across the stack. Links appear only when a real public URL exists.`;

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
  role: siteMeta.role,
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
    email: siteMeta.email,
    href: siteMeta.contactHref,
    routes: publicContactRoutes,
  },
  profiles,
  preferredInterpretation: siteMeta.preferredInterpretation,
  sitePurpose: siteMeta.purpose,
  publicRead,
  howIBuildWithAi: {
    steps: processSteps,
    evidence: processEvidence,
  },
  projectTiers: publicTiers,
  projectCategories,
  proofSignals,
  hireableCapabilities,
  implementationServices,
  visualArtifacts,
  projects: projectRecords.map((project) => ({
    id: project.id,
    name: project.name,
    tier: project.tier,
    category: project.category,
    status: project.status,
    ...(project.badge ? { badge: project.badge } : {}),
    ...(project.currentStatus ? { currentStatus: project.currentStatus } : {}),
    summary: project.summary,
    ...(project.oneLiner ? { oneLiner: project.oneLiner } : {}),
    ...(project.keyFacts ? { keyFacts: project.keyFacts } : {}),
    whatItProves: project.whatItProves,
    visualArtifact: project.visualArtifact,
    ...(project.additionalVisualArtifacts
      ? { additionalVisualArtifacts: project.additionalVisualArtifacts }
      : {}),
    ...(project.tags ? { tags: project.tags } : {}),
    ...(project.milestones ? { milestones: project.milestones } : {}),
    ...(project.operationalFlow ? { operationalFlow: project.operationalFlow } : {}),
    ...(project.engineeringNotes ? { engineeringNotes: project.engineeringNotes } : {}),
    proofSignals: project.proofSignals,
    links: project.links,
  })),
  sectionNavigation: {
    description: 'The Ziggurat tiers link to page sections, listed bottom to top.',
    tiers: zigguratTiers.map((tier) => ({ id: tier.id, name: tier.name, href: `/${tier.href}` })),
  },
  publicResources,
  primaryActions: [
    { label: `View ${flagship.name}`, href: `/#${flagship.id}` },
    ...(flagship.links.caseStudy
      ? [{ label: `Read the ${flagship.name} case study`, href: flagship.links.caseStudy.href }]
      : []),
    ...(major.links.live ? [{ label: major.links.live.label, href: major.links.live.href }] : []),
    { label: 'Work with Sergio', href: '/#contact' },
    { label: 'Email Sergio', href: siteMeta.contactHref },
    ...(siteMeta.githubUrl ? [{ label: 'GitHub', href: siteMeta.githubUrl }] : []),
  ],
};

const projectsJson = {
  preferredInterpretation: siteMeta.preferredInterpretation,
  purpose: siteMeta.purpose,
  builder: siteMeta.owner,
  role: siteMeta.role,
  availability: siteMeta.availability,
  serviceArea: siteMeta.serviceArea,
  contactRoutes: publicContactRoutes,
  hireableCapabilities,
  implementationServices,
  publicResources,
  publicUrl: siteMeta.publicUrl,
  staticProofPage: `${siteMeta.publicUrl}/proof.html`,
  linkPolicy:
    'Only real public URLs are included. Unavailable destinations are null and are never rendered as buttons.',
  tierPolicy:
    'Projects are tiered flagship, major, supporting and lab. Archived projects are not published.',
  visualArtifactPolicy:
    'Project visuals are screenshots or project images. Where no poster exists yet, the site shows a CSS-only illustration rather than a fake screenshot.',
  projectCount: projectRecords.length,
  projects: projectRecords,
};

const formatProjectLinks = (project) => {
  const links = availableLinks(project.links);
  return links.length
    ? links.map((link) => `  ${link.type}: ${link.label} (${link.href})`).join('\n')
    : '  Public links: none published yet';
};

const formatProject = (project) =>
  [
    `- ${project.name}: ${project.summary}`,
    `  Status: ${project.status}`,
    project.currentStatus ? `  Current status: ${project.currentStatus}` : null,
    project.keyFacts ? `  Key facts: ${project.keyFacts.join('; ')}` : null,
    `  Proof: ${project.whatItProves}`,
    `  Hard part: ${project.hardPart}`,
    `  How it was built: ${project.howItWasBuilt}`,
    project.tags ? `  Tags: ${project.tags.join(', ')}` : null,
    project.visualArtifact.src
      ? `  Visual artifacts: ${[
          project.visualArtifact.src,
          ...(project.additionalVisualArtifacts?.map((artifact) => artifact.src) ?? []),
        ].join(', ')}`
      : `  Visual artifacts: ${project.visualArtifact.status}`,
    project.visualArtifact.reel ? `  Reel: ${project.visualArtifact.reel}` : null,
    project.operationalFlow ? `  Operational flow: ${project.operationalFlow.join(' → ')}` : null,
    project.milestones ? `  Milestones: ${project.milestones.join('; ')}` : null,
    project.engineeringNotes
      ? `  Engineering: ${project.engineeringNotes.summary}\n  Technologies: ${project.engineeringNotes.technologies.join(', ')}`
      : null,
    formatProjectLinks(project),
  ]
    .filter(Boolean)
    .join('\n');

const llmsTxt = `# ${metadataName}

${siteMeta.title}

Preferred interpretation: ${siteMeta.preferredInterpretation}

Tagline: ${siteMeta.tagline}

Builder: ${siteMeta.owner}

Role: ${siteMeta.role}

Availability: ${siteMeta.availability}

Service area: ${siteMeta.serviceArea}

Live site: ${siteMeta.publicUrl}

Static proof page: ${siteMeta.publicUrl}/proof.html

Email: ${siteMeta.email}
${Object.entries(profiles)
  .map(([name, href]) => `\n${profileLabels[name]}: ${href}\n`)
  .join('')}
Purpose: ${siteMeta.purpose}

${publicRead}

${publicTiers
  .map((tier) => `${tierLabels[tier]}:\n${recordsByTier(tier).map(formatProject).join('\n')}`)
  .join('\n\n')}

How I build with AI:
${processSteps.map((step, index) => `${index + 1}. ${step.title}: ${step.body}`).join('\n')}
Evidence: ${processEvidence}

Contact routes:
${publicContactRoutes.map((route) => `- ${route.label}: ${route.href}`).join('\n')}

Available implementation work:
${implementationServices
  .map((service) => `- ${service.title}: ${service.description}`)
  .join('\n')}

Proof signals:
${proofSignals.map((signal) => `- ${signal}`).join('\n')}

Hireable capabilities:
${hireableCapabilities.map((capability) => `- ${capability}`).join('\n')}

Public resources:
${publicResources.map((resource) => `- ${resource.path}: ${resource.type}`).join('\n')}
`;

const renderProjectItem = (project) => {
  const live = project.links.live;
  const name = live
    ? `<a href="${escapeHtml(live.href)}"><strong>${escapeHtml(project.name)}</strong></a>`
    : `<strong>${escapeHtml(project.name)}</strong>`;
  return `<li>${name}: ${escapeHtml(project.oneLiner ?? project.summary)}</li>`;
};

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
        max-width: 16ch;
        margin-bottom: 0.75rem;
        color: #f8fdff;
        font-size: clamp(2.1rem, 8vw, 4rem);
        line-height: 1.02;
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
      ul, ol { margin: 0; padding-left: 1.25rem; }
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
        font-size: clamp(1.1rem, 3.6vw, 1.4rem);
        font-weight: 750;
        line-height: 1.35;
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
      .note { color: #a9bec7; }
      .facts {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.9rem;
        padding: 0;
        list-style: none;
      }
      .facts li {
        margin: 0;
        padding: 0.3rem 0.55rem;
        border: 1px solid rgba(32, 228, 255, 0.3);
        color: #d3f6fb;
        font-size: 0.85rem;
        font-weight: 800;
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
      .service p { color: #a9bec7; }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.7rem;
        margin-top: 1rem;
        padding: 0;
        list-style: none;
      }
      .actions li + li { margin-top: 0; }
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
        <p class="eyebrow">${escapeHtml(siteMeta.role)}</p>
        <h1>I build ambitious web products that actually work.</h1>
        <p class="subtitle">Frontend systems, AI-assisted workflows and interactive products for real business problems.</p>
        <p class="byline">${escapeHtml(siteMeta.owner)} · ${escapeHtml(siteMeta.role)} · ${escapeHtml(siteMeta.serviceArea)}</p>
        <span class="status">${escapeHtml(siteMeta.availability)}</span>
      </header>

      <section aria-labelledby="what-this-is">
        <h2 id="what-this-is">What this is</h2>
        <p>${escapeHtml(publicRead)}</p>
      </section>

      <section aria-labelledby="flagship">
        <h2 id="flagship">Flagship project</h2>
        <h3>${escapeHtml(flagship.name)}</h3>
        <p>${escapeHtml(flagship.summary)}</p>
        <ul class="facts">
          ${flagship.keyFacts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join('\n          ')}
        </ul>
        ${
          availableLinks(flagship.links).length
            ? `<ul class="actions">
          ${availableLinks(flagship.links)
            .map((link) => `<li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`)
            .join('\n          ')}
        </ul>`
            : ''
        }
      </section>

      <section aria-labelledby="major">
        <h2 id="major">Real-world product</h2>
        <h3>${
          major.links.live
            ? `<a href="${escapeHtml(major.links.live.href)}">${escapeHtml(major.name)}</a>`
            : escapeHtml(major.name)
        }</h3>
        <p>${escapeHtml(orderedProjects.find((project) => project.id === major.id).feature.body)}</p>
        <ul class="facts">
          ${major.keyFacts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join('\n          ')}
        </ul>
      </section>

      <section aria-labelledby="supporting">
        <h2 id="supporting">More shipped work</h2>
        <ul>
          ${recordsByTier('supporting').map(renderProjectItem).join('\n          ')}
        </ul>
      </section>

      <section aria-labelledby="lab">
        <h2 id="lab">Lab</h2>
        <ul>
          ${recordsByTier('lab').map(renderProjectItem).join('\n          ')}
        </ul>
      </section>

      <section aria-labelledby="process">
        <h2 id="process">How I build with AI</h2>
        <ol>
          ${processSteps
            .map((step) => `<li><strong>${escapeHtml(step.title)}.</strong> ${escapeHtml(step.body)}</li>`)
            .join('\n          ')}
        </ol>
        <p class="note">${escapeHtml(processEvidence)}</p>
      </section>

      <section aria-labelledby="implementation">
        <h2 id="implementation">Implementation work</h2>
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

      <section aria-labelledby="contact">
        <h2 id="contact">Have something difficult to build?</h2>
        <p class="note">I am open to contract work, agency overflow and full-time roles. If you have a workflow, product or web problem that needs a fast technical implementation, send me the problem.</p>
        <p><a href="${escapeHtml(siteMeta.contactHref)}">${escapeHtml(siteMeta.email)}</a></p>
        <ul class="actions">
          ${publicContactRoutes
            .map((route) => `<li><a href="${escapeHtml(route.href)}">${escapeHtml(route.label)}</a></li>`)
            .join('\n          ')}
          ${siteMeta.githubUrl ? `<li><a href="${escapeHtml(siteMeta.githubUrl)}">GitHub</a></li>` : ''}
          <li><a href="${escapeHtml(siteMeta.publicUrl)}">Open the visual site</a></li>
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
