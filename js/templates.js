// Turns a per-machine data file (js/machines/<id>.js) into diagram views and setup guides.
// Profiles: 'panel' (screen + buttons, with or without knobs), 'mech' (dials), 'lock' (overlocker).
import { VERIFIED } from './machines/verified-pages.js';

/* ---------- default part text, per scene part id (own words) ---------- */
const DP = {
  // head / thread path
  spoolPin: { name: 'Spool pin', text: 'Carries the thread spool. Fit a spool cap that matches the spool so it turns freely without wobbling.', g: 'threading:spool' },
  spoolCap: { name: 'Spool cap', text: 'Keeps the spool on the pin. Pick the size closest to the spool – a cap that is too small lets thread snag.', g: 'threading:spool' },
  felt: { name: 'Felt disc', text: 'A soft disc under the spool that stops it spinning too freely and tangling.', g: 'threading:spool' },
  guideEyelet: { name: 'First thread guide', text: 'Sets the angle the thread leaves the spool. Always thread through it before heading to the tension discs.', g: 'threading:path' },
  rearGuide: { name: 'Thread channel', text: 'The channel on the front of the head that leads the thread down to the tension discs.', g: 'threading:path' },
  tension: { name: 'Tension discs', text: 'Two small discs pinch the thread. They only grip when the presser foot is down – so thread with the foot up.', g: 'threading:path' },
  pressureDial: { name: 'Presser-foot pressure', text: 'Sets how firmly the foot presses the fabric. Leave on the standard value for ordinary fabric; go lighter for fine or stretchy, heavier for thick.', g: 'advanced:pressure' },
  takeup: { name: 'Take-up lever', text: 'Pulls thread up after each stitch. The thread must go through its eye – a missed take-up lever is the classic cause of loops under the fabric.', g: 'threading:takeup' },
  takeupCover: { name: 'Take-up lever cover', text: 'The plate the thread wraps round before it goes up into the take-up lever.', g: 'threading:takeup' },
  needleGuides: { name: 'Needle-bar thread guide', text: 'A small hook just above the needle that keeps the thread straight down to the eye.', g: 'threading:needle' },
  cutter: { name: 'Thread cutter (side)', text: 'A little blade at the side of the head for trimming the thread tail after threading.', g: 'threading:tail' },
  threader: { name: 'Needle threader', text: 'Pulls a loop of thread through the needle eye.', g: 'threading:needle' },
  needle: { name: 'Needle', text: 'Use the system and size your manual specifies. Replace it often – a blunt needle causes skipped stitches and snags.', g: 'needle:insert' },
  // needle area
  needleHolder: { name: 'Needle clamp', text: 'Grips the needle. The screw tightens it.', g: 'needle:insert' },
  needleScrew: { name: 'Needle clamp screw', text: 'Loosen to remove the needle, tighten to hold the new one. Hand-tight with the supplied screwdriver.', g: 'needle:remove' },
  footHolder: { name: 'Presser-foot holder', text: 'The part that carries the foot sole. On snap-on machines you leave it in place and just change the sole.', g: 'foot:remove' },
  footScrew: { name: 'Holder screw', text: 'Holds the whole foot holder to the presser bar – only touched when fitting a screw-on foot.', g: 'foot:remove' },
  footSole: { name: 'Presser-foot sole', text: 'The foot that holds the fabric against the feed dogs. Different soles suit different jobs.', g: 'foot:remove' },
  crossPin: { name: 'Foot pin', text: 'The pin on the sole that clicks into the holder.', g: 'foot:attach' },
  stitchPlate: { name: 'Stitch plate', text: 'The metal plate under the needle with a hole for the needle and slots for the feed dog. The seam guide lines are engraved on it.' },
  plateRelease: { name: 'Stitch-plate cover release', text: 'Releases the plate cover for cleaning or for changing the plate.' },
  feedDog: { name: 'Feed dog', text: 'The toothed bars under the foot that pull fabric through. They can be lowered for free-motion work or darning on most models.', g: 'basics:feed' },
  bobbinCover: { name: 'Bobbin cover', text: 'Clear cover over the bobbin. Slide it off to put in a bobbin.', g: 'bobbin:open' },
  buttonholeLever: { name: 'Buttonhole lever', text: 'Pull down when sewing a buttonhole so the machine measures the length and sews it in one step.', g: 'buttonholes:foot' },
  // bobbin area
  bobbin: { name: 'Bobbin', text: 'Holds the lower thread. It must unwind in the direction marked on the plate or cover.', g: 'bobbin:insert' },
  slot: { name: 'Thread slot', text: 'Draw the thread through this slot so it is held under the tension spring.', g: 'bobbin:insert' },
  channel: { name: 'Thread channel (bobbin)', text: 'The groove that guides the bobbin thread to the cutter and out to the needle hole.', g: 'bobbin:insert' },
  cover: { name: 'Bobbin cover', text: 'Snap it back in place before sewing – the machine will stitch badly without it.', g: 'bobbin:close' },
  needleHole: { name: 'Needle hole', text: 'The hole in the plate where the needle goes down and the thread loop is caught.' },
  // needle anatomy
  shank: { name: 'Shank', text: 'The top section that goes into the clamp.', g: 'needle:insert' },
  flat: { name: 'Flat side', text: 'The flat side of the shank faces the back (for most home machines) – fitted wrongly the machine will not form stitches.', g: 'needle:insert' },
  shoulder: { name: 'Shoulder', text: 'Where the shank steps down to the thinner blade.' },
  groove: { name: 'Long groove', text: 'The channel at the front where the thread lies as the needle goes down.', g: 'needle:choose' },
  scarf: { name: 'Scarf', text: 'The cut-out above the eye on the back; the hook passes here to pick up the thread loop.' },
  eye: { name: 'Eye', text: 'The hole the thread goes through. Match the eye size to the thread.', g: 'needle:choose' },
  point: { name: 'Point', text: 'Sharp, ballpoint or stretch – choose it for the fabric.', g: 'needle:choose' },
  // back (bernette)
  handle: { name: 'Carrying handle', text: 'Carry the machine by this handle only.' },
  handwheelB: { name: 'Handwheel', text: 'Turn toward you to move the needle by hand.' },
  lifter: { name: 'Presser-foot lifter', text: 'Raises and lowers the presser foot.', g: 'foot:remove' },
  powerSwitch: { name: 'Power switch', text: 'Switches the machine on and off.', g: 'basics:power' },
  powerSocket: { name: 'Power cable socket', text: 'Push the power cable in fully.', g: 'basics:power' },
  footSocket: { name: 'Foot-control socket', text: 'Plug in the supplied foot control.', g: 'basics:power' },
  usb: { name: 'USB port', text: 'For a USB stick with embroidery designs or software updates.' },
  sewingTableB: { name: 'Sewing table / accessory box', text: 'Slide-on table that also stores accessories; slide it off for the free arm.' },
  // embroidery module / hoop
  machineSocket: { name: 'Module socket', text: 'The connector on the machine where the embroidery unit slides in.', g: 'embroidery:module' },
  moduleBody: { name: 'Embroidery unit', text: 'Houses the motors that move the hoop. Keep the area around it clear while it runs.', g: 'embroidery:module' },
  arm: { name: 'Embroidery arm / carriage', text: 'The arm that carries the hoop and moves in two directions while the needle stitches.', g: 'embroidery:hoop' },
  coupling: { name: 'Hoop connector', text: 'Where the hoop clips onto the arm.', g: 'embroidery:hoop' },
  safetyLever: { name: 'Hoop lock / safety lever', text: 'Locks the hoop in place so it cannot slip during stitching.', g: 'embroidery:hoop' },
  releaseButton: { name: 'Unit release', text: 'Pressed to separate the embroidery unit from the machine.', g: 'embroidery:module' },
  outerRing: { name: 'Outer ring', text: 'The outer ring of the hoop, which has the tightening mechanism.', g: 'embroidery:prepare' },
  innerRing: { name: 'Inner ring', text: 'The inner ring presses the fabric and stabiliser into the outer ring.', g: 'embroidery:prepare' },
  template: { name: 'Template sheet', text: 'A clear sheet with a grid that helps you centre the design on the fabric.', g: 'embroidery:prepare' },
  lever: { name: 'Hoop lever', text: 'Quick-release lever that opens and closes the hoop.', g: 'embroidery:prepare' },
  adjustScrew: { name: 'Adjustment screw', text: 'Loosen or tighten to suit the thickness of the fabric before closing the hoop.', g: 'embroidery:prepare' },
  arrowMarks: { name: 'Arrow marks', text: 'Align the arrow marks on both rings so the hoop closes square.', g: 'embroidery:prepare' },
  fabric: { name: 'Fabric and stabiliser', text: 'Hoop fabric and stabiliser together, drum-tight but not stretched.', g: 'embroidery:prepare' },
  innerRingX: { name: 'Inner ring (cross-section)', text: 'The inner ring should sit just proud of the outer ring on the underside so the hoop lies flat.', g: 'embroidery:prepare' },
  // front panel
  screen: { name: 'Screen', text: 'Pick stitches, designs and settings.', g: 'sewing:stitch' },
  speedSlider: { name: 'Speed slide', text: 'Sets the maximum sewing speed.', g: 'sewing:speed' },
  sideButtons: { name: 'Side buttons', text: 'Needle and tie-off controls.', g: 'sewing:control' },
  panelButtons: { name: 'Panel keys', text: 'Quick-pick keys for stitches and settings.', g: 'sewing:stitch' },
  funcButtons: { name: 'Operation buttons', text: 'Start/Stop, reverse, thread cutter and related buttons.', g: 'sewing:control' },
  knobUpper: { name: 'Upper knob', text: 'Changes the first value on screen.', g: 'sewing:stitch' },
  knobLower: { name: 'Lower knob', text: 'Changes the second value on screen.', g: 'sewing:stitch' },
  lighting: { name: 'Sewing light', text: 'LED light over the needle area.' },
  needleArea: { name: 'Needle area', text: 'The needle, presser foot and stitch plate – see the needle-area view.', go: 'needleArea' },
  handwheel: { name: 'Handwheel', text: 'Turn toward you (counter-clockwise) to move the needle by hand – to raise it, or to check a stitch.', g: 'basics:handwheel' },
  moduleSocket: { name: 'Embroidery unit connection', text: 'Where the embroidery unit connects on the left of the bed.', g: 'embroidery:module' },
  // front mech
  tensionDial: { name: 'Thread tension dial', text: 'Raises or lowers the upper-thread tension. Start at the middle setting and move by one step.', g: 'advanced:tension' },
  stitchDial: { name: 'Stitch selector', text: 'Turn to pick the stitch.', g: 'sewing:stitch' },
  lengthDial: { name: 'Stitch length dial', text: 'Sets how long each stitch is.', g: 'sewing:stitch' },
  widthDial: { name: 'Stitch width dial', text: 'Sets how wide the zigzag swings.', g: 'sewing:stitch' },
  reverseLever: { name: 'Reverse lever', text: 'Hold to sew backwards.', g: 'sewing:control' },
  startStop: { name: 'Start/Stop button', text: 'Starts and stops sewing without the foot control.', g: 'sewing:speed' },
  // lock front
  spoolStands: { name: 'Thread stands', text: 'Four cone positions; each thread has its own colour-coded path. Pull the telescopic thread guide up before threading.', g: 'threading:prep' },
  threadGuides: { name: 'Thread guide bar', text: 'The bar at the top guides each thread from its cone down to the tension dial.', g: 'threading:prep' },
  tensionDials: { name: 'Tension dials', text: 'One dial per thread: left needle, right needle, upper looper, lower looper. Adjust one at a time, half a number at a time.', g: 'tension:tune' },
  looperCover: { name: 'Looper / threader cover', text: 'Open it to reach the loopers, knife and threading charts. Always close before sewing.', g: 'threading:loopers' },
  needleFoot: { name: 'Needles and presser foot', text: 'One or two needles side by side with the presser foot in front.', g: 'threading:needles' },
  footLifter: { name: 'Presser-foot lifter', text: 'Raises the foot and releases all the tensions so thread slides in easily.', g: 'threading:prep' },
  diffFeed: { name: 'Differential feed', text: 'Changes the speed of the front feed dog relative to the back: higher gathers fabric, lower stretches it flat. 1 = equal.', g: 'advanced:diff' },
  stitchLength: { name: 'Stitch length', text: 'Sets stitch length for the overlock stitch.', g: 'setup:length' },
  rolledHem: { name: 'Rolled-hem selector (N / R)', text: 'N for normal overlock; R retracts the stitch finger for a rolled hem.', g: 'rolled:lever' },
  cuttingWidth: { name: 'Cutting width', text: 'Moves the knife in and out to change how much fabric is trimmed – and the stitch width.', g: 'setup:width' },
  // lock looper
  lowerKnife: { name: 'Lower knife', text: 'Fixed blade that works with the upper knife like scissors.', g: 'setup:knife' },
  upperKnife: { name: 'Upper knife', text: 'Moving blade that trims the fabric edge just ahead of the stitches.', g: 'setup:knife' },
  presserFoot: { name: 'Presser foot', text: 'Holds fabric against the feed dogs while the knife trims it.' },
  needleL: { name: 'Left needle', text: 'The left needle sets the wider stitch width.', g: 'threading:needles' },
  needleR: { name: 'Right needle', text: 'The right needle gives a narrower stitch; thread it first.', g: 'threading:needles' },
  stitchFinger: { name: 'Stitch finger', text: 'The finger the looper threads wrap around so the edge is neatly covered. Retracted for rolled hem.', g: 'rolled:lever' },
  needleC: { name: 'Centre needle', text: 'The middle of the three coverstitch needles (green on the machine). Used for the narrow two-needle stitches and the triple stitch.', g: 'threading:needles' },
  upperLooper: { name: 'Upper looper', text: 'Swings above the fabric, laying its thread over the edge.', g: 'threading:loopers' },
  lowerLooper: { name: 'Lower looper', text: 'Swings under the fabric, laying thread on the underside.', g: 'threading:loopers' },
  threadUpper: { name: 'Upper looper thread', text: 'Runs from its cone to the upper looper (red in the diagram).', g: 'threading:loopers' },
  threadLower: { name: 'Lower looper thread', text: 'Runs from its cone to the lower looper (blue in the diagram).', g: 'threading:loopers' },
  threadNeedle: { name: 'Needle threads', text: 'Right needle thread (green) and left needle thread (orange) – the diagram is simplified, follow the chart on your machine.', g: 'threading:needles' }
};

