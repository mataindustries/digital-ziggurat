import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  siteMeta,
  projects,
  buildLog,
  zigguratTiers,
  scarTissue,
  interpretationPanels,
  hireableCapabilities,
  implementationServices,
  servicePaths,
} from './data/projects';
import './styles.css';

const aiViewProofSignals = [
  'PermitPulse OS flagship system',
  'evidence-backed review workflow',
  'live deployed projects',
  'screenshots',
  'build scars',
  'project metadata',
  'audio/visual experiments',
  'AI-readable public files',
  'rapid iteration with Codex',
];

const aiReadableFiles = [
  { href: '/proof.html', label: 'Machine-readable proof' },
  { href: '/ai.json', label: '/ai.json' },
  { href: '/projects.json', label: '/projects.json' },
  { href: '/llms.txt', label: '/llms.txt' },
  {
    href: '/sergio-mata-permit-clarity.pdf',
    label: 'Permit service sheet · 1-page PDF',
    newTab: true,
  },
  {
    href: '/sergio-mata-local-web-fixes.pdf',
    label: 'Web fixes service sheet · 1-page PDF',
    newTab: true,
  },
];

const signalOptions = [
  {
    label: 'Weird premium landing page',
    description:
      'A sharp, memorable page with unusual atmosphere, clear proof, and a CTA that feels built instead of templated.',
  },
  {
    label: 'Local business automation',
    description:
      'A lean workflow or interface that reduces repetitive work for a local operator and makes the next action obvious.',
  },
  {
    label: 'Civic/public-record tool',
    description:
      'A public-data prototype that turns messy records, permits, filings, or local signals into something usable.',
  },
  {
    label: 'Browser game prototype',
    description:
      'A playable browser experiment with a distinct mechanic, mobile-first controls, and enough polish to test fast.',
  },
  {
    label: 'AI workflow system',
    description:
      'A practical AI-assisted flow for research, drafting, sorting, enrichment, or internal decision support.',
  },
  {
    label: 'Visual proof-of-work page',
    description:
      'A public artifact page that makes shipped work, process, evidence, and credibility easy to inspect.',
  },
  {
    label: 'Something stranger',
    description:
      'A harder-to-classify prototype where the concept matters more than fitting a standard product category.',
  },
];

