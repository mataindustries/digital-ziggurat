import React, { useState } from 'react';
import signal from '../data/deadChannelSignal.json';

const { film, windows, measurements: measured } = signal;
const x = (t) => (t / film.duration) * 880;
// Every horizontal step represents one measured window. No smoothing or invented
// samples between the supplied 250 ms observations. Width is a correlation proxy,
// not a source-position visualization or a measure of perceptual distance.
const correlationPath = windows
  .map((w) => {
    if (w.correlation === null) return '';
    const y = 62 - ((1 - w.correlation) / 2) * 52;
    return `M${x(w.t0)},62 V${y} H${x(w.t1)} V62 Z`;
  })
  .join(' ');
const balancePath = windows
  .map((w) => `M${x(w.t0)},${35 - w.balance} H${x(w.t1)}`)
  .join(' ');
const markerIds = [
  'discovery',
  'surge',
  'range-zero',
  'convergence',
  'silence',
  'tutorial',
];
const markers = markerIds
  .map((id) => signal.events.find((event) => event.id === id))
  .filter(Boolean);

export function SignalTrace({ time, onSeek }) {
  const [selected, setSelected] = useState('discovery');
  const event =
    signal.events.find((item) => item.id === selected) ?? markers[0];

  return (
    <section className="dc-trace" aria-labelledby="dc-trace-title">
      <div className="dc-trace__heading">
        <h2 id="dc-trace-title">Signal Trace</h2>
        <span>
          Measured in the master ·{' '}
          {signal.provenance.profile.windowSeconds * 1000} ms windows
        </span>
      </div>
      <div className="dc-trace__plot">
        <svg
          viewBox="0 0 880 80"
          preserveAspectRatio="none"
          role="img"
          aria-label="Measured stereo correlation proxy and left minus right channel balance across the film"
        >
          <defs>
            <pattern
              id="reveal-hatch"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
            >
              <path d="M0,6 L6,0" stroke="#d19255" strokeWidth="1" />
            </pattern>
          </defs>
          <rect
            x={x(measured.tutorial.pictureCut)}
            y="0"
            width={880 - x(measured.tutorial.pictureCut)}
            height="80"
            fill="url(#reveal-hatch)"
            opacity="0.4"
          />
          <path d={correlationPath} fill="#b7d5b5" fillOpacity="0.24" />
          <path
            d={balancePath}
            fill="none"
            stroke="#20e4ff"
            strokeWidth="1.6"
          />
          <line
            x1="0"
            x2="880"
            y1="35"
            y2="35"
            stroke="#b7d5b5"
            strokeOpacity="0.2"
          />
          <line
            className="dc-trace__playhead"
            x1={x(time)}
            x2={x(time)}
            y1="0"
            y2="80"
            stroke="#f4c76b"
            strokeWidth="2"
          />
        </svg>
        <div className="dc-trace__axis">
          <span>0 s</span>
          <span>{(film.duration / 2).toFixed(0)} s</span>
          <span>{film.duration} s</span>
        </div>
      </div>
      <div className="dc-trace__legend">
        <span>
          <i className="dc-key dc-key--width" />
          Correlation proxy: (1 − r) / 2
        </span>
        <span>
          <i className="dc-key dc-key--balance" />L − R level (dB)
        </span>
        <span>
          <i className="dc-key dc-key--playhead" />
          Playback
        </span>
      </div>
      <div
        className="dc-trace__markers"
        aria-label="Inspect measured film moments"
      >
        {markers.map((marker) => (
          <button
            type="button"
            key={marker.id}
            aria-pressed={selected === marker.id}
            onClick={() => {
              setSelected(marker.id);
              onSeek(marker.time);
            }}
          >
            <span>{marker.time.toFixed(2)} s</span>
            {marker.label}
          </button>
        ))}
      </div>
      <p className="dc-trace__event" role="status">
        <strong>
          {event.label} · {event.time.toFixed(2)} s.
        </strong>{' '}
        {event.detail}
      </p>
      <p className="dc-trace__note">
        The shaded band uses stereo correlation as a width proxy. The cyan line
        shows channel balance, with left above and right below the reference.
        These are audio measurements, not positions of the virtual sources.
        Selecting a moment pauses and seeks the film.
      </p>
      <details className="dc-details">
        <summary>Read the measured values</summary>
        <div className="dc-table-scroll">
          <table>
            <caption>
              Stereo measurements supplied with the picture-lock master
            </caption>
            <thead>
              <tr>
                <th scope="col">Window (s)</th>
                <th scope="col">L RMS (dBFS)</th>
                <th scope="col">R RMS (dBFS)</th>
                <th scope="col">L − R (dB)</th>
                <th scope="col">Correlation</th>
              </tr>
            </thead>
            <tbody>
              {windows.map((w) => (
                <tr key={w.t0}>
                  <th scope="row">
                    {w.t0.toFixed(2)}–{w.t1.toFixed(2)}
                  </th>
                  <td>{w.rmsL.toFixed(1)}</td>
                  <td>{w.rmsR.toFixed(1)}</td>
                  <td>{w.balance.toFixed(2)}</td>
                  <td>
                    {w.correlation === null
                      ? 'No measurement'
                      : w.correlation.toFixed(3)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