const FRONT_PANEL_PARTS = ['spoolPin', 'takeup', 'threader', 'cutter', 'lighting', 'needleArea', 'feedDog', 'moduleSocket', 'handwheel', 'screen', 'speedSlider', 'sideButtons', 'knobUpper', 'knobLower', 'panelButtons', 'funcButtons'];
const FRONT_MECH_PARTS = ['spoolPin', 'takeup', 'tensionDial', 'stitchDial', 'lengthDial', 'widthDial', 'reverseLever', 'pressureDial', 'threader', 'lighting', 'needleArea', 'feedDog', 'handwheel', 'bobbinCover', 'startStop'];
const HEAD_PARTS = ['spoolPin', 'spoolCap', 'felt', 'guideEyelet', 'rearGuide', 'tension', 'pressureDial', 'takeup', 'takeupCover', 'needleGuides', 'cutter', 'threader', 'needle'];
const NEEDLE_AREA_PARTS = ['needleHolder', 'needleScrew', 'needle', 'footHolder', 'footScrew', 'footSole', 'crossPin', 'stitchPlate', 'plateRelease', 'feedDog', 'bobbinCover', 'threader', 'buttonholeLever'];

export function pageKeysFor(m) { return new Set(VERIFIED[m.id] || []); }
const pageOf = (m, key) => (key && m.manual && pageKeysFor(m).has(key) ? m.manual.pages.find(p => p.key === key).printed : undefined);

