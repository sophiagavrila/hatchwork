#!/bin/bash
# Screenshot one creature's review sheet: ./shot.sh <id> [out.png]
DIR="$(cd "$(dirname "$0")" && pwd)"
id="$1"; out="${2:-/tmp/patch-$id.png}"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1500,${HEIGHT:-2000} --virtual-time-budget=2500 --screenshot="$out" \
  "file://$DIR/../dex.html?only=$id&sheet=1" >/dev/null 2>&1
echo "$out"
