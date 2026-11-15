// bernette b59 – threading diagrams for the reusable thread viewer (js/threadviewer.js).
// ALL ARTWORK HERE IS ORIGINAL: simplified line drawings built from basic shapes, not traced from any photo.
// Coordinates are a 400-wide "front view" (and a top-down view of the free arm for the bobbin). Not to scale.
// Wording follows the b59 user manual (English 2026-03 edition): upper thread pp.20–22, bobbin winding pp.23–24,
// bobbin insertion pp.24–25. Step numbers match the manual's own numbering. Where the exact shape of a part is a
// best guess it says so in `unsure` (shown to the user as "Check this one").
//
// Data shape (see threadviewer.js):
//   scenes[id]   = { vb, art }                 base drawing; `.fine` parts only show in close-ups
//   crops[id]    = { scene, vb, caption }      a close-up is the same drawing, zoomed to a smaller viewBox
//   sequences[]  = { id, title, blurb, scene, art?, steps: [ { t, b, tip?, warn?, unsure?, page, seg?, at?, ring?, extra?, insets?, scene? } ] }
//   seg  = one path string, or an array of strings / { d, back:true } (back = thread passes behind a part: dashed)
//   at   = [x, y, r?] pulsing ring on the part to use;  extra = extra SVG markup (arrows)
//   insets = list of crop ids to offer for the step;  ring = [x, y, r] circle on the main drawing marking the close-up area

const arrow = (d) => `<path class="tv-arrow" d="${d}" marker-end="url(#tvAhA)"/>`;

/* ---------------- front view ---------------- */
const FRONT = `
<path class="o f" d="M20 120 V50 Q20 30 40 30 H360 Q380 30 380 50 V232 Q380 248 364 248 H36 Q20 248 20 232 V210 H292 V120 Z"/>
<path class="o l" d="M20 210 H292"/>
<rect class="o f2" x="236" y="48" width="54" height="42" rx="6"/>
<circle class="o f2" cx="200" cy="62" r="5"/><circle class="o f2" cx="216" cy="62" r="5"/>
<circle class="o f2" cx="200" cy="80" r="5"/><circle class="o f2" cx="216" cy="80" r="5"/>
<path class="o" d="M214 78.5 L218.5 80 L214 81.5 Z" style="fill:#5f7a7a"/>
<circle class="o f2" cx="384" cy="132" r="17"/>
<!-- take-up lever: cover, slot, eye -->
<rect class="o f2" x="100" y="38" width="24" height="68" rx="9"/>
<rect class="o f3" x="109" y="44" width="6" height="52" rx="3"/>
<circle class="o f" cx="112" cy="46" r="3.4"/>
<!-- tension dial -->
<circle class="o f2" cx="140" cy="52" r="9"/><path class="o l" d="M134 44 V60 M146 44 V60"/>
<!-- needle area -->
<rect class="o f2" x="72" y="120" width="24" height="10" rx="2"/>
<rect class="o f2" x="80" y="130" width="8" height="52" rx="2"/>
<path class="o f2" d="M64 200 H108 L106 208 H66 Z"/>
<rect class="o f2" x="56" y="208" width="64" height="4" rx="1"/>
<path class="o" d="M84 182 V206"/><ellipse class="o" cx="84" cy="196" rx="1.4" ry="3.2"/>
<path class="o" d="M88 134 H114"/><circle class="o f2" cx="117" cy="134" r="3.2"/>
<path class="o" d="M88 146 H114"/><circle class="o f2" cx="117" cy="146" r="3.2"/>
<path class="o" d="M80 156 H66"/><circle class="o f2" cx="64" cy="156" r="2.6"/>
<rect class="o f3" x="76" y="162" width="16" height="3" rx="1"/><rect class="o f3" x="76" y="167" width="16" height="3" rx="1"/>
<circle class="o" cx="84" cy="176" r="5"/>
<rect class="o f2" x="52" y="168" width="14" height="30" rx="4"/><path class="o l" d="M59 174 V192"/><circle class="o f" cx="59" cy="176" r="3.6"/>
<path class="o l" d="M66 194 L82 196"/>
<path class="o f2" d="M20 150 L34 154 L28 158 L34 162 L20 166 Z"/>
<!-- top of the arm: thread guides + winder -->
<path class="o" d="M184 30 V14 Q184 6 190 6 Q196 6 196 14 V30"/>
<path class="o lip" d="M196 20 H203.5 Q206.5 20 206.5 23.5"/>
<path class="o l" d="M154 30 V16 Q154 9 160 9 Q166 9 166 16 V30"/>
<circle class="o f2" cx="232" cy="18" r="5.2"/><path class="o" d="M232 23 V30"/>
<rect class="o f2" x="255" y="22" width="8" height="8" rx="1"/><path class="o" d="M259 22 V16"/>
<!-- labels -->
<text class="lab" x="140" y="77" text-anchor="middle">tension</text>
<text class="lab" x="97" y="68" text-anchor="end">take-up lever</text>
<text class="lab" x="112" y="198">needle</text>
<text class="lab" x="22" y="146">cutter</text>
<text class="lab" x="59" y="226" text-anchor="middle">threader</text>
<text class="lab" x="263" y="73" text-anchor="middle">screen</text>
<text class="lab" x="208" y="99" text-anchor="middle">Start/Stop</text>
<!-- close-up only details -->
<g class="fine">
  <text class="lab" x="190" y="1" text-anchor="middle">first thread guide (eyelet)</text>
  <text class="lab" x="198" y="15">little lip / clip</text>
  <text class="lab" x="154" y="6" text-anchor="end">rear thread guide</text>
  <text class="lab" x="232" y="8" text-anchor="middle">pre-tension</text>
  <text class="lab" x="259" y="35" text-anchor="middle">winder</text>
  <text class="lab" x="140" y="39" text-anchor="middle">tension discs</text>
  <text class="lab" x="112" y="34" text-anchor="middle">take-up lever eye</text>
  <text class="lab" x="118" y="121" text-anchor="middle">cover bottom</text>
  <text class="lab" x="123" y="132">guide 1</text>
  <text class="lab" x="123" y="150">guide 2</text>
  <text class="lab" x="96" y="168">clamps</text>
  <text class="lab" x="62" y="152" text-anchor="end">guide</text>
  <text class="lab" x="92" y="181">needle bar guide</text>
  <text class="lab" x="28" y="178">cutter</text>
  <text class="lab" x="108" y="197">eye</text>
  <text class="lab" x="46" y="208" text-anchor="end">threader</text>
</g>`;

