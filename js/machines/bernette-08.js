import { foot, other } from './_gear.js';
const id = 'bernette-08';
export default {
  id, catalogId: 'bernette-08', brand: 'bernette', name: 'bernette 08 Straight Stitch', short: '08',
  type: 'sewing', profile: 'mech', emb: false,
  shopUrl: 'https://www.thesewingstudio.co.uk/products/bernette-08-straight-stitch-sewing-machine',
  blurb: 'A straight-stitch-only machine built for piecing and quilting: 1600 stitches a minute, a wide table, a knee lifter, an automatic thread cutter and a separate bobbin-winding motor.',
  facts: [
    'One stitch only – the straight stitch – with a stitch length up to 6 mm',
    'Top speed 1600 stitches per minute with a speed control; automatic thread cutter and needle stop up/down buttons',
    'Rotary hook with a front bobbin case, semi-automatic needle threader, independent bobbin winding motor',
    'Adjustable presser-foot pressure, a quick-reverse lever, retractable thread guide and a knee lifter (Free Hand System)',
    'About 225 mm of space right of the needle; slide-on extension table (60 × 40 cm) in the box'
  ],
  specs: [['Stitches', '1 (straight stitch)'], ['Max stitch length', '6 mm'], ['Max speed', '1600 spm'], ['Hook system', 'Rotary hook'], ['Space right of needle', '225 mm'], ['Weight', '14.6 kg'], ['Source', 'bernette.com product page + user manual 2026-04, technical data p.41']],
  links: [
    { title: 'bernette 08 – User Manual (PDF, English)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/User-Manual/b08/2026/Neu/5060800_30A_04_web_manual_b08_2026-04_EN.pdf', kind: 'PDF', doc: 'full', note: 'Official bernette.com, 2026-04 edition (42 pages).' },
    { title: 'bernette 08 – Quick Start Guide (PDF)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/Quick-Start-Guide/b08/5600800_00A_04_web_qsg_b08series_EN_2024-03.pdf', kind: 'PDF', doc: 'qsg', note: 'Short getting-started leaflet.' },
    { title: 'bernette 08 – product page', url: 'https://www.bernette.com/en/models/bernette-08-straight-stitch', kind: 'Web', doc: 'page', note: 'Features and accessories.' }
  ],
  manual: { file: '5060800_30A_04_web_manual_b08_2026-04_EN.pdf', offset: 0, edition: '2026-04 EN', pages: [
    { key: 'overview', topic: 'Machine overview (front)', printed: 8, find: 'Overview' },
    { key: 'knee', topic: 'Knee lifter', printed: 14, find: 'Knee Lifter' },
    { key: 'needle', topic: 'Changing the needle', printed: 17, find: 'Changing the Needle' },
    { key: 'foot', topic: 'Changing the presser foot', printed: 18, find: 'Changing the Presser Foot' },
    { key: 'winding', topic: 'Winding the bobbin', printed: 19, find: 'Winding the Bobbin Thread' },
    { key: 'bobbin', topic: 'Threading the bobbin thread', printed: 20, find: 'Threading the Bobbin Thread' },
    { key: 'upper', topic: 'Threading the upper thread', printed: 22, find: 'Threading the Upper Thread' },
    { key: 'threader', topic: 'Needle threader', printed: 24, find: 'Needle Threader' },
    { key: 'tension', topic: 'Adjusting the lower thread tension', printed: 24, find: 'Adjusting the Lower Thread Tension' },
    { key: 'length', topic: 'Stitch length', printed: 27, find: 'Stitch Length' },
    { key: 'pressure', topic: 'Presser foot pressure', printed: 28, find: 'Presser Foot Pressure' },
    { key: 'maint', topic: 'Cleaning the feed dog and hook', printed: 37, find: 'Cleaning the Feed Dog' },
    { key: 'trouble', topic: 'Troubleshooting', printed: 39, find: 'Troubleshooting' }
  ] },
  hide: ['stitchDial', 'widthDial', 'startStop', 'felt', 'plateRelease', 'buttonholeLever', 'bobbinCover'],
  over: {
    lengthDial: { name: 'Stitch length dial (back)', text: 'Sets the stitch length up to 6 mm; the setting shows on the stitch length display at the front. Short stitches for fine fabric and piecing, longer for basting.' },
    reverseLever: { name: 'Quick reverse lever', text: 'Hold it to sew backwards; let go to sew forwards.' },
    tensionDial: { name: 'Thread tension dial', text: 'Adjusts the upper-thread tension. There is also a separate thread pre-tension dial – change one thing at a time and test on a scrap.' },
    pressureDial: { name: 'Presser-foot pressure dial (top)', text: 'Sets how firmly the foot holds the fabric; the setting shows on the pressure display at the front. Lighter for thin or fluffy fabric, heavier for thick layers.' },
    threader: { name: 'Needle threader', text: 'Press the threading lever down, turn it backwards so the wire hook passes through the eye, hook the thread, and turn it forwards – see the upper-threading guide.' }
  },
  t: {
    ready: 'Raise the presser foot and use the needle stop up/down button to raise the needle and the take-up lever.',
    spool: 'Pull the retractable thread guide up until it engages. Put the thread spool and a spool disc on the spool pin (pull the spool net over slippery thread).',
    path: 'Feed the thread through the thread guide wire above the spool, then through the thread guides and the three holes of the guide plate the manual shows, down to the tension dial.',
    takeup: 'Follow the path up through the take-up lever and down again, then through the guides to the right of the needle.',
    threader: 'lever', needleGuide: 'Guide the thread through the guides on the right of the needle, then use the needle threader.',
    windPlace: 'Put the spool on the spool pin and thread through the guide wire, the guide and round the bobbin winder pre-tension; pass the end through an inner hole in the empty bobbin.',
    windPath: 'Place the empty bobbin on the winder unit and press the stopper to the left against the bobbin until it engages.',
    windStart: 'Press the Bobbin Winder button – the separate winding motor starts (you can even wind while sewing). Stop after a few turns, cut the tail, and press again.',
    windStop: 'The machine stops by itself when the bobbin is full. Remove the bobbin and cut the thread.',
    bobbinOpen: 'Raise the needle, open the bobbin cover, remove the looper cover and switch the machine off. Open the flap of the bobbin case and take it out.',
    bobbinIn: 'Put the bobbin in the case so the thread winds clockwise, pull the thread into the slit from the right and under the spring to the opening, then hold the case by its flap and click it into the hook. Refit the top cover and close the bobbin cover.',
    footHolder: 'screw', foot: 'The presser foot is held by a fixing screw – loosen it, swap the foot and tighten it again.',
    needleNote: 'Raise the needle and switch the machine off first.',
    startNote: 'There is no Start/Stop button: sewing is with the foot control (an automatic thread cutter connects at the back).',
    stitchPick: 'There is only one stitch. Set the stitch length with the dial on the back (the stitch length display at the front shows it).',
    mech: true, noButtonholes: true, noTwin: true, noFeed: true, noWidth: true
  },
  gear: { ids: ['straightfoot', 'quarter', 'walking', 'o-spoolnet', 'o-brush', 'n-universal', 'n-microtex', 'n-topstitch', 'n-denim', 'n-quilting'],
    extra: [
      foot(id, 'straight', 'Standard straight-stitch foot', 'straight', 'The standard foot with a narrow opening for the needle; the machine comes with it.', ['Piecing, general straight-stitch sewing'], 'screw'),
      foot(id, 'narrow', 'Narrow straight-stitch foot', 'straight', 'A narrower foot with a small opening for fine control close to edges.', ['Topstitching, edge stitching'], 'screw'),
      other(id, 'knee', 'Knee lifter', 'foot', 'Plugs in at the front so your knee raises and lowers the presser foot, leaving both hands free.', ['Quilting, appliqué, patchwork'], ['Plug the lifter into the knee lifter connection.', 'Adjust the sitting height and loosen the fixing screw to set the angle, then tighten it.']),
      other(id, 'table', 'Slide-on extension table', 'table', 'A wide table that slides on to support large quilts (about 60 × 40 cm).', ['Quilting, large projects'], ['Slide the table on at the front of the sewing area until it seats.', 'Remove it for narrow work.'])
    ] }
};
