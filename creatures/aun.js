// Aun: a stone komainu pup. Idle mouth closed (un), talk mouth wide open (a).
(function () {
  const idle = [
    '..........o...........',
    '..ooo....oLo....ooo...',
    '.oddDdooolLbooodDddo..',
    'odDDdolbDlDblDbodDDdo.',
    'oDdobdDLLLLLLLDdbodDo.',
    '.oobdLLbLLlllbllbdoo..',
    'obDdLLLLLLlllllllbDdo.',
    'olDdLLwelllllwellbDbo.',
    'obdbLLeYllllleYllbbDo.',
    'olDdLLLLLeeelllllbDdo.',
    'obdbDlLLLLeLLllldbmDo.',
    '.odbDdlLldDdllbdDbdo..',
    '..odDDblllllllbDDdo...',
    '..orrrrrrrrrrrrrrRo...',
    '..orqqrrrrYrrrrrRRo...',
    '.oboRRRRRRyRRRRRRobo..',
    '.odboLlboRRRoLlbobdo..',
    '.oddoLlbo...oLlboddo..',
    '.oMdoLdLo...oLdLoddo..',
    '.oooooooo...oooooooo..',
  ];
  const idle2 = [
    '..........o...........',
    '..ooo....oLo....ooo...',
    '.oddDdooolLbooodDddo..',
    'odDDdolbDlDblDbodDDdo.',
    'oDdobdDLLLLLLLDdbodDo.',
    '.oobdLLbLLlllbllbdoo..',
    'obDdLLLLLLlllllllbDdo.',
    'olDdLLLwelllllwelbDbo.',
    'obdbLLLeYllllleYlbbDo.',
    'olDdLLLLLeeelllllbDdo.',
    'obdbDlLLLLeLLllldbmDo.',
    '.odbDdlLldDdllbdDbdo..',
    '..odDDblllllllbDDdo...',
    '..orrrrrrrrrrrrrrRo...',
    '..orqqrrrrYrrrrrRRo...',
    '.oboRRRRRRyRRRRRRobo..',
    '.odboLlboRRRoLlbobdo..',
    '.oddoLlbo...oLlboddo..',
    '.oMdoLdLo...oLdLoddo..',
    '.oooooooo...oooooooo..',
  ];
  const blink = [
    '..........o...........',
    '..ooo....oLo....ooo...',
    '.oddDdooolLbooodDddo..',
    'odDDdolbDlDblDbodDDdo.',
    'oDdobdDLLLLLLLDdbodDo.',
    '.oobdLLbLLlllbllbdoo..',
    'obDdLLLLLLlllllllbDdo.',
    'olDdLLLLlllllllllbDbo.',
    'obdbLLeellllleellbbDo.',
    'olDdLLLLLeeelllllbDdo.',
    'obdbDlLLLLeLLllldbmDo.',
    '.odbDdlLldDdllbdDbdo..',
    '..odDDblllllllbDDdo...',
    '..orrrrrrrrrrrrrrRo...',
    '..orqqrrrrYrrrrrRRo...',
    '.oboRRRRRRyRRRRRRobo..',
    '.odboLlboRRRoLlbobdo..',
    '.oddoLlbo...oLlboddo..',
    '.oMdoLdLo...oLdLoddo..',
    '.oooooooo...oooooooo..',
  ];
  const talk = [
    '..........o...........',
    '..ooo....oLo....ooo...',
    '.oddDdooolLbooodDddo..',
    'odDDdolbDlDblDbodDDdo.',
    'oDdobdDLLLLLLLDdbodDo.',
    '.oobdLLbLLlllbllbdoo..',
    'obDdLLLLLLlllllllbDdo.',
    'olDdLLwelllllwellbDbo.',
    'obdbLLeYllllleYllbbDo.',
    'olDdLLLLLeeelllllbDdo.',
    'obdbDlLDeeeeeDlldbmDo.',
    '.odbDdleeeeeeebdDbdo..',
    '..odDDbDeqqqeDbDDdo...',
    '..orrrrrrrrrrrrrrRo...',
    '..orqqrrrrYrrrrrRRo...',
    '.oboRRRRRRyRRRRRRobo..',
    '.odboLlboRRRoLlbobdo..',
    '.oddoLlbo...oLlboddo..',
    '.oMdoLdLo...oLdLoddo..',
    '.oooooooo...oooooooo..',
  ];
  const talk2 = [
    '..........o...........',
    '..ooo....oLo....ooo...',
    '.oddDdooolLbooodDddo..',
    'odDDdolbDlDblDbodDDdo.',
    'oDdobdDLLLLLLLDdbodDo.',
    '.oobdLLbLLlllbllbdoo..',
    'obDdLLLLLLlllllllbDdo.',
    'olDdLLwelllllwellbDbo.',
    'obdbLLeYllllleYllbbDo.',
    'olDdLLLLLeeelllllbDdo.',
    'obdbDlLLLeeeLllldbmDo.',
    '.odbDdlLDeqeDlbdDbdo..',
    '..odDDblllllllbDDdo...',
    '..orrrrrrrrrrrrrrRo...',
    '..orqqrrrrYrrrrrRRo...',
    '.oboRRRRRRyRRRRRRobo..',
    '.odboLlboRRRoLlbobdo..',
    '.oddoLlbo...oLlboddo..',
    '.oMdoLdLo...oLdLoddo..',
    '.oooooooo...oooooooo..',
  ];
  const happy = [
    '..........o...........',
    '..ooo....oLo....ooo...',
    '.oddDdooolLbooodDddo..',
    'odDDdolbDlDblDbodDDdo.',
    'oDdobdDLLLLLLLDdbodDo.',
    '.oobdLLbLLlllbllbdoo..',
    'obDdLLLLLLlllllllbDdo.',
    'olDdLLeellllleellbDbo.',
    'obdbLeLLelllellelbbDo.',
    'olDdLLLLLeeelllllbDdo.',
    'obdbDqLLdLeLdllqdbmDo.',
    '.odbDdlLDeeeDlbdDbdo..',
    '..odDDblleqellbDDdo...',
    '..orrrrrrrrrrrrrrRo...',
    '..orqqrrrrYrrrrrRRo...',
    '.oboRRRRRRyRRRRRRobo..',
    '.odboLlboRRRoLlbobdo..',
    '.oddoLlbo...oLlboddo..',
    '.oMdoLdLo...oLdLoddo..',
    '.oooooooo...oooooooo..',
  ];
  const happy2 = [
    '..........o...........',
    '..ooo....oLo....ooo...',
    '.oddDdooolLbooodDddo..',
    'odDDdolbDlDblDbodDDdo.',
    'oDdobdDLLLLLLLDdbodDo.',
    '.oobdLLbLLlllbllbdoo..',
    'obDdLLLLLLlllllllbDdo.',
    'olDdLLeellllleellbDbo.',
    'obdbLeLLelllellelbbDo.',
    'olDdLLLLLeeelllllbDdo.',
    'obdbDqLLdLeLdllqdbmDo.',
    '.odbDdlLlDDDllbdDbdo..',
    '..odDDblllllllbDDdo...',
    '..orrrrrrrrrrrrrrRo...',
    '..orqqrrrrYrrrrrRRo...',
    '.oboRRRRRRyRRRRRRobo..',
    '.odboLlboRRRoLlbobdo..',
    '.oddoLlbo...oLlboddo..',
    '.oMdoLdLo...oLdLoddo..',
    '.oooooooo...oooooooo..',
  ];
  const sleep = [
    '..........o......wwwww',
    '..ooo....oLo.......ww.',
    '.oddDdooolLbooo...ww..',
    'odDDdolbDlDblDooowwwww',
    'oDdobdDLLLLLLLDodDdDo.',
    '.oobdLLbLLlllbllbdoo..',
    'obDdLLLLLLlllllllbDdo.',
    'olDdLdLLdllldlldlbDbo.',
    'obdbLLeellllleellbbDo.',
    'olDdLLLLLeeelllllbDdo.',
    'obdbDlLLLLeLLllldbmDo.',
    '.odbDdlLldDdllbdDbdo..',
    '..odDDblllllllbDDdo...',
    '..orrrrrrrrrrrrrrRo...',
    '..orqqrrrrYrrrrrRRo...',
    '.oboRRRRRRyRRRRRRobo..',
    '.odboLlboRRRoLlbobdo..',
    '.oddoLlbo...oLlboddo..',
    '.oMdoLdLo...oLdLoddo..',
    '.oooooooo...oooooooo..',
  ];
  const sleep2 = [
    '..........o.....lllll.',
    '..ooo....oLo......ll..',
    '.oddDdooolLbooo..ll...',
    'odDDdolbDlDblDoolllll.',
    'oDdobdDLLLLLLLDodDdDo.',
    '.oobdLLbLLlllbllbdoo..',
    'obDdLLLLLLlllllllbDdo.',
    'olDdLdLLdllldlldlbDbo.',
    'obdbLLeellllleellbbDo.',
    'olDdLLLLLeeelllllbDdo.',
    'obdbDlLLLLeLLllldbmDo.',
    '.odbDdlLllelllbdDbdo..',
    '..odDDblllllllbDDdo...',
    '..orrrrrrrrrrrrrrRo...',
    '..orqqrrrrYrrrrrRRo...',
    '.oboRRRRRRyRRRRRRobo..',
    '.odboLlboRRRoLlbobdo..',
    '.oddoLlbo...oLlboddo..',
    '.oMdoLdLo...oLdLoddo..',
    '.oooooooo...oooooooo..',
  ];
  const think = [
    '..........o........YY.',
    '..ooo....oLo....ooY..Y',
    '.oddDdooolLbooodDddo.Y',
    'odDDdolbDlDblDbodDDdY.',
    'oDdobdDLLLLLLLDdbodDo.',
    '.oobdLLbLLlllbllbdooY.',
    'obDdLLeeLLllleellbDdo.',
    'olDdLLYwlllllYwllbDbo.',
    'obdbLLLLlllllllllbbDo.',
    'olDdLLLLLeeelllllbDdo.',
    'obdbDlLLLLeLLllldbmDo.',
    '.odbDdlLlldDdlbdDbdo..',
    '..odDDblllllllbDDdo...',
    '..orrrrrrrrrrrrrrRo...',
    '..orqqrrrrYrrrrrRRo...',
    '.oboRRRRRRyRRRRRRobo..',
    '.odboLlboRRRoLlbobdo..',
    '.oddoLlbo...oLlboddo..',
    '.oMdoLdLo...oLdLoddo..',
    '.oooooooo...oooooooo..',
  ];
  const fidget = [
    '..........o.....oo....',
    '..ooo....oLo...oddo...',
    '.oddDdooolLboooddDo...',
    'odDDdolbDlDblDodDDo...',
    'oDdobdDLLLLLLLobDoo...',
    '.oobdLLbLLlllblldo....',
    'obDdLLLLLLlllllllbDdo.',
    'olDdLLLwelllllwelbDbo.',
    'obdbLLLeYllllleYlbbDo.',
    'olDdLLLLLeeelllllbDdo.',
    'obdbDlLLdLeLdllldbmDo.',
    '.odbDdlLlDDDllbdDbdo..',
    '..odDDblllllllbDDdo...',
    '..orrrrrrrrrrrrrrRo...',
    '..orqqrrrrYrrrrrRRo...',
    '.oboRRRRRRyRRRRRRobo..',
    '.odboLlboRRRoLlbobdo..',
    '.oddoLlbo...oLlboddo..',
    '.oMdoLdLo...oLdLoddo..',
    '.oooooooo...oooooooo..',
  ];
  const statue = [
    '..........o...........',
    '..ooo....oLo....ooo...',
    '.oddDdooolLbooodDddo..',
    'odDDdolbDlDblDbodDDdo.',
    'oDdobdDLLLLLLLDdbodDo.',
    '.oobdLLbLLlllbllbdoo..',
    'obDdLLLLLLlllllllbDdo.',
    'olDdLLLLlllllllllbDbo.',
    'obdbLLeellllleellbbDo.',
    'olDdLLLLLeeelllllbDdo.',
    'obdbDlLLLLeLLllldbmDo.',
    '.odbDdlLldDdllbdDbdo..',
    '..odDDblllllllbDDdo...',
    '..orrrrrrrrrrrrrrRo...',
    '..orqqrrrrYrrrrrRRo...',
    '.oboRRRRRRyRRRRRRobo..',
    '.odboLlboRRRoLlbobdo..',
    '.oddoLlbo...oLlboddo..',
    '.oMdoLdLo...oLdLoddo..',
    '.oooooooo...oooooooo..',
  ];
  PatchDex.register({
    id: "aun",
    name: "Aun",
    species: "komainu guardian pup",
    rarity: "rare",
    blurb: "A small stone shrine guardian that sits very still, opens its mouth on \"a\", closes it on \"un\", and lets nothing unsafe past the gate.",
    coaching: "Guardrails: knowing what to approve, what to block, and when to say no to an unsafe action.",
    voice: "read the command before you approve it.",
    hatch: "The egg turns to stone, cracks like an old statue and flakes away, then two gold eyes open and Aun says \"a\"... \"un\".",
    palette: {
      o: '#2a2c3b', // outline
      L: '#e4dfd4', // stone light
      l: '#c6c5c1', // stone
      b: '#a3a6b0', // stone shade
      d: '#7b8092', // stone dark
      D: '#555b6e', // carved line
      m: '#86a052', // moss
      M: '#5b7238', // moss shade
      r: '#cc4436', // bib red
      R: '#8c2a2e', // bib shade
      q: '#ec7a5c', // bib light / tongue
      e: '#1c1a26', // eye / mouth
      Y: '#f0bf3c', // gold
      y: '#b07d22', // gold shade
      w: '#fffaf0', // shine
    },
    sprites: { idle, idle2, blink, talk, talk2, happy, happy2, sleep, sleep2, think, fidget },
    loop: [['idle', 24], ['blink', 2], ['idle', 14], ['idle2', 10], ['idle', 10], ['blink', 2], ['idle', 12], ['fidget', 6], ['idle', 14], ['think', 10], ['idle', 8]],
    entrance(k) {

      const out = k.eggIntro();
      const ex = k.eggHome.x, ey = k.eggHome.y;
      const STONE = { 0: 'o', 1: 'l', 2: 'L', 3: 'd', 4: 'b', 5: 'b', 6: 'b', 7: 'D' };
      // Stone creeps down the shell from the top.
      const wash = (rows, n, dx = 0, o = {}) => {
        const top = rows.slice(0, n), bot = rows.slice(n);
        const g = k.blank();
        k.stamp(g, top, ex + dx, ey, { ...o, map: STONE });
        k.stamp(g, bot, ex + dx, ey + n, o);
        return g;
      };
      out.push(k.f(wash(k.EGG_C2, 3), 140, { note: 'turns to stone' }));
      out.push(k.f(wash(k.EGG_C2, 6), 140));
      out.push(k.f(wash(k.EGG_C2, 10), 140));
      out.push(k.f(wash(k.EGG_C2, 14), 360));
      // A heavy stone wobble.
      [[-1, 120], [1, 120], [0, 260]].forEach(([d, ms]) => out.push(k.f(k.egg(k.EGG_C2, 0, 0, { ...k.lean(d), map: STONE }), ms)));
      // Carved cracks spread.
      let g = k.egg(k.EGG_C2, 0, 0, { map: STONE });
      [[3, 6], [4, 7], [4, 8], [8, 6], [7, 7], [8, 8], [8, 9], [5, 10]].forEach(([x, y]) => k.px(g, ex + x, ey + y, 'D'));
      out.push(k.f(g, 300, { note: 'cracks' }));
      // The shell sheds in chunks: lid pops, halves fall away, dust.
      const L = k.EGG_BOTTOM.map(r => r.slice(0, 6)), R = k.EGG_BOTTOM.map(r => r.slice(6));
      const sm = { map: STONE };
      g = k.at(statue); k.stamp(g, k.EGG_BOTTOM, ex, ey, sm); k.stamp(g, k.EGG_TOP, ex, ey - 3, sm);
      out.push(k.f(g, 140, { note: 'shell sheds' }));
      g = k.at(statue); k.stamp(g, L, ex - 2, ey + 1, sm); k.stamp(g, R, ex + 8, ey + 1, sm); k.stamp(g, k.EGG_TOP, ex - 5, ey - 7, sm);
      out.push(k.f(g, 120));
      g = k.at(statue); k.stamp(g, L, ex - 6, ey + 4, sm); k.stamp(g, R, ex + 12, ey + 4, sm);
      out.push(k.f(g, 120));
      g = k.at(statue); k.stamp(g, L, ex - 9, ey + 8, sm); k.stamp(g, R, ex + 15, ey + 8, sm);
      [[1, 20], [3, 19], [24, 20], [26, 19], [2, 17], [25, 17]].forEach(([x, y]) => k.px(g, x, y, 'l'));
      out.push(k.f(g, 160));
      g = k.at(statue);
      [[1, 18], [3, 16], [25, 18], [26, 16], [0, 14], [27, 13]].forEach(([x, y]) => k.px(g, x, y, 'b'));
      out.push(k.f(g, 420, { note: 'still as stone' }));
      // Gold eyes flash awake.
      out.push(k.f(k.at('idle', 0, -1), 140, { note: 'wakes' }));
      g = k.at('idle'); [[6, 4], [21, 4], [2, 8], [25, 8]].forEach(([x, y]) => k.px(g, x, y, 'Y'));
      out.push(k.f(g, 260));
      // A ... un.
      out.push(k.f(k.at('talk'), 560, { note: 'a' }));
      out.push(k.f(k.at('idle'), 560, { note: 'un' }));
      out.push(k.f(k.at('happy'), 220), k.f(k.at('happy2', 0, -1), 160), k.f(k.at('happy'), 220), k.f(k.at('happy2', 0, -1), 160), k.f(k.at('happy'), 260));
      out.push(k.f(k.at('blink'), 110), k.f(k.at('idle'), 420));
      return out;
    },
  });
})();
