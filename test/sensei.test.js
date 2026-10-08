const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const D = require('../load.js')({ quiet: true });
const O = require('../sensei/oracle.js');
const SJ = require('../sensei/sojobo.js');
const St = require('../sensei/stage.js');
const { wrap, width, summary } = require('../sensei.js');

const read = text => O.read(text, D.creatures);
const SENSEI = path.join(__dirname, '..', 'sensei.js');

test('the same ailment always hatches the same Patchling', () => {
  const a = read('it keeps forgetting what I told it an hour ago');
  const b = read('it keeps forgetting what I told it an hour ago');
  assert.equal(a.creature.id, b.creature.id);
  assert.deepEqual(a.reading, b.reading);
});

test('ailments route to the habit they describe', () => {
  const cases = {
    'it says done but never actually runs the tests': 'verification',
    'long sessions it forgets my instructions and drifts': 'context',
    'I merge without reading the diff': 'review',
    'we go in circles on the same error over and over': 'recovery',
    'it just starts coding before we agree on a plan': 'planning',
    'my prompts are vague so it guesses what I want': 'prompting',
    'I run five agents at once and they step on each other': 'autonomy',
  };
  for (const [text, habit] of Object.entries(cases)) assert.equal(read(text).path, habit, text);
});

test('the hatched creature specializes in the path it was given', () => {
  for (const text of ['it never runs the tests', 'I approve diffs I have not read', 'it loses context in long sessions']) {
    const r = read(text);
    const habits = [r.creature.habit, ...(O.KIN[r.creature.id] ? [O.KIN[r.creature.id].habit] : [])];
    assert.ok(habits.includes(r.path) || r.path === 'craft', `${text}: ${r.creature.id} (${r.creature.habit}) on ${r.path}`);
  }
});

test('a vague answer still gets an egg and a lesson', () => {
  for (const text of ['', 'idk', 'I am new to all of this']) {
    const r = read(text);
    assert.ok(r.creature && r.creature.id, text);
    assert.ok(r.lesson && r.way && r.proverb.kanji, text);
  }
});

test('losing your own skills brings Kuro, the sensei\'s own student', () => {
  assert.equal(read('I feel like I am losing my own skills and just rely on it').creature.id, 'kuro');
});

test('every creature in the roster can be reached or is a deliberate fallback', () => {
  const seen = new Set();
  for (const c of D.creatures) assert.ok(O.kinOf(c), `${c.id} has no kin`);
  for (const text of JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'ailments.json'), 'utf8'))) seen.add(read(text).creature.id);
  assert.ok(seen.size >= 20, `only ${seen.size} distinct Patchlings across the sample ailments`);
});

test('Sōjōbō sprite frames are complete and on-palette', () => {
  for (const [name, rows] of Object.entries(SJ.FRAMES)) {
    assert.equal(rows.length, SJ.H, name);
    for (const row of rows) {
      assert.equal(row.length, SJ.W, name);
      for (const ch of row) assert.ok(ch === '.' || SJ.PAL[ch], `${name}: ${ch} not in palette`);
    }
  }
});

test('the stage renders to a fixed 96-column frame', () => {
  const cv = new St.Canvas();
  St.compose(cv, St.scenery(), { ms: 0, fade: 1, particles: [] });
  const rows = St.toRows(cv);
  assert.equal(rows.length, St.SH / 2);
});

test('wrap and width respect wide characters', () => {
  assert.equal(width('石橋'), 4);
  assert.equal(width('abc'), 3);
  for (const line of wrap('石橋を叩いて渡る tap the stone bridge before you cross it, every single time', 20)) assert.ok(width(line) <= 20, line);
});

test('summary names the creature and the lesson', () => {
  const r = read('it never runs the tests');
  const s = summary(D, r, { color: false, saved: false });
  assert.match(s, new RegExp(r.creature.name));
  assert.match(s, /first lesson/);
});

test('--json hatches without a terminal and saves state', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'hatchwork-sensei-'));
  const run = spawnSync(process.execPath, [SENSEI, '--json', '--ailment', 'it never runs the tests'], { env: { ...process.env, HATCHWORK_HOME: home }, encoding: 'utf8' });
  assert.equal(run.status, 0, run.stderr);
  const out = JSON.parse(run.stdout);
  assert.ok(out.saved);
  const st = JSON.parse(fs.readFileSync(path.join(home, 'state.json'), 'utf8'));
  assert.equal(st.id, out.creature.id);
  assert.equal(st.sensei.path, out.path);
  const again = spawnSync(process.execPath, [SENSEI, '--plain', '--ailment', 'x'], { env: { ...process.env, HATCHWORK_HOME: home }, encoding: 'utf8' });
  assert.equal(again.status, 2, 'a second egg needs --reroll');
});

test('without a terminal or an answer, it explains how to proceed', () => {
  const run = spawnSync(process.execPath, [SENSEI], { env: { ...process.env, HATCHWORK_HOME: fs.mkdtempSync(path.join(os.tmpdir(), 'hw-')) }, encoding: 'utf8', input: '' });
  assert.equal(run.status, 2);
  assert.match(run.stderr, /--launch|--ailment/);
});