function buildSignalMailto(selectedSignal) {
  const subject = 'Build Inquiry from The Ziggurat';
  const body = `I found The Ziggurat and want to discuss a build.

Selected signal:
${selectedSignal}

What I need:
[Write a short description here]`;

  return `mailto:matasergio741@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function ProjectArtifact({ project, size = 'card' }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const className = `project-artifact project-artifact--${size} ${
    project.image ? 'has-image' : 'has-state'
  }`;

  return (
    <figure className={className}>
      {project.image ? (
        <img
          className={imageLoaded ? 'is-loaded' : ''}
          src={project.image}
          alt={project.imageAlt}
          width={project.imageWidth}
          height={project.imageHeight}
          loading={size === 'chamber' ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={size === 'chamber' ? 'high' : 'auto'}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
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

function PermitPulseFlow({ project, compact = false }) {
  return (
    <ol
      className={`permitpulse-flow ${compact ? 'permitpulse-flow--compact' : ''}`}
      aria-label="PermitPulse OS operational workflow"
    >
      {project.operationalFlow.map((step) => (
        <li key={step}>{step}</li>
      ))}
    </ol>
  );
}

function PermitPulseArtifactStory({ project }) {
  return (
    <section className="permitpulse-artifact-story" aria-labelledby="permitpulse-artifacts-title">
      <div className="permitpulse-section-heading">
        <p className="section-kicker">Recovered system surfaces</p>
        <h3 id="permitpulse-artifacts-title">From record intake to review packet</h3>
        <p>
          Each surface exposes another part of the same case: evidence enters with provenance,
          chronology is reconstructed, review gates delivery, and the packet retains its source
          trail.
        </p>
      </div>
      <div className="permitpulse-artifacts">
        {project.artifacts.map((artifact) => (
          <figure className="permitpulse-artifact" key={artifact.src}>
            <div className="permitpulse-artifact__viewport">
              <img
                src={artifact.src}
                alt={artifact.alt}
                width={artifact.width}
                height={artifact.height}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>
              <strong>{artifact.label}</strong>
              <span>{artifact.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function PermitPulseSystemNotes({ project }) {
  return (
    <>
      <section className="permitpulse-milestones" aria-labelledby="permitpulse-milestones-title">
        <div className="permitpulse-section-heading">
          <p className="section-kicker">Operational readout</p>
          <h3 id="permitpulse-milestones-title">The prototype became a working instrument</h3>
          <p>
            The recent passes joined research, review, document generation, and deployment into
            one controlled operating surface.
          </p>
        </div>
        <div className="permitpulse-milestone-grid">
          {project.milestones.map((milestone) => (
            <span key={milestone}>{milestone}</span>
          ))}
        </div>
      </section>

      <section className="permitpulse-engineering" aria-labelledby="permitpulse-engineering-title">
        <div className="permitpulse-section-heading">
          <p className="section-kicker">Builder field notes</p>
          <h3 id="permitpulse-engineering-title">Infrastructure behind the chamber</h3>
          <p>{project.engineeringNotes.summary}</p>
          <p>
            AI is used as an engineering accelerator for research organization, implementation,
            debugging, and test passes—not as an autonomous permit reviewer or decision maker.
          </p>
        </div>
        <div className="signal-list" aria-label="PermitPulse OS engineering technologies">
          {project.engineeringNotes.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </section>

      <section className="permitpulse-connections" aria-labelledby="permitpulse-connections-title">
        <div className="permitpulse-section-heading">
          <p className="section-kicker">Shared construction marks</p>
          <h3 id="permitpulse-connections-title">Built from the Ziggurat’s recurring philosophy</h3>
          <p>
            These are family resemblances, not software dependencies: dense state made legible,
            mobile controls treated seriously, and finished output kept close to its evidence.
          </p>
        </div>
        <div className="permitpulse-connection-grid">
          {project.connections.map((connection) => (
            <article key={connection.name}>
              <strong>{connection.name}</strong>
              <p>{connection.note}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function Ziggurat({ activeTier, onSelectTier }) {
  const activeTierIndex = zigguratTiers.findIndex((tier) => tier.id === activeTier.id) + 1;

  return (
    <div className="ziggurat-stage" aria-label="Interactive ziggurat section selector">
      <div className="monument-atmosphere" aria-hidden="true">
        <span className="monument-horizon" />
        <span className="monument-haze monument-haze--one" />
        <span className="monument-haze monument-haze--two" />
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
        <div className="ceremonial-ascent" aria-hidden="true">
          {Array.from({ length: 11 }).map((_, index) => (
            <span key={`stair-${index}`} />
          ))}
        </div>
        <div className="temple-foundation" aria-hidden="true" />
        <div className="temple-halo" aria-hidden="true" />
        <div className="summit-beacon" aria-hidden="true" />
      </div>

      <div className="monument-plaza" aria-hidden="true">
        <span className="plaza-causeway" />
        <span className="plaza-stone plaza-stone--left" />
        <span className="plaza-stone plaza-stone--right" />
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
    <article
      className={`project-card ${project.featured ? 'project-card--featured' : ''} ${
        project.chamberVariant ? `project-card--${project.chamberVariant}` : ''
      }`}
    >
      <button
        className="project-card__open"
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open ${project.name} project chamber`}
      >
        <div className="project-card__topline">
          <div className="project-card__status-group">
            {project.flagshipLabel ? (
              <span className="flagship-badge">{project.flagshipLabel}</span>
            ) : null}
            <span className={`status status--${project.statusTone}`}>{project.status}</span>
          </div>
          <span className="project-card__link">Open chamber</span>
        </div>
        <div className="project-card__body">
          <ProjectArtifact project={project} />
          <div className="project-card__content">
            <span className="project-card__category">{project.category}</span>
            <h3>{project.name}</h3>
            {project.subtitle ? (
              <span className="project-card__subtitle">{project.subtitle}</span>
            ) : null}
            {project.operationalFlow ? <PermitPulseFlow project={project} compact /> : null}
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
          </div>
        </div>
      </button>
      {project.cardCta && project.links.demo.href ? (
        <a className="project-card__cta" href={project.links.demo.href}>
          {project.links.demo.label}
        </a>
      ) : null}
    </article>
  );
}

