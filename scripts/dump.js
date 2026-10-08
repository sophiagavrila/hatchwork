#!/usr/bin/env node
// Print every registered creature (metadata, palette, sprites, entrance frames) as JSON.
// Used by scripts/media.py to render the README images.
const path = require('path');
globalThis.window = globalThis;
const D = require('../core.js');
require('../roster.js');
for (const id of window.PATCH_ROSTER) require(path.join(__dirname, '..', 'creatures', id + '.js'));

const grid = rows => rows.map(r => (Array.isArray(r) ? r.join('') : r));
const out = D.creatures.map(c => {
  if (c._errors.length) throw new Error(`${c.id}: ${c._errors.join('; ')}`);
  const fr = D.frames(c);
  if (c._errors.length) throw new Error(`${c.id}: ${c._errors.join('; ')}`);
  return {
    id: c.id, name: c.name, species: c.species, rarity: c.rarity,
    blurb: c.blurb, coaching: c.coaching, voice: c.voice, hatch: c.hatch,
    odds: D.odds(c), palette: D.paletteOf(c),
    sprites: Object.fromEntries(Object.entries(c.sprites).map(([k, v]) => [k, grid(v)])),
    frames: fr.map(f => ({ g: grid(f.g), ms: f.ms })),
  };
});
process.stdout.write(JSON.stringify({ W: D.W, H: D.H, creatures: out }));
