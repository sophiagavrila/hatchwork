// Ness II–III. Shutterness grows a back arch and a tail flick and hangs a camera off a strap: now it
// collects its own evidence. Lochwarden is the grand loch guardian: a long cream throat, a tartan
// scarf streaming in the wind, a brass magnifier held up in the curl of its tail, mist on the water.
(function () {
  // Stamp rows at x,y; spaces are skipped, '.' erases.
  const put = (base, x, y, art) => base.map((r, j) => {
    const p = art[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== ' ' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  // Faces: 4 rows × 10 px between the head outlines (same face as the hatchling).
  const F = {
    blink: ['Llllllllbd', 'llllllllbd', 'lleelbeebd', 'bbbbbbbbbd'],
    joy: ['Llllllllbd', 'lleelleebd', 'lellbbbbed', 'bbbbbbbbbd'],
    sleep: ['Llllllllbd', 'llllllllbd', 'llllbbbbbd', 'bbeebbeebd'],
    think: ['Lllwellwed', 'llleelleed', 'llleebbeed', 'bbbbbbbbbd'],
    peek: ['Llllllllbd', 'lwelwellbd', 'leelbeebbd', 'beebbeebbd'],
  };
  const Z = ['zzzz', '...z', '..z.', '.z..', 'zzzz'], z = ['zzz', '..z', '.z.', 'zzz'];
  const Q = ['yyy', '...y', '.yy', '.y', '', '.y'];
  // Drop everything above `row` by 1px, removing that row: the body settles lower in the water.
  const sink = (base, row) => ['.'.repeat(base[0].length), ...base.slice(0, row), ...base.slice(row + 1)];

  // ── II · Shutterness ──────────────────────────────────────────────────────────────
  const a = [
    '......oo..oo.............',
    '.....oLlooldo............',
    '.....oLlooldo............',
    '....oLLllllbdo...........',
    '...oLLllllllbdo..........',
    '...oLlllllllbdo..........',
    '...ollwellwebdo..........',
    '...olleelbeebdo..........',
    '...obbeebbeebdo..........',
    '...obpbccccbpdo..........',
    '....odbcmmcbdoooooo......',
    '.....oddccddooLLlllo...oo',
    '..oyooooobbdoLLllbbdo.oLo',
    '.oKKkkKKnnNnnlbbsbbdo.olo',
    '.oKkxwkKobbdobdoodbdooldo',
    '.oKkxxkKobbdodo..obdobdo.',
    '.oooooooobbdodo..obdodo..',
    '.uiiifiiiirrrrrrrrrrrrfiu',
    'uuiuuuuuurrrruuurrrrriuuu',
    'auuuuuuuuurrruuuurrrruuua',
    'aauuuuuuuuuuuuuuuuuuuuuaa',
  ];
  const aFace = (base, rows) => put(base, 4, 5, rows);
  // Tail flick: the tip leans back.
  const aFlick = base => put(base, 21, 11, ['.oo.', 'oLo.', 'olo.']);
  const aWater = base => put(base, 0, 17, ['.uiiiifiiirrrrrrrrrrrrrfi', 'uiuuuuuuurrrrruuurrrrruiu']);
  const aIdle2 = aFlick(aWater(a));
  const aBlink = aFace(a, F.blink);
  const aTalk = put(a, 8, 10, ['mm', 'mm']);
  const aTalk2 = put(a, 7, 10, ['mmmm']);
  const aHappy = put(aFace(a, F.joy), 7, 10, ['mmmm', ' pp ']);
  // Snap! The flash bulb goes off.
  const aHappy2 = put(put(aFlick(aHappy), 0, 9, ['y..y', '.yy', 'y']), 3, 12, ['w']);
  const aSleepBase = sink(put(aFace(a, F.sleep), 8, 10, ['cm']), 16);
  const aSleep = put(put(aSleepBase, 19, 1, Z), 16, 6, z);
  const aSleep2 = put(put(aSleepBase, 18, 0, Z), 21, 6, z);
  const aThink = put(put(aFace(a, F.think), 7, 10, ['ccmc']), 17, 1, Q);
  // Peeks sideways at the camera, lens glinting.
  const aFidget = put(aFlick(aFace(a, F.peek)), 3, 14, ['wx', 'xw']);

  // ── III · Lochwarden ──────────────────────────────────────────────────────────────
  const b = [
    '.......oo..oo.........oooo..',
    '......oLlooldo.......oBBBBo.',
    '......oLlooldo......oBxwxxAo',
    '.....oLLllllbdo.....oBwxxxAo',
    '....oLLllllllbdo....oBxxxxAo',
    '....oLlllllllbdo....oBxxxxAo',
    '....ollwellwebdo.....oAAAAo.',
    '....olleelbeebdo......oooAo.',
    '....obbeebbeebdo........oAo.',
    '....obpbccccbpdo.......oLAlo',
    'QMMQ.odbcmmcbdo.......oLlbdo',
    '......oddccddoooooo...olbbdo',
    '.....otjtTtjtToLlllo...obdo.',
    '....otTyTtTyTTollbbdo..obdo.',
    '...otTtocbbbdobsbbbdoooobdo.',
    '..otTtoccbbbdobbsbbdolbodo..',
    '.otTtooccbbbdodoodbdobsdoo..',
    'Qyty..occbbbdoo..obdoobdooQ.',
    'QMMMQ.ocQMMQdoo..obdo.obooM.',
    'uiiifiiirrrrrrrrrrrrrrrrfiiu',
    'uuiuuuuuurrrruuurrrrrrruuiuu',
    'auuuuuuuuuurrruuuurrrruuuuua',
  ];
  const bFace = (base, rows) => put(base, 5, 5, rows);
  // The scarf ends catch the wind and stream further out.
  const bFlutter = base => put(base, 0, 14, ['otTtTto', 'yoooo.o', '......o', 'Q.....o']);
  const bWater = base => put(base, 0, 19, ['uiiiifiiirrrrrrrrrrrrrrrrfiu', 'uiuuuuuuuurrrruuurrrrrrruuiu']);
  const bGlint = base => put(base, 22, 2, ['xxwx', 'xxxw']);
  const bIdle2 = bFlutter(bWater(b));
  const bBlink = bFace(b, F.blink);
  const bTalk = put(b, 9, 10, ['mm', 'mm']);
  const bTalk2 = put(b, 8, 10, ['mmmm']);
  const bHappy = put(bFace(b, F.joy), 8, 10, ['mmmm', ' pp ']);
  // Found it: the lens flares.
  const bHappy2 = put(bFlutter(bGlint(bHappy)), 17, 0, [' y ', 'ywy', ' y ']);
  const bSleepBase = sink(put(bFace(b, F.sleep), 9, 10, ['cm']), 18);
  const bSleep = put(put(bSleepBase, 16, 1, Z), 1, 3, z);
  const bSleep2 = put(put(bSleepBase, 16, 0, Z), 0, 4, z);
  const bThink = put(put(bGlint(bFace(b, F.think)), 8, 10, ['ccmc']), 16, 1, Q);
  const bFidget = bFlutter(bGlint(bFace(b, F.peek)));

  PatchDex.evolve('ness', {
    habit: 'research',
    stages: [
      {
        name: 'Shutterness',
        species: 'shutterbug loch plesiosaur',
        blurb: 'Tired of being the blurry photo, Shutterness bought a camera and started taking its own. Every claim gets a picture: the file, the line, the output, timestamped.',
        voice: "pics or it didn't happen. paste the command and what it printed.",
        evolve: 'Its back rose into a proper arch and a camera now hangs from its neck. You stopped trusting claims and started collecting the evidence yourself.',
        palette: {
          s: '#3f9a80', // back dapples
          k: '#272a36', K: '#7d86a3', x: '#9fd8ee', // camera body, faceplate, lens
          n: '#9a5a32', N: '#c27a45', // leather strap
        },
        sprites: {
          idle: a, idle2: aIdle2, blink: aBlink, talk: aTalk, talk2: aTalk2, happy: aHappy, happy2: aHappy2,
          sleep: aSleep, sleep2: aSleep2, think: aThink, fidget: aFidget,
        },
        loop: [
          ['idle', 14], ['idle2', 6], ['idle', 10], ['blink', 2], ['idle', 10], ['fidget', 10],
          ['idle2', 6], ['idle', 8], ['blink', 2], ['think', 12], ['idle', 8], ['happy2', 4], ['idle', 10],
        ],
      },
      {
        name: 'Lochwarden',
        species: 'grand loch guardian',
        blurb: 'The loch has been searched for a century and Lochwarden is still the only one who checked the sources. It holds the lens up to every claim, and the mist does not get to hide anything.',
        voice: 'i read the code. you read the docs. let us compare notes, with line numbers.',
        evolve: 'A long neck rose out of the mist with a tartan scarf and a brass magnifier curled in its tail. Research is your habit now: you look before you leap, and you cite what you saw.',
        palette: {
          t: '#b5333d', T: '#6e1d2b', j: '#2f5d3c', // tartan; y draws its gold line
          s: '#3f9a80', // back dapples
          B: '#e0b65a', A: '#8a6030', x: '#9fd8ee', // brass rim, handle, lens glass
          M: '#c9d6e0', Q: '#8ea4b8', // loch mist
        },
        sprites: {
          idle: b, idle2: bIdle2, blink: bBlink, talk: bTalk, talk2: bTalk2, happy: bHappy, happy2: bHappy2,
          sleep: bSleep, sleep2: bSleep2, think: bThink, fidget: bFidget,
        },
        loop: [
          ['idle', 14], ['idle2', 8], ['idle', 10], ['blink', 2], ['idle', 8], ['fidget', 10],
          ['idle2', 8], ['idle', 8], ['blink', 2], ['think', 12], ['idle', 10], ['idle2', 8],
        ],
      },
    ],
  });
})();
