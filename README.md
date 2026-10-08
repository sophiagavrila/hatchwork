# hatchwork

**Patch is a tiny pixel creature that lives next to your GitHub Copilot CLI prompt and coaches you into being a better agentic engineer.**
Every install hatches a different one.

<p align="center">
  <img src="docs/media/hero.gif" width="336" alt="An egg wobbles, cracks, and Patch climbs out">
</p>

<p align="center">
  <img src="docs/media/lineup.png" alt="Every creature in the hatchery, side by side">
</p>

---

## Why Patch exists

Working with a coding agent is a skill. The people who get the most out of it:

| Habit | What it looks like | Who says it |
|---|---|---|
| **Specific prompts** | names the target, constraints, and what done looks like | Pon: *"say what it should become, not just what to change."* |
| **Verification** | runs the tests before trusting the diff | Rivet: *"looks right. run the tests before we call it done."* |
| **Context hygiene** | keeps sessions focused, leaves out what isn't needed | Thimble: *"that file is not needed here. leave it out."* |
| **Planning first** | splits work into steps before generating code | Fold: *"measure twice, fold once. what are the steps?"* |
| **Calibrated autonomy** | knows when to let the agent run and when to steer | Byte: *"scoped and reversible? let it run. otherwise, hold the leash."* |
| **Reading before merging** | reviews the whole diff, not the summary | Lumen: *"read the diff before you merge. all of it."* |
| **Recovery** | reads the error, changes one thing, retries | Axo: *"that failed. read the error, change one thing, run again."* |

Most of this is learned the slow way. Patch watches the session from a side pane and says one short thing at the right moment, instead of a wall of tips nobody reads.

```mermaid
flowchart LR
    A[You prompt Copilot CLI] --> B{Patch watches the session}
    B -- vague prompt --> C["🗨 'what does done look like?'"]
    B -- edit, no test run --> D["🗨 'did anything run?'"]
    B -- long sprawling session --> E["🗨 'time to compact?'"]
    B -- tests pass --> F[happy bounce]
    B -- agent working --> G[think]
    B -- idle --> H[sleep]
```

Each creature has moods (`idle`, `blink`, `talk`, `think`, `happy`, `sleep`, `fidget`) so it reacts to what's happening without a word.

## The hatch

On first run you get **one creature at random**. Every egg wobbles and cracks the same way, so you can't tell what's inside. Then each creature has **its own way out**.

```mermaid
flowchart LR
    I[install] --> E[🥚 shared egg: wobble, crack, hop] --> R{roll rarity} --> X[creature's own entrance] --> L[lives in your pane]
```

| Rarity | Chance | |
|---|---|---|
| ★ common | 55% | the everyday mentors |
| ★★ uncommon | 28% | specialists |
| ★★★ rare | 13% | deeper habits |
| ★★★★ legendary | 4% | the most elaborate hatches |

Each creature specializes in one habit, but all of them coach the whole set.

## The dex

<!-- count -->30<!-- /count --> creatures so far. Every GIF below is rendered from the creature's source file by `scripts/media.py`: shared egg, its own entrance, then a few seconds of its idle life.

