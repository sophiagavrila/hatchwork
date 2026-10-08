#!/usr/bin/env node
// Render creatures in a real terminal with truecolor half-blocks.
//   node cli.js <id>               idle + every mood
//   node cli.js <id> --entrance    play the hatch
//   node cli.js --all              idle for every creature
//   node cli.js --check            validate everything, exit 1 on errors
const path = require('path');
globalThis.window = globalThis;
const D = require('./core.js');
require('./roster.js');
const args = process.argv.slice(2);
const ids = args.includes('--all') || args.includes('--check') || !args[0] || args[0].startsWith('--') ? window.PATCH_ROSTER : [args[0]];
for (const id of ids) { try { require(path.join(__dirname, 'creatures', id + '.js')); } catch (e) { if (!args.includes('--all')) console.error(`[${id}] failed to load: ${e.message}`); } }
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  let bad = 0;
  for (const c of D.creatures) {
    const pal = D.paletteOf(c), fr = D.frames(c);
    if (c._errors.length) { bad++; console.log(`\x1b[31m[${c.id}] ${c._errors.join('\n  ')}\x1b[0m`); }
    if (args.includes('--check')) { if (!c._errors.length) console.log(`[${c.id}] ok · ${fr.length} entrance frames`); continue; }
    console.log(`\n${c.name} · ${c.rarity}`);
    if (args.includes('--entrance')) {
      const rows = D.H / 2;
      process.stdout.write('\n'.repeat(rows));
      for (const x of fr) { process.stdout.write(`\x1b[${rows}A` + D.toAnsi(x.g, pal) + '\n'); await sleep(x.ms); }
      continue;
    }
    const moods = args.includes('--all') ? ['idle'] : Object.keys(c.sprites);
    for (const m of moods) { console.log(m); console.log(D.toAnsi(c.sprites[m], pal)); }
  }
  if (args.includes('--check')) process.exit(bad ? 1 : 0);
})();
