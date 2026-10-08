#!/usr/bin/env python3
"""Render README media from the real creature files.

    python3 scripts/media.py

Writes docs/media/<id>.gif (egg + entrance + a few idle beats), docs/media/<id>.png (idle),
docs/media/<id>-2.png / <id>-3.png (later forms), docs/media/<id>-evolve.gif (every evolution),
docs/media/lineup.png, docs/media/evolutions.png, docs/media/hero.gif, and regenerates the dex
table in README.md between the <!-- dex:start --> and <!-- dex:end --> markers.
"""

from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MEDIA = ROOT / "docs" / "media"
BG = "#17150f"
STARS = {"common": "★", "uncommon": "★★", "rare": "★★★", "legendary": "★★★★"}


def rgb(hex_: str) -> tuple[int, int, int]:
    n = int(hex_.lstrip("#"), 16)
    return (n >> 16) & 255, (n >> 8) & 255, n & 255


def paletted(
    grids: list[list[str]],
    pal: dict[str, str] | list[dict[str, str]],
    w: int,
    h: int,
    z: int,
    bg: str | None,
):
    """Build exact-color P-mode frames (no dithering, one shared palette).

    `pal` is one palette for every frame, or a list with one palette per frame."""
    pals = pal if isinstance(pal, list) else [pal] * len(grids)
    colors = [rgb(bg or "#000000")] + sorted({rgb(v) for p in pals for v in p.values()})
    index = {c: i for i, c in enumerate(colors)}
    flat = [v for c in colors for v in c] + [0] * (768 - 3 * len(colors))
    out = []
    for g, pal in zip(grids, pals):
        im = Image.new("P", (w * z, h * z), 0)
        im.putpalette(flat)
        px = im.load()
        ox, oy = (w - len(g[0])) // 2, h - len(g)
        for y, row in enumerate(g):
            for x, ch in enumerate(row):
                if ch == ".":
                    continue
                i = index[rgb(pal.get(ch, "#ff00ff"))]
                for dy in range(z):
                    for dx in range(z):
                        px[(ox + x) * z + dx, (oy + y) * z + dy] = i
        if bg is None:
            im.info["transparency"] = 0
        out.append(im)
    return out


def save_gif(path: Path, frames, durations):
    frames[0].save(
        path,
        save_all=True,
        append_images=frames[1:],
        duration=durations,
        loop=0,
        disposal=1,
        optimize=False,
    )


def coda(c, W, H):
    """A few idle beats after the entrance, so the loop shows the creature living."""
    s = c["sprites"]
    seq = [
        ("idle", 900),
        ("blink", 120),
        ("idle", 700),
        ("happy", 450),
        ("happy2" if "happy2" in s else "happy", 450),
        ("idle", 600),
        ("fidget" if "fidget" in s else "idle", 600),
        ("idle", 1400),
    ]
    return [(s[n], ms) for n, ms in seq]


def evo_line(c) -> str:
    """Thumbnails and names for the creature's evolution line, if it has one."""
    if len(c["forms"]) < 2:
        return ""
    imgs = " → ".join(
        f'<img src="docs/media/{c["id"]}{"" if f["stage"] == 1 else "-" + str(f["stage"])}.png" '
        f'height="40" alt="{f["name"]}"> {f["name"]}'
        for f in c["forms"]
    )
    return f"<br><br><sub><b>Evolves:</b></sub><br>{imgs}"


