// Original, schematic SVG scenes for Sewing Studio AI.
// Every scene returns { vb:[w,h], svg, anchors }. Parts carry data-part="id" so a step
// can highlight them, and the hotspot layer in app.js can sit on top of them.
// Drawings are simplified and not to scale; they are NOT traced from any manual.

const C = {
  body: '#F4F1F3', line: '#4d6060', metal: '#CBD5D7', metal2: '#E3EAEB', dark: '#33484a',
  teal: '#008080', tealD: '#006666', fawn: '#E5A361', screen: '#16393b', thread: '#D6456B',
  thread2: '#3F72C9', cream: '#FBF3E4', clear: '#DDEFF2'
};
const sw = 'stroke-linejoin="round" stroke-linecap="round"';
const st = (f = C.body, s = C.line, w = 1.6) => `fill="${f}" stroke="${s}" stroke-width="${w}" ${sw}`;
const P = (id, inner) => `<g data-part="${id}">${inner}</g>`;
const R = (x, y, w, h, rx = 3, f, s, lw) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ${st(f, s, lw)}/>`;
const CI = (x, y, r, f, s, lw) => `<circle cx="${x}" cy="${y}" r="${r}" ${st(f, s, lw)}/>`;
const PA = (d, f, s, lw) => `<path d="${d}" ${st(f, s, lw)}/>`;
const L = (x1, y1, x2, y2, s = C.line, w = 1.6, extra = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${s}" stroke-width="${w}" ${sw} ${extra}/>`;
const T = (x, y, t, size = 11, fill = C.dark, anchor = 'middle', wt = 600) => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${wt}" style="font-family:inherit">${t}</text>`;

export const defs = `<defs>
<marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.tealD}"/></marker>
<pattern id="grid" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M12 0H0V12" fill="none" stroke="#9fc5c5" stroke-width=".7"/></pattern>
<pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="#9aa9ab" stroke-width="1.4"/></pattern>
</defs>`;

/* ---------- machine body (shared by front/back/module) ---------- */
const BODY = 'M80,58 H570 Q596,58 596,84 V318 Q596,336 578,336 H62 Q40,336 40,314 V286 Q40,272 56,272 H470 V180 H210 V230 Q210,238 200,238 H76 Q62,238 62,224 V80 Q62,58 80,58 Z';

function front(o = {}) {
  const g = !!o.generic;
  let s = '';
  s += PA(BODY, C.body, C.line, 2);
  s += PA('M62,80 Q62,58 80,58 H570 Q596,58 596,84', 'none', '#ffffff', 3);
  // spool + pin on top
  s += P('spoolPin', `${R(318, 36, 14, 24, 2, C.metal)}${R(292, 22, 66, 18, 5, '#e9d9ee')}${R(298, 24, 54, 14, 3, '#cfa3dc', '#8d5fa0', 1)}${R(286, 40, 78, 5, 2, C.metal)}`);
  // head
  s += P('takeup', `${R(92, 70, 88, 20, 10, '#2b3f41', C.line, 1.4)}${L(136, 72, 136, 88, C.fawn, 4)}`);
  s += P('funcButtons', `${CI(104, 120, 9, '#d7efe6')}${CI(134, 120, 9, C.metal2)}${CI(164, 120, 9, C.metal2)}${PA('M99,120 l10,0 M104,115 v10', 'none', C.tealD, 1.3)}`);
  s += P('threader', `${R(54, 168, 16, 36, 6, C.metal)}${L(62, 172, 62, 200, C.dark, 1.2)}`);
  s += P('cutter', `${R(54, 206, 16, 22, 6, C.metal2)}${PA('M58,212 l8,10 M66,212 l-8,10', 'none', C.dark, 1.4)}`);
  s += P('lighting', `${R(86, 236, 100, 5, 2.5, '#FFE9A8', '#c79a25', 1)}`);
  // needle + foot
  s += P('needleArea', `${R(124, 150, 12, 82, 2, C.metal)}${R(104, 224, 54, 22, 4, C.metal2)}${L(130, 232, 130, 266, C.dark, 3)}${PA('M127,262 l3,9 l3,-9 z', C.dark, C.dark, 1)}`);
  s += P('stitchPlate', `${R(70, 272, 130, 9, 2, C.metal)}`);
  // bed bits
  s += P('feedDog', `${R(150, 304, 46, 14, 7, C.metal2)}${CI(162, 311, 4, C.dark, C.dark, 1)}${L(172, 311, 190, 311, C.dark, 1.2)}`);
  s += P('moduleSocket', `${R(42, 288, 14, 40, 3, C.dark)}${L(46, 296, 52, 296, C.metal, 2)}${L(46, 304, 52, 304, C.metal, 2)}${L(46, 312, 52, 312, C.metal, 2)}`);
  // handwheel
  s += P('handwheel', `${R(594, 112, 26, 70, 8, C.metal2)}${L(600, 120, 600, 174, '#b3bfc1', 1.2)}${L(606, 120, 606, 174, '#b3bfc1', 1.2)}`);
  if (!g) {
    s += P('screen', `${R(300, 84, 150, 76, 10, C.screen, C.dark, 2)}${R(312, 94, 36, 24, 4, '#2c6a6a', '#2c6a6a', 1)}${R(354, 94, 36, 24, 4, '#2c6a6a', '#2c6a6a', 1)}${R(396, 94, 40, 24, 4, '#E5A361', '#E5A361', 1)}${R(312, 126, 124, 22, 4, '#244e50', '#244e50', 1)}`);
    s += P('controlsL', `${CI(262, 98, 11, C.metal2)}${CI(262, 128, 11, C.metal2)}${R(252, 148, 22, 6, 3, C.metal)}${CI(263, 151, 5, C.teal, C.tealD, 1)}`);
    s += P('controlsR', `${CI(486, 94, 10, C.metal2)}${CI(520, 94, 10, C.metal2)}${CI(554, 94, 10, C.metal2)}${CI(486, 128, 10, C.metal2)}${CI(520, 128, 10, C.metal2)}${CI(554, 128, 10, C.metal2)}`);
  } else {
    s += P('tensionDial', `${CI(262, 112, 24, C.metal2, C.line, 1.8)}${CI(262, 112, 15, C.body)}${L(262, 112, 262, 96, C.tealD, 3)}${[...Array(8)].map((_, i) => L(262 + 22 * Math.cos(i * .785), 112 + 22 * Math.sin(i * .785), 262 + 26 * Math.cos(i * .785), 112 + 26 * Math.sin(i * .785), C.line, 1.2)).join('')}`);
    s += P('stitchSelect', `${R(330, 90, 100, 64, 8, C.screen, C.dark, 2)}${T(380, 128, '— • —', 16, '#cfe')}`);
    s += P('startStop', `${CI(500, 108, 14, '#bfe8d8', C.tealD, 2)}${PA('M495,101 l12,7 l-12,7 z', C.tealD, C.tealD, 1)}`);
    s += P('reverse', `${R(538, 96, 40, 24, 8, C.metal2)}${PA('M566,108 h-20 m6,-6 l-6,6 l6,6', 'none', C.dark, 1.8)}`);
  }
  const A = g
    ? { spoolPin: [325, 30], takeup: [136, 80], tensionDial: [262, 112], needleArea: [130, 252], feedDog: [172, 311], handwheel: [607, 148], stitchSelect: [380, 122], startStop: [500, 108], reverse: [558, 108], threader: [62, 186], cutter: [62, 217], lighting: [136, 238], moduleSocket: [49, 308] }
    : { spoolPin: [325, 30], takeup: [136, 80], needleArea: [130, 252], feedDog: [172, 311], handwheel: [607, 148], screen: [375, 122], controlsL: [262, 125], controlsR: [520, 111], funcButtons: [134, 120], threader: [62, 186], cutter: [62, 217], lighting: [136, 238], moduleSocket: [49, 308] };
  return { vb: [640, 360], svg: s, anchors: A };
}

