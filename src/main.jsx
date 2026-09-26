import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  siteMeta,
  contactRoutes,
  processSteps,
  processEvidence,
  projectsByTier,
  getProject,
  zigguratTiers,
} from './data/projects';
import './styles.css';

const flagshipProject = getProject('shoot-the-moon');
const majorProject = getProject('permitpulse');
const supportingProjects = projectsByTier('supporting');
const labProjects = projectsByTier('lab');

const machineReadableFiles = ['/llms.txt', '/ai.json', '/projects.json'];

const profileLinks = [
  { label: 'Résumé', href: siteMeta.resumeUrl },
  { label: 'GitHub', href: siteMeta.githubUrl },
  { label: 'LinkedIn', href: siteMeta.linkedinUrl },
].filter((link) => link.href);

function VisuallyHidden({ children }) {
  return <span className="visually-hidden">{children}</span>;
}

function ExternalLink({ href, className, children, context }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <VisuallyHidden>
        {context ? ` ${context}` : ''} (opens in a new tab)
      </VisuallyHidden>
      <span className="external-mark" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

function DetailsButton({ project, onOpen, className = 'button button-secondary' }) {
  return (
    <button className={className} type="button" onClick={() => onOpen(project)}>
      Details
      <VisuallyHidden> about {project.name}</VisuallyHidden>
    </button>
  );
}

function ProjectArtifact({ project }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <figure
      className={`project-artifact project-artifact--chamber ${
        project.image ? 'has-image' : 'has-state'
      }`}
    >
      {project.image ? (
        <img
          className={imageLoaded ? 'is-loaded' : ''}
          src={project.image}
          alt={project.imageAlt}
          width={project.imageWidth}
          height={project.imageHeight}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          style={{
            objectFit: project.visualFit ?? 'cover',
            objectPosition: project.visualPosition ?? 'center center',
          }}
        />
      ) : (
        <div className="project-artifact__state">
          <span>{project.status}</span>
          <small>{project.category}</small>
        </div>
      )}
      <figcaption>
        <span>{project.name}</span>
        <small>{project.visualStatus ?? project.status}</small>
      </figcaption>
    </figure>
  );
}

// 16:9 flagship media. Uses the real poster when one exists, otherwise a CSS-only
// lunar horizon so no fake screenshot or placeholder text ever ships.
function FlagshipMedia({ project, eager = true }) {
  const { media } = project;

  return (
    <div className="flagship-media">
      {media?.poster ? (
        <img
          src={media.poster}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : (
        <div className="lunar-fallback" aria-hidden="true">
          <span className="lunar-fallback__stars" />
          <span className="lunar-fallback__mass" />
          <span className="lunar-fallback__edge" />
          <span className="lunar-fallback__signal" />
        </div>
      )}
    </div>
  );
}

function FeatureImage({ project }) {
  return (
    <div className="feature-image">
      <img
        src={project.image}
        alt={project.imageAlt}
        width={project.imageWidth}
        height={project.imageHeight}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: project.visualPosition ?? 'center center' }}
      />
    </div>
  );
}