def main() -> None:
    data = json.loads(
        subprocess.check_output(["node", str(ROOT / "scripts" / "dump.js")])
    )
    W, H, cs = data["W"], data["H"], data["creatures"]
    MEDIA.mkdir(parents=True, exist_ok=True)

    for c in cs:
        grids = [f["g"] for f in c["frames"]] + [g for g, _ in coda(c, W, H)]
        ms = [max(20, f["ms"]) for f in c["frames"]] + [m for _, m in coda(c, W, H)]
        save_gif(
            MEDIA / f"{c['id']}.gif", paletted(grids, c["palette"], W, H, 8, BG), ms
        )
        idle = c["sprites"]["idle"]
        paletted([idle], c["palette"], len(idle[0]), len(idle), 8, None)[0].save(
            MEDIA / f"{c['id']}.png"
        )
        if c["id"] == "patch":
            save_gif(
                MEDIA / "hero.gif", paletted(grids, c["palette"], W, H, 12, BG), ms
            )
        for f in c["forms"][1:]:
            idle = f["sprites"]["idle"]
            paletted([idle], f["palette"], len(idle[0]), len(idle), 8, None)[0].save(
                MEDIA / f"{c['id']}-{f['stage']}.png"
            )
        if c["evolutions"]:
            ev = [x for e in c["evolutions"] for x in e]
            save_gif(
                MEDIA / f"{c['id']}-evolve.gif",
                paletted(
                    [x["g"] for x in ev], [x["pal"] for x in ev], W, H, 8, BG
                ),
                [max(20, x["ms"]) for x in ev],
            )

    # Lineup: every idle sprite, bottom-aligned in equal cells.
    cw, ch, z, per = 24, 22, 5, 10
    rows = (len(cs) + per - 1) // per
    n = min(per, len(cs))
    sheet = Image.new(
        "RGB", (n * cw * z + 2 * z * 2, rows * ch * z + 2 * z * 2), rgb(BG)
    )
    for i, c in enumerate(cs):
        idle = c["sprites"]["idle"]
        tile = paletted([idle], c["palette"], cw, ch, z, None)[0].convert("RGBA")
        x, y = 2 * z + (i % per) * cw * z, 2 * z + (i // per) * ch * z
        sheet.paste(tile, (x, y), tile)
    sheet.save(MEDIA / "lineup.png")

    # Evolution chart: each creature's line, three creatures per row.
    cw, ch, z, per = 30, 24, 4, 3
    evolved = [c for c in cs if len(c["forms"]) > 1]
    if evolved:
        rows = (len(evolved) + per - 1) // per
        gap = 2 * cw * z // 3
        width = per * 3 * cw * z + (per - 1) * gap + 4 * z
        chart = Image.new("RGB", (width, rows * ch * z + 4 * z), rgb(BG))
        for i, c in enumerate(evolved):
            for j, f in enumerate(c["forms"]):
                idle = f["sprites"]["idle"]
                tile = paletted([idle], f["palette"], cw, ch, z, None)[0].convert("RGBA")
                x = 2 * z + (i % per) * (3 * cw * z + gap) + j * cw * z
                y = 2 * z + (i // per) * ch * z
                chart.paste(tile, (x, y), tile)
        chart.save(MEDIA / "evolutions.png")

    # Dex table in README.
    cells = []
    for i, c in enumerate(cs, 1):
        cells.append(
            f'<tr><td><img src="docs/media/{c["id"]}.gif" width="224" alt="{c["name"]} hatching"></td>'
            f"<td><b>#{i:03d} {c['name']}</b><br><sub>{c['species']}</sub><br>"
            f"{STARS[c['rarity']]} {c['rarity']} · {c['odds'] * 100:.1f}%<br>"
            f"<sub>specialty: {c['habit']}</sub></td>"
            f"<td><b>Coaches:</b> {c['coaching']}<br><br><i>“{c['voice']}”</i><br><br>"
            f"<sub><b>Hatch:</b> {c['hatch']}</sub>{evo_line(c)}</td></tr>"
        )
    table = "<table>\n" + "\n".join(cells) + "\n</table>"
    readme = ROOT / "README.md"
    if readme.exists():
        text = readme.read_text()
        text = re.sub(
            r"(<!-- dex:start -->).*?(<!-- dex:end -->)",
            lambda m: f"{m.group(1)}\n{table}\n{m.group(2)}",
            text,
            flags=re.S,
        )
        text = re.sub(
            r"(<!-- count -->)\d+(<!-- /count -->)", rf"\g<1>{len(cs)}\g<2>", text
        )
        readme.write_text(text)
    print(f"rendered {len(cs)} creatures → {MEDIA.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
