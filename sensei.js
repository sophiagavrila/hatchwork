#!/usr/bin/env node
// Meet Sojo. The first-run ceremony: a retired crow sensei appears in too much smoke on a mountain
// above the cloud provider, asks what goes wrong in your work with agents, reads it, and hands you
// the egg of the Patchling that coaches exactly that. Then he leaves, and you tap the egg open.
//
//   node sensei.js                      the full ceremony (needs a real terminal, 96x31 or larger)
//   node sensei.js --launch [--wait]    open the ceremony in a tmux popup or a new terminal window
//                                       (what an agent runs; --wait blocks until the egg hatches)
//   node sensei.js --ailment "text"     answer ahead of time (also --ailment-file <path>, or - for stdin)
//   node sensei.js --plain | --json     no animation: print the reading (for agents and pipes)
//   node sensei.js --result             show the Patchling you were given
//   --dry-run   don't save   --reroll   replace an existing Patchling   --fast   hurry the old crow
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
  L.push(`${g("Sojo's reading")}  ${r.way}`);
  L.push(`  ${d('as they say up there:')} ${P}`);
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
const NAME = 'SOJO', NAME_C = '#e98a5a';
const STARS = { common: 1, uncommon: 2, rare: 3, legendary: 4 };
const RARITY_LINE = {
  common: 'A common Patchling! Reliable, like a test that actually runs!',
  uncommon: 'An uncommon Patchling! Rarer than a PR with a description!',
  rare: 'A RARE Patchling! Rarer than green CI on the first try!',
  legendary: 'The mountain shakes. The duck stands up. Tea ripples in the empty mug. A LEGENDARY Patchling!!',
};
const EXAMPLES = [
  'it confidently uses an API from two versions ago', 'the diffs are too big to review so I skim them',
  "it says done and I find out in prod that it wasn't", 'I paste in too much and it loses the plot',
  'it apologizes, then does the exact same thing again',
];

