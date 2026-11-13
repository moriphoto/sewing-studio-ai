import { foot, other } from './_gear.js';
const id = 'bernette-05-academy';
export default {
  id, catalogId: 'bernette-05-academy', brand: 'bernette', name: 'bernette 05 Academy', short: '05 Academy',
  type: 'sewing', profile: 'mech', emb: false,
  shopUrl: 'https://www.thesewingstudio.co.uk/products/bernette-05-academy-heavy-duty-sewing-machine',
  blurb: 'Sturdy mechanical sewing machine with dial controls, adjustable foot pressure and a speed limiter – a good learning machine.',
  facts: [
    'Mechanical machine: stitch selector wheel, stitch length knob and stitch width dial',
    '30 stitches including a one-step buttonhole, super-stretch and blanket stitch',
    'Adjustable presser-foot pressure, drop-in bobbin, retractable feed dog (lever on the back)',
    'Power switch also has a half-speed mode for tricky work; top speed 1100 stitches per minute',
    'Needle threader, side thread cutter, two LED lights and a slide-on extension table'
  ],
  specs: [['Stitches', '30 (incl. one-step buttonhole)'], ['Max stitch length', '4 mm'], ['Max stitch width', '6 mm'], ['Max speed', '1100 spm'], ['Bobbin', 'Drop-in'], ['Space right of needle', '165 mm'], ['Weight', '7.0 kg'], ['Source', 'bernette.com product page + user manual 2026-04, technical data p.74']],
  links: [
    { title: 'bernette 05 Academy – User Manual (PDF, English)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/User-Manual/b05/2026/ACADEMY/5020205_30A_04_web_manual_b05_ACADEMY_2026-04_EN.pdf', kind: 'PDF', doc: 'full', note: 'Official bernette.com, 2026-04 edition.' },
    { title: 'bernette b05 series – Quick Start Guide (PDF)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/Quick-Start-Guide/b05/EN/5200105_0_04_web_qsg_b05-series_EN_2023-06.pdf', kind: 'PDF', doc: 'qsg', note: 'Shared by the b05 series.' },
    { title: 'bernette 05 Academy – product page', url: 'https://www.bernette.com/en/models/bernette-05-academy', kind: 'Web', doc: 'page', note: 'Features and stitch overview.' }
  ],
  manual: { file: '5020205_30A_04_web_manual_b05_ACADEMY_2026-04_EN.pdf', offset: 0, edition: '2026-04 EN', pages: [
    { key: 'overview', topic: 'Machine overview (front)', printed: 10, find: 'Overview Front' },
    { key: 'feed', topic: 'Feed dog up/down', printed: 20, find: 'Raising or Lowering the Feed Dog' },
    { key: 'needle', topic: 'Changing the needle', printed: 22, find: 'Changing the Needle' },
    { key: 'foot', topic: 'Changing the presser foot', printed: 23, find: 'Changing the Presser Foot' },
    { key: 'upper', topic: 'Threading the upper thread', printed: 27, find: 'Threading the Upper Thread' },
    { key: 'winding', topic: 'Winding the bobbin', printed: 31, find: 'Winding' },
    { key: 'bobbin', topic: 'Inserting the bobbin', printed: 33, find: 'Threading the Bobbin Thread' },
    { key: 'stitches', topic: 'Stitch width and length', printed: 37, find: 'Setting the Stitch Width' },
    { key: 'buttonhole', topic: 'Sewing a buttonhole automatically', printed: 62, find: 'Sewing a Buttonhole Automatically' },
    { key: 'maint', topic: 'Cleaning and oiling', printed: 68, find: 'Maintenance and Cleaning' },
    { key: 'trouble', topic: 'Troubleshooting', printed: 72, find: 'Troubleshooting' }
  ] },
  hide: ['startStop', 'plateRelease'],
  over: {
    stitchDial: { name: 'Stitch selector wheel', text: 'Turn to pick a stitch pattern. The letters/numbers on the wheel match the stitch chart.' },
    lengthDial: { name: 'Stitch length knob', text: 'Sets stitch length (0–4 mm on the black stitches). The buttonhole range on the knob is used for buttonholes.' },
    widthDial: { name: 'Stitch width dial', text: 'Sets stitch width up to 6 mm. Turn it only with the needle raised. There is a separate needle position dial on top of the machine that moves the needle left or right – the two work together, so check both when a zigzag or stitch lands off-centre.' },
    reverseLever: { name: 'Quick reverse lever', text: 'Hold it to sew backwards; release to go forwards again.' },
    tensionDial: { name: 'Thread tension dial', text: 'Raises or lowers the upper thread tension. Leave it near the middle and change by one step at a time.' },
    pressureDial: { name: 'Presser-foot pressure', text: 'Adjust the foot pressure for very light or very heavy fabric; most fabrics are fine at the factory setting.' }
  },
  t: {
    ready: 'Raise the presser foot lever, and turn the handwheel toward you until the needle and take-up lever are at their highest.',
    spool: 'Place the spool on the spool pin so the thread unwinds clockwise (from the spool in the direction of the machine), then fit a spool holder that matches the spool size.',
    path: 'Take the thread through the thread guide, round the pre-tension, down the channel to the tension discs.',
    takeup: 'Wrap round the take-up lever cover, up and through the take-up lever from right to left, and down again.',
    threader: 'lever', needleGuide: 'Pass the thread behind the guide above the needle.',
    windPlace: 'Put the empty bobbin on the winder pin on top of the machine and the spool on the spool pin.',
    windPath: 'Take the thread through the guide, around the winder pre-tension and through one inner hole of the bobbin.',
    windStart: 'Push the bobbin winder to the right so the machine switches to winding, then press the foot control.',
    windStop: 'Stop when full, push the winder back to the left (back to sewing mode), take the bobbin off and cut the thread.',
    bobbinOpen: 'Raise the needle and foot, switch off, push the bobbin cover handle to the right and remove the cover.',
    bobbinIn: 'Insert the bobbin so the thread is wound counter-clockwise, then press it down gently.',
    footHolder: 'screw', foot: 'This machine has a screw-on foot holder: change the sole or the whole holder with the screwdriver, as the manual shows.',
    needleNote: 'Raise the needle before turning the stitch width dial so the needle is never in the plate.',
    startNote: 'There is no Start/Stop button: sewing is with the foot control. The power switch has a half-speed setting for tricky sections.',
    stitchPick: 'Turn the stitch selector wheel until the stitch you want sits at the setting mark; then set length and width.', mech: true
  },
  gear: { ids: ['invisiblezip', 'walking', 'quarter', 'freemotion', 'satin', 'straightfoot', 'o-spoolnet', 'o-brush', 'n-universal', 'n-ballpoint', 'n-stretch', 'n-microtex', 'n-topstitch', 'n-denim', 'n-leather', 'n-quilting', 'n-twin'],
    extra: [
      foot(id, 'zigzag', 'Zigzag foot', 'zigzag', 'The all-round foot for straight, zigzag and most practical stitches.', ['Everyday seams and hems'], 'screw'),
      foot(id, 'buttonhole', 'Buttonhole foot', 'buttonhole', 'Has a slide that takes the button so the machine sews the buttonhole at the right length in one step.', ['One-step buttonholes'], 'screw'),
      foot(id, 'zipper', 'Zipper foot', 'zipper', 'Narrow foot that lets the needle sit close to the zipper teeth.', ['Zips, piping'], 'screw'),
      other(id, 'table', 'Slide-on extension table', 'table', 'A wider work surface that slides on over the free arm.', ['Larger projects'], ['Slide the table on from the left until it seats.', 'Remove it to use the free arm.'])
    ] }
};
