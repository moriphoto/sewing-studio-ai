// Shared helpers for per-model accessory lists. Fit steps are written for each foot-holder style.
export const FIT = {
  bernette7: [
    'Raise the needle and the presser foot, then switch the machine off or lock the screen.',
    'Press the front edge of the fitted sole so it drops off the holder.',
    'Slide the new sole under the holder so its cross pin sits below the holder opening.',
    'Lower the foot – you feel it click on.',
    'Switch on / unlock, then pick the foot you fitted in the presser-foot selection on the screen so the machine can check it against the stitch.'
  ],
  screw: [
    'Raise the needle and the presser foot, and switch the machine off.',
    'Loosen the holder screw with the screwdriver and take the old foot holder off the bar.',
    'Hold the new holder against the bar, tighten the screw, then fit the sole.',
    'Check the sole sits level and the finger guard (if fitted) is square to it.',
    'Turn the handwheel by hand for one full stitch to make sure the needle clears the foot.'
  ],
  brother: [
    'Raise the needle, raise the presser-foot lever and switch the machine off (or lock the screen on the touchscreen models).',
    'Press the small black button at the back of the foot holder – the foot drops off.',
    'Set the new foot under the holder so the pin on the foot lines up with the groove in the holder.',
    'Lower the presser-foot lever slowly until the foot clicks into place.',
    'Check the foot is level, then turn the handwheel toward you one full stitch to make sure the needle clears it.'
  ],
  janome: [
    'Raise the needle and the presser foot and switch the machine off.',
    'Press the small release lever on the back of the foot holder – the foot drops off.',
    'Place the new foot under the holder with its cross pin aligned to the groove.',
    'Lower the presser-foot lifter until the foot snaps on.',
    'Turn the handwheel toward you one full stitch to check the needle clears the foot.'
  ],
  lock: [
    'Switch off, raise the presser foot and swing it out of the way.',
    'Release the sole from the holder (check your manual for the release catch on your machine).',
    'Click the new sole on, lower the foot and check it sits flat on the feed dogs.',
    'Turn the handwheel toward you by hand for a few stitches to make sure the needles and loopers clear it.'
  ]
};
export const foot = (m, id, name, variant, what, when, fit, tip = '') => ({ id: `${m}:${id}`, cat: 'foot', name, icon: ['foot', variant], m, inc: true, what, when, fit: FIT[fit], tip });
export const hoop = (m, id, name, variant, what, when, tip = '') => ({
  id: `${m}:${id}`, cat: 'hoop', name, icon: ['hoop', variant], m, inc: true, what, when,
  fit: ['Hoop the fabric and stabiliser flat, with the fabric drum-tight but not stretched.', 'Raise the needle and the presser foot.', 'Slide the hoop onto the embroidery arm connector until it seats fully, and secure it as your manual shows.', 'Let the machine recognise the hoop (or select it on the screen) before you start.'], tip
});
export const other = (m, id, name, variant, what, when, fit, tip = '') => ({ id: `${m}:${id}`, cat: 'other', name, icon: ['other', variant], m, inc: true, what, when, fit, tip });
