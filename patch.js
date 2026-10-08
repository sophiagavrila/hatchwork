#!/usr/bin/env node
// Your own Patchling: hatch one, watch it grow as you get better at working with agents.
//   node patch.js                 status: your Patchling, habit mastery, what the next evolution needs
//   node patch.js hatch           hatch your egg (once). --reroll to start over with a new egg
//   node patch.js replay          replay your hatch and every evolution so far
//   node patch.js --all-history   count sessions from before you hatched too
// Growth is scored locally from ~/.copilot/session-state. State lives in ~/.hatchwork/.
const fs = require('fs');
const os = require('os');
const path = require('path');
const D = require('./load.js')({ quiet: true });
const G = require('./growth.js');

const HOME = process.env.HATCHWORK_HOME || path.join(os.homedir(), '.hatchwork');
const STATE = path.join(HOME, 'state.json');
const CACHE = path.join(HOME, 'sessions.json');
const args = process.argv.slice(2);
const cmd = args[0] && !args[0].startsWith('--') ? args[0] : 'status';
const flag = n => args.includes(n);
const val = n => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const tty = process.stdout.isTTY && !flag('--quiet');
const sleep = ms => new Promise(r => setTimeout(r, ms));
const dim = s => `\x1b[2m${s}\x1b[0m`, bold = s => `\x1b[1m${s}\x1b[0m`, gold = s => `\x1b[38;2;240;199;94m${s}\x1b[0m`;

const TIPS = {
  prompting: 'name the files, the constraints, and what done looks like in your first message.',
  planning: 'ask for a plan (or a failing test) before the first edit.',
  research: 'let it read and search before it writes. "look first" is a fine prompt.',
  autonomy: 'hand self-contained work to subagents, with the whole context packed in.',
  verification: 'make it run the tests, build or lint after the last edit, not before.',
  review: 'read the diff (git diff) before every commit.',
  recovery: 'when the same fix fails twice, stop and change the approach.',
  context: 'one goal per session; /compact deliberately; put recurring lessons in AGENTS.md.',
};

const read = (f, d) => { try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch { return d; } };
const write = (f, v) => { fs.mkdirSync(HOME, { recursive: true }); fs.writeFileSync(f, JSON.stringify(v, null, 1)); };
const byId = id => D.creatures.find(c => c.id === id);

async function play(fr, pal) {
  if (!tty) return;
  const rows = D.H / 2;
  process.stdout.write('\n'.repeat(rows));
  for (const x of fr) { process.stdout.write(`\x1b[${rows}A` + D.toAnsi(x.g, x.pal || pal) + '\n'); await sleep(x.ms); }
}
const bar = (v, w = 20) => { const n = Math.round(v / 100 * w); return '█'.repeat(n) + dim('░'.repeat(w - n)); };

function card(c, n) {
  const fm = D.form(c, n);
  console.log(D.toAnsi(fm.sprites.idle, D.paletteOf(fm)));
  console.log(`${bold(fm.name)} ${dim('·')} ${fm.species || c.species} ${dim('·')} ${D.STAGES[n]} ${dim('·')} ${c.rarity}`);
  if (fm.blurb) console.log(dim(fm.blurb));
  console.log(`  “${fm.voice || c.voice}”`);
}

async function evolveScenes(c, from, to) {
  for (let n = from; n < to; n++) {
    const A = D.form(c, n), B = D.form(c, n + 1);
    console.log(`\nWhat? ${bold(A.name)} is evolving!`);
    await play(D.evolution(c, n), D.paletteOf(B));
    console.log(gold(`Congratulations! Your ${A.name} evolved into ${bold(B.name)}!`));
    if (B.evolve) console.log(dim(B.evolve));
  }
}

async function hatch() {
  const old = read(STATE, null);
  if (old && !flag('--reroll')) { console.log(`You already hatched ${bold(byId(old.id)?.name || old.id)}. Use --reroll to start over.`); return status(); }
  const c = val('--as') ? byId(val('--as')) : D.pick();
  if (!c) { console.error(`no creature "${val('--as')}"`); process.exit(1); }
  const state = { id: c.id, hatchedAt: new Date().toISOString(), stage: 0 };
  write(STATE, state);
  console.log(dim('Your egg is hatching…'));
  await play(D.frames(c), D.paletteOf(c));
  console.log(`\n${gold('You hatched')} ${bold(c.name)}${dim(` (${c.rarity}, ${(D.odds(c) * 100).toFixed(1)}% chance)`)}`);
  if (c.hatch) console.log(dim(c.hatch));
  console.log(`\n${c.blurb}\nCoaching: ${c.coaching}\nSpecialty: ${c.habit || 'craft'}\n\nIt grows as you do. Run ${bold('node patch.js')} after your next few sessions.`);
}

async function status() {
  const state = read(STATE, null);
  if (!state) { console.log(`No Patchling yet. Run ${bold('node patch.js hatch')}.`); return; }
  const c = byId(state.id);
  if (!c) { console.error(`your Patchling "${state.id}" isn't in this roster`); process.exit(1); }
  const forms = D.formsOf(c).length;
  if (tty) process.stdout.write(dim('reading your sessions…\r'));
  const sessions = await G.scan(read(CACHE, {}));
  write(CACHE, sessions);
  const since = flag('--all-history') ? null : state.hatchedAt;
  const g = G.grow(sessions, { since, specialty: c.habit || 'craft', floorStage: state.stage || 0 });
  const stage = Math.min(g.stage, forms - 1);
  if (stage > (state.stage || 0)) {
    await evolveScenes(c, state.stage || 0, stage);
    state.stage = stage;
    state[`stage${stage + 1}At`] = new Date().toISOString();
    write(STATE, state);
    console.log('');
  }
  card(c, state.stage || 0);
  console.log(`\n${dim('sessions')} ${g.sessions}   ${dim('xp')} ${g.xp}   ${dim('craft')} ${g.craft}`);
  for (const k of G.HABITS) {
    const mark = k === c.habit ? gold('★') : ' ';
    console.log(`${mark} ${k.padEnd(13)}${bar(g.mastery[k])} ${String(g.mastery[k]).padStart(3)}`);
  }
  if (g.next && (state.stage || 0) + 1 < forms) {
    const nextName = D.form(c, (state.stage || 0) + 1).name;
    console.log(`\n${bold('Next:')} ${D.STAGES[(state.stage || 0) + 1]} ${nextName} needs ${g.next.missing.length ? g.next.missing.join(', ') : 'one more session'}`);
  } else if ((state.stage || 0) + 1 < D.STAGES.length && forms < D.STAGES.length) {
    console.log(dim(`\n${c.name}'s next form hasn't been drawn yet. Keep growing; it will be waiting.`));
  } else console.log(gold('\nFully evolved. Keep the habits sharp.'));
  const weak = G.HABITS.reduce((a, k) => (g.mastery[k] < g.mastery[a] ? k : a), G.HABITS[0]);
  console.log(`${bold('Tip')} ${dim(`(${weak})`)}: ${TIPS[weak]}`);
}

async function replay() {
  const state = read(STATE, null);
  if (!state) { console.log(`No Patchling yet. Run ${bold('node patch.js hatch')}.`); return; }
  const c = byId(state.id);
  await play(D.frames(c), D.paletteOf(c));
  await evolveScenes(c, 0, Math.min(state.stage || 0, D.formsOf(c).length - 1));
  card(c, state.stage || 0);
}

({ hatch, status, replay }[cmd] || (() => { console.error(`unknown command "${cmd}"`); process.exit(1); }))();
