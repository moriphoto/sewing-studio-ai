# Bobbin – by The Sewing Studio

**Bobbin** is a phone-first, friendly helper for the machines at **The Sewing Studio, Redruth** – starting with the **Bernette b59** sewing and embroidery machine, with a generic layout for Brother, Bernina and Janome.

Live: the Netlify site linked to this repo (installable as an app – "Add to Home screen").

## What it does

| Tab | What you get |
|---|---|
| **Machine** | Original labelled diagrams (front, thread path, needle area, bobbin area, needle anatomy, controls, screens, embroidery module, hoop, back). Tap a lettered marker or list row to see what a part does, jump to the guide step that uses it, or ask the AI. |
| **Guides** | Step-by-step guides with an illustration per step, a checklist, "Mark done" and saved progress: **Embroidery setup (b59)**, **Threading**, **Bobbin winding & inserting**, **Sewing mode setup**, **Changing the presser foot**, **Changing the needle**. |
| **Gear** | ~35 presser feet, hoops and needles with an icon/diagram, what each is for, when to use it, and how to fit it. Filtered by the selected machine. |
| **Manuals** | Verified links to the official manuals, plus a "where to look" table of topics → pages. |
| **Ask Bobbin** | Ask a question (optionally with a photo). Answers are grounded in the selected machine and the app's own guides/diagrams/gear, and link back to the exact step. Without the helper switched on, a local keyword search of the same content is used. |

Everything except Bobbin's answers and photo search works **offline** (service worker + local storage).

**Home** is a welcome page (`#/`) with a camera button: the photo is shrunk to ~1024px on the phone, sent to `/api/identify`, and the top 2–3 matches from the registry are shown to confirm. **Browse** (`#/browse`) is the machine picker. The b59 threading viewer is at `#/thread/b59/upper/1`.

### Where Bobbin's answers come from (developer note)
Both `/api/ask` and `/api/identify` pick a provider in `netlify/lib/ai.ts`: the **Netlify AI Gateway** is the default (no key to manage; Netlify injects it). Gemini Flash-Lite (model id `gemini-3.5-flash-lite`, override with `SSAI_GEMINI_MODEL`) is called over plain REST only when **both** `SSAI_AI_PROVIDER=gemini` and `GEMINI_API_KEY` are set. A `GEMINI_API_KEY` on its own is ignored. If the gateway isn't available the app falls back to local search.

### Name, logo, colours, icons
- The name and tagline live in `APP_NAME` / `TAGLINE` in `js/config.js` (the static `<title>` and meta description in `index.html`, and `manifest.webmanifest`, keep their own copy).
- Customer-facing wording never says "AI": the helper is just **Bobbin**. Internal names (`GEMINI_API_KEY`, `/api/ask`, `netlify/lib/ai.ts`) stay as they are.
- The shop logo is `SHOP.logo` (`assets/sewing-studio-logo.webp`). Put the original in `assets/sewing-studio-logo.jpg` and run `python3 tools/prepare-logo.py`: it removes the grey background, writes the webp and png, and prints the logo's thread colour for reference (the app keeps its original teal blue `#008080`, set in `--teal` in `css/app.css` and `TEAL` in `tools/make-icons.mjs`). Until the file exists the app shows the shop name as text.
- The mascot (`js/mascot.js`) is the loading state, the answer avatar and the app icon. `node tools/make-icons.mjs` rebuilds `icons/*` (and the root `favicon.ico`) from it: the full character for home-screen icons, and a simplified bold-face drawing for the 16px/32px favicon so it stays readable in a browser tab.

## Manuals and copyright

The app **does not contain manual text or images**. It links to the manufacturers' own downloads, and everything shown is original wording and drawings. Page numbers refer to the English 2026-03 edition of the b59 manual and may be ±1–2 pages in other editions.

Official links used (all checked on 13 Nov 2026):

- b59 user manual PDF – `https://www.bernette.com/assets/uploads/general/Downloads/User-Manual/50-Series/b59/5200059_00A_04_web_manual_b59_2026-03_EN.pdf`
- b59 quick start guide PDF – `https://www.bernette.com/assets/uploads/general/Downloads/Quick-Start-Guide/50-Series/b59/5200059_00A_04_web_qsg_b59_2026-01_EN.pdf`
- b59 online manual – `https://manuals.bernette.com/b59/`
- bernette support – `https://www.bernette.com/support`
- Brother – `https://support.brother.com/g/b/midlink.aspx?content=ml`
- BERNINA – `https://www.bernina.com/en-GB/Support-GB`
- Janome – `https://www.janome.com/support/manuals/` and `https://www7.janome.co.jp/global_search/manual/`

