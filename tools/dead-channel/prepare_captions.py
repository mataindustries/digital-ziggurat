#!/usr/bin/env python3
"""Create an ignored authoring scaffold; never generate or invent public captions."""
import argparse
import json
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[2]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / "work/dead-channel-private/caption-authoring.json")
    args = parser.parse_args()
    target = args.output.resolve()
    ignored = subprocess.run(["git", "check-ignore", "-q", str(target)], cwd=ROOT)
    if ignored.returncode or target.is_relative_to(ROOT / "public"):
        raise SystemExit("Caption drafts must be ignored and outside public/")
    if target.exists():
        raise SystemExit("Existing authoring notes preserved; choose another output path")
    signal = json.loads((ROOT / "src/data/deadChannelSignal.json").read_text())
    template = {
        "status": "PRIVATE AUTHORING SCAFFOLD — NOT CAPTIONS",
        "masterSha256": signal["film"]["sha256"],
        "required": ["Owner-written descriptive sound cues", "Owner-approved verbatim spoken tutorial line", "Screen transcript checked against locked frames", "Owner review of right-weighted tutorial audio"],
        "soundCueCandidates": [{"event": event["id"], "from": event["time"],
                                "to": event.get("end"), "authorText": None,
                                "timingBasis": event["basis"]}
                               for event in signal["events"]],
        "tutorial": {"from": 20.45, "to": 21.85, "verbatimSpokenText": None,
                     "note": "On-screen tutorial title is not a verified transcript of speech."},
        "review": {"transcriptionApproved": False, "descriptionsApproved": False,
                   "stereoIntentApproved": False, "approvedBy": None},
    }
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(template, indent=2, ensure_ascii=False) + "\n")
    print(f"Created private caption authoring scaffold: {target}")
    print("No VTT generated; no dialogue or descriptive sound text invented.")


if __name__ == "__main__":
    main()