function ProjectFlow({ project }) {
  return (
    <ol className="permitpulse-flow" aria-label={`${project.name} workflow`}>
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
          Each surface exposes another part of the same case. Evidence enters with provenance,
          chronology is reconstructed, certainty is labeled, and human review gates delivery.
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
          <h3 id="permitpulse-milestones-title">The prototype became a research service</h3>
          <p>
            Research, review, document generation, real-property proof, and a live offer now work
            as one controlled system.
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
            debugging, and test passes. It is not an autonomous permit reviewer or decision maker.
          </p>
        </div>
        <div className="signal-list" aria-label="PermitPulse engineering technologies">
          {project.engineeringNotes.technologies.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </section>
    </>
  );
}

function Ziggurat() {
  // Rendered top to bottom so keyboard and screen reader order matches page order.
  const tiersTopDown = zigguratTiers
    .map((tier, index) => ({ ...tier, level: index + 1 }))
    .reverse();

  return (
    <div className="ziggurat-stage">
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

      <nav className="ziggurat-core" aria-label="Page sections">
        {tiersTopDown.map((tier) => (
          <a
            className={`tier tier-${tier.level} ${
              tier.level === zigguratTiers.length ? 'is-summit' : ''
            }`}
            key={tier.id}
            href={tier.href}
          >
            <span className="tier-top-plane" aria-hidden="true" />
            <span className="tier-side tier-side--left" aria-hidden="true" />
            <span className="tier-side tier-side--right" aria-hidden="true" />
            <span className="tier-surface">
              <span className="tier-index" aria-hidden="true">
                {String(tier.level).padStart(2, '0')}
              </span>
              <span className="tier-label">{tier.name}</span>
              <span className="tier-etching" aria-hidden="true" />
            </span>
            <span className="tier-glow" aria-hidden="true" />
          </a>
        ))}
        <div className="ceremonial-ascent" aria-hidden="true">
          {Array.from({ length: 11 }).map((_, index) => (
            <span key={`stair-${index}`} />
          ))}
        </div>
        <div className="temple-foundation" aria-hidden="true" />
        <div className="temple-halo" aria-hidden="true" />
        <div className="summit-beacon" aria-hidden="true" />
      </nav>

      <div className="monument-plaza" aria-hidden="true">
        <span className="plaza-causeway" />
        <span className="plaza-stone plaza-stone--left" />
        <span className="plaza-stone plaza-stone--right" />
      </div>
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="nav">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-text">
            <span className="brand-name">{siteMeta.owner}</span>
            <span className="brand-sub">{siteMeta.name}</span>
          </span>
        </a>
        <nav className="nav-links" aria-label="Main">
          <a className="nav-link" href="#shoot-the-moon">
            Work
          </a>
          <a className="nav-link" href="#process">
            How I build
          </a>
          <ExternalLink className="nav-link" href={siteMeta.githubUrl}>
            GitHub
          </ExternalLink>
          <a className="button button-outline nav-cta" href="#contact">
            Work with me
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-content">
        <div className="hero-copy">
          <p className="eyebrow">Frontend + AI implementation</p>
          <h1 id="hero-title">I build ambitious web products that actually work.</h1>
          <p className="hero-subhead">
            Frontend systems, AI-assisted workflows and interactive products for real business
            problems.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#shoot-the-moon">
              View the work
            </a>
            <a className="button button-secondary" href="#contact">
              Work with me
            </a>
          </div>
          <p className="availability">
            <span className="availability__dot" aria-hidden="true" />
            {siteMeta.availability}
          </p>
        </div>

        <div className="hero-art">
          <Ziggurat />
        </div>
      </div>
    </section>
  );
}

function FactChips({ project }) {
  return (
    <ul className="fact-chips" aria-label={`${project.name} facts`}>
      {project.feature.facts.map((fact) => (
        <li key={fact}>{fact}</li>
      ))}
    </ul>
  );
}

function FeatureSection({ project, variant, media, liveLabel, onOpen }) {
  const titleId = `${project.id}-title`;
  const live = project.links.live;

  return (
    <section
      className={`section feature feature--${variant}`}
      id={project.id}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <div className="feature__layout">
        <div className="feature__heading">
          <p className="section-kicker">{project.feature.eyebrow}</p>
          <h2 id={titleId}>{project.name}</h2>
        </div>
        <div className="feature__media">{media}</div>
        <div className="feature__body">
          <p className="feature__text">{project.feature.body ?? project.description}</p>
          <FactChips project={project} />
          <div className="feature__actions">
            {live?.href ? (
              <ExternalLink className="button button-primary" href={live.href}>
                {liveLabel}
              </ExternalLink>
            ) : null}
            <DetailsButton project={project} onOpen={onOpen} />
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkCard({ project, onOpen }) {
  const live = project.links.live;

  return (
    <article className="work-card">
      <div className="work-card__thumb">
        <img
          src={project.image}
          alt={project.imageAlt}
          width={project.imageWidth}
          height={project.imageHeight}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: project.thumbPosition ?? project.visualPosition ?? 'center' }}
        />
      </div>
      <div className="work-card__body">
        <h3>{project.name}</h3>
        <p>{project.oneLiner}</p>
        <p className="work-card__stack">{project.stack}</p>
      </div>
      <div className="work-card__actions">
        {live?.href ? (
          <ExternalLink className="text-action" href={live.href} context={project.name}>
            Open
          </ExternalLink>
        ) : null}
        <DetailsButton project={project} onOpen={onOpen} className="text-action" />
      </div>
    </article>
  );
}

function WorkSection({ onOpen }) {
  return (
    <section className="section work-section" id="work" aria-labelledby="work-title">
      <div className="section-heading">
        <p className="section-kicker">More shipped work</p>
        <h2 id="work-title">Different problems. Same standard.</h2>
        <p>Smaller products and experiments that prove different parts of the stack.</p>
      </div>
      <ul className="work-grid">
        {supportingProjects.map((project) => (
          <li key={project.id}>
            <WorkCard project={project} onOpen={onOpen} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="section process-section" id="process" aria-labelledby="process-title">
      <div className="section-heading">
        <p className="section-kicker">How I build with AI</p>
        <h2 id="process-title">AI makes the loop faster. The standard stays human.</h2>
      </div>
      <ol className="process-steps">
        {processSteps.map((step, index) => (
          <li className="process-step" key={step.title}>
            <span className="process-step__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
      <p className="process-evidence">{processEvidence}</p>
    </section>
  );
}

function LabSection() {
  return (
    <section className="section lab-section" id="lab" aria-labelledby="lab-title">
      <div className="section-heading">
        <p className="section-kicker">Lab</p>
        <h2 id="lab-title">Experiments worth keeping around.</h2>
      </div>
      <ul className="lab-list">
        {labProjects.map((project) => (
          <li className="lab-item" key={project.id}>
            <div>
              <h3>{project.name}</h3>
              <p>{project.oneLiner}</p>
            </div>
            {project.links.live?.href ? (
              <ExternalLink
                className="text-action"
                href={project.links.live.href}
                context={project.name}
              >
                Open
              </ExternalLink>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function copyWithSelection(text) {
  const field = document.createElement('textarea');
  field.value = text;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch {
    copied = false;
  }
  field.remove();
  return copied;
}

function ContactSection() {
  const [copyStatus, setCopyStatus] = useState('');
  const resetTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copyEmail = async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(siteMeta.email);
      copied = true;
    } catch {
      copied = copyWithSelection(siteMeta.email);
    }
    setCopyStatus(
      copied ? 'Email address copied.' : 'Copy failed. Select the address to copy it.',
    );
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopyStatus(''), 4000);
  };

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-panel">
        <div className="contact-panel__intro">
          <p className="section-kicker">Work with me</p>
          <h2 id="contact-title">Have something difficult to build?</h2>
          <p>
            I am open to contract work, agency overflow and full-time roles. If you have a
            workflow, product or web problem that needs a fast technical implementation, send me
            the problem.
          </p>
          <div className="contact-email">
            <a className="contact-email__address" href={siteMeta.contactHref}>
              {siteMeta.email}
            </a>
            <button className="button button-secondary contact-email__copy" type="button" onClick={copyEmail}>
              Copy email
            </button>
          </div>
          <p className="copy-status" role="status">
            {copyStatus}
          </p>
        </div>

        <div className="contact-panel__routes">
          <ul className="contact-routes">
            {contactRoutes.map((route) => (
              <li key={route.id}>
                <a className="contact-route" href={route.href}>
                  <span>{route.label}</span>
                  <VisuallyHidden> (opens an email draft)</VisuallyHidden>
                  <span className="contact-route__arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {profileLinks.length ? (
            <ul className="contact-profiles">
              {profileLinks.map((link) => (
                <li key={link.label}>
                  <ExternalLink className="text-action" href={link.href}>
                    {link.label}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="site-footer__line">
        {siteMeta.name}. {siteMeta.tagline}
      </p>
      <nav aria-label="Machine-readable files">
        <ul className="site-footer__links">
          {machineReadableFiles.map((path) => (
            <li key={path}>
              <a href={path}>{path}</a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="site-footer__copyright">
        © {new Date().getFullYear()} {siteMeta.owner}
      </p>
    </footer>
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
    const previousBodyPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
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
      document.body.style.paddingRight = previousBodyPaddingRight;
      previouslyFocusedElement?.focus?.();
    };
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  const chamberTitleId = `project-chamber-title-${project.id}`;
  const chamberDescriptionId = `project-chamber-description-${project.id}`;
  const chamberLinks = [
    { type: 'Live', ...project.links.live },
    { type: 'Source', ...project.links.source },
    { type: 'Case study', ...project.links.caseStudy },
  ].filter((link) => link.href);
  const isPermitPulse = project.chamberVariant === 'permitpulse';

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
          aria-label="Close project details"
          ref={closeButtonRef}
        >
          Close
        </button>
        <div className="chamber-header">
          <p className="section-kicker">Project detail</p>
          {project.badge ? <span className="flagship-badge">{project.badge}</span> : null}
          <h2 id={chamberTitleId}>{project.name}</h2>
          {project.subtitle ? <p className="chamber-subtitle">{project.subtitle}</p> : null}
          <span className={`status status--${project.statusTone}`}>{project.status}</span>
        </div>

        <div className="chamber-category">{project.category}</div>
        {project.media ? (
          <div className="chamber-media">
            <FlagshipMedia project={project} />
          </div>
        ) : (
          <div className={`chamber-gallery ${project.detailImage ? 'has-pair' : ''}`}>
            <ProjectArtifact project={project} />
            {project.detailImage ? (
              <figure className="detail-artifact">
                <img
                  src={project.detailImage.src}
                  alt={project.detailImage.alt}
                  width={project.detailImage.width}
                  height={project.detailImage.height}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{project.detailImage.label}</figcaption>
              </figure>
            ) : null}
          </div>
        )}
        <div className="chamber-summary">
          <span>{isPermitPulse ? 'Service + system brief' : 'Short description'}</span>
          <p className="chamber-description" id={chamberDescriptionId}>
            {project.description}
          </p>
        </div>

        {chamberLinks.length ? (
          <div
            className="chamber-links chamber-links--primary"
            aria-label={`${project.name} project links`}
          >
            {chamberLinks.map((link) => (
              <a
                className="chamber-link"
                href={link.href}
                key={link.type}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{link.type}</span>
                <strong>{link.label}</strong>
                <small>
                  Public link<VisuallyHidden> (opens in a new tab)</VisuallyHidden>
                </small>
              </a>
            ))}
          </div>
        ) : null}

        {project.operationalFlow ? <ProjectFlow project={project} /> : null}

        {isPermitPulse ? <PermitPulseArtifactStory project={project} /> : null}

        <div className="chamber-grid">
          <div className="chamber-block chamber-block--wide">
            <span>What it proves</span>
            <p>{project.proves}</p>
          </div>
          <div className="chamber-block">
            <span>Hard part</span>
            <p>{project.hardPart}</p>
          </div>
          <div className="chamber-block">
            <span>How it was built</span>
            <p>{project.howBuilt}</p>
          </div>
          {project.currentStatus ? (
            <div className="chamber-block chamber-block--wide">
              <span>Current status</span>
              <p>{project.currentStatus}</p>
            </div>
          ) : null}
        </div>

        {isPermitPulse ? <PermitPulseSystemNotes project={project} /> : null}

        <div className="chamber-evidence">
          <div>
            <span>Proof signals</span>
            <div className="signal-list">
              {project.proofSignals.map((signal) => (
                <span key={signal}>{signal}</span>
              ))}
            </div>
          </div>
          {project.tags?.length ? (
            <div>
              <span>Stack and tags</span>
              <div className="signal-list">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const closeChamber = useCallback(() => setSelectedProject(null), []);

  return (
    <>
      <a className="skip-link" href="#shoot-the-moon">
        Skip to flagship project
      </a>
      <SiteHeader />
      <main>
        <Hero />
        <FeatureSection
          project={flagshipProject}
          variant="flagship"
          media={<FlagshipMedia project={flagshipProject} />}
          liveLabel="Play it live"
          onOpen={setSelectedProject}
        />
        <FeatureSection
          project={majorProject}
          variant="major"
          media={<FeatureImage project={majorProject} />}
          liveLabel="Visit PermitPulse"
          onOpen={setSelectedProject}
        />
        <WorkSection onOpen={setSelectedProject} />
        <ProcessSection />
        <LabSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <ProjectChamber project={selectedProject} onClose={closeChamber} />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