function back() {
  let s = '';
  s += `<g transform="translate(640,0) scale(-1,1)">${PA(BODY, C.body, C.line, 2)}</g>`;
  s += P('handle', `${PA('M240,58 V34 Q240,22 252,22 H330 Q342,22 342,34 V58', 'none', C.line, 6)}${PA('M240,58 V34 Q240,22 252,22 H330 Q342,22 342,34 V58', 'none', C.metal2, 3)}`);
  s += P('penHolder', `${R(420, 46, 70, 10, 5, C.dark)}${L(430, 50, 484, 50, C.metal, 2)}`);
  s += P('handwheelB', `${R(20, 112, 26, 70, 8, C.metal2)}${L(30, 120, 30, 174, '#b3bfc1', 1.2)}${L(36, 120, 36, 174, '#b3bfc1', 1.2)}`);
  s += P('lifter', `${R(512, 98, 34, 14, 5, C.metal2)}${PA('M520,96 v-12 h18 v12', 'none', C.dark, 2)}`);
  s += P('powerSwitch', `${R(86, 262, 40, 24, 5, C.dark)}${R(98, 266, 16, 16, 3, '#e8fff6', C.tealD, 1.2)}`);
  s += P('powerSocket', `${R(142, 264, 42, 22, 4, C.dark)}${CI(156, 275, 4, C.metal)}${CI(170, 275, 4, C.metal)}`);
  s += P('footSocket', `${CI(98, 312, 12, C.dark)}${CI(98, 312, 5, C.metal)}`);
  s += P('usb', `${R(140, 304, 30, 16, 3, C.dark)}${R(145, 309, 20, 6, 1, C.metal)}`);
  s += P('sewingTableB', `${R(270, 276, 150, 54, 6, '#e9eeee', C.line, 1.4)}${R(300, 288, 90, 28, 4, '#ffffff', C.line, 1)}`);
  return { vb: [640, 360], svg: s, anchors: { handle: [291, 24], penHolder: [455, 50], handwheelB: [33, 148], lifter: [529, 105], powerSwitch: [106, 274], powerSocket: [163, 275], footSocket: [98, 312], usb: [155, 312], sewingTableB: [345, 303] } };
}

function head() {
  let s = '';
  s += PA('M70,70 Q70,30 112,30 H350 Q392,30 392,70 V270 Q392,300 362,300 H230 V352 H104 V300 Q70,300 70,270 Z', C.body, C.line, 2);
  // spool (horizontal pin on top right, drawn side-on)
  s += P('spoolPin', `${R(398, 52, 54, 12, 3, C.metal)}${R(416, 36, 16, 44, 3, '#cfa3dc', '#8d5fa0', 1)}${R(412, 32, 24, 7, 3, C.metal2)}${R(412, 77, 24, 7, 3, C.metal2)}`);
  s += P('spoolCap', `${PA('M438,40 l12,-6 v48 l-12,-6 z', C.metal2)}`);
  s += P('felt', `${R(404, 44, 8, 28, 2, '#e8d6a2', '#a18a45', 1)}`);
  s += P('guideEyelet', `${CI(350, 60, 8, '#ffffff', C.line, 2)}${R(346, 62, 8, 10, 2, C.metal)}`);
  s += P('rearGuide', `${R(286, 46, 30, 22, 4, C.metal2)}${PA('M290,68 q11,14 22,0', 'none', C.dark, 2)}`);
  s += P('tension', `${CI(250, 140, 26, C.metal2, C.line, 2)}${CI(250, 140, 16, '#ffffff')}${L(250, 140, 250, 128, C.tealD, 3)}${L(224, 140, 276, 140, 'none', 0)}`);
  s += P('pressureDial', `${CI(330, 170, 16, C.metal2)}${L(330, 170, 330, 158, C.dark, 3)}`);
  s += P('takeup', `${R(124, 76, 74, 26, 13, '#2b3f41', C.line, 1.5)}${L(161, 79, 161, 99, C.fawn, 5)}`);
  s += P('takeupCover', `${PA('M198,96 q22,0 22,26 v70 q0,16 -16,16 h-60 q-16,0 -16,-16 v-60', 'none', '#7a8e90', 3)}`);
  s += P('needleGuides', `${R(138, 196, 18, 8, 2, C.metal)}${R(138, 226, 18, 8, 2, C.metal)}${PA('M124,256 h40 v14 h-40 z', C.metal2)}${L(136, 256, 136, 270, C.dark, 1.5)}${L(152, 256, 152, 270, C.dark, 1.5)}`);
  s += P('cutter', `${R(84, 276, 28, 14, 5, C.metal2)}${PA('M90,280 l12,6 M102,280 l-12,6', 'none', C.dark, 1.5)}`);
  s += P('threader', `${R(92, 300, 14, 40, 5, C.metal)}`);
  s += P('needle', `${L(146, 300, 146, 346, C.dark, 3.5)}${PA('M143,342 l3,10 l3,-10 z', C.dark, C.dark, 1)}`);
  s += P('bobbinWinderTop', `${R(300, 220, 56, 34, 6, C.metal2)}${CI(328, 237, 10, '#cfe')}`);
  // thread path
  const th = `M452,58 L412,58 L350,52 L300,56 L270,96 L262,168 L224,176 L190,168 L168,112 L168,92 L168,100 L156,152 L156,200 L156,230 L146,262 L146,300 L146,346`;
  s += `<path id="threadPath" d="M424,58 C400,46 372,52 350,56 C320,60 300,66 292,70 C275,86 262,100 262,130 V172 C262,184 250,188 232,186 C204,186 186,176 178,150 V102 C178,86 168,86 160,98 V150 C160,170 156,176 150,190 V205 L150,232 L146,262 V300 V346" fill="none" stroke="${C.thread}" stroke-width="2.6" stroke-dasharray="7 5" ${sw}/>`;
  const marks = [[350, 40, 1], [300, 40, 2], [286, 140, 3], [200, 200, 4], [180, 80, 5], [172, 214, 6], [130, 262, 7], [120, 330, 8]];
  s += marks.map(([x, y, n]) => `<g><circle cx="${x}" cy="${y}" r="9" fill="${C.thread}"/><text x="${x}" y="${y + 3.6}" font-size="11" text-anchor="middle" fill="#fff" font-weight="700" style="font-family:inherit">${n}</text></g>`).join('');
  return { vb: [480, 370], svg: s, anchors: { spoolPin: [425, 58], spoolCap: [444, 58], felt: [408, 58], guideEyelet: [350, 60], rearGuide: [301, 58], tension: [250, 140], pressureDial: [330, 170], takeup: [161, 89], takeupCover: [212, 160], needleGuides: [147, 230], cutter: [98, 283], threader: [99, 320], needle: [146, 330] } };
}