/* ---------- parts ---------- */
function partsFor(m, ids, view) {
  const out = [];
  for (const id of ids) {
    if ((m.hide || []).includes(id)) continue;
    const base = DP[id]; const o = (m.over || {})[id] || {};
    if (!base && !o.name) continue;
    const p = { id, name: o.name || base.name, text: o.text || base.text };
    if (base && base.g) p.g = base.g;
    if (base && base.go) p.go = base.go;
    if (o.pg) p.pg = o.pg;
    out.push(p);
  }
  return out;
}

/* ---------- guides ---------- */
const S = (k, t, b, scene, hl = [], o = {}) => ({ k, t, b, check: o.check || [], tip: o.tip, warn: o.warn, scene, so: { hl, ...(o.so || {}) }, acc: o.acc, pg: o.pg, sopts: o.sopts });
const sceneFront = (m) => (m.profile === 'mech' ? 'frontMech' : m.profile === 'lock' ? 'lockFront' : 'frontPanel');
const partFlags = (m) => { const h = m.hide || []; return { noThreader: h.includes('threader') || undefined, noPressure: h.includes('pressureDial') || undefined, noFelt: h.includes('felt') || undefined, noButtonholeLever: h.includes('buttonholeLever') || undefined, noPlateRelease: h.includes('plateRelease') || undefined }; };
const sceneOpts = (m, scene) => (scene === 'head' || scene === 'needleArea' ? partFlags(m) : scene === 'lockLooper' ? (m.coverOnly ? { cover: true } : {}) : scene === 'frontPanel' || scene === 'frontMech' ? frontOpts(m) : {});
const frontOpts = (m) => (m.profile === 'panel' ? { knobs: m.layout === 'knobs', noModule: !m.emb, small: !!m.small } : m.profile === 'mech' ? { noStart: (m.hide || []).includes('startStop'), noPressure: (m.hide || []).includes('pressureDial'), noThreader: (m.hide || []).includes('threader'), noWidth: (m.hide || []).includes('widthDial') } : {});

function threadingGuide(m) {
  const t = m.t; const hasThreader = t.threader && t.threader !== 'none';
  const threaderB = t.threader === 'semi'
    ? 'Use the semi-automatic needle threader: hold the thread in the little holder/cutter at the side of the head as your manual shows, then push the threader lever down and let it come back up. The machine lowers the foot to the right height first, and the thread loop comes through the eye. Pull the loop gently through.'
    : t.threader === 'lever'
      ? 'Use the built-in needle threader: lower the threader lever, hook the thread round the guide as shown in your manual, then let the lever return slowly – the hook carries a loop of thread through the eye. Pull the loop gently out behind the needle.'
      : 'This model has no needle threader, so thread the needle by hand from front to back. Cut the thread end cleanly (a sharp cut helps), and hold something pale behind the needle so you can see the eye.';
  const steps = [
    S('ready', 'Get ready', `Raise the presser foot so the tension discs open, and bring the needle to its highest position. ${t.ready || ''}`.trim(), 'head', ['tension', 'takeup'], { check: ['Presser foot up', 'Needle up'], pg: 'upper' }),
    S('spool', 'Spool and cap', t.spool, 'head', ['spoolPin', 'spoolCap', 'felt'], { check: ['Spool turns freely', 'Cap matches the spool size'], acc: ['o-spoolnet'], pg: 'upper' }),
    S('path', 'Guide to the tension discs', t.path, 'head', ['guideEyelet', 'rearGuide', 'tension'], { check: ['Thread seated between the discs', 'Foot is still up'], tip: t.tension, pg: 'upper' }),
    S('takeup', 'Through the take-up lever', t.takeup, 'head', ['takeupCover', 'takeup'], { check: ['Thread is inside the take-up lever eye'], warn: 'If the thread misses the take-up lever you get loops under the fabric.', pg: 'upper' }),
    S('needle', hasThreader ? 'Needle guide and threader' : 'Thread the needle', `${t.needleGuide || 'Pass the thread behind the guide above the needle.'} ${threaderB}`, 'head', ['needleGuides', ...(hasThreader ? ['threader'] : []), 'needle'], { check: ['Thread through the eye', hasThreader ? 'Threader returned to rest' : 'Eye checked from the front'], pg: 'upper' }),
    S('tail', 'Pull a tail and check', 'Pull about 10 cm of thread through the needle and lay it back under the foot (to the back or left, as your manual shows). Lower the foot, turn the handwheel toward you once, and the bobbin thread should come up with the needle thread.', 'head', ['cutter', 'needle'], { check: ['10 cm tail under the foot', 'Both threads brought up'], tip: 'If the thread jumps out of the take-up lever, rethread from the start with the foot up.', pg: 'upper' })
  ];
  if (t.screenStep) steps.push(S('screen', 'Tell the machine', t.screenStep, 'frontPanel', ['screen'], { so: {} }));
  return { id: 'threading', title: 'Threading the machine', icon: 'thread', time: '5 min', level: 'Basics', intro: 'Upper-thread path from spool to needle.', steps };
}

function bobbinGuide(m) {
  const t = m.t;
  const steps = [
    S('place', 'Set up the winder', t.windPlace, 'bobbinWind', ['spoolPin', 'bobbin', 'winderBase'], { check: ['Spool on the pin', 'Empty bobbin on the winder'], pg: 'winding', acc: ['o-spoolnet'] }),
    S('windpath', 'Thread the winder path', t.windPath, 'bobbinWind', ['eyelet', 'pretension', 'bobbin'], { check: ['Through the guide and pre-tension', 'Thread through the bobbin hole'], pg: 'winding' }),
    S('wind', 'Wind', t.windStart, 'bobbinWind', ['startStop', 'bobbin'], { check: ['Thread winds evenly'], tip: 'Wind at a moderate speed – a bobbin wound too fast or unevenly can change your stitch tension.', pg: 'winding' }),
    S('windstop', 'Finish', t.windStop, 'bobbinWind', ['bobbin'], { check: ['Winder pushed back', 'Thread cut'], pg: 'winding' }),
    S('open', 'Open the bobbin cover', t.bobbinOpen, 'bobbinCase', ['cover'], { check: ['Needle up', 'Machine off or locked'], pg: 'bobbin' }),
    S('insert', 'Insert the bobbin', `${t.bobbinIn} Draw the thread into the slot and along the channel, leaving a short tail out of the case.`, 'bobbinCase', ['bobbin', 'slot', 'channel'], { check: ['Unwinds the right way', 'Thread through slot and channel'], warn: 'A bobbin the wrong way round gives loose, looping stitches.', pg: 'bobbin' }),
    S('close', 'Close and check', 'Put the cover back until it snaps, then pull the thread tail out under the foot. Bring the bobbin thread up by turning the handwheel once (see the threading guide).', 'bobbinCase', ['cover'], { check: ['Cover clicked shut'], pg: 'bobbin' })
  ];
  return { id: 'bobbin', title: 'Winding and inserting the bobbin', icon: 'bobbin', time: '5 min', level: 'Basics', intro: 'Wind the lower thread and drop the bobbin in.', steps };
}

