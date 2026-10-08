#!/usr/bin/env node
// Render creatures in a real terminal with truecolor half-blocks.
//   node cli.js <id>                 idle + every mood
//   node cli.js <id> --stage 2       a later form (1 = as hatched, 3 = final)
//   node cli.js <id> --entrance      play the hatch
//   node cli.js <id> --evolve 1      play the evolution from stage 1 to 2
//   node cli.js --all                idle for every creature, every stage
//   node cli.js --check              validate everything, exit 1 on errors
// Your own Patchling (hatch, growth, evolution) lives in `node patch.js`.
const D = require('./load.js')();
const args = process.argv.slice(2);
const opt = n => { const i = args.indexOf(n); return i >= 0 ? Number(args[i + 1]) : null; };
const only = args[0] && !args[0].startsWith('--') ? args[0] : null;
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function play(fr, pal) {
  const rows = D.H / 2;
  process.stdout.write('\n'.repeat(rows));
  for (const x of fr) { process.stdout.write(`\x1b[${rows}A` + D.toAnsi(x.g, x.pal || pal) + '\n'); await sleep(x.ms); }
}
(async () => {
  let bad = 0;
  const list = only ? D.creatures.filter(c => c.id === only) : D.creatures;
  if (only && !list.length) { console.error(`no creature "${only}"`); process.exit(1); }
  for (const c of list) {
    const fr = D.frames(c);
    if (c._errors.length) { bad++; console.log(`\x1b[31m[${c.id}] ${c._errors.join('\n  ')}\x1b[0m`); }
    if (args.includes('--check')) {
      if (!c._errors.length) console.log(`[${c.id}] ok · ${fr.length} entrance frames · ${D.formsOf(c).map(x => x.name).join(' → ')}${c.stages ? '' : '  (no evolutions yet)'}`);
      continue;
    }
    if (args.includes('--entrance')) { console.log(`\n${c.name} · ${c.rarity}`); await play(fr, D.paletteOf(c)); continue; }
    if (opt('--evolve')) { const from = opt('--evolve') - 1, B = D.form(c, from + 1); await play(D.evolution(c, from), D.paletteOf(B)); continue; }
    const stages = opt('--stage') ? [opt('--stage') - 1] : args.includes('--all') ? D.formsOf(c).map((_, i) => i) : [0];
    for (const n of stages) {
      const fm = D.form(c, n), pal = D.paletteOf(fm);
      console.log(`\n${fm.name} · ${D.STAGES[n]} · ${c.rarity}`);
      const moods = args.includes('--all') ? ['idle'] : Object.keys(fm.sprites);
      for (const m of moods) { if (!args.includes('--all')) console.log(m); console.log(D.toAnsi(fm.sprites[m], pal)); }
    }
  }
  if (args.includes('--check')) process.exit(bad ? 1 : 0);
})();
