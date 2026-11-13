import { foot } from './_gear.js';
const id = 'bernette-funlock-b42';
export default {
  id, catalogId: 'bernette-funlock-b42', brand: 'bernette', name: 'bernette Funlock b42', short: 'b42',
  type: 'coverstitch', profile: 'lock', coverOnly: true, emb: false,
  shopUrl: 'https://www.thesewingstudio.co.uk/products/bernette-funlock-b42-coverstitch-machine',
  blurb: 'A coverstitch and chainstitch machine for hemming and topstitching knits: one looper and up to three needles, with colour-coded threading.',
  facts: [
    '4 stitches: 2-thread chainstitch, 3-thread coverstitch (narrow and wide) and 4-thread triple coverstitch',
    '1–3 needles and one looper; needle gauge 2.8 mm (narrow), 5.6 mm (wide) or 5.6 mm with three needles',
    'Colour-coded threading: looper violet, needles right blue, centre green, left yellow – looper first',
    'Differential feed 0.6–2.0, stitch length dial, presser-foot pressure dial; needle system ELx705',
    'Top speed 1300 stitches per minute; weight 6.8 kg. Coverstitch cannot be chained off at the end of a seam'
  ],
  specs: [['Stitches', '4 (chain, 3-thread cover narrow/wide, 4-thread triple)'], ['Needles / loopers', '1–3 needles · 1 looper'], ['Needle gauge', '2.8 mm or 5.6 mm'], ['Needle system', 'ELx705 (70–90)'], ['Differential feed', '0.6 – 2.0'], ['Max speed', '1300 spm'], ['Weight', '6.8 kg'], ['Source', 'user manual 2026-10, Specification p.38']],
  links: [
    { title: 'bernette Funlock b42 – User Manual (PDF, English)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/User-Manual/4-Series/2026/b42/5040003_00C_04_web_manual_b42_2026-10_EN.pdf', kind: 'PDF', doc: 'full', note: 'Official bernette.com, 2026-10 edition (40 pages).' },
    { title: 'bernette Funlock b42 – product page', url: 'https://www.bernette.com/en/models/bernette-42-funlock', kind: 'Web', doc: 'page', note: 'Features and accessories.' }
  ],
  manual: { file: '5040003_00C_04_web_manual_b42_2026-10_EN.pdf', offset: 0, edition: '2026-10 EN', pages: [
    { key: 'looper', topic: 'Opening the looper cover', printed: 9, find: 'HOW TO OPEN LOOPER' },
    { key: 'needleschange', topic: 'Removing and inserting needles', printed: 12, find: 'HOW TO REMOVE AND INSERT NEEDLES' },
    { key: 'stitches', topic: 'Stitch overview', printed: 14, find: 'STITCH OVERVIEW' },
    { key: 'cover_prep', topic: 'Threading diagrams and colour code', printed: 15, find: 'Tension Color Code' },
    { key: 'cover_looper', topic: 'Threading the looper (violet)', printed: 16, find: 'Coverstitch Looper (Violet)' },
    { key: 'cover_needles', topic: 'Threading the right needle (blue)', printed: 18, find: 'Right Coverstitch Needle' },
    { key: 'cover_centre', topic: 'Threading the centre needle (green)', printed: 20, find: 'Threading the Center Coverstitch' },
    { key: 'length', topic: 'Stitch length and foot pressure', printed: 25, find: 'Stitch lenght dial' },
    { key: 'diff', topic: 'Differential feed', printed: 26, find: 'Gathered Coverstitch' },
    { key: 'chain', topic: 'Chainstitch', printed: 27, find: '2–Thread Chainstitch' },
    { key: 'cover_sew', topic: 'Coverstitch set-up', printed: 28, find: 'HOW TO SEW A COVERSTITCH' },
    { key: 'secure', topic: 'Securing the seam end', printed: 32, find: 'SECURING THE SEAM END' },
    { key: 'clean', topic: 'Cleaning and oiling', printed: 33, find: 'Cleaning the Machine' },
    { key: 'trouble', topic: 'Troubleshooting', printed: 36, find: 'TROUBLESHOOTING' },
    { key: 'spec', topic: 'Technical summary', printed: 38, find: 'Technical Summary' }
  ] },
  hide: ['rolledHem'],
  over: {
    tensionDials: { name: 'Tension dials', text: 'One dial per thread – the looper plus each needle you use. Adjust one at a time, half a number at a time.' },
    lowerLooper: { name: 'Chain / coverstitch looper (violet)', text: 'The single looper that forms the loops on the underside. It is threaded first, along the violet path.' },
    threadLower: { name: 'Looper thread (violet)', text: 'The thread for the looper – it shows as a ladder of loops on the underside of a coverstitch hem.' },
    threadNeedle: { name: 'Needle threads (blue, green, yellow)', text: 'Right needle blue, centre needle green, left needle yellow. Use only the needles your chosen stitch needs.' },
    stitchLength: { name: 'Stitch length dial', text: 'Set to the dot for most work; the manual suggests the dot to 4 for heavy fabric and 2–4 for very stretchy fabric.' },
    footLifter: { name: 'Presser-foot lifter and pressure dial', text: 'The lifter raises the foot and opens the tension discs for threading. The pressure dial has a dot for normal, L for lightest and H for heaviest.' }
  },
  t: {
    diff: { min: '0.6', max: '2.0', gather: '1.5–2', stretch: '0.6' },
    cover: {
      spools: 'Pull the retractable thread stand fully up until its joints click and centre it above the spool pins; use spool nets or caps as needed.',
      looper: 'With the foot up, thread the single looper along the violet path: from the back through the first guide, under the pre-tension guide, between the tension discs, then on through the looper area. Leave about 10 cm and lay it under the foot to the back.',
      needles: 'Thread the needles after the looper: right needle blue, centre needle green, left needle yellow – each along its own colour-coded path to the needle clamp, and through the eye from front to back. Only thread the needles your stitch uses.',
      stitches: 'Use the stitch overview in the manual. Chainstitch uses one needle; the 3-thread cover stitch uses two needles (left + right for wide, left + centre for narrow); the 4-thread triple cover uses all three. Remove or leave out the needles the stitch does not use, as the manual shows.',
      length: 'Set the stitch length dial to the dot for most sewing. Choose a longer stitch for heavy fabric and 2–4 for highly stretchy fabric. The manual suggests more than the dot for coverstitch.',
      pressure: 'The pressure is set at the factory for medium fabric. Use L for very light fabric and H for heavy fabric, and always test sew first.',
      diff: 'Below 1 reduces stretching on knits; above 1 gathers. Put it back to 1 afterwards.',
      finish: 'Stop sewing with the fabric clear of the needles, raise the foot, turn the handwheel toward you one turn and back one turn as the manual shows, draw the fabric gently to the back and cut the threads. A coverstitch cannot be chained off, so secure the seam ends as the manual\'s "Securing the seam end" section describes.',
      fix: 'If the hem waves or stretches, try a differential feed above 1; if it puckers, try a value below 1. If the hem tunnels between the needle rows, loosen the needle tensions a little. Change only one setting at a time and re-test.'
    }
  },
  gear: { ids: ['o-brush'], extra: [
    foot(id, 'cover', 'Standard coverstitch foot', 'overlock', 'The foot the machine comes with, used for chain and coverstitch sewing.', ['Hems and topstitching on knits'], 'lock'),
    { id: id + ':needles', cat: 'needle', name: 'ELx705 needles (70–90)', icon: ['needle', 'universal'], m: id, inc: true, what: 'The flat-shank industrial needle system this machine needs; sizes 70/10 to 90/14 are allowed and an 80/12 comes in the box. Do not use ordinary household needles.', when: ['All chain and coverstitch sewing'], fit: ['Switch off and raise the foot.', 'Loosen the needle screw, take the old needle out, push the new one fully up with the flat side to the back, and tighten.', 'Fit the needles for your stitch (left, centre and right positions) as the manual shows.'], tip: 'Change needles after every project; skipped stitches on knits are often a worn or unsuitable needle.' }
  ] }
};