function needleArea() {
  let s = '';
  s += R(110, -10, 190, 112, 14, C.body, C.line, 2);
  s += R(60, 300, 320, 90, 8, C.body, C.line, 2);
  s += P('needleBar', R(205, 70, 10, 100, 2, C.metal));
  s += P('presserBar', R(234, 70, 12, 96, 2, C.metal));
  s += P('threader', `${R(142, 112, 20, 50, 7, C.metal, C.line, 1.6)}${L(152, 118, 152, 156, C.dark, 1.3)}`);
  s += P('buttonholeLever', `${R(284, 96, 10, 54, 3, C.metal2)}${R(278, 140, 22, 12, 4, C.dark)}`);
  s += P('needleHolder', R(194, 132, 32, 36, 4, '#5a7274', C.line, 1.6));
  s += P('needleScrew', `${CI(232, 148, 6, C.metal2, C.line, 1.6)}${L(228, 148, 236, 148, C.dark, 1.4)}`);
  s += P('footHolder', R(220, 164, 44, 22, 4, '#5a7274', C.line, 1.6));
  s += P('footScrew', `${CI(274, 174, 6, C.metal2, C.line, 1.6)}${L(270, 174, 278, 174, C.dark, 1.4)}${L(262, 174, 268, 174, C.line, 2)}`);
  s += P('needle', `${L(210, 168, 210, 250, C.dark, 4)}${PA('M206,246 l4,12 l4,-12 z', C.dark, C.dark, 1)}`);
  s += P('footSole', `${PA('M164,190 H276 V212 H164 Z', '#d7e0e1', C.line, 1.6)}${L(210, 190, 210, 212, 'none', 0)}${R(202, 190, 16, 22, 1, '#ffffff', C.line, 1)}`);
  s += P('crossPin', `${L(238, 192, 238, 200, C.dark, 3)}`);
  s += P('stitchPlate', `${PA('M100,262 H340 L376,306 H64 Z', C.metal, C.line, 1.8)}${CI(210, 282, 6, '#37484a', C.dark, 1)}`);
  s += P('feedDog', `${PA('M170,274 H252 V288 H170 Z', '#aab7b9', C.line, 1.2)}${[...Array(9)].map((_, i) => L(174 + i * 9, 276, 174 + i * 9, 286, C.dark, 1.2)).join('')}`);
  s += P('bobbinCover', `${PA('M270,270 H334 L350,296 H258 Z', C.clear, C.line, 1.6)}${R(290, 292, 22, 8, 3, C.metal2, C.line, 1.2)}`);
  s += P('plateRelease', `${R(336, 312, 30, 14, 5, C.metal2, C.line, 1.6)}`);
  return { vb: [420, 390], svg: s, anchors: { needleBar: [210, 100], presserBar: [240, 100], threader: [152, 130], buttonholeLever: [289, 120], needleHolder: [210, 150], needleScrew: [232, 148], footHolder: [242, 176], footScrew: [274, 174], needle: [210, 220], footSole: [200, 202], crossPin: [238, 196], stitchPlate: [128, 282], feedDog: [212, 281], bobbinCover: [304, 280], plateRelease: [351, 319] } };
}

function needle(o = {}) {
  const insert = o.mode === 'insert';
  let s = '';
  if (insert) {
    s += P('needleHolder', `${R(172, 14, 76, 84, 8, '#5a7274', C.line, 2)}${R(186, 22, 48, 68, 4, '#2c4143', C.line, 1)}`);
    s += P('needleScrew', `${CI(266, 56, 8, C.metal2, C.line, 2)}${L(260, 56, 272, 56, C.dark, 2)}${L(248, 56, 258, 56, C.line, 3)}`);
  }
  s += P('shank', `${PA('M194,26 H226 V112 H194 Z', C.metal, C.line, 1.8)}${L(206, 30, 206, 108, '#aebaBC', 1.2)}`);
  s += P('shoulder', PA('M194,112 H226 L216,146 H204 Z', C.metal, C.line, 1.8));
  s += P('blade', PA('M204,146 H216 L214,300 H206 Z', C.metal, C.line, 1.8));
  s += P('groove', L(207, 150, 207, 296, C.tealD, 2.4));
  s += P('scarf', PA('M215,274 q6,6 0,16', 'none', C.dark, 2));
  s += P('eye', `<ellipse cx="210" cy="290" rx="2.6" ry="9" fill="#ffffff" stroke="${C.dark}" stroke-width="1.4"/>`);
  s += P('point', PA('M206,298 H214 L210,336 Z', C.metal2, C.line, 1.8));
  s += P('flat', `<g transform="translate(330,70)"><circle r="26" ${st('#e9eeee')}/><path d="M-26,-12 H26" stroke="${C.fawn}" stroke-width="4" ${sw}/>${T(0, -36, 'BACK (away from you)', 10.5, C.dark)}${T(0, 46, 'FRONT', 10.5, C.dark)}${T(0, 4, 'top view', 10, '#6b7b7c', 'middle', 500)}</g>`);
  s += P('system', `${T(210, 360, '130/705 H · size 70–120', 12, C.tealD)}`);
  return { vb: [420, 375], svg: s, anchors: { needleHolder: [190, 56], needleScrew: [266, 56], shank: [210, 70], flat: [330, 70], shoulder: [210, 130], blade: [210, 215], groove: [207, 200], scarf: [218, 282], eye: [210, 290], point: [210, 322], system: [210, 358] } };
}