function needleGuide(m) {
  const t = m.t;
  return { id: 'needle', title: 'Changing the needle', icon: 'needle', time: '3 min', level: 'Basics', intro: 'Remove the old needle and fit a new one correctly.', steps: [
    S('choose', 'Choose the right needle', `Match the needle to the fabric and thread: universal for most woven fabric, ballpoint/stretch for knits, microtex for fine or tightly woven, denim/leather for heavy fabric, embroidery for embroidery thread. Check the system and size in your manual (page ${pageOf(m, 'needle') || 'see Needle chart'}).`, 'needle', ['groove', 'eye', 'point'], { check: ['Right type and size for the fabric'], pg: 'needle' }),
    S('prep', 'Prepare', `Raise the needle and the presser foot and switch the machine off (or lock the screen if you have one). ${t.needleNote || ''}`.trim(), 'needleArea', ['needleHolder'], { check: ['Needle up', 'Machine off or locked'], pg: 'needle' }),
    S('remove', 'Remove the old needle', 'Hold the old needle with one hand and loosen the clamp screw with the other. Pull the needle straight down and out.', 'needleArea', ['needleScrew', 'needle', 'needleHolder'], { check: ['Screw loosened', 'Needle removed'], pg: 'needle' }),
    S('insert', 'Insert the new needle', 'Push the new needle up as far as it will go with the flat side facing the back. Hold it there and tighten the screw.', 'needle', ['flat', 'needleHolder', 'needleScrew'], { so: { mode: 'insert' }, check: ['Flat side to the back', 'Pushed all the way up', 'Screw tightened'], warn: 'A needle that is not fully up will hit the plate or skip stitches.', pg: 'needle' }),
    S('check', 'Check by hand', 'Turn the handwheel toward you slowly for one full stitch and make sure the needle passes cleanly through the plate without touching the foot.', 'frontPanel', ['handwheel'], { check: ['One stitch turned by hand'], tip: 'Replace needles regularly – about every 8 hours of sewing, after hitting a pin, or when stitches skip.', pg: 'needle' })
  ] };
}

function footGuide(m) {
  const h = m.t.footHolder;
  const how = h === 'screw'
    ? ['Raise the needle and foot, and switch the machine off.', 'Loosen the holder screw and slide the holder off the bar.', 'Fit the new holder (or sole) so it sits straight against the bar, tighten the screw firmly.', 'Check the sole is square, then turn the handwheel one stitch to make sure the needle clears it.']
    : h === 'brother'
      ? ['Raise the needle and foot lever, and switch the machine off or lock the screen.', 'Press the small black button at the back of the holder; the foot drops off.', 'Place the new foot under the holder so its pin lines up with the groove.', 'Lower the foot lever until it clicks, then turn the handwheel one stitch to check clearance.']
      : h === 'janome'
        ? ['Raise the needle and foot and switch the machine off.', 'Press the release lever at the back of the holder; the foot drops off.', 'Place the new foot under the holder with the cross pin aligned to the groove.', 'Lower the lifter until it snaps on, then turn the handwheel one stitch to check clearance.']
        : ['Raise the needle and foot and switch off or lock the screen.', 'Press the front of the fitted sole so it releases from the holder.', 'Slide the new sole under the holder so its cross pin sits below the opening.', 'Lower the foot – it clicks on. Select the foot on the screen so the machine can check it.'];
  const steps = [
    S('prep', 'Prepare', how[0], 'foot', ['presserBar', 'footHolder'], { check: ['Needle up', 'Foot up', 'Off or locked'], pg: 'foot' }),
    S('remove', 'Take the old foot off', how[1], 'foot', ['footHolder', 'soleClip', 'footSole'], { pg: 'foot' }),
    S('attach', 'Fit the new foot', how[2], 'foot', ['crossPin', 'footSole'], { check: ['Pin sits in the groove'], pg: 'foot' }),
    S('check', 'Lower and check', `${how[3]}${m.t.foot ? ' ' + m.t.foot : ''}`, 'foot', ['footSole'], { check: ['Foot clicks on', 'Handwheel turned one stitch'], tip: 'Use the foot your stitch needs – the stitch chart or the screen will tell you which one.', pg: 'foot' })
  ];
  return { id: 'foot', title: 'Changing the presser foot', icon: 'foot', time: '2 min', level: 'Basics', intro: 'Swap one foot for another safely.', steps };
}

function basicsGuide(m) {
  const t = m.t;
  const steps = [
    S('power', 'Power and foot control', `Plug in the power cable and the foot control, then switch on. ${t.startNote || ''}`.trim(), m.profile === 'mech' ? 'frontMech' : 'frontPanel', ['handwheel'], { sopts: frontOpts(m), check: ['Cable pushed in fully', 'Foot control plugged in'], pg: 'overview' }),
    S('check', 'Check needle, foot and bobbin', 'Make sure a fresh needle is fitted, the right foot is on, the bobbin is in and both threads are brought up.', 'needleArea', ['needle', 'footSole', 'bobbinCover'], { check: ['Needle in', 'Right foot on', 'Bobbin threaded']}),
    S('stitch', 'Pick a stitch', t.stitchPick || 'Choose a stitch on the screen. Use a straight stitch for a first test.', sceneFront(m), m.profile === 'mech' ? ['stitchDial', 'lengthDial', 'widthDial'].filter(x => !(m.hide || []).includes(x)) : m.layout === 'knobs' ? ['screen', 'knobUpper', 'knobLower'] : ['screen', 'panelButtons'], { sopts: frontOpts(m), pg: 'stitches', check: ['Stitch chosen', 'Length and width sensible for the fabric'] }),
    S('speed', 'Start slowly', 'Sew a test seam on a scrap of your fabric. Start slowly, guide the fabric lightly (do not pull) and let the feed dog do the work.', sceneFront(m), m.profile === 'mech' ? ['reverseLever', ...((m.hide || []).includes('startStop') ? [] : ['startStop'])] : ['speedSlider', 'funcButtons'], { sopts: frontOpts(m), check: ['Even stitches on top and underneath'] }),
    S('tension', 'Check the seam', 'Look at both sides. Even stitches mean the tension is fine. If the bobbin thread shows on top, the upper tension is too tight; if the upper thread shows underneath, it is too loose.', sceneFront(m), m.profile === 'mech' ? ['tensionDial'] : ['screen'], { sopts: frontOpts(m), tip: m.t.tension || 'Change the tension by one step at a time.', pg: m.profile === 'mech' ? 'stitches' : 'setup' })
  ];
  return { id: 'basics', title: 'First sewing: power to test seam', icon: 'sew', time: '10 min', level: 'Basics', intro: 'Get the machine ready for ordinary sewing and check the first seam.', steps };
}

