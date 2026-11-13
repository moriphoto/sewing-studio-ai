// Batch 3: Brother everyday sewing machines (A-series, Innov-is 15, SH40, HF37, L14S, LX17).
import { write, sewT } from './gen-brother-lib.mjs';
const SHOP = (s) => 'https://www.thesewingstudio.co.uk/products/' + s;
const J = ['zigzagJ', 'Zigzag foot "J"', 'zigzag', 'The all-round foot already on the machine for utility stitches.', ['Everyday seams, zigzag, most stitches']];
const A = (what) => ['buttonholeA', 'Buttonhole foot "A"', 'buttonhole', what, ['Buttonholes']];
const I = ['zipperI', 'Zipper foot "I"', 'zipper', 'Narrow foot with the needle close to the zip teeth. The manual describes it; check whether it is in your box.', ['Zips, piping']];
const lcdOver = (extra = {}) => ({
  screen: { name: 'LCD screen', text: 'Shows the stitch number, the foot to fit, stitch length and width and the needle position. Use the keys (and the stitch selector on this model) to change them.' },
  funcButtons: { name: 'Start/Stop, reverse, needle position, lock-stitch buttons', text: 'The operation buttons. Start/Stop runs the machine without the foot controller, reverse sews backwards, the needle position button raises or lowers the needle, and the lock-stitch button ties off the seam.' },
  speedSlider: { name: 'Sewing speed controller', text: 'Slide to the right for faster sewing and to the left for slower. It also sets the speed when you wind a bobbin.' },
  sideButtons: { name: 'Stitch length and width keys', text: 'Change the stitch length and width of the selected stitch in small steps.' },
  panelButtons: { name: 'Stitch selection keys / dial', text: 'Pick the stitch pattern – the exact controls (jog dial or number keys) depend on the model.' },
  ...extra
});
const MECH_OVER = {
  stitchDial: { name: 'Stitch selection dial', text: 'Turn to choose the stitch. The chart on the machine shows each number.' },
  lengthDial: { name: 'Stitch length dial', text: 'Sets how long each stitch is. Short stitches for fine fabric and buttonhole satin areas.' },
  widthDial: { name: 'Stitch width dial', text: 'Sets how wide the zigzag swings; it also moves the needle position for straight stitch.' },
  reverseLever: { name: 'Reverse lever', text: 'Hold it to sew backwards; release to go forward.' },
  tensionDial: { name: 'Upper thread tension dial', text: 'Raises or lowers upper-thread tension. Start at the middle setting and move by one step.' }
};
const MPAGES = (arr) => arr.map(([key, topic, printed, find]) => ({ key, topic, printed, find }));
const SRC = 'Shop listing spec table + Brother operation manual';
const recs = [];

