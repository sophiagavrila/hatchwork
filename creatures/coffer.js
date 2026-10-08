// Coffer — the rare researcher. A baby mimic: a little oak treasure chest with iron bands, a brass lock,
// and two big glowing eyes peeking out of the dark gap under its lid. Light from the top-left.
(function () {
  const W = 20, H = 18;
  // ---- parts (chest is 18 px wide; sprites pad it to 20 so z's and glints have room) ----
  const LID = [
    '....oooooooooo....',
    '..ooillllllllIoo..',
    '.oliIlllllbbbiIbo.',
    '.obiIbbdbbbbdiIdo.',
    '.odiIbdbbbbddjIDo.',
    'oiiiiiiiiiiiiiiIIo',
  ];
  const BASE = [
    '.oiiiiiiiiiiiiIIo.',
    '.oliIllyyygbbiIdo.',
    '.obiIbdgkkGdbiIdo.',
    '.odjIddGGGGddjIDo.',
    '..oooooooooooooo..',
    '...oDo......oDo...',
  ];
  // Eyes: 4×4, ring lit top-left (e → E → h), slit pupil and a white catchlight.
  const EYE = {
    open: ['.eE.', 'ewpE', 'EEph', '.hh.'],
    up: ['.ep.', 'ewpE', 'EEEh', '.hh.'],
    left: ['.eE.', 'pwEE', 'pEEh', '.hh.'],
    shut: ['....', '....', 'eEEh', '....'],
    happy: ['....', '.eE.', 'e..h', '....'],
    sleep: ['....', '....', 'hhhh', '....'],
  };
  const FANG_L = ['tT', 'tk', 'kk', 'kk'], FANG_R = ['tT', 'kT', 'kk', 'kk'];
  const row = s => '.o' + s + 'o.';
  // gap rows: fang + left eye + middle + right eye + fang (14 interior px); `mid` stamps the middle two columns
  const eyes = (L, R = L, mid = []) => [0, 1, 2, 3].map(j =>
    row((FANG_L[j] + EYE[L][j] + (mid[j] || 'kk') + EYE[R][j] + FANG_R[j]).replace(/\./g, 'k')));
  const pad = r => '.' + r + '.';
  // build a sprite: lid, gap rows, base; dy lifts the whole chest (hop); headroom fills the top.
  function chest(gap, { base = BASE, lid = LID, dy = 0 } = {}) {
    const rows = [...[...lid, ...gap, ...base].map(pad), ...Array(dy).fill('.'.repeat(W))];
    while (rows.length < H) rows.unshift('.'.repeat(W));
    return rows.slice(rows.length - H);
  }
  const put = (base, x, y, art) => base.map((r, j) => {
    const p = art[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && a[x + i] !== undefined) a[x + i] = ch; }); return a.join('');
  });
  const dark = (mid = 'kk') => row('kkkkkk' + mid + 'kkkkkk');
  const rim = mid => row('iiiiii' + mid + 'iiiiII');
  const S = {};
  S.idle = chest(eyes('open'));
  // breathing: the lid (and the eyes under it) lifts a pixel; the mouth gap widens
  S.idle2 = chest([...eyes('open'), dark()]);
  S.blink = chest(eyes('shut'));
  S.talk = chest([...eyes('open'), dark('nn')]);
  S.talk2 = chest(eyes('open', 'open', [, , , 'nN']));
  // happy: lid flips up, eyes squeeze into arcs, tongue lolls out over the rim
  S.happy = chest([...eyes('happy', 'happy', [, , 'kk', 'nn']), dark('nN')], { base: [rim('nN'), ...BASE.slice(1)] });
  S.happy2 = chest([...eyes('happy', 'happy', [, , 'kk', 'nn']), dark('nN')], { base: [rim('nN'), ...BASE.slice(1, 5), '..................'], dy: 1 });
  // sleep: lid shut, it is just a chest again (mostly). Fangs poke out under the rim.
  const shut = [row('tTkkkkkkkkkktT'), row('kkhhhhkkhhhhkk')];
  const Z = ['zzz', '..z', '.z.', 'zzz'];
  S.sleep = put(put(chest(shut), 16, 1, Z), 15, 0, ['Z']);
  S.sleep2 = put(put(chest(shut), 17, 0, Z), 14, 3, ['Z']);
  S.think = put(chest([...eyes('up'), dark()]), 17, 0, ['yy.', '..y', '.y.', '...', '.y.']);
  S.fidget = chest([...eyes('left', 'left', [, , , 'nN']), dark('nn')]);

  PatchDex.register({
    id: 'coffer',
    name: 'Coffer',
    species: 'baby treasure mimic',
    rarity: 'rare',
    habit: 'research',
    blurb: 'A little oak chest that knows exactly how tempting it looks. It has bitten enough adventurers to respect anyone who checks first.',
    coaching: 'Hallucination checks: before you trust a function, flag, CLI option or package the agent mentions, prove it exists (grep the repo, open the docs, read the lockfile).',
    voice: 'shiny api, huh? grep for it before you reach in.',
    hatch: 'The shell falls away from a tiny chest that glints, creaks open on a pile of gold, then shows two eyes, teeth and a tongue, CHOMPS, and hops toward you.',
    palette: {
      o: '#2a1622', O: '#5a3328',
      l: '#e3a865', b: '#b9713c', d: '#874828', D: '#5c2e1f',
      i: '#a9abc2', I: '#6c6d88', j: '#46465f',
      y: '#ffe48a', g: '#eab03f', G: '#a7701f',
      k: '#1b0f22',
      e: '#fff3a6', E: '#ffd23f', h: '#d48a1e', p: '#2b1233', w: '#ffffff',
      t: '#fff5e4', T: '#cdb8a0',
      n: '#ff7c9c', N: '#c7406a',
      z: '#d9d2ff', Z: '#8f86c9',
    },
    sprites: S,
    loop: [
      ['idle', 18], ['idle2', 10], ['idle', 12], ['blink', 2], ['idle', 8], ['idle2', 10], ['idle', 14],
      ['fidget', 8], ['idle', 6], ['blink', 2], ['idle2', 10], ['idle', 10], ['think', 10],
    ],
    entrance(k) {
      const EX = k.eggHome.x, EY = k.eggHome.y;
      // The tiny chest inside the egg (10 px wide). Lid, then whatever is in the gap, then the base.
      const mLid = ['..oooooo..', '.olllllbo.', 'olbbdbbddo', 'oiiiiiiiIo'];
      const mBase = ['olbbygbbdo', 'odddGGdDDo', '.oooooooo.', '..oD..oD..'];
      const mGap = {
        shut: [],
        creak: ['okyyyyygko'],
        gold: ['oyyyyyyygo', 'oygGyygGgo'],
        gold2: ['oygyyyGygo', 'oGgygGyggo'],
        eyes: ['okEwkkEwko', 'okhpkkhpko', 'oygGyygGgo'],
        teeth: ['otkkkkkkTo', 'okEwkkEwko', 'okhpnnhpko', 'oygGnNgGgo'],
        lick: ['otkkkkkkTo', 'okhhkkhhko', 'okkknnkkko', 'oygnnNgGgo'],
      };
      const mini = gap => [...mLid, ...mGap[gap], ...mBase];
      const MX = EX + 1, FLOOR = k.H;
      const drawMini = (g, gap, lift = 0, o) => { const r = mini(gap); return k.stamp(g, r, MX, FLOOR - r.length - lift, o); };
      // squash: drop the lid's middle row so the chest crunches down
      const squashMini = gap => { const r = mini(gap); return r.filter((_, i) => i !== 2); };
      // egg pieces: the top flies up and off; the bottom splits and falls to either side
      const top = (g, t) => k.stamp(g, k.EGG_TOP, EX + 2 * t, EY - 4 * t, t > 1 ? { flipX: true } : {});
      const bottom = (g, t = 0) => {
        if (!t) return k.stamp(g, k.EGG_BOTTOM, EX, EY);
        const L = k.EGG_BOTTOM.map(r => r.slice(0, 6)), R = k.EGG_BOTTOM.map(r => r.slice(6));
        k.stamp(g, L, EX - 3 * t, EY + 2 * t, t > 1 ? { flipX: true } : {});
        return k.stamp(g, R, EX + 6 + 3 * t, EY + 2 * t, t > 1 ? { flipX: true } : {});
      };
      // a four-point glint
      const glint = (g, x, y, big) => {
        k.px(g, x, y, 'w');
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([a, b]) => k.px(g, x + a, y + b, '7'));
        if (big) [[2, 0], [-2, 0], [0, 2], [0, -2]].forEach(([a, b]) => k.px(g, x + a, y + b, 'y'));
        return g;
      };
      // gold light spilling up out of the open lid
      const shine = (g, n, y0) => {
        (n % 2 ? [[11, 0], [14, -1], [17, 0], [12, -3], [16, -3]] : [[10, -1], [13, -2], [15, 0], [18, -1], [14, -4]])
          .forEach(([x, y]) => k.px(g, x, y0 + y, n % 2 ? '7' : 'y'));
        return g;
      };
      const chompLines = g => { [[7, 15], [6, 17], [20, 15], [21, 17], [8, 13], [19, 13]].forEach(([x, y]) => k.px(g, x, y, 'w')); return g; };
      // full-size helpers
      const sinkRow = (rows, i) => ['.'.repeat(W), ...rows.slice(0, i), ...rows.slice(i + 1)];
      const squash = n => sinkRow(sinkRow(S[n], 7), 14);
      const B = () => k.blank();
      const inside = g => { [[10, 12], [12, 11], [14, 12], [16, 11], [18, 12]].forEach(([x, y]) => k.px(g, x, y, '7')); return g; };
      return [
        ...k.eggIntro(),
        // the top of the egg pops off; something boxy pushes up from inside
        k.f(inside(top(bottom(B()), 1)), 90, { note: 'the egg top pops off' }),
        k.f(inside(top(bottom(B()), 2)), 110),
        k.f(bottom(drawMini(B(), 'shut', 6)), 300, { note: 'something boxy is in there' }),
        k.f(glint(bottom(drawMini(B(), 'shut', 6)), 11, 9), 150, { note: 'it glints' }),
        k.f(glint(bottom(drawMini(B(), 'shut', 6)), 11, 9, true), 170),
        // the shell falls away; the tiny chest drops to the floor
        k.f(bottom(drawMini(B(), 'shut', 3), 1), 90, { note: 'the shell falls away' }),
        k.f(bottom(drawMini(B(), 'shut', 0), 2), 90),
        k.f(k.stamp(B(), squashMini('shut'), MX, FLOOR - mini('shut').length + 1), 90),
        k.f(drawMini(B(), 'shut'), 340, { note: 'a tiny treasure chest' }),
        k.f(glint(drawMini(B(), 'shut'), 14, 17), 140),
        k.f(glint(drawMini(B(), 'shut'), 14, 17, true), 170),
        // the lid creaks open on a heap of gold
        k.f(drawMini(B(), 'creak'), 280, { note: 'the lid creaks open...' }),
        k.f(shine(drawMini(B(), 'gold'), 0, 12), 200, { note: '...gold!' }),
        k.f(shine(drawMini(B(), 'gold2'), 1, 12), 200),
        k.f(shine(drawMini(B(), 'gold'), 0, 12), 240),
        // ...with eyes in it
        k.f(drawMini(B(), 'eyes'), 440, { note: 'wait. the gold has eyes' }),
        k.f(drawMini(B(), 'teeth'), 240, { note: 'and teeth' }),
        k.f(drawMini(B(), 'lick'), 160),
        k.f(drawMini(B(), 'teeth'), 160),
        // CHOMP
        k.f(chompLines(k.stamp(B(), squashMini('shut'), MX, FLOOR - mini('shut').length + 1)), 110, { note: 'CHOMP' }),
        k.f(chompLines(drawMini(B(), 'shut')), 160),
        k.f(drawMini(B(), 'shut'), 220),
        // then it hops toward you and lands full size
        k.f(drawMini(B(), 'eyes', 3), 100, { note: 'and hops toward you' }),
        k.f(k.at(S.happy2, 0, -3, { fill: 'l' }), 70),
        k.f(k.at('happy2', 0, -2), 100),
        k.f(k.at(squash('idle')), 110),
        k.f(k.at('idle'), 240),
        k.f(k.at('happy'), 200),
        k.f(k.at('happy2', 0, -1), 150),
        k.f(k.at('blink'), 110),
        k.f(k.at('idle'), 400),
      ];
    },
  });
})();