function buttonholeGuide(m) {
  const four = m.t.fourStep;
  const steps = [
    S('foot', 'Fit the buttonhole foot', 'Put on the buttonhole foot, pull out its slide and place the button in it so the machine can size the buttonhole.', 'needleArea', ['footHolder', 'footSole', 'buttonholeLever'], { check: ['Buttonhole foot fitted', 'Button in the slide'], pg: 'buttonhole', acc: (m.gear.extra || []).filter(a => /buttonhole/.test(a.id)).map(a => a.id).slice(0, 1) }),
    S('mark', 'Mark and test', 'Mark the position on a scrap of the same fabric with interfacing and sew a test buttonhole first.', 'needleArea', ['footSole'], { check: ['Test sewn on scrap'], tip: 'Interfacing behind the buttonhole stops puckering.' }),
    S('sew', four ? 'Sew each step' : 'Sew it in one step', four ? 'This machine has a 4-step buttonhole: set the dial for each step in turn (front bar, left side, back bar, right side), as your manual shows, sewing a few stitches each time.' : 'Pull the buttonhole lever down (if your machine has one), select the buttonhole stitch and sew. The machine does all the sides and bar tacks automatically.', sceneFront(m), m.profile === 'mech' ? ['stitchDial'] : ['screen'], { sopts: frontOpts(m), pg: 'buttonhole', check: ['Both sides and bar tacks complete'] }),
    S('open', 'Cut it open', 'Cut between the rows with a seam ripper from each end toward the middle, and put a pin across each end so you do not cut the bar tack.', 'needleArea', ['footSole'], { check: ['Pin placed at each end'], warn: 'Cut away from your hand, with the fabric flat.' })
  ];
  return { id: 'buttonholes', title: 'Buttonholes', icon: 'sew', time: '10 min', level: 'Intermediate', intro: 'Make a neat buttonhole that fits your button.', steps };
}

function advancedGuide(m) {
  const t = m.t; const steps = [];
  steps.push(S('tension', 'Balance the thread tension', `If the stitches are uneven, adjust the upper tension one step at a time and sew a test seam each time. ${t.tension || ''}`.trim(), m.profile === 'mech' ? 'frontMech' : 'frontPanel', m.profile === 'mech' ? ['tensionDial'] : ['screen'], { sopts: frontOpts(m), check: ['Changed one step', 'Test seam sewn'], pg: 'setup' }));
  if (!(m.hide || []).includes('pressureDial') || m.profile === 'panel') steps.push(S('pressure', 'Foot pressure for tricky fabric', 'Most fabrics are fine at the standard foot pressure. Lighten it for very fine, stretchy or fluffy fabric; increase it for very thick layers. Always check with a test seam.', 'head', ['pressureDial'], { check: ['Pressure suits the fabric'], pg: 'setup' }));
  if (t.dual) steps.push(S('dual', 'Dual Feed for layers and slippery fabric', 'The built-in Dual Feed feeds fabric from above as well as below. Engage it (lever on the back), fit a foot that allows it, and use it for layers, velvet, slippery or stretchy fabric, and for matching patterns.', 'back', ['lifter'], { check: ['Dual Feed engaged', 'Suitable foot fitted'], pg: 'back' }));
  if (!t.noFeed) steps.push(t.darningPlate
    ? S('feed', 'Darning and free-motion work', 'This machine has no feed-dog lowering control: cover the feed dogs with the darning plate from the accessories, then move the fabric by hand with a darning/free-motion foot or a hoop.', 'needleArea', ['feedDog'], { check: ['Darning plate fitted', 'Fabric moved by hand'] })
    : S('feed', 'Lower the feed dog for free-motion work', 'For darning and free-motion stitching, lower the feed dog and use a free-motion/darning foot, so you move the fabric yourself. Raise it again afterwards.', 'needleArea', ['feedDog'], { check: ['Feed dog lowered', 'Darning foot on'], pg: 'feed' }));
  if (!t.noTwin) steps.push(S('twin', 'Twin needle', 'A twin needle makes two parallel lines. Fit it like a normal needle, use a second spool on the extra spool pin, and thread each needle separately. Choose a narrow stitch width so the needles do not hit the plate, and check your manual lists twin-needle use for this machine.', 'needle', ['shank', 'point'], { check: ['Both threads through guides', 'Width limited'], pg: 'needle' }));
  return { id: 'advanced', title: 'Advanced settings', icon: 'sew', time: '15 min', level: 'Advanced', intro: 'Tension, foot pressure, free-motion and twin-needle setup.', steps };
}

function embroideryGuide(m) {
  const t = m.t; const brother = t.brotherEmb; const foot = t.embFoot;
  const steps = [
    S('foot', 'Fit the embroidery foot', `Fit the ${foot} and make sure the stitch plate is the right one for embroidery. ${m.emb && !m.embOnly ? 'Select the embroidery mode on the screen.' : ''}`.trim(), 'needleArea', ['footHolder', 'footSole'], { check: [`${foot} fitted`], pg: 'embfoot' }),
    S('module', 'Attach the embroidery unit', brother ? 'Remove the flat-bed attachment (or open the accessory compartment first), line up the embroidery unit with the connection on the bed and push until it clicks.' : 'Switch the machine off, slide the embroidery module onto the connection on the left of the bed until it seats, and secure it as your manual shows.', 'module', ['machineSocket', 'moduleBody', 'arm'], { check: ['Machine off', 'Unit seated fully'], warn: 'Carry the machine and the unit separately.', pg: 'module' }),
    S('thread', 'Thread for embroidery', 'Thread the top with embroidery thread, and use a bobbin with fine (60 wt) bobbin thread. The upper thread path is the same as sewing.', 'head', ['tension', 'takeup', 'needle'], { check: ['Embroidery thread on top', 'Bobbin thread in'], pg: 'upper' }),
    S('prepare', 'Hoop the fabric', `Choose the smallest hoop that fits the design (${t.hoops}). Place the stabiliser under the fabric, put the inner ring in, and tighten the outer ring so the fabric is drum-tight but not stretched.`, 'hoop', ['outerRing', 'innerRing', 'fabric'], { check: ['Hoop matches the design size', 'Fabric taut and straight'], tip: 'Use the template sheet to centre the design.', pg: 'hoop' }),
    S('hoopOn', 'Attach the hoop', 'Raise the needle and foot, then slide the hoop onto the embroidery arm connector until it clicks or locks, as your manual shows.' + (t.hoopRecognition ? ' The machine recognises the hoop and shows its area.' : ''), 'hoopOn', ['arm', 'coupling', 'safetyLever'], { check: ['Hoop locked on', 'Hoop clear of the machine'], pg: 'hoop' }),
    S('design', 'Pick and position the design', 'Choose a built-in design or load one from a USB stick, then position, rotate and resize it on the screen so it sits where you want it in the hoop.', 'frontPanel', ['screen'], { sopts: frontOpts(m), check: ['Design inside the hoop area'], tip: `The embroidery area on this machine is ${t.embArea}.` }),
    S('start', 'Stitch out', `Lower the foot and start. Watch the first few stitches, and keep the area behind the unit clear. Maximum speed is ${t.embSpeed} stitches per minute.`, 'frontPanel', ['funcButtons', 'speedSlider'], { sopts: frontOpts(m), check: ['First stitches watched'], pg: 'embroider' }),
    S('finish', 'Colour changes and finishing', 'Change thread when the machine asks, trim jump stitches if it has not trimmed them, then take the hoop off and remove the stabiliser as the stabiliser type requires.', 'hoop', ['fabric'], { check: ['Threads trimmed', 'Stabiliser removed'] })
  ];
  return { id: 'embroidery', title: m.embOnly ? 'Embroidery from start to finish' : 'Embroidery: unit, hoop and first design', icon: 'hoop', time: '15–20 min', level: m.embOnly ? 'Basics' : 'Intermediate', intro: 'Attach the unit, hoop the fabric and stitch your first design.', steps };
}

