import { foot } from './_gear.js';
const id = 'janome-mylock-454d';
const note = 'The official PDF from janome.ca. Janome\'s site blocks automated link checks, so open it in your own browser.';
export default {
  id, catalogId: 'janome-mylock-454d', brand: 'Janome', name: 'Janome MyLock 454D', short: '454D',
  type: 'overlocker', profile: 'lock', emb: false,
  shopUrl: 'https://www.thesewingstudio.co.uk/products/janome-mylock-454d-overlocker',
  blurb: '3- and 4-thread convertible overlocker (1 or 2 needles) with lay-in tensions, colour-coded guides and a quick-change rolled hem.',
  facts: [
    '3- or 4-thread overlocker; works with one or two needles',
    'Colour-coded thread guides, threading chart, easy-threading lower looper and lay-in tension dials',
    'Differential feed 0.5–2.25, stitch length 1–4 mm, adjustable foot pressure',
    'Tension release lever, lower looper pre-tension slider, retractable upper knife',
    'Top speed 1300 stitches per minute, snap-on feet'
  ],
  specs: [['Threads', '3 or 4'], ['Differential feed', '0.5 – 2.25'], ['Stitch length', '1.0 – 4.0 mm'], ['Cutting width', 'Adjustable – Janome\'s own page quotes both 3.1–7.3 mm and 5.3–7.3 mm; use the dial scale in your manual'], ['Max speed', '1300 spm'], ['Weight', '13.4 lb'], ['Source', 'janome.com "MyLock 454D Sailing Line" page; the shop listing says only "MyLock 454D", so check the label on your machine']],
  links: [
    { title: 'Janome MyLock 454D Sailing Line – product page (janome.com)', url: 'https://www.janome.com/product/mylock-454d-sailing-line/', kind: 'Web', doc: 'page', note: 'Official page.', blocked: true },
    { title: 'Janome MyLock 454D – Instruction book (PDF, English)', url: 'https://www.janome.ca/wp-content/uploads/2025/03/inst_book-mylock454d.pdf', kind: 'PDF', doc: 'full', note, blocked: true }
  ],
  manual: null,
  t: {
    air: false,
    needleThreads: [['Right needle', 'Follow the colour-coded needle path on the threading chart: down through the guides to the needle bar and thread the needle by hand.'], ['Left needle', 'Same route on the left; both threads can be used for a 4-thread stitch, or fit one needle for 3-thread.']],
    looperWay: 'Thread the loopers first (the lower looper uses the easy-threading path), then the needles, following the numbered, colour-coded threading chart in your manual.',
    diff: { min: '0.5', max: '2.25', gather: 'towards the top of the range', stretch: 'towards the bottom of the range' },
    knife: 'The upper knife retracts easily so you can thread or finish an edge without cutting; check the manual diagram for the exact way on your machine.',
    width: 'Cutting width is adjustable; the dial scale is marked in millimetres.',
    mtc: null,
    pressure: 'Adjustable foot pressure – lighter for fine fabric, heavier for thick.',
    rolledLever: 'Quick-change rolled hem – check your manual for the lever or finger position on your machine.',
    cutting: 'Always close the front cover before you sew.', lay: 'Lay-in tension dials, tension release lever and a lower looper pre-tension slider.', changeable: true
  },
  gear: { ids: ['o-brush'], extra: [
    foot(id, 'snapon', 'Snap-on overlock foot', 'overlock', 'The standard foot; snap-on, so other feet can be swapped quickly.', ['Everyday overlocking'], 'lock')
  ] }
};
