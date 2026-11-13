import { foot, other } from './_gear.js';
const id = 'bernette-b33';
export default {
  id, catalogId: 'bernette-b33', brand: 'bernette', name: 'bernette b33', short: 'b33',
  type: 'sewing', profile: 'mech', emb: false,
  shopUrl: 'https://www.thesewingstudio.co.uk/products/bernette-b33-sewing-machine',
  blurb: 'A simple mechanical starter machine: two knobs pick the stitch and its length, with a needle threader and a four-step buttonhole.',
  facts: [
    'Mechanical machine: stitch pattern selector knob, stitch length knob, thread tension dial and a reverse lever',
    '15 stitches (14 practical) including one four-step buttonhole; maximum stitch width 5 mm, length 4 mm',
    'Semi-automatic needle threader, retractable feed dog and a two-step presser-foot lift',
    'Front-loading CB bobbin case under a cover, manual thread cutter on the head, sewing table with accessory box',
    'About 170 mm of space to the right of the needle (free arm)'
  ],
  specs: [['Stitches', '15 (14 practical, 1 buttonhole)'], ['Max stitch length', '4 mm'], ['Max stitch width', '5 mm'], ['Hook system', 'CB (removable bobbin case)'], ['Space right of needle', '170 mm'], ['Thread cutter', 'Manual'], ['Source', 'bernette.com product page + user manual 2026-01']],
  links: [
    { title: 'bernette b33 – User Manual (PDF, English)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/User-Manual/3-Series/b33_2026/5060003_00A_04_web_b33_2026-01_EN.pdf', kind: 'PDF', doc: 'full', note: 'Official bernette.com, 2026-01 edition (32 pages).' },
    { title: 'bernette b33 – product page', url: 'https://www.bernette.com/en/models/bernette-33', kind: 'Web', doc: 'page', note: 'Features, accessories and tutorial videos.' }
  ],
  manual: { file: '5060003_00A_04_web_b33_2026-01_EN.pdf', offset: 0, edition: '2026-01 EN', pages: [
    { key: 'overview', topic: 'Machine overview (parts)', printed: 6, find: 'Names of Parts' },
    { key: 'foot', topic: 'Changing the presser foot', printed: 9, find: 'Changing the Presser Foot' },
    { key: 'needle', topic: 'Changing the needle', printed: 10, find: 'Changing the needle' },
    { key: 'spool', topic: 'Spool pins and bobbin case', printed: 11, find: 'Removing or Inserting the Bobbin Case' },
    { key: 'winding', topic: 'Winding the bobbin', printed: 12, find: 'Winding the Bobbin' },
    { key: 'bobbin', topic: 'Threading the bobbin case', printed: 12, find: 'Threading the Bobbin Case' },
    { key: 'upper', topic: 'Threading the machine (upper)', printed: 13, find: 'Threading the Machine' },
    { key: 'tension', topic: 'Thread tension', printed: 14, find: 'Correct tension' },
    { key: 'stitches', topic: 'Selecting stitch and length', printed: 15, find: 'Turn the stitch pattern selector knob' },
    { key: 'feed', topic: 'Lowering / raising the feed dog', printed: 16, find: 'Lowering and raising the feed dog' },
    { key: 'buttonhole', topic: 'Four-step buttonhole', printed: 22, find: 'Four-step buttonhole' },
    { key: 'maint', topic: 'Cleaning the bobbin case and shuttle race', printed: 26, find: 'Cleaning the Bobbin Case' },
    { key: 'trouble', topic: 'Troubleshooting', printed: 28, find: 'Troubleshooting' }
  ] },
  hide: ['pressureDial', 'startStop', 'felt', 'plateRelease', 'widthDial', 'buttonholeLever'],
  over: {
    stitchDial: { name: 'Stitch pattern selector knob', text: 'Turn so the symbol of the stitch you want points at the setting mark. Have the needle raised out of the fabric while you turn it.' },
    lengthDial: { name: 'Stitch length knob', text: 'Higher numbers give longer stitches; 0.5–4 suits zigzag. "S" is for the red stretch stitches, and the + / – either side fine-tunes them if they look uneven. It also sets how dense the buttonhole is.' },
    reverseLever: { name: 'Reverse sewing lever', text: 'Keep it pressed to sew backwards; let go to sew forwards again.' },
    tensionDial: { name: 'Thread tension dial', text: 'Raise the number to tighten the needle thread, lower it to loosen. Move one step at a time and test on a scrap.' }
  },
  t: {
    ready: 'Raise the presser-foot lever and turn the handwheel toward you until the take-up lever is at its highest.',
    spool: 'Pull the spool pin up, put the spool on with the thread coming off the back, and fit a spool cap that matches the spool. If a thread tangles round the pin, use the hole in the pin as the manual shows.',
    path: 'Draw the thread into the thread guide with both hands, down into the tension area and round the check-spring holder.',
    takeup: 'Pull it firmly up and through the take-up lever from right to left, then down into the guide at the bottom of the head and the guide on the left of the needle bar.',
    threader: 'lever', needleGuide: 'Pass the thread into the guide on the left of the needle bar before threading the needle from front to back.',
    windPlace: 'Pull out the handwheel (the clutch) so the needle stops, put the spool on the pin and the empty bobbin on the winder spindle.',
    windPath: 'Take the thread round the bobbin-winder pre-tension and through the hole in the bobbin from inside to outside.',
    windStart: 'Push the winder spindle to the right, hold the thread tail and press the foot control.',
    windStop: 'Stop after a few turns, cut the tail, then fill the bobbin. Push the spindle back to the left, cut the thread and push the handwheel back in.',
    bobbinOpen: 'Take the sewing table off, raise the needle and open the bobbin cover. The bobbin case lifts out by its latch.',
    bobbinIn: 'Put the bobbin in the case so the thread unwinds in the direction of the arrow, pull it into the slot and under the tension spring to the delivery eye, then fit the case with its horn in the recess of the hook race.',
    footHolder: 'brother', needleNote: 'This machine has no screen or lock key, so switch it off before changing the needle.',
    startNote: 'There is no Start/Stop button: sewing is with the foot control.',
    stitchPick: 'Turn the stitch pattern selector knob until the stitch you want sits at the setting mark, then set the length knob.', mech: true, fourStep: true, noWidth: true
  },
  gear: { ids: ['invisiblezip', 'rolled', 'satin', 'o-spoolnet', 'o-brush', 'n-universal', 'n-ballpoint', 'n-stretch', 'n-microtex', 'n-topstitch', 'n-denim', 'n-leather', 'n-quilting', 'n-twin'],
    extra: [
      foot(id, 'zigzag', 'Zigzag foot', 'zigzag', 'The all-round foot used for most stitches.', ['Everyday seams, zigzag'], 'brother'),
      foot(id, 'buttonhole', 'Buttonhole foot with slide', 'buttonhole', 'The button sits in a slide at the back so the length is set by the button.', ['Four-step buttonholes'], 'brother'),
      foot(id, 'blind', 'Blindstitch foot', 'blind', 'A guide holds the folded hem edge so only a few threads of the fabric are caught.', ['Invisible hems'], 'brother'),
      foot(id, 'zipper', 'Zipper foot', 'zipper', 'Narrow foot that lets the needle run close to the zipper teeth.', ['Zips, piping'], 'brother'),
      foot(id, 'button', 'Button sew-on foot', 'button', 'Holds a button so the machine can sew it on; lower the feed dog first.', ['Sewing on buttons'], 'brother'),
      other(id, 'table', 'Sewing table with accessory box', 'table', 'Slides onto the free arm for a wider work surface; the box inside keeps the accessories together.', ['Everyday sewing'], ['Slide the table along the free arm until its guides click into the openings.', 'Pull it off to the left for free-arm sewing and to reach the bobbin cover.'])
    ] }
};