function embAdvancedGuide(m) {
  const t = m.t;
  return { id: 'embadv', title: 'Embroidery: advanced settings', icon: 'hoop', time: '10 min', level: 'Advanced', intro: 'Tension, speed, thread sensors and stabiliser choices.', steps: [
    S('tension', 'Embroidery tension', 'For embroidery the upper tension is often a little looser than for sewing, so that the bobbin thread does not show on top. Change it in the embroidery settings by one step at a time.', 'frontPanel', ['screen'], { sopts: frontOpts(m), check: ['Bobbin thread not visible on top'], pg: 'setup' }),
    S('speed', 'Lower the speed for tricky thread', `Maximum embroidery speed is ${t.embSpeed} spm. Use the speed setting to slow down for metallic, fragile or very fine thread.`, 'frontPanel', ['speedSlider'], { sopts: frontOpts(m), check: ['Speed reduced for metallic/fine thread'] }),
    S('stab', 'Choose the stabiliser', 'Use tear-away on stable woven fabric, cut-away on knits and stretchy fabric, wash-away for lace and sheer fabric, and add a topper (wash-away film) on towels or fleece.', 'hoop', ['fabric'], { check: ['Stabiliser matches the fabric'] }),
    S('sensor', 'Thread and bobbin sensors', t.bobbinSensor ? 'The upper and lower thread sensors stop the machine when thread runs out. Refill, then restart from where it stopped.' : 'If the machine stops mid-design, check the upper thread is in the take-up lever and the bobbin is not empty before restarting from where it stopped.', 'head', ['takeup'], { check: ['Restart from the stop point'] })
  ] };
}

/* ---- overlocker guides ---- */
function lockGuides(m) {
  if (m.coverOnly) return coverOnlyGuides(m);
  const t = m.t;
  const threading = { id: 'threading', title: 'Threading the overlocker', icon: 'thread', time: '10–15 min', level: 'Basics', intro: 'Set up, then thread the loopers and needles in the right order.', steps: [
    S('prep', 'Get ready', `Raise the presser foot (this releases the tensions), pull the thread guide up fully, and bring the needles to their highest position by turning the handwheel toward you. Open the cover and use the colour-coded threading chart on the machine. ${t.spools || ''}`.trim(), 'lockFront', ['spoolStands', 'threadGuides', 'footLifter'], { check: ['Foot up', 'Needles up', 'Cones on the stands'], pg: 'prep' }),
    S('loopers', 'Thread the loopers', t.looperWay, 'lockLooper', ['upperLooper', 'lowerLooper', 'threadUpper', 'threadLower'], { check: ['Lower looper threaded', 'Upper looper threaded', 'Tails under the foot'], tip: t.air ? 'If the air will not carry a thread, use the auxiliary-thread trick or the threading wire in your manual.' : undefined, warn: t.air ? 'Do not use waxed or coated thread in the air pipes – it can block them.' : undefined, pg: 'loopers' }),
    S('needles', 'Thread the needles', t.needleThreads.map(([a, b]) => `${a}: ${b}`).join(' '), 'lockLooper', ['needleL', 'needleR', 'threadNeedle'], { check: ['Right needle threaded first', 'Left needle threaded'], pg: 'needles' }),
    S('test', 'Pull the tails and test', 'Lay all tails under the foot to the back, lower the foot, close the cover, and turn the handwheel by hand a few stitches. Then sew a short chain and a test seam on scrap fabric.', 'lockFront', ['looperCover', 'handwheel'], { check: ['Cover closed', 'Chain forms evenly'], warn: t.cutting }),
    S('change', 'Changing thread quickly', 'To change colour, cut the old thread above the cone, put on the new cone, knot the two threads together, and pull the old thread through the machine until the knot reaches the eye (cut the knot before the needle eye – never pull it through the needle).', 'lockFront', ['spoolStands', 'tensionDials'], { check: ['Knot cut before the needle eye'], pg: 'change' })
  ] };
  if (t.needlesFirst) { const i = threading.steps.findIndex(x => x.k === 'loopers'); const j = threading.steps.findIndex(x => x.k === 'needles'); [threading.steps[i], threading.steps[j]] = [threading.steps[j], threading.steps[i]]; threading.intro = 'Follows the bernette manual order: needles first, then the air-threaded loopers.'; }
  const setup = { id: 'setup', title: 'Setting up the stitch', icon: 'sew', time: '10 min', level: 'Basics', intro: 'Knife, cutting width, stitch length and presser-foot pressure.', steps: [
    S('knife', 'Knife on or off', t.knife, 'lockLooper', ['upperKnife', 'lowerKnife'], { check: ['Knife on to cut, off to only finish'], warn: t.cutting, pg: 'knife' }),
    S('width', 'Cutting width and stitch width', t.width, 'lockFront', ['looperCover', 'needleFoot'], { check: ['Width suits the fabric'], pg: 'width' }),
    S('length', 'Stitch length', 'Turn the stitch length dial: higher for long stitches (thick, loose fabric), lower for fine fabric and tight curves.', 'lockFront', ['stitchLength'], { check: ['Length set'], pg: 'length' }),
    S('pressure', 'Presser-foot pressure', t.pressure, 'lockFront', ['footLifter'], { check: ['Pressure suits the fabric'], pg: 'pressure' }),
    S('start', 'Start sewing', 'Place the fabric edge in front of the knife, lower the foot, start slowly and guide lightly. Let the feed dogs pull – do not push.', 'lockLooper', ['presserFoot', 'feedDog'], { check: ['Slow start', 'Edge trimmed cleanly'] })
  ] };
  const tension = { id: 'tension', title: 'Balancing the tension', icon: 'sew', time: '10 min', level: 'Intermediate', intro: 'A systematic way to fix uneven overlock stitches.', steps: [
    S('test', 'Sew a test seam', 'Always test on a scrap of the project fabric with the same thread. Look at both sides and at the edge.', 'lockFront', ['tensionDials'], { check: ['Test sewn on the real fabric'], pg: 'test' }),
    S('tune', 'Change one dial at a time', 'Start from the manual\'s recommended values. Loosen before you tighten, and change a dial by half or one number at a time, then test again. The tension chart in your manual tells you which dial matches which fault.', 'lockFront', ['tensionDials'], { check: ['One dial changed', 'Test repeated'], tip: t.lay, pg: 'tension' }),
    S('edge', 'Looper threads at the edge', t.mtc ? t.mtc : 'If the looper threads lie too tight or too loose at the edge, change the cutting width or the stitch length first, then tune the looper tensions.', 'lockLooper', ['upperLooper', 'lowerLooper'], { check: ['Edge covered evenly'], pg: 'test' })
  ] };
  const rolled = { id: 'rolled', title: 'Rolled hem', icon: 'sew', time: '10 min', level: 'Intermediate', intro: 'A narrow, neat edge for fine fabric and napkins.', steps: [
    S('lever', 'Set the rolled-hem lever', t.rolledLever, 'lockFront', ['rolledHem'], { check: ['Lever set for rolled hem'], pg: 'rolled' }),
    S('settings', 'Short stitch, tight tension', 'Use a short stitch length, a fine thread in the loopers and tighten the lower looper so the thread rolls the edge. Change tensions by half a number and test.', 'lockFront', ['stitchLength', 'tensionDials'], { check: ['Short stitch', 'Lower looper tightened'], tip: 'Use the stitch chart in your manual for starting values.', pg: 'rolled' }),
    S('sew', 'Sew and guide the edge', 'Sew slowly and guide the edge so the knife trims a hair of fabric. The thread rolls the edge into the stitch.', 'lockLooper', ['upperKnife', 'presserFoot'], { check: ['Edge neatly rolled'] }),
    S('finish', 'Secure the ends', 'Pull the thread chain through the stitching with a needle, or sew over the chain, so the end cannot unravel.', 'lockLooper', ['stitchFinger'], { check: ['End secured'], pg: 'secure' })
  ] };
  const diff = { id: 'diff', title: 'Differential feed', icon: 'sew', time: '10 min', level: 'Advanced', intro: 'Stop knit fabrics stretching and gather woven fabrics.', steps: [
    S('what', 'What it does', `The differential feed changes how fast the front feed dog moves compared with the rear. At 1 they move together. Higher than 1 gathers the fabric; lower than 1 stretches it flat. The range on this machine is ${t.diff.min}–${t.diff.max}.`, 'lockFront', ['diffFeed'], { check: ['Know where the dial is'], pg: 'diff' }),
    S('wavy', 'Fix wavy knit seams', 'If a stretchy edge goes wavy, move the differential feed above 1 so the fabric is fed a little more; try a value near the top of its range and test.', 'lockFront', ['diffFeed'], { check: ['Seam lies flat'], pg: 'diff' }),
    S('gather', 'Gathering', `To gather, set the dial high (about ${t.diff.gather}) and sew a long stitch. The fabric bunches into even gathers.`, 'lockFront', ['diffFeed', 'stitchLength'], { check: ['Gathers even'], pg: 'diff' }),
    S('stretch', 'Stretching a hem', `For a stretched edge on thin fabric, set the dial low (about ${t.diff.stretch}). Always return it to 1 afterwards.`, 'lockFront', ['diffFeed'], { check: ['Dial back to 1'], pg: 'diff' })
  ] };
  return m.cover ? [threading, setup, tension, rolled, diff, coverGuide(m)] : [threading, setup, tension, rolled, diff];
}

