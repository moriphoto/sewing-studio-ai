import { foot } from './_gear.js';
const id = 'bernette-funlock-b48';
export default {
  id, catalogId: 'bernette-funlock-b48', brand: 'bernette', name: 'bernette Funlock b48', short: 'b48',
  type: 'overlocker+coverstitch', profile: 'lock', cover: true, emb: false,
  shopUrl: 'https://www.thesewingstudio.co.uk/products/bernette-funlock-b48-coverstitch-overlocker-machine',
  blurb: 'A combination machine: a 2/3/4-thread overlocker that also converts to chainstitch and coverstitch, with colour-coded threading.',
  facts: [
    '23 stitches: 2-, 3- and 4-thread overlock, flatlock, rolled hem, chainstitch and coverstitch, using one to three needles',
    'Three loopers: upper looper, lower looper and a chain/cover looper; needle colours left yellow, right green',
    'Switching to cover or chainstitch: disengage the upper looper, put the upper knife out of use, set the seam-width finger knob to R and set the chain/cover clutch',
    'Cutting width 5–7 mm from the left needle, stitch length 1–4 mm, differential feed 0.6–2.0; needle system ELx705',
    'Top speed 1300 stitches per minute; weight 7.8 kg'
  ],
  specs: [['Stitches', '23 (1–3 needles, 2 overlock loopers + cover looper)'], ['Needle system', 'ELx705 (70–90)'], ['Cutting width', 'Left needle 5–7 mm · right needle 3–5 mm'], ['Stitch length', '1–4 mm'], ['Differential feed', '0.6 – 2.0'], ['Max speed', '1300 spm'], ['Weight', '7.8 kg'], ['Source', 'user manual 2026-10, Specification p.74']],
  links: [
    { title: 'bernette Funlock b48 – User Manual (PDF, English)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/User-Manual/4-Series/2026/b48/5040007_00C_04_web_manual_b48_2026-10_EN.pdf', kind: 'PDF', doc: 'full', note: 'Official bernette.com, 2026-10 edition (76 pages).' },
    { title: 'bernette Funlock b48 – product page', url: 'https://www.bernette.com/en/models/bernette-48-funlock', kind: 'Web', doc: 'page', note: 'Features and accessories.' }
  ],
  manual: { file: '5040007_00C_04_web_manual_b48_2026-10_EN.pdf', offset: 0, edition: '2026-10 EN', pages: [
    { key: 'looper', topic: 'Opening the looper cover', printed: 10, find: 'HOW TO OPEN LOOPER' },
    { key: 'knife', topic: 'Disengaging the upper knife', printed: 13, find: 'HOW TO DISENGAGE UPPER KNIFE' },
    { key: 'chart', topic: 'Threading chart summary', printed: 20, find: 'Threading Chart Summary' },
    { key: 'upperlooper', topic: 'Threading the upper looper', printed: 22, find: 'Threading the Upper Looper (Blue)' },
    { key: 'lowerlooper', topic: 'Threading the lower looper', printed: 23, find: 'Threading the Lower Looper (Red)' },
    { key: 'cover_looper', topic: 'Threading the chain / cover looper', printed: 25, find: 'Coverstitch Looper (Violet)' },
    { key: 'needles', topic: 'Threading the right needle', printed: 27, find: 'Threading the Overlock Right Needle' },
    { key: 'cover_needles', topic: 'Threading the coverstitch needles', printed: 30, find: 'Threading the Coverstitch Needles' },
    { key: 'length', topic: 'Stitch length', printed: 36, find: 'Stitch lenght dial' },
    { key: 'pressure', topic: 'Presser-foot pressure', printed: 37, find: 'Presser foot pressure wheel' },
    { key: 'diff', topic: 'Differential feed', printed: 38, find: 'Gathered Overlock' },
    { key: 'cover_convert', topic: 'Coverstitch machine set-up', printed: 52, find: 'HOW TO SEW A Coverstitch' },
    { key: 'cover_sew', topic: 'Coverstitch start and end of seam', printed: 53, find: 'chaining-off at the end of sewing' },
    { key: 'secure', topic: 'Securing the seam end', printed: 56, find: 'Securing the seam end' },
    { key: 'rolled', topic: 'Rolled hem', printed: 58, find: 'Additional information about rolled hemming' },
    { key: 'clean', topic: 'Cleaning and oiling', printed: 67, find: 'Cleaning The Machine' },
    { key: 'trouble', topic: 'Troubleshooting', printed: 72, find: 'TROUBLESHOOTING' },
    { key: 'spec', topic: 'Technical summary', printed: 74, find: 'Technical Summary' }
  ] },
  over: {
    rolledHem: { name: 'Seam-width finger knob (N / R)', text: 'N for standard overlocking; R retracts the stitch finger for rolled hem – and for chain/coverstitch.' },
    stitchLength: { name: 'Stitch length dial', text: 'The manual suggests more than 2 mm for chainstitch and more than the dot (2.5 mm) for coverstitch.' },
    lowerLooper: { name: 'Lower looper', text: 'Swings under the fabric for overlock stitches. The separate chain/cover looper (violet) sits beside it and is used for chain and coverstitch.' }
  },
  t: {
    air: false, spools: 'Pull the retractable thread stand fully up until its joints click and centre it over the spool pins.',
    needleThreads: [['Right needle (green)', 'Follow the green path on the chart through the guides and tension discs down to the needle clamp, behind the guide at the bottom of the clamp and through the eye. Leave about 10 cm of tail under the foot.'], ['Left needle (yellow)', 'The same method on the yellow path. Thread the right needle first, then the left.']],
    looperWay: 'With the foot up, thread the upper looper along the blue path (the thread passes behind the lower looper), then the lower looper along the red path. Use tweezers and leave about 10 cm tails under the foot. For 2-thread stitches follow the manual\'s upper-looper-clutch instructions.',
    diff: { min: '0.6', max: '2.0', gather: '1.5–2', stretch: '0.6' },
    knife: 'Switch off and open the looper cover (push it right, pull it down). Move the upper knife to its non-working position as shown on page 13 of the manual, and back again when you want to trim.',
    width: 'Overlock width depends on the needle: about 4 mm with the right needle and about 6 mm with the left; the cutting-width dial widens it for heavy fabric. Cutting width is 5–7 mm from the left needle.',
    mtc: null, pressure: 'The pressure wheel is set for medium fabric; lighten it for very fine fabric and increase it for heavy layers. Test first.',
    rolledLever: 'Seam-width finger knob: N for normal overlocking; R for rolled hem (and for chain/coverstitch).',
    cutting: 'Close the looper cover before sewing.',
    cover: {
      spools: 'Pull the retractable thread stand fully up and centre it over the spool pins.',
      looper: 'Thread the chain/cover looper along the violet path shown on the machine; lay a 10 cm tail under the foot to the back. Open the looper cover first (push it right, pull it down).',
      needles: 'Thread the coverstitch needles on their colour-coded paths (left yellow, right green – check the stitch chart for which needles your stitch uses). Use only the needles your stitch needs and fit the overlock needles back when you return to overlocking.',
      stitches: 'The coverstitch is a 3-thread stitch about 5.6 mm wide, good for hems and topstitching knits; the chainstitch uses one needle. Check the stitch chart for needle positions and tension values.',
      length: 'The manual suggests more than 2 mm for chainstitch and more than the dot (2.5 mm) for coverstitch.',
      pressure: 'Use the pressure wheel as for overlocking: lighter for fine knits, heavier for thick layers. Test first.',
      diff: 'Below 1 stretches, above 1 gathers. Put it back to 1 afterwards.',
      finish: 'Stop with the fabric clear of the needles, raise the foot, turn the handwheel toward you one turn and back one turn, draw the fabric gently to the back and cut the threads. A coverstitch cannot be chained off – secure the seam ends as the manual describes.',
      fix: 'If the hem waves, try a differential feed above 1; if it puckers or tunnels, loosen the needle tensions a little. If you sew denim and the stitch skips or the thread breaks, change the needle first, then adjust tensions by a quarter number at a time.',
      convert: 'Switch the machine off and open the looper cover. Disengage the upper looper (the upper looper clutch, manual p.42), put the movable upper knife in its non-working position (p.13), set the seam-width finger knob to R and set the chain/cover clutch (p.42). Then swap the overlock needles for the coverstitch needles as shown on the machine.',
      thread: 'Thread the chain/cover looper (violet) first, then the coverstitch needles, following the colour-coded paths on the machine.',
      set: 'Set the stitch length above the dot for coverstitch, take the tensions from the stitch chart, then sew a test hem on scrap.'
    }
  },
  gear: { ids: ['o-brush'], extra: [
    foot(id, 'overlock', 'Standard overlock / coverstitch foot', 'overlock', 'The foot the machine comes with; it serves both overlock and chain/coverstitch sewing.', ['Finishing edges, hems on knits'], 'lock'),
    { id: id + ':needles', cat: 'needle', name: 'ELx705 needles (70–90)', icon: ['needle', 'universal'], m: id, inc: true, what: 'The flat-shank industrial needle system for this machine; sizes 70/10 to 90/14 are allowed and an 80/12 is supplied. Do not use ordinary household needles.', when: ['Overlock, chain and coverstitch'], fit: ['Switch off and raise the foot.', 'Loosen the needle screw, take out the old needle, insert the new one fully up with the flat side to the back, tighten.', 'Fit the needles your stitch needs (overlock left/right, or the coverstitch set).'], tip: 'Change needles after every project; skipped stitches on knits are often a worn needle.' }
  ] }
};
