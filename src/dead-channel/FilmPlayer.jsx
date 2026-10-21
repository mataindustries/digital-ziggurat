import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

// Play is called within the user's gesture. Seeking from the trace never makes sound.
// Known runtime and dimensions let us defer film bytes until an explicit interaction.
export const FilmPlayer = forwardRef(function FilmPlayer(
  { media, duration, onTime, onPlaying },
  ref,
) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState('');

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    setError('');
    if (video.error) video.load();
    video.muted = false;
    setStarted(true);
    video.play().catch(() => {
      setError('Playback could not start. Use the video controls to retry.');
    });
  };

  useImperativeHandle(
    ref,
    () => ({
      seek(time) {
        const video = videoRef.current;
        if (!video) return;
        // A trace selection is an inspection action, not permission to play sound.
        video.pause();
        video.currentTime = Math.max(0, Math.min(duration, time));
        onTime(video.currentTime);
        video.focus();
      },
      pause() {
        videoRef.current?.pause();
      },
    }),
    [duration, onTime],
  );

  return (
    <div className="dc-player-wrap">
      <div className="dc-player">
        <video
          id="dead-channel-film"
          ref={videoRef}
          src={media.reel}
          poster={media.poster?.webp ?? media.poster?.jpg}
          width={media.width}
          height={media.height}
          controls={started}
          playsInline
          preload="none"
          aria-label="Dead Channel, full film"
          aria-describedby="dc-content-note dc-caption-status"
          onTimeUpdate={(event) => onTime(event.currentTarget.currentTime)}
          onSeeked={(event) => onTime(event.currentTarget.currentTime)}
          onPlay={() => {
            setStarted(true);
            onPlaying(true);
          }}
          onPause={() => onPlaying(false)}
          onEnded={() => onPlaying(false)}
          onError={() => {
            setError('The film is unavailable. Use the controls to retry.');
            onPlaying(false);
          }}
        >
          {media.captions ? (
            <track
              kind="captions"
              src={media.captions}
              srcLang="en"
              label="English SDH"
              default
            />
          ) : null}
        </video>
        {!started ? (
          <button
            type="button"
            className="dc-player__play button button-primary"
            onClick={play}
          >
            <span className="play-glyph" aria-hidden="true" />
            Play with sound · {duration} s
          </button>
        ) : null}
      </div>
      {error ? (
        <p className="dc-player__error" role="status">
          {error}{' '}
          <button type="button" onClick={play}>
            Retry playback
          </button>
        </p>
      ) : null}
    </div>
  );
});
