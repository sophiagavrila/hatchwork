// Tosk — the courier squirrel of the world tree. Russet fur, cream throat, tufted ears, a big curled tail, a green message satchel.
(function () {
  const idle = [
    '..oooo...o.......o....',
    '.oTTTTo.oDo.....oDo...',
    'oTThhtToohbo...obdo...',
    'oThtddToohpbooobpdo...',
    'oThddohohhhhhhhbbbdo..',
    'oThdttdohbbbbbbbbbdo..',
    'oTdthtdobbwebbbwebdo..',
    'oTdtttdobbeebbbeebdo..',
    'oTthttdobbeeccceebdo..',
    'oTthtddobpcccncccpdo..',
    '.oTthddoodCccCccCdo...',
    '..oTtddoodCCCCCCggo...',
    '.oTthtddohbcccggCdo...',
    '.oTttdddohbcggcCbdo...',
    '.oToooooooogcccCbdo...',
    '.oToAAAAaaoccCCbddo...',
    '..ooaakkagoCcCbddDo...',
    '...oggggggodbbbbdDo...',
    '...oaaaaggohhdohbdo...',
    '...oooooooooooooooo...',
  ];
  const W = idle[0].length;
  // Replace rows by index: mod(base, {7: '...'}). Short rows replace the left part only; ' ' keeps the pixel.
  const mod = (base, m) => base.map((r, i) => (m[i] === undefined ? r : [...r].map((c, x) => (m[i][x] === undefined || m[i][x] === ' ' ? c : m[i][x])).join('')));
  // Stamp a patch at x,y. '.' and ' ' keep what is there; ',' clears to transparent.
  const put = (base, x, y, rows) => base.map((r, j) => {
    const p = rows[j - y]; if (p === undefined) return r;
    const a = [...r]; [...p].forEach((ch, i) => { if (ch !== '.' && ch !== ' ' && a[x + i] !== undefined) a[x + i] = ch === ',' ? '.' : ch; }); return a.join('');
  });
  // Drop everything above `row` by 1px (squash / slump).
  const sink = (base, row) => ['.'.repeat(W), ...base.slice(0, row), ...base.slice(row + 1)];
  // Shift columns [x0, x1) down by dy (tail dip), filling the top with transparency.
  const dipCols = (base, x0, x1, dy) => base.map((r, y) => [...r].map((c, x) => (x < x0 || x >= x1 ? c : (base[y - dy] || '.'.repeat(W))[x] || '.')).join(''));

  const face = {
    blink: { 6: '        bbbbbbbbbbd', 7: '        bbbbbbbbbbd' },
    happy: { 6: '        bbbbbbbbbbd', 7: '        bbeebbbeebd', 8: '        bebbecebbed' },
    think: { 6: '        bbbwebbbwed', 7: '        bbbeebbbeed', 8: '        bbbeeccceed' },
  };
  const blink = mod(idle, face.blink);
  const talk = mod(idle, { 10: '         dCccDccCd' });
  const talk2 = mod(idle, { 10: '         dCcDpDcCd', 11: '         dCCCDCCgg' });
  const happy = mod(idle, { ...face.happy, 10: '         dCcDpDcCd' });
  // Tail flick: the plume dips 1px and the curl tip snaps out.
  const flick = rows => put(dipCols(rows, 0, 8, 1), 5, 3, ['h', ',o']);
  const happy2 = flick(happy);
  const z1 = ['zzz', '..z', '.z.', 'zzz'];
  const sleepBase = sink(mod(idle, face.blink), 12);
  const sleep = put(put(sleepBase, 19, 2, z1), 17, 0, ['zz']);
  const sleep2 = put(sleepBase, 19, 0, z1);
  const think = put(mod(idle, face.think), 11, 0, ['w.w.w']);
  const fidget = put(flick(idle), 9, 0, [',', 'oDo']);
  const idle2 = sink(idle, 12);

  PatchDex.register({
    id: 'tosk',
    name: 'Tosk',
    species: 'world-tree courier squirrel',
    rarity: 'common',
    habit: 'autonomy',
    blurb: 'A courier squirrel who runs messages up and down the world tree and has learned the hard way that nobody at the other end can ask a follow-up question.',
    coaching: 'Subagent handoffs: a subagent starts knowing nothing, so Tosk has you pack the whole message: the goal, the context, the constraints, the files, what done looks like, and what to send back.',
    voice: 'they start knowing nothing. pack the whole message.',
    hatch: 'An acorn message capsule drops onto the egg, the egg rolls like an acorn, bonks it, splits, and Tosk scurries out with a satchel, tucks the message away, and flicks its tail.',
    palette: {
      o: '#3b1c1c', D: '#5f2a1a', d: '#94441f', b: '#c9682f', h: '#f0a060',
      t: '#de8048', T: '#ffd29a',
      c: '#fff0d6', C: '#e6c89c',
      e: '#1d1014', w: '#ffffff', p: '#ee8f8f', n: '#7a2e2e',
      a: '#8fae58', A: '#c2d97e', g: '#566f30', k: '#ffd36a',
      N: '#e9b86b', U: '#b47a35', z: '#cbd6f2',
    },
    sprites: { idle, idle2, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget },
    loop: [
      ['idle', 18], ['idle2', 6], ['idle', 10], ['blink', 2], ['idle', 12], ['fidget', 2], ['idle', 2], ['fidget', 2],
      ['idle', 14], ['idle2', 6], ['idle', 8], ['blink', 2], ['idle', 2], ['blink', 2], ['idle', 12], ['think', 10], ['idle', 8],
    ],
    entrance(k) {
      const out = k.eggIntro();
      const EX = k.eggHome.x, EY = k.eggHome.y;
      const ACORN = ['..o..', 'ohhdo', 'oDdDo', 'oNNUo', 'oNUUo', '.oUo.', '..o..'];
      const SIDE = ['..oo...', '.oDhoo.', 'oDdhNNo', 'oDdNNUo', '.oDoUo.', '..o.o..'];
      const acorn = (g, x, y, rows = ACORN) => k.stamp(g, rows, x, y);
      const stars = (g, x, y, n = 0) => { (n ? [[-1, -1], [2, -2], [-2, 1]] : [[0, -2], [-2, -1], [2, 0]]).forEach(([dx, dy]) => k.px(g, x + dx, y + dy, n ? 'w' : 'k')); k.px(g, x, y, 'w'); return g; };
      const dust = (g, x, y, n) => { (n ? [[0, 0], [1, -1], [-1, 0]] : [[0, 0], [-1, -1], [1, 0], [2, -1]]).forEach(([dx, dy]) => k.px(g, x + dx, y + dy, n ? 'C' : 'T')); return g; };
      // The egg as an acorn would roll: tip, lie on its side, rock back.
      const tilt = (d, dx = 0) => k.stamp(k.blank(), k.EGG_C2, EX + dx, EY, { rowDx: j => Math.round((d * (13 - j)) / 13) });
      const onSide = (rs => rs[0].map((_, x) => rs.map(r => r[rs[0].length - 1 - x]).join('')))(k.EGG_C2.map(r => [...r]));
      const squash = [k.EGG_C2[0].replace(/./g, '.'), ...k.EGG_C2.filter((_, i) => i !== 6)];
      const lie = (x, g = k.blank()) => k.stamp(g, onSide, x, k.H - onSide.length);
      const AX = 0, AY = k.H - ACORN.length;
      const shellBottom = (g, dx = 0, dy = 0) => k.stamp(g, k.EGG_BOTTOM, EX + dx, EY + dy);
      // Tosk peeking over the rim of the bottom half of the shell (clipped to the shell's mouth).
      const peek = (dy, n = 'idle') => {
        const g = k.at(n, -1, dy).map((r, y) => r.map((c, x) => (y <= EY + 4 && x >= EX && x <= EX + 11 ? c : '.')));
        return shellBottom(g);
      };
      const run = (n, dx, dy, flip) => k.at(n, dx, dy, flip ? { flipX: true } : undefined);
      out.push(
        // a message drops from the canopy
        k.f(acorn(k.egg(k.EGG_C2), 11, -6), 70, { note: 'a message drops from the canopy' }),
        k.f(acorn(k.egg(k.EGG_C2), 11, -3), 60),
        k.f(acorn(k.egg(k.EGG_C2), 11, 0), 60),
        k.f(stars(acorn(k.stamp(k.blank(), squash, EX, EY), 11, 2), 14, 1), 120, { note: 'bonk' }),
        k.f(stars(acorn(k.egg(k.EGG_C2), 8, -1, SIDE), 18, 3, 1), 80),
        k.f(acorn(k.egg(k.EGG_C2, 0, 0, k.lean(-1)), 4, 3, SIDE), 80),
        k.f(acorn(k.egg(k.EGG_C2, 0, 0, k.lean(1)), 1, 9), 80),
        k.f(acorn(k.egg(k.EGG_C2), AX, AY), 90),
        k.f(acorn(k.egg(k.EGG_C2), AX, AY - 1), 70),
        k.f(acorn(k.egg(k.EGG_C2), AX, AY), 260),
        // the egg rolls like an acorn, toward it
        k.f(acorn(tilt(-1), AX, AY), 110, { note: 'the egg rolls like an acorn' }),
        k.f(acorn(tilt(-3), AX, AY), 90),
        k.f(acorn(tilt(-5, -1), AX, AY), 80),
        k.f(stars(acorn(lie(5), AX, AY - 1), 4, 9), 160, { note: 'bonk' }),
        k.f(stars(acorn(lie(6), AX, AY), 3, 10, 1), 140),
        k.f(acorn(tilt(-4, -1), AX, AY), 90),
        k.f(acorn(tilt(-2), AX, AY), 90),
        k.f(acorn(tilt(1), AX, AY), 90),
        k.f(acorn(k.egg(k.EGG_C2), AX, AY), 200),
        // it splits, and Tosk scurries out
        k.f(acorn(k.stamp(shellBottom(k.blank()), k.EGG_TOP, EX + 1, EY - 3), AX, AY), 80, { note: 'it splits' }),
        k.f(acorn(k.stamp(peek(10), k.EGG_TOP, EX + 4, EY - 7, { flipX: true }), AX, AY), 90),
        k.f(acorn(k.stamp(peek(6, 'blink'), k.EGG_TOP, EX + 9, EY - 6, { flipX: true }), AX, AY), 110),
        k.f(acorn(k.stamp(peek(3), k.EGG_TOP, EX + 14, EY - 2, { flipX: true }), AX, AY), 320, { note: 'peek' }),
        k.f(acorn(k.stamp(peek(3, 'think'), k.EGG_TOP, EX + 14, EY - 1, { flipX: true }), AX, AY), 280),
        k.f(acorn(shellBottom(run('fidget', -1, -3, true), 3, 0), AX, AY), 80, { note: 'Tosk scurries out' }),
        k.f(dust(acorn(shellBottom(run('idle', -2, 0, true), 7, 1), AX, AY), 23, 21, 0), 70),
        k.f(dust(acorn(shellBottom(run('fidget', -3, -1, true), 12, 3), AX, AY), 22, 20, 1), 70),
        k.f(acorn(run('idle', -3, 0, true), 13, 11), 200, { note: 'the message goes in the satchel' }),
        k.f(acorn(run('blink', -3, 0, true), 13, 13), 120),
        k.f(k.px(k.px(k.px(run('happy', -3, 0, true), 14, 18, 'w'), 15, 18, 'w'), 17, 15, 'k'), 200),
        k.f(dust(run('fidget', -2, -1), 2, 21, 0), 70),
        k.f(dust(run('idle', -1, 0), 1, 21, 1), 70),
        k.f(run('fidget', 0, -1), 70),
        k.f(k.at('idle'), 160),
        k.f(k.at('fidget'), 90, { note: 'tail flick' }),
        k.f(k.at('idle'), 90),
        k.f(k.at('fidget'), 90),
        k.f(k.at('happy'), 240),
        k.f(k.at('happy2'), 140),
        k.f(k.at('happy'), 240),
        k.f(k.at('idle'), 300),
        k.f(k.at('blink'), 110),
        k.f(k.at('idle'), 420),
      );
      return out;
    },
  });
})();
