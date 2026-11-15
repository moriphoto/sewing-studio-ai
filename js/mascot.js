// Bobbin the mascot: an original little bobbin character (charcoal flanges, teal thread, big blinking eyes, small smile).
// mascotSvg({ live }) -> inline SVG. With live:true it bobs, looks side to side and taps a finger (CSS in app.css);
// without it the character is static (avatar / icon). prefers-reduced-motion keeps only the blinking.
// mountThinking(el, lines) -> shows the live mascot with a friendly rotating status line; returns a stop() function.
export const ASK_LINES = ["Bobbin's having a look…", 'Checking the manual…', 'Threading the answer together…', 'Nearly there…'];
export const PHOTO_LINES = ["Bobbin's having a look…", 'Squinting at the stitches…', "Checking the shop's machines…", 'Nearly there…'];

export function mascotSvg({ live = false, blink = false, size = 96, label = '' } = {}) {
  const lines = Array.from({ length: 7 }, (_, i) => `<path d="M33 ${38 + i * 10} H87" class="bm-wind"/>`).join('');
  return `<svg class="bm${live ? ' live' : blink ? ' blink' : ''}" viewBox="0 0 120 140" width="${size}" height="${Math.round(size * 140 / 120)}" ${label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"'} focusable="false">
  <g class="bm-all">
    <path class="bm-tail" d="M86 108 C108 108 112 126 98 130 C88 133 84 124 92 121"/>
    <rect class="bm-flange" x="24" y="14" width="72" height="15" rx="7.5"/>
    <rect class="bm-thread" x="31" y="28" width="58" height="84" rx="5"/>
    ${lines}
    <rect class="bm-flange" x="24" y="111" width="72" height="15" rx="7.5"/>
    <g class="bm-eyes"><ellipse class="bm-eye" cx="49" cy="64" rx="10" ry="11.5"/><ellipse class="bm-eye" cx="71" cy="64" rx="10" ry="11.5"/>
      <g class="bm-pupils"><circle class="bm-pupil" cx="49" cy="66" r="5"/><circle class="bm-pupil" cx="71" cy="66" r="5"/><circle class="bm-glint" cx="51" cy="63.5" r="1.7"/><circle class="bm-glint" cx="73" cy="63.5" r="1.7"/></g></g>
    <circle class="bm-cheek" cx="39" cy="82" r="5"/><circle class="bm-cheek" cx="81" cy="82" r="5"/>
    <path class="bm-smile" d="M52 85 Q60 94 68 85"/>
    <path class="bm-arm-l" d="M31 84 Q20 90 22 100"/>
    <g class="bm-arm"><path d="M89 86 Q104 80 104 66"/><circle cx="104" cy="64" r="3.6"/></g>
  </g>
</svg>`;
}

// Friendly waiting state: live mascot + a status line that changes every couple of seconds.
export function mountThinking(el, lines = ASK_LINES, every = 2300) {
  let i = 0;
  el.innerHTML = `<div class="thinking" role="status">${mascotSvg({ live: true, size: 72 })}<span class="tline">${lines[0]}</span></div>`;
  const line = el.querySelector('.tline');
  const t = setInterval(() => { i = (i + 1) % lines.length; line.classList.remove('in'); void line.offsetWidth; line.textContent = lines[i]; line.classList.add('in'); }, every);
  return () => clearInterval(t);
}
