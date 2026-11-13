// Batch 4: Brother computerised sewing, quilting and sewing+embroidery machines.
import { write, sewT, embT } from './gen-brother-lib.mjs';
const SHOP = (s) => 'https://www.thesewingstudio.co.uk/products/' + s;
const J = ['zigzagJ', 'Zigzag foot "J"', 'zigzag', 'The all-round foot already on the machine for utility stitches.', ['Everyday seams, zigzag, most stitches']];
const A1 = ['buttonholeA', 'Buttonhole foot (one-step)', 'buttonhole', 'Measures the button and sews the whole buttonhole in one step; the manual calls it foot "A" or its auto-size version.', ['One-step buttonholes']];
const I = ['zipperI', 'Zipper foot "I"', 'zipper', 'Narrow foot with the needle close to the zip teeth. The manual describes it; check whether it is in your box.', ['Zips, piping']];
const G = ['overcastG', 'Overcasting foot "G"', 'overlock', 'Guides the fabric edge for overcast stitches that stop the edge fraying. Described in the manual; check your box.', ['Raw edge finishing']];
const N = ['monoN', 'Monogramming foot "N"', 'satin', 'Clear-view foot for satin-stitch letters and decorative stitches. Described in the manual; check your box.', ['Lettering, satin stitches']];
const tbl = (id, what) => `other(id, ${JSON.stringify(id)}, 'Wide extension table', 'table', ${JSON.stringify(what)}, ['Large quilts, big projects'], ['Switch off and raise the foot.', 'Slide the table on over the free arm until it locks flat with the bed of the machine.', 'Remove it again to use the free arm.'])`;
const MP = (arr) => arr.map(([key, topic, printed, find]) => ({ key, topic, printed, find }));
const SRC = 'Shop listing + Brother operation manual';
const kpOver = {
  screen: { name: 'LCD screen', text: 'Shows the stitch, the foot to fit, length and width and the needle position. Choose a stitch with the direct-select keypad and change settings with the keys.' },
  funcButtons: { name: 'Start/Stop, reverse, reinforcement, needle position, thread cutter', text: 'The operation buttons. Start/Stop runs the machine; reverse sews backwards (or a reinforcement stitch, depending on the stitch); needle position raises or lowers the needle; the cutter trims both threads.' },
  speedSlider: { name: 'Sewing speed controller', text: 'Slide to set sewing speed. It also sets the bobbin-winding speed.' },
  sideButtons: { name: 'Stitch length / width and setting keys', text: 'Change length and width, and open the settings and lock functions on the screen.' },
  panelButtons: { name: 'Direct-select stitch keypad', text: 'Type the stitch number to select it, or use the category keys.' },
  threader: { name: 'Needle threader lever', text: 'Lowers the threader hook through the eye – see the upper-threading guide.' }
};
const touchOver = (n = 'colour touchscreen') => ({
  screen: { name: `LCD ${n}`, text: 'Touch to choose stitches, edit them and open settings. The keys react to a fingertip or a touch pen.' },
  funcButtons: { name: 'Start/Stop, reverse, reinforcement, needle position, thread cutter', text: 'The operation buttons. Start/Stop runs the machine; reverse sews backwards (or a reinforcement stitch, depending on the stitch); needle position raises or lowers the needle; the cutter trims both threads.' },
  speedSlider: { name: 'Sewing speed controller', text: 'Slide to set sewing speed. It also sets the bobbin-winding speed.' },
  sideButtons: { name: 'Screen keys', text: 'Touch keys for settings, help, lock and the foot/needle exchange function.' },
  panelButtons: { name: 'Sewing / embroidery mode keys', text: 'Switch between sewing stitches and the embroidery screens (on machines with an embroidery unit).' },
  threader: { name: 'Needle threader', text: 'Threads the needle for you – see the upper-threading guide.' },
  moduleSocket: { name: 'Embroidery unit connection', text: 'Where the embroidery unit plugs in (after removing the flat bed attachment).' }
});
const recs = [];

