import { foot } from './_gear.js';
const id = 'janome-sewist-725s';
const note = 'The official PDF from janome.ca. Janome\'s site blocks automated link checks, so open it in your own browser.';
export default {
  id, catalogId: 'janome-sewist-725s', brand: 'Janome', name: 'Janome Sewist 725S', short: '725S',
  type: 'sewing', profile: 'mech', emb: false,
  shopUrl: 'https://www.thesewingstudio.co.uk/products/janome-sewist-725s-sewing-machine',
  blurb: 'Mechanical dial machine with 23 stitches, a one-step buttonhole, built-in needle threader and adjustable foot pressure.',
  facts: [
    '23 built-in stitches (Janome\'s figure – the shop listing may quote a different number), one one-step buttonhole',
    'Stitch selection dials; max stitch width 5 mm, max length 4 mm',
    'Top-loading drop-in bobbin with auto-declutch winding',
    'Built-in one-hand needle threader, snap-on feet, extra-high foot lift, drop feed, 4-piece feed dog',
    'Hard cover included'
  ],
  specs: [['Stitches', '23 (Janome); 1 one-step buttonhole'], ['Max stitch width/length', '5 mm / 4 mm'], ['Bobbin', 'Top-loading full-rotary, auto-declutch winding'], ['Tension', 'Manual dial'], ['Feed dog', '4-piece, drop feed'], ['Workspace', '6.7 × 4.3 in'], ['Weight', '14.8 lb'], ['Source', 'janome.com product page']],
  links: [
    { title: 'Janome Sewist 725S – product page (janome.com)', url: 'https://www.janome.com/product/sewist-725s/', kind: 'Web', doc: 'page', note: 'Official page.', blocked: true },
    { title: 'Janome Sewist 725S – Instruction book (PDF, English)', url: 'https://www.janome.ca/wp-content/uploads/2025/03/inst_book-sewist_725s-en.pdf', kind: 'PDF', doc: 'full', note, blocked: true }
  ],
  manual: null,
  hide: ['startStop', 'felt', 'buttonholeLever', 'plateRelease'],
  over: {
    stitchDial: { name: 'Stitch selection dial', text: 'Turn to choose the stitch pattern. The stitch chart on the machine shows what each position sews.' },
    lengthDial: { name: 'Stitch length dial', text: 'Longer stitches for basting and thick fabric, shorter for fine fabric and tight curves (max 4 mm).' },
    widthDial: { name: 'Stitch width dial', text: 'Sets zigzag/decorative stitch width up to 5 mm. Change it with the needle up.' },
    reverseLever: { name: 'Reverse control', text: 'Hold it while sewing to go backwards; release to sew forwards again.' },
    tensionDial: { name: 'Upper thread tension dial', text: 'Raises or lowers upper-thread tension. Start at the middle setting and move by one step.' },
    pressureDial: { name: 'Foot pressure dial', text: 'Adjusts how firmly the presser foot holds fabric – lighter for fine/stretchy, heavier for thick.' }
  },
  t: {
    ready: 'Raise the presser foot lifter and turn the handwheel toward you until the needle is at its highest.',
    spool: 'Place the spool on the spool pin and fit a spool holder that matches its size, so the spool does not wobble.',
    path: 'Take the thread to the thread guide, follow the threading path printed on the machine, and slide it between the tension discs with the foot up.',
    takeup: 'Round the bottom of the path, up through the take-up lever from right to left and down again.',
    threader: 'lever', needleGuide: 'Pass the thread behind the guide above the needle.',
    windPlace: 'Fit the empty bobbin on the bobbin winder spindle on top of the machine.',
    windPath: 'Take the thread round the winder tension guide and through one hole in the bobbin.',
    windStart: 'Push the bobbin winder toward the bobbin; the needle stops moving when you press the foot control.',
    windStop: 'It disengages automatically when full (auto-declutch). Push the winder back, remove the bobbin and cut the thread.',
    bobbinOpen: 'Raise the needle and foot, switch off, then slide the bobbin cover toward you and lift it off.',
    bobbinIn: 'Drop the bobbin in so the thread unwinds the way the arrow on the plate shows, draw the thread into the slot and replace the cover.',
    footHolder: 'janome', foot: 'Snap-on feet: the foot letter is printed on the sole.',
    needleNote: 'Raise the needle before turning the width or stitch dial.',
    startNote: 'There is no Start/Stop button: sewing is with the foot control.',
    stitchPick: 'Turn the stitch selection dial to the stitch you want, then set length and width.', mech: true
  },
  gear: { ids: ['invisiblezip', 'walking', 'quarter', 'freemotion', 'satin', 'straightfoot', 'o-spoolnet', 'o-brush', 'n-universal', 'n-ballpoint', 'n-stretch', 'n-microtex', 'n-topstitch', 'n-denim', 'n-leather', 'n-quilting', 'n-twin'],
    extra: [
      foot(id, 'buttonhole', 'One-step buttonhole foot', 'buttonhole', 'Takes the button in a slide so the buttonhole is sewn to the button size automatically.', ['One-step buttonholes'], 'janome')
    ] }
};