(Browsers can't fetch the official PDFs directly into the app because of cross-origin rules, so download them and use **Add a PDF manual**.)

## Switching Bobbin on (Netlify)

Bobbin's answers come from a Netlify Function (`netlify/functions/ask.mts`, route `/api/ask`) through **Netlify AI Gateway**. There are **no API keys in this repo or in the browser**: the gateway injects the credentials into the function at runtime.

1. In Netlify, make sure **AI Features / AI Gateway** is enabled for the team (Team settings → AI features).
2. Deploy once after pushing (a push to `main` does this when the site is linked to the repo). The gateway is activated by a production deploy.
3. Done. Optional: set the `SSAI_MODEL` environment variable to pick a different model.

Until then the Ask tab shows **"Bobbin is resting"** and falls back to local search.

Design notes: the function only runs when someone presses Ask (never on page load), is rate limited to 10 requests/minute per IP, sends the last few turns plus a compact slice of the app content relevant to the question, and strips any reference the model makes up that isn't in that content.

## Run locally

```bash
python3 -m http.server 8801      # static app; Ask falls back to local search
npm install --no-save esbuild && node tests/function.test.mjs   # function tests (stubbed model)
npx netlify dev                  # to try the function itself (needs the site linked)
```

## Layout of the code

- `js/content.js` – machines, diagram parts, accessories, manual links
- `js/guides.js` – the six guides and their steps
- `js/svg.js` – original SVG scenes (parts, highlights, arrows) used by diagrams and steps
- `js/search.js` – local search + reference resolver (shared with the function)
- `js/threadviewer.js` – reusable step-by-step thread viewer; `js/threading/b59.js` – the b59 drawings and steps (a config another machine can copy)
- `js/identify.js` (camera flow, client) and `js/identify-match.js` (matches model output to the registry; shared with `netlify/functions/identify.mts`)
- `js/config.js` – app name and shop details
- `js/registry.js` – single lookup for "what do we know about machine X?" (b59, generic brand layouts, per-model data)
- `js/machines/<model>.js` – one data file per machine (facts, links, manual pages, part wording, accessories); `index.js` lists them (static imports only)
- `js/templates.js` – turns a model data file into diagram views and setup guides (profiles: `panel`, `mech`, `lock`)
- `js/machines/catalog.js` – the shop's full machine list (generated from `data/machine-list.json` by `tools/build-catalog.mjs`); drives the Browse page
- `js/machines/verified-pages.js` – "where to look in the manual" rows that passed `tools/verify-pages.mjs` (generated; unverified rows never ship)
- `js/ask.js`, `js/app.js`, `css/app.css`, `sw.js`, `manifest.webmanifest`

## Adding a machine

1. Copy the closest file in `js/machines/` (e.g. `brother-lx25.js` for a mechanical machine), change the facts, links, `t` wording and `gear`, and register it in `js/machines/index.js` and the `SHELL` list in `sw.js`.
2. Add manual page rows (`manual.pages`: topic, printed page, a phrase that appears on it), then run `node tools/verify-pages.mjs` – only rows that pass are shown in the app.
3. Run `node tests/function.test.mjs`, then the browser sweeps (`tests/e2e.cjs`, `tests/e2e-machines.cjs` against `python3 -m http.server 8801`).

## Limitations

- Diagrams are schematic drawings, not photographs, and not to scale.
- Machines without their own file (most of the 155 in the Browse list) fall back to the generic brand layout, which reuses the b59 text with a banner; the embroidery guide is b59 and model-specific only.
- Janome's manual PDFs sit behind Cloudflare, so for the Janome models the links are not machine-checked and there are no manual page links.
- No PNG touch icon for iOS (SVG icons only).
- Releases: bump `VERSION` in `sw.js` on every release so installed copies pick up new files (the service worker serves cached files first, then refreshes them, so users may see the previous version for one load).
- Marker positions on the diagrams are nudged apart automatically on small screens, with a small leader line back to the real part.
- Always check important steps against the official manual.
