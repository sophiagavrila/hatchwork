// Vault — sturdy tortoise whose shell is a vault door. Coaches security: secrets, permissions, least privilege.
(function () {
  const W = 22, H = 18;
  // put(rows, [x, y, art]...): stamp art; ' ' and '.' keep the pixel underneath.
  const put = (rows, ...stamps) => {
    const g = rows.map(r => [...r]);
    stamps.forEach(([x, y, art]) => art.forEach((r, j) => [...r].forEach((c, i) => {
      if (c !== ' ' && c !== '.' && g[y + j] && x + i >= 0 && x + i < W) g[y + j][x + i] = c;
    })));
    return g.map(r => r.join(''));
  };
  const EMPTY = Array(H).fill('.'.repeat(W));

  // Shell dome (x6-21) with the vault door: dark ring, eight gold rivets, gold dial + keyhole.
  const SHELL = [
    '......................',
    '...........oooooo.....',
    '.........oolllllloo...',
    '........olllnananggo..',
    '.......olllnlllggnggo.',
    '.......ollnlgyaaggngo.',
    '......olllagyaaargagdo',
    '......olggngyaeardnddo',
    '......ogggagaaerrdaddo',
    '......ogggnggarrddnddo',
    '......ogggngddddnddddo',
    '......oggggnrnrnddddno',
    '.....onndnndnndnndnnno',
    '......oooooooooooooooo',
  ];
  // Dial (5x5 at x12,y5) — keyhole turns: vertical (open), diagonal, horizontal (locked).
  const DIAL = {
    v: ['.yaa.', 'yaaar', 'yaear', 'aaerr', '.arr.'],
    d: ['.yaa.', 'yaaar', 'yaear', 'aaaer', '.arr.'],
    h: ['.yaa.', 'yaaar', 'yaeer', 'aaarr', '.arr.'],
    d2: ['.yaa.', 'yaaar', 'yaear', 'aeaar', '.arr.'],
  };
  const HEAD = [
    '...oooo...',
    '.oosskkoo.',
    'ossskkkkko',
    'oskkkkkkko',
    'okkkkkkhho',
    'okcccccsho',
    '.oocccsoo.',
    '...oooo...',
  ];
  // Face patches in head coordinates.
  const EYES = {
    open: [[2, 3, ['we']], [2, 4, ['ee']], [6, 3, ['we']], [6, 4, ['ee']]],
    blink: [[2, 4, ['ee']], [6, 4, ['ee']]],
    up: [[3, 2, ['we']], [3, 3, ['ee']], [7, 2, ['we']], [7, 3, ['ee']]],
    right: [[3, 3, ['we']], [3, 4, ['ee']], [7, 3, ['we']], [7, 4, ['ee']]],
    happy: [[1, 2, ['kek']], [1, 3, ['eke']], [6, 2, ['kek']], [6, 3, ['eke']]],
    sleep: [[2, 4, ['ee']], [6, 4, ['ee']]],
  };
  const MOUTH = {
    idle: [[4, 5, ['ee']]],
    open: [[4, 5, ['ee']], [4, 6, ['pp']]],
    smile: [[3, 5, ['eeee']], [3, 6, ['kppk']]],
    hmm: [[5, 5, ['e']]],
    none: [],
  };
  const BLUSH = [[1, 5, ['p']], [8, 5, ['p']]];
  const BLUSH_HIGH = [[1, 4, ['p']], [8, 4, ['p']]];
  const LEG = ['ohhho', 'okkko', 'okkho', 'ococo'];
  const Z = ['ccccc', '...c.', '..c..', '.c...', 'ccccc'];
  const Q = ['.aay', 'a..a', '..a.', '....', '..a.'];

  function vault(o = {}) {
    const dy = o.dy || 0, hx = o.hx || 0, hy = (o.hy || 0) + dy;
    const head = put(HEAD, ...(EYES[o.eyes || 'open']), ...(MOUTH[o.mouth || 'idle']), ...(o.blush === false ? [] : o.blush === 'high' ? BLUSH_HIGH : BLUSH));
    let g = put(EMPTY, [0, dy, SHELL], [12, 5 + dy, DIAL[o.dial || 'v']]);
    if (o.legs !== 'tucked') g = put(g, [10, 14 + dy, ['ohho', 'ohho', 'oooo']], [2, 14 + dy - (o.liftF || 0), LEG], [15, 14 + dy - (o.liftB || 0), LEG]);
    g = put(g, [hx, 6 + hy, head]);
    (o.extra || []).forEach(s => { g = put(g, s); });
    return g;
  }

  const sprites = {
    idle: vault(),
    idle2: vault({ hy: 1 }),
    blink: vault({ eyes: 'blink' }),
    talk: vault({ hy: -1, mouth: 'open' }),
    talk2: vault({ mouth: 'idle' }),
    happy: vault({ hy: -1, eyes: 'happy', mouth: 'smile', blush: 'high' }),
    happy2: vault({ dy: -1, hy: -2, eyes: 'happy', mouth: 'smile', blush: 'high', extra: [[18, 0, ['y']], [21, 2, ['y']]] }),
    think: vault({ hy: -1, eyes: 'up', mouth: 'hmm', dial: 'd', extra: [[2, 0, Q]] }),
    think2: vault({ hy: -1, eyes: 'up', mouth: 'hmm', dial: 'h', extra: [[2, 0, Q]] }),
    sleep: vault({ dy: 4, eyes: 'sleep', mouth: 'none', blush: false, dial: 'h', legs: 'tucked', extra: [[1, 0, Z]] }),
    sleep2: vault({ dy: 4, eyes: 'sleep', mouth: 'none', blush: false, dial: 'h', legs: 'tucked', extra: [[3, 0, Z]] }),
    fidget: vault({ eyes: 'right', dial: 'd' }),
    fidget2: vault({ eyes: 'right', dial: 'h', extra: [[17, 4, ['y']]] }),
  };

  PatchDex.register({
    id: 'vault',
    name: 'Vault',
    species: 'vault-door tortoise',
    rarity: 'rare',
    blurb: 'Slow, steady and impossible to rush; it checks every lock twice and never once regrets it.',
    coaching: 'Security habits: keep secrets out of prompts and logs, and grant agents the least privilege that works.',
    voice: 'scope the token down. it only needs read access.',
    hatch: 'A keyhole appears on the egg, a gold key turns with a click, and the shell swings open like a vault door.',
    palette: {
      o: '#1b2a1c', n: '#1f3d2a', d: '#2b5a38', g: '#3d7a45', l: '#62a055',
      y: '#ffe27a', a: '#d9a83a', r: '#9a6a22',
      s: '#c9c876', k: '#9aa04c', h: '#6c7432',
      e: '#1a1d12', w: '#ffffff', p: '#e6957a', c: '#e8e2b0',
    },
    sprites,
    loop: [['idle', 24], ['blink', 2], ['idle', 10], ['idle2', 6], ['idle', 12], ['blink', 2], ['idle', 8], ['fidget', 4], ['fidget2', 4], ['fidget', 3], ['idle', 10]],
    entrance(k) {
      const out = k.eggIntro(), F = (g, ms, note) => out.push(k.f(g, ms, note ? { note } : {}));
      const EX = k.eggHome.x, EY = k.eggHome.y;
      // A keyhole plate on the egg's front, and a little gold key.
      const PLATE = ['..yar..', '.yaaar.', 'yaeeear', 'yaeeear', 'aaaearr', '.aaerr.', '..rrr..'];
      const KEY = ['.....ayy.', 'aaaaaay.y', 'a.a...ayy'];
      const KEY_TURNED = ['.y.', 'yay', 'yay', 'yay', '.y.'];
      const door = k.stamp(k.blank(12, 14), k.EGG, 0, 0);
      k.stamp(door, PLATE, 3, 4);
      const eggWith = () => k.stamp(k.egg(k.EGG), PLATE, EX + 3, EY + 4);
      // 1. The keyhole appears; the key slides in from the right and turns.
      F(eggWith(), 300, 'a keyhole');
      [[22, 140], [18, 120], [14, 260]].forEach(([x, ms]) => { const g = eggWith(); k.stamp(g, KEY, x, EY + 5); k.stamp(g, PLATE, EX + 3, EY + 4); F(g, ms); });
      { const g = eggWith(); k.stamp(g, KEY_TURNED, 14, EY + 4); [[20, EY + 3], [21, EY + 1], [10, EY + 2]].forEach(([x, y]) => k.px(g, x, y, 'y')); F(g, 260, 'click'); }
      // 2. The front of the egg swings open on a left hinge (foreshortened), revealing a dark vault.
      const swing = (w, back, glint) => {
        const g = k.egg(k.EGG, 0, 0, { map: { 1: 'e', 2: 'e', 3: 'e', 4: 'e', 5: 'e', 6: 'e', 7: 'e' } });
        if (glint) glint.forEach(([x, y, c]) => k.px(g, EX + x, EY + y, c));
        for (let j = 0; j < w; j++) {
          const sx = Math.min(11, Math.floor((j + 0.5) * 12 / w));
          for (let y = 0; y < 14; y++) {
            const c = door[y][sx]; if (c === '.') continue;
            const x = back ? EX - w + j : EX + j;
            k.px(g, x, EY + y, back ? (c === '0' || j === 0 ? '0' : '3') : c);
          }
        }
        return g;
      };
      const GLINT = [[5, 10, 'a'], [7, 11, 'y'], [3, 11, 'r']];
      F(swing(9, false), 120); F(swing(5, false), 110); F(swing(2, false, GLINT), 110); F(swing(4, true, GLINT), 260);
      // 3. Eyes in the dark, then Vault walks out of its vault.
      { const g = swing(4, true, GLINT); k.stamp(g, ['we..we', 'ee..ee'], EX + 3, EY + 6); F(g, 320); }
      const SLAB = (g, tip = 0) => { for (let y = 0; y < 12 - tip; y++) for (let x = 0; x < 4; x++) k.px(g, 3 + x + (tip ? Math.floor(y / 3) - 1 : 0), 9 + tip + y, x === 0 || y === 0 || y === 11 - tip ? '0' : '3'); return g; };
      { const g = swing(4, true, GLINT); k.stamp(g, put(HEAD, ...EYES.open, ...MOUTH.idle, ...BLUSH), EX + 1, EY + 6); F(g, 260); }
      F(k.over(SLAB(k.blank()), vault({ liftF: 1 }), 5, 0), 140);
      F(k.over(SLAB(k.blank()), vault({ liftB: 1 }), 3, 0), 140);
      F(k.over(SLAB(k.blank(), 3), vault({ liftF: 1 }), 1, 0), 140);
      { const g = k.at(vault({ dy: 1 })); [[1, 21, '3'], [2, 21, '0'], [4, 20, '3'], [0, 20, '0']].forEach(([x, y, c]) => k.px(g, x, y, c)); F(g, 110); }
      // 4. The dial on its back spins... and locks.
      ['d', 'h', 'd2'].forEach(d => F(k.at(vault({ eyes: 'right', dial: d })), 80));
      { const g = k.at(vault({ eyes: 'right', dial: 'v' })); [[14, 7], [20, 7], [14, 13], [20, 13]].forEach(([x, y]) => k.px(g, x, y, 'y')); F(g, 300, 'locked'); }
      // 5. Happy little hop, then settle.
      F(k.at('happy'), 220); F(k.at('happy2'), 150); F(k.at('happy'), 240);
      F(k.at('idle'), 400);
      return out;
    },
  });
})();
