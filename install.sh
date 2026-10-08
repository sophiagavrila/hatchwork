#!/usr/bin/env bash
# Install hatchwork and meet Sojo, who hands you your first Patchling egg.
#
#   ./install.sh                 from a clone
#   HATCHWORK_REF=<branch> ...   install a branch instead of the default
#   HATCHWORK_APP=<dir>          where to keep the app (default ~/.hatchwork/app)
#
# Extra arguments go to sensei.js (--dry-run, --reroll, --fast, --ailment "...").
set -euo pipefail

REPO="${HATCHWORK_REPO:-sophiagavrila/hatchwork}"
APP="${HATCHWORK_APP:-$HOME/.hatchwork/app}"
REF="${HATCHWORK_REF:-}"
say() { printf '  %s\n' "$*"; }

command -v node >/dev/null || { echo "hatchwork needs Node 18 or newer: https://nodejs.org" >&2; exit 1; }
major="$(node -p 'process.versions.node.split(".")[0]')"
[ "$major" -ge 18 ] || { echo "hatchwork needs Node 18 or newer (found $(node -v))." >&2; exit 1; }

# Run from a clone if we are in one; otherwise clone (or update) into $APP.
here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -f "$here/sensei.js" ] && [ -f "$here/core.js" ]; then
  APP="$here"
elif [ -d "$APP/.git" ]; then
  say "updating $APP"
  git -C "$APP" pull --ff-only --quiet
else
  say "cloning $REPO into $APP"
  mkdir -p "$(dirname "$APP")"
  if command -v gh >/dev/null && gh auth status >/dev/null 2>&1; then
    gh repo clone "$REPO" "$APP" -- --quiet
  else
    git clone --quiet "https://github.com/$REPO.git" "$APP"
  fi
fi
if [ -n "$REF" ]; then
  git -C "$APP" fetch --quiet origin "$REF"
  git -C "$APP" checkout --quiet "$REF"
fi

node "$APP/cli.js" --check >/dev/null || { echo "hatchwork failed its self-check: node $APP/cli.js --check" >&2; exit 1; }
say "hatchwork is installed at $APP"

# The ceremony needs a real terminal. Agents (no TTY) open it in a tmux popup or a new
# terminal window and wait for the hatch; humans get it right here.
if [ -t 0 ] && [ -t 1 ]; then
  exec node "$APP/sensei.js" "$@"
else
  exec node "$APP/sensei.js" --launch --wait "$@"
fi
