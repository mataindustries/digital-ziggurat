import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { getProject, siteMeta } from './data/projects';
import signal from './data/deadChannelSignal.json';
import { deadChannelCaseStudy as study } from './data/deadChannelCaseStudy';
import { SiteHeader, SiteFooter, VisuallyHidden } from './shared';
import { FilmPlayer } from './dead-channel/FilmPlayer';
import { SignalTrace } from './dead-channel/SignalTrace';
import './styles.css';
import './case-study.css';
import './dead-channel.css';

const project = getProject('dead-channel');
const { film, measurements: measured } = signal;

function SectionHeading({ index, kicker, id, title }) {
  return (
    <div className="section-heading cs-heading">
      <p className="section-kicker">
        <span className="cs-heading__index">
          {String(index).padStart(2, '0')}
        </span>
        {kicker}
      </p>
      <h2 id={id}>{title}</h2>
    </div>
  );
}

function DeadChannelPage() {
  const playerRef = useRef(null);
  const [time, setTime] = useState(0);
  const [copied, setCopied] = useState('');
  const onTime = useCallback((nextTime) => setTime(nextTime), []);
  const onPlaying = useCallback(() => {}, []);
  useEffect(() => {
    const pauseWhenHidden = () => {
      if (document.hidden) playerRef.current?.pause();
    };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    return () =>
      document.removeEventListener('visibilitychange', pauseWhenHidden);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to film
      </a>
      <SiteHeader home="/" contactHref="#contact" />
      <main className="cs-main dc-main" id="main" tabIndex={-1}>
        <section className="dc-screening" id="film" aria-labelledby="dc-title">
          <nav className="cs-crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <a href="/#dead-channel">Work</a>
              </li>
              <li aria-current="page">Dead Channel</li>
            </ol>
          </nav>
          <div className="dc-title-row">
            <div>
              <p className="section-kicker">Original short film</p>
              <h1 id="dc-title">Dead Channel</h1>
              <p className="dc-thesis">{study.thesis}</p>
            </div>
            <p className="dc-logline">{study.positioning}</p>
          </div>
          <p className="dc-content-note" id="dc-content-note">
            Horror-comedy · sudden loud sounds near the end · best with
            headphones
          </p>
          <FilmPlayer
            ref={playerRef}
            media={project.media}
            duration={film.duration}
            onTime={onTime}
            onPlaying={onPlaying}
          />
          <p className="dc-caption-status" id="dc-caption-status">
            Private screening · captions and verbatim transcript await owner
            review.
          </p>
          <SignalTrace
            time={time}
            onSeek={(nextTime) => playerRef.current?.seek(nextTime)}
          />
          <div className="cs-actions dc-screening__actions">
            <a className="button button-outline" href="#contact">
              Start a project
            </a>
            <a className="button button-secondary" href="#process">
              How it was made ↓
            </a>
          </div>
          <dl className="cs-specs dc-specs">
            {study.specs.map((spec) => (
              <div key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
          <details className="dc-details dc-viewing-notes">
            <summary>Picture and sound notes · contains the reveal</summary>
            <p>
              These viewing notes combine V4.2 picture checks with measurements
              of the unchanged original audio. They are not a complete
              transcript or a replacement for approved descriptive captions.
            </p>
            <ol>
              {signal.events.map((event) => (
                <li key={event.id}>
                  <strong>
                    {event.time.toFixed(2)} s · {event.label}.
                  </strong>{' '}
                  {event.detail}
                </li>
              ))}
            </ol>
            <p>
              The film ends on the fictional LOOP tutorial page. LOOP and Ellis
              Builds are fictional. Spoken dialog will be added only after
              transcription and approval.
            </p>
          </details>
        </section>
        <section
          className="section cs-section"
          id="joke"
          aria-labelledby="joke-title"
        >
          <SectionHeading
            index={1}
            kicker="The joke"
            id="joke-title"
            title="It took one prompt. Allegedly."
          />
          <div className="cs-project">
            <p className="cs-project__body">{study.summary}</p>
            <ol className="cs-loop">
              {study.beats.map((beat, index) => (
                <li key={beat.title}>
                  <span className="cs-loop__index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{beat.title}</h3>
                  <p>{beat.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <p className="dc-fiction">
            The tutorial’s one-prompt confidence is the joke. The film was
            developed through iteration. LOOP and Ellis Builds are fictional.
          </p>
        </section>
        <section
          className="section cs-section"
          id="swarm"
          aria-labelledby="swarm-title"
        >
          <SectionHeading
            index={2}
            kicker="The invisible swarm"
            id="swarm-title"
            title={`You never see them. You hear ${film.sourceCount}.`}
          />
          <div className="dc-evidence-grid">
            <article>
              <p className="dc-evidence__label">Measured in the master</p>
              <h3>Discovery on</h3>
              <p>
                From {measured.discovery.t0.toFixed(2)}–
                {measured.discovery.t1.toFixed(2)} s, inter-channel correlation
                falls from {measured.discovery.correlationFrom.toFixed(2)} to{' '}
                {measured.discovery.correlationTo.toFixed(2)} as the swarm bed
                arrives.
              </p>
            </article>
            <article>
              <p className="dc-evidence__label">Measured in the master</p>
              <h3>First surge</h3>
              <p>
                The sound onset at {measured.surge.time.toFixed(2)} s lands
                beside the picture change at{' '}
                {measured.surge.pictureTime.toFixed(2)} s. Sound and haze make
                the empty hall feel occupied.
              </p>
            </article>
            <article>
              <p className="dc-evidence__label">Measured in the master</p>
              <h3>Convergence</h3>
              <p>
                The detector glitches during the approach. Its entity readout
                returns to zero at frame {measured.entityZero.frame} (
                {measured.entityZero.time.toFixed(2)} s), after RANGE: 0.00 m
                appears at {measured.rangeZero.time.toFixed(2)} s. The climax
                follows at {measured.convergence.time.toFixed(2)} s, with
                correlation rising to about{' '}
                {measured.convergence.correlationMax.toFixed(1)} near the end.
              </p>
            </article>
          </div>
        </section>
        <section
          className="section cs-section"
          id="process"
          aria-labelledby="dc-process-title"
        >
          <SectionHeading
            index={3}
            kicker="How it was made"
            id="dc-process-title"
            title="Picture. Sound. Picture lock."
          />
          <ol className="dc-process">
            {study.process.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <details className="dc-details dc-provenance">
            <summary>Picture-lock provenance</summary>
            <p>
              The private film matches the supplied V4.2 SHA-256. Its original
              audio matches V4.1 byte for byte, so the independently verified{' '}
              {signal.provenance.profile.windowSeconds * 1000} ms stereo profile
              is retained. Picture events are checked against V4.2. This is not
              an event map.
            </p>
            <dl>
              <div>
                <dt>Master SHA-256</dt>
                <dd>
                  <code>{film.sha256}</code>
                </dd>
              </div>
              <div>
                <dt>Video stream SHA-256</dt>
                <dd>
                  <code>{film.streams.video}</code>
                </dd>
              </div>
              <div>
                <dt>Audio stream SHA-256</dt>
                <dd>
                  <code>{film.streams.audio}</code>
                </dd>
              </div>
            </dl>
          </details>
        </section>
        <section
          className="section cs-next"
          id="contact"
          aria-labelledby="dc-contact-title"
        >
          <div className="contact-panel">
            <div className="contact-panel__intro">
              <p className="section-kicker">Work with me</p>
              <h2 id="dc-contact-title">
                Need something people actually feel?
              </h2>
              <p>
                I build frontend systems, interactive products and AI-assisted
                workflows. Bring a product, a brief and a deadline. We can start
                with a focused, paid implementation sprint.
              </p>
              <div className="contact-email">
                <a className="contact-email__address" href={study.contactHref}>
                  {siteMeta.email}
                  <VisuallyHidden> (opens an email draft)</VisuallyHidden>
                </a>
              </div>
              <button
                type="button"
                className="button button-secondary dc-copy"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(siteMeta.email);
                    setCopied('Email copied.');
                  } catch {
                    setCopied(`Copy this address: ${siteMeta.email}`);
                  }
                }}
              >
                Copy email
              </button>
              <p className="copy-status" role="status">
                {copied}
              </p>
            </div>
            <div className="cs-next__actions">
              <a className="button button-primary" href={study.contactHref}>
                Discuss a project
                <VisuallyHidden> (opens an email draft)</VisuallyHidden>
              </a>
              <a className="button button-outline" href="/#contact">
                Fixed-scope sprints
              </a>
              <a className="button button-secondary" href="/#shoot-the-moon">
                Back to work
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

createRoot(document.getElementById('root')).render(<DeadChannelPage />);
