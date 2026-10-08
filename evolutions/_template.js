// TEMPLATE — format reference only. Copy to evolutions/<id>.js.
// A Patchling has three forms: I Hatchling (creatures/<id>.js), II Adept and III Ascended (this file).
// Later forms may be bigger: Adept ≤ 25×21, Ascended ≤ 28×22. Every sprite in one form is the same size.
// Palettes inherit from the hatchling: only list colors you add or change. Digits 0-7 stay reserved.
PatchDex.evolve('_template', {
  habit: 'planning', // specialty: prompting | planning | research | autonomy | verification | review | recovery | context | craft
  stages: [
    {
      name: 'Templar',
      species: 'adept reference blob',
      blurb: 'One or two sentences about who it became.',
      voice: 'a sharper coaching line, lowercase.',
      evolve: 'What changed in the evolution, and what about your growth it reflects.',
      palette: { g: '#f0c75e' },
      sprites: { idle: [], blink: [], talk: [], happy: [], sleep: [] }, // + think, happy2, sleep2, talk2, fidget, idle2
    },
    {
      name: 'Templarch',
      species: 'ascended reference blob',
      blurb: '…',
      voice: '…',
      evolve: '…',
      palette: {},
      sprites: { idle: [], blink: [], talk: [], happy: [], sleep: [] },
    },
  ],
});
