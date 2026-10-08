// Lumen — round owl scholar with tiny spectacles and a little lantern. Coaches reading diffs before merging.
(function () {
  const W = 21;
  // put(rows, [x, y, art]...): stamp art onto rows; ' ' in art keeps the pixel underneath.
  const put = (rows, ...stamps) => {
    const g = rows.map(r => [...r]);
    stamps.forEach(([x, y, art]) => art.forEach((r, j) => [...r].forEach((c, i) => {
      if (c !== ' ' && g[y + j] && x + i >= 0 && x + i < g[y + j].length) g[y + j][x + i] = c;
    })));
    return g.map(r => r.join(''));
  };
  const pad = (rows, n) => [...Array(n).fill('.'.repeat(W)), ...rows];

  // Body without the lantern (18 rows); 2 rows of headroom are added on top.
  const body = [
    '.o..............o....',
    '.olo..oooooo..odo....',
    '..ollolllbbboddo.....',
    '.olllllbbbbbbbddo....',
    'ollccccbbbbccccddo...',
    'olcggggcbbcggggcdo...',
    'obgcccccggggcccgdo...',
    'obgccccgffgccccgdo...',
    'obgccccghhgccccgdo...',
    'obcggggccccggggsdo...',
    'odbcccccccccccsbdooo.',
    'obddddddddddddddbbdo.',
    'obnbllllllllbbbndo...',
    'odnlblbblbblbbbndo...',
    '.odnlbllbllbbbbdo....',
    '..odnlllllbbbbdo.....',
    '...oonnnnnnnnoo......',
    '.....fff..fff........',
  ];
  const BASE = pad(body, 2);
  // Lens interiors (4x3) at x3 / x11, y8. Beak at x8, y9.
  const EYES = {
    open: ['cwec', 'ceec', 'ceec'],
    blink: ['cccc', 'cccc', 'eeee'],
    happy: ['ceec', 'ecce', 'cccc'],
    up: ['ccwe', 'ccee', 'cccc'],
    left: ['wecc', 'eecc', 'eecc'],
    right: ['ccwe', 'ccee', 'ccee'],
    sleep: ['cccc', 'ecce', 'ceec'],
  };
  const eyes = (rows, k, kr = k) => put(rows, [3, 8, EYES[k]], [11, 8, EYES[kr]]);
  const BEAK = { shut: ['ff', 'hh', 'cc'], open: ['ff', 'ee', 'hh'] };
  const beak = (rows, k) => put(rows, [8, 9, BEAK[k]]);
  const GLASS = {
    warm: ['oyyao', 'oyaao', 'oaaho'],
    flick: ['oyaao', 'oyyao', 'oaaho'],
    bright: ['oyyyo', 'oyyao', 'oyaao'],
    dim: ['oaaho', 'oahho', 'ohhho'],
  };
  const lantern = (rows, k = 'warm', x = 16, y = 14) => put(rows, [x, y, ['  g  ', ' ooo ', ...GLASS[k], ' ooo ']]);
  const face = (e, b, kr) => beak(eyes(BASE, e, kr), b);

  const idle = lantern(face('open', 'shut'));
  const idle2 = lantern(face('open', 'shut'), 'flick');
  const blink = lantern(face('blink', 'shut'));
  const talk = lantern(face('open', 'open'), 'bright');
  const talk2 = lantern(face('open', 'shut'), 'bright');
  const blush = rows => put(rows, [3, 12, ['pp']], [12, 12, ['pp']]);
  const happy = lantern(blush(face('happy', 'open')), 'bright');
  // happy2: a 1px hop — whole owl (and lantern) up one row, feet leave the ground.
  const hop = r => [...r.slice(1), '.'.repeat(W)];
  const happy2 = hop(lantern(blush(face('happy', 'shut')), 'bright'));
  const think = put(lantern(face('up', 'shut')), [17, 0, ['ggg', '..g', '.gg', '...', '.g.']]);
  // fidget: glance left then right, a glint sliding across the spectacles.
  const fidget = put(lantern(face('left', 'shut', 'left'), 'flick'), [4, 7, ['y']], [12, 7, ['y']]);
  const fidget2 = put(lantern(face('right', 'shut', 'right')), [6, 7, ['y']], [14, 7, ['y']]);

  // Sleep: one chest row removed so the whole owl slumps 1px; lantern set down and dimmed; z's.
  const slump = pad(body.filter((_, i) => i !== 12), 3);
  const sleepFace = put(slump, [3, 9, EYES.sleep], [11, 9, EYES.sleep], [8, 10, BEAK.shut]);
  const sleep = put(sleepFace, [16, 15, [' ooo ', ...GLASS.dim, ' ooo ']], [15, 0, ['llll', '..l.', '.l..', 'llll']]);
  const sleep2 = put(sleepFace, [16, 15, [' ooo ', ...GLASS.dim, ' ooo ']], [17, 0, ['lll', '..l', '.l.', 'lll']], [14, 4, ['ll', '.l']]);

  const land = lantern(put(slump, [3, 9, EYES.happy], [11, 9, EYES.happy], [8, 10, BEAK.shut]), 'bright', 16, 15);

  PatchDex.register({
    id: 'lumen', name: 'Lumen', species: 'lantern owl scholar', rarity: 'rare',
    blurb: 'Patient and a little nocturnal; it reads every line before it has an opinion.',
    coaching: 'Reviewing diffs: read what the agent changed, line by line, before you merge.',
    voice: 'read the diff before you merge. all of it.',
    hatch: 'Night falls, the egg glows like a lantern, and its lid lifts as Lumen flaps out.',
    palette: {
      o: '#1d1838', n: '#272a63', d: '#3a428c', b: '#5361b5', l: '#8b8fd6',
      c: '#f4e4c1', s: '#d3b98f', e: '#1a1226', w: '#ffffff', g: '#d6a94a',
      f: '#f0a040', p: '#e88aa0', q: '#c8ccff', y: '#fff3b0', a: '#ffc14d', h: '#d9782a',
    },
    sprites: { idle, idle2, blink, talk, talk2, happy, happy2, think, sleep, sleep2, fidget, fidget2 },
    loop: [['idle', 20], ['blink', 2], ['idle', 8], ['idle2', 3], ['idle', 14], ['blink', 2], ['idle', 10],
      ['fidget', 7], ['idle', 3], ['fidget2', 7], ['idle', 12], ['idle2', 3], ['idle', 6]],
    entrance(k) {
      const out = k.eggIntro(), F = (g, ms) => out.push(k.f(g, ms));
      const STARS = [[[2, 2], [6, 5], [23, 1], [25, 6], [20, 3], [3, 11], [24, 13], [13, 1]],
        [[2, 2], [5, 7], [23, 1], [26, 4], [17, 2], [3, 11], [25, 15], [9, 3]]];
      const stars = (g, i, n = 8) => { STARS[i % 2].slice(0, n).forEach(([x, y]) => k.px(g, x, y, 'q')); return g; };
      const glowEgg = (map, dy = 0) => k.egg(k.EGG_C2, 0, dy, { map });
      // Night falls; the crack glows amber like a lantern.
      F(stars(glowEgg({ 7: 'a' }), 0), 320);
      const g2 = stars(glowEgg({ 7: 'y' }), 1);
      [[7, 9], [20, 9], [9, 6], [18, 6], [13, 5]].forEach(([x, y]) => k.px(g2, x, y, 'a'));
      F(g2, 200);
      // The lid lifts like a lantern lid: two eyes blink in the dark inside.
      const peek = (open, lid = -5) => {
        const g = stars(k.blank(), 0);
        for (let x = 9; x <= 18; x++) for (let y = 7; y <= 11; y++) if (!((x === 9 || x === 18) && y < 9)) k.px(g, x, y, 'n');
        const E = open ? [[11, 8, 'y'], [12, 8, 'y'], [11, 9, 'a'], [12, 9, 'a'], [15, 8, 'y'], [16, 8, 'y'], [15, 9, 'a'], [16, 9, 'a']]
          : [[11, 9, 'a'], [12, 9, 'a'], [15, 9, 'a'], [16, 9, 'a']];
        E.forEach(([x, y, c]) => k.px(g, x, y, c));
        k.stamp(g, k.EGG_BOTTOM, k.eggHome.x, k.eggHome.y);
        return k.stamp(g, k.EGG_TOP, k.eggHome.x + 1, k.eggHome.y + lid, k.lean(1));
      };
      F(peek(true), 420); F(peek(false), 110); F(peek(true), 260);
      // Burst: Lumen flaps out, lantern in its talons, shell halves tumbling away.
      const flyBody = put(body.map((r, i) => (i === 10 ? 'odbcccccccccccsbdo...' : i === 11 ? 'obdddddddddddddddo...' : r)),
        [3, 6, EYES.open], [11, 6, EYES.open], [8, 7, BEAK.shut]);
      const WUP = ['o...', 'lo..', 'blo.', 'dblo', 'odbb', '.odb', '..od'];
      const WDN = ['...o', '..ob', '.odb', 'odbb', 'odb.', 'oo..'];
      const L = k.EGG_BOTTOM.map(r => r.slice(0, 6)), R = k.EGG_BOTTOM.map(r => '......' + r.slice(6));
      const fly = (X, Y, up, shell) => {
        const g = k.blank();
        if (shell) {
          const [sx, sy, top] = shell;
          k.stamp(g, L, k.eggHome.x - sx, k.eggHome.y + sy); k.stamp(g, R, k.eggHome.x + sx, k.eggHome.y + sy);
          if (top) k.stamp(g, k.EGG_TOP, k.eggHome.x + top[0], k.eggHome.y + top[1]);
        }
        k.stamp(g, flyBody, X, Y);
        const w = up ? WUP : WDN, wy = up ? 4 : 9;
        k.stamp(g, w, X - 3, Y + wy); k.stamp(g, w, X + 17, Y + wy, { flipX: true });
        k.stamp(g, ['.g.', 'oyo', 'oao', '.o.'], X + 7, Y + 18);
        return g;
      };
      const burst = fly(5, 3, true, [4, 1, [7, -7]]);
      [[1, 4], [26, 5], [4, 14], [24, 15], [13, 0]].forEach(([x, y]) => k.px(burst, x, y, 'y'));
      F(burst, 140);
      F(stars(fly(5, 1, false, [8, 3, [12, -10]]), 1, 4), 120);
      F(fly(5, 0, true, [12, 6]), 120);
      F(fly(5, 0, false), 150);
      F(fly(4, 1, true), 120);
      F(fly(4, 2, false), 120);
      F(fly(3, 3, true), 110);
      // Touchdown: squash, settle, a happy hop, blink, idle.
      F(k.at(land), 130);
      F(k.at('idle'), 170);
      F(k.at('happy'), 280); F(k.at('happy2'), 160); F(k.at('happy'), 300);
      F(k.at('blink'), 100);
      F(k.at('idle'), 450);
      return out;
    },
  });
})();
