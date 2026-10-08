#!/usr/bin/env node
// Meet Sōjōbō. The first-run ceremony: the tengu king of Mount Kurama appears in smoke at the
// night gate, asks what ails your work with agents, reads it, and hands you the egg of the
// Patchling that coaches exactly that. The egg hatches on the spot.
//
//   node sensei.js                      the full ceremony (needs a real terminal, 96x31 or larger)
//   node sensei.js --launch [--wait]    open the ceremony in a tmux popup or a new terminal window
//                                       (what an agent runs; --wait blocks until the egg hatches)
//   node sensei.js --ailment "text"     answer ahead of time (also --ailment-file <path>, or - for stdin)
//   node sensei.js --plain | --json     no animation: print the reading (for agents and pipes)
//   node sensei.js --result             show the Patchling you were given
//   --dry-run   don't save   --reroll   replace an existing Patchling   --fast   hurry the old man
//
// State goes to ~/.hatchwork/state.json (HATCHWORK_HOME overrides), the same file patch.js reads.
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync, spawn } = require('child_process');

const ROOT = __dirname;
const HOME = process.env.HATCHWORK_HOME || path.join(os.homedir(), '.hatchwork');
const STATE = path.join(HOME, 'state.json');

function loadDex() {
  if (fs.existsSync(path.join(ROOT, 'load.js'))) return require('./load.js')({ quiet: true });
  globalThis.window = globalThis;
  const D = require('./core.js');
  require('./roster.js');
  for (const id of window.PATCH_ROSTER) { try { require(path.join(ROOT, 'creatures', id + '.js')); } catch { /* undrawn */ } }
  return D;
}

const ORACLE = require('./sensei/oracle.js');

// ---- small helpers --------------------------------------------------------------------------------
const rgb = h => { const n = parseInt(h.slice(1), 16); return `${(n >> 16) & 255};${(n >> 8) & 255};${n & 255}`; };
const fg = h => `\x1b[38;2;${rgb(h)}m`, bg = h => `\x1b[48;2;${rgb(h)}m`;
const RST = '\x1b[0m', BOLD = '\x1b[1m', ITAL = '\x1b[3m', DIM = '\x1b[2m';
const cap = s => (s ? s[0].toUpperCase() + s.slice(1) : s);
const wide = cp => (cp >= 0x1100 && cp <= 0x115f) || (cp >= 0x2e80 && cp <= 0xa4cf) || (cp >= 0xac00 && cp <= 0xd7a3) || (cp >= 0xf900 && cp <= 0xfaff) || (cp >= 0xfe30 && cp <= 0xfe4f) || (cp >= 0xff00 && cp <= 0xff60) || (cp >= 0xffe0 && cp <= 0xffe6) || (cp >= 0x1f300 && cp <= 0x1faff);
const width = s => { let w = 0; for (const ch of s) w += wide(ch.codePointAt(0)) ? 2 : 1; return w; };
const clip = (s, n) => { let w = 0, o = ''; for (const ch of s) { const cw = wide(ch.codePointAt(0)) ? 2 : 1; if (w + cw > n) break; o += ch; w += cw; } return o; };
const pad = (s, n) => s + ' '.repeat(Math.max(0, n - width(s)));
function wrap(text, n) {
  const out = [];
  for (const para of String(text).split('\n')) {
    let line = '';
    for (let word of para.split(/ +/)) {
      while (width(word) > n) { if (line) { out.push(line); line = ''; } out.push(clip(word, n)); word = word.slice(clip(word, n).length); }
      if (!line) line = word; else if (width(line) + 1 + width(word) <= n) line += ' ' + word; else { out.push(line); line = word; }
    }
    out.push(line);
  }
  return out;
}
const AURA = {
  prompting: '#ffd25a', planning: '#7fd1ff', research: '#9be27a', autonomy: '#ff8a5c', verification: '#6ef0c8',
  review: '#c9a2ff', recovery: '#ff6f91', context: '#8fb6ff', craft: '#ffe39a',
};

