#!/usr/bin/env python3
"""Compare a private V4.2 review with the preserved V4.1 backup, without editing either."""
import argparse
import json
from pathlib import Path
import subprocess
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
from measure_master import EXPECTED_SHA, AUDIO_SHA, ROOT, remeasure, sha256

V41_SHA = "3c997931dec814fa37aa19b926fcda9862987d3ce7f52f70603586b68185ba35"


def output(*args):
    return subprocess.run(args, check=True, capture_output=True).stdout


def audio_hash(path, copy):
    args = ["ffmpeg", "-v", "error", "-i", str(path), "-map", "0:a:0"]
    args += ["-c", "copy"] if copy else ["-acodec", "pcm_f32le"]
    return output(*args, "-f", "streamhash", "-hash", "sha256", "-").decode().strip().split("=")[-1]


def ending(path):
    # The original 75-frame tutorial ending starts at zero-based frame 1245.
    import numpy as np
    raw = output("ffmpeg", "-v", "error", "-i", str(path), "-vf",
                 "trim=start_frame=1245:end_frame=1320", "-fps_mode", "passthrough", "-an", "-pix_fmt", "rgb24", "-f", "rawvideo", "-")
    frames = np.frombuffer(raw, dtype=np.uint8).reshape(-1, 720, 1280, 3)
    assert len(frames) == 75, "The tutorial ending must remain 75 frames"
    return frames


def main():
    import numpy as np
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--baseline", type=Path, required=True)
    parser.add_argument("--baseline-signal", type=Path, required=True)
    parser.add_argument("--output", type=Path, default=ROOT / "tools/dead-channel/verification/revision-integrity.json")
    args = parser.parse_args()
    before = {"v41": sha256(args.baseline), "v42": sha256(args.input)}
    assert before == {"v41": V41_SHA, "v42": EXPECTED_SHA}, "Source identity differs"
    baseline_data = json.loads(args.baseline_signal.read_text())
    audio = {"elementaryStreamV41": audio_hash(args.baseline, True),
             "elementaryStreamV42": audio_hash(args.input, True),
             "decodedPcmV41": audio_hash(args.baseline, False),
             "decodedPcmV42": audio_hash(args.input, False)}
    assert audio["elementaryStreamV41"] == audio["elementaryStreamV42"] == AUDIO_SHA
    assert audio["decodedPcmV41"] == audio["decodedPcmV42"]
    repeated = remeasure(args.input)
    assert repeated == baseline_data["windows"], "New audio differs from the 88 original measurement bins"
    original, current = ending(args.baseline), ending(args.input)
    delta = original.astype(np.int16) - current.astype(np.int16)
    absolute = np.abs(delta)
    mse = float(np.mean(delta.astype(np.float32) ** 2))
    exact = int(sum(np.array_equal(a, b) for a, b in zip(original, current)))
    ending_record = {"startFrame": 1245, "endFrameExclusive": 1320, "framesCompared": 75,
                     "pixelIdenticalFrames": exact, "pixelIdentical": exact == 75,
                     "meanAbsoluteRgbDifference": round(float(absolute.mean()), 8),
                     "maximumAbsoluteRgbDifference": int(absolute.max()),
                     "rootMeanSquareRgbDifference": round(float(np.sqrt(mse)), 8),
                     "psnrDb": round(float(10 * np.log10(255 * 255 / mse)), 6) if mse else None,
                     "interpretation": ("All decoded ending frames are identical." if exact == 75 else
                                        "Ending was re-encoded in the supplied V4.2; decoded pixels differ. Inspect the ending for content continuity; do not claim pixel identity.")}
    assert {"v41": sha256(args.baseline), "v42": sha256(args.input)} == before
    report = {"status": "PRIVATE REVIEW ONLY — NO PUBLIC RELEASE APPROVAL",
              "sources": {"v41": {"sha256": before["v41"], "bytes": args.baseline.stat().st_size},
                          "v42": {"sha256": before["v42"], "bytes": args.input.stat().st_size}, "unchanged": True},
              "audio": {**audio, "elementaryStreamIdentical": True, "decodedPcmIdentical": True,
                        "measurementWindowsVerified": len(repeated), "measurementWindowsUnchanged": True},
              "ending": ending_record}
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2, ensure_ascii=False, allow_nan=False) + "\n")
    assert exact == 75, "The supplied revision must preserve every decoded tutorial-ending frame"
    print(json.dumps(report, indent=2, ensure_ascii=False, allow_nan=False))


if __name__ == "__main__":
    main()
