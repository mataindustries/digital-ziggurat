#!/usr/bin/env bash
set -euo pipefail
python3 -I "$(dirname "$0")/prepare_media.py" "$@"
