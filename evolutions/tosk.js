// Tosk evolutions — II Skurrier (capped courier, satchel bulging with scrolls), III Ashrunner (leaf-hooded world-tree courier with a rune satchel, eagle feather and dragon scale).
(function () {
  // Replace rows by index; ' ' keeps the pixel underneath.
  const mod = (base, m) => base.map((r, i) => (m[i] === undefined ? r : [...r].map((c, x) => (m[i][x] === undefined || m[i][x] === ' ' ? c : m[i][x])).join('')));
  // Stamp a patch at x,y. '.' and ' ' keep; ',' clears to transparent.
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && ch !== ' ' && a[x + i] !== undefined) a[x + i] = ch === ',' ? '.' : ch; }); return a.join('');
  });
  // Drop everything above `row` by 1px (breath / slump).
  const sink = (base, row) => ['.'.repeat(base[0].length), ...base.slice(0, row), ...base.slice(row + 1)];
  // Shift the block x0..x1-1, rows 0..y1-1 down by 1 (tail dip), leaving the rest alone.
  const dip = (base, x0, x1, y1) => base.map((r, y) => (y >= y1 ? r : [...r].map((c, x) => (x < x0 || x >= x1 ? c : y === 0 ? '.' : base[y - 1][x])).join('')));
  const at = (x, s) => ' '.repeat(x) + s;
  const Z = ['zz', '.z', 'z.', 'zz'];

  // ── II · Skurrier ───────────────────────────────────────────────────────────
  const idle2a = [
    '...ooooo..........oo.....',
    '..oTTTTTo..o.....oFFoo...',
    '.oTThhhtTooDo.oooFfooDo..',
    'oTThhtttdTohpoQQqfqopdo..',
    'oThhtddoTTohboQqqqjobdo..',
    'oThtdddohTohorrrrrrRodo..',
    'oThttdddooohbojjjjjjjjjo.',
    'oTthtttdddohbbbbbbbbbdo..',
    'oTtthttdddohbwebbbwebdo..',
    'oTttooooooobbeebbbeebddo.',
    'oTttowwrcoobbeeccceebddo.',
    '.oTtoCCRCoobpcccncccpdo..',
    '.ooooooooooodCccCccCdo...',
    '..owwcrcccCohCCCCCCggdo..',
    '..oCCCRCCCCobccccggCbdo..',
    '..oAAAAAAAAAoccggccCbdo..',
    '.oAaaaaaaaagoccccCCbddo..',
    '.oagggkkgggaoCcCCCbbdDo..',
    '.oaaaaaaaaggobbbbbbddDo..',
    '..oggggggggghhdoohhbdDo..',
    '.oooooooooooooooooooooo..',
  ];
  const s2 = (() => {
    const idle = idle2a;
    const blink = mod(idle, { 8: at(13, 'bbbbbbb'), 9: at(13, 'bbbbbbb') });
    const happyFace = { 8: at(13, 'bbbbbbb'), 10: at(12, 'ebbecebbe') };
    const talk = mod(idle, { 12: at(16, 'D') });
    const talk2 = mod(idle, { 12: at(15, 'DpD'), 13: at(16, 'D') });
    const happy = mod(idle, { ...happyFace, 12: at(15, 'DpD') });
    const flick = rows => dip(rows, 0, 10, 8);
    const happy2 = flick(happy);
    const sleepBase = sink(blink, 13);
    const sleep = put(put(sleepBase, 23, 1, Z), 23, 6, ['z']);
    const sleep2 = put(sleepBase, 23, 2, Z);
    const think = put(mod(idle, { 8: at(13, 'bwebbbwe'), 9: at(13, 'beebbbee'), 10: at(13, 'beecccee') }), 12, 0, ['w.w.w']);
    const fidget = put(flick(idle), 11, 1, [',o']);
    const idle2 = sink(idle, 13);
    return { idle, idle2, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget };
  })();

  // ── III · Ashrunner ─────────────────────────────────────────────────────────
  const idle3a = [
    '....ooooolvoo.........oo.oo.',
    '..ooTTTTTovDDo.......oDDoiMo',
    '.oTTThhhhTohpooooooooopoiIo.',
    'oTThhhttttToVvVVvVVvVVviIo..',
    'oThhtttdddovlvvlvvlvvlvvo...',
    'oThttddDDoVVohhhhhhhhhoVvo..',
    'oThtddDoholvobbbbbbbbbovvo..',
    'oThtdddooovVobwebbbweboVVo..',
    'oTthtttddovvobeebbbeebovlo..',
    'oTtthtttdoVVobeeccceeboVvo..',
    'oTttthtttolvopcccncccpovvo..',
    '.oTttthttovVVvoCcCcCoVvVVo..',
    '.oTtttthtovvlvvoSo.ovlvvlo..',
    '..oTttttovVVvohcMcccdoVVvVo.',
    '..oTtttovvlvvohccMccdolvvlvo',
    '...oTttoVVvVVobcccMCoooooooo',
    '....oTtovlvvlobccCCoMMMyMMMo',
    '....ooooVvVVvobbCCComMyYxMmo',
    '.......ovvlvvobbbbbomsmxmsmo',
    '.......oVVvVVohhdodoSmsmsmSo',
    '.......o.o.o.ohhdodhoooooooo',
    '.............ooooooooo......',
  ];
  const s3 = (() => {
    const idle = idle3a;
    const blink = mod(idle, { 7: at(14, 'bbbbbbb'), 8: at(14, 'bbbbbbb') });
    const happyFace = { 7: at(14, 'bbbbbbb'), 9: at(13, 'ebbecebbe') };
    const talk = mod(idle, { 11: at(17, 'D') });
    const talk2 = mod(idle, { 11: at(16, 'DpD') });
    const happy = mod(idle, { ...happyFace, 11: at(16, 'DpD') });
    const flick = rows => dip(rows, 0, 10, 9);
    const happy2 = flick(happy);
    const sleepBase = sink(blink, 12);
    const sleep = put(put(sleepBase, 26, 6, Z), 26, 11, ['z']);
    const sleep2 = put(sleepBase, 26, 7, Z);
    const think = put(mod(idle, { 7: at(14, 'bwebbbwe'), 8: at(14, 'beebbbee'), 9: at(14, 'beecccee') }), 15, 0, ['w.w.w']);
    const fidget = put(flick(idle), 11, 0, [',.o']);
    const idle2 = sink(idle, 12);
    return { idle, idle2, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget };
  })();

  PatchDex.evolve('tosk', {
    habit: 'autonomy',
    stages: [
      {
        name: 'Skurrier',
        species: 'capped courier squirrel',
        blurb: 'Tosk earned a messenger cap and a satchel so full of scrolls the flap will not close. Every scroll is written for a reader who was not in the room.',
        voice: 'say what done looks like, and what you want sent back.',
        evolve: 'A cap, a feather, and a satchel bulging with sealed scrolls: your handoffs stopped coming back with questions because each one carried its own context.',
        palette: {
          q: '#3f6f8a', Q: '#7fb0c8', j: '#24405a', r: '#d0473a', R: '#8e2a2a',
          F: '#f4f6fb', f: '#a9b6cc',
        },
        sprites: s2,
        loop: [
          ['idle', 18], ['idle2', 6], ['idle', 10], ['blink', 2], ['idle', 12], ['fidget', 2], ['idle', 2], ['fidget', 2],
          ['idle', 14], ['idle2', 6], ['idle', 8], ['blink', 2], ['idle', 2], ['blink', 2], ['idle', 12], ['think', 10], ['idle', 8],
        ],
      },
      {
        name: 'Ashrunner',
        species: 'world-tree courier',
        blurb: 'The courier of the whole tree, hooded in leaves, with an eagle feather from the crown and a dragon scale from the roots. It runs the full height and loses nothing on the way.',
        voice: 'one clear brief beats ten follow-ups. pack it, then let go.',
        evolve: 'A hood of leaves, a rune-marked satchel, tokens from both ends of the tree: you split work cleanly, brief each runner fully, and trust what comes back.',
        palette: {
          v: '#5f9e4a', V: '#3d6b34', l: '#a6d46a',
          y: '#2f8f84', Y: '#7fd6c4', x: '#1f5a55',
          s: '#f7e3a0', S: '#c9a04a', m: '#8a5a3a', M: '#5a3a26',
          i: '#e3ecf7', I: '#9aa8bd',
        },
        sprites: s3,
        loop: [
          ['idle', 20], ['idle2', 6], ['idle', 10], ['blink', 2], ['idle', 14], ['fidget', 2], ['idle', 2], ['fidget', 2],
          ['idle', 16], ['idle2', 6], ['idle', 8], ['blink', 2], ['idle', 2], ['blink', 2], ['idle', 12], ['think', 10], ['idle', 8],
        ],
      },
    ],
  });
})();