async function ceremony({ ailment = null, dryRun = false, speed = 1, D = loadDex(), stdin = process.stdin, stdout = process.stdout } = {}) {
  const St = require('./sensei/stage.js');
  const SJ = require('./sensei/sojo.js');
  const BW = St.SW, BH = St.SH / 2 + 1 + 6; // 96 x 31
  const scene = St.scenery(), cv = new St.Canvas(), R = St.rng(Date.now() & 0xffff);
  const kit0 = D.kit({ sprites: {} });
  const DT = 66, auto = ailment != null;

  const S = { t: 0, ms: 0, fade: 0, dim: 0, flash: 0, shake: 0, wob: 0, rays: 0, particles: [], sensei: null, senseiAlpha: 0, act: 'idle', pose: 'idle', sx: 28, sy: 1, ringGlow: 0, egg: null, creature: null, mug: null, duck: { dy: 0, worry: 0 }, meteor: null, skip: false, tap: false, tapMode: false, tweens: [] };
  const DLG = { name: '', text: '', lines: [], shown: 0, typing: false, budget: 0, hint: '', input: false, buf: '', submitted: false, nameColor: NAME_C, italic: false };
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
  const abort = () => { cleanup(); stdout.write('Ceremony interrupted. Sojo understands. He has also hit Ctrl+C on things he should have let finish. Run it again any time.\n'); process.exit(130); };

  function onKey(buf) {
    let s = buf.toString('utf8');
    if (s.includes('\u0003')) return abort();
    if (DLG.input && auto) return; // the answer is already written; it types itself
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
    if (S.tapMode && /^[ \r\n]+$/.test(s)) { S.tap = true; return; }
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
      if (!DLG.buf) body = [{ s: '› ' + caret, c: '#ffd25a' }, { s: '', c: INK }, { s: `  e.g. "${EXAMPLES[Math.floor(S.ms / 3200) % EXAMPLES.length]}"`, c: '#6c6490' }, { s: '', c: INK }];
      else body = wrap('› ' + DLG.buf + caret, inner).slice(-4).map(s => ({ s, c: '#ffd25a' }));
    } else {
      let left = DLG.shown;
      body = DLG.lines.slice(0, 4).map(line => { const take = Math.max(0, Math.min(line.length, left)); left -= take + 1; return { s: line.slice(0, take), c: DLG.ink || INK, it: DLG.italic }; });
    }
    while (body.length < 4) body.push({ s: '', c: INK });
    for (const b of body) L.push(bg(PANEL) + fg(BORDER) + '│ ' + (b.it ? ITAL : '') + fg(b.c) + pad(b.s, inner) + RST + bg(PANEL) + fg(BORDER) + ' │' + RST);
    const hint = DLG.input ? ' enter: tell him · esc: say nothing ' : DLG.hint ? (Math.floor(S.t / 8) % 2 ? ` ${DLG.hint} ` : ' '.repeat(width(DLG.hint) + 2)) : '';
    L.push(bg(PANEL) + fg(BORDER) + '╰' + '─'.repeat(BW - 3 - width(hint)) + fg('#ffd25a') + hint + fg(BORDER) + '─╯' + RST);
    return L;
  }
  function captionLine() {
    const t = clip(CAP.text, BW), lp = Math.floor((BW - width(t)) / 2);
    return ' '.repeat(lp) + (CAP.italic ? ITAL : '') + fg(CAP.color) + t + RST + ' '.repeat(Math.max(0, BW - lp - width(t)));
  }

  // pose: beak follows the typewriter; blinks, feather-fluffs and sips of tea when idle
  function senseiPose() {
    if (S.act !== 'idle') return S.act;
    if (DLG.typing && DLG.name === NAME) return ['talk', 'talk2', 'talk', 'idle'][Math.floor(S.t / 2) % 4];
    const k = S.t % 150;
    if (k < 2 || (k > 40 && k < 43)) return 'blink';
    if (k > 70 && k < 80) return 'wings';
    if (k > 110 && k < 128) return 'sip';
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
      w(`\x1b[H\x1b[0mNot enough mountain. Need ${BW}x${BH}, got ${cols}x${rows}.\x1b[K\r\nSojo refuses to arrive in a crawl space. Widen the window, shrink the font, or press Ctrl+C.\x1b[K`);
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
        DLG.budget -= 26 + ('.?!…'.includes(ch) && (DLG.text[DLG.shown] === ' ' || ch === '…') ? 300 : ',;:—'.includes(ch) ? 120 : 0);
        if (DLG.shown >= DLG.text.length) DLG.typing = false;
      }
    }
    S.pose = senseiPose();
    // tea steam, from his mug or from the one he left behind
    if (S.sensei && S.senseiAlpha > 0.9 && S.pose !== 'nomug' && S.t % 5 === 0) St.steam(S.particles, S.sx + (S.pose === 'sip' ? 24 : 26), S.sy + (S.pose === 'sip' ? 16 : 26), R);
    if (S.mug && S.mug.hot && S.t % 6 === 0) St.steam(S.particles, S.mug.x + 1, S.mug.y - 1, R);
    S.shake = S.shake > 0.3 ? S.shake * 0.82 : 0;
    if (S.egg) { S.wob = S.wob > 0.05 ? S.wob * 0.9 : 0; S.egg.wx = Math.round(Math.sin(S.t * 1.9) * S.wob * 1.6); }
    if (S.pet) {
      const talking = DLG.typing && DLG.name === S.pet.c.name.toUpperCase();
      S.creature = { g: creatureGrid(S.pet.c, talking ? 'talk' : S.pet.mood), pal: S.pet.pal, x: 20, y: 3, scale: 2, light: S.pet.light || 0, sil: S.pet.sil || 0 };
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
    if (o.act) S.act = o.act;
    Object.assign(DLG, { name, text, lines: wrap(text, BW - 6), shown: 0, typing: true, budget: 0, hint: '', italic: !!o.italic, ink: o.ink, nameColor: o.color || (name === NAME ? NAME_C : '#f0c75e') });
    S.skip = false;
    await until(() => !DLG.typing);
    if (o.act) S.act = 'idle';
    DLG.hint = o.final ? 'press any key' : '▼';
    const end = S.ms + (o.hold ?? Math.max(2600, text.length * 42));
    S.skip = false;
    await until(() => S.skip || (!o.final && S.ms >= end));
    S.skip = false; DLG.hint = '';
  }
  // Narration that types out and moves on without waiting for a key.
  async function narrate(text, o = {}) {
    Object.assign(DLG, { name: '', text, lines: wrap(text, BW - 6), shown: 0, typing: true, budget: 0, hint: '', italic: o.italic ?? true, ink: o.ink });
    await until(() => !DLG.typing);
  }
  async function ask() {
    Object.assign(DLG, { name: 'YOU', nameColor: '#ffd25a', text: '', lines: [], input: true, buf: '', submitted: false, hint: '' });
    if (auto) {
      await wait(1200);
      for (const ch of ailment.replace(/\s+/g, ' ')) { DLG.buf += ch; await wait(ch === ' ' ? 70 : 34 + R() * 30); }
      await wait(900);
    } else await until(() => DLG.submitted);
    DLG.input = false;
    return DLG.buf.trim();
  }
  // Wait for a tap on the egg. Nobody is left hanging: it taps itself after a while.
  async function tapWait(ms) {
    S.tap = false; S.tapMode = true; DLG.hint = 'tap the egg: space or enter';
    const end = S.ms + (auto ? Math.min(ms, 1500) : ms);
    await until(() => S.tap || S.ms >= end);
    S.tapMode = false; DLG.hint = '';
  }
  const clearDialog = () => Object.assign(DLG, { name: '', text: '', lines: [], shown: 0, typing: false, hint: '', ink: null });
  const hop = (set, h, up = 90, down = 160) => tween(set, 0, -h, up).then(() => tween(set, -h, 0, down));

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
    caption('Somewhere above the cloud provider  ·  3:07 a.m.  ·  the hour of the rollback');
    await tween(v => (S.fade = v), 0, 1, 1800);
    await wait(900);
    S.meteor = S.t + 3;
    await wait(1300);
    caption('A bell.'); await wait(1100);
    caption('A bell. A slurp of tea.'); await wait(1300);
    caption('A bell. A slurp of tea. Another bell.'); await wait(1300);

    // smoke, a gust of feathers, and he is there. Too much smoke.
    caption('');
    St.puff(S.particles, 48, 24, 70, R, { spread: 32, speed: 1.2, life: 44, size: 3.4 });
    St.feathers(S.particles, 20, 76, 14, R);
    Object.assign(S, { sensei: SJ, act: 'raise', senseiAlpha: 0, ringGlow: 1, flash: 0.5 });
    tween(v => (S.flash = v), 0.5, 0, 450);
    tween(v => (S.ringGlow = v), 1, 0, 1600);
    await tween(v => (S.senseiAlpha = v), 0, 1, 1100);
    St.puff(S.particles, 46, 14, 26, R, { spread: 18, speed: 0.6, life: 40, size: 2.6 });
    await wait(500);
    S.act = 'idle';

    await say(NAME, '*cough* — Too much smoke. Every time. *cough* Like a tool call that returns forty thousand lines.', { act: 'cough' });
    await say(NAME, 'Sojobo. Sojo is fine. Only recruiters use the whole thing. I am a retired crow. Crows hoard shiny things. I hoard good commit messages. I have eleven.');
    await say(NAME, 'Everyone comes up the mountain the same way: tired, holding a diff they did not write.');
    await say(NAME, 'Agents in circles. Agents in a fix-retry loop until the laptop gets warm. Context windows packed like a junk drawer. Reviews approved with one thumb. Sit. It is fine.');
    S.act = 'sip'; await wait(1100); S.act = 'idle';
    await say(NAME, 'So. When you work with agents, what goes wrong? Do not tidy it up. Type it the way you would complain to the duck.', { hold: 1200 });
    S.act = 'look'; wait(700).then(() => { if (S.act === 'look') S.act = 'idle'; }); // glance at the duck while the box opens

    caption('Type freely. The duck is also listening.', '#6c6490');
    const text = await ask();
    caption('Sojo reads it twice, then glances at the duck. The duck says nothing.');
    Object.assign(DLG, { name: 'YOU', text: text || '…', lines: wrap(text || '…', BW - 6), shown: 9999, typing: false, italic: true, nameColor: '#ffd25a' });
    result = ORACLE.read(text, D.creatures);
    S.act = 'squint'; await wait(1400);
    S.act = 'look'; await wait(1100);
    S.act = 'think'; await wait(800);
    S.act = 'idle'; caption('');

    const r = result, aura = AURA[r.path] || AURA.craft;
    if (!text) await say(NAME, 'Silence. Honest, at least. The duck also says nothing, and it is the best reviewer I know.');
    else if (r.quote) {
      const q = /[.!?…]$/.test(r.quote) ? r.quote : r.quote + '.';
      wait(2200).then(() => hop(v => (S.duck.dy = v), -1, 120, 160)).then(() => hop(v => (S.duck.dy = v), -1, 120, 160));
      await say(NAME, `“${q}” The duck has heard that one before. The duck nodded. Ducks do not nod lightly.`);
    }
    await say(NAME, ORACLE.PATHS[r.path].hear);
    await say(NAME, `There is a saying up here: ${r.proverb}`);
    S.act = 'sip'; await wait(1000); S.act = 'idle';
    await say(NAME, `Your path is ${r.way}.` + (r.second ? ` Also a little of ${ORACLE.PATHS[r.second].way}. Nobody has just one problem.` : ''));

    // the bell rings; light gathers into an egg. Mostly egg.
    clearDialog();
    S.act = 'raise';
    await wait(150);
    const bell = St.bellAt(S);
    caption('The bell rings once. Light gathers, folds, and becomes an egg.');
    for (let i = 0; i < 4; i++) { St.motes(S.particles, bell.x, bell.y, 14, R); await wait(380); }
    S.act = 'glow';
    await tween(v => (S.ringGlow = v), 0, 1.4, 700);
    const eggRows = kit0.EGG, eggPal = D.EGG_PAL;
    S.egg = { rows: eggRows, pal: eggPal, x: bell.x - 6, y: bell.y - 7, scale: 1, aura: St.hex(aura), glow: 0, alpha: 0, light: 1 };
    tween(v => (S.egg.alpha = v), 0, 1, 500);
    tween(v => (S.egg.glow = v), 0, 1.4, 500);
    await wait(400);
    tween(v => (S.egg.x = v), bell.x - 6, 44, 1700);
    tween(v => (S.egg.y = v), bell.y - 7, 22, 1700);
    tween(v => (S.egg.light = v), 1, 0.15, 1700);
    tween(v => (S.ringGlow = v), 1.4, 0, 1700);
    await wait(1700);
    S.act = 'idle';
    caption('The bell rings once. Light gathers, folds, and becomes an egg. Mostly egg.', aura);
    await wait(900);
    await say(NAME, `This is yours. It walks ${r.way}. ${cap(r.charge)}`);
    await say(NAME, 'Raise it. Listen to it. It will be right more often than your agent, and it will apologize less.');
    await say(NAME, 'I will not stay for the hatch. I have watched enough things break on their first run. Also, this robe is dry-clean only.');

    // he leaves the way he came. Most of him.
    clearDialog(); caption('');
    S.act = 'nomug';
    S.mug = { x: S.sx + 24, y: S.sy + 26, hot: true };
    St.puff(S.particles, 48, 22, 80, R, { spread: 34, speed: 1.3, life: 42, size: 3.4 });
    St.feathers(S.particles, 18, 78, 20, R);
    tween(v => (S.dissolve = v), 0, 1, 900);
    await tween(v => (S.senseiAlpha = v), 1, 0, 1000);
    S.sensei = null; S.dissolve = 0;
    await wait(1100); // the mug hangs in the air a moment, as mugs do
    const m0 = { x: S.mug.x, y: S.mug.y };
    await tween(v => { S.mug.x = m0.x + 9 * v; S.mug.y = m0.y + (37 - m0.y) * v * v; }, 0, 1, 420);
    S.mug.hot = false; S.shake = 2; St.puff(S.particles, S.mug.x + 4, 44, 6, R, { spread: 6, speed: 0.4, life: 12, size: 1.4 });
    caption('clink.', '#d8d2e8', false);
    await wait(1100);
    caption('Only the chipped mug remains. From somewhere in the clouds, faintly: “…my tea.”');
    await wait(3000);

    // the hatch, under a spotlight, and the egg is in no hurry
    caption('');
    S.auraRGB = St.hex(aura);
    tween(v => (S.dim = v), 0, 1, 1100);
    S.egg.shadow = true; S.egg.groundY = 46;
    await tween(v => (S.egg.y = v), 22, 32, 1300);
    S.flash = 0.5; tween(v => (S.flash = v), 0.5, 0, 400);
    S.egg = { rows: eggRows, pal: eggPal, x: 20 + kit0.eggHome.x * 2, y: 3 + kit0.eggHome.y * 2, scale: 2, aura: St.hex(aura), glow: 1, leak: 0 };
    await wait(700);

    S.wob = 2.2; S.shake = 0.8;
    await narrate('The egg wobbles. Then wobbles harder, like it just read a stack trace.');
    S.wob = 3; await wait(1600);
    S.wob = 0;
    await narrate('…Nothing happens. Eggs are like builds. Slower when watched.');
    await wait(500);

    const tapLines = ['Tap. Something taps back.', 'Tap! A hairline crack, spreading like a flaky test!', 'TAP! It shakes like a pager at 3 a.m.!'];
    for (let n = 1; n <= 3; n++) {
      await tapWait(n === 1 ? 9000 : 7000);
      S.shake = 1 + n; S.wob = 1.2 + n * 0.7;
      St.puff(S.particles, 48, 45, 3 + n * 3, R, { spread: 16, speed: 0.5, life: 14, size: 1.5 });
      hop(v => (S.egg.wy = v), 1 + n);
      if (n === 1) { tween(v => (S.egg.glow = v), 1, 1.6, 300); wait(500).then(() => { if (S.egg) { S.wob = 1.5; hop(v => (S.egg.wy = v), 1); } }); }
      if (n === 2) { S.egg.rows = kit0.EGG_C1; tween(v => (S.egg.leak = v), 0, 0.45, 400); }
      if (n === 3) { S.egg.rows = kit0.EGG_C2; tween(v => (S.egg.leak = v), 0.45, 1, 400); hop(v => (S.duck.dy = v), 2); St.sparks(S.particles, 48, 27, 10, R, S.auraRGB); }
      await narrate(tapLines[n - 1], { italic: false });
      await wait(n === 3 ? 900 : 400);
    }

    // the false alarm
    S.wob = 0;
    tween(v => (S.egg.leak = v), 1, 0.08, 1400);
    tween(v => (S.egg.glow = v), 1.6, 0.25, 1400);
    await narrate('…Still. Not a sound. Did you break it?');
    tween(v => (S.duck.worry = v), 0, 1, 400);
    await narrate('…Still. Not a sound. Did you break it? The duck looks concerned. …');
    await wait(1300);
    for (let i = 0; i < 2; i++) { // thump. thump.
      S.shake = 1.2; S.egg.glow = 1.6; S.egg.leak = 0.6;
      tween(v => (S.egg.glow = v), 1.6, 0.3, 320); tween(v => (S.egg.leak = v), 0.6, 0.1, 320);
      await wait(520);
    }
    await wait(250);

    // the burst
    S.flash = 0.95; tween(v => (S.flash = v), 0.95, 0, 700);
    S.shake = 6; S.duck.worry = 0;
    St.sparks(S.particles, 48, 30, 46, R, S.auraRGB); St.sparks(S.particles, 48, 30, 20, R);
    const c = r.creature, pal = D.paletteOf(c), fr = D.frames(c);
    const intro = kit0.eggIntro().map(f => JSON.stringify(kit0.toGrid(f.g)));
    let k = 0;
    while (k < fr.length && k < intro.length && JSON.stringify(fr[k].g) === intro[k]) k++;
    const rest = fr.slice(k).length ? fr.slice(k) : [{ g: D.kit(c).at('idle'), ms: 600 }];
    S.egg = null;
    narrate('The shell pops like a merge with no conflicts! Light floods the mountain!', { italic: false });
    tween(v => (S.rays = v), 0, 1, 1200);
    for (const f of rest) { S.creature = { g: f.g, pal: f.pal || pal, x: 20, y: 3, scale: 2, sil: 1 }; await wait(f.ms * 1.15); }
    S.pet = { c, pal, mood: 'idle', sil: 1 };
    await until(() => !DLG.typing);
    await wait(500);

    // who's that Patchling
    await say('', "Who's that Patchling?!", { hold: 1500, color: aura, ink: '#ffd25a' });
    clearDialog();
    const n = STARS[c.rarity] || 1;
    caption('·  ·  ·', '#6c6490', false); await wait(900);
    for (let i = 1; i <= n; i++) {
      caption(Array.from({ length: 4 }, (_, j) => (j < i ? '★' : '·')).join('  '), '#e9c25a', false);
      S.shake = 0.6 + i * 0.4; St.sparks(S.particles, 48, 8, 6, R, [255, 220, 120]);
      await wait(500 + i * 220);
    }
    if (c.rarity === 'legendary') { S.shake = 5; tween(v => (S.duck.dy = v), 0, -3, 300); S.flash = 0.4; tween(v => (S.flash = v), 0.4, 0, 500); }
    await say('', RARITY_LINE[c.rarity] || RARITY_LINE.common, { hold: 1800, color: aura });

    // color floods in
    clearDialog();
    S.flash = 0.6; tween(v => (S.flash = v), 0.6, 0, 600);
    St.sparks(S.particles, 48, 26, 40, R, S.auraRGB);
    tween(v => (S.rays = v), 1, 0, 1500);
    tween(v => (S.dim = v), 1, 0.35, 1600);
    await tween(v => (S.pet.sil = v), 1, 0, 900);
    S.pet.mood = 'happy';
    S.duck.dy = 0;
    const name = c.name.toUpperCase();
    caption(`${c.name}   ·   ${c.species}   ·   ${'★'.repeat(n)} ${c.rarity}   ·   path of ${r.path}`, aura, false);
    await say('', `It's ${c.name}!`, { hold: 1800, color: aura, ink: aura });
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
    const p = spawn('tmux', ['display-popup', '-E', '-w', '100', '-h', '33', '-T', ' Sojo · somewhere above the cloud provider ', cmd], { stdio: 'ignore', detached: true });
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
  console.log(`Sojo is waiting in ${how}. Answer him there.`);
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
    console.log(`You already carry ${c ? c.name : existing.id}. Sojo does not hand out a second egg; he only has so much tea. Use --reroll to replace it, or --dry-run to watch the ceremony.`);
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
      console.error('Sojo needs a real terminal to appear. Use --launch to open one, or answer ahead of time:\n  node sensei.js --plain --ailment "what keeps going wrong with your agents"');
      process.exit(2);
    }
    const r = ORACLE.read(pre, D.creatures);
    const st = dryRun ? null : save(r);
    outcome = { id: r.creature.id, ailment: pre, saved: !!st };
    if (flag('--json')) {
      const c = r.creature;
      console.log(JSON.stringify({ creature: { id: c.id, name: c.name, species: c.species, rarity: c.rarity, voice: c.voice, coaching: c.coaching }, path: r.path, second: r.second, way: r.way, proverb: r.proverb, quote: r.quote, reading: r.reading, lesson: r.lesson, saved: !!st, state: st ? STATE : null }, null, 1));
    } else {
      console.log(r.reading.map(l => `Sojo: ${l}`).join('\n') + `\nSojo: ${cap(r.charge)}\n`);
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