function foot(o = {}) {
  const m = o.mode || 'sole';
  let s = '';
  s += P('presserBar', R(202, -4, 16, 118, 3, C.metal));
  s += P('footHolder', R(176, 108, 68, 46, 6, '#5a7274', C.line, 2));
  s += P('footScrew', `${CI(262, 128, 8, C.metal2, C.line, 2)}${L(256, 128, 268, 128, C.dark, 2)}${L(244, 128, 254, 128, C.line, 3)}`);
  s += P('holderSlot', R(190, 140, 40, 8, 2, '#2c4143', C.dark, 1));
  if (m === 'hopper') {
    s += P('needleHolder', R(250, 40, 38, 56, 5, '#5a7274', C.line, 2));
    s += P('springLever', `${PA('M244,150 C272,150 270,100 262,96', 'none', C.teal, 4)}${CI(262, 96, 4, C.fawn, C.line, 1)}`);
    s += P('hopperFoot', `${PA('M210,152 V182', 'none', C.dark, 5)}${CI(210, 210, 40, 'none', C.dark, 6)}${CI(210, 210, 40, 'none', '#bfe3ea', 2.5)}${PA('M200,160 q10,-6 20,0 q-10,6 -20,0 M200,168 q10,-6 20,0 q-10,6 -20,0', 'none', C.teal, 2)}`);
  } else if (m === 'holder') {
    s += P('footSole', `${R(150, 214, 120, 20, 3, '#d7e0e1', C.line, 1.6)}${L(210, 214, 210, 234, 'none', 0)}${R(200, 214, 20, 20, 1, '#fff', C.line, 1)}`);
    s += P('needle', `${L(130, 90, 130, 176, C.dark, 3)}`);
    s += `<path d="M262,150 L262,198" fill="none" stroke="${C.tealD}" stroke-width="2.4" stroke-dasharray="5 4" marker-end="url(#ah)"/>`;
  } else {
    s += P('footSole', `${PA('M150,206 H270 V226 H150 Z', '#d7e0e1', C.line, 1.8)}${R(200, 206, 20, 20, 1, '#fff', C.line, 1)}`);
    s += P('crossPin', `${L(190, 158, 190, 168, C.dark, 3.5)}${L(190, 168, 232, 168, C.dark, 3.5)}`);
    s += P('soleClip', `${R(196, 170, 28, 14, 3, '#ffffff', C.line, 1.4)}`);
    s += P('soleFront', `${PA('M150,206 H180 V226 H150 Z', 'none', 'none', 0)}`);
  }
  return { vb: [420, 300], svg: s, anchors: { presserBar: [210, 70], footHolder: [244, 140], footScrew: [262, 128], footSole: [270, m === 'holder' ? 224 : 216], crossPin: [190, 164], soleClip: [210, 178], holderSlot: [210, 144], soleFront: [150, 216], needleHolder: [270, 70], springLever: [268, 124], hopperFoot: [210, 250], needle: [130, 140] } };
}

function bobbinWind() {
  let s = '';
  s += PA('M30,250 H430 V380 H30 Z', C.body, C.line, 2);
  s += PA('M30,250 H430', 'none', '#fff', 3);
  s += P('felt', R(88, 238, 64, 12, 2, '#e8d6a2', '#a18a45', 1));
  s += P('spoolPin', R(114, 100, 12, 140, 3, C.metal));
  s += P('spool', `${R(92, 150, 56, 88, 4, '#e9d9ee')}${R(98, 156, 44, 76, 3, '#cfa3dc', '#8d5fa0', 1)}`);
  s += P('spoolCap', `${PA('M96,150 L144,150 L134,128 L106,128 Z', C.metal2)}`);
  s += P('eyelet', `${R(194, 170, 8, 80, 2, C.metal)}${CI(198, 158, 12, '#fff', C.line, 2.4)}`);
  s += P('pretension', `${CI(284, 218, 20, C.metal2, C.line, 2)}${CI(284, 218, 10, '#fff')}`);
  s += P('winderBase', `${R(320, 232, 80, 18, 5, C.metal2)}`);
  s += P('bobbin', `${R(342, 188, 36, 48, 4, '#e9eeee', C.line, 1.8)}${R(346, 196, 28, 32, 2, C.thread2, '#1d3f80', 1)}${R(334, 186, 52, 6, 2, C.metal)}${R(334, 232, 52, 6, 2, C.metal)}`);
  s += P('startStop', `${CI(70, 320, 17, '#bfe8d8', C.tealD, 2)}${PA('M64,312 l14,8 l-14,8 z', C.tealD, C.tealD, 1)}`);
  s += `<path d="M126,128 C150,110 170,130 198,158 C230,180 262,190 270,212 C280,226 300,222 306,214 C320,200 342,196 360,208" fill="none" stroke="${C.thread}" stroke-width="2.6" stroke-dasharray="7 5" ${sw}/>`;
  s += `<path d="M350,262 H394" stroke="${C.tealD}" stroke-width="2.4" marker-end="url(#ah)"/>${T(372, 280, 'push right', 11, C.tealD)}`;
  return { vb: [460, 380], svg: s, anchors: { felt: [120, 244], spoolPin: [120, 120], spool: [120, 195], spoolCap: [120, 135], eyelet: [198, 170], pretension: [284, 218], bobbin: [360, 212], winderBase: [360, 241], startStop: [70, 320] } };
}

function bobbinCase() {
  let s = '';
  s += R(40, 40, 380, 300, 20, C.metal, C.line, 2.2);
  s += P('needleHole', `<ellipse cx="130" cy="110" rx="9" ry="12" fill="#2c4143" stroke="${C.dark}"/>`);
  s += P('feedDog', `${R(96, 138, 70, 56, 4, '#aab7b9', C.line, 1.2)}${[...Array(6)].map((_, i) => L(104 + i * 11, 144, 104 + i * 11, 188, C.dark, 1.2)).join('')}`);
  s += P('recess', R(214, 76, 176, 230, 14, '#31494b', C.dark, 2));
  s += P('bobbinCase', `${CI(300, 192, 76, '#f4ecd9', C.line, 2)}${PA('M252,246 q-14,30 20,40', 'none', C.line, 1.4)}`);
  s += P('bobbin', `${CI(300, 192, 56, '#cfd8da', C.line, 2)}${CI(300, 192, 50, C.thread2, '#1d3f80', 1)}${CI(300, 192, 34, '#5b88d8', 'none', 0)}${CI(300, 192, 14, '#e9eeee', C.line, 1.6)}${CI(300, 192, 5, C.dark, C.dark, 1)}`);
  s += P('slot', `${PA('M242,214 q10,-4 14,6', 'none', C.fawn, 5)}`);
  s += P('channel', `${PA('M244,216 C230,222 214,226 198,200 C190,180 168,150 136,126', 'none', C.thread2, 3)}`);
  s += P('cover', `${R(60, 244, 120, 70, 12, C.clear, C.line, 1.8)}${R(100, 296, 40, 12, 4, C.metal2, C.line, 1.4)}${T(120, 270, 'cover', 11, '#4c6c70', 'middle', 500)}`);
  s += `<path d="M344,128 A62,62 0 0 0 256,134" fill="none" stroke="#8fe3dc" stroke-width="3" marker-end="url(#ah)"/>`;
  s += T(300, 100, 'thread leaves counter-clockwise', 11, '#bfeee9');
  return { vb: [460, 360], svg: s, anchors: { needleHole: [130, 110], feedDog: [131, 166], recess: [380, 100], bobbinCase: [300, 270], bobbin: [300, 192], slot: [246, 214], channel: [190, 180], cover: [120, 280] } };
}