<!-- dex:start -->
<table>
<tr><td><img src="docs/media/patch.gif" width="224" alt="Patch hatching"></td><td><b>#001 Patch</b><br><sub>felt plush cub</sub><br>★ common · 4.6%</td><td><b>Coaches:</b> An all-rounder mentor that nudges you on prompting, delegation, verification and context, one small habit at a time.<br><br><i>“say what done looks like before you start.”</i><br><br><sub><b>Hatch:</b> The teal patch on the egg peels open like a pocket, Patch climbs out, shakes off, and the patch ends up sewn on its belly.</sub></td></tr>
<tr><td><img src="docs/media/axo.gif" width="224" alt="Axo hatching"></td><td><b>#002 Axo</b><br><sub>pond axolotl sprite</sub><br>★★ uncommon · 3.1%</td><td><b>Coaches:</b> Iterating after failure: read the error, change one thing, retry smarter.<br><br><i>“that failed. read the error, change one thing, run again.”</i><br><br><sub><b>Hatch:</b> Water seeps from the crack and Axo floats out in a bubble that pops.</sub></td></tr>
<tr><td><img src="docs/media/rivet.gif" width="224" alt="Rivet hatching"></td><td><b>#003 Rivet</b><br><sub>riveted armadillo</sub><br>★ common · 4.6%</td><td><b>Coaches:</b> Verification and tests: run the suite, read the output, then say done.<br><br><i>“looks right. run the tests before we call it done.”</i><br><br><sub><b>Hatch:</b> An armored ball bursts out, rolls across, bounces back, wobbles, and pops open.</sub></td></tr>
<tr><td><img src="docs/media/thimble.gif" width="224" alt="Thimble hatching"></td><td><b>#004 Thimble</b><br><sub>thimble hermit crab</sub><br>★ common · 4.6%</td><td><b>Coaches:</b> Context hygiene: carry only what the task needs; drop the rest.<br><br><i>“that file is not needed here. leave it out.”</i><br><br><sub><b>Hatch:</b> The egg top pops off; a thimble inside sprouts claws and periscope eyes.</sub></td></tr>
<tr><td><img src="docs/media/sprig.gif" width="224" alt="Sprig hatching"></td><td><b>#005 Sprig</b><br><sub>acorn-capped pea sprite</sub><br>★ common · 4.6%</td><td><b>Coaches:</b> Decomposition: break the work into small steps and finish them in order.<br><br><i>“smaller step. do the first piece, then the next.”</i><br><br><sub><b>Hatch:</b> The egg sinks into soil; a sprout pokes up, grows, and Sprig pops out.</sub></td></tr>
<tr><td><img src="docs/media/scout.gif" width="224" alt="Scout hatching"></td><td><b>#006 Scout</b><br><sub>bandana puppy</sub><br>★ common · 4.6%</td><td><b>Coaches:</b> Research before acting: read the code and docs, then make the change.<br><br><i>“let me sniff around the codebase before we dig in.”</i><br><br><sub><b>Hatch:</b> The egg rocks on stubby paws, a tail wags out, and it bursts free wearing the shell as a hat.</sub></td></tr>
<tr><td><img src="docs/media/dotty.gif" width="224" alt="Dotty hatching"></td><td><b>#007 Dotty</b><br><sub>bug-hunting ladybug</sub><br>★ common · 4.6%</td><td><b>Coaches:</b> Debugging: reproduce the bug first, then fix it.<br><br><i>“let's make it happen again before we fix it.”</i><br><br><sub><b>Hatch:</b> The egg buzzes, pops its lid, and Dotty zips up on blurry wings before tucking them away.</sub></td></tr>
<tr><td><img src="docs/media/skein.gif" width="224" alt="Skein hatching"></td><td><b>#008 Skein</b><br><sub>yarn-wool sheep</sub><br>★ common · 4.6%</td><td><b>Coaches:</b> Long sessions: notice when context has tangled, summarize, and /compact before it knots.<br><br><i>“this thread is getting long. want to wind it up?”</i><br><br><sub><b>Hatch:</b> A strand of yarn unspools from the crack, the egg unravels into a ball, and the ball fluffs up into Skein.</sub></td></tr>
<tr><td><img src="docs/media/pon.gif" width="224" alt="Pon hatching"></td><td><b>#009 Pon</b><br><sub>leaf-cap tanuki</sub><br>★★ uncommon · 3.1%</td><td><b>Coaches:</b> Prompt specificity: name the target, the constraints, and what done looks like.<br><br><i>“say what it should become, not just what to change.”</i><br><br><sub><b>Hatch:</b> The egg vanishes in a puff of smoke, a leaf flutters down, and Pon is standing there mid-pose.</sub></td></tr>
<tr><td><img src="docs/media/wick.gif" width="224" alt="Wick hatching"></td><td><b>#010 Wick</b><br><sub>dusk moth</sub><br>★★ uncommon · 3.1%</td><td><b>Coaches:</b> Before building, look for the gaps: missing acceptance criteria, unstated edge cases, undefined done.<br><br><i>“something here is still unlit. what counts as done?”</i><br><br><sub><b>Hatch:</b> The crack glows like a lamp, the shell softens into a silk cocoon, and Wick unfolds its wings.</sub></td></tr>
<tr><td><img src="docs/media/lumen.gif" width="224" alt="Lumen hatching"></td><td><b>#011 Lumen</b><br><sub>lantern owl scholar</sub><br>★★★ rare · 2.2%</td><td><b>Coaches:</b> Reviewing diffs: read what the agent changed, line by line, before you merge.<br><br><i>“read the diff before you merge. all of it.”</i><br><br><sub><b>Hatch:</b> Night falls, the egg glows like a lantern, and its lid lifts as Lumen flaps out.</sub></td></tr>
<tr><td><img src="docs/media/fold.gif" width="224" alt="Fold hatching"></td><td><b>#012 Fold</b><br><sub>origami crane</sub><br>★★★ rare · 2.2%</td><td><b>Coaches:</b> Plans before cutting code: sketches the steps, names the creases (interfaces, edge cases, order of work), and only then lets you fold.<br><br><i>“measure twice, fold once. what are the steps?”</i><br><br><sub><b>Hatch:</b> The egg flattens into a square sheet, then folds step by step — square, triangle, kite, crane — each crease flashing as it lands.</sub></td></tr>
<tr><td><img src="docs/media/byte.gif" width="224" alt="Byte hatching"></td><td><b>#013 Byte</b><br><sub>glitch ghost</sub><br>★★★ rare · 2.2%</td><td><b>Coaches:</b> Calibrating autonomy: let the agent run on well-scoped, reversible work; keep a hand on it for anything risky or vague.<br><br><i>“scoped and reversible? let it run. otherwise, hold the leash.”</i><br><br><sub><b>Hatch:</b> The egg dissolves into static, scanlines sweep, and Byte snaps into focus as its colors converge.</sub></td></tr>
<tr><td><img src="docs/media/tsugi.gif" width="224" alt="Tsugi hatching"></td><td><b>#014 Tsugi</b><br><sub>kintsugi teacup spirit</sub><br>★★★★ legendary · 1.3%</td><td><b>Coaches:</b> Turns mistakes into lessons: asks what broke, what the fix taught you, and what to write down so the repair makes you stronger.<br><br><i>“that bug is a seam now. what did it teach you?”</i><br><br><sub><b>Hatch:</b> The egg shatters outward, the pieces hang in the air, drift back and reform as a teacup, gold traces every crack, steam rises, and Tsugi opens its eyes.</sub></td></tr>
<tr><td><img src="docs/media/mochi.gif" width="224" alt="Mochi hatching"></td><td><b>#015 Mochi</b><br><sub>loaf-shaped smoke cat</sub><br>★ common · 4.6%</td><td><b>Coaches:</b> Knowing when to stop: take a break, wrap up, start a fresh session.<br><br><i>“good place to stop. save it and start fresh.”</i><br><br><sub><b>Hatch:</b> The egg bottom becomes a little box; Mochi climbs in, turns once, and loafs.</sub></td></tr>
<tr><td><img src="docs/media/hush.gif" width="224" alt="Hush hatching"></td><td><b>#016 Hush</b><br><sub>big-eared fennec kit</sub><br>★ common · 4.6%</td><td><b>Coaches:</b> Asking clarifying questions: listen fully, confirm the goal, then act.<br><br><i>“before we start: what does done look like here?”</i><br><br><sub><b>Hatch:</b> Two huge ears poke out of the crack and listen; then the egg falls away.</sub></td></tr>
<tr><td><img src="docs/media/tock.gif" width="224" alt="Tock hatching"></td><td><b>#017 Tock</b><br><sub>pocket-watch snail</sub><br>★★ uncommon · 3.1%</td><td><b>Coaches:</b> Performance and patience: measure before you optimize, then measure again after.<br><br><i>“time it first. then we will know what is slow.”</i><br><br><sub><b>Hatch:</b> The egg cracks, rewinds itself whole, cracks again, rolls into a pocket watch, and Tock slides out.</sub></td></tr>
<tr><td><img src="docs/media/zip.gif" width="224" alt="Zip hatching"></td><td><b>#018 Zip</b><br><sub>hummingbird</sub><br>★★ uncommon · 3.1%</td><td><b>Coaches:</b> Tight feedback loops: make the smallest change, run it, look, and go again.<br><br><i>“small change. run it. again. faster.”</i><br><br><sub><b>Hatch:</b> Something green streaks past until the egg spins, then the top pops off and Zip is already hovering.</sub></td></tr>
<tr><td><img src="docs/media/vault.gif" width="224" alt="Vault hatching"></td><td><b>#019 Vault</b><br><sub>vault-door tortoise</sub><br>★★★ rare · 2.2%</td><td><b>Coaches:</b> Security habits: keep secrets out of prompts and logs, and grant agents the least privilege that works.<br><br><i>“scope the token down. it only needs read access.”</i><br><br><sub><b>Hatch:</b> A keyhole appears on the egg, a gold key turns with a click, and the shell swings open like a vault door.</sub></td></tr>
<tr><td><img src="docs/media/drift.gif" width="224" alt="Drift hatching"></td><td><b>#020 Drift</b><br><sub>aurora jellyfish</sub><br>★★★★ legendary · 1.3%</td><td><b>Coaches:</b> Orchestrating agents in parallel: split work into independent lanes, then gather and verify the results.<br><br><i>“these three tasks do not touch. send them out together.”</i><br><br><sub><b>Hatch:</b> The egg floats up, turns to aurora glass, dissolves into falling light, and Drift unfurls one tentacle at a time.</sub></td></tr>
<tr><td><img src="docs/media/moss.gif" width="224" alt="Moss hatching"></td><td><b>#021 Moss</b><br><sub>lamplit mole</sub><br>★ common · 4.6%</td><td><b>Coaches:</b> Root-causing: follow the logs and traces down to the first thing that went wrong, not the loudest.<br><br><i>“the error is loud. the cause is usually quieter.”</i><br><br><sub><b>Hatch:</b> The egg sinks into the dirt, a mound tunnels across, and Moss pops up with its lamp sweeping.</sub></td></tr>
<tr><td><img src="docs/media/quill.gif" width="224" alt="Quill hatching"></td><td><b>#022 Quill</b><br><sub>hedgehog scribe</sub><br>★★ uncommon · 3.1%</td><td><b>Coaches:</b> Commit messages and docs: say why the change exists, what it touches, and what the next reader needs.<br><br><i>“future you will read this. write it for them.”</i><br><br><sub><b>Hatch:</b> Ink letters scribble across the egg, a blot spreads, and it rolls into a spiny ball that unrolls with a flourish.</sub></td></tr>
<tr><td><img src="docs/media/kasa.gif" width="224" alt="Kasa hatching"></td><td><b>#023 Kasa</b><br><sub>one-eyed umbrella yokai</sub><br>★★ uncommon · 3.1%</td><td><b>Coaches:</b> Legacy code: read it and learn why it is shaped that way before you rewrite it.<br><br><i>“old code has reasons. read it before you replace it.”</i><br><br><sub><b>Hatch:</b> The egg sprouts a wooden foot, hops twice, and pops open into a paper umbrella that blinks its one big eye.</sub></td></tr>
<tr><td><img src="docs/media/yure.gif" width="224" alt="Yure hatching"></td><td><b>#024 Yure</b><br><sub>earthquake catfish (namazu)</sub><br>★★ uncommon · 3.1%</td><td><b>Coaches:</b> Blast radius: roll out in small steps behind flags, so one bad change cannot shake everything.<br><br><i>“ship it small, behind a flag. the ground stays calm.”</i><br><br><sub><b>Hatch:</b> The egg rattles in an earthquake, a catfish wriggles free, and the shrine keystone thunks down to calm it.</sub></td></tr>
<tr><td><img src="docs/media/tsuki.gif" width="224" alt="Tsuki hatching"></td><td><b>#025 Tsuki</b><br><sub>moon mochi rabbit</sub><br>★★ uncommon · 3.1%</td><td><b>Coaches:</b> Rhythm and cadence: small steady commits and a consistent edit-test loop beat marathon diffs.<br><br><i>“small commit, run the tests, repeat. steady beats fast.”</i><br><br><sub><b>Hatch:</b> The egg floats up and becomes the full moon, a rabbit pounds mochi on its face, then Tsuki hops down: pon, pon.</sub></td></tr>
<tr><td><img src="docs/media/don.gif" width="224" alt="Don hatching"></td><td><b>#026 Don</b><br><sub>thunder drum cloud</sub><br>★★★ rare · 2.2%</td><td><b>Coaches:</b> CI and alerts: when the drum sounds (a build breaks), stop and fix that first, then carry on.<br><br><i>“the drum sounded. fix the build, then we keep going.”</i><br><br><sub><b>Hatch:</b> Storm clouds gather, lightning splits the egg, and a small cloud catches its drums as they spin into place. DON.</sub></td></tr>
<tr><td><img src="docs/media/sara.gif" width="224" alt="Sara hatching"></td><td><b>#027 Sara</b><br><sub>dish-head kappa</sub><br>★ common · 4.6%</td><td><b>Coaches:</b> Context preservation: write handoffs and summaries so the next session starts full.<br><br><i>“write it down before the dish tips.”</i><br><br><sub><b>Hatch:</b> Rain fills the cracked eggshell like a dish, and Sara surfaces underneath wearing it.</sub></td></tr>
<tr><td><img src="docs/media/kuro.gif" width="224" alt="Kuro hatching"></td><td><b>#028 Kuro</b><br><sub>karasu-tengu fledgling</sub><br>★ common · 4.6%</td><td><b>Coaches:</b> Deliberate practice: try the small kata yourself first, then compare with the answer.<br><br><i>“do the kata yourself. then ask me.”</i><br><br><sub><b>Hatch:</b> A mountain gust spins the egg, feathers burst out, and Kuro drops from above, fan first.</sub></td></tr>
<tr><td><img src="docs/media/aun.gif" width="224" alt="Aun hatching"></td><td><b>#029 Aun</b><br><sub>komainu guardian pup</sub><br>★★★ rare · 2.2%</td><td><b>Coaches:</b> Guardrails: knowing what to approve, what to block, and when to say no to an unsafe action.<br><br><i>“read the command before you approve it.”</i><br><br><sub><b>Hatch:</b> The egg turns to stone, cracks like an old statue and flakes away, then two gold eyes open and Aun says "a"... "un".</sub></td></tr>
<tr><td><img src="docs/media/akari.gif" width="224" alt="Akari hatching"></td><td><b>#030 Akari</b><br><sub>inari foxfire kit</sub><br>★★★★ legendary · 1.3%</td><td><b>Coaches:</b> Weighing alternatives: lighting up two or three approaches side by side before committing to one.<br><br><i>“light two paths before you walk one.”</i><br><br><sub><b>Hatch:</b> Foxfire wisps circle the egg, a vermilion torii rises behind it, the shell melts into blue flame and Akari steps through as its three tails bloom one by one.</sub></td></tr>
</table>
<!-- dex:end -->

