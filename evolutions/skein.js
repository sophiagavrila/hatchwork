// Skein evolutions — II Purlamb (a ram-lamb in yarn curls with two little spool horns),
// III Warpram (a loom ram: big thread-wound horns, a woven mantle, every strand in its lane).
// Same left-facing sheep as the hatchling: cream face, sky-blue wool, tan ear, loose strand tail.
(function () {
  const mod = (base, m) => base.map((r, i) => {
    if (m[i] === undefined) return r;
    const [x, str] = typeof m[i] === 'string' ? [0, m[i]] : m[i];
    return r.slice(0, x) + str + r.slice(x + str.length);
  });
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  const shift = (base, dy) => base.map((_, y) => base[y - dy] || '.'.repeat(base[0].length));
  const swap = (base, map) => base.map(r => [...r].map(c => map[c] || c).join(''));

  // ── II · Purlamb ────────────────────────────────────────────────────────────
  const idle2 = [
    '........................',
    '..oooo...ooo............',
    '.oHHHHo.oHhho.ooo.ooo...',
    '..onno...ono.olllolllo..',
    '..oppo..oomooblllbbllbo.',
    '.oHhhhoollllllbbbbbybbo.',
    '.olblbllllbbyybbbyybbbdo',
    '.occcccooHobbbyybbbyybdo',
    '.occccccHhHobbbbybbbbydo',
    'occewcccHhobbbyybbbyyddo',
    'occeeccccooyybbbyybbdddo',
    'occcccpcobbbbybbbbybddoy',
    'onccccccsobyybbbyybdddoy',
    'onnccccssobbbyybbdyydo.y',
    '.occcsssoobbbbbyddddo..y',
    '..ooooooo.oddyooddyoo...',
    '.........osoosoodoosoo..',
    '.........oDooDooDooDo...',
  ];
  const W2 = idle2[0].length;
  const blank2 = '.'.repeat(W2);
  const blink2 = mod(idle2, { 9: [3, 'cc'], 10: [3, 'ee'] });
  const talk2a = mod(idle2, { 13: [3, 'm'], 14: [2, 'mm'] });
  const talk2b = mod(idle2, { 14: [2, 'mm'] });
  const happy2a = mod(idle2, { 9: [3, 'cec'], 10: [3, 'ece'], 13: [3, 'm'], 14: [2, 'mm'] });
  const happy2b = [...happy2a.slice(1, 17), happy2a[17].replace(/D/g, '.'), blank2];
  // Fidget: the spools turn (thread stripes swap) and the strand tail flicks up.
  const spin2 = swap(idle2, { n: 'p', p: 'n' });
  const fidget2 = mod(spin2, { 7: [23, 'y'], 8: [23, 'y'], 9: [23, 'y'], 11: [22, 'o.'], 12: [22, 'o.'], 13: [21, 'o..'], 14: [20, 'o...'] });
  const think2 = put(mod(idle2, { 8: [3, 'ew'], 9: [3, 'ee'], 10: [3, 'cc'], 13: [3, 'm'] }), 0, 0, ['zz', '.z', 'z.', '..', 'z.']);
  const settled2 = shift([...mod(blink2, { 15: '..ooooooooooooooooooo...' }).slice(0, 16), blank2, blank2], 2);
  const sleep2a = put(settled2, 0, 0, ['zz', '.z', 'z.', 'zz']);
  const sleep2b = put(settled2, 0, 1, ['zz', '.z', 'z.', 'zz']);

  // ── III · Warpram ───────────────────────────────────────────────────────────
  // Thread-wound horns curl round the ear; a woven mantle (warp p, weft G) hangs over the back with a tasselled hem.
  const idle3 = [
    '............................',
    '.......oooooo...............',
    '......oHHnHHHoo.............',
    '.....oHHHnHHHHHo...ooooo....',
    '....oHHhoooooHHHooopppppo...',
    '....oHholbbbohHHoppprrrppo..',
    '....ohhobbbbomnnorrprrrprMo.',
    '...oooobboobohHHorrprrrprMMo',
    '..olbllbboHobhHHoGGGGGGGGggo',
    '.olblbbbboHhoohHorrprMrprMMo',
    'occcccccoHhnnHHhoMrprMrprMMo',
    'occccccccohmmhhooMrprMrprMMo',
    'occewcccccoooooloGGGGGGGGggo',
    'occeeccccccsolbboMrprMrprMgo',
    'occeeccccccsobbboGGprMrpGgoo',
    'occcccpcccsobbyyboogGGGgoodo',
    'onccccccsssobyybbyGoooooGdo.',
    'onnccccssssoobbybbbyGbGdoo..',
    '.onncssssoo.ooodddddddddoo..',
    '..oooooooo.ossooossooooosso.',
    '...........oDDo.oDDo...oDDo.',
    '............................',
  ];
  const W3 = idle3[0].length;
  const blank3 = '.'.repeat(W3);
  const blink3 = mod(idle3, { 12: [3, 'cc'], 13: [3, 'cc'], 14: [3, 'ee'] });
  const talk3a = mod(idle3, { 17: [3, 'm'], 18: [4, 'mm'] });
  const talk3b = mod(idle3, { 18: [4, 'mm'] });
  const happy3a = mod(idle3, { 12: [3, 'cec'], 13: [3, 'ece'], 14: [3, 'cc'], 17: [3, 'm'], 18: [4, 'mm'] });
  const happy3b = [...happy3a.slice(1, 20), happy3a[20].replace(/D/g, '.'), blank3, blank3].slice(0, 22);
  const think3 = put(mod(idle3, { 11: [3, 'ew'], 12: [3, 'ee'], 13: [3, 'ee'], 14: [3, 'cc'], 18: [4, 'm'] }), 0, 0, ['zz.', '..z', '.z.', '...', '.z.']);
  // Fidget: the thread bands wind one step along each horn and the hem tassels sway.
  const fidget3 = put(mod(idle3, {
    2: [9, 'Hn'], 3: [9, 'Hn'], 6: [13, 'hHH'], 7: [13, 'mnn'], 10: [11, 'hnn'], 11: [11, 'hmm'],
    16: [17, 'Gy'], 17: [19, 'GbGd'],
  }), 24, 16, ['dG']);
  const settled3 = shift([...mod(blink3, { 19: '..ooooooooooooooooooooooo...' }).slice(0, 20), blank3, blank3], 2);
  const sleep3a = put(settled3, 0, 0, ['zzz', '..z', '.z.', 'zzz']);
  const sleep3b = put(settled3, 0, 1, ['zzz', '..z', '.z.', 'zzz']);

  PatchDex.evolve('skein', {
    habit: 'context',
    stages: [
      {
        name: 'Purlamb',
        species: 'spool-horned ram-lamb',
        blurb: 'The wool came in curly once Skein learned to wind loose ends back up. The horns are two spools, one for what matters now and one for later.',
        voice: "that's three threads in one session. pick one and spool the rest.",
        evolve: 'Curls tightened and two spools sprouted, because you started trimming and summarizing context instead of letting it pile up.',
        palette: {},
        sprites: { idle: idle2, blink: blink2, talk: talk2a, talk2: talk2b, happy: happy2a, happy2: happy2b, think: think2, fidget: fidget2, sleep: sleep2a, sleep2: sleep2b },
      },
      {
        name: 'Warpram',
        species: 'loom ram',
        blurb: 'A grand loom ram. Every strand it has ever spun is wound onto its horns or woven into the mantle, in order, with nothing left loose.',
        voice: 'summarize what we know, drop what we do not need, then keep going.',
        evolve: 'The spools grew into curling horns and the loose wool was woven into a mantle, because you kept your context tidy session after session.',
        palette: { r: '#c4627f', M: '#7d3a5c', G: '#f0cd78', g: '#b98a3c' },
        sprites: { idle: idle3, blink: blink3, talk: talk3a, talk2: talk3b, happy: happy3a, happy2: happy3b, think: think3, fidget: fidget3, sleep: sleep3a, sleep2: sleep3b },
      },
    ],
  });
})();
