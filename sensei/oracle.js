// Sojo's reading: turn what a student says ails them into a path (one of the eight habits) and a
// Patchling that coaches it. Pure and offline: keyword evidence, no model calls, same words → same egg.
'use strict';

const HABITS = ['prompting', 'planning', 'research', 'autonomy', 'verification', 'review', 'recovery', 'context'];

// Evidence per habit. Weight 2 for phrases that only mean one thing, 1 for words that lean.
const LEX = {
  prompting: [
    [/\bvague\b|\bunclear (prompt|ask|request|instruction)/, 2], [/\bprompt(s|ing)?\b/, 1],
    [/\b(doesn'?t|does not|don'?t|never) (get|understand|know) what i (want|mean|need)/, 2],
    [/\bmisunderst|\bmisinterpret/, 2], [/\bnot what i (asked|wanted|meant)|\bwrong thing\b/, 2],
    [/\b(explain|describe|articulate|word|phrase|express) (it|what|things|myself)/, 2],
    [/\bambigu|\bunclear\b|\bspecific\b|\bwording\b/, 1], [/\binstructions?\b|\brequirements?\b|\bintent\b/, 1],
    [/\bacceptance criteria|\bdefinition of done|\bwhat done (looks|means)/, 2], [/\bassum(e|es|ed|ing|ption)|\bguess(es|ed|ing)?\b/, 1],
  ],
  planning: [
    [/\bplan(s|ning|ned)?\b/, 2], [/\bdesign\b|\barchitect/, 1], [/\bbreak(ing)? (it |things |work |tasks? )?(down|up)\b/, 2],
    [/\btoo big\b|\b(huge|giant|massive|big) (task|feature|project|change|refactor)/, 2], [/\boverwhelm/, 2],
    [/\bwhere to (start|begin)\b/, 2], [/\bjump(s|ed|ing)? (straight |right )?(in|into)\b/, 2], [/\bspaghetti\b|\bscope creep\b/, 2],
    [/\bthink(ing)? (it )?(ahead|through)\b/, 2], [/\bsteps?\b(?! on)|\borgani[sz]|\bstructure\b|\broadmap\b|\bdecompos/, 1],
    [/\balternatives?\b|\btrade-?offs?\b|\bapproach(es)?\b/, 1],
  ],
  research: [
    [/\bcodebase\b/, 1], [/\b(doesn'?t|does not|never) (know|understand|read|look at) (the |my |our )?(code|codebase|repo)/, 2],
    [/\bhallucinat/, 2], [/\bmake?s? (stuff|things|apis?|functions?) up\b|\bmade[- ]up\b|\binvent(s|ed|ing)? (apis?|functions?|methods?|fields?)/, 2],
    [/\bunfamiliar\b|\bnew (to the |)(repo|codebase)\b/, 2], [/\blegacy\b|\bold code\b/, 1], [/\bdocs\b|\bdocumentation\b/, 1],
    [/\bexisting (code|patterns?|utils?|utilities|helpers?|functions?)\b|\breinvent|\bduplicat/, 2], [/\bconventions?\b|\bpatterns\b/, 1],
    [/\boutdated\b|\bwrong version\b|\bdeprecated\b/, 2], [/\bexplor|\blook(s|ing)? around\b|\bread(s|ing)? first\b/, 1],
  ],
  autonomy: [
    [/\btrust\b/, 1], [/\byolo\b|\bautopilot\b|\blet it (run|go|loose|rip)\b|\bleash\b/, 2],
    [/\bgo(es)? off\b|\boff the rails\b|\bwent rogue\b|\brogue\b/, 2],
    [/\b(rewrites?|rewrote|changes?|changed|touches|touched) (everything|half|too much|unrelated|the whole|files i didn)/, 2],
    [/\bmicromanag|\bbabysit|\bhand-?hold/, 2], [/\bapprov(e|ing|al)\b|\bpermissions?\b/, 1],
    [/\bsub-?agents?\b|\bparallel\b|\bdelegat|\b(multiple|many|several|a few|a bunch of|two|three|four|five|six|\d+) (agents|sessions|copilots)\b|\borchestrat|\bswarm\b|\bfleet\b/, 2],
    [/\bdestructive\b|\brm -rf\b|\bforce[- ]?push|\bdelet(e|ed|es|ing) (my|the|files|branch)/, 2],
    [/\brel(y|ies|iant|iance) on\b|\bdepend(ent|ence)? on (it|the agent|copilot)|\bcrutch\b/, 2],
    [/\bsecrets?\b|\bcredentials?\b|\bleak/, 1], [/\bstep(s|ping)? on each other\b|\bclobber|\bcollid|\bmerge conflicts?\b/, 2],
  ],
  verification: [
    [/\btests?\b|\btesting\b/, 2], [/\b(says?|said|claims?|claimed|thinks?|tells me) (it'?s |its |it is |that it'?s |everything'?s )?(done|finished|working|fixed|complete)/, 2], [/\b(says?|said|claims?|claimed) (the )?(fix|change|code|feature|it) (works|is (done|working|fixed))\b|\bnothing (was |got |gets |is )?(ever )?(run|ran|executed|tested|checked)\b/, 2],
    [/\b(doesn'?t|didn'?t|never|won'?t) (run|test|check|verify|build)/, 2], [/\bbroke(n)?\b|\bbreaks?\b|\bregression/, 1],
    [/\bci\b|\bbuild(s)? (fail|break)|\bred build/, 2], [/\blint/, 1], [/\buntested\b|\bverif/, 2],
    [/\bworks on my machine\b|\bflaky\b|\bfeedback loops?\b|\bmeasur(e|ing)\b/, 2], [/\blie(s|d)?\b|\blying\b|\bactually work/, 2], [/\bdouble[- ]?check/, 1],
  ],
  review: [
    [/\bdiffs?\b/, 2], [/\breview(s|ing|ed)?\b/, 2], [/\bmerg(e|ed|ing)\b|\bprs?\b|\bpull requests?\b/, 1],
    [/\brubber[- ]?stamp|\bskim/, 2], [/\b(don'?t|didn'?t|never|barely) (read|look at|check) (the |its |what it |all )?(code|changes|output|diff|it wrote)/, 2],
    [/\btoo much code\b|\bwall of code\b|\bhundreds of lines\b/, 2], [/\bslop\b|\bcode quality\b|\bquality\b/, 1],
    [/\bsubtle bugs?\b|\bslip(s|ped)? (through|in|past)\b|\bsneak/, 2], [/\bcommit messages?\b/, 1],
    [/\b(don'?t|do not|can'?t) (really |fully )?(understand|follow|explain) (the |its |what it |the code it )?(code|writes|wrote|changes?)\b/, 2],
  ],
  recovery: [
    [/(?<!feedback |dev |inner |tight )\bloop(s|ing)?\b|\b(in |going in )?circles\b/, 2], [/\b(same|repeated?) (error|mistake|bug|fix|thing)\b/, 2],
    [/\bstuck\b|\bspiral|\bdoom\b|\bwhack[- ]?a[- ]?mole\b/, 2], [/\bfix(es|ing)? one (thing|bug)/, 2],
    [/\bgive up\b|\bfrustrat/, 1], [/\bkeeps? (trying|doing|making|breaking)\b/, 2], [/\bdebug/, 1], [/\berrors?\b|\bstack ?trace/, 1],
    [/\bfail(s|ed|ing)? (again|repeatedly|over)/, 2], [/\bretr(y|ies|ying)\b|\bstart(ing)? over\b/, 1], [/\broot cause\b/, 1], [/\brabbit holes?\b|\bwhen to stop\b|\bsunk cost\b/, 2],
  ],
  context: [
    [/\bcontext\b/, 2], [/\bforget(s|ting)?\b|\bforgot\b|\bamnesia\b/, 2], [/\blos(e|es|ing|t) (track|context|the plot|the thread|focus)/, 2],
    [/\blong (sessions?|conversations?|threads?|chats?)\b/, 2], [/\bcompact\b|\bmemory\b|\btokens?\b/, 1], [/\btoo many files\b/, 2],
    [/\bdrift(s|ing|ed)?\b|\bdegrad|\bgets (dumber|worse|confused)/, 2], [/\brepeat (myself|instructions|the same)/, 2],
    [/\bignor(e|es|ing|ed) (my )?(instructions|rules|agents\.md|guidelines)/, 2], [/\bagents\.md\b|\bcopilot-instructions\b|\bclaude\.md\b/, 1],
    [/\bhandoffs?\b|\b(new|fresh) session\b|\bwhere i left off\b|\bnext session\b/, 2],
  ],
};

// Habit, secondary habit, and the words that call to each Patchling specifically.
// Creatures may also declare `habit` (and later `ailments`) themselves; that wins over this table.
const KIN = {
  patch: [null, null, /\b(everything|all of (it|the above)|idk|new to (this|all (of )?this|agents?|ai)|just started|beginner)\b/],
  axo: ['recovery', 'verification', /\berrors?\b|\bfail(s|ed|ing|ures?)?\b|\bretr(y|ies)\b|\bstack ?trace/],
  rivet: ['verification', 'review', /\btests?\b|\btesting\b|\b(says?|claims?) (it'?s )?done\b/],
  thimble: ['context', 'research', /\btoo many files\b|\birrelevant\b|\bbloat|\b(whole|entire) (repo|codebase) (in|into)|\bcontext window\b/],
  sprig: ['planning', 'prompting', /\bbreak(ing)? (it |things |work )?down\b|\btoo big\b|\boverwhelm|\bwhere to (start|begin)\b|\bsmall(er)? steps?\b/],
  scout: ['research', 'planning', /\bcodebase\b|\bexplor|\bunfamiliar\b|\bnew repo\b|\bfind where\b|\bread(s|ing)? the code\b/],
  dotty: ['verification', 'recovery', /\bbugs?\b|\bdebug|\breproduc|\brepro\b/],
  skein: ['context', 'recovery', /\blong (sessions?|conversations?|threads?)\b|\bhours\b|\btangled\b|\bcompact\b|\bdegrad|\bgets (dumber|worse|confused)/],
  pon: ['prompting', 'planning', /\bvague\b|\bprompts?\b|\bwording\b|\bmisunderst|\bwrong thing\b|\bnot what i (asked|wanted|meant)/],
  wick: ['planning', 'prompting', /\bedge cases?\b|\bhappy path\b|\bacceptance\b|\brequirements?\b|\bspecs?\b|\bdefinition of done\b|\bwhat done\b/],
  lumen: ['review', 'verification', /\bdiffs?\b|\breview|\bmerg(e|ed|ing)\b|\bprs?\b|\bpull requests?\b|\brubber[- ]?stamp|\bskim/],
  fold: ['planning', 'prompting', /\bplan(s|ning|ned)?\b|\bdesign\b|\barchitect|\bthink (it )?through\b|\bjump(s|ed|ing)? (straight |right )?(in|into)\b/],
  byte: ['autonomy', 'verification', /\btrust\b|\byolo\b|\bautopilot\b|\blet it (run|go|loose)\b|\bleash\b|\bmicromanag|\bbabysit|\bgo(es)? off\b|\brogue\b/],
  tsugi: ['recovery', 'context', /\bmistakes?\b|\blearn(ing)? from\b|\blessons?\b|\bpostmortem\b|\bsame mistake/],
  mochi: ['context', 'recovery', /\bwhen to stop\b|\bburn(ed|t)? ?out\b|\btired\b|\bexhaust|\blate (at )?night\b|\brabbit holes?\b|\bstart over\b|\bfresh session\b/],
  hush: ['prompting', 'research', /\bclarif|\bquestions?\b|\bassum(e|es|ed|ing|ption)|\bguess(es|ed|ing)?\b/],
  tock: ['verification', 'research', /\bslow\b|\bperformance\b|\bperf\b|\blatency\b|\boptimi[sz]|\bbenchmark/],
  zip: ['verification', 'recovery', /\bfeedback loops?\b|\biterat|\bwait(ing)? (for|on|forever)\b|\bcycle time\b/],
  vault: ['review', 'autonomy', /\bsecrets?\b|\btokens? (in|leak)|\bcredentials?\b|\bapi keys?\b|\bsecurity\b|\bleast privilege\b|\bleak/],
  drift: ['autonomy', 'planning', /\bparallel\b|\bsub-?agents?\b|\b(multiple|many|several) agents\b|\borchestrat|\bswarm\b|\bfleet\b|\bfan ?out\b|\bcoordinat/],
  moss: ['research', 'recovery', /\broot cause\b|\blogs?\b|\btraces?\b|\bsymptoms?\b/],
  quill: ['review', 'context', /\bcommit messages?\b|\bdocs\b|\bdocumentation\b|\breadme\b|\bchangelog\b|\bpr descriptions?\b/],
  kasa: ['research', 'review', /\blegacy\b|\bold code\b|\brewrit(e|es|ing)\b|\bsomeone else'?s code\b|\binherit/],
  yure: ['autonomy', 'planning', /\bblast radius\b|\brollouts?\b|\bdeploy|\bprod(uction)?\b|\bfeature flags?\b|\boutages?\b/],
  tsuki: ['verification', 'planning', /\b(giant|massive|huge|big) (diffs?|prs?|commits?)\b|\b(prs?|diffs?|commits?) (are|is) (huge|massive|giant|enormous)\b|\bcommit smaller\b|\bsmall(er)? commits?\b|\bcommit (more )?often\b|\bcadence\b|\brhythm\b|\bconsisten/],
  don: ['recovery', 'verification', /\bci\b|\bpipelines?\b|\bbuilds? (break|fail)|\bred build|\bgithub actions\b|\balerts?\b/],
  sara: ['context', 'planning', /\bhandoffs?\b|\bnotes\b|\bsummar|\bnext session\b|\bwhere i left off\b|\blose my place\b/],
  kuro: ['craft', 'review', /\brel(y|ies|iant|iance) on\b|\bcrutch\b|\batrophy\b|\brusty\b|\bforgot(ten)? how to (code|program)\b|\bmy (own )?skills\b|\blearn(ing)? (it )?myself\b/],
  aun: ['autonomy', 'review', /\bapprov(e|ing|al)\b|\bdangerous\b|\bdestructive\b|\brm -rf\b|\bforce[- ]?push|\bdelet(e|ed|es|ing)\b|\bguardrails?\b/],
  akari: ['planning', 'research', /\balternatives?\b|\boptions\b|\btrade-?offs?\b|\bcompare\b|\bfirst idea\b|\bwhich (way|approach)\b/],
  quack: ['planning', 'prompting', /\bexplain (its|the|their) plan\b|\bread ?back\b|\bout loud\b|\brubber ?duck|\bwhat it'?s (about to|going to) do\b/],
  riddle: ['planning', 'verification', /\btests? first\b|\btdd\b|\bfailing tests?\b|\bwrite (the )?tests? (before|first)\b|\bnever writes? tests\b/],
  fen: ['context', 'planning', /\bside quests?\b|\btangents?\b|\bdistract|\bscope creep\b|\bwander|\bunrelated\b|\bfocus\b/],
  loam: ['context', 'prompting', /\bagents\.md\b|\bcustom instructions?\b|\b(repeat|re-?type|re-?explain)(s|ing)?\b|\bsame (rules?|instructions?)\b|\bevery (time|session|morning)\b/],
  domo: ['review', 'verification', /\bgit status\b|\bdebug prints?\b|\bconsole\.log\b|\btemp files?\b|\bjunk\b|\bleftover|\bmess(y)?\b|\bclean ?up\b|\btodos?\b/],
  tosk: ['autonomy', 'context', /\bsub-?agents?\b|\bdelegat|\bhand ?offs? to\b|\bhand (it |work )?off\b/],
  grem: ['verification', 'review', /\bedge cases?\b|\bhappy path\b|\bbreak it\b|\bnulls?\b|\bempty input\b|\btimezones?\b|\brace conditions?\b|\bconcurren/],
  ness: ['research', 'verification', /\bclaims?\b|\bproof\b|\bevidence\b|\bsays? (it|the) (api|function|file) exists\b|\bbelieved?\b|\bcites?\b/],
  nansi: ['prompting', 'planning', /\bwhy (it|this) matters\b|\bbackground\b|\bthe story\b|\bthe why\b|\bwho it'?s for\b|\bmotivation\b|\bbig picture\b/],
  ouro: ['recovery', 'context', /\bloop(s|ing)?\b|\bcircles\b|\bsame (fix|thing|error)\b|\bagain and again\b|\bover and over\b|\bthird time\b/],
  coffer: ['research', 'verification', /\bhallucinat|\bdoesn'?t exist\b|\bdon'?t exist\b|\bmade[- ]up\b|\bfake (apis?|functions?|flags?|packages?)\b|\bnonexistent\b/],
  jinn: ['prompting', 'autonomy', /\bout of scope\b|\bnon-?goals?\b|\bdidn'?t ask\b|\bnot asked\b|\bconstraints?\b|\bdon'?t touch\b|\bleave .{0,20} alone\b/],
  cinder: ['recovery', 'autonomy', /\broll ?back\b|\brevert\b|\bcheckpoints?\b|\bstash\b|\bundo\b|\bwreck|\blost (my |all )?(work|changes)\b|\btook down\b/],
};

// What Sojo says for each path. Proverbs are borrowed, bent, or made up on the mountain; the rest is his.
const PATHS = {
  prompting: {
    way: "the Way of the Clear Ask", proverb: "A vague question gets a confident answer to some other question.",
    hear: "I hear prompts like “make it better.” Better how? The agent guessed. It guessed wrong, with excellent formatting.",
    charge: "it will make you state the goal, the constraints, and what done looks like before you hit enter.",
    lesson: 'name the files, the constraints, and what done looks like in your first message.',
  },
  planning: {
    way: "the Way of the Map", proverb: "Hours of debugging can save you minutes of planning.",
    hear: "I hear four thousand lines and no plan. The agent did not get lost. It never knew where it was going.",
    charge: "it will make you sketch the steps, the files, and the risks before the agent writes a line.",
    lesson: 'ask for a plan (or a failing test) before the first edit.',
  },
  research: {
    way: "the Way of Reading First", proverb: "Trust, but read the source.",
    hear: "I hear an agent calling a function that does not exist. It hallucinated an API. You believed it. You were both very sure.",
    charge: "it will make the agent read the real code and docs before it writes against them.",
    lesson: 'let it read and search before it writes. "look first" is a fine prompt.',
  },
  autonomy: {
    way: "the Way of the Short Leash", proverb: "Trust the agent. Also, tie up your camel.",
    hear: "I hear an agent with too many permissions and too little supervision. YOLO mode is a fine name for a band. Less so for prod.",
    charge: "it will make you decide what the agent may touch, what it must ask about, and where it stops.",
    lesson: 'hand self-contained work to subagents, with the whole context packed in.',
  },
  verification: {
    way: "the Way of the Green Check", proverb: "“Works on my machine” is not proof. It is a confession.",
    hear: "I hear a lot of “should work.” Should is the most expensive word in software. It costs about one incident.",
    charge: "it will make you decide how to check the work before the work starts, then actually check it.",
    lesson: 'make it run the tests, build or lint after the last edit, not before.',
  },
  review: {
    way: "the Path of the Second Look", proverb: "Ten lines get forty comments. Ten thousand lines get one: “LGTM.”",
    hear: "I hear rubber-stamped pull requests. The agent wrote it, you approved it, nobody read it. That is not a review. That is a relay race.",
    charge: "it will make you ask for small diffs and leave at least one real question on each one.",
    lesson: 'read the diff (git diff) before every commit.',
  },
  recovery: {
    way: "the Way of the Graceful Retreat", proverb: "When you find yourself in a hole, stop prompting.",
    hear: "I hear an agent in a fix-retry loop. Fix, fail, apologize, fix the same way. It is very sorry. It will do it again.",
    charge: "it will make you stop after two failed tries, read the actual error, and change the approach.",
    lesson: 'when the same fix fails twice, stop and change the approach.',
  },
  context: {
    way: "the Way of the Clean Window", proverb: "A full cup holds no more tea.",
    hear: "I hear a context window stuffed like a junk drawer: three logs, an old plan, a file from Tuesday. The agent is not dumb. It is buried.",
    charge: "it will make you give the agent only what it needs, and clear the rest before it gets confused.",
    lesson: 'one goal per session; /compact deliberately; put recurring lessons in AGENTS.md.',
  },
  craft: {
    way: "the Way of the Whole Craft", proverb: "The master has failed more times than the beginner has tried.",
    hear: "I hear a little of everything. Good. That is honest. Most trouble with agents is not one big flaw. It is many small habits.",
    charge: "it will rotate through the basics: clear asks, small steps, real tests, careful reviews.",
    lesson: 'name the files, the constraints, and what done looks like in your first message.',
  },
};

const RARITY_W = { common: 55, uncommon: 28, rare: 13, legendary: 4 };

function hash(s) { let h = 2166136261; for (const ch of s) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed) { let a = seed; return () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

// Split into clauses so the quote is the student's own sentence, not the whole confession.
function clauses(text) {
  return String(text).split(/(?<=[.!?;])\s+|\n+|\s+(?:but|and also|also|plus|then)\s+|\s*[—–]\s*/i).map(s => s.trim()).filter(s => s.length > 2);
}
const PRAISE = /\b(i'?m|i am|we'?re|that'?s|is) (pretty |actually |already |really )?(good|great|fine|solid|ok|okay|decent) (at|with|on)\b|\bnot (a|my|the) problem\b|\bno problem with\b/;

function scoreHabits(text) {
  const out = Object.fromEntries(HABITS.map(h => [h, 0]));
  const best = Object.fromEntries(HABITS.map(h => [h, { w: 0, clause: '' }]));
  for (const cl of clauses(text)) {
    const low = cl.toLowerCase(), damp = PRAISE.test(low) ? 0.25 : 1;
    for (const h of HABITS) {
      let w = 0;
      for (const [re, wt] of LEX[h]) if (re.test(low)) w += wt;
      w *= damp;
      out[h] += w;
      if (w > best[h].w || (w && w === best[h].w && cl.length > best[h].clause.length)) best[h] = { w, clause: cl };
    }
  }
  return { scores: out, evidence: Object.fromEntries(HABITS.map(h => [h, best[h].clause])) };
}

function quote(s, max = 64) {
  let t = String(s || '').replace(/\s+/g, ' ').trim().replace(/^[,.;:\s]+|[,;:\s]+$/g, '');
  if (t.length > max) { t = t.slice(0, max); t = t.slice(0, Math.max(t.lastIndexOf(' '), max - 12)) + '…'; }
  return t;
}

// A creature's own `habit` is authoritative (growth scoring trains it); KIN supplies the rest.
const kinOf = c => {
  const k = KIN[c.id] || [];
  const own = c.habit !== undefined ? c.habit : k[0];
  const habit = HABITS.includes(own) ? own : null;
  const lean = [k[0], k[1]].find(h => HABITS.includes(h) && h !== habit) || null;
  return { habit, second: lean, calls: c.ailments || k[2] || null };
};

// creatures: [{ id, name, rarity, habit? }]. Returns the full reading.
function read(text, creatures) {
  const raw = String(text || '').trim();
  const low = raw.toLowerCase();
  const { scores, evidence } = scoreHabits(raw);
  const ranked = HABITS.slice().sort((a, b) => scores[b] - scores[a]);
  const total = HABITS.reduce((s, h) => s + scores[h], 0);
  const top = total > 0 ? ranked[0] : null;

  const scored = creatures.map(c => {
    const k = kinOf(c);
    let s = 0, called = 0, hit = '';
    if (k.habit) s += scores[k.habit] + (k.second ? scores[k.second] * 0.35 : 0);
    else s += 0.6 + total * 0.05;
    // The generalist only answers to "everything" when nothing more specific was said.
    if (k.calls && (k.habit || c.id !== 'patch' || total <= 2)) {
      const re = new RegExp(k.calls.source, 'gi'), m = low.match(re) || [];
      called = new Set(m.map(x => x.toLowerCase())).size; hit = m[0] || '';
      // A generalist with a specific calling (Kuro: your own practice) has to outshout the specialists.
      s += Math.min(called, 3) * (k.habit || c.id === 'patch' ? 1.6 : 2.4);
    }
    return { c, s, called, hit, habit: k.habit };
  }).sort((a, b) => b.s - a.s);

  // Near-ties are settled by the egg's own rarity, seeded by the student's words.
  const r = rng(hash(low || 'silence'));
  const lead = scored[0].s, pool = scored.filter(x => x.s >= lead * 0.85 && x.s > 0);
  let pick = scored[0];
  if (pool.length > 1) {
    const tw = pool.reduce((a, x) => a + (RARITY_W[x.c.rarity] || 1), 0);
    let roll = r() * tw;
    for (const x of pool) { roll -= RARITY_W[x.c.rarity] || 1; if (roll < 0) { pick = x; break; } }
  }
  // The path follows the egg, so what Sojo says and what hatches agree.
  const c = pick.c, path = pick.habit || 'craft', P = PATHS[path];
  const rest = HABITS.filter(h => h !== path).sort((a, b) => scores[b] - scores[a]);
  const second = path !== 'craft' && scores[rest[0]] >= Math.max(2, scores[path] * 0.5) ? rest[0] : null;
  const hitClause = pick.hit ? clauses(raw).find(cl => cl.toLowerCase().includes(pick.hit.toLowerCase())) : '';
  const said = quote((path !== 'craft' && evidence[path]) || hitClause || raw);
  const reading = [];
  if (said) reading.push(`You said: "${said}"`);
  reading.push(P.hear);
  reading.push(`As they say up here: ${P.proverb}`);
  reading.push(`Your path is ${P.way}.` + (second ? ` Also a little of ${PATHS[second].way}. Nobody has just one problem.` : ''));
  return {
    text: raw, path, second, scores, quote: said,
    way: P.way, proverb: P.proverb, charge: P.charge, lesson: P.lesson,
    reading, creature: c, ranked: scored.slice(0, 5).map(x => ({ id: x.c.id, score: +x.s.toFixed(2) })),
  };
}

module.exports = { HABITS, PATHS, KIN, LEX, read, scoreHabits, clauses, quote, kinOf, hash };
