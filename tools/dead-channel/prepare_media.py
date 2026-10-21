#!/usr/bin/env python3
"""Prepare ignored, private review assets without modifying/remuxing the locked film."""
import argparse
from pathlib import Path
import shutil
import subprocess
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
from measure_master import ROOT, EXPECTED_SHA, sha256


def ffmpeg(source, target, *options):
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-i", str(source),
                    *options, str(target)], check=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, required=True, help="Privately staged V4.2 master")
    parser.add_argument("--output-dir", type=Path, default=ROOT / "public/media/dead-channel")
    parser.add_argument("--font", type=Path, default=Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
    args = parser.parse_args()
    source, target = args.input.resolve(), args.output_dir.resolve()
    if sha256(source) != EXPECTED_SHA:
        raise SystemExit("Master SHA-256 does not match the supplied V4.2 review")
    if source == target or source.parent == target:
        raise SystemExit("Use a distinct output directory; never write beside the archived master")
    ignored = subprocess.run(["git", "check-ignore", "-q", str(target / ".private-review")], cwd=ROOT)
    if ignored.returncode:
        raise SystemExit("Output directory must already be ignored by git before preparing private media")
    target.mkdir(parents=True, exist_ok=True)
    film = target / "film-22s-1280x720p60.mp4"
    # No remux/metadata rewrite: delivery authorization has not been granted.
    shutil.copyfile(source, film)
    if sha256(film) != EXPECTED_SHA:
        raise SystemExit("Private film copy is not byte-identical")
    poster_filter = "select=eq(n\\,594)"
    ffmpeg(source, target / "poster-1280.webp", "-vf", poster_filter,
           "-frames:v", "1", "-an", "-c:v", "libwebp", "-quality", "78")
    ffmpeg(source, target / "poster-1280.jpg", "-vf", poster_filter,
           "-frames:v", "1", "-an", "-q:v", "3")
    # End frame is exclusive: frames 408…898, 8.183333 s, no tutorial or audio.
    ffmpeg(source, target / "loop-8s-1280.mp4", "-vf", "trim=start_frame=408:end_frame=899,setpts=PTS-STARTPTS",
           "-an", "-c:v", "libx264", "-preset", "medium", "-crf", "28",
           "-pix_fmt", "yuv420p", "-color_primaries", "bt709", "-color_trc", "bt709",
           "-colorspace", "bt709", "-movflags", "+faststart", "-map_metadata", "-1")
    # Downscale the entire f1230 image to 1120×630; side padding preserves the framing.
    # Text is typeset in the derivative only, never burned into the locked film.
    filters = "select=eq(n\\,1230),scale=1120:630:flags=lanczos,pad=1200:630:40:0:color=0x030f0b"
    if args.font.is_file():
        escaped_font = str(args.font).replace("\\", "\\\\").replace(":", "\\:").replace("'", "\\'")
        filters += (",drawbox=x=0:y=474:w=1200:h=156:color=0x030f0b@0.86:t=fill"
                    f",drawtext=fontfile='{escaped_font}':text='DEAD CHANNEL':fontsize=48:fontcolor=0xb7d5b5:x=64:y=499"
                    f",drawtext=fontfile='{escaped_font}':text='0 detected. 240 present.':fontsize=23:fontcolor=0xe5e8e5:x=67:y=562")
    ffmpeg(source, target / "og-1200x630.jpg", "-vf", filters, "-frames:v", "1", "-an", "-q:v", "3")
    budgets = {"poster-1280.webp": 80_000, "loop-8s-1280.mp4": 1_500_000}
    for name, maximum in budgets.items():
        size = (target / name).stat().st_size
        if size > maximum:
            raise SystemExit(f"{name} exceeds budget: {size} > {maximum}")
    if sha256(source) != EXPECTED_SHA:
        raise SystemExit("Archived source changed during preparation")
    print("Private assets prepared; source SHA-256 unchanged. No publication approval exists.")
    subprocess.run(["python3", "-I", str(Path(__file__).with_name("verify_media.py")),
                    "--input", str(source), "--media-dir", str(target)], check=True)


if __name__ == "__main__":
    main()
