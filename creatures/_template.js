// TEMPLATE — format reference only, not in the roster. Copy this shape for a new creature.
// Pixels: one char per pixel, '.' = transparent. Every char must be a key in `palette`.
// Digits 0-7 are reserved for the shared egg. Light comes from the top-left.
PatchDex.register({
  id: '_template',
  name: 'Template',
  species: 'reference blob',
  rarity: 'common',
  blurb: 'One sentence about its personality.',
  coaching: 'What it tends to coach on, and how.',
  voice: 'a sample line it would say between turns.',
  hatch: 'One sentence describing its entrance.',
  palette: {
    o: '#3a2140', // outline (dark, hue-shifted, never pure black)
    d: '#8a4f9e', // shadow
    b: '#c27fd6', // base
    l: '#e6b8f0', // highlight
    w: '#ffffff', // eye shine
    e: '#2a1530', // eye
    m: '#ff8fa3', // mouth / blush
  },
  sprites: {
    idle: [
      '....oooooo....',
      '..oollllbboo..',
      '.olllbbbbbbdo.',
      '.olbbbbbbbbdo.',
      'olbbewbbewbbdo',
      'olbbeebbeebbdo',
      'obmbbbbbbbmbdo',
      'obbbbbmmbbbbdo',
      'obbbbbbbbbbddo',
      '.odbbbbbbbddo.',
      '..oodddddddoo.',
      '....oooooo....',
    ],
    blink: [
      '....oooooo....',
      '..oollllbboo..',
      '.olllbbbbbbdo.',
      '.olbbbbbbbbdo.',
      'olbbbbbbbbbbdo',
      'olbbeebbeebbdo',
      'obmbbbbbbbmbdo',
      'obbbbbmmbbbbdo',
      'obbbbbbbbbbddo',
      '.odbbbbbbbddo.',
      '..oodddddddoo.',
      '....oooooo....',
    ],
  },
  // Optional custom idle loop: [spriteName, ticks of 100ms].
  // loop: [['idle', 20], ['blink', 2], ['idle', 20]],
  entrance(k) {
    // Always start with the shared egg beat, then the creature's own way out.
    const out = k.eggIntro();
    const shell = (dy) => { const g = k.egg(k.EGG_BOTTOM); return k.stamp(g, k.EGG_TOP, k.eggHome.x, k.eggHome.y + dy); };
    out.push(k.f(shell(-2), 90), k.f(shell(-5), 90));
    out.push(k.f(k.at('idle', 0, 3), 90), k.f(k.at('idle', 0, -2), 110), k.f(k.at('idle'), 140), k.f(k.at('blink'), 120), k.f(k.at('idle'), 300));
    return out;
  },
});
// Every creature also needs talk, happy, sleep sprites (same size as idle). Optional: think, fidget, idle2, happy2, sleep2, talk2.
PatchDex.creatures.find(c => c.id === '_template').sprites.talk = PatchDex.creatures.find(c => c.id === '_template').sprites.idle;
['happy', 'sleep'].forEach(n => { const c = PatchDex.creatures.find(c => c.id === '_template'); c.sprites[n] = c.sprites.blink; c._errors = PatchDex.validate(c); });
