import React, { useCallback, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { getProject, siteMeta } from './data/projects';
import { shootTheMoonCaseStudy as study } from './data/shootTheMoonCaseStudy';
import {
  ExternalLink,
  FlagshipMedia,
  ReelDialog,
  SiteFooter,
  SiteHeader,
  VisuallyHidden,
  WatchReelButton,
} from './shared';
import './styles.css';
import './case-study.css';

const project = getProject('shoot-the-moon');
const { media } = project;
const live = project.links.live;
const source = project.links.source;
// "Work" in the site navigation lands on the flagship feature, so back goes there too.
const workHref = '/#shoot-the-moon';

const pad = (number) => String(number).padStart(2, '0');

function SectionHeading({ index, kicker, id, title, children }) {
  return (
    <div className="section-heading cs-heading">
      <p className="section-kicker">
        <span className="cs-heading__index">{pad(index)}</span>
        {kicker}
      </p>
      <h2 id={id}>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

function PlayLive({ className, children }) {
  return live?.href ? (
    <ExternalLink className={className} href={live.href}>
      {children}
    </ExternalLink>
  ) : null;
}

function ViewSource({ className, children }) {
  return source?.href ? (
    <ExternalLink className={className} href={source.href}>
      {children}
    </ExternalLink>
  ) : null;
}

function CaseHero({ onOpenReel, paused }) {
  return (
    <section className="cs-hero" aria-labelledby="cs-title">
      <div className="cs-hero__inner">
        <div className="cs-hero__copy">
          <nav className="cs-crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <a href={workHref}>Work</a>
              </li>
              <li aria-current="page">Case study</li>
            </ol>
          </nav>
          <h1 id="cs-title">{project.name}</h1>
          <p className="cs-hero__lede">{study.positioning}</p>
          <p className="cs-hero__summary">{study.summary}</p>
          <div className="cs-actions">
            <PlayLive className="button button-primary">Play it live</PlayLive>
            <WatchReelButton
              project={project}
              onOpen={onOpenReel}
              className="button button-outline"
            />
            <ViewSource className="button button-secondary">View source</ViewSource>
          </div>
        </div>
        <div className="cs-hero__media">
          <FlagshipMedia media={media} preview paused={paused} />
        </div>
        <dl className="cs-specs">
          {study.specs.map((spec) => (
            <div key={spec.label}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ProjectSection() {
  const { project: overview } = study;

  return (
    <section className="section cs-section" id="project" aria-labelledby="project-title">
      <SectionHeading index={1} kicker="The project" id="project-title" title={overview.title} />
      <div className="cs-project">
        <div className="cs-project__intro">
          <figure className="cs-quote">
            <blockquote>
              <p>{overview.quote}</p>
            </blockquote>
            <figcaption>The game’s opening screen</figcaption>
          </figure>
          <p className="cs-project__body">{overview.body}</p>
        </div>
        <ol className="cs-loop" aria-label="How a campaign plays out">
          {overview.loop.map((step, index) => (
            <li key={step.title}>
              <span className="cs-loop__index" aria-hidden="true">
                {pad(index + 1)}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ChallengesSection() {
  return (
    <section className="section cs-section" id="hard-parts" aria-labelledby="hard-parts-title">
      <SectionHeading
        index={2}
        kicker="What made it hard"
        id="hard-parts-title"
        title="Four problems that shaped the architecture."
      />
      <ol className="cs-challenges">
        {study.challenges.map((challenge, index) => (
          <li className="cs-challenge" key={challenge.title}>
            <span className="cs-challenge__index" aria-hidden="true">
              {pad(index + 1)}
            </span>
            <h3>{challenge.title}</h3>
            <dl>
              <div>
                <dt>Problem</dt>
                <dd>{challenge.problem}</dd>
              </div>
              <div>
                <dt>Approach</dt>
                <dd>{challenge.approach}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ProofSection() {
  const { proof, verification } = study;

  return (
    <section className="section cs-section" id="proof" aria-labelledby="proof-title">
      <SectionHeading
        index={3}
        kicker="Engineering proof"
        id="proof-title"
        title="Checked in the repository, not implied."
      />
      <ul className="cs-stats">
        {proof.stats.map((stat) => (
          <li key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </li>
        ))}
      </ul>
      <ul className="cs-decisions">
        {proof.decisions.map((decision) => (
          <li key={decision.title}>
            <h3>{decision.title}</h3>
            <p>{decision.body}</p>
          </li>
        ))}
      </ul>
      <ul className="fact-chips cs-stack" aria-label="Stack and tooling">
        {proof.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="cs-footnote">
        Figures checked against the project repository at commit {verification.commit} on{' '}
        {verification.date}.
      </p>
    </section>
  );
}

function ReelSection({ onOpenReel }) {
  const { reel } = study;

  return (
    <section className="section cs-section" id="reel" aria-labelledby="reel-title">
      <SectionHeading index={4} kicker="Visual development" id="reel-title" title={reel.title} />
      <div className="cs-reel">
        <button
          className="cs-reel__card"
          type="button"
          aria-haspopup="dialog"
          onClick={onOpenReel}
        >
          <picture>
            <source type="image/webp" srcSet={media.poster.webp} />
            <img
              src={media.poster.jpg}
              alt=""
              width={media.width}
              height={media.height}
              loading="lazy"
              decoding="async"
            />
          </picture>
          <span className="cs-reel__play" aria-hidden="true">
            <span className="play-glyph" />
          </span>
          <span className="cs-reel__label">
            <strong>
              Watch the reel<VisuallyHidden> for {project.name}</VisuallyHidden>
            </strong>
            <small>57.6 seconds · no audio</small>
          </span>
        </button>
        <div className="cs-reel__notes cs-reel__pipeline">
          <h3>How the reel was made</h3>
          <ol className="cs-pipeline">
            {reel.pipeline.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <span>{step.body}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="cs-reel__notes cs-reel__direction">
          <h3>Visual direction</h3>
          <ul className="cs-direction">
            {reel.direction.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  const { workflow } = study;

  return (
    <section className="section cs-section" id="process" aria-labelledby="process-title">
      <SectionHeading index={5} kicker="How I worked" id="process-title" title={workflow.title}>
        {workflow.intro}
      </SectionHeading>
      <ol className="process-steps cs-owners">
        {workflow.owners.map((owner, index) => (
          <li className="process-step" key={owner.title}>
            <span className="process-step__index" aria-hidden="true">
              {pad(index + 1)}
            </span>
            <h3>{owner.title}</h3>
            <p>{owner.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function NextSection({ onOpenReel }) {
  return (
    <section className="section cs-next" id="contact" aria-labelledby="next-title">
      <div className="contact-panel">
        <div className="contact-panel__intro">
          <p className="section-kicker">Work with me</p>
          <h2 id="next-title">Need something this ambitious built?</h2>
          <p>
            I build frontend systems, interactive products and AI-assisted workflows. I am open
            to contract work, agency overflow and full-time roles.
          </p>
          <div className="contact-email">
            <a className="contact-email__address" href={siteMeta.contactHref}>
              {siteMeta.email}
            </a>
          </div>
        </div>
        <div className="cs-next__actions">
          <PlayLive className="button button-primary">Play Shoot the Moon</PlayLive>
          <WatchReelButton
            project={project}
            onOpen={onOpenReel}
            className="button button-outline"
          />
          <a className="button button-secondary" href={workHref}>
            Back to work
          </a>
          <a className="button button-secondary" href={siteMeta.contactHref}>
            Contact
            <VisuallyHidden> Sergio (opens an email draft)</VisuallyHidden>
          </a>
        </div>
      </div>
    </section>
  );
}

function CaseStudyPage() {
  const [reelOpen, setReelOpen] = useState(false);
  const openReel = useCallback(() => setReelOpen(true), []);
  const closeReel = useCallback(() => setReelOpen(false), []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to case study
      </a>
      <SiteHeader home="/" contactHref="#contact" />
      <main className="cs-main" id="main" tabIndex={-1}>
        <CaseHero onOpenReel={openReel} paused={reelOpen} />
        <ProjectSection />
        <ChallengesSection />
        <ProofSection />
        <ReelSection onOpenReel={openReel} />
        <WorkflowSection />
        <NextSection onOpenReel={openReel} />
      </main>
      <SiteFooter />
      {reelOpen ? <ReelDialog project={project} onClose={closeReel} /> : null}
    </>
  );
}

createRoot(document.getElementById('root')).render(<CaseStudyPage />);
