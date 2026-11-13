import { foot, other } from './_gear.js';
export default {
  id: 'bernette-b77', catalogId: 'bernette-b77', brand: 'bernette', name: 'bernette b77', short: 'b77',
  type: 'sewing', profile: 'panel', layout: 'knobs', emb: false,
  shopUrl: 'https://www.thesewingstudio.co.uk/products/bernette-b77-sewing-machine',
  blurb: 'Computerised sewing and quilting machine with a 5-inch touchscreen, two multi-function knobs and built-in Dual Feed.',
  facts: [
    'Sewing and quilting only (no embroidery); drop-in bobbin',
    '500 stitches including 17 buttonholes/eyelets, plus a creative consultant that suggests stitch, foot and needle',
    'Built-in Dual Feed (even feeding from above and below), programmable foot control, knee lifter',
    'Semi-automatic needle threader, auto thread cutter and tie-off buttons',
    'Top sewing speed 1000 stitches per minute; 230 mm of room to the right of the needle'
  ],
  specs: [['Stitches', '500 (22 practical, 133 decorative, 35 quilting, 17 buttonholes/eyelets)'], ['Max stitch width', '7 mm'], ['Max speed', '1000 spm'], ['Screen', '5-inch colour touchscreen + 2 multi-function knobs'], ['Bobbin', 'Drop-in'], ['Weight', '9.21 kg (machine)'], ['Source', 'bernette.com product page + user manual 2026-05, technical data p.97']],
  links: [
    { title: 'bernette b77 – User Manual (PDF, English)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/User-Manual/7-Series/b77_2026/5020077_60A_04_web_manual_b77_2026-05_EN.pdf', kind: 'PDF', doc: 'full', note: 'Official bernette.com, 2026-05 edition.' },
    { title: 'bernette b77 – Quick Start Guide (PDF)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/Quick-Start-Guide/7-Series/EN/5200077_00A_04_web_qsg_b77_EN_2023-06.pdf', kind: 'PDF', doc: 'qsg', note: 'Short getting-started leaflet.' },
    { title: 'bernette b77 – product page', url: 'https://www.bernette.com/en/models/bernette-77', kind: 'Web', doc: 'page', note: 'Features, accessories, tutorial videos.' }
  ],
  manual: { file: '5020077_60A_04_web_manual_b77_2026-05_EN.pdf', offset: 0, edition: '2026-05 EN', pages: [
    { key: 'controls', topic: 'Front controls', printed: 11, find: 'Overview front controls' },
    { key: 'overview', topic: 'Machine overview (front)', printed: 14, find: 'Overview front' },
    { key: 'back', topic: 'Back panel', printed: 16, find: 'Overview back' },
    { key: 'feed', topic: 'Feed dog up/down', printed: 26, find: 'Feed Dog' },
    { key: 'needle', topic: 'Changing the needle', printed: 29, find: 'Changing the Needle' },
    { key: 'upper', topic: 'Threading the upper thread', printed: 32, find: 'Threading the Upper Thread' },
    { key: 'winding', topic: 'Winding the bobbin', printed: 37, find: 'Winding' },
    { key: 'bobbin', topic: 'Inserting the bobbin', printed: 39, find: 'Threading the Bobbin Thread' },
    { key: 'setup', topic: 'Setup program', printed: 41, find: 'Setup Program' },
    { key: 'stitches', topic: 'Selecting a stitch pattern', printed: 52, find: 'Selecting a Stitch Pattern' },
    { key: 'buttonhole', topic: 'Buttonholes (automatic)', printed: 81, find: 'Sewing a Buttonhole Automatically' },
    { key: 'maint', topic: 'Cleaning and oiling', printed: 89, find: 'Maintenance and Cleaning' },
    { key: 'trouble', topic: 'Troubleshooting', printed: 92, find: 'Troubleshooting' }
  ] },
  hide: ['moduleSocket', 'penHolder'],
  over: {
    lifter: { name: 'Dual Feed lever', text: 'Lowers the built-in upper feed so fabric is fed from above and below. Use it for slippery, stretchy, thick or layered fabric, and for matching patterns.' },
    sideButtons: { name: 'Tie-off, needle up/down, needle left/right', text: 'The smaller buttons: tie-off (secures the seam), needle up/down, and the two needle left/right buttons (15 needle positions).' },
    funcButtons: { name: 'Quick reverse, thread cutter, foot up/down, Start/Stop', text: 'The main button group. Quick reverse sews backwards while held, the cutter trims both threads, foot up/down moves the foot to hover/up, and Start/Stop sews without the foot control (hold about 2 seconds to start).' },
    knobUpper: { name: 'Upper multi-function knob', text: 'Changes the value shown on screen – for example stitch length – including while you sew.' },
    knobLower: { name: 'Lower multi-function knob', text: 'Changes the second value on screen – for example stitch width.' },
    speedSlider: { name: 'Speed slide', text: 'Sets the top sewing speed. Slide left to slow down for corners, buttonholes and satin stitches.' },
    screen: { name: '5-inch touchscreen', text: 'Pick stitches and feet, change tension, open the creative consultant and the Setup program.' }
  },
  t: {
    ready: 'Press the presser-foot button so the foot is up, and raise the needle with the needle up/down button.',
    spool: 'Put the felt disc on the horizontal spool pin, then the spool, then a spool disc about the same size as the spool. Choose the disc size so the spool does not wobble. Use the spool net for slippery thread.',
    path: 'Pull the thread to the thread guide above the spool, and down the channel on the front of the head. Slide it between the tension discs from the left of the machine – the foot must be up or the thread will not seat.',
    takeup: 'Round the bottom of the thread path, go up and into the take-up lever eye from right to left, then back down.',
    threader: 'semi', needleGuide: 'Pass the thread behind the guide just above the needle.',
    tension: 'Tension is set on the screen (or in the Setup program for all stitches); the machine suggests a value for the selected stitch.',
    windPlace: 'Fit the empty bobbin on the winder spindle at the top of the machine, then put a thread spool on the vertical pin or second spool pin – the manual shows which pin to use.',
    windPath: 'Take the thread through the thread guide, round the bobbin-winder pre-tension, and through one of the inner holes of the bobbin from the inside out.',
    windStart: 'Push the winder toward the bobbin side (the Start/Stop button flashes), then press Start/Stop or use the foot control.',
    windStop: 'The machine stops when the bobbin is full. Push the winder back, remove the bobbin and cut the thread.',
    bobbinOpen: 'Raise the needle and foot, switch off, then slide the bobbin cover open and lift it away.',
    bobbinIn: 'Drop the bobbin in so the thread unwinds counter-clockwise, then press it gently down.',
    footHolder: 'bernette7',
    foot: 'Select the foot on the screen after fitting it: a green tick shows the recommended foot for the stitch and a star shows other feet that also work.',
    needleNote: 'After fitting, tell the machine which needle you used on the screen – it then limits the stitch width to protect the plate.',
    startNote: 'Hold Start/Stop for about two seconds to start without the foot control.',
    dual: true, bobbinSensor: true
  },
  gear: { ids: ['invisiblezip', 'walking', 'quarter', 'freemotion', 'rolled', 'satin', 'straightfoot', 'o-spoolnet', 'o-brush', 'n-universal', 'n-ballpoint', 'n-stretch', 'n-microtex', 'n-topstitch', 'n-denim', 'n-leather', 'n-quilting', 'n-metallic', 'n-twin'],
    extra: [
      foot('bernette-b77', 'zigzag', 'Zigzag foot', 'zigzag', 'The all-round foot for straight and zigzag stitches and most practical stitches.', ['Everyday seams, hems, zigzag and stretch stitches'], 'bernette7'),
      foot('bernette-b77', 'buttonhole', 'Buttonhole foot with slide', 'buttonhole', 'Holds a button in a slide so the machine sews the buttonhole to the button size automatically.', ['One-step buttonholes'], 'bernette7', 'Sew a test buttonhole on a scrap of the same fabric and interfacing.'),
      foot('bernette-b77', 'embroidery', 'Embroidery / satin-stitch foot', 'embroidery', 'Has a grooved clear sole so thick satin and decorative stitches pass underneath without bunching.', ['Satin and decorative stitches', 'Appliqué'], 'bernette7'),
      other('bernette-b77', 'table', 'Slide-on table', 'table', 'Wide table that slides on over the free arm to give more support.', ['Quilting, bulky projects'], ['Slide the table on from the left until it seats.', 'Remove it to return to the free arm.'])
    ] }
};
