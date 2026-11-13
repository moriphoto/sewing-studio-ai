import { foot } from './_gear.js';
const id = 'bernette-funlock-b44';
export default {
  id, catalogId: 'bernette-funlock-b44', brand: 'bernette', name: 'bernette Funlock b44', short: 'b44',
  type: 'overlocker', profile: 'lock', emb: false,
  shopUrl: 'https://www.thesewingstudio.co.uk/products/bernette-funlock-b44-overlocker-machine',
  blurb: 'A 2-needle, 2-looper overlocker for 2-, 3- and 4-thread stitches with colour-coded threading and an upper looper converter for the two-thread stitches.',
  facts: [
    '15 stitches: 2-, 3- and 4-thread overlock, flatlock, wrapped overlock, super stretch, narrow seam and rolled hem, using one or two needles',
    'Colour-coded threading by hand: upper looper blue, lower looper red, right needle green, left needle yellow',
    'Upper looper converter (ULC) turns it into a 2-thread overlocker; the upper knife can be put out of use',
    'Cutting width 5–7 mm from the left needle, stitch length 1–4 mm, differential feed 0.6–2.0, presser-foot pressure dial',
    'Top speed 1300 stitches per minute; needle system ELx705; weight 7.2 kg'
  ],
  specs: [['Stitches', '15 (1–2 needles, 2 loopers)'], ['Needle system', 'ELx705 (70–90)'], ['Cutting width', 'Left needle 5–7 mm · right needle 3–5 mm'], ['Stitch length', '1–4 mm'], ['Differential feed', '0.6 – 2.0'], ['Max speed', '1300 spm'], ['Weight', '7.2 kg'], ['Source', 'user manual 2026-10, Specification p.54']],
  links: [
    { title: 'bernette Funlock b44 – User Manual (PDF, English)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/User-Manual/4-Series/2026/b44/5040005_00C_04_web_manual_b44_2026-10_EN.pdf', kind: 'PDF', doc: 'full', note: 'Official bernette.com, 2026-10 edition (56 pages).' },
    { title: 'bernette Funlock b44 – product page', url: 'https://www.bernette.com/en/models/bernette-44-funlock', kind: 'Web', doc: 'page', note: 'Features and accessories.' }
  ],
  manual: { file: '5040005_00C_04_web_manual_b44_2026-10_EN.pdf', offset: 0, edition: '2026-10 EN', pages: [
    { key: 'overview', topic: 'Names of parts', printed: 7, find: 'NAME OF PARTS' },
    { key: 'looper', topic: 'Opening the looper cover', printed: 10, find: 'HOW TO OPEN LOOPER' },
    { key: 'knife', topic: 'Disengaging the upper knife', printed: 13, find: 'HOW TO DISENGAGE UPPER KNIFE' },
    { key: 'ulc', topic: 'Upper looper converter (ULC)', printed: 14, find: 'UPPER LOOPER CONVERTER' },
    { key: 'needleschange', topic: 'Removing and inserting needles', printed: 15, find: 'HOW TO REMOVE AND INSERT' },
    { key: 'stitches', topic: 'Stitch overview', printed: 17, find: 'STITCH OVERVIEW' },
    { key: 'prep', topic: 'Threading diagram and colour code', printed: 19, find: 'Tension Color Code' },
    { key: 'upperlooper', topic: 'Threading the upper looper', printed: 20, find: 'Threading the Upper Looper (Blue)' },
    { key: 'lowerlooper', topic: 'Threading the lower looper', printed: 21, find: 'Threading the Lower Looper (Red)' },
    { key: 'needles', topic: 'Threading the needles', printed: 23, find: 'Threading the Overlock Right Needle' },
    { key: 'length', topic: 'Stitch length and seam width', printed: 27, find: 'Stitch lenght dial' },
    { key: 'pressure', topic: 'Presser-foot pressure', printed: 28, find: 'The presser foot pressure' },
    { key: 'diff', topic: 'Differential feed', printed: 29, find: 'DIFFERENTIAL FEED' },
    { key: 'test', topic: 'Chaining off and test sewing', printed: 31, find: 'CHAINING OFF' },
    { key: 'rolled', topic: 'Rolled hem', printed: 39, find: 'HOW TO SEW A ROLLED HEM' },
    { key: 'clean', topic: 'Cleaning and oiling', printed: 48, find: 'MACHINE MAINTENANCE' },
    { key: 'trouble', topic: 'Troubleshooting', printed: 52, find: 'TROUBLESHOOTING' }
  ] },
  over: {
    rolledHem: { name: 'Seam-width finger knob (N / R)', text: 'Push it to N for standard overlocking and fully to R to retract the stitch finger for a rolled hem.' },
    stitchLength: { name: 'Stitch length dial', text: 'Set to the dot for most work; 2.5–4 for heavy fabric, and 1–2 for rolled hems and narrow seams.' },
    footLifter: { name: 'Presser-foot lifter and pressure dial', text: 'The lifter raises the foot and opens the tension discs for threading. The pressure dial has a dot for normal, L for lightest and H for heaviest.' }
  },
  t: {
    air: false, spools: 'Pull the retractable thread stand fully up until its joints click and centre it over the spool pins; use the spool net on slippery thread and a spool cap on ordinary spools.',
    needleThreads: [['Right needle (green)', 'Follow the green path numbered on the chart: thread guide, pre-tension, between the tension discs, then the guides and the take-up lever cover down to the needle clamp. Slip the thread behind the guide at the bottom of the clamp, then thread the eye (tweezers help). Leave about 10 cm and lay it under the foot to the back.'], ['Left needle (yellow)', 'The same method along the yellow path. Thread the right needle first, then the left.']],
    looperWay: 'First unhook the upper looper converter (it must stay hooked in for 2-thread stitches only). With the foot up, thread the upper looper along the blue path (the thread must pass behind the lower looper; use the tweezers and thread the eye from front to back), then the lower looper along the red path. Leave about 10 cm tails and lay them under the foot to the back.',
    diff: { min: '0.6', max: '2.0', gather: '1.5–2', stretch: '0.6' },
    knife: 'Switch off and open the looper cover. Pull the upper knife holder to the right as far as it goes, then turn it counter-clockwise until the knife clicks into its non-working position; turn it clockwise to bring it back.',
    width: 'Overlock width changes with the needle you use (about 6 mm with the left needle, 4 mm with only the right) and the cutting-width dial adjusts it further. Cutting width is 5–7 mm from the left needle or 3–5 mm from the right.',
    mtc: null, pressure: 'The pressure dial on the machine: the dot for normal, L for the lightest, H for the heaviest – only change it for very light or very heavy fabric.',
    rolledLever: 'Seam-width finger knob: N for standard overlocking, R (pushed fully in) for rolled hem.',
    cutting: 'Close the looper cover before sewing.'
  },
  gear: { ids: ['o-brush'], extra: [
    foot(id, 'overlock', 'Standard overlock foot', 'overlock', 'The foot the machine comes with, used for normal overlocking.', ['Finishing edges, seaming knits'], 'lock'),
    { id: id + ':needles', cat: 'needle', name: 'ELx705 needles (70–90)', icon: ['needle', 'universal'], m: id, inc: true, what: 'The flat-shank industrial needle system this overlocker needs; the manual allows sizes 70/10 to 90/14 and an 80/12 is supplied. Do not use ordinary household needles.', when: ['All overlocking'], fit: ['Switch off and raise the foot.', 'Loosen the needle screw, take the old needle out, push the new one fully up with the flat side to the back, and tighten.', 'Check which needle position (left, right or both) your stitch needs.'], tip: 'Change needles after every project or when you hear popping or see skipped stitches.' }
  ] }
};