function module(o = {}) {
  let s = '';
  s += `<g transform="translate(224,20) scale(.65)">${PA(BODY, C.body, C.line, 2.6)}</g>`;
  s += P('machineSocket', `${R(246, 202, 10, 32, 2, C.dark)}`);
  s += P('moduleBody', R(24, 196, 224, 46, 8, '#e9eeee', C.line, 2));
  s += P('arm', R(54, 150, 160, 46, 8, '#f6f8f8', C.line, 2));
  s += P('coupling', `${R(176, 160, 44, 28, 4, C.metal, C.line, 2)}${L(184, 174, 214, 174, C.dark, 2)}`);
  s += P('safetyLever', `${R(212, 138, 12, 28, 4, C.teal, C.tealD, 1.6)}`);
  s += P('connector', `${R(236, 208, 14, 20, 2, C.dark)}`);
  s += P('releaseButton', `${CI(222, 219, 8, C.fawn, C.line, 1.6)}`);
  s += `<path d="M80,262 H224" stroke="${C.tealD}" stroke-width="3" marker-end="url(#ah)" fill="none"/>${T(150, 282, 'slide left → right', 11.5, C.tealD)}`;
  return { vb: [640, 300], svg: s, anchors: { machineSocket: [251, 218], moduleBody: [100, 236], arm: [110, 170], coupling: [198, 174], safetyLever: [218, 148], connector: [243, 224], releaseButton: [222, 219] } };
}

function hoop(o = {}) {
  let s = '';
  s += P('outerRing', `${R(40, 26, 300, 170, 28, C.metal2, C.line, 2.4)}`);
  s += P('innerRing', `${R(58, 42, 264, 138, 18, '#f7fbfb', C.line, 2)}`);
  s += P('template', `${R(74, 56, 232, 110, 8, C.clear, C.line, 1.4)}<rect x="74" y="56" width="232" height="110" rx="8" fill="url(#grid)"/>${L(190, 62, 190, 160, C.tealD, 1.6)}${L(80, 111, 300, 111, C.tealD, 1.6)}${CI(190, 111, 5, '#fff', C.tealD, 1.6)}`);
  s += P('logo', `${R(268, 134, 30, 14, 3, '#ffffff', C.dark, 1.2)}${L(272, 141, 294, 141, C.dark, 1.6)}`);
  s += P('lever', `${R(340, 92, 38, 34, 8, C.teal, C.tealD, 2)}${L(350, 109, 368, 109, '#fff', 3)}`);
  s += P('adjustScrew', `${CI(358, 62, 11, C.metal, C.line, 2)}${L(350, 62, 366, 62, C.dark, 2)}`);
  s += P('arrowMarks', `${PA('M190,22 l-8,-14 h16 z', C.fawn, C.line, 1.2)}${PA('M190,48 l-7,12 h14 z', C.dark, C.dark, 1)}`);
  // cross-section
  const y0 = 244;
  s += P('xsectionTitle', T(200, 222, 'side view (cross-section)', 11, '#5c7274', 'middle', 500));
  s += P('fabric', `${L(30, y0 + 10, 400, y0 + 10, C.fawn, 7)}`);
  s += P('outerRingX', `${R(54, y0 - 6, 50, 52, 6, C.metal2, C.line, 2)}${R(326, y0 - 6, 50, 52, 6, C.metal2, C.line, 2)}`);
  s += P('innerRingX', `${R(104, y0 + 20, 28, 46, 5, '#f7fbfb', C.line, 2)}${R(298, y0 + 20, 28, 46, 5, '#f7fbfb', C.line, 2)}`);
  s += P('protrude', `${L(86, y0 + 68, 140, y0 + 68, C.tealD, 1.6)}${L(100, y0 + 46, 100, y0 + 68, C.tealD, 1.6, 'marker-start="url(#ah)" marker-end="url(#ah)"')}${T(150, y0 + 90, '≈ 1 mm below', 11, C.tealD, 'start')}`);
  return { vb: [420, 360], svg: s, anchors: { outerRing: [60, 90], innerRing: [66, 130], template: [190, 80], logo: [283, 141], lever: [359, 109], adjustScrew: [358, 62], arrowMarks: [190, 14], fabric: [60, y0 + 10], outerRingX: [80, y0 - 6], innerRingX: [118, y0 + 66], protrude: [100, y0 + 60] } };
}

function hoopOn() {
  let s = '';
  s += P('arm', R(16, 126, 150, 66, 10, '#f6f8f8', C.line, 2));
  s += P('coupling', `${R(158, 118, 54, 84, 8, C.metal, C.line, 2)}${R(166, 130, 36, 60, 4, '#9fb0b2', C.dark, 1)}`);
  s += P('safetyLever', `${R(168, 100, 34, 18, 6, C.teal, C.tealD, 1.8)}`);
  s += P('hoop', `${R(204, 62, 290, 200, 30, C.metal2, C.line, 2.4)}${R(224, 82, 250, 160, 18, '#f7fbfb', C.line, 1.8)}${R(236, 94, 226, 136, 8, '#fff3e1', C.fawn, 1.4)}`);
  s += P('needlePos', `${CI(349, 162, 7, '#fff', C.tealD, 2)}${L(342, 162, 356, 162, C.tealD, 1.5)}${L(349, 155, 349, 169, C.tealD, 1.5)}`);
  s += `<path d="M430,282 H250" stroke="${C.tealD}" stroke-width="3" marker-end="url(#ah)" fill="none"/>${T(340, 302, 'slide the hoop in until it clicks', 11.5, C.tealD)}`;
  return { vb: [520, 330], svg: s, anchors: { arm: [90, 160], coupling: [186, 160], safetyLever: [185, 108], hoop: [440, 100], needlePos: [349, 162] } };
}