const UPPER_ART = `
<rect class="o f2" x="300" y="4" width="46" height="18" rx="2"/><rect class="o f" x="297" y="0" width="5" height="26" rx="2"/><rect class="o f" x="344" y="0" width="5" height="26" rx="2"/>
<rect class="o" x="290" y="2" width="7" height="22" rx="2" style="fill:#e6f3f3"/>
<rect class="o" x="349" y="8" width="6" height="10" style="fill:#f0d9b5"/>
<path class="o" d="M355 13 H372"/><path class="o" d="M372 13 V30"/>
<text class="lab" x="323" y="44" text-anchor="middle">spool</text>`;
const WIND_ART = `
<rect class="o f" x="250" y="8" width="18" height="14" rx="3"/><circle class="o" cx="259" cy="12" r="1.6"/>
<path class="o" d="M286 30 V4"/>
<rect class="o f2" x="276" y="-4" width="20" height="26" rx="2"/><rect class="o f" x="274" y="-6" width="24" height="4" rx="1"/><rect class="o f" x="274" y="22" width="24" height="3" rx="1"/>
<text class="lab" x="286" y="44" text-anchor="middle">spool</text>`;

/* ---------------- bobbin area, seen from above ---------------- */
const BED = `
<path class="o f" d="M24 60 Q24 44 40 44 H360 Q376 44 376 60 V200 Q376 216 360 216 H40 Q24 216 24 200 Z"/>
<rect class="o f2" x="52" y="84" width="132" height="92" rx="8"/>
<ellipse class="o" cx="110" cy="130" rx="5" ry="9"/>
<path class="o l" d="M78 100 H92 M78 106 H92 M78 154 H92 M78 160 H92 M128 100 H142 M128 106 H142 M128 154 H142 M128 160 H142"/>
<rect class="o f2" x="204" y="80" width="116" height="100" rx="10"/>
<circle class="o f" cx="262" cy="130" r="38"/><circle class="o l" cx="262" cy="130" r="26"/><circle class="o f3" cx="262" cy="130" r="9"/><circle class="o" cx="262" cy="130" r="2.4"/>
<path class="o" d="M216 180 V172 M228 180 V172"/>
<path class="o f3" d="M214 183 H152 Q130 183 130 168"/>
<path class="o l" d="M216 192 H150 Q124 192 124 168"/>
<circle class="o f" cx="127" cy="170" r="4"/>
<rect class="o f3" x="320" y="118" width="8" height="26" rx="3"/>
<text class="lab" x="110" y="76" text-anchor="middle">needle &amp; stitch plate</text>
<text class="lab" x="262" y="72" text-anchor="middle">bobbin compartment</text>
<g class="fine">
  <text class="lab" x="222" y="170" text-anchor="middle">slot</text>
  <text class="lab" x="176" y="207" text-anchor="middle">arrow marks</text>
  <text class="lab" x="127" y="162" text-anchor="middle">bobbin thread guide</text>
  <path class="o l" d="M200 188 l-5 -2 v4 z M174 188 l-5 -2 v4 z M148 188 l-5 -2 v4 z" style="fill:#9bb3b3"/>
</g>`;

