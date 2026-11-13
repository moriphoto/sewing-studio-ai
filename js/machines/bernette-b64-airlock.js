import { foot } from './_gear.js';
const id = 'bernette-b64-airlock';
export default {
  id, catalogId: 'bernette-b64-airlock', brand: 'bernette', name: 'bernette b64 AIRLOCK', short: 'b64 AIRLOCK',
  type: 'overlocker', profile: 'lock', emb: false,
  shopUrl: 'https://www.thesewingstudio.co.uk/products/bernette-b64-airlock-overlocker-machine',
  blurb: 'Two-needle, two-looper overlocker (2/3/4-thread) with air threading for the loopers and colour-coded paths for the needles.',
  facts: [
    'Air threading for both loopers (button + air pipes), colour-coded needle paths (right needle green, left needle yellow)',
    '16 stitches: 2-, 3- and 4-thread overlock, flatlock, rolled hem and more; uses one or two needles',
    'mtc micro thread control: tune looper-thread amount at the edge while sewing',
    'Knife on/off, cutting width dial, N/R rolled-hem lever, adjustable presser-foot pressure',
    'Differential feed 0.6–2.0; stitch length 1–5 mm; top speed 1300 stitches per minute; needle system ELx705'
  ],
  specs: [['Loopers/needles', '2 loopers · 1–2 needles (ELx705, size 80–100)'], ['Stitches', '16'], ['Differential feed', '0.6 – 2.0'], ['Stitch length', '1.0 – 5.0 mm'], ['Cutting width', 'Left needle 5–7 mm · right needle 3–5 mm'], ['Max speed', '1300 spm'], ['Weight', '9.3 kg'], ['Source', 'user manual 2026-03, Specifications p.82']],
  links: [
    { title: 'bernette b64 AIRLOCK – User Manual (PDF, English)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/User-Manual/b64-AIRLOCK/2026/5040064_20A_04_web_manual_b64_2026-03_EN.pdf', kind: 'PDF', doc: 'full', note: 'Official bernette.com, 2026-03 edition.' },
    { title: 'bernette b64 AIRLOCK – Quick Start Guide (PDF)', url: 'https://www.bernette.com/assets/uploads/general/Downloads/Quick-Start-Guide/b64-AIRLOCK/2026/5400064_20A_04_web_qsg_b64_2026-10_EN.pdf', kind: 'PDF', doc: 'qsg', note: 'Short getting-started leaflet.' }
  ],
  manual: { file: '5040064_20A_04_web_manual_b64_2026-03_EN.pdf', offset: 0, edition: '2026-03 EN', pages: [
    { key: 'overview', topic: 'Front view and parts', printed: 10, find: 'Front view' },
    { key: 'looperarea', topic: 'Looper area overview', printed: 12, find: 'Overview - Looper area' },
    { key: 'threadingarea', topic: 'Threading area overview', printed: 13, find: 'Overview Threading area' },
    { key: 'needle', topic: 'Changing the needle', printed: 27, find: 'Changing the Needle' },
    { key: 'knife', topic: 'Knife on/off', printed: 40, find: 'Knife «On/Off»' },
    { key: 'width', topic: 'Cutting width / stitch width', printed: 41, find: 'Setting the Cutting Width' },
    { key: 'length', topic: 'Stitch length', printed: 42, find: 'Setting the Stitch Length' },
    { key: 'rolled', topic: 'Rolled hem lever N/R', printed: 43, find: 'Rolled Hem Selection Lever' },
    { key: 'pressure', topic: 'Presser-foot pressure', printed: 44, find: 'Setting the Presser Foot Pressure' },
    { key: 'tension', topic: 'Thread tension', printed: 45, find: 'Thread Tension' },
    { key: 'diff', topic: 'Differential feed', printed: 45, find: 'Adjusting the Differential Feed' },
    { key: 'prep', topic: 'Preparing for threading', printed: 50, find: 'Preparing for Threading' },
    { key: 'needles', topic: 'Threading the needles', printed: 51, find: 'Needle Threads' },
    { key: 'loopers', topic: 'Threading the loopers (air)', printed: 53, find: 'Threading the Looper Thread' },
    { key: 'change', topic: 'Changing thread', printed: 56, find: 'Changing the Thread' },
    { key: 'test', topic: 'Sewing test and optimising', printed: 58, find: 'Stitch Optimization' },
    { key: 'secure', topic: 'Securing overlock stitches', printed: 69, find: 'Securing Overlock Stitches' },
    { key: 'clean', topic: 'Cleaning the looper area', printed: 77, find: 'Cleaning the Looper Area' },
    { key: 'trouble', topic: 'Troubleshooting', printed: 79, find: 'Troubleshooting' }
  ] },
  t: {
    air: true, needlesFirst: true, spools: 'Thread stand with four cone positions; the retractable thread guide must be fully pulled up first.',
    needleThreads: [['Right needle (RN) – green path', 'Pull the thread under the thread guide plate to the left, up between the rearmost opening of the thread deflection finger, over the take-up lever cover and down, into the right guide, onto the needle holder guide, then thread the needle by hand and lay the tail under the foot to the back left.'], ['Left needle (LN) – yellow path', 'Same route but through the centre opening of the deflection finger and the left guides. Thread the right needle first.']],
    looperWay: 'Open the threader cover, move the air threader connector to the left, turn the handwheel slowly counter-clockwise until the air pipes couple, guide each thread through its thread guide with a reserve of about 56 cm, feed the thread end about 1.2 cm into its air nozzle, hold the air threader button until the thread exits the looper eye, lay it under the foot to the back left, then set the connector back to the right and close the cover.',
    diff: { min: '0.6', max: '2.0', gather: '1.5–2', stretch: '0.6' },
    knife: 'Lower the knife (Off) by opening the threader cover, pulling the knife away from the plate and tipping it forward to the lock-in; lift it back (On) the opposite way.',
    width: 'Cutting width dial: 5–7 mm from the left needle; stitch width is 2 mm less when using the right needle.',
    mtc: 'The mtc micro thread control dial (looper area) enlarges (+) or shrinks (−) the looper loops at the edge while you sew. Start from −.',
    pressure: 'Presser-foot pressure wheel on the front: lighter for fine fabric, heavier for thick.',
    rolledLever: 'N/R rolled hem lever – N for overlocking, R for rolled hem (retracts the stitch finger).',
    cutting: 'Knife cover insert or coverstitch insert must be fitted before sewing.'
  },
  gear: { ids: ['o-brush'], extra: [
    foot(id, 'overlock', 'Standard overlock foot', 'overlock', 'The foot the machine comes with, used for normal overlocking.', ['Finishing edges, seaming knits'], 'lock'),
    { id: id + ':needles', cat: 'needle', name: 'ELx705 needles (80–100)', icon: ['needle', 'universal'], m: id, inc: true, what: 'The needle system this overlocker uses; sizes 80–100 (12–16) are approved.', when: ['All overlocking'], fit: ['Switch off and raise the foot.', 'Loosen the needle screw, remove the old needle, insert the new one fully up with the flat side to the back, tighten.', 'Check the left needle (LN) and right needle (RN) match the stitch chart.'], tip: 'Change needles after every project or if you hear popping or see skipped stitches.' }
  ] }
};