function screen(o = {}) {
  const m = o.mode || 'home';
  let s = R(10, 10, 420, 300, 22, '#26393b', C.dark, 2.5) + R(26, 26, 388, 268, 10, '#f3f7f7', '#8aa', 1);
  const tile = (id, x, y, w, h, label, icon) => P(id, `${R(x, y, w, h, 12, '#ffffff', C.teal, 2.2)}${icon}${T(x + w / 2, y + h - 12, label, 12, C.tealD)}`);
  const small = (id, x, y, label, w = 56, h = 40) => P(id, `${R(x, y, w, h, 8, '#ffffff', '#8bb', 1.6)}${T(x + w / 2, y + h / 2 + 4, label, 10, C.dark, 'middle', 600)}`);
  const A = {};
  if (m === 'home') {
    s += tile('homeSettings', 48, 100, 100, 110, 'Settings', `${CI(98, 140, 20, 'none', C.dark, 3)}${CI(98, 140, 7, C.dark, C.dark, 1)}`);
    s += tile('homeSewing', 170, 100, 100, 110, 'Sewing', `${PA('M120,146 l16,-12 l16,12 l16,-12 l16,12 l16,-12', 'none', C.teal, 3.5).replace('M120', 'M178')}`);
    s += tile('homeEmbroidery', 292, 100, 100, 110, 'Embroidery', `${R(318, 118, 48, 36, 12, 'none', C.teal, 3.5)}${R(326, 126, 32, 20, 7, 'none', C.fawn, 3)}`);
    s += T(220, 62, 'Home screen', 14, C.dark);
    Object.assign(A, { homeSettings: [98, 150], homeSewing: [220, 150], homeEmbroidery: [342, 150] });
  } else if (m === 'sewing') {
    const col = [['stPlateNeedle', 'needle'], ['stFoot', 'foot'], ['stTension', 'tension'], ['stNeedleStop', 'stop'], ['stWifi', 'wifi']];
    col.forEach(([id, l], i) => { s += small(id, 34, 36 + i * 50, l, 54, 42); A[id] = [61, 57 + i * 50]; });
    s += small('stLength', 112, 36, 'length', 80); s += small('stWidth', 202, 36, 'width', 80); s += small('stNeedlePos', 292, 36, 'needle pos', 80);
    A.stLength = [152, 56]; A.stWidth = [242, 56]; A.stNeedlePos = [332, 56];
    s += P('stPreview', `${R(112, 88, 260, 150, 10, '#fff', '#8bb', 1.6)}${PA('M140,170 l22,-26 l22,26 l22,-26 l22,26 l22,-26 l22,26 l22,-26 l22,26', 'none', C.thread, 3)}${T(242, 222, 'stitch preview', 10, '#789', 'middle', 500)}`);
    A.stPreview = [242, 150];
    s += P('stQuick', `${R(384, 36, 26, 202, 6, '#e6f3f3', '#8bb', 1.6)}${[0, 1, 2, 3].map(i => CI(397, 56 + i * 44, 8, '#fff', C.teal, 1.8)).join('')}`);
    A.stQuick = [397, 140];
    s += T(222, 268, 'Sewing screen (simplified layout)', 10.5, '#678', 'middle', 500);
  } else {
    const col = [['emPlateNeedle', 'needle'], ['emFoot', 'foot'], ['emTension', 'tension'], ['emHoop', 'hoop'], ['emWifi', 'wifi']];
    col.forEach(([id, l], i) => { s += small(id, 34, 36 + i * 50, l, 54, 42); A[id] = [61, 57 + i * 50]; });
    s += P('emPreview', `${R(104, 36, 250, 202, 12, '#fff', '#8bb', 1.6)}${R(124, 56, 210, 140, 14, 'none', C.metal, 3)}${CI(229, 126, 34, C.fawn, C.dark, 1.5)}${PA('M229,112 q20,10 0,28 q-20,-10 0,-28', C.teal, 'none', 0)}${T(229, 222, 'design preview', 10, '#789', 'middle', 500)}`);
    A.emPreview = [229, 126];
    ['File', 'Edit', 'Colors', 'Stitchout'].forEach((l, i) => { const id = ['emFile', 'emEdit', 'emColors', 'emStitchout'][i]; s += small(id, 362, 36 + i * 50, l, 50, 42); A[id] = [387, 57 + i * 50]; });
    s += T(222, 268, 'Embroidery screen (simplified layout)', 10.5, '#678', 'middle', 500);
  }
  return { vb: [440, 320], svg: s, anchors: A };
}

function controls() {
  let s = '';
  s += R(10, 10, 620, 190, 20, C.body, C.line, 2);
  s += R(224, 28, 192, 120, 12, C.screen, C.dark, 2.4);
  s += T(320, 94, 'touchscreen', 12, '#9cc', 'middle', 500);
  s += P('needleUpDown', `${CI(120, 52, 17, C.metal2, C.line, 2)}${PA('M112,56 l8,-9 l8,9 M112,62 l8,-9 l8,9', 'none', C.dark, 1.8).replace('M112,62 l8,-9 l8,9', 'M112,50 l8,9 l8,-9')}`);
  s += P('securing', `${CI(120, 98, 17, C.metal2, C.line, 2)}${PA('M110,98 h20 M126,92 l6,6 l-6,6', 'none', C.dark, 2)}`);
  s += P('speedSlider', `${R(70, 134, 100, 8, 4, C.metal, C.line, 1.4)}${CI(132, 138, 9, C.teal, C.tealD, 1.6)}${T(120, 168, 'speed', 11, C.dark, 'middle', 500)}`);
  const rb = (id, x, y, ic) => P(id, `${CI(x, y, 17, C.metal2, C.line, 2)}${ic}`);
  s += rb('homeBtn', 470, 52, `${PA('M461,54 l9,-9 l9,9 v9 h-18 z', 'none', C.dark, 1.8)}`);
  s += rb('widthBtn', 516, 52, `${PA('M506,52 h20 m-16,-5 l-4,5 l4,5 m12,-10 l4,5 l-4,5', 'none', C.dark, 1.8)}`);
  s += rb('lockBtn', 562, 52, `${R(554, 52, 16, 12, 2, 'none', C.dark, 1.8)}${PA('M557,52 v-4 a5,5 0 0 1 10,0 v4', 'none', C.dark, 1.8)}`);
  s += rb('lengthBtn', 470, 98, `${PA('M470,88 v20 m-5,-16 l5,-4 l5,4 m-10,12 l5,4 l5,-4', 'none', C.dark, 1.8)}`);
  s += rb('resetBtn', 516, 98, `${PA('M524,92 a9,9 0 1 0 2,8 m-2,-8 v-7 m0,7 h-7', 'none', C.dark, 1.8)}`);
  s += P('needlePosLR', `${CI(562, 98, 17, C.metal2, C.line, 2)}${PA('M552,98 h6 m-3,-4 l-4,4 l4,4 M572,98 h-6 m3,-4 l4,4 l-4,4', 'none', C.dark, 1.8)}`);
  s += R(40, 214, 250, 82, 16, C.body, C.line, 2);
  s += T(165, 232, 'buttons above the needle', 10.5, '#678', 'middle', 500);
  s += P('startStop', `${R(62, 244, 62, 36, 12, '#d7efe6', C.tealD, 2)}${PA('M85,252 l14,10 l-14,10 z', C.tealD, C.tealD, 1)}`);
  s += P('cutterBtn', `${R(134, 244, 62, 36, 12, C.metal2, C.line, 2)}${PA('M158,254 l14,16 M172,254 l-14,16', 'none', C.dark, 2.2)}`);
  s += P('quickReverse', `${R(206, 244, 62, 36, 12, C.metal2, C.line, 2)}${PA('M252,262 h-30 m8,-8 l-8,8 l8,8', 'none', C.dark, 2.2)}`);
  s += P('threader', `${R(340, 214, 40, 82, 16, C.metal, C.line, 2)}${L(360, 228, 360, 282, C.dark, 3)}${T(360, 310, 'threader lever', 10, '#678', 'middle', 500)}`);
  return { vb: [640, 320], svg: s, anchors: { needleUpDown: [120, 52], securing: [120, 98], speedSlider: [120, 138], homeBtn: [470, 52], widthBtn: [516, 52], lockBtn: [562, 52], lengthBtn: [470, 98], resetBtn: [516, 98], needlePosLR: [562, 98], startStop: [93, 262], cutterBtn: [165, 262], quickReverse: [237, 262], threader: [360, 250] } };
}

