import { foot, other } from './_gear.js';
const id = 'bernette-b37';
export default {
  id, catalogId: 'bernette-b37', brand: 'bernette', name: 'bernette b37', short: 'b37',
  type: 'sewing', profile: 'panel', layout: 'buttons', emb: false, small: true,
  shopUrl: 'https://www.thesewingstudio.co.uk/products/bernette-b37-sewing-machine',
  blurb: 'An electronic sewing machine with an LCD, 50 stitches including five buttonholes, a start/stop button and a needle stop up/down button.',
  facts: [
    '50 stitches (19 practical) and 5 buttonholes/eyelets; stitch width up to 7 mm',
    'LCD shows pattern number, width, length and the foot to fit; cursor and value buttons set them',
    'Start/stop button (when no foot control is plugged in), reverse button, auto-lock button and needle stop up/down',
    'Drop-in horizontal hook with a release button on the cover; semi-automatic needle threader',
    'Top speed 700 stitches per minute with a slide speed control; about 170 mm of space to the right of the needle'
  ],
  specs: [['Stitches', '50 (19 practical, 5 buttonholes/eyelets)'], ['Max stitch width', '7 mm'], ['Max speed', '700 spm'], ['Display', 'LCD with cursor and value buttons'], ['Bobbin', 'Drop-in (J-class plastic bobbins)'], ['Space right of needle', '170 mm'], ['Source', 'bernette.com product page + user manual 2026-01']],
  links: [
    { title: 'bernette b37 – User Manual (PDF, English)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/User-Manual/3-Series/b37_2026/5060007_00A_04_web_b37_2026-01_EN.pdf', kind: 'PDF', doc: 'full', note: 'Official bernette.com, 2026-01 edition (58 pages).' },
    { title: 'bernette b37 – product page', url: 'https://www.bernette.com/en/models/bernette-37', kind: 'Web', doc: 'page', note: 'Features, accessories and tutorial videos.' }
  ],
  manual: { file: '5060007_00A_04_web_b37_2026-01_EN.pdf', offset: 0, edition: '2026-01 EN', pages: [
    { key: 'overview', topic: 'Machine overview (parts)', printed: 6, find: 'Names of Parts' },
    { key: 'buttons', topic: 'Machine operating buttons', printed: 11, find: 'Machine Operating Buttons' },
    { key: 'foot', topic: 'Changing the presser foot', printed: 13, find: 'Changing the Presser Foot' },
    { key: 'feed', topic: 'Dropping / raising the feed dog', printed: 14, find: 'Dropping or Raising the Feed Dog' },
    { key: 'needle', topic: 'Changing the needle', printed: 14, find: 'Changing the needle' },
    { key: 'winding', topic: 'Winding and inserting the bobbin', printed: 15, find: 'Bobbin Winding and Inserting' },
    { key: 'upper', topic: 'Threading the machine', printed: 18, find: 'Threading the Machine' },
    { key: 'threader', topic: 'Needle threader', printed: 19, find: 'Needle Threader' },
    { key: 'lcd', topic: 'LCD display', printed: 21, find: 'LCD display' },
    { key: 'tension', topic: 'Thread tension', printed: 23, find: 'Adjusting the Thread Tension for a Straight Stitch' },
    { key: 'straight', topic: 'Straight stitch sewing', printed: 25, find: 'Straight Stitch sewing' },
    { key: 'buttonhole', topic: 'Buttonholes', printed: 31, find: 'Various kinds of Buttonholes' },
    { key: 'maint', topic: 'Cleaning the hook race and feed dog', printed: 51, find: 'Cleaning the Hook Race and Feed Dog' },
    { key: 'trouble', topic: 'Troubleshooting', printed: 53, find: 'Troubleshooting' }
  ] },
  hide: ['moduleSocket', 'penHolder', 'felt', 'plateRelease', 'knobUpper', 'knobLower', 'pressureDial', 'buttonholeLever'],
  over: {
    screen: { name: 'LCD display', text: 'Shows the stitch pattern number, stitch width, stitch length and the presser foot to fit. Press the cursor buttons to choose which value to change.' },
    panelButtons: { name: 'Cursor and value-set buttons', text: 'The cursor buttons move the underline to the pattern digits or to width/length; the value-set buttons then raise or lower that value. The tens digit changes by 10.' },
    funcButtons: { name: 'Start/stop and reverse', text: 'Start/stop sews without the foot control (it does not work while the foot control is plugged in; the machine starts slowly). The reverse button sews backwards on the straight stitches, or ties off with locking stitches on others.' },
    sideButtons: { name: 'Auto-lock and needle stop up/down', text: 'Auto-lock sews locking stitches at the end of a pattern and stops. Needle stop up/down raises or lowers the needle, and lets you pick the stopping position.' },
    speedSlider: { name: 'Slide speed control', text: 'Sets the top sewing speed. Set it to the fastest position for bobbin winding.' },
    threader: { name: 'Needle threader', text: 'Pull it down, turn it away from you so the hook goes through the eye, hook the thread, then turn it back – see the threading guide.' }
  },
  t: {
    ready: 'Raise the presser foot and press the needle stop up/down button so the take-up lever is at its highest, then switch off for threading.',
    spool: 'Lift up the spool pin, put the spool on and press a spool disc firmly against it. Use the small disc for narrow spools; the second spool pin lets you wind a bobbin without unthreading the machine.',
    path: 'Draw the thread round the upper thread guide and down around the check-spring holder.',
    takeup: 'Pull it firmly up from right to left over the take-up lever and down into its eye, through the lower thread guide and behind the needle bar thread guide on the left.',
    threader: 'lever', needleGuide: 'Slide the thread behind the needle bar thread guide on the left.',
    tension: 'Tension is set in the settings (see the manual) – adjust one step at a time, separately for straight stitch and zigzag.',
    windPlace: 'Put the spool on the horizontal spool pin (or second pin) and set the slide speed control to its fastest position.',
    windPath: 'Pass the thread round the bobbin-winder tension disc and through the hole in the bobbin from inside to outside.',
    windStart: 'Put the bobbin on the spindle and push it to the right; the bobbin icon appears on the LCD. Hold the tail and start the machine.',
    windStop: 'Stop after a few layers and cut the tail, then restart; the machine stops itself when the bobbin is full (and after 1.5 minutes as a safety stop). Push the spindle back.',
    bobbinOpen: 'Slide the hook-cover release button to the right and lift off the hook cover plate; take out the bobbin.',
    bobbinIn: 'Drop the bobbin in with the thread running off counter-clockwise, guide it into the first notch, draw it left between the tension spring blades into the second notch, then refit the cover plate.',
    footHolder: 'brother', foot: 'The LCD shows the letter of the foot to fit – always use the foot the screen shows for the selected pattern.',
    needleNote: 'Switch the machine off before changing the needle or foot.',
    startNote: 'The start/stop button only works when no foot control is plugged in.',
    stitchPick: 'Use the cursor buttons to select the pattern number on the LCD, then the value-set buttons to choose it.', bobbinSensor: false
  },
  gear: { ids: ['invisiblezip', 'rolled', 'satin', 'o-spoolnet', 'o-brush', 'n-universal', 'n-ballpoint', 'n-stretch', 'n-microtex', 'n-topstitch', 'n-denim', 'n-leather', 'n-quilting', 'n-twin'],
    extra: [
      foot(id, 'zigzag', 'Zigzag foot', 'zigzag', 'The all-round foot already on the machine.', ['Everyday seams, zigzag and most stitches'], 'brother'),
      foot(id, 'satinfoot', 'Satin stitch foot', 'satin', 'Has a groove under the sole so dense satin stitches pass without bunching.', ['Satin and decorative stitches'], 'brother'),
      foot(id, 'buttonhole', 'Buttonhole foot with slide', 'buttonhole', 'The button sits in the slide so the machine sews the buttonhole to size.', ['Buttonholes'], 'brother'),
      foot(id, 'zipper', 'Zipper foot', 'zipper', 'Narrow foot that lets the needle run close to the zipper teeth.', ['Zips, piping'], 'brother'),
      foot(id, 'button', 'Button sew-on foot', 'button', 'Holds a button so the machine can sew it on; lower the feed dog first.', ['Sewing on buttons'], 'brother'),
      other(id, 'table', 'Extension table with accessory box', 'table', 'A wider work surface that slides on over the free arm; the box inside holds the accessories.', ['Bulky projects'], ['Slide it on along the free arm until it seats.', 'Remove it for free-arm sewing.'])
    ] }
};
