#!/usr/bin/env node
// Print every registered creature (metadata, palette, sprites, entrance, forms, evolution scenes) as JSON.
// Used by scripts/media.py to render the README images.
const D = require('../load.js')();

const grid = rows => rows.map(r => (Array.isArray(r) ? r.join('') : r));
const sprites = s => Object.fromEntries(Object.entries(s).map(([k, v]) => [k, grid(v)]));
const out = D.creatures.map(c => {
  if (c._errors.length) throw new Error(`${c.id}: ${c._errors.join('; ')}`);
  const fr = D.frames(c);
  if (c._errors.length) throw new Error(`${c.id}: ${c._errors.join('; ')}`);
  const forms = D.formsOf(c);
  return {
    id: c.id, name: c.name, species: c.species, rarity: c.rarity, habit: c.habit || 'craft',
    blurb: c.blurb, coaching: c.coaching, voice: c.voice, hatch: c.hatch,
    odds: D.odds(c), palette: D.paletteOf(c),
    sprites: sprites(c.sprites),
    frames: fr.map(f => ({ g: grid(f.g), ms: f.ms })),
    forms: forms.map((f, n) => ({
      stage: n + 1, name: f.name, species: f.species, blurb: f.blurb, voice: f.voice, evolve: f.evolve,
      palette: D.paletteOf(f), sprites: sprites(f.sprites),
    })),
    evolutions: forms.slice(1).map((_, n) => D.evolution(c, n).map(f => ({ g: grid(f.g), ms: f.ms, pal: f.pal || D.paletteOf(forms[n + 1]) }))),
  };
});
process.stdout.write(JSON.stringify({ W: D.W, H: D.H, STAGES: D.STAGES, creatures: out }));
