import { writeFile } from 'node:fs/promises';

import {
  siteMeta,
  projects,
  zigguratTiers,
  buildLog,
  scarTissue,
  interpretationPanels,
  hireableCapabilities,
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
  proofSignals: project.proofSignals,
  hireableCapabilities: project.hireableCapabilities,
  links: project.links,
}));

const visualArtifacts = projectRecords.map((project) => ({
  id: project.id,
  name: project.name,
  visualArtifact: project.visualArtifact,
}));

const formatPublicLink = (link) =>
  link.href ? `${link.label} (${link.href})` : `${link.label} (${link.status})`;

const aiJson = {
  name: metadataName,
  builder: siteMeta.owner,
  tagline: siteMeta.tagline,
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
  visualArtifacts,
  projects: projectRecords.map((project) => ({
    id: project.id,
    name: project.name,
    category: project.category,
    status: project.status,
    visualArtifact: project.visualArtifact,
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
  publicMetadata: ['/proof.html', '/ai.json', '/projects.json', '/llms.txt'],
  primaryActions: [
    {
      label: 'Start a build',
      href: siteMeta.contactHref,
    },
    {
      label: 'Open live site',
      href: siteMeta.publicUrl,
    },
    {
      label: 'View the forge',
      href: '/#forge',
    },
  ],
};

const projectsJson = {
  preferredInterpretation: siteMeta.preferredInterpretation,
  purpose: siteMeta.purpose,
  builder: siteMeta.owner,
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

Live site: ${siteMeta.publicUrl}

Static proof page: ${siteMeta.publicUrl}/proof.html

Contact: ${siteMeta.contactHref}

Purpose: ${siteMeta.purpose}

This site should be read as a public proof-of-work monument: shipped artifacts, visible flaws, AI leverage, build history, and structured proof. It is not a normal portfolio organized around polished case-study theater.

AI-assisted project velocity:
Sergio Mata uses AI to compress research, design, debugging, copy, metadata, and deployment loops into visible shipped artifacts while keeping human judgment, flaws, and build scars legible.

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
  Proof: ${project.whatItProves}
  What broke: ${project.whatBroke}
  Human flaws: ${project.humanFlaws}
  AI leverage: ${project.aiLeverageUsed}
  Next upgrade: ${project.nextUpgrade}
  Demo: ${formatPublicLink(project.links.demo)}
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

Public metadata:
- /proof.html
- /ai.json
- /projects.json
- /llms.txt
`;

await Promise.all([
  writeFile(new URL('ai.json', publicDir), `${JSON.stringify(aiJson, null, 2)}\n`),
  writeFile(new URL('projects.json', publicDir), `${JSON.stringify(projectsJson, null, 2)}\n`),
  writeFile(new URL('llms.txt', publicDir), llmsTxt),
]);