// ---- A-series (888-M50/M60/M62/M63 manual covers A16 and A50) ----
const M50 = { path: 'doch101352/888_m50_m60_m62_m63_om03en.pdf', file: '888_m50_m60_m62_m63_om03en.pdf', codes: '888-M50/M60/M62/M63', multi: true };
recs.push({
  id: 'brother-innov-is-a16', name: 'Brother Innov-is A16', short: 'A16', type: 'sewing', profile: 'panel', layout: 'buttons', small: true, emb: false,
  shopUrl: SHOP('brother-innov-is-a16-sewing-machine'), prod: 'hf_inova16euk',
  blurb: 'Compact computerised machine with a 2.6" monochrome LCD, jog-dial stitch choice, 16 stitches, 1-step buttonholes and a one-action needle threader.',
  facts: ['16 built-in stitches including 3 one-step buttonhole styles; stitch chosen with a jog dial and shown on a 2.6" monochrome LCD', 'Maximum speed 850 stitches per minute with an electronic slide speed control; needle up/down button and lock-stitch button', 'Advanced one-action needle threader and quick-set top-loading horizontal bobbin with the F.A.S.T. bobbin winder', 'No automatic thread cutter – the manufacturer FAQ says threads are cut with the cutter on the side or scissors', '16 cm workspace to the right of the needle, free arm, LED light, soft case; 6.6 kg'],
  specs: [['Stitches', '16 (3 buttonholes)'], ['Screen', '2.6" monochrome LCD · jog dial'], ['Max speed', '850 spm'], ['Needle threader', 'Advanced, one-action'], ['Thread cutter', 'No'], ['Bobbin', 'Quick-set horizontal, F.A.S.T. winder'], ['Workspace', '16 cm'], ['Weight', '6.6 kg'], ['Source', SRC]],
  manual: M50, cutter: false, threaderKind: 'lever', pressureDial: false, over: lcdOver(),
  t: sewT({ startStop: true, threader: 'lever' }),
  feet: [J, A('Used for the one-step buttonhole: the machine sews the whole buttonhole in one go.'), I]
});
recs.push({
  id: 'brother-innov-is-a50', name: 'Brother Innov-is A50', short: 'A50', type: 'sewing', profile: 'panel', layout: 'buttons', small: true, emb: false,
  shopUrl: SHOP('brother-innov-is-a50-sewing-machine'), prod: 'hf_inova50euk',
  blurb: 'Compact computerised machine with a backlit 2.6" LCD, 50 stitches, 5 one-step buttonhole styles and a one-action needle threader.',
  facts: ['50 built-in stitches including 5 one-step buttonhole styles; backlit 2.6" monochrome LCD with an electronic jog dial', 'Maximum width 7 mm; up to 850 stitches per minute with an electronic slide speed control', 'Advanced one-action needle threader, quick-set top-loading horizontal bobbin and F.A.S.T. bobbin winder', 'The listing does not mention an automatic thread cutter, so cut the threads with the side cutter or scissors (hedged)', '16 cm workspace, free arm, LED light, soft case; 6.5 kg'],
  specs: [['Stitches', '50 (5 buttonholes)'], ['Screen', '2.6" backlit monochrome LCD · jog dial'], ['Max speed', '850 spm'], ['Max stitch width', '7 mm'], ['Needle threader', 'Advanced, one-action'], ['Bobbin', 'Quick-set horizontal, F.A.S.T. winder'], ['Workspace', '16 cm'], ['Weight', '6.5 kg'], ['Source', SRC]],
  manual: M50, cutter: false, threaderKind: 'lever', pressureDial: false, over: lcdOver(),
  t: sewT({ startStop: true, threader: 'lever' }),
  feet: [J, A('Used for the one-step buttonhole: the machine sews the whole buttonhole in one go.'), I]
});
recs.push({
  id: 'brother-innov-is-a65', name: 'Brother Innov-is A65', short: 'A65', type: 'sewing', profile: 'panel', layout: 'buttons', small: true, emb: false,
  shopUrl: SHOP('brother-innov-is-a65-sewing-machine'), prod: 'hf_inova65euk',
  blurb: 'Compact computerised machine with 60 stitches, 6 one-step buttonholes, an automatic thread cutter and a hard cover.',
  facts: ['60 built-in stitches including 6 one-step buttonhole styles, chosen with an electronic jog dial', 'Automatic thread cutter and a one-action needle threader; twin-needle setting', 'Drop-in quick-set bobbin, up to 850 stitches per minute with electronic slide speed control', '16 cm workspace, free arm, LED light, hard cover; about 6.5 kg', 'Presser-foot levelling button and needle up/down control'],
  specs: [['Stitches', '60 (6 buttonholes)'], ['Selection', 'Electronic jog dial'], ['Max speed', '850 spm'], ['Thread cutter', 'Automatic'], ['Needle threader', 'One-action'], ['Workspace', '16 cm'], ['Case', 'Hard cover'], ['Weight', '6.5 kg'], ['Source', SRC]],
  manual: { path: 'doch102839/888m64_om02en.pdf', file: '888m64_om02en.pdf', codes: '888-M64' }, cutter: true, threaderKind: 'lever', pressureDial: false, over: lcdOver(),
  t: sewT({ startStop: true, threader: 'lever' }),
  feet: [J, A('Used for the one-step buttonhole: the machine sews the whole buttonhole in one go.'), I]
});
recs.push({
  id: 'brother-innov-is-a150', name: 'Brother Innov-is A150', short: 'A150', type: 'sewing', profile: 'panel', layout: 'buttons', small: true, emb: false,
  shopUrl: SHOP('brother-innov-is-a150-sewing-machine'), prod: 'hf_inova150euk',
  blurb: 'Robust computerised machine with 150 stitches including fonts, one-step buttonholes, automatic thread cutter and adjustable presser-foot pressure.',
  facts: ['150 stitches: utility, stretch, one-step buttonholes and fonts; stitch patterns can be combined and mirrored', 'Automatic needle threader, quick-set bobbin and automatic thread cutter', 'Twin-needle setting and free arm for garment sewing', 'Adjustable presser-foot pressure to suit different fabric thicknesses', 'Hard cover; about 6.5 kg. The shop listing gives no spec table, so figures here come from its description'],
  specs: [['Stitches', '150 (incl. one-step buttonholes and fonts)'], ['Needle threader', 'Automatic'], ['Thread cutter', 'Automatic'], ['Foot pressure', 'Adjustable'], ['Case', 'Hard cover'], ['Weight', 'About 6.5 kg'], ['Source', 'Shop listing description + Brother operation manual']],
  manual: { path: 'doch101372/888_m70_om01en.pdf', file: '888_m70_om01en.pdf', codes: '888-M70' }, cutter: true, threaderKind: 'lever', pressureDial: true, over: lcdOver(),
  t: sewT({ startStop: true, threader: 'lever' }),
  feet: [J, A('Used for the one-step buttonhole: the machine sews the whole buttonhole in one go.'), I]
});
// ---- Innov-is 15 ----
recs.push({
  id: 'brother-innov-is-15', name: 'Brother Innov-is 15', short: 'Innov-is 15', type: 'sewing', profile: 'panel', layout: 'buttons', small: true, emb: false,
  shopUrl: SHOP('brother-innov-is-15-sewing-machine'), prod: 'hf_inov15euk',
  blurb: 'Compact computerised machine: 16 stitches, 3 buttonholes, a 2.2" LCD with jog dial and a quick-set top-loading bobbin.',
  facts: ['16 built-in stitches including 3 buttonholes; jog-dial selection on a 2.2" monochrome LCD', 'Maximum width 7 mm, maximum length 5 mm, up to 850 stitches per minute with slide speed control', 'Built-in needle threader (listed as standard) and a quick-set top-loading bobbin; drop-feed setting is manual', 'The listing does not mention an automatic thread cutter, so use the side cutter or scissors (hedged)', '16 cm workspace, free arm, LED light; about 7 kg'],
  specs: [['Stitches', '16 (3 buttonholes)'], ['Screen', '2.2" monochrome LCD · jog dial'], ['Max speed', '850 spm'], ['Stitch size', 'Up to 7 mm wide × 5 mm long'], ['Needle threader', 'Built-in'], ['Workspace', '16 cm'], ['Weight', 'About 7 kg'], ['Source', SRC]],
  manual: { path: 'doch000453/nv1015ns10ug05en.pdf', file: 'nv1015ns10ug05en.pdf', codes: 'NV15 / NS10' }, cutter: false, threaderKind: 'lever', pressureDial: false, over: lcdOver(),
  rows: MPAGES([['overview', 'Names of machine parts', 10, 'Names of Machine Parts'], ['controls', 'Operation panel', 12, 'Operation panel'], ['winding', 'Winding the bobbin', 17, 'Winding the bobbin'], ['bobbin', 'Installing the bobbin', 20, 'Installing the bobbin'], ['upper', 'Upper threading', 22, 'Upper threading'], ['needle', 'Replacing the needle', 29, 'Replacing the Needle'], ['foot', 'Replacing the presser foot', 33, 'Replacing the Presser Foot'], ['maint', 'Maintenance', 83, 'Maintenance'], ['trouble', 'Troubleshooting', 85, 'Troubleshooting']]),
  t: sewT({ startStop: true, threader: 'lever' }),
  feet: [J, A('Used for buttonholes – check the manual for how this model sews them.'), I]
});
// ---- SH40 ----
recs.push({
  id: 'brother-sh40', name: 'Brother SH40', short: 'SH40', type: 'sewing', profile: 'panel', layout: 'buttons', small: true, emb: false,
  shopUrl: SHOP('brother-sh40-sewing-machine'), prod: 'hf_sh40euk',
  blurb: 'Light, compact LCD machine with 40 stitches (per the spec table), a 4-step auto-size buttonhole and number-code stitch entry.',
  facts: ['40 stitches including buttonholes by the shop spec table; the listing text says 38 stitch functions and a 4-step auto-size buttonhole – the spec-table figure is used here', 'Stitch chosen by entering its number code; monochrome LCD', 'Up to 750 stitches per minute with electronic slide speed control; needle up/down control', 'Standard (non-automatic) needle threading system and a quick-set horizontal bobbin; the listing gives no automatic thread cutter', 'Compact: 413 × 178 × 307 mm and 4.5 kg; free arm; soft case'],
  specs: [['Stitches', '40 incl. buttonholes (spec table)'], ['Buttonhole', '4-step, auto-size (listing text)'], ['Stitch selection', 'Number-code entry · monochrome LCD'], ['Max speed', '750 spm'], ['Needle threader', 'Standard system'], ['Size', '413 × 178 × 307 mm'], ['Weight', '4.5 kg'], ['Source', SRC]],
  manual: { path: 'doch101975/888_n00_n02_n20_n22_n40_n42_n60_om03en.pdf', file: '888_n00_n02_n20_n22_n40_n42_n60_om03en.pdf', codes: '888-N00/N02/N20/N22/N40/N42/N60', multi: true }, cutter: false, threaderKind: 'lever', pressureDial: false, fourStep: true,
  over: lcdOver({ funcButtons: { name: 'Start/Stop, reverse, needle position buttons', text: 'Start/Stop runs the machine without the foot controller; reverse sews backwards; the needle position button raises or lowers the needle.' } }),
  rows: MPAGES([['overview', 'Names of machine parts', 4, 'Names of Machine Parts'], ['controls', 'Operation panel', 6, 'Operation panel'], ['winding', 'Winding the bobbin', 8, 'Winding'], ['upper', 'Upper threading and needle threader', 10, 'Using the needle threader'], ['needle', 'Replacing the needle', 13, 'Needle'], ['buttonhole', 'Buttonhole sewing', 19, 'Buttonhole sewing'], ['maint', 'Cleaning the machine', 24, 'Cleaning the machine surface'], ['trouble', 'Troubleshooting', 25, 'Topic']]),
  t: { ...sewT({ startStop: true, threader: 'lever', fourStep: true }), threader: 'lever' },
  feet: [J, A('Used with the 4-step buttonhole and its lever; check the manual for the order of the steps.')]
});
// ---- HF37 ----
recs.push({
  id: 'brother-hf37', name: 'Brother HF37', short: 'HF37', type: 'sewing', profile: 'mech', emb: false,
  shopUrl: SHOP('brother-hf37-strong-tough-sewing-machine'), prod: 'hf_hf37euk',
  blurb: 'Strong & Tough mechanical machine with a dial for 37 stitches, a 1-step buttonhole and dial-controlled stitch length and width.',
  facts: ['37 stitches chosen with the front dial; stitch length and width dials give precise control', '1-step automatic buttonhole', 'Sewing speed up to 800 stitches per minute; 6 inches (about 15 cm) of workspace to the right of the needle', 'Drop-feed (feed dog position) switch on the machine; free arm', 'Weight 6.6 kg. The listing does not say if it has a needle threader or cutter; the manual has a threader section for models that include one'],
  specs: [['Stitches', '37 (1 one-step buttonhole)'], ['Control', 'Mechanical, dial stitch selection'], ['Max speed', '800 spm'], ['Workspace', '6 inches'], ['Weight', '6.6 kg'], ['Source', SRC]],
  manual: { path: 'doch000926/888x36_x38_om03en.pdf', file: '888x36_x38_om03en.pdf', codes: '888-X36/X38', multi: true }, cutter: false, threaderKind: 'lever', pressureDial: false, over: MECH_OVER,
  rows: MPAGES([['overview', 'The main parts', 6, 'THE MAIN PARTS'], ['needle', 'Checking and replacing the needle', 9, 'replacing the needle'], ['foot', 'Presser foot installation', 10, 'Presser foot installation'], ['winding', 'Winding the bobbin', 14, 'Winding the bobbin'], ['bobbin', 'Lower threading (bobbin)', 17, 'Lower threading'], ['upper', 'Upper threading', 19, 'Upper threading'], ['buttonhole', 'Making a buttonhole', 37, 'Making a buttonhole'], ['maint', 'Maintenance', 44, 'MAINTENANCE'], ['trouble', 'Troubleshooting', 46, 'TROUBLESHOOTING']]),
  t: sewT({ mech: true, threader: 'lever' }),
  feet: [J, ['buttonholeA', 'Buttonhole foot "A"', 'buttonhole', 'Used for the 1-step buttonhole; the foot measures the button as it sews.', ['Buttonholes']], I]
});
// ---- L14S ----
recs.push({
  id: 'brother-l14s', name: 'Brother L14S', short: 'L14S', type: 'sewing', profile: 'mech', emb: false,
  shopUrl: SHOP('brother-l14s-sewing-machine'), prod: 'hf_l14seuk',
  blurb: 'Simple, light mechanical machine with a dial for 14 stitches, a 4-step buttonhole and a top-loading drop-in bobbin.',
  facts: ['14 built-in stitches including 1 four-step buttonhole, chosen with the front dial', 'Top-loading drop-in bobbin, LED sewing light and free-arm conversion', 'Metal chassis, about 6.4 kg, 6 inches of workspace', 'The listing does not mention a needle threader – thread the needle by hand (the manual covers models that have one)', 'Bobbin winder built in'],
  specs: [['Stitches', '14 (1 four-step buttonhole)'], ['Type', 'Mechanical, dial stitch selection'], ['Bobbin', 'Top-load drop-in'], ['Workspace', '6 inches'], ['Weight', '6.4 kg'], ['Source', SRC]],
  manual: { path: 'doch100669/888x64_67_74_77_84_87_om01en.pdf', file: '888x64_67_74_77_84_87_om01en.pdf', codes: '888-X64/X67/X74/X77/X84/X87', multi: true }, cutter: false, threaderKind: 'none', pressureDial: false, fourStep: true, over: MECH_OVER,
  rows: MPAGES([['overview', 'The main parts', 7, 'THE MAIN PARTS'], ['needle', 'Checking the needle', 9, 'Checking the needle'], ['foot', 'Changing the presser foot', 11, 'presser foot'], ['controls', 'The controls', 12, 'THE CONTROLS'], ['winding', 'Winding the bobbin', 14, 'Winding the bobbin'], ['bobbin', 'Lower threading', 17, 'Lower threading'], ['upper', 'Upper threading', 18, 'Upper threading'], ['buttonhole', 'Sewing buttonholes', 34, 'SEWING BUTTONHOLES'], ['maint', 'Maintenance', 41, 'MAINTENANCE'], ['trouble', 'Troubleshooting', 43, 'TROUBLESHOOTING']]),
  t: sewT({ mech: true, threader: 'none', fourStep: true }),
  feet: [J, ['buttonholeA', 'Buttonhole foot "A"', 'buttonhole', 'Used with the 4-step buttonhole; you sew each side in turn.', ['4-step buttonholes']], I]
});
// ---- LX17 ----
recs.push({
  id: 'brother-lx17', name: 'Brother LX17', short: 'LX17', type: 'sewing', profile: 'mech', emb: false,
  shopUrl: SHOP('brother-lx17-sewing-machine'), prod: 'hf_lx17euk',
  blurb: 'Light mechanical machine with a dial for 17 stitches, a 4-step buttonhole and a top-loading drop-in bobbin.',
  facts: ['17 built-in stitches including 1 four-step buttonhole, chosen with the front dial', 'Top-loading drop-in bobbin, LED sewing light and free-arm conversion', 'Metal chassis, about 7 kg, 6 inches of workspace', 'The listing does not mention a needle threader – thread the needle by hand (the manual covers models that have one)', 'Bobbin winder built in'],
  specs: [['Stitches', '17 (1 four-step buttonhole)'], ['Type', 'Mechanical, dial stitch selection'], ['Bobbin', 'Top-load drop-in'], ['Workspace', '6 inches'], ['Weight', 'About 7 kg'], ['Source', SRC]],
  manual: { path: 'doch000849/lx17ug01en.pdf', file: 'lx17ug01en.pdf', codes: '885-X01/X11/X21', multi: true }, cutter: false, threaderKind: 'none', pressureDial: false, fourStep: true, over: MECH_OVER,
  rows: MPAGES([['overview', 'The main parts', 6, 'THE MAIN PARTS'], ['needle', 'Checking the needle', 8, 'Checking the needle'], ['foot', 'Presser foot installation', 10, 'Presser foot installation'], ['winding', 'Winding the bobbin', 12, 'Winding the bobbin'], ['bobbin', 'Lower threading', 14, 'Put the bobbin in'], ['upper', 'Upper threading', 16, 'Upper threading'], ['buttonhole', 'Making a buttonhole', 31, 'Making a buttonhole'], ['maint', 'Maintenance', 38, 'MAINTENANCE'], ['trouble', 'Troubleshooting', 40, 'TROUBLESHOOTING']]),
  t: sewT({ mech: true, threader: 'none', fourStep: true }),
  feet: [J, ['buttonholeA', 'Buttonhole foot "A"', 'buttonhole', 'Used with the 4-step buttonhole; you sew each side in turn.', ['4-step buttonholes']], I]
});

for (const r of recs) { r.gen = 'gen-brother-3.mjs'; r.manual.offset = 0; r.supC = 'eu_ot'; r.mech = r.profile === 'mech'; console.log(JSON.stringify(write(r))); }
