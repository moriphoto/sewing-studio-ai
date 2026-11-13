import { foot } from './_gear.js';
const id = 'janome-5060-qdc';
const note = 'The official PDF from janome.ca. Janome\'s site blocks automated link checks, so open it in your own browser.';
export default {
  id, catalogId: 'janome-5060-qdc', brand: 'Janome', name: 'Janome 5060QDC', short: '5060QDC',
  type: 'sewing', profile: 'panel', layout: 'buttons', emb: false, small: true,
  shopUrl: 'https://www.thesewingstudio.co.uk/products/janome-5060-qdc-sewing-machine',
  blurb: 'Computerised sewing machine with an LCD, 60 stitches, one-step buttonholes, automatic thread cutter and a jam-proof drop-in bobbin.',
  facts: [
    '60 stitches chosen with the LCD display, including 6 styles of one-step buttonhole',
    'Start/Stop button, auto thread cutter (scissors button), auto lock-stitch button and a speed-limit slider',
    'Built-in needle threader, adjustable foot pressure and drop feed for free-motion work',
    'Easy-set drop-in bobbin, auto-declutch bobbin winding, extension table and hard cover included',
    '7-piece Superior Feed System, free arm and LED light'
  ],
  specs: [['Stitches', '60 (6 one-step buttonholes)'], ['Display', 'LCD'], ['Feed system', '7-piece (SFS+)'], ['Bobbin', 'Easy-set drop-in; auto-declutch winding'], ['Extras', 'Drop feed, foot-pressure adjustment, hard cover, extension table'], ['Source', 'janome.co.uk model page (loads) · janome.ca (Cloudflare-blocked to scripts)']],
  links: [
    { title: 'Janome UK – 5060QDC model page', url: 'https://www.janome.co.uk/model-5060qdc', kind: 'Web', doc: 'page', note: 'Official UK model page – loads normally.' },
    { title: 'Janome 5060QDC – Instruction book (PDF, English)', url: 'https://www.janome.ca/wp-content/uploads/2025/02/inst_book-5060qdc-en.pdf', kind: 'PDF', doc: 'full', note, blocked: true }
  ],
  manual: null,
  hide: ['moduleSocket', 'felt', 'buttonholeLever', 'plateRelease'],
  over: {
    screen: { name: 'LCD display', text: 'Shows the selected stitch number, length and width. Use the buttons beside it to change stitch and settings.' },
    sideButtons: { name: 'Stitch and setting buttons', text: 'Choose a stitch pattern and adjust stitch length and width.' },
    panelButtons: { name: 'Direct-select keys', text: 'Quick-pick keys for the most-used stitches.' },
    funcButtons: { name: 'Start/Stop, reverse, thread cutter', text: 'Start/Stop sews without the foot control; reverse sews backwards while held; the scissors button trims both threads. The auto lock-stitch button ties off the seam.' },
    speedSlider: { name: 'Speed-limit slider', text: 'Sets the top sewing speed. Slide to slow for corners, buttonholes and satin stitches.' }
  },
  t: {
    ready: 'Raise the presser foot and turn the handwheel toward you until the needle is at its highest.',
    spool: 'Place the spool on the spool pin with the thread coming off the spool toward the back, then add a spool holder that fits the spool size. The spool should turn freely.',
    path: 'Take the thread to the thread guide on top, then follow the numbered threading path printed on the machine, passing between the tension discs with the presser foot up.',
    takeup: 'Round the bottom of the path, up through the take-up lever from right to left, then down.',
    threader: 'lever', needleGuide: 'Pass the thread behind the guide just above the needle.',
    windPlace: 'Fit the empty bobbin on the winder spindle on top of the machine and set the spool on the spool pin.',
    windPath: 'Take the thread round the winder tension guide and through one hole in the bobbin from the inside out.',
    windStart: 'Push the bobbin winder to the winding side (this disengages the needle), and press the foot control or Start/Stop.',
    windStop: 'It stops by itself when full (auto-declutch). Push the winder back, take off the bobbin and cut the thread.',
    bobbinOpen: 'Raise the needle and foot, then slide the clear bobbin cover toward you to remove it.',
    bobbinIn: 'Drop in the bobbin so the thread unwinds in the direction shown on the plate, then draw it through the slot.',
    footHolder: 'janome', foot: 'The feet are snap-on: check the foot letter printed on the sole against the screen/stitch chart.',
    startNote: 'Start/Stop starts and stops sewing at the speed set by the slider; you can also use the foot control.', sensors: false
  },
  gear: { ids: ['invisiblezip', 'walking', 'freemotion', 'rolled', 'satin', 'straightfoot', 'o-spoolnet', 'o-brush', 'n-universal', 'n-ballpoint', 'n-stretch', 'n-microtex', 'n-topstitch', 'n-denim', 'n-leather', 'n-quilting', 'n-twin'],
    extra: [
      foot(id, 'quarter', '1/4" seam foot (O)', 'quarter', 'Has a guide edge exactly 1/4" from the needle for accurate patchwork and piecing seams.', ['Patchwork piecing']  , 'janome'),
      foot(id, 'satin', 'Satin stitch foot (open toe F2)', 'satin', 'Open-toe foot so you can see decorative and satin stitches as they form.', ['Satin stitch, appliqué'], 'janome'),
      foot(id, 'evenfeed', 'Even feed foot with guide (open toe)', 'walking', 'A foot that helps the top layer feed along with the bottom, so layers do not creep.', ['Quilting layers, slippery or thick fabric'], 'janome'),
      foot(id, 'darning', 'Darning / embroidery foot (open toe)', 'freemotion', 'Hops with the needle while you move the fabric by hand with the feed dog dropped.', ['Free-motion quilting and darning'], 'janome', 'Use the drop feed control at the same time as this foot.')
    ] }
};
