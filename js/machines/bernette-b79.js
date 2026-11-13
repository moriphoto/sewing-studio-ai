import b77 from './bernette-b77.js';
import { foot, hoop, other } from './_gear.js';
const id = 'bernette-b79';
export default {
  ...b77,
  id, catalogId: 'bernette-b79', name: 'bernette B79', short: 'B79', type: 'sewing+embroidery', emb: true,
  shopUrl: 'https://www.thesewingstudio.co.uk/products/bernette-b79-sewing-embroidery-machine',
  blurb: 'The b77 sewing machine plus an embroidery module: 260 × 160 mm embroidery area, three hoops with automatic hoop recognition.',
  facts: [
    'Everything the b77 does for sewing (500 stitches, Dual Feed, 17 buttonholes), plus embroidery',
    'Embroidery module with three quick-release hoops: 260 × 160, 180 × 120 and 70 × 50 mm; the machine recognises the hoop fitted',
    '208 built-in embroidery designs, 7 alphabets, USB port for your own designs (EXP, PES, DST, JEF, VP3, HUS and more)',
    'Programmable foot control, knee lifter, semi-automatic needle threader, auto thread cutter',
    'Sewing speed 1000 spm, embroidery speed 850 spm; stitch plate is recognised by the machine'
  ],
  specs: [['Stitches', '500 sewing stitches'], ['Embroidery area', '260 × 160 mm'], ['Embroidery designs', '208 + 7 alphabets'], ['Max speed', 'Sewing 1000 spm · embroidery 850 spm'], ['Screen', '5-inch colour touchscreen + 2 multi-function knobs'], ['Weight', 'Machine 9.34 kg · module 3.65 kg'], ['Source', 'bernette.com product page + user manual 2026-05, technical data p.152']],
  links: [
    { title: 'bernette b79 – User Manual (PDF, English)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/User-Manual/7-Series/b79_2026/5020079_60A_04_web_manual_b79_2026-05_EN.pdf', kind: 'PDF', doc: 'full', note: 'Official bernette.com, 2026-05 edition (183 pages).' },
    { title: 'bernette b79 – Quick Start Guide (PDF)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/Quick-Start-Guide/7-Series/EN/5200079_10A_04_web_qsg_b79_EN_2023-01.pdf', kind: 'PDF', doc: 'qsg', note: 'Short getting-started leaflet.' },
    { title: 'bernette b79 – product page', url: 'https://www.bernette.com/en/models/bernette-79', kind: 'Web', doc: 'page', note: 'Features, accessories, tutorial videos.' }
  ],
  manual: { file: '5020079_60A_04_web_manual_b79_2026-05_EN.pdf', offset: 0, edition: '2026-05 EN', pages: [
    { key: 'controls', topic: 'Front controls', printed: 12, find: 'Overview Front Controls' },
    { key: 'overview', topic: 'Machine overview (front)', printed: 15, find: 'Overview - Front' },
    { key: 'back', topic: 'Back panel', printed: 17, find: 'Overview - Back Panel' },
    { key: 'feed', topic: 'Feed dog up/down', printed: 29, find: 'Raising or Lowering the Feed Dog' },
    { key: 'foot', topic: 'Changing the presser foot', printed: 30, find: 'Changing the Presser Foot' },
    { key: 'needle', topic: 'Changing the needle', printed: 32, find: 'Changing the Needle' },
    { key: 'upper', topic: 'Threading the upper thread', printed: 35, find: 'Threading the Upper Thread' },
    { key: 'winding', topic: 'Winding the bobbin', printed: 40, find: 'Winding the Bobbin' },
    { key: 'bobbin', topic: 'Inserting the bobbin', printed: 42, find: 'Threading the Bobbin Thread' },
    { key: 'setup', topic: 'Setup program', printed: 44, find: 'Setup Program' },
    { key: 'stitches', topic: 'Selecting a stitch pattern', printed: 60, find: 'Selecting a Stitch Pattern' },
    { key: 'buttonhole', topic: 'Buttonholes', printed: 88, find: 'Buttonholes' },
    { key: 'module', topic: 'Attaching the embroidery module', printed: 107, find: 'Attaching the Embroidery Module' },
    { key: 'embfoot', topic: 'Attaching the embroidery foot', printed: 108, find: 'Attaching the Embroidery Foot' },
    { key: 'hoop', topic: 'Attaching the hoop', printed: 116, find: 'Attaching the Hoop' },
    { key: 'embroider', topic: 'Embroidering (Start/Stop)', printed: 137, find: 'Embroidering via the Button' },
    { key: 'maint', topic: 'Cleaning and oiling', printed: 141, find: 'Maintenance and Cleaning' },
    { key: 'trouble', topic: 'Troubleshooting', printed: 144, find: 'Troubleshooting' }
  ] },
  hide: ['penHolder'],
  t: { ...b77.t, embArea: '260 × 160 mm', hoops: 'large 260 × 160, medium 180 × 120, small 70 × 50 mm', embFoot: 'hopper embroidery foot', embSpeed: 850, hoopRecognition: true },
  gear: { ids: [...b77.gear.ids, 'n-embroidery'],
    extra: [
      ...b77.gear.extra.map(a => ({ ...a, id: a.id.replace('bernette-b77', id), m: id })),
      foot(id, 'button', 'Button sew-on foot', 'button', 'Grips a flat button so the machine can sew it on with a program, with the feed dog lowered.', ['Sewing on 2- or 4-hole buttons'], 'bernette7'),
      foot(id, 'hopper', 'Hopper embroidery foot', 'hopper', 'Embroidery foot that hovers just above the work so thick or springy embroidery does not drag.', ['All hooped embroidery'], 'bernette7', 'Fit this for embroidery – the machine expects it.'),
      hoop(id, 'large', 'Large hoop (260 × 160 mm)', 'L', 'The biggest hoop – full-size designs without re-hooping.', ['Large designs, jacket backs, cushion panels']),
      hoop(id, 'medium', 'Medium hoop (180 × 120 mm)', 'M', 'The everyday hoop for most designs and lettering.', ['Chest logos, towels, small projects']),
      hoop(id, 'small', 'Small hoop (70 × 50 mm)', 'S', 'For tiny designs, cuffs and monograms.', ['Cuffs, pockets, monograms']),
      other(id, 'plate', 'Straight-stitch plate', 'plate', 'A plate with a small round needle hole that supports fabric for neat straight stitching and embroidery.', ['Embroidery, straight-stitch piecing'], ['Switch off, raise the needle and foot.', 'Remove the stitch plate cover, lift the plate, set the new one in place.', 'Select the plate on the screen so the machine limits the stitch width.'], 'The machine detects the plate; always check the screen shows the right one.')
    ] }
};
