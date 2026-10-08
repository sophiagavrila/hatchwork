// Rivet — armadillo. Banded armor, brass rivets. Coaches verification: prove it works before calling it done.
(function () {
  const idle = [
    '........oo..........',
    '.......oFo..oo......',
    '......oFpoOoto......',
    '.....oFppoottoOO....',
    '.....oTpoLotoBsBO...',
    '......ooLLBsLBsBsO..',
    '....OOOOOBBsBBsBsO..',
    '...OLLBBsOBsBBsBssO.',
    '..oFTTTTTtosBBsBssO.',
    '.oFTTewTTtosBssBsSO.',
    'pFTTTeeTTtosBssSsSOO',
    'oopTTeepTtosBsSsSSOO',
    '..ootTTttooRSSSRSSOO',
    '....oooooOOOOOOOOO..',
    '..oTTo..otto.otto...',
    '..oooo..oooo.oooo...',
  ];
  const blink = [
    '........oo..........',
    '.......oFo..oo......',
    '......oFpoOoto......',
    '.....oFppoottoOO....',
    '.....oTpoLotoBsBO...',
    '......ooLLBsLBsBsO..',
    '....OOOOOBBsBBsBsO..',
    '...OLLBBsOBsBBsBssO.',
    '..oFTTTTTtosBBsBssO.',
    '.oFTTTTTTtosBssBsSO.',
    'pFTTTeeTTtosBssSsSOO',
    'oopTTTTpTtosBsSsSSOO',
    '..ootTTttooRSSSRSSOO',
    '....oooooOOOOOOOOO..',
    '..oTTo..otto.otto...',
    '..oooo..oooo.oooo...',
  ];
  const talk = [
    '........oo..........',
    '.......oFo..oo......',
    '......oFpoOoto......',
    '.....oFppoottoOO....',
    '.....oTpoLotoBsBO...',
    '......ooLLBsLBsBsO..',
    '....OOOOOBBsBBsBsO..',
    '...OLLBBsOBsBBsBssO.',
    '..oFTTTTTtosBBsBssO.',
    '.oFTTewTTtosBssBsSO.',
    'pFTTTeeTTtosBssSsSOO',
    'ooeTTeepTtosBsSsSSOO',
    '..potTTttooRSSSRSSOO',
    '....oooooOOOOOOOOO..',
    '..oTTo..otto.otto...',
    '..oooo..oooo.oooo...',
  ];
  const happy = [
    '........oo..........',
    '.......oFo..oo......',
    '......oFpoOoto......',
    '.....oFppoottoOO....',
    '.....oTpoLotoBsBO...',
    '......ooLLBsLBsBsO..',
    '....OOOOOBBsBBsBsO..',
    '...OLLBBsOBsBBsBssO.',
    '..oFTTTTTtosBBsBssO.',
    '.oFTTeeTTtosBssBsSO.',
    'pFTTeTTeTtosBssSsSOO',
    'ooeTTTTpptosBsSsSSOO',
    '..potTTttooRSSSRSSOO',
    '....oooooOOOOOOOOO..',
    '..oTTo..otto.otto...',
    '..oooo..oooo.oooo...',
  ];
  const happy2 = [
    '.......oFo..oo......',
    '......oFpoOoto......',
    '.....oFppoottoOO....',
    '.....oTpoLotoBsBO...',
    '......ooLLBsLBsBsO..',
    '....OOOOOBBsBBsBsO..',
    '...OLLBBsOBsBBsBssO.',
    '..oFTTTTTtosBBsBssO.',
    '.oFTTeeTTtosBssBsSO.',
    'pFTTeTTeTtosBssSsSOO',
    'ooeTTTTpptosBsSsSSOO',
    '..potTTttooRSSSRSSOO',
    '....oooooOOOOOOOOO..',
    '..oTTo..otto.otto...',
    '..oooo..oooo.oooo...',
    '....................',
  ];
  const sleep = [
    '....................',
    '....oo..............',
    '...oFo.OOOOOO.......',
    '..oFpoOBBLBssO......',
    '..oToOLLBBBssBO.....',
    '....ooLLssRssBsO....',
    '...oToLBssBsssssO...',
    '...oToBBssBsSsssO...',
    '...OTTBBssBsSsssO...',
    '...OTTBBssssSssSO...',
    '...oToBBsSsSSsSSO...',
    '...oToBBSSsSSSSSO...',
    '....ooBsSSRSSSSO....',
    '.....OssSssSSSO.....',
    '......OSSsSSSO......',
    '.......OOOOOO.......',
  ];
  const sleep2 = [
    '....................',
    '....................',
    '....oo..............',
    '...oFo.OOOOOO.......',
    '..oFpoOBBLBssO......',
    '..oToOLLBBBssBOO....',
    '....ooLBssRssBsO....',
    '...oToBBssBsssssO...',
    '...OToBBssBBSsssO...',
    '...OTTBBssssSsssO...',
    '...OToBBsSssSssSO...',
    '...oToBBSSsSSsSSO...',
    '....ooBsSSRSSSSO....',
    '....oOssSssSSSOO....',
    '......OSSsSSSO......',
    '.......OOOOOO.......',
  ];
  const think = [
    '.LL.....oo..........',
    'L..L...oFo..oo......',
    '..L...oFpoOoto......',
    '.....oFppoottoOO....',
    '..L..oTpoLotoBsBO...',
    '....OOOOOLBsLBsBsO..',
    '...OLLBBsOBsBBsBsO..',
    '..oFTewTTtosBBsBssO.',
    'poFTTeeTTtosBBsBssO.',
    'oFTTTTTpTtosBssBsSO.',
    '.ooTTTTTttosBssSsSOO',
    '...otTTttoosBsSsSSOO',
    '....oooooSSRSSSRSSOO',
    '......OOOOOOOOOOOO..',
    '..oTTo..otto.otto...',
    '..oooo..oooo.oooo...',
  ];
  const fidget = [
    '................OO..',
    '................OLO.',
    '......oooOOooO...ORO',
    '.....oFppoottoOO.OBO',
    '......ooToLooosBOOsO',
    '......OLoLBsLBsBsORO',
    '....OOOOOBBsBBsBsOsO',
    '...OLLBBsOBsBBsBssOO',
    '..oFTTTTTtosBBsBssOO',
    '.oFTTTewTtosBssBsSOO',
    'pFTTTTeeTtosBssSsSOO',
    'oopTTTeeptosBsSsSSO.',
    '..ootTTttooRSSSRSSO.',
    '....oooooOOOOOOOOO..',
    '..oTTo..otto.otto...',
    '..oooo..oooo.oooo...',
  ];
  const ball0 = [
    '....................',
    '....................',
    '.......OOOOOO.......',
    '......OBBLBssO......',
    '.....OLLBBBssBO.....',
    '....ooLLssRssBsO....',
    '...oToLBssBsssssO...',
    '...oToBBssBsSsssO...',
    '...OTTBBssBsSsssO...',
    '...OTTBBssssSssSO...',
    '...oToBBsSsSSsSSO...',
    '...oToBBSSsSSSSSO...',
    '....ooBsSSRSSSSO....',
    '.....OssSssSSSO.....',
    '......OSSsSSSO......',
    '.......OOOOOO.......',
  ];
  const ball1 = [
    '....................',
    '....................',
    '.......OOOOOO.......',
    '......OBLLBBBO......',
    '.....OLBBsBBBBO.....',
    '....OLLLsssBBBsO....',
    '...OBBBRBBssBsssO...',
    '...OLBssBBBsSsssO...',
    '...OLBsssBBsSSssO...',
    '...ooBBBsssssSSSO...',
    '...oToBBBSSssSSSO...',
    '...oTToossSSRSSSO...',
    '....opTossSSSSSO....',
    '.....OptossSSSO.....',
    '......ottoSSSO......',
    '.......oooOOO.......',
  ];
  const ball2 = [
    '....................',
    '....................',
    '.......OOOOOO.......',
    '......OLLLBBBO......',
    '.....OLLLBBBBBO.....',
    '....OLLLBBBBBBsO....',
    '...OBBBssssssSSSO...',
    '...OBBsssBBsSSSSO...',
    '...OLBRBBBBssRssO...',
    '...OBBssssSSSSsSO...',
    '...OsssssSSSSSSSO...',
    '...OsBBBsssssSSSO...',
    '....OBBsssssSSSO....',
    '.....OooottoooO.....',
    '......otttttto......',
    '.......ooOOoo.......',
  ];
  const ball3 = [
    '....................',
    '....................',
    '.......OOOOOO.......',
    '......OLLLBBsO......',
    '.....OLLLBsssBO.....',
    '....OLLLBsssBBsO....',
    '...OLLLBssBBRSSSO...',
    '...OLLBssBBBSSSsO...',
    '...OLBssBBBSSSssO...',
    '...OBssBBBSSsssoo...',
    '...OBssBBSSsssoto...',
    '...OssBRSSssootto...',
    '....OBBSSSssotpo....',
    '.....OsSSssotpO.....',
    '......OSssotto......',
    '.......OOOooo.......',
  ];
  const ball4 = [
    '....................',
    '....................',
    '.......OOOOOO.......',
    '......OBBLBssO......',
    '.....OLBBBBsBBO.....',
    '....OLLBsRssBBoo....',
    '...OLLLssBssBsoto...',
    '...OLLBssBssssoto...',
    '...OLBBsBBsSssttO...',
    '...OBBBsBBSSssttO...',
    '...OBBBsssSSssoto...',
    '...OBBBsSsSSsSoto...',
    '....OBBSSRSSSSoo....',
    '.....OsSSssSSSO.....',
    '......OSSsSSSO......',
    '.......OOOOOO.......',
  ];
  const ball5 = [
    '....................',
    '....................',
    '.......OOOooo.......',
    '......OBLLoTTo......',
    '.....OLBBBBoTpO.....',
    '....OLLBssBBoTpo....',
    '...OBBLRssBBootto...',
    '...OLBsBBssBssoto...',
    '...OLssBBBsSsssoo...',
    '...OBBssBBsSSSsSO...',
    '...OBBBsssssSSSSO...',
    '...OBBBBSSssRSSSO...',
    '....OBBssSSSSSSO....',
    '.....OssssSSSSO.....',
    '......OsssSSSO......',
    '.......OOOOOO.......',
  ];
  const ball6 = [
    '....................',
    '....................',
    '.......ooOOoo.......',
    '......oTTTTTTo......',
    '.....OoooTToooO.....',
    '....OLLLBBBBBBsO....',
    '...OBLLBBBBBBssSO...',
    '...OBBssssssSSSSO...',
    '...OLBsssssSSSssO...',
    '...OBBRBBBsssRsSO...',
    '...OsssssssSSSSSO...',
    '...OssssSSSSSSSSO...',
    '....OBBsssssSSSO....',
    '.....OsssssSSSO.....',
    '......OsssSSSO......',
    '.......OOOOOO.......',
  ];
  const ball7 = [
    '....................',
    '....................',
    '.......oooOOO.......',
    '......oTToBBsO......',
    '.....OpToBBssBO.....',
    '....opToBBsssBsO....',
    '...oTTooBBssRsSSO...',
    '...oToBBBssBsSSsO...',
    '...ooBBBssBssSSsO...',
    '...OBBsssBssSSsSO...',
    '...OBsssBssSSsSSO...',
    '...OsssRssSSsSSSO...',
    '....OBBsSSSsSSSO....',
    '.....OsSSSsSSSO.....',
    '......OSssSSSO......',
    '.......OOOOOO.......',
  ];
  const squash = [
    '....................',
    '....................',
    '....................',
    '....................',
    '.......OOOOOO.......',
    '.....OOBBLBssOO.....',
    '....ooLLsBRssBBO....',
    '....ooLBssBssBsO....',
    '...oToBBssBsSsssO...',
    '...OTTBBssBsSsssO...',
    '...OTTBBssssSssSO...',
    '...oToBBsSsSSsSSO...',
    '....ooBsSSRSSSSO....',
    '....oossSssSSSSO....',
    '.....OOSSsSSSOO.....',
    '.......OOOOOO.......',
  ];
  const squashR = [
    '....................',
    '....................',
    '....................',
    '....................',
    '.......OOOOOO.......',
    '.....OOBBLBssOO.....',
    '....OLLBsRBsBBoo....',
    '....OLLssBssBBoo....',
    '...OLLBssBssssoto...',
    '...OLBBsBBsSssttO...',
    '...OBBBsBBSSssttO...',
    '...OBBBsssSSssoto...',
    '....OBBSSRSSsSoo....',
    '....OBsSSssSSSoo....',
    '.....OOSSsSSSOO.....',
    '.......OOOOOO.......',
  ];
  const peek = [
    '....................',
    '....................',
    '.........OOOOOO.....',
    '........OBBLBssO....',
    '.......OLLBBBssBO...',
    '......ooLLssRssBsO..',
    '.....oToLBssBsssssO.',
    '.....oToBBssBsSsssO.',
    '...oFTTTTTtoBsSsssO.',
    '..oFTTewTTtossSssSO.',
    '.pFTTTeeTTtosSSsSSO.',
    '.oopTTeepTtosSSSSSO.',
    '...ootTTttooRSSSSO..',
    '.......OssSssSSSO...',
    '........OSSsSSSO....',
    '.........OOOOOO.....',
  ];
  PatchDex.register({
    id: "rivet",
    name: "Rivet",
    species: "riveted armadillo",
    rarity: "common",
    blurb: "Sturdy and unhurried; it would rather check twice than roll back once.",
    coaching: "Verification and tests: run the suite, read the output, then say done.",
    voice: "looks right. run the tests before we call it done.",
    hatch: "An armored ball bursts out, rolls across, bounces back, wobbles, and pops open.",
    palette: {
      O: '#1d2440', // armor outline
      S: '#2c3d66', // armor shadow
      s: '#43608f', // armor mid
      B: '#6487b8', // armor base
      L: '#a6c2e2', // armor highlight
      o: '#5a2f2a', // skin outline
      t: '#b9785a', // skin shadow
      T: '#e3b07e', // skin base
      F: '#f7d9a8', // skin highlight
      R: '#d9a43c', // brass rivet
      p: '#e48a86', // ear / nose pink
      e: '#231a2e', // eye
      w: '#ffffff', // eye shine
    },
    sprites: { idle, blink, talk, happy, happy2, sleep, sleep2, think, fidget },
    loop: [['idle', 28], ['blink', 2], ['idle', 22], ['fidget', 4], ['idle', 16], ['blink', 2], ['idle', 5], ['blink', 2]],
    entrance(k) {
      const out = k.eggIntro();
      // The clasp (tucked head + tail) marks the spin: index-- turns clockwise (rolling right), index++ counter-clockwise.
      const BALL = [ball0, ball1, ball2, ball3, ball4, ball5, ball6, ball7];
      const B = i => BALL[((i % 8) + 8) % 8];
      const L = k.EGG_BOTTOM.map(r => r.slice(0, 6)), R = k.EGG_BOTTOM.map(r => r.slice(6));
      const ex = k.eggHome.x, ey = k.eggHome.y;
      // Burst: the lid pops and the ball tumbles up out of the shell.
      let g = k.at(B(4), 0, 2); k.stamp(g, k.EGG_BOTTOM, ex, ey); k.stamp(g, k.EGG_TOP, ex, ey - 3);
      out.push(k.f(g, 90));
      g = k.at(B(3), 0, -4); k.stamp(g, L, ex - 2, ey + 1); k.stamp(g, R, ex + 8, ey + 1); k.stamp(g, k.EGG_TOP, ex - 3, ey - 8);
      out.push(k.f(g, 90, { note: 'burst' }));
      g = k.at(B(2), 0, -6); k.stamp(g, L, ex - 6, ey + 3); k.stamp(g, R, ex + 12, ey + 3);
      out.push(k.f(g, 100));
      g = k.at(B(1), 0, -3); k.stamp(g, L, ex - 10, ey + 6); k.stamp(g, R, ex + 16, ey + 6);
      out.push(k.f(g, 80));
      out.push(k.f(k.at(squash), 90, { note: 'lands' }));
      // Roll right (clockwise) into the wall, squash, roll back left (counter-clockwise).
      [[2, -1], [4, -2], [6, -3]].forEach(([dx, i]) => out.push(k.f(k.at(B(i), dx), 85)));
      out.push(k.f(k.at(squashR, 7), 110, { note: 'bounce' }));
      [[5, 5], [2, 6], [-1, 7], [-3, 8], [-4, 9]].forEach(([dx, i], n) => out.push(k.f(k.at(B(i), dx), 85 + n * 10)));
      // Rocks back right, slowing, clasp settling at the front.
      [[-2, 8], [-1, 8], [0, 8]].forEach(([dx, i], n) => out.push(k.f(k.at(B(i), dx), 130 + n * 20)));
      // Wobble to a stop.
      out.push(k.f(k.at(ball0, 0, 0, k.lean(-1)), 120), k.f(k.at(ball0, 0, 0, k.lean(1)), 120), k.f(k.at(ball0), 260, { note: 'settle' }));
      // Uncurl with a pop.
      out.push(k.f(k.at(squash), 80), k.f(k.at(peek), 160, { note: 'peek' }));
      out.push(k.f(k.sparkle(k.at('happy2'), 0), 140, { note: 'pop' }), k.f(k.sparkle(k.at('happy'), 1), 300));
      out.push(k.f(k.at('blink'), 110), k.f(k.at('idle'), 400));
      return out;
    },
  });
})();
