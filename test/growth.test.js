const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const G = require('../growth.js');

const ev = (type, data = {}) => ({ type, data });
const tool = (name, args = {}, id = name + Math.random()) => ev('tool.execution_start', { toolCallId: id, toolName: name, arguments: args });
const bash = command => tool('bash', { command });
const done = (id, success = true) => ev('tool.execution_complete', { toolCallId: id, success });

test('specific prompts outscore vague ones', () => {
  const vague = G.scorePrompt('fix the bug');
  const sharp = G.scorePrompt('In `src/auth.ts` the token refresh at line 42 races. Fix it without touching the public API; done when `npm test` passes.');
  assert.ok(vague < 20, `vague ${vague}`);
  assert.ok(sharp >= 80, `sharp ${sharp}`);
});

test('a disciplined session scores high on planning, research, verification, review', () => {
  const s = G.scoreEvents([
    ev('session.start', { startTime: '2026-01-01T00:00:00Z' }),
    ev('user.message', { content: 'Plan first: add retries to `client/fetch.go`. Do not change the interface. Done when go test ./... passes.' }),
    ev('session.plan_changed'),
    tool('view'), tool('grep'), tool('glob'), tool('view'), tool('view'),
    tool('edit'),
    bash('go test ./...'),
    bash('git --no-pager diff'),
    bash('git commit -S -m "retries"'),
  ]);
  assert.equal(s.habits.planning, 100);
  assert.equal(s.habits.research, 100);
  assert.equal(s.habits.verification, 100);
  assert.equal(s.habits.review, 100);
  assert.ok(s.habits.prompting >= 70);
  assert.ok(s.xp > 0);
});

test('a cowboy session scores low', () => {
  const s = G.scoreEvents([
    ev('user.message', { content: 'make it work please thanks' }),
    tool('edit'), tool('edit'),
    bash('git commit -m wip'),
  ]);
  assert.equal(s.habits.planning, 10);
  assert.equal(s.habits.research, 0);
  assert.equal(s.habits.verification, 0);
  assert.equal(s.habits.review, 20);
});

test('sessions without evidence leave a habit null', () => {
  const s = G.scoreEvents([ev('user.message', { content: 'what does this repository do, in a sentence?' }), tool('view')]);
  assert.equal(s.habits.verification, null);
  assert.equal(s.habits.review, null);
  assert.equal(s.habits.recovery, null);
});

test('retrying the identical failing call counts as a loop', () => {
  const a = { command: 'npm run build' };
  const s = G.scoreEvents([
    ev('user.message', { content: 'build the project and tell me what breaks' }),
    tool('bash', a, 'x1'), done('x1', false),
    tool('bash', a, 'x2'), done('x2', false),
    tool('bash', { command: 'cat build.log' }, 'x3'), done('x3'),
  ]);
  assert.equal(s.habits.recovery, 50);
});

test('acknowledgements and slash commands are not scored as prompts', () => {
  const s = G.scoreEvents([ev('user.message', { content: 'yes' }), ev('user.message', { content: '/compact' })]);
  assert.equal(s.habits.prompting, null);
});

test('arguments given as a JSON string are parsed', () => {
  const s = G.scoreEvents([
    ev('user.message', { content: 'edit the readme then run the linter on it' }),
    tool('edit'),
    ev('tool.execution_start', { toolCallId: 'j', toolName: 'bash', arguments: JSON.stringify({ command: 'npm run lint' }) }),
  ]);
  assert.equal(s.habits.verification, 100);
});

const good = { prompting: 90, planning: 95, research: 90, autonomy: 85, verification: 95, review: 90, recovery: 90, context: 90 };
const session = (i, habits, xp = 35) => ({ start: new Date(Date.UTC(2026, 0, 1 + i)).toISOString(), xp, habits });

test('one great session does not evolve; consistent practice does', () => {
  assert.equal(G.grow({ a: session(0, good) }).stage, 0);
  const many = Object.fromEntries(Array.from({ length: 12 }, (_, i) => [i, session(i, good)]));
  assert.equal(G.grow(many).stage, 1);
  const lots = Object.fromEntries(Array.from({ length: 40 }, (_, i) => [i, session(i, good)]));
  const g = G.grow(lots, { specialty: 'verification' });
  assert.equal(g.stage, 2);
  assert.equal(g.next, null);
});

test('stage III needs the specialty and no neglected habit', () => {
  const lopsided = { ...good, verification: 20 };
  const lots = Object.fromEntries(Array.from({ length: 60 }, (_, i) => [i, session(i, lopsided)]));
  const g = G.grow(lots, { specialty: 'prompting' });
  assert.equal(g.stage, 1);
  assert.ok(g.next.missing.some(m => m.startsWith('verification')));
  assert.equal(G.grow(lots, { specialty: 'verification' }).stage, 0);
});

test('stage never goes backwards and sessions before hatch are ignored', () => {
  const s = { old: session(0, good, 40), new: session(30, { ...good, prompting: 0 }, 5) };
  const g = G.grow(s, { since: s.new.start, floorStage: 1 });
  assert.equal(g.sessions, 1);
  assert.equal(g.stage, 1);
});

test('scan reads events.jsonl files and caches by size and mtime', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'hw-'));
  fs.mkdirSync(path.join(dir, 's1'));
  const lines = [
    ev('session.start', { startTime: '2026-02-01T00:00:00Z' }),
    ev('user.message', { content: 'look at `a.py` and add a docstring; run pytest after' }),
    tool('view'), tool('edit'), bash('pytest -q'),
    { type: 'assistant.message', data: { content: 'ignored' } },
  ].map(x => JSON.stringify(x)).join('\n') + '\n{"type":"tool.execution_start","data":';
  fs.writeFileSync(path.join(dir, 's1', 'events.jsonl'), lines);
  const a = await G.scan({}, { dir });
  assert.equal(a.s1.start, '2026-02-01T00:00:00Z');
  assert.equal(a.s1.habits.verification, 100);
  let calls = 0;
  await G.scan(a, { dir, onProgress: () => calls++ });
  assert.equal(calls, 0);
  fs.rmSync(dir, { recursive: true });
});
