import a05 from './bernette-05-academy.js';
import { foot } from './_gear.js';
const id = 'bernette-05-crafter';
export default {
  ...a05,
  id, catalogId: 'bernette-05-crafter', name: 'bernette 05 Crafter', short: '05 Crafter',
  shopUrl: 'https://www.thesewingstudio.co.uk/products/bernette-05-crafter-heavy-duty-sewing-machine',
  blurb: 'The b05 series mechanical machine for makers: the same 30 stitches, dial controls and adjustable foot pressure as the Academy, with a seam guide and spare spool pin in the box.',
  facts: [
    'Mechanical machine: stitch selector wheel, stitch length knob and stitch width dial (shared with the 05 Academy)',
    '30 stitches including a one-step buttonhole, super-stretch and blanket stitch; width up to 6 mm, length up to 4 mm',
    'Adjustable presser-foot pressure, drop-in bobbin, retractable feed dog (lever on the back), two LED lights',
    'Top speed 1100 stitches per minute; about 165 mm of space to the right of the needle; weight 7.0 kg',
    'Unlike the Academy, the product page does not list a slide-on table or a half-speed power switch – check what is in your box'
  ],
  specs: [['Stitches', '30 (incl. one-step buttonhole)'], ['Max stitch length', '4 mm'], ['Max stitch width', '6 mm'], ['Max speed', '1100 spm'], ['Bobbin', 'Drop-in'], ['Space right of needle', '165 mm'], ['Weight', '7.0 kg'], ['Source', 'bernette.com product page + user manual 2026-04, technical data p.72']],
  links: [
    { title: 'bernette 05 Crafter – User Manual (PDF, English)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/User-Manual/b05/2026/CRAFTER/5020105_30A_04_web_manual_b05_CRAFTER_2026-04_EN.pdf', kind: 'PDF', doc: 'full', note: 'Official bernette.com, 2026-04 edition (76 pages).' },
    { title: 'bernette b05 series – Quick Start Guide (PDF)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/Quick-Start-Guide/b05/EN/5200105_0_04_web_qsg_b05-series_EN_2023-06.pdf', kind: 'PDF', doc: 'qsg', note: 'Shared by the b05 series.' },
    { title: 'bernette 05 Crafter – product page', url: 'https://www.bernette.com/en/models/bernette-05-crafter', kind: 'Web', doc: 'page', note: 'Features and stitch overview.' }
  ],
  manual: { file: '5020105_30A_04_web_manual_b05_CRAFTER_2026-04_EN.pdf', offset: 0, edition: '2026-04 EN', pages: [
    { key: 'overview', topic: 'Machine overview (front)', printed: 10, find: 'Overview Front' },
    { key: 'feed', topic: 'Feed dog up/down', printed: 19, find: 'Raising or Lowering the Feed Dog' },
    { key: 'needle', topic: 'Changing the needle', printed: 21, find: 'Changing the Needle' },
    { key: 'foot', topic: 'Changing the presser foot', printed: 22, find: 'Changing the Presser Foot' },
    { key: 'upper', topic: 'Threading the upper thread', printed: 25, find: 'Threading the Upper Thread' },
    { key: 'winding', topic: 'Winding the bobbin', printed: 18, find: 'Winding the Bobbin' },
    { key: 'bobbin', topic: 'Inserting the bobbin', printed: 31, find: 'Threading the Bobbin Thread' },
    { key: 'stitches', topic: 'Stitch width and length', printed: 35, find: 'Setting the Stitch Width' },
    { key: 'buttonhole', topic: 'Sewing a buttonhole automatically', printed: 60, find: 'Sewing a Buttonhole Automatically' },
    { key: 'maint', topic: 'Cleaning and oiling', printed: 66, find: 'Maintenance and Cleaning' },
    { key: 'trouble', topic: 'Troubleshooting', printed: 70, find: 'Troubleshooting' }
  ] },
  t: { ...a05.t, startNote: 'There is no Start/Stop button: sewing is with the foot control.' },
  gear: { ids: a05.gear.ids,
    extra: [
      ...a05.gear.extra.filter(a => !a.id.endsWith(':table')).map(a => ({ ...a, id: a.id.replace('bernette-05-academy', id), m: id })),
      foot(id, 'seamguide', 'Seam guide', 'quarter', 'A guide that clips on the right so the fabric edge follows a steady distance from the needle.', ['Straight seams, topstitching'], 'screw')
    ] }
};
