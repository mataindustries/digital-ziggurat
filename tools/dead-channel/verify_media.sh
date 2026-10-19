#!/usr/bin/env bash
set -euo pipefail
python3 -I "$(dirname "$0")/verify_media.py" "$@"