const H70 = { path: 'doch100845/888h70_h72_h82_j70_om04en.pdf', file: '888h70_h72_h82_j70_om04en.pdf', codes: '888-H70/H72/H82/J70', multi: true };
recs.push({
  id: 'brother-innov-is-f420', name: 'Brother Innov-is F420', short: 'F420', type: 'sewing', profile: 'panel', layout: 'buttons', emb: false,
  shopUrl: SHOP('brother-innov-is-f420-sewing-machine'), prod: 'hf_inovf420euk',
  blurb: 'Medium-size computerised sewing and quilting machine with a 7" workspace, direct-select keypad, automatic thread cutter and knee lift.',
  facts: ['140 stitches including 10 buttonhole styles (spec table), 5 capital-letter lettering styles; stitches can be combined, memorised and mirrored', 'Monochrome 3.5" LCD (120 × 64 pixels) with a direct-select keypad; My Custom Stitch', 'Automatic thread cutter, extra-advanced needle threader, Square Feed Drive System (SFDS) and knee lift included', 'Up to 850 stitches per minute; maximum stitch width 7 mm and length 5 mm; two LED lights', '180 mm (7") workspace right of the needle, free arm; 9 kg; quick-set bobbin and F.A.S.T. winder'],
  specs: [['Stitches', '140 (10 buttonholes) + 5 lettering styles'], ['Screen', '3.5" monochrome LCD · direct-select keypad'], ['Max speed', '850 spm'], ['Max stitch size', '7 mm wide × 5 mm long'], ['Needle threader', 'Extra advanced'], ['Thread cutter', 'Automatic'], ['Workspace', '18 cm (7")'], ['Weight', '9 kg'], ['Source', SRC]],
  manual: H70, cutter: true, threaderKind: 'lever', pressureDial: false, over: kpOver,
  t: sewT({ startStop: true, threader: 'lever', lock: true }),
  feet: [J, A1, I, G, N]
});
recs.push({
  id: 'brother-innov-is-f560', name: 'Brother Innov-is F560', short: 'F560', type: 'sewing', profile: 'panel', layout: 'buttons', emb: false,
  shopUrl: SHOP('brother-innov-is-f560-sewing-machine'), prod: 'hf_inovf560euk',
  blurb: 'Computerised sewing and quilting machine with over 7" of workspace, 241 stitches including alphabets, automatic cutter and a knee lift.',
  facts: ['241 stitches including 10 buttonhole styles and 5 lettering styles; My Custom Stitch and stitch combining', 'Automatic thread cutter, advanced needle threader and the included knee lift', 'Square Feed Drive System (SFDS), 7-point feed dog, manual drop-feed setting, 2 LED lights, USB port', 'Up to 850 stitches per minute; maximum stitch width 7 mm', '190 mm workspace to the right of the needle; 446 × 248 × 300 mm and 9.3 kg; hard cover'],
  specs: [['Stitches', '241 (10 buttonholes) + 5 lettering styles'], ['Max speed', '850 spm'], ['Max stitch width', '7 mm'], ['Needle threader', 'Advanced'], ['Thread cutter', 'Automatic'], ['Workspace', '190 mm'], ['Size', '446 × 248 × 300 mm'], ['Weight', '9.3 kg'], ['Source', SRC]],
  manual: { path: 'doch102572/888j92_om01en.pdf', file: '888j92_om01en.pdf', codes: '888-J92' }, cutter: true, threaderKind: 'lever', pressureDial: false, over: touchOver('screen'),
  t: sewT({ startStop: true, threader: 'lever', lock: true }),
  feet: [J, A1, I, G, N]
});
const F50 = { path: 'doch100225/888f50_f52_f53_f55_f60_f62_f63_f65_f70_f72_f74_f75_om04en.pdf', file: '888f50_om04en.pdf', codes: '888-F50…F75', multi: true };
recs.push({
  id: 'brother-inventio-nv1350', name: 'Brother Inventio NV1350', short: 'NV1350', type: 'sewing', profile: 'panel', layout: 'buttons', emb: false,
  shopUrl: SHOP('brother-inventio-nv1350-sewing-machine'), prod: 'hf_inov1350euk', supC: 'gb',
  blurb: 'Sewing and quilting machine with 8.3" of workspace, 182 stitches, extra-advanced needle threader, automatic cutter and knee lift.',
  facts: ['182 stitches including 10 one-step buttonhole styles and 5 lettering styles; My Custom Stitch and combining', 'Monochrome 3.5" LCD (120 × 64 px) with a direct-select keypad', 'Automatic thread cutter, extra-advanced needle threader, fully automatic tension and a knee lift', 'Square Feed Drive System with side-feed (multi-directional) sewing; up to 850 stitches per minute', '210 mm (8.3") workspace; 480 × 249 × 300 mm and 9.7 kg; hard case'],
  specs: [['Stitches', '182 (10 buttonholes) + 5 fonts'], ['Screen', '3.5" monochrome LCD · direct-select keypad'], ['Max speed', '850 spm'], ['Max stitch size', '7 mm wide × 5 mm long'], ['Needle threader', 'Extra advanced'], ['Thread cutter', 'Automatic'], ['Workspace', '210 mm (8.3")'], ['Weight', '9.7 kg'], ['Source', SRC]],
  manual: F50, cutter: true, threaderKind: 'lever', pressureDial: false, over: kpOver,
  t: sewT({ startStop: true, threader: 'lever', lock: true }),
  feet: [J, A1, I, G, N]
});
recs.push({
  id: 'brother-inventio-nv1850q', name: 'Brother Inventio NV1850Q', short: 'NV1850Q', type: 'sewing', profile: 'panel', layout: 'buttons', emb: false,
  shopUrl: SHOP('brother-inventio-nv1850q-sewing-and-quilting-machine'), prod: 'hf_inov1850qeuk',
  blurb: 'Sewing and quilting machine with 232 stitches, 8.3" workspace, ICAPS foot pressure, pivot function, knee lift and a wide extension table.',
  facts: ['232 stitches including quilting and decorative stitches, 10 automatic buttonhole styles and 5 fonts (Brother product page)', 'Large clear LCD, one-action needle threader, auto thread cutter button, needle up/down and slide speed control', 'ICAPS adjusts presser-foot pressure to fabric thickness automatically; pivot function lifts the foot with the needle down', 'Side-feed (multi-directional) sewing, My Custom Stitch, fully automatic thread tension', 'About 210 mm (8.3") workspace, wide extension table, knee lift and hard case included'],
  specs: [['Stitches', '232 + 10 buttonholes + 5 fonts'], ['Workspace', 'About 210 mm (8.3")'], ['Foot pressure', 'ICAPS automatic'], ['Tension', 'Fully automatic'], ['Included', 'Wide table, knee lift, hard case'], ['Source', 'Brother product page + shop listing + operation manual']],
  manual: F50, cutter: true, threaderKind: 'lever', pressureDial: false, over: kpOver,
  t: sewT({ startStop: true, threader: 'lever', lock: true }),
  feet: [J, A1, I, G, N], otherGear: [tbl('table', 'Slides on over the free arm to widen the sewing bed for big projects (listed as included by Brother).')]
});
// ---- sewing + embroidery ----
recs.push({
  id: 'brother-innov-is-nv2700', name: 'Brother Innov-is NV2700', short: 'NV2700', type: 'sewing+embroidery', profile: 'panel', layout: 'buttons', emb: true,
  shopUrl: SHOP('brother-innov-is-nv2700-sewing-and-embroidery-machine'), prod: 'hf_inovnv2700euk',
  blurb: 'Sewing and embroidery machine with an 8.3" workspace, ICAPS, pivot function and a 260 × 160 mm embroidery area on a colour touchscreen.',
  facts: ['Sewing: 8.3" workspace, 1-step buttonhole, advanced needle threader, free arm, pivot function, free-motion mode and sideways feed', 'ICAPS adjusts presser-foot pressure to fabric thickness continuously', 'Embroidery: 260 × 160 mm area, on-screen editing, full-colour preview, LED needle pointer, colour sort, jump-stitch trimming', 'USB port, Wi-LAN and the Artspira app for designs; upper and lower thread sensors', 'Automatic tension and automatic presser-foot control; the listing gives no stitch or design counts'],
  specs: [['Workspace', '8.3" (about 210 mm)'], ['Embroidery area', '260 × 160 mm'], ['Needle threader', 'Advanced'], ['Foot pressure', 'ICAPS automatic'], ['Connectivity', 'USB + Wi-LAN + Artspira'], ['Source', 'Shop listing description + operation manual']],
  manual: { path: 'doch102337/888g26_g30_g32_g34_om02en.pdf', file: '888g26_g30_g32_g34_om02en.pdf', codes: '888-G26/G30/G32/G34', multi: true }, cutter: true, threaderKind: 'lever', pressureDial: false, over: touchOver(),
  extraRows: MP([['module', 'Attaching the embroidery unit', 81, 'Attaching the embroidery'], ['embfoot', 'Embroidery foot', 84, 'Embroidery foot'], ['hoop', 'Inserting the fabric in the frame', 85, 'Inserting the fabric'], ['embroider', 'Embroidering', 87, 'Embroidering']]),
  t: embT({ startStop: true, threader: 'lever', lock: true, area: '260 × 160 mm', hoops: 'the frames supplied with your machine (the supplied set varies by country – check the screen)', embFoot: 'embroidery foot "U"', speed: 650 }),
  feet: [J, A1, I, G, N, ['embU', 'Embroidery foot "U"', 'embroidery', 'The foot used for embroidery; it holds the fabric lightly while the frame moves. The manual names this foot for the NV2700 family.', ['All hooped embroidery'], 'brother', 'Fit this before attaching the embroidery unit.']]
});
recs.push({
  id: 'brother-innov-is-m380', name: 'Brother Innov-is M380', short: 'M380', type: 'sewing+embroidery', profile: 'panel', layout: 'buttons', emb: true,
  shopUrl: SHOP('brother-innov-is-m380-sewing-and-embroidery-machine'), prod: 'hf_inovm380euk',
  blurb: 'Compact sewing and embroidery machine with a colour touchscreen, automatic needle threader and USB design import.',
  facts: ['Colour touchscreen for choosing stitches, editing and positioning embroidery designs', 'Built-in embroidery designs with USB import', 'Automatic needle threader and intuitive controls; embroidery foot "Q" per the manual', 'The shop listing gives no stitch counts, embroidery area or speeds, so they are not stated here – see the manual and the screen', 'Compact footprint; the manual covers product codes 888-P00/P02/P03'],
  specs: [['Screen', 'Colour touchscreen'], ['Needle threader', 'Automatic'], ['Embroidery', 'Built-in designs + USB import'], ['Source', 'Shop listing description + operation manual (figures not given by the listing are left out)']],
  manual: { path: 'doch102519/888_p00_p02_p03_om01en.pdf', file: '888_p00_p02_p03_om01en.pdf', codes: '888-P00/P02/P03', multi: true }, cutter: true, threaderKind: 'lever', pressureDial: false, over: touchOver(),
  extraRows: MP([['module', 'Attaching the embroidery unit', 65, 'Attaching the embroidery'], ['embfoot', 'Embroidery foot', 66, 'embroidery foot'], ['hoop', 'Hooping the fabric', 68, 'Hooping the fabric in the embroidery frame'], ['embroider', 'Embroidering', 71, 'Embroidering']]),
  t: embT({ startStop: true, threader: 'lever', lock: true, area: 'shown on the screen when you attach the frame', hoops: 'the frames supplied with your machine', embFoot: 'embroidery foot "Q"', speed: 650 }),
  feet: [J, A1, ['embQ', 'Embroidery foot "Q"', 'embroidery', 'The foot used for embroidery; it holds the fabric lightly while the frame moves.', ['All hooped embroidery'], 'brother', 'Fit this before attaching the embroidery unit.']]
});
recs.push({
  id: 'brother-celeste-cx1', name: 'Brother Celeste CX1', short: 'Celeste CX1', type: 'sewing', profile: 'panel', layout: 'buttons', emb: false,
  shopUrl: SHOP('brother-celeste-cx1-sewing-machine'), prod: 'hf_inovcx1euk',
  blurb: 'Computerised sewing and quilting machine with 760 stitches, a 10.1" HD touchscreen, laser guide, compact dual feed and a wide table.',
  facts: ['760 built-in stitches, including tapering and Sashiko options; My Custom Stitch to design your own', 'Intelligent stitch regulator, compact dual feed (walking foot system) and Sew Straight laser guide', '10.1" HD LCD touch display; wireless LAN to connect with Artspira', 'Automatic thread tension and needle threading, adjustable bobbin winding speed, 10" LED lighting', '11.25" × 5.0" sewing area, up to about 16" × 25" with the included wide table; the manual also describes a knee lifter'],
  specs: [['Stitches', '760'], ['Screen', '10.1" HD LCD touchscreen'], ['Sewing area', '11.25" × 5.0" (wide table included)'], ['Feed', 'Compact dual feed'], ['Connectivity', 'Wireless LAN + Artspira'], ['Source', 'Shop listing description + operation manual']],
  manual: { path: 'doch103077/882w92_om01en.pdf', file: '882w92_om01en.pdf', codes: '882-W92' }, cutter: true, threaderKind: 'lever', pressureDial: false, over: touchOver('HD touchscreen'),
  t: sewT({ startStop: true, threader: 'lever', lock: true, dual: true }),
  feet: [J, A1], otherGear: [tbl('table', 'Slides on over the free arm to widen the sewing bed (the listing says a wide table is included).')]
});
const D10 = { path: 'doch102277/882_d10_d30_om04en.pdf', file: '882_d10_d30_om04en.pdf', codes: '882-D10/D30', multi: true };
const vq2 = {
  id: 'brother-innov-is-vq2', name: 'Brother Innov-is VQ2', short: 'VQ2', type: 'sewing (long-arm quilting)', profile: 'panel', layout: 'buttons', emb: false,
  shopUrl: SHOP('brother-innov-is-vq2-sewing-machine'), prod: 'hf_inovvq2euk',
  blurb: 'Long-arm computerised sewing and quilting machine: 11¼" of arm space, 473 stitches, ICAPS, pivot function and speeds to 1,050 spm.',
  facts: ['473 stitches including 14 one-step buttonhole styles, 5 fonts and extra-wide decorative stitches up to 40 mm', 'Large colour LCD touchscreen with editing; My Custom Stitch; USB ports for importing stitches', '11¼" (285 mm) of arm space to the right of the needle; up to 1,050 stitches per minute', 'ICAPS automatic foot pressure, pivot function, 7-point feed with multi-directional sewing, knee lifter', 'One-touch needle threader, automatic tension, auto thread cutter, quick-set bobbin and independent bobbin winder'],
  specs: [['Stitches', '473 + 14 buttonholes + 5 fonts'], ['Arm space', '11¼" (285 mm)'], ['Max speed', '1,050 spm'], ['Max stitch width', 'Up to 40 mm (decorative)'], ['Screen', 'Large colour touchscreen'], ['Foot pressure', 'ICAPS automatic'], ['Source', 'Shop listing description + operation manual']],
  manual: D10, cutter: true, threaderKind: 'lever', pressureDial: false, over: touchOver(),
  t: sewT({ startStop: true, threader: 'lever', lock: true }),
  feet: [J, A1, I, G, N]
};
recs.push(vq2);
recs.push({ ...vq2, id: 'brother-vq2', type: 'sewing', shopUrl: SHOP('brother-vq2-sewing-machine') });
const BX = { path: 'doch103127/bx1_bom1en.pdf', file: 'bx1_bom1en.pdf', codes: 'BX1 (basic manual)' };
recs.push({
  id: 'brother-expedition-innov-is-bx1', name: 'Brother Expedition Innov-is BX1', short: 'BX1', type: 'sewing+embroidery', profile: 'panel', layout: 'buttons', emb: true,
  shopUrl: SHOP('brother-expedition-innov-is-bx1-sewing-quilting-and-embroidery-machine'), prod: 'hf_inovbx1euk',
  blurb: 'Premium sewing, quilting and embroidery machine with curved sewing, 754 stitches, 900+ embroidery patterns and a 7" touchscreen.',
  facts: ['754 built-in sewing stitches and Brother\'s Curved Sewing, which lets you rotate the fabric smoothly while stitching', 'Over 900 embroidery patterns, 140 frames and 23 fonts, editable on the 7" colour LCD; embroidery frame 360 × 200 mm in the manual', '3D appliqué, crochet couching, French knot and lace crochet techniques; matrix copy, colour sorting', 'LED laser pointer and two-point positioning; wireless connection to Artspira', 'Automatic needle threader, drop-in bobbin, upper and lower thread sensors, multi-directional feed'],
  specs: [['Sewing stitches', '754'], ['Embroidery', '900+ patterns · 140 frames · 23 fonts'], ['Embroidery frame', '360 × 200 mm (manual)'], ['Screen', '7" colour LCD touchscreen'], ['Connectivity', 'Wireless + Artspira'], ['Source', 'Shop listing description + operation manual (basic manual only)']],
  manual: BX, cutter: true, threaderKind: 'lever', pressureDial: false, over: touchOver(),
  extraRows: MP([['module', 'Attaching the embroidery unit', 29, 'Attaching the Embroidery Unit'], ['embfoot', 'Embroidery foot', 28, 'Embroidery Foot'], ['hoop', 'Hooping the embroidery frame', 30, 'Hooping the Embroidery Frame'], ['embroider', 'Embroidering', 34, 'Embroidering']]),
  t: embT({ startStop: true, threader: 'lever', lock: true, area: '360 × 200 mm', hoops: 'the frames supplied with your machine (the manual shows a 360 × 200 mm frame)', embFoot: 'embroidery foot "U"/"UH"', speed: 650 }),
  feet: [J, A1, ['embU', 'Embroidery foot "U" / "UH"', 'embroidery', 'The foot used for embroidery; the manual names "U" and "UH" types, the second with an LED pointer. Check which one is on your machine.', ['All hooped embroidery'], 'brother', 'Fit this before attaching the embroidery unit.']]
});

for (const r of recs) { r.gen = 'gen-brother-4.mjs'; r.manual = { offset: 0, ...r.manual }; r.supC = r.supC || 'eu_ot'; r.mech = false; console.log(JSON.stringify(write(r))); }