// ---- state ---------------------------------------------------------------------------------------
const readState = () => { try { return JSON.parse(fs.readFileSync(STATE, 'utf8')); } catch { return null; } };
function save(r) {
  const prev = readState();
  const state = {
    id: r.creature.id, hatchedAt: new Date().toISOString(), stage: 0,
    sensei: { ailment: r.text.slice(0, 2000), path: r.path, way: r.way, quote: r.quote, lesson: r.lesson, ranked: r.ranked },
  };
  if (prev && prev.id) state.previous = { id: prev.id, hatchedAt: prev.hatchedAt };
  fs.mkdirSync(HOME, { recursive: true });
  fs.writeFileSync(STATE, JSON.stringify(state, null, 1));
  return state;
}

// ---- the summary left on the normal screen ---------------------------------------------------------
function summary(D, r, { color = true, saved = true } = {}) {
  const c = r.creature, k = D.kit(c), P = r.proverb, L = [];
  const g = s => (color ? fg('#f0c75e') + s + RST : s), b = s => (color ? BOLD + s + RST : s), d = s => (color ? DIM + s + RST : s);
  if (color) L.push(D.toAnsi(k.at('idle'), D.paletteOf(c)));
  L.push(`${b(c.name)} ${d('·')} ${c.species} ${d('·')} ${c.rarity} ${d('·')} specialty: ${r.path}`);
  L.push(d(c.blurb || ''));
  L.push(`  “${c.voice}”`);
  L.push('');
  L.push(`${g("Sōjōbō's reading")}  ${r.way}`);
  L.push(`  ${P.kanji}  ${d(P.romaji)}: ${P.gloss}`);
  if (r.quote) L.push(`  ${d('you said:')} "${r.quote}"`);
  L.push(`  ${d('first lesson:')} ${r.lesson}`);
  L.push('');
  if (saved) L.push(`Saved to ${STATE.replace(os.homedir(), '~')}. ${fs.existsSync(path.join(ROOT, 'patch.js')) ? `Run ${b('node ' + path.join(ROOT, 'patch.js').replace(os.homedir(), '~'))} after a few sessions to see it grow.` : ''}`);
  else L.push(d('Dry run: nothing saved.'));
  return L.join('\n');
}

// ---- input gathering for the non-animated paths -------------------------------------------------------
function ailmentArg(args) {
  const i = args.indexOf('--ailment'), j = args.indexOf('--ailment-file');
  if (i >= 0) { const v = args[i + 1]; if (v === '-') return fs.readFileSync(0, 'utf8'); return v || ''; }
  if (j >= 0) return fs.readFileSync(args[j + 1], 'utf8');
  return null;
}

