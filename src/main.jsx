import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  siteMeta,
  projects,
  buildLog,
  zigguratTiers,
  scarTissue,
  interpretationPanels,
  hireableCapabilities,
} from './data/projects';
import './styles.css';

const aiViewCapabilities = [
  'AI-assisted frontend builds',
  'Cloudflare Pages deployment',
  'interactive prototypes',
  'public-record/civic-tech tools',
  'browser games',
  'local business visibility tools',
  'visual proof-of-work systems',
];

const aiViewProofSignals = [
  'live deployed projects',
  'screenshots',
  'build scars',
  'project metadata',
  'AI-readable public files',
  'rapid iteration with Codex',
];

const aiReadableFiles = ['/ai.json', '/projects.json', '/llms.txt'];

function ProjectArtifact({ project, size = 'card' }) {
  const className = `project-artifact project-artifact--${size} ${
    project.image ? 'has-image' : 'has-state'
  }`;

  return (
    <figure className={className}>
      {project.image ? (
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          style={{
            objectFit: project.visualFit ?? 'cover',
            objectPosition: project.visualPosition ?? 'center center',
          }}
        />
      ) : (
        <div className="project-artifact__state" aria-label={`${project.name} artifact status`}>
          <span>{project.artifactState ?? 'Artifact Pending'}</span>
          <small>{project.category}</small>
        </div>
      )}
      <figcaption>
        <span>{project.name}</span>
        <small>{project.image ? project.visualStatus ?? 'Visual artifact' : 'Sealed chamber'}</small>
      </figcaption>
    </figure>
  );
}