export const B59_THREADING = {
  id: 'b59',
  machineName: 'bernette b59',
  source: 'bernette b59 user manual (English, 2026-03) pp. 20–25',
  scenes: {
    front: { vb: '0 -8 400 278', art: FRONT, label: 'Front of the b59, simplified line drawing' },
    bed: { vb: '0 20 400 218', art: BED, label: 'Bobbin area of the b59 seen from above, simplified line drawing' }
  },
  crops: {
    eyelet: { scene: 'front', vb: '170 -2 46 35', caption: 'The first thread guide: slide the thread under the little lip' },
    top: { scene: 'front', vb: '138 -8 100 75', caption: 'Thread guide eyelet and rear thread guide' },
    winderWide: { scene: 'front', vb: '166 -12 132 99', caption: 'Top of the machine: eyelet, winder pre-tension and bobbin' },
    winder: { scene: 'front', vb: '206 -10 80 60', caption: 'Bobbin winder: pre-tension and bobbin' },
    tension: { scene: 'front', vb: '98 14 80 60', caption: 'Tension discs' },
    takeup: { scene: 'front', vb: '88 28 90 90', caption: 'Take-up lever and its cover' },
    guides: { scene: 'front', vb: '52 108 90 68', caption: 'Thread guides 1 and 2 in the needle area' },
    clip: { scene: 'front', vb: '48 138 70 52', caption: 'The guide and clamps the thread is slipped into' },
    nbguide: { scene: 'front', vb: '52 158 64 48', caption: 'Needle bar guide, just above the needle' },
    threader: { scene: 'front', vb: '18 146 100 75', caption: 'Cutter, needle threader and needle eye' },
    slot: { scene: 'bed', vb: '186 140 80 60', caption: 'The slot the thread is pressed into' },
    bguide: { scene: 'bed', vb: '104 140 90 68', caption: 'Following the arrow marks to the bobbin thread guide' }
  },
  sequences: [
    {
      id: 'upper', title: 'Upper thread', scene: 'front', art: UPPER_ART,
      blurb: 'Spool to needle, following the arrows printed on the machine. 19 steps, numbered as in the manual.',
      steps: [
        { t: 'Raise the presser foot', b: 'Lift the presser foot so the tension discs open and the thread can slide in between them easily.', page: 20, at: [86, 204, 15], extra: arrow('M118 214 V196') },
        { t: 'Raise the needle', b: 'Bring the needle up so the thread can be slipped into the take-up lever without a struggle.', page: 20, at: [84, 150, 16], extra: arrow('M96 188 V164') },
        { t: 'Lock the screen', b: 'Lock the touchscreen before you start threading.', page: 20, at: [263, 69, 20] },
        { t: 'Felt pad on the horizontal pin', b: 'Put a felt pad on the horizontal spool pin.', page: 20, at: [352, 13, 14] },
        { t: 'Spool on the pin', b: 'Slide the spool onto the horizontal spool pin.', page: 20, at: [323, 13, 26] },
        { t: 'Spool cap', b: 'Choose the spool cap that matches the spool diameter and push it on. The spool should not wobble, but the thread should still unwind freely.', page: 20, at: [294, 13, 14] },
        { t: 'Spool net (slippery thread)', b: 'For slippery threads such as metallic or nylon, put a spool net over the spool as well. Skip this step for ordinary thread.', page: 20, at: [323, 13, 28] },
        { t: 'Under the clip on the first thread guide', b: 'This is the first guide after the spool. Hold the thread on the left and the right and pull it straight from the front to the back, underneath the thread guide eyelet. Slip it under the little clip on the guide until it clicks in and stays put. The dashed part of the line is where the thread is behind the guide.', page: 20,
          seg: ['M298 27 L210 27 Q204 27 201 23', { d: 'M201 23 L174 19', back: true }], ring: [198, 20, 20],
          unsure: 'The manual only says to pull the thread "from the front to the back underneath the thread guide eyelet". The little lip or clip drawn here is how this guide has been described to us on a real b59, so treat its exact shape as approximate and look for the spot where the thread seats with a small click.',
          insets: [
            { crop: 'eyelet', label: '1 · Approach', seg: 'M298 27 L212 27', extra: arrow('M214 31 Q208 31 203 26') },
            { crop: 'eyelet', label: '2 · Clicked in', seg: ['M298 27 L210 27 Q204 27 201 23', { d: 'M201 23 L174 19', back: true }], extra: '<path class="tv-tick" d="M208 10 l2.2 2.4 l4.2 -5"/>' },
            { crop: 'top', label: '3 · Wider view' }
          ] },
        { t: 'Under the rear thread guide', b: 'Carry the thread behind, underneath the rear thread guide, and bring it forward again to the front of the machine.', page: 20,
          seg: [{ d: 'M174 19 L158 14', back: true }, 'M158 14 C153 16 152 24 152 32'], insets: ['top'], ring: [166, 20, 24] },
        { t: 'Down the right of the tension discs', b: 'Guide the thread down the right-hand side, past the tension discs.', page: 21, tip: 'If the thread feels loose later, check the presser foot was up when you did this step.',
          seg: 'M152 32 L152 104', insets: ['tension'], ring: [145, 52, 22] },
        { t: 'Up around the take-up lever cover', b: 'Bring the thread round the bottom of the take-up lever cover and back up on the other side.', page: 21,
          seg: 'M152 104 Q152 114 142 114 L118 114 Q112 114 112 106 L112 54', insets: ['takeup'], ring: [118, 80, 34] },
        { t: 'Through the take-up lever, then down', b: 'Thread it through the eye of the take-up lever, then guide it downwards. Make sure it runs under the left side panel (the dashed part is hidden by the panel).', page: 21,
          warn: 'Missing the take-up lever eye is the classic mistake – the thread then loops or snaps.', unsure: 'The exact route the thread takes under the side panel is simplified here – follow the arrows printed on your machine.',
          seg: ['M112 54 L112 47 C118 42 128 48 128 58 L128 94', { d: 'M128 94 L128 118', back: true }], insets: ['takeup'], ring: [118, 80, 34] },
        { t: 'Behind guide 1, right to left', b: 'In the needle area, slide the thread from the right to the left behind the first thread guide.', page: 21,
          seg: ['M128 118 L128 128 Q128 134 120 134', { d: 'M120 134 L78 134', back: true }], insets: ['guides'], ring: [98, 140, 30], unsure: 'The guides are drawn as simple bars. Their real shape differs a little – match them to the pictures on p.21 of the manual.' },
        { t: 'Behind guide 2, right to left', b: 'Do the same behind the second thread guide: from the right to the left.', page: 21,
          seg: ['M78 134 C72 138 76 141 90 141 L126 141 C132 141 132 146 124 146', { d: 'M124 146 L78 146', back: true }], insets: ['guides'], ring: [98, 140, 30] },
        { t: 'Around the guide and between the clamps', b: 'Place the thread around the guide and press it in between the clamps. This is the small spot that grips the thread, so it should sit snugly and not slip out sideways.', page: 21,
          warn: 'Take care here: if the thread is not seated between the clamps the machine can skip stitches or make loops.',
          unsure: 'Not sure of the exact shape: the manual only says "place the thread around the thread guide and pass it between the clamps". Look at the picture on p.21. On many machines the thread also lies in a small guide on the needle bar just above the needle – see the second close-up, and check against your machine.',
          seg: 'M78 146 C66 148 62 158 72 161 C78 163 82 164 84 166', insets: ['clip', 'nbguide'], ring: [82, 164, 20] },
        { t: 'Cut with the thread cutter', b: 'Pull the thread across the thread cutter on the left of the head, from the front to the back, to trim it.', page: 22,
          seg: ['M84 166 L36 160', { d: 'M36 160 L24 163', back: true }], insets: ['threader'], ring: [48, 166, 28] },
        { t: 'Needle threader lever down, then release', b: 'Press the needle threader lever all the way down, then let go. The little hook goes through the needle eye and takes the thread with it.', page: 22,
          tip: 'The threader works for needles size 70 and up, and for single needles only. Thread a twin needle by hand.', unsure: 'How the thread lies between the cutter and the eye is simplified – the machine guides it for you.',
          seg: 'M36 160 C50 172 70 188 86 196', at: [84, 196, 8], extra: arrow('M59 186 V200'), insets: ['threader'], ring: [70, 186, 28] },
        { t: 'Pull the loop to the back', b: 'Pull the loop of thread towards the back until the end of the thread comes through the needle eye.', page: 22,
          seg: ['M84 196 L100 196', { d: 'M100 196 L118 188', back: true }], insets: ['threader'], ring: [90, 192, 24] },
        { t: 'Unlock the screen', b: 'Unlock the screen. The needle is threaded. Hold the thread tail and sew a few stitches on a scrap to check.', page: 22, at: [263, 69, 20],
          tip: 'If it looks wrong, unthread completely and start again at step 1 with the presser foot up.' }
      ]
    },
    {
      id: 'winding', title: 'Bobbin winding', scene: 'front', art: WIND_ART,
      blurb: 'Fill a bobbin from the vertical spool pin. 12 steps, numbered as in the manual.',
      steps: [
        { t: 'Bobbin onto the winder', b: 'Put the empty bobbin on the bobbin winder at the top of the machine.', page: 23, at: [259, 15, 14], insets: ['winder'], ring: [259, 15, 22] },
        { t: 'Felt, spool and cap on the vertical pin', b: 'Put a felt pad, a spool and a spool cap on the vertical spool pin.', page: 23, at: [286, 10, 18] },
        { t: 'Under the clip on the first thread guide', b: 'Hold the thread on the left and the right and pull it straight from the front to the back, underneath the thread guide eyelet. Tuck it under the little clip until it clicks in.', page: 23,
          seg: ['M276 27 L210 27 Q204 27 201 23', { d: 'M201 23 L174 19', back: true }], insets: [{ crop: 'eyelet', label: 'Thread guide' }, { crop: 'winderWide', label: 'Wider view' }], ring: [190, 18, 20],
          unsure: 'This is the same first thread guide as in upper threading (with the little lip or clip). The wording follows the manual; the clip detail is approximate.' },
        { t: 'Around the winder pre-tension', b: 'Guide the thread around the bobbin winder pre-tension, in the direction of the arrow.', page: 23,
          unsure: 'Follow the arrow printed on your machine for the direction. The arrow here is only a guide.',
          seg: [{ d: 'M174 19 L226 11', back: true }, 'M226 11 A7 7 0 1 1 227 24'], insets: ['winder'], ring: [232, 18, 22] },
        { t: 'Through the hole in the bobbin', b: 'Pull the end of the thread through the threading hole on the upper side of the bobbin.', page: 23,
          seg: 'M227 24 L244 21 L256 12', insets: ['winder'], ring: [255, 14, 16] },
        { t: 'Hold the end, push the bobbin right', b: 'Hold the thread end firmly with one hand and push the bobbin to the right-hand position.', page: 23, at: [259, 15, 14], extra: arrow('M244 36 H274') },
        { t: 'Start/Stop for a few turns', b: 'Press Start/Stop to wind a few turns, then press it again to stop. This anchors the thread on the bobbin.', page: 23, at: [216, 80, 14] },
        { t: 'Cut the end', b: 'Cut the thread end off above the inner hole of the bobbin.', page: 23, at: [259, 12, 12], warn: 'Keep your fingers clear of the bobbin while the machine is winding.' },
        { t: 'Carry on winding', b: 'Press Start/Stop again to continue winding.', page: 23, at: [216, 80, 14], warn: 'Do not leave the machine winding unattended.' },
        { t: 'Stop when the bobbin is full', b: 'Press Start/Stop to stop the winding.', page: 23, at: [216, 80, 14] },
        { t: 'Bobbin back to the left', b: 'Slide the bobbin back to its starting position on the left.', page: 24, at: [259, 15, 14], extra: arrow('M274 36 H244') },
        { t: 'Remove it and cut the thread', b: 'Lift the bobbin off and cut the thread with the thread cutter on the left of the head.', page: 24, at: [26, 158, 14], insets: ['threader'], ring: [48, 166, 28] }
      ]
    },
    {
      id: 'insert', title: 'Bobbin insertion', scene: 'bed',
      blurb: 'Put the wound bobbin into the machine (drop-in bobbin, under the cover). 9 steps, numbered as in the manual.',
      steps: [
        { t: 'Raise the needle', b: 'Bring the needle up.', page: 24, scene: 'front', at: [84, 150, 16], extra: arrow('M96 188 V164') },
        { t: 'Raise the presser foot', b: 'Lift the presser foot.', page: 24, scene: 'front', at: [86, 204, 15], extra: arrow('M118 214 V196') },
        { t: 'Lock the screen', b: 'Lock the touchscreen before you open the bobbin cover.', page: 24, scene: 'front', at: [263, 69, 20] },
        { t: 'Open the bobbin cover', b: 'Push the handle to the right and take the bobbin cover off.', page: 24, at: [324, 131, 16], extra: arrow('M312 150 H336'),
          unsure: 'The drawing shows the compartment with the cover already off. The handle position is approximate.' },
        { t: 'Remove the old bobbin', b: 'Lift out any bobbin that is in the bobbin case.', page: 24, at: [262, 130, 40] },
        { t: 'Drop in the new bobbin', b: 'Insert the bobbin so that it turns counter-clockwise as you pull the thread. Hold the thread tail and check the direction before you go on.', page: 24,
          tip: 'If it turns the other way, lift it out, flip it over and drop it in again.',
          extra: '<path class="tv-arrow" d="M262 96 A34 34 0 0 0 232 112" marker-end="url(#tvAhA)"/>', seg: 'M236 156 Q232 168 226 176' },
        { t: 'Press the thread into the slot', b: 'Pull the thread into the slot by pressing gently on the bobbin. You should feel it sit in.', page: 24,
          unsure: 'The manual says to press gently on the bobbin while pulling the thread into the slot. Where the slot sits is simplified here, so check against the picture on p.24.',
          seg: 'M226 176 L222 192', insets: ['slot'], ring: [222, 180, 22] },
        { t: 'Follow the arrow marks', b: 'Follow the arrow marks along the channel to the bobbin thread guide. The marks are moulded into the machine.', page: 24,
          unsure: 'The route and the shape of the bobbin thread guide are simplified. Follow the real arrow marks on your machine.',
          seg: 'M222 192 L150 192 Q124 192 124 172 L125 170', insets: ['bguide'], ring: [150, 184, 36] },
        { t: 'Put the cover back', b: 'Clip the bobbin cover back on, leaving the thread tail free.', page: 25, at: [262, 130, 56], extra: '<rect class="tv-cover" x="204" y="80" width="116" height="100" rx="10"/>', seg: 'M125 170 L116 158' }
      ]
    }
  ]
};

// Which new viewer step matches each step of the older text guides (so the guide pages can link across).
export const B59_GUIDE_MAP = {
  threading: [['upper', 1], ['upper', 4], ['upper', 8], ['upper', 10], ['upper', 13], ['upper', 16], ['upper', 19]],
  bobbin: [['winding', 1], ['winding', 3], ['winding', 6], ['winding', 11], ['insert', 4], ['insert', 6]]
};
