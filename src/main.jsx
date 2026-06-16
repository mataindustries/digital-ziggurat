import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { projects, buildLog, zigguratTiers } from './data/projects';
import './styles.css';

function Ziggurat({ activeTier, onSelectTier }) {
  return (
    <div className="ziggurat-stage" aria-label="Interactive ziggurat section selector">
      <div className="signal-beam" aria-hidden="true" />
      <svg className="grid-lines" viewBox="0 0 900 540" aria-hidden="true">
        <defs>
          <linearGradient id="gridGlow" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#1fe7ff" stopOpacity="0.08" />
            <stop offset="56%" stopColor="#1fe7ff" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#f7c66b" stopOpacity="0.18" />
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
            <span className="tier-label">{tier.name}</span>
            <span className="tier-glow" />
          </button>
        ))}
        <div className="temple-spire" aria-hidden="true" />
      </div>

      <aside className="active-tier-card" key={activeTier.id}>
        <span>Active tier</span>
        <strong>{activeTier.name}</strong>
        <p>{activeTier.signal}</p>
      </aside>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card__topline">
        <span className={`status status--${project.statusTone}`}>{project.status}</span>
        <a href={project.link} className="project-card__link" aria-label={`${project.name} demo link`}>
          Demo
        </a>
      </div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className="proof">
        <span>Proves</span>
        <strong>{project.proves}</strong>
      </div>
    </article>
  );
}

function App() {
  const [activeTier, setActiveTier] = useState(zigguratTiers[1]);
  const activeProjects = useMemo(
    () => projects.filter((project) => activeTier.projectIds.includes(project.id)),
    [activeTier],
  );

  return (
    <main>
      <section className="hero">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="The Digital Ziggurat home">
            <span className="brand-mark" />
            <span>The Digital Ziggurat</span>
          </a>
          <div className="nav-links">
            <a href="#forge">Forge</a>
            <a href="#projects">Projects</a>
            <a href="#signal">Signal</a>
          </div>
        </nav>

        <div className="hero-content" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Public proof-of-work monument</p>
            <h1>The Digital Ziggurat</h1>
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
            Six public-facing project stones, each framed by what it proves rather than just what
            it is.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </section>

      <section className="section active-section">
        <div className="section-heading">
          <p className="section-kicker">Selected Tier</p>
          <h2>{activeTier.name} projects</h2>
        </div>
        <div className="project-strip">
          {activeProjects.map((project) => (
            <a href={project.link} key={project.id}>
              <span>{project.name}</span>
              <small>{project.status}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="section forge-section" id="forge">
        <div className="section-heading">
          <p className="section-kicker">Codex Forge</p>
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
        <div className="hero-actions">
          <a className="button button-primary" href="mailto:sergio@example.com">
            Start a build
          </a>
          <a className="button button-secondary" href="#forge">
            View the forge
          </a>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
