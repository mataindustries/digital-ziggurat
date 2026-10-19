#!/usr/bin/env python3
"""Import the supplied 250 ms measurements; optionally verify/re-measure the master.

The source count and event onsets are documentary facts from the supplied blueprint,
not recovered trajectories. This deliberately does not synthesize an EVENT_MAP.
"""
import argparse
import hashlib
import json
import math
from pathlib import Path
import subprocess

EXPECTED_SHA = "43cab0916f52519afcb67c96a3d69aa3ff6e891ba7cd0a43e9f104aefa918fc9"
VIDEO_SHA = "8e8015acdbb7fd4e32e256dddcaa10e85004cb26f4a63b3ea72b31fe0e42b104"
AUDIO_SHA = "931f68c9667487217b8d3921f7724b51ee89ba683a9b1a10df7af726ae611628"
ROOT = Path(__file__).resolve().parents[2]
FIELDS = ("t0", "t1", "rmsL", "rmsR", "balance", "correlation", "sideMid", "centroid", "hfPercent")


def sha256(path):
    with open(path, "rb") as stream:
        return hashlib.file_digest(stream, "sha256").hexdigest()


def run(*args):
    return subprocess.run(args, check=True, capture_output=True).stdout


def parse_profile(path):
    result = []
    for line in path.read_text().splitlines()[1:]:
        values = line.split()
        if not values:
            continue
        if len(values) != len(FIELDS):
            raise ValueError(f"Malformed measurement row: {line}")
        row = {key: (float(value) if math.isfinite(float(value)) else None)
               for key, value in zip(FIELDS, values)}
        result.append(row)
    if len(result) != 88:
        raise ValueError(f"Expected all 88 measured windows, found {len(result)}")
    for index, row in enumerate(result):
        if row["t0"] != index / 4 or row["t1"] != (index + 1) / 4:
            raise ValueError("Measurement windows must cover 0–22 s without gaps")
    return result


