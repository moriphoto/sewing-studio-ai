#!/usr/bin/env node
// Static sanity check for every built model: each diagram part has an anchor in its scene, each guide-step
// highlight exists, accessory ids referenced by steps exist, and no step text is empty.
import { MACHINES, viewsFor, guidesFor, accessoryById } from '../js/registry.js';
import { renderScene } from '../js/svg.js';
let bad = 0; const fail = (m) => { bad++; console.log('FAIL', m); };
for (const m of MACHINES.filter(x => x.model)) {
  for (const v of viewsFor(m.id)) {
    const sc = renderScene(v.scene, v.sopts || {});
    for (const p of v.parts) if (!sc.anchors[p.id]) fail(`${m.id} view ${v.id}: no anchor ${p.id}`);
  }
  for (const g of guidesFor(m.id)) for (const [i, st] of g.steps.entries()) {
    const sc = renderScene(st.scene, { ...(st.soptsOverride || {}), ...st.so });
    for (const h of st.so.hl || []) if (!sc.anchors[h]) fail(`${m.id} ${g.id} step ${i + 1}: hl ${h} has no anchor`);
    for (const a of st.acc || []) if (!accessoryById(a)) fail(`${m.id} ${g.id} step ${i + 1}: unknown accessory ${a}`);
    if (!st.t || !st.b) fail(`${m.id} ${g.id} step ${i + 1}: empty text`);
  }
}
console.log(bad ? `${bad} problem(s)` : 'all models structurally OK');
process.exit(bad ? 1 : 0);