export const SCENES = { front, back, head, needleArea, needle, foot, bobbinWind, bobbinCase, module, hoop, hoopOn, screen, controls };

/* ---------- render a scene with highlights + notes ---------- */
export function renderScene(name, opts = {}) {
  const sc = SCENES[name](opts);
  const hl = new Set(opts.hl || []);
  let inner = sc.svg;
  if (hl.size) inner = inner.replace(/<g data-part="([^"]+)">/g, (m, id) => hl.has(id) ? `<g data-part="${id}" class="hl">` : m);
  let ov = '';
  const [W, H] = sc.vb;
  (opts.arrows || []).forEach(a => {
    const p = sc.anchors[a.at]; if (!p) return;
    const len = a.len || 38; const d = a.dir || 'down';
    const v = { down: [0, -len], up: [0, len], left: [len, 0], right: [-len, 0] }[d];
    ov += `<line x1="${p[0] + v[0]}" y1="${p[1] + v[1]}" x2="${p[0]}" y2="${p[1]}" stroke="${C.tealD}" stroke-width="3.2" marker-end="url(#ah)" ${sw}/>`;
  });
  (opts.notes || []).forEach(n => {
    const p = sc.anchors[n.at]; if (!p) return;
    const w = Math.min(W - 8, n.text.length * 6.3 + 16), h = 20;
    let x = p[0] + (n.dx ?? 28), y = p[1] + (n.dy ?? -30);
    x = Math.max(4, Math.min(W - w - 4, x)); y = Math.max(4, Math.min(H - h - 4, y));
    const cx = Math.max(x + 6, Math.min(x + w - 6, p[0])), cy = y + (p[1] > y + h ? h : 0);
    ov += `<g class="note"><line x1="${cx}" y1="${cy}" x2="${p[0]}" y2="${p[1]}" stroke="${C.tealD}" stroke-width="1.4" stroke-dasharray="3 3"/><circle cx="${p[0]}" cy="${p[1]}" r="3.2" fill="${C.tealD}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#fff" stroke="${C.tealD}" stroke-width="1.4"/><text x="${x + w / 2}" y="${y + 14}" font-size="11" text-anchor="middle" fill="${C.tealD}" font-weight="700" style="font-family:inherit">${n.text.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text></g>`;
  });
  return { vb: sc.vb, anchors: sc.anchors, svg: `<svg class="scene" viewBox="0 0 ${W} ${H}" role="img" aria-label="${(opts.label || name).replace(/"/g, '')}" xmlns="http://www.w3.org/2000/svg">${defs}${inner}${ov}</svg>` };
}

