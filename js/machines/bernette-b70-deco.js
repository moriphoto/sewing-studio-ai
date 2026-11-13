import { foot, hoop, other } from './_gear.js';
const id = 'bernette-b70-deco';
export default {
  id, catalogId: 'bernette-b70-deco', brand: 'bernette', name: 'bernette B70 DECO', short: 'B70 DECO',
  type: 'embroidery', profile: 'panel', layout: 'knobs', emb: true, embOnly: true,
  shopUrl: 'https://www.thesewingstudio.co.uk/products/bernette-b70-deco-embroidery-machine',
  blurb: 'Embroidery-only machine with a 5-inch touchscreen, two multi-function knobs and three recognised hoops.',
  facts: [
    'Dedicated embroidery machine – no sewing stitches',
    'Embroidery area 260 × 160 mm; large, medium and small hoops included with automatic hoop recognition',
    '208 built-in designs and 7 alphabets, plus USB loading of your own designs',
    'Upper and lower thread sensors stop the machine when a thread or bobbin runs out',
    'Semi-automatic needle threader; automatic thread cutting while embroidering; top speed 850 spm'
  ],
  specs: [['Embroidery area', '260 × 160 mm'], ['Designs', '208 + 7 alphabets'], ['Max speed', '850 spm'], ['Screen', '5-inch colour touchscreen + 2 multi-function knobs'], ['Bobbin', 'Drop-in'], ['Weight', 'Machine 8.14 kg · module 3.65 kg'], ['Source', 'bernette.com product page + user manual 2026-05, technical data p.83']],
  links: [
    { title: 'bernette b70 DECO – User Manual (PDF, English)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/User-Manual/7-Series/b70-DECO_2026/5020070_60A_04_web_manual_b70_2026-05_EN.pdf', kind: 'PDF', doc: 'full', note: 'Official bernette.com, 2026-05 edition.' },
    { title: 'bernette b70 DECO – Quick Start Guide (PDF)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/Quick-Start-Guide/7-Series/EN/5200070_00A_04_web_qsg_b70_EN_2023-06.pdf', kind: 'PDF', doc: 'qsg', note: 'Short getting-started leaflet.' },
    { title: 'bernette 70 DECO – product page', url: 'https://www.bernette.com/en/models/bernette-70-deco', kind: 'Web', doc: 'page', note: 'Features, accessories, tutorial videos.' }
  ],
  manual: { file: '5020070_60A_04_web_manual_b70_2026-05_EN.pdf', offset: 0, edition: '2026-05 EN', pages: [
    { key: 'controls', topic: 'Front controls', printed: 11, find: 'Overview front controls' },
    { key: 'overview', topic: 'Machine overview (front)', printed: 13, find: 'Overview front' },
    { key: 'module', topic: 'Attaching the embroidery module', printed: 27, find: 'Attaching the Embroidery Module' },
    { key: 'embfoot', topic: 'Attaching the embroidery foot', printed: 28, find: 'Attaching the Embroidery Foot' },
    { key: 'upper', topic: 'Threading the upper thread', printed: 30, find: 'Threading the Upper Thread' },
    { key: 'winding', topic: 'Winding the bobbin', printed: 33, find: 'Winding' },
    { key: 'bobbin', topic: 'Inserting the bobbin', printed: 35, find: 'Threading the Bobbin Thread' },
    { key: 'hoop', topic: 'Attaching the hoop', printed: 41, find: 'Attaching the Hoop' },
    { key: 'setup', topic: 'Embroidery settings (Setup)', printed: 44, find: 'Embroidery Settings' },
    { key: 'maint', topic: 'Cleaning and oiling', printed: 74, find: 'Maintenance and Cleaning' },
    { key: 'trouble', topic: 'Troubleshooting', printed: 77, find: 'Troubleshooting' }
  ] },
  
  hide: ['buttonholeLever'],
  over: {
    funcButtons: { name: 'Start/Stop, thread cutter, foot up/down, sewing light', text: 'The main button group. Start/Stop runs the embroidery; the cutter trims the threads; foot up/down moves the presser foot; the light button switches the work light. (This model has no quick-reverse button – it is an embroidery-only machine.)' },
    sideButtons: { name: 'Needle up/down, needle position', text: 'Smaller buttons for the needle: raise or lower it, and nudge the position when lining up a design.' },
    knobUpper: { name: 'Upper multi-function knob', text: 'Changes the value on screen – for example moving or resizing a design.' },
    knobLower: { name: 'Lower multi-function knob', text: 'Changes the second value on screen – for example rotating a design.' },
    speedSlider: { name: 'Speed slide', text: 'Sets the maximum embroidery speed. Slow it for fine details, metallic or fragile thread.' }
  },
  t: {
    ready: 'Raise the presser foot with the foot up/down button and raise the needle with the needle button.',
    spool: 'Put the felt disc on the horizontal spool pin, then the spool, then a spool disc about the same size as the spool. Use the spool net for slippery rayon or metallic thread.',
    path: 'Pull the thread to the guide above the spool, down the channel on the front of the head and between the tension discs.',
    takeup: 'Round the bottom of the thread path, go up and into the take-up lever eye from right to left, then back down.',
    threader: 'semi', needleGuide: 'Pass the thread behind the guide just above the needle.',
    windPlace: 'Fit the empty bobbin on the winder spindle on top of the machine and put a spool of bobbin thread on the second spool pin.',
    windPath: 'Take the thread through the guide, round the winder pre-tension and through one hole of the bobbin from the inside out.',
    windStart: 'Push the winder toward the bobbin side and press Start/Stop to wind.',
    windStop: 'The machine stops when the bobbin is full. Push the winder back, remove the bobbin and cut the thread.',
    bobbinOpen: 'Raise the needle and foot, switch off, slide the bobbin cover open and lift it away.',
    bobbinIn: 'Drop the bobbin in so the thread unwinds counter-clockwise, then press it gently down.',
    footHolder: 'bernette7', embArea: '260 × 160 mm', hoops: 'large 260 × 160, medium 180 × 120, small 70 × 50 mm', embFoot: 'hopper embroidery foot', embSpeed: 850, hoopRecognition: true, bobbinSensor: true
  },
  gear: { ids: ['o-spoolnet', 'o-brush', 'n-embroidery', 'n-metallic', 'n-twin'],
    extra: [
      foot(id, 'hopper', 'Hopper embroidery foot', 'hopper', 'Embroidery foot that hovers just above the work so thick or springy embroidery does not drag.', ['All hooped embroidery'], 'bernette7'),
      hoop(id, 'large', 'Large hoop (260 × 160 mm)', 'L', 'The biggest hoop – full-size designs without re-hooping.', ['Large designs, jacket backs, cushion panels']),
      hoop(id, 'medium', 'Medium hoop (180 × 120 mm)', 'M', 'The everyday hoop for most designs and lettering.', ['Chest logos, towels, small projects']),
      hoop(id, 'small', 'Small hoop (70 × 50 mm)', 'S', 'For tiny designs, cuffs and monograms.', ['Cuffs, pockets, monograms'])
    ] }
};