/* ---- coverstitch guides (cover-only machines, and the cover conversion of combination machines) ---- */
const CV = { so: { cover: true } };
function coverGuide(m) {
  const c = m.t.cover;
  return { id: 'cover', title: 'Coverstitch and chainstitch', icon: 'sew', time: '15 min', level: 'Intermediate', intro: 'Switch the machine to cover/chain mode, thread it and sew a stretch hem.', steps: [
    S('convert', 'Switch to cover / chain mode', c.convert, 'lockFront', ['looperCover'], { check: ['Machine off while converting', 'Inserts and covers fitted as the manual shows'], warn: 'Switch off and keep fingers away from the knife and needles.', pg: 'cover_convert' }),
    S('thread', 'Thread the cover looper and the needles', c.thread, 'lockLooper', ['lowerLooper', 'needleL', 'needleC', 'needleR'], { sopts: CV.so, check: ['Looper threaded first', 'Needles threaded', 'Tails laid under the foot'], pg: 'cover_thread' }),
    S('set', 'Choose the stitch and set the tension', c.set, 'lockLooper', ['needleL', 'needleC', 'needleR'], { sopts: CV.so, check: ['Right needles for the stitch fitted', 'Test sewn on scrap'], pg: 'cover_stitches' }),
    S('sew', 'Sew a hem and finish the seam', c.finish, 'lockLooper', ['presserFoot', 'feedDog'], { sopts: CV.so, check: ['Hem sewn from the right side', 'Seam end secured'], pg: 'cover_sew' })
  ] };
}
function coverOnlyGuides(m) {
  const t = m.t; const c = t.cover;
  const threading = { id: 'threading', title: 'Threading the coverstitch machine', icon: 'thread', time: '15 min', level: 'Basics', intro: 'Set up, then thread the looper first and the needles after it.', steps: [
    S('prep', 'Get ready', `Raise the presser foot (this opens the tension discs), pull the thread stand up and bring the needles to their highest position with the handwheel. Open the looper cover and use the colour-coded threading chart on the machine. ${c.spools || ''}`.trim(), 'lockFront', ['spoolStands', 'threadGuides', 'footLifter', 'handwheel'], { check: ['Machine off', 'Foot up', 'Needles up', 'Cover open'], warn: 'Switch the machine off before you open the cover.', pg: 'cover_prep' }),
    S('looper', 'Thread the looper', c.looper, 'lockLooper', ['lowerLooper', 'threadLower'], { sopts: CV.so, check: ['Looper thread through every guide', 'Thread passes between the tension discs', 'Tail laid under the foot'], pg: 'cover_looper' }),
    S('needles', 'Thread the needles', c.needles, 'lockLooper', ['needleL', 'needleC', 'needleR', 'threadNeedle'], { sopts: CV.so, check: ['Only the needles your stitch uses are threaded'], pg: 'cover_needles' }),
    S('test', 'Pull the tails and test', 'Lay the tails under the foot to the back, lower the foot, close the cover and turn the handwheel by hand for a few stitches. Then sew a short chain and a test seam on scrap fabric.', 'lockFront', ['looperCover', 'handwheel'], { check: ['Cover closed', 'Stitches form evenly on the scrap'], warn: 'Always close the looper cover before sewing.', pg: 'cover_test' })
  ] };
  const setup = { id: 'setup', title: 'Choosing and setting the stitch', icon: 'sew', time: '10 min', level: 'Basics', intro: 'Which needles to use, stitch length, foot pressure and differential feed.', steps: [
    S('type', 'Choose the stitch and needles', c.stitches, 'lockLooper', ['needleL', 'needleC', 'needleR'], { sopts: CV.so, check: ['Needles fitted for the stitch', 'Unused needles removed or left unthreaded as the manual says'], pg: 'cover_stitches' }),
    S('length', 'Stitch length', c.length, 'lockFront', ['stitchLength'], { check: ['Length set'], pg: 'length' }),
    S('pressure', 'Presser-foot pressure', c.pressure, 'lockFront', ['footLifter'], { check: ['Pressure suits the fabric'], pg: 'pressure' }),
    S('diff', 'Differential feed', `${c.diff} The range on this machine is ${t.diff.min}–${t.diff.max}.`, 'lockFront', ['diffFeed'], { check: ['Dial back to 1 afterwards'], pg: 'diff' })
  ] };
  const sew = { id: 'sew', title: 'Sewing a stretch hem', icon: 'sew', time: '10 min', level: 'Intermediate', intro: 'Start, sew and finish a neat coverstitch hem on a knit.', steps: [
    S('start', 'Start the seam', 'Fold up the hem, place the fabric under the foot with the edge behind the needles, lower the foot and start slowly. Guide the fabric lightly – let the feed dog do the pulling.', 'lockLooper', ['presserFoot', 'feedDog'], { sopts: CV.so, check: ['Hem folded and pinned or clipped', 'Slow start'], pg: 'cover_sew' }),
    S('guide', 'Keep the edge straight', 'Sew with the folded edge following a guide line (or the foot edge) so the stitches stay parallel to it. The needle threads show as parallel rows on the top and the looper thread as a stitched ladder underneath.', 'lockLooper', ['needleL', 'needleR'], { sopts: CV.so, check: ['Parallel rows on the right side'] }),
    S('end', 'Finish the seam', c.finish, 'lockLooper', ['presserFoot', 'feedDog'], { sopts: CV.so, check: ['Seam end secured', 'Threads trimmed'], warn: 'Coverstitch cannot chain off like an overlocker, so plan how to secure the end.', pg: 'cover_sew' }),
    S('wavy', 'If the hem waves or tunnels', c.fix, 'lockFront', ['diffFeed', 'tensionDials'], { check: ['One setting changed at a time'], tip: 'Press the finished hem – coverstitch relaxes and flattens with steam.', pg: 'diff' })
  ] };
  return [threading, setup, sew];
}