/* ---------- small icons (64x64) ---------- */
const ico = (inner, label) => `<svg class="ico" viewBox="0 0 64 64" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
export function footIcon(kind = 'zigzag') {
  const sole = (w = 40, extra = '') => `${R(32 - w / 2, 38, w, 10, 2, '#d7e0e1', C.line, 1.6)}${extra}`;
  let x = `${R(26, 6, 12, 14, 2, C.metal)}${R(22, 20, 20, 12, 3, '#5a7274', C.line, 1.5)}`;
  switch (kind) {
    case 'zipper': x += sole(40) + R(30, 38, 12, 10, 0, '#fff', 'none', 0) + L(30, 38, 30, 48, C.dark, 1.6) + L(30, 38, 42, 38, C.dark, 1.6); break;
    case 'invisible': x += sole(40) + L(24, 40, 24, 48, C.dark, 1.8) + L(40, 40, 40, 48, C.dark, 1.8) + L(28, 44, 36, 44, C.teal, 1.4); break;
    case 'overlock': x += sole(44) + L(14, 34, 14, 52, C.dark, 2.2) + L(14, 42, 20, 42, C.dark, 2.2); break;
    case 'blind': x += sole(40) + PA('M32,30 v22', 'none', C.dark, 2.4) + L(32, 52, 38, 52, C.dark, 2.4); break;
    case 'buttonhole': x += sole(44) + R(42, 30, 12, 24, 2, 'none', C.dark, 1.8) + L(42, 42, 54, 42, C.dark, 1.2); break;
    case 'button': x += sole(40) + CI(26, 43, 3, '#fff', C.dark, 1.4) + CI(38, 43, 3, '#fff', C.dark, 1.4) + CI(32, 36, 0.1); break;
    case 'embroidery': x += `${R(16, 36, 32, 14, 4, 'none', '#6fb6c6', 2)}${L(24, 33, 24, 36, C.line, 1.5)}`; break;
    case 'hopper': x += `${CI(32, 44, 12, 'none', C.dark, 2.4)}${PA('M30,32 q4,-3 8,0 q-4,3 -8,0 M30,36 q4,-3 8,0 q-4,3 -8,0', 'none', C.teal, 1.6)}`; break;
    case 'walking': x += sole(44) + R(18, 28, 28, 6, 2, C.fawn, C.line, 1.2) + L(22, 31, 42, 31, C.dark, 1); break;
    case 'quarter': x += sole(40) + L(44, 36, 44, 50, C.teal, 2) + L(36, 46, 44, 46, C.teal, 1.2); break;
    case 'freemotion': x += `${CI(32, 44, 9, 'none', C.dark, 2.4)}${PA('M24,30 q8,-6 16,0', 'none', C.teal, 2)}`; break;
    case 'rolled': x += sole(34) + PA('M24,40 q8,-8 14,0 q-6,6 -10,2', 'none', C.dark, 1.8); break;
    case 'satin': x += sole(40) + L(22, 46, 42, 46, C.teal, 3); break;
    case 'straight': x += sole(30) + CI(32, 43, 2.6, C.dark, C.dark, 1); break;
    default: x += sole(40) + R(26, 40, 12, 6, 3, '#fff', C.dark, 1.4); // zigzag
  }
  return ico(x, kind + ' foot icon');
}
export function hoopIcon(kind = 'M') {
  const ring = (w, h, extra = '') => `${R(32 - w / 2, 32 - h / 2, w, h, 8, C.metal2, C.line, 2)}${R(32 - w / 2 + 5, 32 - h / 2 + 5, w - 10, h - 10, 4, '#fff', C.line, 1.4)}${extra}`;
  if (kind === 'multi') return ico(ring(58, 26, [0, 1, 2].map(i => R(10 + i * 18, 14, 6, 5, 1, C.teal, C.tealD, 1) + R(10 + i * 18, 45, 6, 5, 1, C.teal, C.tealD, 1)).join('')), 'multi-position hoop');
  if (kind === 'S') return ico(ring(26, 26, R(43, 28, 8, 8, 2, C.teal, C.tealD, 1)), 'small hoop');
  if (kind === 'L') return ico(ring(56, 50, R(54, 28, 8, 8, 2, C.teal, C.tealD, 1)), 'large hoop');
  if (kind === 'round') return ico(`${CI(32, 32, 22, C.metal2, C.line, 2)}${CI(32, 32, 16, '#fff', C.line, 1.4)}${R(52, 28, 8, 8, 2, C.teal, C.tealD, 1)}`, 'round hoop');
  return ico(ring(44, 32, R(52, 26, 8, 10, 2, C.teal, C.tealD, 1)), 'medium hoop');
}
export function needleIcon(kind = 'universal') {
  let eye = `<ellipse cx="32" cy="42" rx="2" ry="5" fill="#fff" stroke="${C.dark}" stroke-width="1.2"/>`;
  let tip = PA('M29,48 H35 L32,60 Z', C.metal2, C.line, 1.4);
  let body = `${R(26, 4, 12, 20, 2, C.metal)}${PA('M26,24 H38 L34,32 H30 Z', C.metal)}${R(30, 32, 4, 17, 0, C.metal)}`;
  let extra = '';
  switch (kind) {
    case 'ballpoint': tip = `${PA('M29,48 H35 L35,54 A3,3 0 0 1 29,54 Z', C.metal2, C.line, 1.4)}`; break;
    case 'sharp': tip = PA('M30.5,48 H33.5 L32,62 Z', C.metal2, C.line, 1.4); eye = `<ellipse cx="32" cy="42" rx="1.4" ry="5" fill="#fff" stroke="${C.dark}" stroke-width="1.2"/>`; break;
    case 'embroidery': eye = `<ellipse cx="32" cy="41" rx="2.6" ry="6.5" fill="#fff" stroke="${C.dark}" stroke-width="1.2"/>`; tip = `${PA('M29,48 H35 L35,52 A3,3 0 0 1 29,52 Z', C.metal2, C.line, 1.4)}`; extra = L(30.5, 30, 30.5, 46, C.fawn, 1.5); break;
    case 'topstitch': eye = `<ellipse cx="32" cy="40" rx="2.4" ry="8" fill="#fff" stroke="${C.dark}" stroke-width="1.2"/>`; break;
    case 'denim': tip = PA('M29.5,48 H34.5 L32,62 Z', '#9fb0b2', C.line, 1.6); body = body.replace(/R\(30, 32, 4, 17.*/, ''); extra = R(29.5, 32, 5, 17, 0, '#9fb0b2', C.line, 1); break;
    case 'leather': tip = PA('M29,48 H35 L37,61 L32,56 L27,61 Z', C.metal2, C.line, 1.4); break;
    case 'twin': return ico(`${R(20, 4, 24, 14, 2, C.metal)}${R(23, 18, 4, 30, 0, C.metal)}${R(37, 18, 4, 30, 0, C.metal)}${PA('M21,48 H29 L25,60 Z', C.metal2, C.line, 1.2)}${PA('M35,48 H43 L39,60 Z', C.metal2, C.line, 1.2)}<ellipse cx="25" cy="42" rx="1.6" ry="4" fill="#fff" stroke="${C.dark}"/><ellipse cx="39" cy="42" rx="1.6" ry="4" fill="#fff" stroke="${C.dark}"/>`, 'twin needle');
    case 'quilting': tip = PA('M30,48 H34 L32,60 Z', C.metal2, C.line, 1.4); break;
    case 'metallic': eye = `<ellipse cx="32" cy="40" rx="2.8" ry="8.5" fill="#fff" stroke="${C.dark}" stroke-width="1.2"/>`; extra = PA('M28,26 l-6,-4 M36,26 l6,-4', 'none', C.fawn, 1.8); break;
    case 'stretch': tip = `${PA('M29,48 H35 L34,56 A2,2 0 0 1 30,56 Z', C.metal2, C.line, 1.4)}`; extra = PA('M40,36 q4,3 0,6 q-4,3 0,6', 'none', C.teal, 1.6); break;
  }
  return ico(body + extra + eye + tip, kind + ' needle icon');
}
export function otherIcon(kind) {
  const m = {
    plate: `${R(10, 18, 44, 28, 4, C.metal, C.line, 1.8)}${CI(26, 32, 3, C.dark, C.dark, 1)}${R(34, 24, 14, 16, 2, C.clear, C.line, 1.2)}`,
    bobbin: `${R(20, 10, 24, 6, 2, C.metal)}${R(22, 16, 20, 32, 2, C.thread2, C.line, 1.4)}${R(20, 48, 24, 6, 2, C.metal)}`,
    spoolcap: `${PA('M16,44 H48 L42,22 H22 Z', C.metal2, C.line, 1.8)}${R(28, 14, 8, 8, 1, C.metal)}`,
    felt: `${CI(32, 32, 22, '#e8d6a2', '#a18a45', 1.8)}${CI(32, 32, 5, '#fff', '#a18a45', 1.4)}`,
    net: `${R(20, 12, 24, 42, 8, 'none', C.line, 1.6)}${PA('M22,22 H42 M22,32 H42 M22,42 H42 M28,14 V52 M36,14 V52', 'none', '#9fb0b2', 1)}`,
    guide: `${R(8, 26, 48, 12, 2, C.metal2, C.line, 1.6)}${[0, 1, 2, 3, 4, 5].map(i => L(12 + i * 8, 26, 12 + i * 8, 33, C.dark, 1)).join('')}${R(22, 38, 12, 14, 2, C.metal, C.line, 1.4)}`,
    ripper: `${R(26, 28, 12, 28, 6, C.teal, C.tealD, 1.6)}${PA('M32,28 V10 M32,10 q-8,0 -8,6 M32,10 q8,0 8,6', 'none', C.dark, 2.2)}`,
    brush: `${R(26, 34, 12, 22, 3, C.teal, C.tealD, 1.6)}${[0, 1, 2, 3, 4].map(i => L(24 + i * 4, 34, 24 + i * 4, 18, C.dark, 1.6)).join('')}`,
    clamp: `${R(10, 22, 44, 20, 4, C.metal2, C.line, 1.8)}${R(16, 26, 12, 12, 2, '#fff', C.line, 1.2)}${R(36, 26, 12, 12, 2, '#fff', C.line, 1.2)}`,
    table: `${R(6, 20, 52, 26, 4, '#e9eeee', C.line, 1.8)}${R(14, 26, 36, 14, 2, '#fff', C.line, 1.2)}`,
    screwdriver: `${R(8, 29, 20, 6, 3, C.teal, C.tealD, 1.4)}${L(28, 32, 54, 32, C.dark, 2.4)}`,
    pen: `${R(28, 6, 8, 40, 4, C.metal2, C.line, 1.6)}${PA('M28,46 H36 L32,58 Z', C.dark, C.dark, 1)}`,
    foot: `${R(10, 30, 44, 10, 3, C.metal2, C.line, 1.8)}`
  };
  return ico(m[kind] || m.foot, kind + ' icon');
}
