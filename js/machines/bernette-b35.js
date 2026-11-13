import b33 from './bernette-b33.js';
import { foot, other } from './_gear.js';
const id = 'bernette-b35';
export default {
  ...b33,
  id, catalogId: 'bernette-b35', name: 'bernette b35', short: 'b35',
  shopUrl: 'https://www.thesewingstudio.co.uk/products/bernette-b35-sewing-machine',
  blurb: 'The b33 with a stitch width knob and a fully automatic four-step buttonhole, plus seven feet in the box.',
  facts: [
    'Mechanical machine: stitch pattern selector, stitch length knob, stitch width knob, thread tension dial and a reverse lever',
    '23 stitches (14 practical) with an automatic buttonhole you can repeat; width up to 5 mm, length up to 4 mm',
    'Semi-automatic needle threader, retractable feed dog and a two-step presser-foot lift',
    'Front-loading CB bobbin case, manual thread cutter on the head; hemmer foot for rolled hems is included',
    'About 170 mm of space to the right of the needle'
  ],
  specs: [['Stitches', '23 (14 practical, 1 buttonhole)'], ['Max stitch length', '4 mm'], ['Max stitch width', '5 mm'], ['Hook system', 'CB (removable bobbin case)'], ['Space right of needle', '170 mm'], ['Thread cutter', 'Manual'], ['Source', 'bernette.com product page + user manual 2026-01']],
  links: [
    { title: 'bernette b35 – User Manual (PDF, English)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/User-Manual/3-Series/b35_2026/5060005_00A_04_web_b35_2026-01_EN.pdf', kind: 'PDF', doc: 'full', note: 'Official bernette.com, 2026-01 edition (38 pages).' },
    { title: 'bernette b35 – product page', url: 'https://www.bernette.com/en/models/bernette-35', kind: 'Web', doc: 'page', note: 'Features, accessories and tutorial videos.' }
  ],
  manual: { file: '5060005_00A_04_web_b35_2026-01_EN.pdf', offset: 0, edition: '2026-01 EN (page numbers follow the contents list)', pages: [
    { key: 'overview', topic: 'Machine overview (parts)', printed: 6, find: 'Names of Parts' },
    { key: 'foot', topic: 'Changing the presser foot', printed: 10, find: 'Changing the Presser Foot' },
    { key: 'needle', topic: 'Changing the needle', printed: 11, find: 'Changing the needle' },
    { key: 'spool', topic: 'Spool pins and bobbin case', printed: 12, find: 'Removing or Inserting the Bobbin Case' },
    { key: 'winding', topic: 'Winding the bobbin', printed: 13, find: 'Winding the Bobbin' },
    { key: 'bobbin', topic: 'Threading the bobbin case', printed: 13, find: 'Threading the Bobbin Case' },
    { key: 'upper', topic: 'Threading the machine (upper)', printed: 14, find: 'Threading the Machine' },
    { key: 'tension', topic: 'Thread tension', printed: 15, find: 'Correct tension' },
    { key: 'stitches', topic: 'Selecting stitch, length and width', printed: 16, find: 'Set the stitch width knob' },
    { key: 'feed', topic: 'Lowering / raising the feed dog', printed: 17, find: 'Lowering and raising the feed dog' },
    { key: 'buttonhole', topic: 'Automatic buttonhole', printed: 23, find: 'Automatic Buttonhole' },
    { key: 'rolled', topic: 'Rolled hem', printed: 28, find: 'Rolled Hem' },
    { key: 'maint', topic: 'Cleaning the bobbin case and shuttle race', printed: 31, find: 'Cleaning the Bobbin Case' },
    { key: 'trouble', topic: 'Troubleshooting', printed: 33, find: 'Troubleshooting' }
  ] },
  hide: ['pressureDial', 'startStop', 'felt', 'plateRelease'],
  over: {
    ...b33.over,
    widthDial: { name: 'Stitch width knob', text: 'Higher numbers give a wider stitch (up to 5 mm). Raise the needle out of the fabric before you turn it.' },
    buttonholeLever: { name: 'Buttonhole lever', text: 'Pull it down as far as it goes before sewing the automatic buttonhole; push it back up when you have finished.' }
  },
  t: { ...b33.t, noWidth: false, fourStep: false, stitchPick: 'Turn the stitch pattern selector knob to the stitch you want, then set the length and width knobs.' },
  gear: { ids: b33.gear.ids.filter(x => x !== 'rolled'),
    extra: [
      ...b33.gear.extra.map(a => ({ ...a, id: a.id.replace('bernette-b33', id), m: id })),
      foot(id, 'hemmer', 'Hemmer foot', 'rolled', 'Folds the fabric edge twice as you sew so a straight stitch holds a narrow rolled hem.', ['Rolled hems on light fabric'], 'brother', 'Start with a pair of stitches at the corner so the fabric feeds into the scroll.'),
      foot(id, 'satinfoot', 'Satin stitch foot', 'satin', 'Has a groove under the sole so dense satin stitches pass without bunching.', ['Satin stitch, appliqué'], 'brother')
    ] }
};