/* ---------- views ---------- */
function sewingViews(m) {
  const t = m.t; const v = [];
  const frontScene = sceneFront(m);
  const frontIds = (m.profile === 'mech' ? FRONT_MECH_PARTS : FRONT_PANEL_PARTS).filter(id => !(m.layout !== 'knobs' && (id === 'knobUpper' || id === 'knobLower')) && !(m.layout === 'knobs' && id === 'panelButtons') && !(id === 'moduleSocket' && !m.emb));
  v.push({ id: 'front', title: 'Front', scene: frontScene, sopts: frontOpts(m), intro: `${m.name} from the front – a simplified layout. Where the real position differs, use the part list below and your manual.`, ids: frontIds });
  v.push({ id: 'head', title: 'Thread path', scene: 'head', intro: 'The upper thread path: spool, guides, tension discs, take-up lever, needle.', ids: HEAD_PARTS });
  v.push({ id: 'needleArea', title: 'Needle area', scene: 'needleArea', intro: 'Needle, foot, plate and bobbin cover.', ids: NEEDLE_AREA_PARTS });
  v.push({ id: 'bobbinArea', title: 'Bobbin area', scene: 'bobbinCase', intro: 'Drop-in bobbin and its thread path.', ids: ['bobbin', 'slot', 'channel', 'cover', 'needleHole'] });
  v.push({ id: 'needleAnatomy', title: 'Needle anatomy', scene: 'needle', intro: 'Parts of a home-machine needle.', ids: ['shank', 'flat', 'groove', 'scarf', 'eye', 'point'] });
  if (['bernette-b77', 'bernette-b79', 'bernette-05-academy'].includes(m.id)) v.push({ id: 'back', title: 'Back', scene: 'back', intro: 'Rear connections and levers.', ids: ['handle', 'handwheelB', 'lifter', 'powerSwitch', 'powerSocket', 'footSocket', 'usb', 'sewingTableB'] });
  if (m.emb) {
    v.push({ id: 'module', title: 'Embroidery unit', scene: 'module', intro: 'The embroidery unit and the connection it plugs into.', ids: ['machineSocket', 'moduleBody', 'arm', 'coupling', 'safetyLever', 'releaseButton'] });
    v.push({ id: 'hoop', title: 'Hoop', scene: 'hoop', intro: 'A typical hoop: outer ring, inner ring and fabric.', ids: ['outerRing', 'innerRing', 'template', 'lever', 'adjustScrew', 'arrowMarks', 'fabric', 'innerRingX'] });
  }
  return v;
}
function lockViews(m) {
  const lf = ['spoolStands', 'threadGuides', 'tensionDials', 'looperCover', 'needleFoot', 'footLifter', 'diffFeed', 'stitchLength', 'rolledHem', 'handwheel', 'powerSwitch'];
  return [
    { id: 'front', title: 'Front', scene: 'lockFront', intro: `${m.name} from the front – a simplified layout. Use the part list, the threading chart on the machine and your manual for exact positions.`, ids: lf },
    { id: 'loopers', title: 'Looper area', scene: 'lockLooper', intro: m.coverOnly ? 'Inside the cover: the looper, the three needles and the thread colours.' : 'Inside the cover: knives, loopers, needles and the thread colours.', ids: m.coverOnly ? ['needleL', 'needleC', 'needleR', 'lowerLooper', 'presserFoot', 'feedDog', 'threadLower', 'threadNeedle'] : ['upperKnife', 'lowerKnife', 'needleL', 'needleR', 'upperLooper', 'lowerLooper', 'stitchFinger', 'presserFoot', 'feedDog', 'threadUpper', 'threadLower', 'threadNeedle'] },
    { id: 'needleAnatomy', title: 'Needle anatomy', scene: 'needle', intro: 'Parts of an overlocker needle (the flat side faces the back).', ids: ['shank', 'flat', 'groove', 'scarf', 'eye', 'point'] }
  ];
}

/* ---------- build ---------- */
export function buildModel(m) {
  const views = (m.profile === 'lock' ? lockViews(m) : sewingViews(m)).map(v => ({ ...v, sopts: { ...sceneOpts(m, v.scene), ...(v.sopts || {}) }, parts: partsFor(m, v.ids, v) }));
  const guides = m.profile === 'lock' ? lockGuides(m) : [];
  if (m.profile !== 'lock') {
    if (!m.embOnly) guides.push(basicsGuide(m));
    guides.push(threadingGuide(m), bobbinGuide(m), needleGuide(m), footGuide(m));
    if (!m.embOnly) {
      if (!m.t.noButtonholes) guides.push(buttonholeGuide(m));
      guides.push(advancedGuide(m));
    }
    if (m.emb) { guides.push(embroideryGuide(m)); guides.push(embAdvancedGuide(m)); }
  }
  // specific per-model overrides on custom guide steps
  const order = ['basics', 'threading', 'bobbin', 'needle', 'foot', 'buttonholes', 'embroidery', 'embadv', 'advanced', 'setup', 'tension', 'rolled', 'diff'];
  guides.sort((a, b) => (order.indexOf(a.id) < 0 ? 99 : order.indexOf(a.id)) - (order.indexOf(b.id) < 0 ? 99 : order.indexOf(b.id)));
  // namespace, resolve cross-links and page numbers
  const gid = (k) => `${m.id}~${k}`;
  const g2 = guides.map(g => ({ ...g, id: gid(g.id), key: g.id, machines: [m.id], steps: g.steps.map(s => {
    const { pg, k, sopts, ...rest } = s; const page = pageOf(m, pg);
    return { ...rest, key: k, page, soptsOverride: { ...sceneOpts(m, rest.scene), ...(sopts || {}) }, so: { ...rest.so } };
  }) }));
  const find = (ref) => { const [gk, sk] = ref.split(':'); const g = g2.find(x => x.key === gk); if (!g) return null; const i = g.steps.findIndex(s => s.key === sk); return i < 0 ? [g.id, 1] : [g.id, i + 1]; };
  for (const v of views) for (const p of v.parts) { if (p.g) { const r = find(p.g); if (r) p.guide = r; delete p.g; } if (p.pg) { p.page = pageOf(m, p.pg); delete p.pg; } }
  for (const g of g2) for (const s of g.steps) { if (s.acc) s.acc = s.acc.filter(Boolean); }
  return { views, guides: g2 };
}
