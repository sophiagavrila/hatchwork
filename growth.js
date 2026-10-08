// Growth: turn Copilot CLI session logs into habit scores, XP and evolution stage.
// Everything here runs locally on ~/.copilot/session-state/*/events.jsonl. Nothing leaves the machine.
//
// A session yields a 0-100 score per habit, or null when the session gave no evidence either way
// (a session with no edits says nothing about testing after edits). Mastery is a moving average of
// those scores across sessions since you hatched, so one great session nudges it and a habit only
// counts once it sticks. XP rewards showing up and doing the work well.
const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');

const HABITS = ['prompting', 'planning', 'research', 'autonomy', 'verification', 'review', 'recovery', 'context'];
const ALPHA = 0.15;   // weight of a new session in a habit's moving average
const START = 30;     // mastery a fresh hatchling starts at
const XP_CAP = 40;    // max XP from a single session
const GATES = [
  null,
  { xp: 300, craft: 55, specialty: 50 },              // I  → II  Adept
  { xp: 1200, craft: 72, specialty: 75, floor: 40 },  // II → III Ascended
];

const EDIT = new Set(['edit', 'create', 'apply_patch', 'write', 'str_replace_editor', 'multi_edit']);
const READ = new Set(['view', 'grep', 'glob', 'rg', 'lsp', 'web_fetch', 'qmd_search', 'context_search_lite',
  'lexical_code_search', 'semantic_code_search', 'session_store_sql', 'query', 'get', 'multi_get', 'read_file', 'search']);
const DELEGATE = new Set(['task', 'run_dynamic_workflow']);
const READ_CMD = /^\s*(cat|head|tail|less|rg|grep|ls|find|tree|wc|git\s+(--no-pager\s+)?(log|show|blame|grep|ls-files))\b/;
const VERIFY_CMD = /\b(test|tests|pytest|jest|vitest|mocha|rspec|go\s+(test|build|vet)|cargo\s+(test|build|check|clippy)|npm\s+(run\s+)?(test|build|lint|check)|pnpm\s+\w*\s*(test|build|lint)|yarn\s+(test|build|lint)|make\b|tsc\b|ruff|eslint|flake8|mypy|golangci-lint|shellcheck|--check|lint|bin\/rails\s+test|script\/(test|cibuild|lint))\b/;
const DIFF_CMD = /\bgit\s+(--no-pager\s+)?(diff|status|show|add\s+-p)\b/;
const COMMIT_CMD = /\bgit\s+(-c\s+\S+\s+)?commit\b/;
const ACK = /^\s*(y|yes|ok|okay|k|sure|go|continue|proceed|thanks|thank you|ty|lgtm|do it|next|yep|yup|done)\b[\s.!]*$/i;

const clamp = (x, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, x));
const mean = a => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : null);

function argsOf(d) {
  let a = d.arguments;
  if (typeof a === 'string') { try { a = JSON.parse(a); } catch { a = { raw: a }; } }
  return a || {};
}

