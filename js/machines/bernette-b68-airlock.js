import { foot } from './_gear.js';
const id = 'bernette-b68-airlock';
export default {
  id, catalogId: 'bernette-b68-airlock', brand: 'bernette', name: 'bernette b68 AIRLOCK', short: 'b68 AIRLOCK',
  type: 'overlocker+coverstitch', profile: 'lock', cover: true, emb: false,
  shopUrl: 'https://www.thesewingstudio.co.uk/products/bernette-b68-airlock-overlocker-coverstitch-machine',
  blurb: 'A top-of-the-range combination machine: air-threaded overlock, chainstitch and coverstitch with up to five needles and three loopers.',
  facts: [
    'Air threading for the lower looper and the chain/cover looper; needles are threaded by hand along colour-coded paths',
    '31 stitches – overlock, flatlock, rolled hem, chainstitch, coverstitch and overlock/chain combinations – with 1–5 needles and 3 loopers',
    'Switch between overlock and cover/chain mode with the Upper Looper On/Off lever and the knife cover or coverstitch insert',
    'mtc micro thread control, knife on/off, cutting width dial, N/R rolled-hem lever, presser-foot pressure, knee lifter',
    'Differential feed 0.6–2.0; stitch length 1.0–5.0 mm; top speed 1300 stitches per minute; needle system ELx705; weight 8.9 kg'
  ],
  specs: [['Loopers/needles', '3 loopers · 1–5 needles (ELx705, size 80–100)'], ['Stitches', '31'], ['Differential feed', '0.6 – 2.0'], ['Stitch length', '1.0 – 5.0 mm'], ['Cutting width', 'Left needle 5–7 mm · right needle 3–5 mm'], ['Cover stitch width', '2.8–5.6 mm (combo stitches 7.8–12.6 mm)'], ['Max speed', '1300 spm'], ['Weight', '8.9 kg'], ['Source', 'user manual 2026-03, Technical Specifications p.95']],
  links: [
    { title: 'bernette b68 AIRLOCK – User Manual (PDF, English)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/User-Manual/b68-AIRLOCK/2026/5040068_10A_04_web_manual_b68_2026-03_EN.pdf', kind: 'PDF', doc: 'full', note: 'Official bernette.com, 2026-03 edition (96 pages).' },
    { title: 'bernette b68 AIRLOCK – product page', url: 'https://www.bernette.com/en/models/bernette-68-airlock', kind: 'Web', doc: 'page', note: 'Features and accessories.' }
  ],
  manual: { file: '5040068_10A_04_web_manual_b68_2026-03_EN.pdf', offset: 0, edition: '2026-03 EN', pages: [
    { key: 'overview', topic: 'Overview – front', printed: 10, find: 'Overview - Front' },
    { key: 'looperarea', topic: 'Overview – looper area', printed: 12, find: 'Overview - Looper Area' },
    { key: 'threadarea', topic: 'Overview – threading area', printed: 13, find: 'Overview - Threading Area' },
    { key: 'acc', topic: 'Included accessories', printed: 17, find: 'Included Accessories' },
    { key: 'insert', topic: 'Knife cover and coverstitch inserts', printed: 23, find: 'Removing/Attaching the Knife Cover Insert' },
    { key: 'needle', topic: 'Changing the needle', printed: 29, find: 'Changing the Needle' },
    { key: 'cover_convert', topic: 'Preparing for overlock or cover/chainstitch', printed: 42, find: 'Preparing the Machine for Cover' },
    { key: 'knife', topic: 'Knife on/off', printed: 43, find: 'Setting the Cutting Width' },
    { key: 'mtc', topic: 'mtc micro thread control', printed: 47, find: 'Setting the mtc' },
    { key: 'pressure', topic: 'Presser-foot pressure', printed: 47, find: 'Presser Foot Pressure' },
    { key: 'diff', topic: 'Differential feed', printed: 49, find: 'Adjusting the Differential Feed' },
    { key: 'prep', topic: 'Preparing for threading', printed: 53, find: 'Preparing for Threading' },
    { key: 'needles', topic: 'Threading the needles', printed: 54, find: 'Needle Threads' },
    { key: 'loopers', topic: 'Threading the loopers (air)', printed: 59, find: 'Threading the Looper Thread' },
    { key: 'change', topic: 'Changing thread', printed: 62, find: 'Changing the Thread' },
    { key: 'test', topic: 'Sewing tests and stitch optimisation', printed: 64, find: 'Stitch Optimization' },
    { key: 'clean', topic: 'Cleaning the looper area', printed: 89, find: 'Cleaning the Looper Area' },
    { key: 'trouble', topic: 'Troubleshooting', printed: 92, find: 'Troubleshooting' },
    { key: 'spec', topic: 'Technical specifications', printed: 95, find: 'Technical Specifications' }
  ] },
  over: {
    lowerLooper: { name: 'Lower looper', text: 'Swings under the fabric for overlock stitches. The chain looper beside it takes over for chain and coverstitch; both are air-threaded.' }
  },
  t: {
    air: true, needlesFirst: true, spools: 'Pull the retractable thread guide fully up and put the cones on the spool pins; thread the needles first, then use the air threader for the loopers.',
    needleThreads: [['Right needle – green path', 'Pull the thread under the thread guide plate to the left and up behind the green marking, over the take-up lever cover, down the guides to the needle holder, thread the eye and lay the tail under the foot to the back left.'], ['Left needle – yellow path', 'The same route behind the yellow marking. Thread the right needle first. For coverstitch, further needles follow the colour marks on the machine.']],
    looperWay: 'Open the threader cover, set the air threader connector to the left and turn the handwheel slowly counter-clockwise until the air pipes couple. Guide each thread through its thread guide, leaving a reserve of about 56 cm so it can be drawn right through, feed it into its air nozzle and hold the air button until it exits the looper eye. Set the connector back and close the cover.',
    diff: { min: '0.6', max: '2.0', gather: '1.5–2', stretch: '0.6' },
    knife: 'Open the threader cover. To switch the knife off, pull it away from the stitch plate and lower it forward to the lock-in position; to switch it on, lift it backwards to the lock-in position. Close the cover.',
    width: 'The cutting width dial sets 5–7 mm from the left needle; towards the right needle it is 2 mm less. Cutting width directly affects stitch width, and the knife, stitch finger and looper cover move together.',
    mtc: 'The mtc micro thread control dial adjusts the loop size of the looper threads at the edge while you sew. Change it a little at a time and test.',
    pressure: 'The presser-foot pressure setting: lighter for fine fabric, heavier for thick layers. Test first.',
    rolledLever: 'N/R rolled-hem lever – N for overlocking, R for rolled hem (retracts the stitch finger).',
    cutting: 'Fit the knife cover insert (overlock) or the coverstitch insert (cover/chain) before sewing.',
    cover: {
      spools: 'Pull the retractable thread guide fully up and place the cones on the spool pins.',
      looper: 'Use the air threader for the chain/cover looper: connector to the left, turn the handwheel slowly counter-clockwise until the pipes couple, thread through the guide with a long reserve, feed into the nozzle and hold the air button.',
      needles: 'Thread the needles by hand along their colour-coded paths (the left needle is yellow); lay the tails under the foot to the back left, then lower the foot once everything is threaded.',
      stitches: 'The stitch chart in the manual lists the needle positions, loopers and settings for each cover and chain stitch, with widths from 2.8 to 5.6 mm and up to 12.6 mm for the overlock/chain combinations.',
      length: 'Check the stitch chart for a suggested length and fine-tune on a test piece.',
      pressure: 'Lighter for fine knits and heavier for thick layers. Test first.',
      diff: 'Below 1 stretches, above 1 gathers. Put it back to 1 afterwards.',
      finish: 'Sew a sewing-start and a seam end as the manual describes; perform a sewing test (manual section 8.2) before starting your project.',
      fix: 'Check the manual\'s stitch-optimisation section: sew a test piece and adjust one tension or setting at a time.',
      convert: 'For cover and chainstitch set the Upper Looper On/Off lever to the left, adjust the knife for the stitch, and attach the coverstitch insert. For overlock set it back to the right and attach the knife cover insert. Switch off and open the bobbin door cover first, and perform the sewing start as the manual shows.',
      thread: 'Thread the needles needed for the stitch, then the chain/cover looper with the air threader.',
      set: 'Set the stitch length and tensions from the stitch chart and sew a test hem on scrap.'
    }
  },
  gear: { ids: ['o-brush'], extra: [
    foot(id, 'overlock', 'Standard overlock / coverstitch foot', 'overlock', 'The foot the machine comes with.', ['Finishing edges, hems on knits'], 'lock'),
    { id: id + ':needles', cat: 'needle', name: 'ELx705 needles (80–100)', icon: ['needle', 'universal'], m: id, inc: true, what: 'The needle system this machine uses; sizes 80–100 (12–16) are approved.', when: ['Overlock, chain and coverstitch'], fit: ['Switch off and raise the foot.', 'Loosen the needle screw, remove the old needle, insert the new one fully up with the flat side to the back, tighten.', 'Check that each needle position matches the stitch chart.'], tip: 'Change needles after every project or if you hear popping or see skipped stitches.' }
  ] }
};
