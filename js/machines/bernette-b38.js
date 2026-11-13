import b37 from './bernette-b37.js';
import { foot, other } from './_gear.js';
const id = 'bernette-b38';
export default {
  ...b37,
  id, catalogId: 'bernette-b38', name: 'bernette b38', short: 'b38',
  shopUrl: 'https://www.thesewingstudio.co.uk/products/bernette-b38-sewing-machine',
  blurb: 'A feature-rich electronic machine: 394 stitches and an alphabet, a touch panel and LCD, automatic thread cutter, presser-foot pressure dial and eight feet in the box.',
  facts: [
    '394 stitches (20 practical), 8 buttonholes/eyelets and an alphabet; stitch width up to 7 mm',
    'Touch panel with mode, clear, mirror-image and memory keys; LCD shows pattern, foot, width and length',
    'Start/stop, reverse, needle stop up/down, thread cutter and twin-needle buttons; automatic thread cutter',
    'Presser-foot pressure dial, drop-in bobbin, extension table and hard cover included',
    'Top speed 820 stitches per minute; about 170 mm of space to the right of the needle'
  ],
  specs: [['Stitches', '394 (20 practical, 8 buttonholes/eyelets) + alphabet'], ['Max stitch width', '7 mm'], ['Max speed', '820 spm'], ['Display', 'LCD + touch panel'], ['Thread cutter', 'Automatic (button) + manual on the head'], ['Bobbin', 'Drop-in'], ['Space right of needle', '170 mm'], ['Source', 'bernette.com product page + user manual 2026-01']],
  links: [
    { title: 'bernette b38 – User Manual (PDF, English)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/User-Manual/3-Series/b38_2026/5060008.0.04_web_b38_EN_2026-01.pdf', kind: 'PDF', doc: 'full', note: 'Official bernette.com, 2026-01 edition (72 pages).' },
    { title: 'bernette b38 – product page', url: 'https://www.bernette.com/en/models/bernette-38', kind: 'Web', doc: 'page', note: 'Features, accessories and tutorial videos.' }
  ],
  manual: { file: '5060008.0.04_web_b38_EN_2026-01.pdf', offset: 0, edition: '2026-01 EN', pages: [
    { key: 'overview', topic: 'Machine overview (parts)', printed: 6, find: 'Names of Parts' },
    { key: 'buttons', topic: 'Machine operating buttons', printed: 11, find: 'Machine Operating Buttons' },
    { key: 'touch', topic: 'Touch panel and LCD', printed: 13, find: 'Touch Panel' },
    { key: 'foot', topic: 'Changing the presser foot', printed: 14, find: 'Changing the Presser Foot' },
    { key: 'feed', topic: 'Dropping / raising the feed dog', printed: 15, find: 'Dropping or Raising the Feed Dog' },
    { key: 'needle', topic: 'Changing the needle', printed: 16, find: 'Changing the Needle' },
    { key: 'winding', topic: 'Winding and inserting the bobbin', printed: 17, find: 'Bobbin Winding and Inserting' },
    { key: 'upper', topic: 'Threading the machine', printed: 20, find: 'Threading the Machine' },
    { key: 'select', topic: 'Pattern selection', printed: 23, find: 'Pattern Selection' },
    { key: 'mode', topic: 'Setting mode', printed: 24, find: 'Setting Mode' },
    { key: 'tension', topic: 'Thread tension', printed: 25, find: 'Adjusting the Thread Tension for a Straight Stitch' },
    { key: 'buttonhole', topic: 'Buttonholes', printed: 42, find: 'Round-End Buttonhole' },
    { key: 'letters', topic: 'Programming letters', printed: 59, find: 'Programming Letters' },
    { key: 'maint', topic: 'Care of your machine', printed: 66, find: 'CARE OF YOUR MACHINE' },
    { key: 'trouble', topic: 'Troubleshooting', printed: 68, find: 'Troubleshooting' }
  ] },
  hide: ['moduleSocket', 'penHolder', 'felt', 'plateRelease', 'knobUpper', 'knobLower', 'buttonholeLever'],
  over: {
    ...b37.over,
    screen: { name: 'LCD display', text: 'Shows the pattern, mode, pattern number, the foot to fit, stitch width and length.' },
    panelButtons: { name: 'Touch panel', text: 'Mode, clear, mirror image and memory keys, the number keys, and the width and length keys. Mode 1 picks patterns 01–10 directly; modes 2 to 6 take a two-digit number.' },
    funcButtons: { name: 'Start/stop', text: 'Lower the presser foot first, then press to start; the machine begins slowly. It does not work while the foot control is plugged in.' },
    sideButtons: { name: 'Reverse, needle stop, thread cutter, twin needle', text: 'Reverse sews backwards, or a locking stitch on most stitches. Needle stop up/down moves the needle. The thread cutter button trims both threads (hold it to cut automatically after each seam). Twin needle limits the width for a twin needle.' },
    pressureDial: { name: 'Presser-foot pressure dial', text: 'Lighten or increase the pressure on the fabric; leave it at the normal setting for most work.' }
  },
  t: { ...b37.t, threader: 'lever', tension: 'Adjust the upper-thread tension in the settings, one step at a time, separately for straight and zigzag.', startNote: 'Lower the presser foot before pressing start/stop. The start/stop button only works when no foot control is plugged in.', stitchPick: 'In mode 1 press the number keys 01–10 directly; in the other modes type the two-digit pattern number.' },
  gear: { ids: b37.gear.ids,
    extra: [
      ...b37.gear.extra.filter(a => !a.id.endsWith(':satinfoot') && !a.id.endsWith(':table')).map(a => ({ ...a, id: a.id.replace('bernette-b37', id), m: id })),
      foot(id, 'overlock', 'Overlock foot', 'overlock', 'Guides the fabric edge for overcast stitches that stop the edge fraying.', ['Raw-edge finishing'], 'brother'),
      foot(id, 'blind', 'Blindstitch foot', 'blind', 'A guide holds the folded hem edge so only a few threads of fabric are caught.', ['Invisible hems'], 'brother'),
      foot(id, 'embfoot', 'Embroidery foot with clear sole', 'embroidery', 'A clear sole lets you see the stitching for satin and decorative stitches and lettering.', ['Lettering, satin stitch, appliqué'], 'brother'),
      foot(id, 'openemb', 'Open embroidery foot', 'satin', 'Open toe for a clear view of dense stitching and appliqué.', ['Appliqué, dense stitches'], 'brother'),
      other(id, 'table', 'Extension table and hard cover', 'table', 'A wider work surface that slides on over the free arm; the hard cover protects the machine.', ['Bulky projects, storage'], ['Slide the table on along the free arm until it seats.', 'Remove it for free-arm sewing.'])
    ] }
};