// Score one user prompt 0-100: substance, concrete anchors, constraints, and a definition of done.
function scorePrompt(text) {
  const t = String(text || '').trim();
  let s = Math.min(t.length / 240, 1) * 25;
  const anchors = (t.match(/`[^`]+`|(?:\.{0,2}\/)?[\w.-]+\/[\w./-]+|\b[\w-]+\.(?:js|ts|tsx|py|go|rb|rs|java|md|json|ya?ml|toml|sh|sql|html|css)\b|https?:\/\/\S+|\bline\s+\d+|:\d+\b/g) || []).length;
  s += Math.min(anchors, 3) / 3 * 25;
  if (/\b(don'?t|do not|never|must|only|without|avoid|keep|except|leave .* alone|out of scope|not touch)\b/i.test(t)) s += 25;
  if (/\b(tests? pass|passing|passes|verify|until|done when|so that|should (return|show|be)|expect|acceptance|success means|make sure)\b/i.test(t)) s += 25;
  return Math.round(clamp(s));
}

// Score a parsed session (array of {type, data}). Returns { start, xp, tools, habits }.
function scoreEvents(events) {
  let start = null, firstEdit = -1, lastEdit = -1, planAt = -1, aborts = 0, truncs = 0, compactManual = 0;
  const prompts = [], tools = [], fails = [], subagents = new Set();
  let i = 0;
  for (const e of events) {
    const d = e.data || {};
    switch (e.type) {
      case 'session.start': start = d.startTime || e.timestamp || start; break;
      case 'user.message': {
        const c = String(d.content || '');
        if (/^\s*\/compact\b/.test(c)) compactManual++;
        if (/^\s*\//.test(c) || c.length < 15 || ACK.test(c)) break;
        prompts.push(c);
        if (/\b(plan|first,|step by step|steps:|approach)\b/i.test(c) && planAt < 0) planAt = i;
        break;
      }
      case 'session.plan_changed': if (planAt < 0) planAt = i; break;
      case 'subagent.started': subagents.add(d.toolCallId || i); break;
      case 'abort': aborts++; break;
      case 'session.truncation': truncs++; break;
      case 'tool.execution_start': {
        const name = d.toolName, a = argsOf(d), cmd = name === 'bash' ? String(a.command || '') : '';
        const kind = EDIT.has(name) ? 'edit'
          : READ.has(name) || (cmd && READ_CMD.test(cmd)) ? 'read'
          : DELEGATE.has(name) ? 'delegate'
          : cmd && COMMIT_CMD.test(cmd) ? 'commit'
          : cmd && VERIFY_CMD.test(cmd) ? 'verify'
          : cmd && DIFF_CMD.test(cmd) ? 'diff'
          : name === 'exit_plan_mode' || name === 'ask_user' || (name === 'sql' && /todos/i.test(String(a.query || ''))) ? 'plan'
          : 'other';
        if (kind === 'edit') { if (firstEdit < 0) firstEdit = tools.length; lastEdit = tools.length; }
        if (kind === 'plan' && planAt < 0) planAt = i;
        if (kind === 'delegate') subagents.add(d.toolCallId || i);
        tools.push({ id: d.toolCallId, name, kind, key: name + ':' + JSON.stringify(a), at: i });
        break;
      }
      case 'tool.execution_complete':
        if (d.success === false) fails.push(d.toolCallId);
        break;
    }
    i++;
  }

  const h = Object.fromEntries(HABITS.map(k => [k, null]));
  const edited = firstEdit >= 0;

  if (prompts.length) {
    const s = prompts.map(scorePrompt);
    h.prompting = Math.round((s[0] * 2 + s.slice(1).reduce((a, x) => a + x, 0)) / (s.length + 1));
  }
  if (edited) {
    const editAt = tools[firstEdit].at;
    const planned = planAt >= 0 && planAt < editAt;
    h.planning = planned ? 100 : planAt >= 0 ? 55 : firstEdit === 0 ? 10 : 25;
    const reads = tools.slice(0, firstEdit).filter(t => t.kind === 'read').length;
    h.research = Math.round(clamp(reads / 5 * 100));
    const after = tools.slice(firstEdit + 1);
    h.verification = tools.slice(lastEdit + 1).some(t => t.kind === 'verify') ? 100
      : after.some(t => t.kind === 'verify') ? 70
      : tools.some(t => t.kind === 'verify') ? 30 : 0;
    const commits = tools.map((t, j) => (t.kind === 'commit' ? j : -1)).filter(j => j >= 0);
    if (commits.length) {
      const reviewed = commits.filter(j => tools.slice(Math.max(firstEdit, 0), j).some(t => t.kind === 'diff')).length;
      h.review = Math.round(20 + 80 * reviewed / commits.length);
    } else if (after.some(t => t.kind === 'diff')) h.review = 80;
  }
  if (tools.length >= 12 || subagents.size) {
    h.autonomy = Math.round(clamp(40 + Math.min(subagents.size, 4) * 15 - aborts * 15 + (tools.length >= 40 && !subagents.size ? -10 : 0)));
  }
  if (fails.length) {
    const failed = new Set(fails);
    let loops = 0;
    tools.forEach((t, j) => {
      if (!failed.has(t.id)) return;
      if (tools.slice(j + 1, j + 3).some(n => n.key === t.key)) loops++;
    });
    h.recovery = Math.round(100 * (1 - loops / fails.length));
  }
  if (prompts.length >= 3 || tools.length >= 20) {
    let s = 80 - truncs * 30 + compactManual * 20;
    if (prompts.length > 40) s -= 20;
    if (tools.some(t => /AGENTS\.md|copilot-instructions\.md|CLAUDE\.md/.test(t.key))) s += 10;
    h.context = Math.round(clamp(s));
  }

  const seen = HABITS.filter(k => h[k] !== null);
  const quality = mean(seen.map(k => h[k])) || 0;
  const xp = tools.length || prompts.length ? Math.round(Math.min(XP_CAP, 4 + seen.length * quality / 20)) : 0;
  return { start, xp, tools: tools.length, prompts: prompts.length, habits: h };
}

const WANTED = /"type":\s*"(session\.start|user\.message|session\.plan_changed|subagent\.started|abort|session\.truncation|tool\.execution_start|tool\.execution_complete)"/;

async function readEvents(file) {
  const out = [];
  const rl = readline.createInterface({ input: fs.createReadStream(file), crlfDelay: Infinity });
  for await (const line of rl) {
    if (!WANTED.test(line.slice(0, 80))) continue;
    try { out.push(JSON.parse(line)); } catch { /* partial line from a live session */ }
  }
  return out;
}

const sessionDir = () => process.env.HATCHWORK_SESSIONS || path.join(process.env.COPILOT_HOME || path.join(os.homedir(), '.copilot'), 'session-state');

// Score every session log, reusing cached scores for files that haven't changed.
async function scan(cache = {}, { dir = sessionDir(), onProgress } = {}) {
  let ids = [];
  try { ids = fs.readdirSync(dir); } catch { return cache; }
  const next = {};
  let n = 0;
  for (const id of ids) {
    const f = path.join(dir, id, 'events.jsonl');
    let st; try { st = fs.statSync(f); } catch { continue; }
    const sig = `${st.size}:${Math.floor(st.mtimeMs)}`;
    if (cache[id] && cache[id].sig === sig) { next[id] = cache[id]; continue; }
    const s = scoreEvents(await readEvents(f));
    next[id] = { sig, ...s, start: s.start || new Date(st.birthtimeMs || st.mtimeMs).toISOString() };
    if (onProgress) onProgress(++n);
  }
  return next;
}

// Fold scored sessions (since `since`) into mastery, XP and a stage, never going backwards.
function grow(sessions, { since = null, specialty = 'craft', floorStage = 0 } = {}) {
  const list = Object.values(sessions)
    .filter(s => s.xp > 0 && (!since || s.start >= since))
    .sort((a, b) => (a.start < b.start ? -1 : 1));
  const mastery = Object.fromEntries(HABITS.map(k => [k, START]));
  let xp = 0;
  for (const s of list) {
    xp += s.xp;
    for (const k of HABITS) if (s.habits[k] !== null && s.habits[k] !== undefined) mastery[k] += ALPHA * (s.habits[k] - mastery[k]);
  }
  for (const k of HABITS) mastery[k] = Math.round(mastery[k]);
  const craft = Math.round(mean(HABITS.map(k => mastery[k])));
  const spec = specialty === 'craft' || !(specialty in mastery) ? craft : mastery[specialty];
  let stage = 0;
  for (let n = 1; n < GATES.length; n++) { if (meets(GATES[n], { xp, craft, spec, mastery })) stage = n; else break; }
  stage = Math.max(stage, floorStage);
  return { sessions: list.length, xp, craft, specialty, spec, mastery, stage, next: needs(stage + 1, { xp, craft, spec, mastery }, specialty) };
}

function meets(g, { xp, craft, spec, mastery }) {
  return xp >= g.xp && craft >= g.craft && spec >= g.specialty && (!g.floor || HABITS.every(k => mastery[k] >= g.floor));
}

// What's still missing for stage `n` (0-based), as human-readable lines.
function needs(n, { xp, craft, spec, mastery }, specialty) {
  const g = GATES[n];
  if (!g) return null;
  const out = [];
  const craftGoal = specialty === 'craft' ? Math.max(g.craft, g.specialty) : g.craft;
  if (xp < g.xp) out.push(`${g.xp - xp} more XP (keep shipping sessions)`);
  if (craft < craftGoal) out.push(`craft ${craft} → ${craftGoal}`);
  if (specialty !== 'craft' && spec < g.specialty) out.push(`${specialty} ${spec} → ${g.specialty}`);
  if (g.floor) for (const k of HABITS) if (mastery[k] < g.floor) out.push(`${k} ${mastery[k]} → ${g.floor}`);
  return { stage: n, gate: g, missing: out };
}

module.exports = { HABITS, GATES, ALPHA, START, scorePrompt, scoreEvents, readEvents, scan, grow, needs, sessionDir };