def remeasure(path):
    # Import NumPy only for optional independent PCM verification; UI has no dependency.
    import numpy as np
    raw = run("ffmpeg", "-v", "error", "-i", str(path), "-map", "0:a:0", "-t", "22",
              "-ar", "44100", "-ac", "2", "-f", "f32le", "-")
    samples = np.frombuffer(raw, dtype="<f4").reshape(-1, 2).astype(np.float64)
    rows = []
    for index in range(88):
        left, right = samples[index * 11025:(index + 1) * 11025].T
        rl = 20 * np.log10(np.sqrt(np.mean(left * left)) + 1e-12)
        rr = 20 * np.log10(np.sqrt(np.mean(right * right)) + 1e-12)
        corr = float(np.corrcoef(left, right)[0, 1]) if np.std(left) > 0 and np.std(right) > 0 else None
        mid, side = (left + right) / 2, (left - right) / 2
        sm = 20 * np.log10((np.sqrt(np.mean(side * side)) + 1e-12) / (np.sqrt(np.mean(mid * mid)) + 1e-12))
        spectrum = np.abs(np.fft.rfft(mid * np.hanning(len(mid)))) ** 2
        frequency = np.fft.rfftfreq(len(mid), 1 / 44100)
        centroid = (spectrum * frequency).sum() / (spectrum.sum() + 1e-20)
        hf = 100 * spectrum[frequency > 4000].sum() / (spectrum.sum() + 1e-20)
        rounded = (index / 4, (index + 1) / 4, round(float(rl), 1), round(float(rr), 1),
                   round(float(rl - rr), 2), round(corr, 3) if corr is not None else None,
                   round(float(sm), 1), round(float(centroid)), round(float(hf), 1))
        rows.append(dict(zip(FIELDS, rounded)))
    return rows


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--profile", type=Path, required=True)
    parser.add_argument("--reference-script", type=Path, required=True)
    parser.add_argument("--blueprint", type=Path, required=True)
    parser.add_argument("--input", type=Path, help="Private master; independently verify hash and PCM profile")
    parser.add_argument("--output", type=Path, default=ROOT / "src/data/deadChannelSignal.json")
    parser.add_argument("--film-output", type=Path, default=ROOT / "src/data/deadChannelFilm.json",
                        help="Small shared identity file; keep measurement windows out of the homepage bundle")
    parser.add_argument("--check", action="store_true", help="Compare generated JSON without writing")
    args = parser.parse_args()
    windows = parse_profile(args.profile)
    if args.input:
        if sha256(args.input) != EXPECTED_SHA:
            raise SystemExit("Master SHA-256 differs from the supplied V4.2 review; refusing")
        repeated = remeasure(args.input)
        differences = [(i, field, row[field], repeated[i][field])
                       for i, row in enumerate(windows) for field in FIELDS
                       if row[field] != repeated[i][field]]
        if differences:
            raise SystemExit(f"Independent decoded PCM differs from supplied profile: {differences[:8]}")
        print("Master SHA-256 and all 88 independently decoded measurement windows verified.")

    events = [
        {"id": "discovery", "time": 7.25, "end": 8.5, "label": "Discovery on", "detail": "Stereo correlation falls from 0.431 to 0.159.", "basis": "250 ms stereo profile"},
        {"id": "surge", "time": 9.79, "pictureTime": 9.8, "label": "First surge", "detail": "Measured sound onset precedes the 9.800 s picture boundary by 0.010 s.", "basis": "blueprint 10 ms onset analysis; profile bins 9.50–10.00 s"},
        {"id": "flanks", "time": 13.25, "end": 14.5, "label": "Stereo flanks", "detail": "Right +5.76 dB at 13.25–13.50 s; left +3.81 dB at 14.25–14.50 s.", "basis": "250 ms stereo profile"},
        {"id": "shutdown", "time": 15, "frame": 900, "label": "Shutdown requested", "detail": "Device close-up begins; the broadcast persists.", "basis": "blueprint frame inspection"},
        {"id": "detector-glitch", "time": 15, "frame": 900, "label": "Detector glitches", "detail": "A sampled approach close-up shows ERR at frame 900 and -- at frame 960; this marker is not a claim about glitch onset.", "basis": "V4.2 direct source-frame inspection, frames 900 and 960"},
        {"id": "range-zero", "time": 19.05, "frame": 1143, "label": "Range: 0.00 m", "detail": "The range readout reaches 0.00 m while the entity count still shows ERR; this is distinct from the count returning to 0 at frame 1192.", "basis": "Blueprint timing confirmed by V4.2 source-frame inspection, frames 1142 and 1143"},
        {"id": "entity-zero", "time": 1192 / 60, "frame": 1192, "label": "Detector returns to 0", "detail": "The entity count changes from ERR at frame 1191 to 0 at frame 1192, after glitching during the approach. Range already reads 0.00 m.", "basis": "V4.2 direct source-frame inspection, frames 1191 and 1192"},
        {"id": "convergence", "time": 19.91, "label": "Convergence", "detail": "The sixth hit; correlation rises to 0.767–0.805 in the adjacent 250 ms windows.", "basis": "blueprint 10 ms onset analysis; 250 ms stereo profile"},
        {"id": "silence", "time": 20.15, "end": 20.4, "label": "Pre-reveal silence", "detail": "The original quarter-second silence; the coarser 250 ms bins also include neighboring sound.", "basis": "blueprint fine-window analysis"},
        {"id": "tutorial", "time": 20.45, "end": 21.85, "label": "Tutorial audio", "detail": "Audio pre-laps the picture cut by 0.30 s; approximately 20 dB right-weighted, awaiting owner intent review.", "basis": "blueprint fine-window analysis; 250 ms stereo profile"},
        {"id": "reveal", "time": 20.75, "frame": 1245, "label": "Tutorial reveal", "detail": "Hard picture cut to the fictional tutorial.", "basis": "blueprint frame inspection"},
    ]
    boundaries = [0, 4, 6.8, 9.8, 15, 17, 20.017, 20.75, 22]
    names = ["Hall", "Build log", "Discovery", "First surge", "Shutdown", "No response", "Discoverable: everyone", "Tutorial"]
    document = {
        "schemaVersion": 1,
        "film": {"duration": 22, "fps": 60, "frames": 1320, "width": 1280, "height": 720,
                 "sourceCount": 240, "version": "V4.2 review", "sha256": EXPECTED_SHA,
                 "streams": {"video": VIDEO_SHA, "audio": AUDIO_SHA}},
        "provenance": {
            "profile": {"fileName": args.profile.name, "sha256": sha256(args.profile), "windowSeconds": 0.25, "windowCount": 88},
            "measurementScript": {"fileName": args.reference_script.name, "sha256": sha256(args.reference_script)},
            "blueprint": {"fileName": args.blueprint.name, "sha256": sha256(args.blueprint)},
            "generator": "tools/dead-channel/measure_master.py",
            "basis": "Supplied V4.1 audio measurements retained after V4.2 AAC/decoded-PCM identity and all 88 independently decoded bins were verified. V4.2 picture events use direct source-frame inspection. Source count is a supplied production fact, not a recovered event map.",
            "referenceFilm": {"version": "V4.1 picture lock", "sha256": "3c997931dec814fa37aa19b926fcda9862987d3ce7f52f70603586b68185ba35", "audioSha256": AUDIO_SHA},
            "pictureRevision": {"version": "V4.2 review", "sha256": EXPECTED_SHA,
                                "frameNumbering": "Zero-based source frames at 60 fps",
                                "basis": "Owner-supplied detector correction, independently inspected in V4.2 source frames",
                                "glitchSamples": [{"frame": 408, "readout": "--"}, {"frame": 480, "readout": "ERR"}, {"frame": 900, "readout": "ERR"}, {"frame": 960, "readout": "--"}, {"frame": 1191, "readout": "ERR"}],
                                "rangeZero": {"frame": 1143, "readout": "0.00 m", "entityReadout": "ERR"},
                                "entityCountReturn": {"previousFrame": 1191, "previousReadout": "ERR", "frame": 1192, "readout": "0"}},
            "eventMap": None,
            "balanceConvention": "rmsL minus rmsR, dB; positive is left-weighted",
            "missingCorrelation": "null means undefined; never zero-filled or interpolated",
        },
        "windows": windows,
        "events": events,
        "segments": [{"t0": boundaries[i], "t1": boundaries[i + 1], "label": name} for i, name in enumerate(names)],
        "measurements": {
            "discovery": {"t0": 7.25, "t1": 8.5, "correlationFrom": 0.431, "correlationTo": 0.159},
            "surge": {"time": 9.79, "pictureTime": 9.8, "leftRiseDb": 11.4, "rightRiseDb": 7.3},
            "flanks": {"right": {"t0": 13.25, "t1": 13.5, "advantageDb": 5.76}, "left": {"t0": 14.25, "t1": 14.5, "advantageDb": 3.81}},
            "detectorGlitch": {"time": 15, "frame": 900, "sampledFrame": True, "onsetClaimed": False, "readout": "ERR", "otherSample": {"time": 16, "frame": 960, "readout": "--"}},
            "rangeZero": {"time": 19.05, "frame": 1143},
            "entityZero": {"time": 1192 / 60, "frame": 1192, "previousFrame": 1191, "previousReadout": "ERR", "readout": "0"},
            "convergence": {"time": 19.91, "correlationMin": 0.767, "correlationMax": 0.805, "windowT0": 19.75, "windowT1": 20.25, "hitTimes": [16.99, 17.62, 18.2, 18.73, 19.48, 19.91]},
            "silence": {"t0": 20.15, "t1": 20.4},
            "tutorial": {"t0": 20.45, "t1": 21.85, "pictureCut": 20.75, "rightBiasDb": 20, "artisticIntent": "pending owner review"},
            "loudness": {"integratedLufs": -21.1, "rangeLu": 9.8, "truePeakDbtp": -1.9, "basis": "blueprint EBU R128 analysis"},
        },
    }
    serialized = json.dumps(document, indent=2, ensure_ascii=False, allow_nan=False) + "\n"
    film_serialized = json.dumps(document["film"], indent=2, ensure_ascii=False, allow_nan=False) + "\n"
    if args.check:
        if args.output.read_text() != serialized or args.film_output.read_text() != film_serialized:
            raise SystemExit("Generated signal data differs; regenerate with the same inputs")
        print("Signal data is deterministic and matches the supplied sources.")
    else:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(serialized)
        args.film_output.parent.mkdir(parents=True, exist_ok=True)
        args.film_output.write_text(film_serialized)
        print(f"Wrote {args.output}: {len(windows)} measured windows; no source map.")


if __name__ == "__main__":
    main()
