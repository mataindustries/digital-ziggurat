#!/usr/bin/env python3
"""Verify the private master/copy, elementary streams, frame count, derivatives and mix."""
import argparse
import json
from pathlib import Path
import re
import subprocess
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
from measure_master import ROOT, EXPECTED_SHA, VIDEO_SHA, AUDIO_SHA, sha256


def command(*args):
    return subprocess.run(args, check=True, capture_output=True, text=True)


def probe(path):
    data = json.loads(command("ffprobe", "-v", "error", "-count_frames", "-show_streams",
                              "-show_format", "-of", "json", str(path)).stdout)
    data["format"].pop("filename", None)  # Do not expose private staging paths in logs.
    return data


def streamhash(path):
    output = command("ffmpeg", "-v", "error", "-i", str(path), "-map", "0", "-c", "copy",
                     "-f", "streamhash", "-hash", "sha256", "-").stdout
    hashes = dict(("video" if kind == "v" else "audio", digest.lower())
                  for kind, digest in re.findall(r"\d+,([va]),SHA256=([a-fA-F0-9]{64})", output))
    if hashes != {"video": VIDEO_SHA, "audio": AUDIO_SHA}:
        raise SystemExit(f"Locked elementary-stream hashes differ: {hashes}")
    return hashes


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, required=True)
    parser.add_argument("--media-dir", type=Path, default=ROOT / "public/media/dead-channel")
    parser.add_argument("--log-dir", type=Path, default=ROOT / "tools/dead-channel/verification")
    args = parser.parse_args()
    film = args.media_dir / "film-22s-1280x720p60.mp4"
    if sha256(args.input) != EXPECTED_SHA or sha256(film) != EXPECTED_SHA:
        raise SystemExit("Master or private film copy is not byte-identical to the supplied V4.2 review")
    streams = streamhash(args.input)
    streamhash(film)
    master_probe = probe(args.input)
    video = next(stream for stream in master_probe["streams"] if stream["codec_type"] == "video")
    audio = next(stream for stream in master_probe["streams"] if stream["codec_type"] == "audio")
    assert (video["width"], video["height"], video["r_frame_rate"], int(video["nb_read_frames"])) == (1280, 720, "60/1", 1320)
    assert float(master_probe["format"]["duration"]) == 22
    assert audio["channels"] == 2 and audio["sample_rate"] == "44100"
    assets = []
    for path in sorted(args.media_dir.iterdir()):
        if path.is_file():
            record = {"file": path.name, "bytes": path.stat().st_size, "sha256": sha256(path)}
            if path.suffix in (".mp4", ".webp", ".jpg"):
                metadata = probe(path)
                record["streams"] = [{key: stream[key] for key in ("codec_type", "codec_name", "width", "height", "r_frame_rate", "nb_read_frames") if key in stream}
                                     for stream in metadata["streams"]]
                if "duration" in metadata["format"]:
                    record["duration"] = float(metadata["format"]["duration"])
            assets.append(record)
    by_name = {record["file"]: record for record in assets}
    assert by_name["poster-1280.webp"]["bytes"] <= 80_000
    assert by_name["loop-8s-1280.mp4"]["bytes"] <= 1_500_000
    loop = by_name["loop-8s-1280.mp4"]
    assert len(loop["streams"]) == 1 and loop["streams"][0]["codec_type"] == "video"
    assert int(loop["streams"][0]["nb_read_frames"]) == 491
    assert by_name["og-1200x630.jpg"]["streams"][0]["width"] == 1200
    assert by_name["og-1200x630.jpg"]["streams"][0]["height"] == 630
    loudness_output = command("ffmpeg", "-hide_banner", "-i", str(args.input), "-af", "ebur128=peak=true", "-f", "null", "-").stderr
    # Keep only the summary, without command logs or private input paths.
    loudness_summary = loudness_output[loudness_output.rfind("Summary:"):].strip()
    loudness_summary = loudness_summary.split("\n[out#")[0].split("\nframe=")[0].strip()
    assert "I:         -21.1 LUFS" in loudness_summary
    assert sha256(args.input) == EXPECTED_SHA
    report = {
        "status": "PRIVATE REVIEW ONLY — NO PUBLIC RELEASE APPROVAL",
        "master": {"file": "DEAD_CHANNEL_V4_2_REVIEW.mp4", "bytes": args.input.stat().st_size,
                   "sha256Before": EXPECTED_SHA, "sha256After": sha256(args.input), "unchanged": True,
                   "streams": streams},
        "filmCopy": {"file": film.name, "byteIdenticalToMaster": True,
                     "containerRewrite": False, "metadataRewrite": False},
        "derivations": {"poster": {"frame": 594}, "loop": {"startFrame": 408, "endFrameExclusive": 899, "audio": False},
                        "openGraph": {"frame": 1230, "pictureScale": [1120, 630], "canvas": [1200, 630], "upscaled": False}},
        "assets": assets,
        "releaseBlockers": ["Explicit owner public-film release approval", "Owner-approved verbatim tutorial transcript and descriptive captions", "Owner review of approximately 20 dB right-weighted tutorial audio", "Final credits and publication date"],
        "deferred": ["Transmission Room: original EVENT_MAP.json unavailable", "Teaser", "Behind-the-scenes film", "Map poster"],
    }
    args.log_dir.mkdir(parents=True, exist_ok=True)
    (args.log_dir / "media-integrity.json").write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n")
    (args.log_dir / "master-ffprobe.json").write_text(json.dumps(master_probe, indent=2, ensure_ascii=False) + "\n")
    (args.log_dir / "master-streamhash.txt").write_text(f"video SHA256={streams['video']}\naudio SHA256={streams['audio']}\n")
    (args.log_dir / "master-r128.txt").write_text(loudness_summary + "\n")
    for record in assets:
        print(f"{record['file']}: {record['bytes']} bytes · SHA256 {record['sha256']}")
    print("Verified immutable original, exact private film copy, streams, 1,320 frames, budgets, silent loop, and R128 mix.")


if __name__ == "__main__":
    main()