function ProjectChamber({ project, onClose }) {
  const chamberRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const previouslyFocusedElement = document.activeElement;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = chamberRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements?.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      previouslyFocusedElement?.focus?.();
    };
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  const chamberTitleId = `project-chamber-title-${project.id}`;
  const chamberDescriptionId = `project-chamber-description-${project.id}`;
  const chamberLinks = [
    { type: 'Demo', ...project.links.demo },
    { type: 'Source', ...project.links.github },
  ];

  return (
    <div className="chamber-backdrop" role="presentation" onClick={onClose}>
      <section
        className={`project-chamber ${
          project.chamberVariant ? `project-chamber--${project.chamberVariant}` : ''
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={chamberTitleId}
        aria-describedby={chamberDescriptionId}
        onClick={(event) => event.stopPropagation()}
        ref={chamberRef}
      >
        <button
          className="chamber-close"
          type="button"
          onClick={onClose}
          aria-label="Close chamber"
          ref={closeButtonRef}
        >
          Close
        </button>
        <div className="chamber-header">
          <p className="section-kicker">Proof-of-work chamber</p>
          {project.flagshipLabel ? (
            <span className="flagship-badge">{project.flagshipLabel}</span>
          ) : null}
          <h2 id={chamberTitleId}>{project.name}</h2>
          {project.subtitle ? <p className="chamber-subtitle">{project.subtitle}</p> : null}
          <span className={`status status--${project.statusTone}`}>{project.status}</span>
        </div>

        <div className="chamber-category">{project.category}</div>
        <ProjectArtifact project={project} size="chamber" />
        {project.chamberVariant !== 'permitpulse' && project.artifacts?.length ? (
          <div className="detail-artifacts" aria-label={`${project.name} visual artifacts`}>
            {project.artifacts.map((artifact) => (
              <figure className="detail-artifact" key={artifact.src}>
                <img
                  src={artifact.src}
                  alt={artifact.alt}
                  width={artifact.width}
                  height={artifact.height}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{artifact.label}</figcaption>
              </figure>
            ))}
          </div>
        ) : project.detailImage ? (
          <figure className="detail-artifact">
            <img src={project.detailImage.src} alt={project.detailImage.alt} loading="lazy" />
            <figcaption>{project.detailImage.label}</figcaption>
          </figure>
        ) : null}
        <div className="chamber-summary">
          <span>{project.chamberVariant === 'permitpulse' ? 'Platform brief' : 'Short description'}</span>
          <p className="chamber-description" id={chamberDescriptionId}>
            {project.description}
          </p>
        </div>

        {project.operationalFlow ? <PermitPulseFlow project={project} /> : null}

        {project.chamberVariant === 'permitpulse' ? (
          <PermitPulseArtifactStory project={project} />
        ) : null}

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
          {project.currentStatus ? (
            <div className="chamber-block chamber-block--wide">
              <span>Current status</span>
              <p>{project.currentStatus}</p>
            </div>
          ) : null}
          <div className="chamber-block chamber-block--wide">
            <span>Next upgrade</span>
            <p>{project.nextUpgrade}</p>
          </div>
        </div>

        {project.chamberVariant === 'permitpulse' ? (
          <PermitPulseSystemNotes project={project} />
        ) : null}

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
          {project.tags?.length ? (
            <div className="chamber-evidence__wide">
              <span>Tags</span>
              <div className="signal-list">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ) : null}
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
              <a
                href={file.href}
                key={file.href}
                target={file.newTab ? '_blank' : undefined}
                rel={file.newTab ? 'noopener noreferrer' : undefined}
              >
                {file.label}
              </a>
            ))}
          </div>
        </article>

        <article className="machine-card">
          <span>Hireable capabilities</span>
          <div className="signal-list">
            {hireableCapabilities.map((capability) => (
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

function SignalConsole() {
  const [selectedSignal, setSelectedSignal] = useState(signalOptions[0]);
  const selectedIndex = signalOptions.findIndex((option) => option.label === selectedSignal.label) + 1;
  const signalMailto = buildSignalMailto(selectedSignal.label);

  return (
    <section className="signal-console" aria-labelledby="signal-console-title">
      <div className="signal-console__header">
        <div>
          <p className="section-kicker">Signal Console</p>
          <h3 id="signal-console-title">Choose the signal.</h3>
          <p>I’ll translate it into a fast, buildable AI-assisted prototype.</p>
        </div>
        <div className="signal-console__status" aria-hidden="true">
          <span>Console online</span>
          <strong>{String(selectedIndex).padStart(2, '0')}</strong>
        </div>
      </div>

      <div className="signal-console__grid">
        <div className="signal-console__options" role="group" aria-label="Build signal options">
          {signalOptions.map((option, index) => {
            const isActive = selectedSignal.label === option.label;

            return (
              <button
                className={`signal-option ${isActive ? 'is-active' : ''}`}
                type="button"
                key={option.label}
                onClick={() => setSelectedSignal(option)}
                aria-pressed={isActive}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{option.label}</strong>
              </button>
            );
          })}
        </div>

        <div className="signal-console__readout" aria-live="polite">
          <span className="signal-console__label">Selected signal</span>
          <h4>{selectedSignal.label}</h4>
          <p>{selectedSignal.description}</p>
          <div className="signal-console__meter" aria-hidden="true">
            <span />
          </div>
          <a className="button button-primary signal-console__send" href={signalMailto}>
            Send signal
          </a>
        </div>
      </div>
    </section>
  );
}

function WeeklyWork() {
  return (
    <section
      className="section availability-section"
      id="available-work"
      aria-labelledby="available-work-title"
    >
      <div className="section-heading availability-section__heading">
        <p className="section-kicker">Available implementation work</p>
        <h2 id="available-work-title">Work I can do this week</h2>
        <p>Small, useful, fixed-scope builds and repairs. No giant redesign required.</p>
      </div>

      <div className="capability-grid">
        {implementationServices.map((service, index) => (
          <article className="capability-card" key={service.title}>
            <div className="capability-card__readout">
              <span>Capability {String(index + 1).padStart(2, '0')}</span>
              <span className="capability-card__status">Ready</span>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>

      <div className="quick-review">
        <div>
          <p className="section-kicker">Small-project intake</p>
          <h3>Have one annoying web problem?</h3>
          <p>
            Send me the link and a short description. I’ll tell you the first useful fix and
            whether it fits a small flat-price project.
          </p>
        </div>
        <a className="button button-primary" href={siteMeta.contactHref}>
          Request a quick review
        </a>
      </div>
    </section>
  );
}

function ServicePaths() {
  return (
    <section
      className="section service-paths"
      id="service-paths"
      aria-labelledby="service-paths-title"
    >
      <div className="section-heading service-paths__heading">
        <p className="section-kicker">Choose a service path</p>
        <h2 id="service-paths-title">What do you need help with?</h2>
        <p>
          Two focused ways to work with me—each with clear scope, starting prices, and examples of
          the work.
        </p>
      </div>

      <div className="service-path-grid">
        {servicePaths.map((service, index) => (
          <article
            className={`service-path-card service-path-card--${service.tone}`}
            key={service.id}
          >
            <div className="service-path-card__readout" aria-hidden="true">
              <span>Service path {String(index + 1).padStart(2, '0')}</span>
              <span>Scope ready</span>
            </div>
            <p className="service-path-card__label">{service.label}</p>
            <h3>{service.heading}</h3>
            <p className="service-path-card__description">{service.description}</p>
            <ul className="service-path-card__proof">
              {service.proofPoints.map((proofPoint) => (
                <li key={proofPoint}>{proofPoint}</li>
              ))}
            </ul>
            <div className="service-path-card__actions">
              <a
                className="service-path-card__primary"
                href={service.primaryLink.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${service.primaryLink.label}, one-page PDF service sheet (opens in a new tab)`}
              >
                <span>{service.primaryLink.label}</span>
                <small>1-page PDF</small>
              </a>
              <a className="service-path-card__secondary" href={service.secondaryLink.href}>
                {service.secondaryLink.label}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function App() {
  const [activeTier, setActiveTier] = useState(zigguratTiers[2]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeView, setActiveView] = useState('human');
  const visibleProjects = useMemo(
    () =>
      [...projects].sort(
        (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
      ),
    [],
  );
  const activeProjects = useMemo(
    () =>
      activeTier.projectIds
        .map((projectId) => projects.find((project) => project.id === projectId))
        .filter(Boolean),
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
            <div className="hero-eyebrow-row">
              <p className="eyebrow">Available for web + AI implementation work</p>
              <div
                className="availability-readout"
                aria-label="Available this week in the San Gabriel Valley, Los Angeles, and remotely"
              >
                <span>Available this week</span>
                <small>SGV / LA / Remote</small>
              </div>
            </div>
            <p className="hero-role">I build useful web tools fast.</p>
            <h1>Human flaws. Machine leverage. Public proof.</h1>
            <p className="tagline">
              Frontend prototypes, WordPress fixes, AI-assisted workflows, and local business
              systems—shipped, deployed, and ready to inspect.
            </p>
            <p className="intro">
              I’m Sergio Mata, an AI-assisted web builder based in the San Gabriel Valley. I help
              businesses, agencies, and project teams turn messy web problems into usable pages,
              tools, workflows, and prototypes. PermitPulse OS is the flagship proof: a full-stack,
              evidence-backed permit intelligence platform built for real review and delivery.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={siteMeta.contactHref}>
                Hire me for a web fix
              </a>
              <a className="button button-secondary" href="#projects">
                Inspect the flagship build
              </a>
              <a className="button button-tertiary" href={siteMeta.generalContactHref}>
                Email me
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

      <WeeklyWork />

      <ServicePaths />

      <section className="section projects-section" id="projects">
        <div className="section-heading">
          <p className="section-kicker">Visible Builds</p>
          <h2>PermitPulse OS leads the monument</h2>
          <p>
            The current flagship is the strongest demonstration of my engineering work: a secure,
            evidence-centered operating system that turns fragmented records into reviewed client
            deliverables. The remaining chambers show the experiments and systems around it.
          </p>
        </div>

        <div className="project-grid">
          {visibleProjects.map((project) => (
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
            Agents can inspect static proof and public context through <code>/proof.html</code>,{' '}
            <code>/ai.json</code>, <code>/projects.json</code>, and <code>/llms.txt</code>.
          </p>
        </div>
        <div className="metadata-grid">
          {aiReadableFiles.map((file) => (
            <a
              href={file.href}
              key={file.href}
              target={file.newTab ? '_blank' : undefined}
              rel={file.newTab ? 'noopener noreferrer' : undefined}
            >
              {file.label}
            </a>
          ))}
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
        <SignalConsole />
        <div className="hero-actions">
          <a className="button button-primary" href={siteMeta.contactHref}>
            Email directly
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