// ---- the ceremony --------------------------------------------------------------------------------
async function ceremony({ ailment = null, dryRun = false, speed = 1, D = loadDex(), stdin = process.stdin, stdout = process.stdout } = {}) {
  const St = require('./sensei/stage.js');
  const SJ = require('./sensei/sojobo.js');
  const BW = St.SW, BH = St.SH / 2 + 1 + 6; // 96 x 31
  const scene = St.scenery(), cv = new St.Canvas(), R = St.rng(Date.now() & 0xffff);
  const kit0 = D.kit({ sprites: {} });
  const DT = 66;

  const S = { t: 0, ms: 0, fade: 0, dim: 0, flash: 0, particles: [], sensei: null, senseiAlpha: 0, act: 'idle', pose: 'idle', sx: 31, sy: 3, ringGlow: 0, egg: null, creature: null, meteor: null, skip: false, tweens: [] };
  const DLG = { name: '', text: '', lines: [], shown: 0, typing: false, budget: 0, hint: '', input: false, buf: '', submitted: false, nameColor: '#e2564c', italic: false, placeholder: 0 };
  const CAP = { text: '', color: '#a59cc9', italic: true };
  const waiters = new Set();
  const until = cond => new Promise(res => waiters.add({ cond, res }));
  const wait = ms => { const end = S.ms + ms; return until(() => S.ms >= end); };
  const tween = (set, a, b, ms) => { S.tweens.push({ set, a, b, st: S.ms, ms: Math.max(1, ms) }); return wait(ms); };
  const caption = (text, color = '#a59cc9', italic = true) => Object.assign(CAP, { text, color, italic });

  // terminal
  let cols = stdout.columns || 80, rows = stdout.rows || 24, prev = [], tooSmall = false, done = false;
  const w = s => stdout.write(s);
  const onResize = () => { cols = stdout.columns; rows = stdout.rows; prev = []; w('\x1b[2J'); };
  const cleanup = () => {
    if (done) return; done = true;
    clearInterval(timer);
    stdout.off?.('resize', onResize);
    stdin.off?.('data', onKey);
    try { if (stdin.isTTY) stdin.setRawMode(false); } catch { /* closed */ }
    stdin.pause?.();
    w('\x1b[?2004l\x1b[0m\x1b[2J\x1b[?25h\x1b[?1049l');
  };
  const abort = () => { cleanup(); stdout.write('Sōjōbō bows and steps back into the cedars. Come back when you are ready.\n'); process.exit(130); };

  function onKey(buf) {
    let s = buf.toString('utf8');
    if (s.includes('\u0003')) return abort();
    if (DLG.input) {
      const pasted = s.startsWith('\x1b[200~');
      if (pasted) s = s.replace(/\x1b\[20[01]~/g, '').replace(/[\r\n]+/g, ' ');
      if (!pasted && (s === '\r' || s === '\n' || s === '\r\n')) { DLG.submitted = true; return; }
      if (s === '\x1b') { DLG.buf = ''; DLG.submitted = true; return; } // Esc: silence is an answer too
      if (s.startsWith('\x1b')) return; // arrows and friends
      for (const ch of s) {
        if (ch === '\x7f' || ch === '\b') DLG.buf = [...DLG.buf].slice(0, -1).join('');
        else if (ch === '\x15') DLG.buf = '';
        else if (ch === '\x17') DLG.buf = DLG.buf.replace(/\S+\s*$/, '');
        else if (ch === '\r' || ch === '\n') DLG.buf += ' ';
        else if (ch >= ' ' && DLG.buf.length < 1500) DLG.buf += ch;
      }
      return;
    }
    if (DLG.typing) { DLG.shown = DLG.text.length; DLG.typing = false; return; }
    S.skip = true;
  }

  // dialog + caption lines, BW wide
  const BORDER = '#8a6f2e', PANEL = '#0d0a1c', INK = '#f4efe6';
  function dialogLines() {
    const inner = BW - 4, L = [];
    const tag = DLG.name ? ` ${DLG.name} ` : '';
    const topFill = '─'.repeat(Math.max(0, BW - 3 - width(tag)));
    L.push(bg(PANEL) + fg(BORDER) + '╭─' + (tag ? BOLD + fg(DLG.nameColor) + tag + RST + bg(PANEL) + fg(BORDER) : '') + topFill + '╮' + RST);
    let body;
    if (DLG.input) {
      const caret = Math.floor(S.t / 7) % 2 ? '▌' : ' ';
      if (!DLG.buf) {
        const ex = ['it says done but never actually runs the tests', 'it forgets what we agreed on an hour ago', 'we go in circles on the same error', 'I merge without really reading the diff', "honestly I'm new to all of this"];
        body = [{ s: '› ' + caret, c: '#ffd25a' }, { s: '', c: INK }, { s: `  e.g. "${ex[Math.floor(S.ms / 3200) % ex.length]}"`, c: '#6c6490', dim: true }, { s: '', c: INK }];
      } else {
        const wl = wrap('› ' + DLG.buf + caret, inner);
        body = wl.slice(-4).map(s => ({ s, c: '#ffd25a' }));
      }
    } else {
      let left = DLG.shown;
      body = DLG.lines.slice(0, 4).map(line => { const take = Math.max(0, Math.min(line.length, left)); left -= take + 1; return { s: line.slice(0, take), c: INK, it: DLG.italic }; });
    }
    while (body.length < 4) body.push({ s: '', c: INK });
    for (const b of body) L.push(bg(PANEL) + fg(BORDER) + '│ ' + (b.it ? ITAL : '') + fg(b.c) + pad(b.s, inner) + RST + bg(PANEL) + fg(BORDER) + ' │' + RST);
    const hint = DLG.input ? ' enter: offer your words · esc: say nothing ' : DLG.hint ? (Math.floor(S.t / 8) % 2 ? ` ${DLG.hint} ` : '   ') : '';
    L.push(bg(PANEL) + fg(BORDER) + '╰' + '─'.repeat(BW - 3 - width(hint)) + fg('#c9a75a') + hint + fg(BORDER) + '─╯' + RST);
    return L;
  }
  function captionLine() {
    const t = clip(CAP.text, BW), lp = Math.floor((BW - width(t)) / 2);
    return ' '.repeat(lp) + (CAP.italic ? ITAL : '') + fg(CAP.color) + t + RST + ' '.repeat(Math.max(0, BW - lp - width(t)));
  }

  // pose: mouth follows the typewriter, blinks and wing-breaths when idle
  function senseiPose() {
    if (S.act !== 'idle') return S.act;
    if (DLG.typing && DLG.name === 'SŌJŌBŌ') return ['talk', 'talk2', 'talk', 'idle'][Math.floor(S.t / 2) % 4];
    const k = S.t % 96;
    if (k < 2 || (k > 40 && k < 43)) return 'blink';
    if (k > 70 && k < 80) return 'wings';
    return 'idle';
  }
  const creatureCache = new Map();
  function creatureGrid(c, mood) {
    const n = D.spriteFor(c, mood, Math.floor(S.ms / 100));
    if (!creatureCache.has(n)) creatureCache.set(n, D.kit(c).at(n));
    return creatureCache.get(n);
  }

  function frame() {
    if (done) return;
    if (cols < BW || rows < BH) {
      if (!tooSmall) { w('\x1b[2J\x1b[H'); prev = []; }
      tooSmall = true;
      w(`\x1b[H\x1b[0mSōjōbō needs a ${BW}x${BH} window to appear (this one is ${cols}x${rows}).\x1b[K\r\nWiden it, shrink the font, or press Ctrl+C.\x1b[K`);
      return;
    }
    if (tooSmall) { tooSmall = false; w('\x1b[2J'); prev = []; }
    S.t++; S.ms += DT * speed;
    for (let i = S.tweens.length - 1; i >= 0; i--) {
      const T = S.tweens[i], k = Math.min(1, (S.ms - T.st) / T.ms), e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
      T.set(T.a + (T.b - T.a) * e);
      if (k >= 1) S.tweens.splice(i, 1);
    }
    St.step(S.particles);
    if (DLG.typing) {
      DLG.budget += DT * speed;
      while (DLG.typing && DLG.budget >= 26) {
        const ch = DLG.text[DLG.shown++];
        DLG.budget -= 26 + ('.?!'.includes(ch) && DLG.text[DLG.shown] === ' ' ? 300 : ',;:—'.includes(ch) ? 120 : 0);
        if (DLG.shown >= DLG.text.length) DLG.typing = false;
      }
    }
    S.pose = senseiPose();
    if (S.pet) {
      const talking = DLG.typing && DLG.name === S.pet.c.name.toUpperCase();
      S.creature = { g: creatureGrid(S.pet.c, talking ? 'talk' : S.pet.mood), pal: S.pet.pal, x: 20, y: 3, scale: 2, light: S.pet.light || 0 };
    }
    St.compose(cv, scene, S, S.t);
    const out = St.toRows(cv);
    out.push(captionLine(), ...dialogLines());
    const ox = Math.floor((cols - BW) / 2) + 1, oy = Math.floor((rows - BH) / 2) + 1;
    let buf = '\x1b[?2026h';
    out.forEach((line, i) => { if (prev[i] !== line) buf += `\x1b[${oy + i};${ox}H` + line; });
    buf += '\x1b[?2026l';
    prev = out;
    w(buf);
    for (const W of [...waiters]) if (W.cond()) { waiters.delete(W); W.res(); }
  }

  async function say(name, text, o = {}) {
    Object.assign(DLG, { name, text, lines: wrap(text, BW - 6), shown: 0, typing: true, budget: 0, hint: '', italic: !!o.italic, nameColor: o.color || (name === 'SŌJŌBŌ' ? '#e2564c' : '#f0c75e') });
    S.skip = false;
    await until(() => !DLG.typing);
    DLG.hint = o.final ? 'press any key' : '▼';
    const end = S.ms + (o.hold ?? Math.max(2600, text.length * 42));
    S.skip = false;
    await until(() => S.skip || (!o.final && S.ms >= end));
    S.skip = false; DLG.hint = '';
  }
  async function ask() {
    Object.assign(DLG, { name: 'YOU', nameColor: '#ffd25a', text: '', lines: [], input: true, buf: '', submitted: false, hint: '' });
    if (ailment != null) {
      await wait(1200);
      for (const ch of ailment.replace(/\s+/g, ' ')) { DLG.buf += ch; await wait(ch === ' ' ? 70 : 34 + Math.random() * 30); }
      await wait(900);
    } else await until(() => DLG.submitted);
    DLG.input = false;
    return DLG.buf.trim();
  }
  const clearDialog = () => Object.assign(DLG, { name: '', text: '', lines: [], shown: 0, typing: false, hint: '' });

  // go
  w('\x1b[?1049h\x1b[?25l\x1b[2J\x1b[?2004h');
  if (stdin.isTTY) stdin.setRawMode(true);
  stdin.resume();
  stdin.on('data', onKey);
  stdout.on('resize', onResize);
  process.on('exit', cleanup);
  const timer = setInterval(frame, DT);

  let result;
  try {
    caption('鞍馬山   ·   Mount Kurama   ·   the hour of the ox');
    await tween(v => (S.fade = v), 0, 1, 1800);
    await wait(700);
    S.meteor = S.t + 3;
    await wait(1300);
    caption('Somewhere in the cedars, a staff rings.');
    await wait(1700);
    caption('shan.', '#e9c25a', false); await wait(700);
    caption('shan.    shan.', '#e9c25a', false); await wait(900);

    // smoke, a gust of feathers, and he is there
    caption('');
    St.puff(S.particles, 48, 26, 60, R, { spread: 30, speed: 1.2, life: 36, size: 3.2 });
    St.feathers(S.particles, 20, 76, 16, R);
    Object.assign(S, { sensei: SJ, act: 'glow', senseiAlpha: 0, ringGlow: 1, flash: 0.55 });
    tween(v => (S.flash = v), 0.55, 0, 450);
    tween(v => (S.ringGlow = v), 1, 0, 1600);
    await tween(v => (S.senseiAlpha = v), 0, 1, 1100);
    await wait(500);
    S.act = 'idle';
    await wait(500);

    await say('SŌJŌBŌ', 'So. Another one climbs Kurama in the middle of the night, carrying a machine that writes.');
    await say('SŌJŌBŌ', 'I am Sōjōbō, king of the tengu of this mountain. I taught Yoshitsune the sword when he was a boy who could not lift one. These days my students bring agents instead of swords.');
    await say('SŌJŌBŌ', 'Everyone who reaches this gate carries something. Prompts that miss. Agents that wander off. Tests nobody ran. Sessions that forget their own name.');
    await say('SŌJŌBŌ', 'So tell me what ails your work with agents. Where do you stall? What keeps going wrong? Say all of it, as it comes. I have heard worse.', { hold: 1400 });

    caption('Type freely. He is listening.', '#6c6490');
    const text = await ask();
    caption('Sōjōbō closes his eyes. The cedars go quiet.');
    Object.assign(DLG, { name: 'YOU', text: text || '…', lines: wrap(text || '…', BW - 6), shown: 9999, typing: false, italic: true, nameColor: '#ffd25a' });
    S.act = 'think';
    result = ORACLE.read(text, D.creatures);
    await wait(2600);
    S.act = 'idle'; caption('');

    const r = result, P = r.proverb, aura = AURA[r.path] || AURA.craft;
    if (!text) await say('SŌJŌBŌ', 'Nothing? Good. An empty cup is an honest one. Most people come up here already full.');
    else if (r.quote) await say('SŌJŌBŌ', `"${r.quote}"`, { hold: 1600 });
    await say('SŌJŌBŌ', ORACLE.PATHS[r.path].hear);
    caption(`${P.kanji}   ·   ${P.romaji}`, '#e9c25a', false);
    await say('SŌJŌBŌ', `There is an old saying on this mountain. ${cap(P.gloss)}`);
    caption('');
    await say('SŌJŌBŌ', `Your path is ${r.way}.` + (r.second ? ` And under it, a smaller stone: ${ORACLE.PATHS[r.second].way}.` : ''));

    // the staff rises; light gathers into an egg
    clearDialog();
    S.act = 'raise';
    caption('He lifts the shakujō. Its rings begin to hum.');
    const ring = { x: S.sx + 4.5, y: S.sy + 2.8 };
    for (let i = 0; i < 4; i++) { St.motes(S.particles, ring.x, ring.y, 14, R); await wait(380); }
    S.act = 'glow';
    await tween(v => (S.ringGlow = v), 0, 1.4, 700);
    const eggRows = kit0.EGG, eggPal = D.EGG_PAL;
    S.egg = { rows: eggRows, pal: eggPal, x: ring.x - 6, y: ring.y - 7, scale: 1, aura: St.hex(aura), glow: 0, alpha: 0, light: 1 };
    tween(v => (S.egg.alpha = v), 0, 1, 500);
    tween(v => (S.egg.glow = v), 0, 1.4, 500);
    await wait(400);
    tween(v => (S.egg.x = v), ring.x - 6, 44, 1700);
    tween(v => (S.egg.y = v), ring.y - 7, 22, 1700);
    tween(v => (S.egg.light = v), 1, 0.15, 1700);
    tween(v => (S.ringGlow = v), 1.4, 0, 1700);
    await wait(1700);
    S.act = 'idle';
    caption('An egg, warm as a hand, glowing the color of your path.', aura, true);
    await say('SŌJŌBŌ', `Take it. Something inside has been waiting for a student exactly like you. ${cap(r.charge)}`);
    await say('SŌJŌBŌ', 'Raise it. Do what it says, even when it is small and you are tired. When you grow, it grows. Now go. The mountain is cold.');

    // he leaves the way he came
    clearDialog(); caption('');
    S.act = 'raise';
    St.puff(S.particles, 48, 24, 70, R, { spread: 34, speed: 1.3, life: 40, size: 3.4 });
    St.feathers(S.particles, 18, 78, 22, R);
    tween(v => (S.dissolve = v), 0, 1, 900);
    await tween(v => (S.senseiAlpha = v), 1, 0, 1000);
    S.sensei = null; S.dissolve = 0;
    await wait(700);
    caption('He is gone. Only feathers, and the egg.');
    await wait(1800);

    // the hatch, under a spotlight
    caption('');
    tween(v => (S.dim = v), 0, 1, 1100);
    S.auraRGB = St.hex(aura);
    S.egg.shadow = true; S.egg.groundY = 46;
    await tween(v => (S.egg.y = v), 22, 32, 1300);
    await say('', 'Oh? The egg is moving.', { hold: 1100, italic: true });
    S.flash = 0.7; tween(v => (S.flash = v), 0.7, 0, 400);
    S.egg = { rows: eggRows, pal: eggPal, x: 20 + kit0.eggHome.x * 2, y: 3 + kit0.eggHome.y * 2, scale: 2, aura: St.hex(aura), glow: 1, shadow: false };
    await wait(500);
    const c = r.creature, pal = D.paletteOf(c), fr = D.frames(c);
    if (c.hatch) Object.assign(DLG, { name: '', text: c.hatch, lines: wrap(c.hatch, BW - 6), shown: 0, typing: true, budget: 0, italic: true, hint: '' });
    S.egg.glow = 0.6;
    S.egg = null;
    for (const f of fr) { S.creature = { g: f.g, pal: f.pal || pal, x: 20, y: 3, scale: 2 }; await wait(f.ms * 1.15); }
    S.pet = { c, pal, mood: 'happy' };
    S.flash = 0.45; tween(v => (S.flash = v), 0.45, 0, 500);
    await until(() => !DLG.typing);
    await wait(600);

    const name = c.name.toUpperCase();
    caption(`${c.name}   ·   ${c.species}   ·   ${c.rarity}   ·   path of ${r.path}`, aura, false);
    await say('', `${name} hatched from the egg!`, { hold: 1800, color: aura });
    S.pet.mood = 'idle';
    await say(name, c.voice, { color: aura, hold: 2200 });
    await say('YOUR PATCHLING', `${c.coaching}`, { color: aura });
    await say(`FIRST LESSON · ${r.path.toUpperCase()}`, `${cap(r.lesson)}  ${c.name} will remind you, and it grows each time you do it.`, { color: aura });
    let saved = null;
    if (!dryRun) saved = save(r);
    S.pet.mood = 'happy';
    await say('', saved ? `${c.name} is yours. Saved to ${STATE.replace(os.homedir(), '~')}.` : `${c.name} is yours, for tonight. (Dry run: nothing saved.)`, { final: true, color: aura });
    result.saved = !!saved;
  } finally {
    cleanup();
  }
  return result;
}

// ---- launching into a real terminal (for agents, whose shells are not TTYs) -------------------------------
const sq = s => `'${String(s).replace(/'/g, `'\\''`)}'`;
function launch(args) {
  const pass = args.filter(a => !['--launch', '--wait'].includes(a));
  const resultFile = path.join(os.tmpdir(), `hatchwork-result-${process.pid}-${Date.now()}.json`);
  pass.push('--result-file', resultFile);
  // Hand any pre-written ailment over as a file, never through a shell string.
  const ai = pass.indexOf('--ailment');
  if (ai >= 0) {
    const f = path.join(os.tmpdir(), `hatchwork-ailment-${process.pid}.txt`);
    fs.writeFileSync(f, pass[ai + 1] === '-' ? fs.readFileSync(0, 'utf8') : pass[ai + 1] || '');
    pass.splice(ai, 2, '--ailment-file', f);
  }
  const env = process.env.HATCHWORK_HOME ? `HATCHWORK_HOME=${sq(process.env.HATCHWORK_HOME)} ` : '';
  const cmd = `${env}${sq(process.execPath)} ${sq(__filename)} ${pass.map(sq).join(' ')}`.trim();
  let how = null;

  if (process.env.TMUX) {
    const p = spawn('tmux', ['display-popup', '-E', '-w', '100', '-h', '33', '-T', ' Sōjōbō · Mount Kurama ', cmd], { stdio: 'ignore', detached: true });
    p.unref();
    how = 'a tmux popup';
  } else if (process.platform === 'darwin') {
    const f = path.join(os.tmpdir(), `hatchwork-sensei-${process.pid}.command`);
    fs.writeFileSync(f, `#!/bin/bash\nprintf '\\e[8;34;100t'\nclear\n${cmd}\nexit\n`, { mode: 0o755 });
    const app = process.env.TERM_PROGRAM === 'iTerm.app' ? 'iTerm' : 'Terminal';
    const r = spawnSync('open', ['-a', app, f]);
    how = r.status === 0 ? `a new ${app} window` : null;
  }
  if (!how) {
    console.log(`Open a terminal (96x31 or larger) and run:\n\n  ${cmd}\n`);
    return { how: null, cmd };
  }
  console.log(`Sōjōbō is waiting in ${how}. Answer him there.`);
  return { how, cmd, resultFile };
}
// The ceremony window writes its outcome to resultFile on exit (hatched, dry run, or walked away).
async function waitForResult(file, timeoutMs = 15 * 60 * 1000) {
  const end = Date.now() + timeoutMs;
  while (Date.now() < end) {
    if (fs.existsSync(file)) {
      try { const r = JSON.parse(fs.readFileSync(file, 'utf8')); fs.unlinkSync(file); return r; } catch { /* still being written */ }
    }
    await new Promise(r => setTimeout(r, 750));
  }
  return null;
}