## Try it

No dependencies, no build.

```sh
open dex.html                    # the gallery: every sprite, mood, and entrance; hatch an egg
node cli.js pon                  # print a creature in your terminal (truecolor half-blocks)
node cli.js tsugi --entrance     # play a hatch in your terminal
node cli.js --all                # everyone, idle
node cli.js --check              # validate every creature (exit 1 on errors)
```

The dex has a **hatch an egg** button (weighted random, same odds as above), ★ to keep favorites, and `dex.html?only=<id>&sheet=1` for a review sheet with every sprite at 12× and every entrance frame at 5×.

## How the sprites are made

Each creature is pixel art drawn as strings, one character per pixel, in its own file under [`creatures/`](creatures).

```js
const idle = [
  '.........GG...........',
  '..oo..GGhhgGoo........',
  '.okkGghgggGokko.......',
  // ...
];
PatchDex.register({ id: 'pon', name: 'Pon', rarity: 'uncommon', palette: { o: '#3d1f1c', ... },
  sprites: { idle, blink, talk, happy, sleep, think, fidget }, entrance: k => [...k.eggIntro(), ...] });
```

In a terminal, every cell becomes a `▀` half-block with a truecolor foreground (top pixel) and background (bottom pixel), so a 22×20 sprite fits in 22 columns × 10 rows and pixels stay square. This is the same technique as `pokemon-colorscripts`.

