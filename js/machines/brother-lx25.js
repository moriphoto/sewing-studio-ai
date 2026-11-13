import { foot, other } from './_gear.js';
const id = 'brother-lx25';
export default {
  id, catalogId: 'brother-lx25', brand: 'Brother', name: 'Brother LX25', short: 'LX25',
  type: 'sewing', profile: 'mech', emb: false,
  shopUrl: 'https://www.thesewingstudio.co.uk/products/brother-lx25-sewing-machine',
  blurb: 'Light, compact mechanical machine with a dial for 25 stitches, a 4-step buttonhole and a top-loading drop-in bobbin.',
  facts: [
    '25 built-in stitches chosen with the front dial; length and width set with their own dials',
    '4-step automatic buttonhole (you set up each side, then the machine repeats it)',
    'Top-loading drop-in bobbin, free-arm conversion, extra-bright LED light',
    'Slide-off accessory compartment, soft cover and foot controller in the box',
    'Brother does not list a needle threader for this model – thread the needle by hand'
  ],
  specs: [['Stitches', '25 (1 four-step buttonhole)'], ['Type', 'Mechanical, dial stitch selection'], ['Bobbin', 'Top-load drop-in'], ['Light', 'Extra-bright LED'], ['Size', 'Small'], ['Warranty', '3 years (1 year commercial use)'], ['Source', 'Brother product page + operation manual']],
  links: [
    { title: 'Brother LX25 – Operation Manual (PDF, English)', url: 'https://download.brother.com/welcome/doch000850/lx25ug01en.pdf', kind: 'PDF', doc: 'full', note: 'Official brother.com. One manual covers several product codes.' },
    { title: 'Brother LX25 – manuals and downloads', url: 'https://support.brother.com/g/b/manuallist.aspx?c=gb&flang=English&lang=en&prod=hf_lx25euk&type2=69&type3=626', kind: 'Web', doc: 'page', note: 'Brother UK support page.' },
    { title: 'Brother LX25 – product page', url: 'https://sewingcraft.brother.eu/en/products/machines/sewing-machines/beginner-sewing-machines/lx25', kind: 'Web', doc: 'page', note: 'Features and what is in the box.', blocked: true }
  ],
  manual: { file: 'lx25ug01en.pdf', offset: 1, edition: 'Operation Manual (multi-model)', pages: [
    { key: 'needle', topic: 'Replacing the needle', printed: 7, find: 'Replacing the needle' },
    { key: 'foot', topic: 'Changing the presser foot', printed: 8, find: 'Changing the presser foot' },
    { key: 'winding', topic: 'Winding the bobbin', printed: 12, find: 'Winding the bobbin' },
    { key: 'bobbin', topic: 'Lower threading (bobbin)', printed: 14, find: 'Lower threading' },
    { key: 'upper', topic: 'Upper threading', printed: 16, find: 'Upper threading' },
    { key: 'tension', topic: 'Thread tension', printed: 26, find: 'tension' },
    { key: 'maint', topic: 'Cleaning / maintenance', printed: 40, find: 'Cleaning' }
  ] },
  hide: ['pressureDial', 'threader', 'startStop', 'felt', 'buttonholeLever', 'plateRelease'],
  over: {
    stitchDial: { name: 'Stitch selection dial', text: 'Turn to choose the stitch. The chart on the machine shows each number.' },
    lengthDial: { name: 'Stitch length dial', text: 'Sets how long each stitch is (up to 4 mm). Short stitches for fine fabric and buttonhole satin areas.' },
    widthDial: { name: 'Stitch width dial', text: 'Sets how wide the zigzag swings (up to 5 mm); it also sets the needle position for straight stitch.' },
    reverseLever: { name: 'Reverse lever', text: 'Hold it to sew backwards; release to go forward.' },
    tensionDial: { name: 'Upper thread tension dial', text: 'Raises or lowers upper-thread tension. Start at the middle setting and move by one step.' }
  },
  t: {
    ready: 'Raise the presser foot lever and turn the handwheel toward you until the take-up lever is at the top.',
    spool: 'Place the spool on the spool pin and fit the spool cap that matches the spool size, flat side to the spool.',
    path: 'Pull the thread to the thread guide, then follow the numbered path printed on the machine down between the tension discs with the foot up.',
    takeup: 'Round the bottom of the path, up through the take-up lever from right to left and down again.',
    threader: 'none', needleGuide: 'Pass the thread behind the needle bar thread guide just above the needle.',
    windPlace: 'Put the spool on the spool pin and the empty bobbin on the bobbin winder shaft.',
    windPath: 'Take the thread round the winding guide and pre-tension, and wind it a few turns round the bobbin by hand.',
    windStart: 'Push the bobbin winder shaft to the right and press the foot controller.',
    windStop: 'Stop when the bobbin is full, push the shaft back to the left, take off the bobbin and cut the thread.',
    bobbinOpen: 'Raise the needle and the foot, switch off, then slide the bobbin cover toward you and lift it off.',
    bobbinIn: 'Drop the bobbin in with the thread unwinding the way the diagram on the plate shows and draw it into the slot.',
    footHolder: 'brother', needleNote: 'The machine has no screen or lock key, so switch it off before changing the needle.',
    startNote: 'There is no Start/Stop button: sewing is with the foot controller.',
    stitchPick: 'Turn the stitch selection dial to the stitch you want, then set length and width.', mech: true, noThreader: true, fourStep: true, darningPlate: true
  },
  gear: { ids: ['invisiblezip', 'walking', 'quarter', 'freemotion', 'rolled', 'satin', 'straightfoot', 'o-spoolnet', 'o-brush', 'n-universal', 'n-ballpoint', 'n-stretch', 'n-microtex', 'n-topstitch', 'n-denim', 'n-leather', 'n-quilting', 'n-twin'],
    extra: [
      foot(id, 'zigzagJ', 'Zigzag foot "J"', 'zigzag', 'The all-round foot already on the machine.', ['Everyday seams, zigzag, most stitches'], 'brother'),
      foot(id, 'buttonholeA', 'Buttonhole foot "A"', 'buttonhole', 'Used with the 4-step buttonhole; the lever on the machine sets the stitch.', ['4-step buttonholes'], 'brother'),
      foot(id, 'zipperI', 'Zipper foot "I"', 'zipper', 'Narrow foot with the needle close to the zip teeth.', ['Zips, piping'], 'brother'),
      foot(id, 'buttonM', 'Button sewing foot "M"', 'button', 'Holds the button while the machine sews it on, with the feed dogs lowered.', ['Sewing on buttons'], 'brother'),
      other(id, 'darning', 'Darning plate', 'plate', 'Covers the feed dogs for free-motion darning.', ['Darning, free-motion'], ['Switch off, remove the foot and needle plate cover as your manual shows.', 'Fix the darning plate over the feed dogs.'])
    ] }
};