// ---- CLI -----------------------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2), flag = n => args.includes(n);
  const D = loadDex();
  const dryRun = flag('--dry-run'), reroll = flag('--reroll');
  const speed = flag('--fast') ? 2.5 : Math.max(0.25, +process.env.HATCHWORK_SPEED || 1);
  const resultOf = st => { const c = D.creatures.find(x => x.id === st.id); return c && { ...ORACLE.read(st.sensei ? st.sensei.ailment : '', [c]), creature: c }; };

  if (flag('--result')) {
    const st = readState();
    if (!st) { console.log('No Patchling yet. Run: node sensei.js'); process.exit(1); }
    const r = resultOf(st);
    if (!r) { console.log(`Your Patchling "${st.id}" is not in this roster.`); process.exit(1); }
    if (flag('--json')) console.log(JSON.stringify({ id: st.id, name: r.creature.name, species: r.creature.species, rarity: r.creature.rarity, path: r.path, way: r.way, lesson: r.lesson, hatchedAt: st.hatchedAt, state: STATE }, null, 1));
    else console.log(summary(D, r, { color: process.stdout.isTTY }));
    return;
  }

  const existing = readState();
  if (existing && !reroll && !dryRun) {
    const c = D.creatures.find(x => x.id === existing.id);
    console.log(`You already carry ${c ? c.name : existing.id}. Sōjōbō does not hand out a second egg lightly: use --reroll to replace it, or --dry-run to watch the ceremony.`);
    process.exit(flag('--launch') ? 0 : 2);
  }

  if (flag('--launch')) {
    const L = launch(args);
    if (L.how && flag('--wait')) {
      process.stdout.write('Waiting for the egg to hatch…\n');
      const out = await waitForResult(L.resultFile);
      if (!out) console.log('Timed out waiting. Run: node sensei.js --result');
      else if (!out.id) console.log('The ceremony was closed before the egg hatched. Run node sensei.js --launch to try again.');
      else {
        const c = D.creatures.find(x => x.id === out.id);
        console.log('\n' + summary(D, { ...ORACLE.read(out.ailment || '', [c]), creature: c }, { color: false, saved: out.saved }));
      }
    }
    return;
  }

  let outcome = { id: null };
  const resultFile = args.includes('--result-file') ? args[args.indexOf('--result-file') + 1] : null;
  if (resultFile) process.on('exit', code => { try { fs.writeFileSync(resultFile, JSON.stringify({ ...outcome, code })); } catch { /* best effort */ } });

  const pre = ailmentArg(args);
  const plain = flag('--plain') || flag('--json') || !process.stdout.isTTY || !process.stdin.isTTY;
  if (plain) {
    if (pre == null) {
      console.error('Sōjōbō needs a real terminal to appear. Use --launch to open one, or answer ahead of time:\n  node sensei.js --plain --ailment "what keeps going wrong with your agents"');
      process.exit(2);
    }
    const r = ORACLE.read(pre, D.creatures);
    const st = dryRun ? null : save(r);
    outcome = { id: r.creature.id, ailment: pre, saved: !!st };
    if (flag('--json')) {
      const c = r.creature;
      console.log(JSON.stringify({ creature: { id: c.id, name: c.name, species: c.species, rarity: c.rarity, voice: c.voice, coaching: c.coaching }, path: r.path, second: r.second, way: r.way, proverb: r.proverb, quote: r.quote, reading: r.reading, lesson: r.lesson, saved: !!st, state: st ? STATE : null }, null, 1));
    } else {
      console.log(r.reading.map(l => `Sōjōbō: ${l}`).join('\n') + `\nSōjōbō: ${cap(r.charge)}\n`);
      console.log(summary(D, r, { color: process.stdout.isTTY, saved: !!st }));
    }
    return;
  }

  const r = await ceremony({ ailment: pre, dryRun, speed, D });
  outcome = { id: r.creature.id, ailment: r.text, saved: !!r.saved };
  console.log(summary(D, r, { color: true, saved: r.saved }));
}

module.exports = { ceremony, launch, summary, wrap, width };
if (require.main === module) main().catch(e => { process.stdout.write('\x1b[0m\x1b[?25h\x1b[?1049l'); console.error(e); process.exit(1); });