```
 one terminal cell        ▀   fg = top pixel
 = two stacked pixels         bg = bottom pixel
```

Sprites are at most 22×20 pixels and are hand-placed, with outlines, top-left lighting and 3 to 4 shades per material. Entrances play on a 28×22 stage and always start with the shared egg (`k.eggIntro()`). The kit in [`core.js`](core.js) gives `k.at`, `k.over`, `k.egg`, `k.stamp`, `k.sparkle` and the egg's crack/shell pieces to build on.

### Add a creature

1. Copy [`creatures/_template.js`](creatures/_template.js) to `creatures/<id>.js` and add the id to [`roster.js`](roster.js).
2. Draw `idle` first; open `dex.html?only=<id>&sheet=1` (or `./scripts/shot.sh <id>` for a headless screenshot) and iterate until the silhouette reads at actual size.
3. Add moods and an entrance. `node cli.js --check` must pass.
4. `python3 scripts/media.py` regenerates the GIFs and this README's dex table.

Bar for new creatures: original (no Pokémon, Digimon or Claude Code buddy lookalikes), readable at 1×, every mood distinguishable at actual size, and an entrance that tells you who it is before it's fully out of the egg.

## Layout

```
core.js            renderer, shared egg, entrance kit, validation, rarity roll, ANSI output
dex.html           the gallery
cli.js             terminal renderer and validator
roster.js          creature order
creatures/         one file per creature
scripts/media.py   renders docs/media/* and the dex table above (needs Pillow)
scripts/dump.js    creatures → JSON for media.py
scripts/shot.sh    headless Chrome screenshot of a creature's review sheet
```

## Status

The hatchery (art, moods, entrances, rarity, gallery, terminal renderer) is working. Not here yet:

- the Copilot CLI integration that watches a session and picks moods and lines
- an installer that hatches on first run and remembers your creature

All 30 creatures in the roster are drawn: 14 originals, 8 from the second wave, and 8 drawn from Japanese folklore (kappa, karasu-tengu, kasa-obake, namazu, the moon rabbit, Raijin, komainu, and an Inari kitsune).
