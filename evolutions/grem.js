// Grem's later forms. II Edgrin: goggles down, toolbelt on, hefting a full-size wrench.
// III Haywing: the elder chaos engineer, a propeller rig of gears and dials on its back.
(function () {
  const helpers = W => ({
    mod: (base, m) => base.map((r, i) => (m[i] === undefined ? r : m[i])),
    put: (base, x, y, rows) => base.map((r, j) => {
      const p = rows[j - y]; if (p === undefined) return r;
      const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
    }),
    sink: (base, row) => ['.'.repeat(W), ...base.slice(0, row), ...base.slice(row + 1)],
    lift: base => [...base.slice(1), '.'.repeat(W)],
    // Move columns x0..x1 of rows y0..y1 by dy (ear perks, wrench taps).
    shift: (base, x0, x1, y0, y1, dy) => {
      const g = base.map(r => [...r]);
      for (let x = x0; x <= x1; x++) {
        const col = base.map(r => r[x]);
        for (let y = y0; y <= y1; y++) g[y][x] = '.';
        for (let y = y0; y <= y1; y++) { const ny = y + dy; if (ny >= 0 && ny < g.length && col[y] !== '.') g[ny][x] = col[y]; }
      }
      return g.map(r => r.join(''));
    },
  });

  // ---- II · Edgrin ----
  const A = [
      '.......o.........o.......',
      '.o....oio.......oio....o.',
      'oLoo..oiIoooooooIio..oogo',
      'oLLLo.ooIhhhcccCIoo.ogggo',
      'odpLLohhhhhhcccCCCCoggpdo',
      '.odpgchhhhhcccccCCCCgpdo.',
      '.odpgggyyygggggyyygdpdo..',
      '..odgCynweyYYYynweyCgdo..',
      '...odgyNeeygggyNeeYddo...',
      '.o..oggYYYgggggYYYddo....',
      'os..SoLrgggggggggrddo....',
      'os..Sopgtttttttttdpdo....',
      'ossSSogggtrrrrrtddddo....',
      '.osSooLggggggggddddooo...',
      'ogLgggqqqqqqqqqqQQQQQQo..',
      '.osSggLLgggggggggdddqQo..',
      '.osSooCcccccyYccchcdoo...',
      '.osSo.oggggggggdhCCo.....',
      '.osSo.oLgggoooogdddo.....',
      'osSSSoDDDDDo.oDDDDDo.....',
      '.oooo.ooooo...ooooo......',
  ];
  // Ears perked (both), and just the right one.
  const A2 = [
      '.o.....o.........o.....o.',
      'oLo...oio.......oio...ogo',
      'oLLo..oiIoooooooIio..oggo',
      'odLLo.ooIhhhcccCIoo.oggdo',
      'odpLLohhhhhhcccCCCCoggpdo',
      '.odpgchhhhhcccccCCCCgpdo.',
      '.odpgggyyygggggyyygdpdo..',
      '..odgCynweyYYYynweyCgdo..',
      '...odgyNeeygggyNeeYddo...',
      '.o..oggYYYgggggYYYddo....',
      'os..SoLrgggggggggrddo....',
      'os..Sopgtttttttttdpdo....',
      'ossSSogggtrrrrrtddddo....',
      '.osSooLggggggggddddooo...',
      'ogLgggqqqqqqqqqqQQQQQQo..',
      '.osSggLLgggggggggdddqQo..',
      '.osSooCcccccyYccchcdoo...',
      '.osSo.oggggggggdhCCo.....',
      '.osSo.oLgggoooogdddo.....',
      'osSSSoDDDDDo.oDDDDDo.....',
      '.oooo.ooooo...ooooo......',
  ];
  const A3 = [
      '.......o.........o.....o.',
      '.o....oio.......oio...ogo',
      'oLoo..oiIoooooooIio..oggo',
      'oLLLo.ooIhhhcccCIoo.oggdo',
      'odpLLohhhhhhcccCCCCoggpdo',
      '.odpgchhhhhcccccCCCCgpdo.',
      '.odpgggyyygggggyyygdpdo..',
      '..odgCynweyYYYynweyCgdo..',
      '...odgyNeeygggyNeeYddo...',
      '.o..oggYYYgggggYYYddo....',
      'os..SoLrgggggggggrddo....',
      'os..Sopgtttttttttdpdo....',
      'ossSSogggtrrrrrtddddo....',
      '.osSooLggggggggddddooo...',
      'ogLgggqqqqqqqqqqQQQQQQo..',
      '.osSggLLgggggggggdddqQo..',
      '.osSooCcccccyYccchcdoo...',
      '.osSo.oggggggggdhCCo.....',
      '.osSo.oLgggoooogdddo.....',
      'osSSSoDDDDDo.oDDDDDo.....',
      '.oooo.ooooo...ooooo......',
  ];
  const a = (() => {
    const { put, sink, lift, shift } = helpers(A[0].length);
    const idle = A;
    // Pupils behind the lenses: [left x, right x] at rows 7..8.
    const eyes = (b, top, bot) => put(put(b, 7, 7, [top, bot]), 15, 7, [top, bot]);
    const blink = eyes(idle, 'nNN', 'eee');
    const talk = put(idle, 8, 11, ['ttrrrrrtt', '.trrprrt']);
    const happy = put(eyes(idle, 'eee', 'eNe'), 8, 11, ['ttttttttt', '.rrrprrr', '..rrrrr']);
    const happy2 = shift(lift(happy), 0, 4, 9, 19, -1);
    const closed = put(blink, 7, 10, ['g.........g', '.gggrrrggg', '..ggggggg']);
    // Asleep: sunk a pixel, right ear flops down out of the way of the z's.
    const sleepy = shift(sink(closed, 13), 20, 24, 0, 9, 2);
    const sleep = put(sleepy, 19, 0, ['zzz', '..z', '.z.', 'zzz']);
    const sleep2 = put(sleepy, 22, 1, ['zz', '.z', 'zz']);
    const think = put(put(eyes(idle, 'nNe', 'NNN'), 7, 10, ['g', '.gggrrrrrg', '..ggggggg']), 10, 0, ['y.y.y']);
    const fidget = shift(A3, 0, 4, 9, 20, -1);
    const idle2 = A2;
    return { idle, idle2, blink, talk, talk2: idle, happy, happy2, sleep, sleep2, think, fidget };
  })();

  // ---- III · Haywing ----
  const B = [
      '.oooooooooooooooooooo.......',
      'ohhhhhhhhyyYYcccccccco......',
      '.ooooioooYsSYoooioooo.......',
      '.o.oiIoooosSooooIio.o.......',
      'oWo.oiIhhhhcccCIio.oWo......',
      'oLWoohhyyccccyyCCooWgo......',
      'oLLLLhynNyCCynNYCggggo......',
      'odppLccyYcCCCYYCCgppdo......',
      '.odpggWWWggggWWWdgpdo.o.....',
      '.oddggLweggggwedddddooyoo...',
      '..odgggeegddgeedddooyyyyYo..',
      '...ogprggggggggrpdooyYDYYo..',
      '...oggrttttttttrddoyyD.DYYo.',
      '.oo.oggrrrpprrrddo.oyYDYYo..',
      'oqQoooggggWWddddo..oYYYYYo..',
      'qqqQqqqqqqqqqQQQQoo.ooYyoYo.',
      'oQQgghhccccccccCCggo.oyyyYYo',
      '.ooLohcccccyccCCCgLoo.oy.Yo.',
      '...ooCCCCyYCCCCCCoosSoyYYYYo',
      '.....oggdoooogddo..osSSYoYo.',
      '....oDDDDo..oDDDDo.os.So.o..',
      '.....oooo....oooo...o.o.....',
  ];
  // Same pose, prop blurred mid-spin.
  const B2 = [
      '...oo.oooooooooo.oo.........',
      '..ozzohhhyyYYcccozzo........',
      '...ooioooYsSYoooioo.........',
      '.o.oiIoooosSooooIio.o.......',
      'oWo.oiIhhhhcccCIio.oWo......',
      'oLWoohhyyccccyyCCooWgo......',
      'oLLLLhynNyCCynNYCggggo......',
      'odppLccyYcCCCYYCCgppdo......',
      '.odpggWWWggggWWWdgpdoo......',
      '.oddggLweggggwedddddoyooo...',
      '..odgggeegddgeedddooyyyyYo..',
      '...ogprggggggggrpdooyYDYYYo.',
      '...oggrttttttttrddooyD.DYo..',
      'oo..oggrrrpprrrddooyyYDYYo..',
      'qQooooggggWWddddo..oYYYYYo..',
      'qqqQqqqqqqqqqQQQQoo.oooYyo..',
      'ooQgghhccccccccCCggo..oyyYo.',
      '..oLohcccccyccCCCgLoooyy.YYo',
      '...ooCCCCyYCCCCCCoosSooYYYo.',
      '.....oggdoooogddo..osSSoYo..',
      '....oDDDDo..oDDDDo.os.Soo...',
      '.....oooo....oooo...o.o.....',
  ];
  const b = (() => {
    const { mod, put, sink, lift, shift } = helpers(B[0].length);
    const idle = B, idle2 = B2;
    // Eyes are 2x2 at x7 and x13 (rows 9..10); mouth rows 11..13.
    const eyes = (base, l, r) => put(put(base, 6, 9, l), 12, 9, r);
    const blink = eyes(idle, ['.gg.', '.ee.'], ['.gg.', '.ee.']);
    const talk = put(idle, 7, 13, ['ggrrrrgg']);
    const happyFace = base => put(eyes(base, ['.ee.', 'egge'], ['.ee.', 'eggg']), 7, 13, ['rrrpprrr']);
    const happy = put(happyFace(idle), 15, 10, ['e']);
    const happy2 = lift(put(happyFace(idle2), 15, 10, ['e']));
    const shut = base => put(base, 6, 11, ['g........g', '.gggggggg', '.ggrrrrgg']);
    const sleepy = sink(shut(blink), 13);
    const sleep = put(sleepy, 22, 1, ['zzz', '..z', '.z.', 'zzz']);
    const sleep2 = put(sleepy, 24, 3, ['zz', '.z', 'zz']);
    const think = put(put(eyes(idle, ['.ge.', '.gg.'], ['.ge.', '.gg.']), 7, 13, ['gggrrrgg']), 23, 2, ['yyy', '..y', '.y.', '...', '.y.']);
    const fidget = shift(idle2, 19, 22, 17, 21, -1);
    return { idle, idle2, blink, talk, talk2: idle, happy, happy2, sleep, sleep2, think, fidget };
  })();

  PatchDex.evolve('grem', {
    habit: 'verification',
    stages: [
      {
        name: 'Edgrin',
        species: 'test-bench gremlin',
        blurb: 'Grem traded sabotage for a test bench: goggles down, toolbelt cinched, and a wrench bigger than its arm for knocking on every weld.',
        voice: 'works on your machine. now try it on a plane with no wifi.',
        evolve: 'Goggles came down and a toolbelt went on: you stopped poking at code for fun and started planning the cases that break it.',
        palette: {},
        sprites: a,
        loop: [
          ['idle', 14], ['idle2', 6], ['idle', 10], ['blink', 2], ['idle', 12], ['fidget', 3], ['idle', 3], ['fidget', 3],
          ['idle', 12], ['idle2', 6], ['idle', 8], ['blink', 2], ['idle', 8], ['think', 10], ['idle', 8],
        ],
      },
      {
        name: 'Haywing',
        species: 'chaos-rig gremlin',
        blurb: 'An old hangar gremlin with white brows, a rotor on its cap and a backpack of gears it is always loosening on purpose.',
        voice: "let's pull a plug in staging and see who notices first.",
        evolve: 'A rotor sprouted and the gears started turning: you break things on purpose now, in a safe place, before your users can.',
        palette: { W: '#e6e9ec' },
        sprites: b,
        loop: [
          ['idle', 3], ['idle2', 3], ['idle', 3], ['idle2', 3], ['idle', 3], ['idle2', 3], ['blink', 2], ['idle2', 3],
          ['idle', 3], ['idle2', 3], ['fidget', 3], ['idle', 3], ['fidget', 3], ['idle2', 3], ['idle', 3], ['idle2', 3],
          ['think', 10], ['idle', 3], ['idle2', 3], ['idle', 3], ['idle2', 3],
        ],
      },
    ],
  });
})();