function Ziggurat({ activeTier, onSelectTier }) {
  const activeTierIndex = zigguratTiers.findIndex((tier) => tier.id === activeTier.id) + 1;

  return (
    <div className="ziggurat-stage" aria-label="Interactive ziggurat section selector">
      <div className="monument-atmosphere" aria-hidden="true">
        <span className="monument-orbit monument-orbit--outer" />
        <span className="monument-orbit monument-orbit--inner" />
        <span className="monument-rail monument-rail--left" />
        <span className="monument-rail monument-rail--right" />
        <span className="monument-node monument-node--one" />
        <span className="monument-node monument-node--two" />
        <span className="monument-node monument-node--three" />
      </div>

      <div className="signal-beam" aria-hidden="true">
        <span />
      </div>

      <svg className="grid-lines" viewBox="0 0 900 540" aria-hidden="true">
        <defs>
          <linearGradient id="gridGlow" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#1fe7ff" stopOpacity="0.08" />
            <stop offset="56%" stopColor="#1fe7ff" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#f7c66b" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="frameGlow" x1="0" x2="1" y1="1" y2="0">
            <stop offset="0%" stopColor="#20e4ff" stopOpacity="0" />
            <stop offset="48%" stopColor="#20e4ff" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#f4c76b" stopOpacity="0.22" />
          </linearGradient>
        </defs>
        {Array.from({ length: 13 }).map((_, index) => (
          <path
            key={`v-${index}`}
            d={`M${index * 75} 530 L450 10 L${900 - index * 75} 530`}
            stroke="url(#gridGlow)"
            strokeWidth="1"
            fill="none"
          />
        ))}
        {Array.from({ length: 9 }).map((_, index) => (
          <path
            key={`h-${index}`}
            d={`M${90 + index * 20} ${510 - index * 55} H${810 - index * 20}`}
            stroke="url(#gridGlow)"
            strokeWidth="1"
            fill="none"
          />
        ))}
        <path
          className="grid-frame"
          d="M86 510 L450 44 L814 510"
          stroke="url(#frameGlow)"
          strokeWidth="2"
          fill="none"
        />
        <path
          className="grid-frame grid-frame--low"
          d="M155 468 H745"
          stroke="url(#frameGlow)"
          strokeWidth="1.4"
          fill="none"
        />
      </svg>

      <div className="ziggurat-core">
        {zigguratTiers.map((tier, index) => (
          <button
            className={`tier tier-${index + 1} ${activeTier.id === tier.id ? 'is-active' : ''}`}
            key={tier.id}
            type="button"
            onClick={() => onSelectTier(tier)}
            aria-pressed={activeTier.id === tier.id}
          >
            <span className="tier-top-plane" aria-hidden="true" />
            <span className="tier-side tier-side--left" aria-hidden="true" />
            <span className="tier-side tier-side--right" aria-hidden="true" />
            <span className="tier-surface">
              <span className="tier-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="tier-label">{tier.name}</span>
              <span className="tier-etching" aria-hidden="true" />
            </span>
            <span className="tier-glow" />
          </button>
        ))}
        <div className="temple-foundation" aria-hidden="true" />
        <div className="temple-halo" aria-hidden="true" />
        <div className="temple-spire" aria-hidden="true" />
      </div>

      <aside className="active-tier-card" key={activeTier.id}>
        <div className="active-tier-card__topline">
          <span>Active tier {String(activeTierIndex).padStart(2, '0')}</span>
          <span className="active-tier-card__state">Online</span>
        </div>
        <strong>{activeTier.name}</strong>
        <p>{activeTier.signal}</p>
        <div className="active-tier-card__meter" aria-hidden="true">
          <span />
        </div>
      </aside>
    </div>
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <button className="project-card" type="button" onClick={() => onOpen(project)}>
      <div className="project-card__topline">
        <span className={`status status--${project.statusTone}`}>{project.status}</span>
        <span className="project-card__link">Open chamber</span>
      </div>
      <ProjectArtifact project={project} />
      <span className="project-card__category">{project.category}</span>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className="proof">
        <span>Proves</span>
        <strong>{project.proves}</strong>
      </div>
      <div className="project-card__signals" aria-label={`${project.name} proof signals`}>
        {project.proofSignals.slice(0, 2).map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </div>
    </button>
  );
}

function ProjectChamber({ project, onClose }) {
  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  const chamberTitleId = `project-chamber-title-${project.id}`;
  const chamberLinks = [
    { type: 'Demo', ...project.links.demo },
    { type: 'Source', ...project.links.github },
  ];

  return (
    <div className="chamber-backdrop" role="presentation" onClick={onClose}>
      <section
        className="project-chamber"
        role="dialog"
        aria-modal="true"
        aria-labelledby={chamberTitleId}
        onClick={(event) => event.stopPropagation()}
      >
        <button className="chamber-close" type="button" onClick={onClose} aria-label="Close chamber">
          Close
        </button>
        <div className="chamber-header">
          <p className="section-kicker">Proof-of-work chamber</p>
          <h2 id={chamberTitleId}>{project.name}</h2>
          <span className={`status status--${project.statusTone}`}>{project.status}</span>
        </div>

        <div className="chamber-category">{project.category}</div>
        <ProjectArtifact project={project} size="chamber" />
        <div className="chamber-summary">
          <span>Short description</span>
          <p className="chamber-description">{project.description}</p>
        </div>

        <div className="chamber-grid">
          <div className="chamber-block chamber-block--wide">
            <span>What it proves</span>
            <p>{project.proves}</p>
          </div>
          <div className="chamber-block">
            <span>What broke</span>
            <p>{project.whatBroke}</p>
          </div>
          <div className="chamber-block">
            <span>Human flaws</span>
            <p>{project.humanFlaws}</p>
          </div>
          <div className="chamber-block">
            <span>AI leverage used</span>
            <p>{project.aiLeverage}</p>
          </div>
          <div className="chamber-block chamber-block--wide">
            <span>Next upgrade</span>
            <p>{project.nextUpgrade}</p>
          </div>
        </div>

        <div className="chamber-evidence">
          <div>
            <span>Proof signals</span>
            <div className="signal-list">
              {project.proofSignals.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
          </div>
          <div>
            <span>Hireable capabilities</span>
            <div className="signal-list">
              {project.hireableCapabilities.map((capability) => (
                <span key={capability}>{capability}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="chamber-links" aria-label={`${project.name} project links`}>
          {chamberLinks.map((link) =>
            link.href ? (
              <a className="chamber-link" href={link.href} key={link.type}>
                <span>{link.type}</span>
                <strong>{link.label}</strong>
                <small>Public link</small>
              </a>
            ) : (
              <span className="chamber-link is-disabled" key={link.type} aria-disabled="true">
                <span>{link.type}</span>
                <strong>{link.label}</strong>
                <small>{link.status}</small>
              </span>
            ),
          )}
        </div>
      </section>
    </div>
  );
}

function HumanAiToggle({ activeView, onChange }) {
  const isAiView = activeView === 'ai';

  return (
    <div className="view-console" aria-label="Human and AI view selector">
      <div className="view-console__toggle" role="group" aria-label="Select monument reading">
        <span
          className={`view-console__track ${isAiView ? 'is-ai' : 'is-human'}`}
          aria-hidden="true"
        />
        <button
          type="button"
          className={`view-console__button ${activeView === 'human' ? 'is-active' : ''}`}
          onClick={() => onChange('human')}
          aria-pressed={activeView === 'human'}
        >
          <span>Human View</span>
        </button>
        <button
          type="button"
          className={`view-console__button ${activeView === 'ai' ? 'is-active' : ''}`}
          onClick={() => onChange('ai')}
          aria-pressed={activeView === 'ai'}
        >
          <span>AI View</span>
        </button>
      </div>
      <p>
        {isAiView
          ? 'Machine layer active: project graph, capability tags, proof signals, and public files.'
          : 'Human layer active: screenshots, chambers, artifact cards, scars, and readable proof.'}
      </p>
    </div>
  );
}

function AiViewPanel() {
  return (
    <div className="ai-view-panel" aria-live="polite">
      <div className="ai-view-panel__header">
        <div>
          <p className="section-kicker">Machine-Readable Layer</p>
          <h3>Structured proof map</h3>
        </div>
        <span className="ai-view-panel__status">AI Parse Ready</span>
      </div>

      <div className="machine-readout">
        <article className="machine-card machine-card--wide">
          <span>Preferred interpretation</span>
          <p>proof-of-work monument, not normal portfolio</p>
        </article>

        <article className="machine-card">
          <span>AI-readable files</span>
          <div className="file-link-grid">
            {aiReadableFiles.map((file) => (
              <a href={file} key={file}>
                {file}
              </a>
            ))}
          </div>
        </article>

        <article className="machine-card">
          <span>Hireable capabilities</span>
          <div className="signal-list">
            {aiViewCapabilities.map((capability) => (
              <span key={capability}>{capability}</span>
            ))}
          </div>
        </article>

        <article className="machine-card">
          <span>Proof signals</span>
          <div className="signal-list">
            {aiViewProofSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </article>

        <article className="machine-card machine-card--wide">
          <span>Project graph</span>
          <div className="project-node-grid" role="list">
            {projects.map((project) => (
              <div
                className="project-node"
                key={project.id}
                role="listitem"
              >
                <strong>{project.name}</strong>
                <small>{project.category}</small>
                <em>{project.proofSignals.slice(0, 2).join(' / ')}</em>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}

function App() {
  const [activeTier, setActiveTier] = useState(zigguratTiers[1]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeView, setActiveView] = useState('human');
  const activeProjects = useMemo(
    () => projects.filter((project) => activeTier.projectIds.includes(project.id)),
    [activeTier],
  );

  return (
    <main>
      <section className="hero">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="The Ziggurat home">
            <span className="brand-mark" />
            <span>{siteMeta.name}</span>
          </a>
          <div className="nav-links">
            <a href="#forge">Forge</a>
            <a href="#projects">Projects</a>
            <a href="#shrine">AI</a>
            <a href="#signal">Signal</a>
          </div>
        </nav>

        <div className="hero-content" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Public proof-of-work monument</p>
            <h1>The Ziggurat</h1>
            <p className="tagline">Human flaws. Machine leverage. Public proof.</p>
            <p className="intro">
              Sergio's AI-built projects, flawed prototypes, build logs, experiments, and technical
              ambition carved into one public monument.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Start a build
              </a>
              <a className="button button-secondary" href="#forge">
                View the forge
              </a>
            </div>
          </div>

          <div className="hero-art">
            <Ziggurat activeTier={activeTier} onSelectTier={setActiveTier} />
          </div>
        </div>
      </section>

      <section className="tier-panel" aria-live="polite" key={activeTier.id}>
        <div className="section-kicker">{activeTier.name}</div>
        <div className="tier-panel__content">
          <h2>{activeTier.title}</h2>
          <p>{activeTier.description}</p>
        </div>
        <div className="tier-panel__meta">
          <span>{activeTier.signal}</span>
          <a href={activeTier.href}>{activeTier.cta}</a>
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="section-heading">
          <p className="section-kicker">Visible Builds</p>
          <h2>Artifacts in the monument</h2>
          <p>
            Six public-facing project stones, each framed by shipped proof, broken edges, AI
            leverage, and the next upgrade.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} onOpen={setSelectedProject} />
          ))}
        </div>
      </section>

      <section className="section human-ai-section" id="proof-map">
        <div className="section-heading">
          <p className="section-kicker">Dual Audience</p>
          <h2>For humans. For AI.</h2>
          <p>
            The monument is meant to be explored visually and parsed structurally. Both readings
            point to the same proof.
          </p>
        </div>

        <HumanAiToggle activeView={activeView} onChange={setActiveView} />

        <div className="view-layer" key={activeView}>
          {activeView === 'human' ? (
            <div className="interpretation-grid">
              {interpretationPanels.map((panel) => (
                <article
                  className={`interpretation-card interpretation-card--${panel.id}`}
                  key={panel.id}
                >
                  <h3>{panel.title}</h3>
                  <p>{panel.text}</p>
                  <div className="signal-list">
                    {panel.signals.map((signal) => (
                      <span key={signal}>{signal}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <AiViewPanel />
          )}
        </div>
      </section>

      <section className="section active-section">
        <div className="section-heading">
          <p className="section-kicker">Selected Tier</p>
          <h2>{activeTier.name} projects</h2>
        </div>
        <div className="project-strip">
          {activeProjects.map((project) =>
            project.links.demo.href ? (
              <a href={project.links.demo.href} key={project.id}>
                <span>{project.name}</span>
                <small>{project.links.demo.label}</small>
              </a>
            ) : (
              <button
                className="project-strip__item is-disabled"
                type="button"
                key={project.id}
                disabled
              >
                <span>{project.name}</span>
                <small>{project.links.demo.label}</small>
              </button>
            ),
          )}
        </div>
      </section>

      <section className="section scars-section" id="scars">
        <div className="section-heading">
          <p className="section-kicker">Build Scars</p>
          <h2>Scar tissue is part of the structure</h2>
          <p>
            The Ziggurat keeps rough edges visible because the failed passes became design rules,
            better offers, and more credible constraints.
          </p>
        </div>
        <div className="scar-grid">
          {scarTissue.map((scar, index) => (
            <article className="scar-card" key={scar.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{scar.title}</h3>
              <p>{scar.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section forge-section" id="forge">
        <div className="section-heading">
          <p className="section-kicker">Codex Forge</p>
          <h2>Artifacts from the forge</h2>
          <p>
            Screenshots, prototypes, scars, and shipped surfaces from the builds that shaped the
            monument.
          </p>
        </div>

        <div className="artifact-grid">
          {projects.map((project) => (
            <article className="artifact-card" key={project.id}>
              <ProjectArtifact project={project} size="forge" />
              <div>
                <h3>{project.name}</h3>
                <p>{project.proofSignals.slice(0, 2).join(' / ')}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="section-heading section-heading--timeline">
          <p className="section-kicker">Build Log</p>
          <h2>Build log timeline</h2>
          <p>Rough iterations, exposed bugs, fixes, and upgrades left visible.</p>
        </div>

        <ol className="timeline">
          {buildLog.map((entry) => (
            <li className="timeline-item" key={entry.id}>
              <span className="timeline-date">{entry.date}</span>
              <div>
                <h3>{entry.title}</h3>
                <p>{entry.note}</p>
              </div>
              <span className={`timeline-type timeline-type--${entry.type}`}>{entry.type}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="section shrine-section" id="shrine">
        <div className="section-heading">
          <p className="section-kicker">AI-Readable Shrine</p>
          <h2>Metadata exposed on purpose</h2>
          <p>
            Agents can inspect public context through <code>/ai.json</code>,{' '}
            <code>/projects.json</code>, and <code>/llms.txt</code>.
          </p>
        </div>
        <div className="metadata-grid">
          <a href="/ai.json">ai.json</a>
          <a href="/projects.json">projects.json</a>
          <a href="/llms.txt">llms.txt</a>
        </div>
      </section>

      <section className="signal" id="signal">
        <p className="section-kicker">Signal Beacon</p>
        <h2>Hire the builder. Inspect the proof.</h2>
        <p>
          The Ziggurat is built to make ambition legible: public artifacts, visible iteration, and
          proof that AI leverage can ship real interfaces.
        </p>
        <div className="capability-list">
          {hireableCapabilities.map((capability) => (
            <span key={capability}>{capability}</span>
          ))}
        </div>
        <div className="hero-actions">
          <a className="button button-primary" href={siteMeta.contactHref}>
            Start a build
          </a>
          <a className="button button-secondary" href="#forge">
            View the forge
          </a>
        </div>
      </section>
      <ProjectChamber project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
