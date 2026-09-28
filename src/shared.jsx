// Components shared by the homepage (main.jsx) and the case study pages. Keep page-specific
// sections in their own entry so neither page ships the other's code.
import React, { useEffect, useRef, useState } from 'react';
import { siteMeta } from './data/projects';

const machineReadableFiles = ['/llms.txt', '/ai.json', '/projects.json'];

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

export const prefersReducedMotion = () =>
  window.matchMedia?.(reducedMotionQuery).matches ?? false;

export function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    const query = window.matchMedia?.(reducedMotionQuery);
    if (!query) {
      return undefined;
    }

    const update = () => setReducedMotion(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reducedMotion;
}

// Locks page scroll behind a modal and returns the function that restores it.
export function lockBodyScroll() {
  const { overflow, paddingRight } = document.body.style;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
  document.body.style.overflow = 'hidden';

  return () => {
    document.body.style.overflow = overflow;
    document.body.style.paddingRight = paddingRight;
  };
}

export function VisuallyHidden({ children }) {
  return <span className="visually-hidden">{children}</span>;
}

export function ExternalLink({ href, className, children, context }) {
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

// Silent preview loop layered over the poster. It is only requested once the poster
// has settled (`ready`) and the frame is in view, never runs with reduced motion or
// Save-Data, pauses off screen or behind a modal, and stays invisible until it is
// actually playing, so a blocked autoplay leaves the poster in place.
function FlagshipLoop({ src, poster, frameRef, ready, paused }) {
  const videoRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const enabled = !reducedMotion && navigator.connection?.saveData !== true;
  const [inView, setInView] = useState(false);
  const [requested, setRequested] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!enabled || !ready || !frame || !('IntersectionObserver' in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setRequested(true);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [enabled, ready, frameRef]);

  useEffect(() => {
    if (!enabled) {
      setPlaying(false);
    }
  }, [enabled]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (inView && !paused) {
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [enabled, requested, inView, paused]);

  if (!enabled || !requested) {
    return null;
  }

  return (
    <video
      className={`flagship-media__loop ${playing ? 'is-playing' : ''}`}
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
      onPlaying={() => setPlaying(true)}
      onError={() => setPlaying(false)}
    />
  );
}

// 16:9 flagship media. Uses the real poster when one exists, otherwise a CSS-only
// lunar horizon so no fake screenshot or placeholder text ever ships. With `preview`,
// the silent loop, when one is set, plays over it.
export function FlagshipMedia({ media, preview = false, paused = false }) {
  const frameRef = useRef(null);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const posterSrc = media.poster?.jpg ?? media.poster?.webp;
  const showPoster = Boolean(posterSrc) && !posterFailed;

  return (
    <div className="flagship-media" ref={frameRef}>
      {showPoster ? (
        <picture>
          {media.poster.webp && media.poster.jpg ? (
            <source type="image/webp" srcSet={media.poster.webp} />
          ) : null}
          <img
            src={posterSrc}
            alt={media.alt}
            width={media.width}
            height={media.height}
            loading="eager"
            decoding="async"
            onLoad={() => setPosterLoaded(true)}
            onError={() => setPosterFailed(true)}
          />
        </picture>
      ) : (
        <div className="lunar-fallback" aria-hidden="true">
          <span className="lunar-fallback__stars" />
          <span className="lunar-fallback__mass" />
          <span className="lunar-fallback__edge" />
          <span className="lunar-fallback__signal" />
        </div>
      )}
      {preview && media.loop ? (
        <FlagshipLoop
          src={media.loop}
          poster={showPoster ? media.poster.webp ?? media.poster.jpg : undefined}
          frameRef={frameRef}
          ready={!showPoster || posterLoaded}
          paused={paused}
        />
      ) : null}
    </div>
  );
}

export function WatchReelButton({ project, onOpen, className }) {
  return (
    <button className={className} type="button" aria-haspopup="dialog" onClick={onOpen}>
      <span className="play-glyph" aria-hidden="true" />
      Watch reel
      <VisuallyHidden> for {project.name}</VisuallyHidden>
    </button>
  );
}

// Full reel in a native modal dialog. The platform handles inert background, Escape and
// Tab order through the video's own controls; this adds scroll lock and focus return.
// Playback starts from the Watch reel click, or waits for the play control when the
// visitor prefers reduced motion.
export function ReelDialog({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const videoRef = useRef(null);
  const { media } = project;
  const titleId = `${project.id}-reel-title`;

  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocusedElement = document.activeElement;
    const unlockScroll = lockBodyScroll();

    dialog.addEventListener('close', onClose);
    dialog.showModal();
    closeButtonRef.current?.focus();
    if (!prefersReducedMotion()) {
      videoRef.current?.play().catch(() => {});
    }

    return () => {
      dialog.removeEventListener('close', onClose);
      if (dialog.open) {
        dialog.close();
      }
      unlockScroll();
      previouslyFocusedElement?.focus?.();
    };
  }, [onClose]);

  return (
    <dialog
      className="reel-dialog"
      aria-labelledby={titleId}
      ref={dialogRef}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          onClose();
        }
      }}
    >
      <div className="reel-dialog__panel">
        <div className="reel-dialog__bar">
          <h2 id={titleId}>{project.name} reel</h2>
          <button
            className="chamber-close reel-dialog__close"
            type="button"
            onClick={onClose}
            aria-label="Close reel"
            ref={closeButtonRef}
          >
            Close
          </button>
        </div>
        <div className="reel-dialog__frame">
          <video
            ref={videoRef}
            src={media.reel}
            poster={media.poster?.webp ?? media.poster?.jpg}
            controls
            playsInline
            preload="metadata"
            aria-labelledby={titleId}
          />
        </div>
      </div>
    </dialog>
  );
}

// `home` prefixes the in-page anchors, so a page other than the homepage passes '/' to
// link back into the homepage sections. `contactHref` lets a page with its own contact
// panel keep the Work with me button on the page.
export function SiteHeader({ home = '', contactHref = `${home}#contact` }) {
  return (
    <header className="site-header">
      <div className="nav">
        <a className="brand" href={home || '#top'}>
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-text">
            <span className="brand-name">{siteMeta.owner}</span>
            <span className="brand-sub">{siteMeta.name}</span>
          </span>
        </a>
        <nav className="nav-links" aria-label="Main">
          <a className="nav-link" href={`${home}#shoot-the-moon`}>
            Work
          </a>
          <a className="nav-link" href={`${home}#process`}>
            How I build
          </a>
          <ExternalLink className="nav-link" href={siteMeta.githubUrl}>
            GitHub
          </ExternalLink>
          <a className="button button-outline nav-cta" href={contactHref}>
            Work with me
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
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
