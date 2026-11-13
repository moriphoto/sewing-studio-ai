# Sewing Studio AI

A phone-first helper for the machines at **The Sewing Studio, Redruth** – starting with the **Bernette b59** sewing and embroidery machine, with a generic layout for Brother, Bernina and Janome.

Live: the Netlify site linked to this repo (installable as an app – "Add to Home screen").

## What it does

| Tab | What you get |
|---|---|
| **Machine** | Original labelled diagrams (front, thread path, needle area, bobbin area, needle anatomy, controls, screens, embroidery module, hoop, back). Tap a lettered marker or list row to see what a part does, jump to the guide step that uses it, or ask the AI. |
| **Guides** | Step-by-step guides with an illustration per step, a checklist, "Mark done" and saved progress: **Embroidery setup (b59)**, **Threading**, **Bobbin winding & inserting**, **Sewing mode setup**, **Changing the presser foot**, **Changing the needle**. |
| **Gear** | ~35 presser feet, hoops and needles with an icon/diagram, what each is for, when to use it, and how to fit it. Filtered by the selected machine. |
| **Manuals** | Verified links to the official manuals; upload your own PDF (kept on the device in IndexedDB) and read it in-app with page jumping – offline. The b59 page has a "where to look" table of topics → pages. |
| **Ask AI** | Ask a question (optionally with a photo). Answers are grounded in the selected machine and the app's own guides/diagrams/gear, and link back to the exact step. Without AI, a local keyword search of the same content is used. |

Everything except the AI works **offline** (service worker + local storage). The PDF viewer needs one online visit first so pdf.js can be cached.

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

## Enabling the AI (Netlify)

The AI runs in a Netlify Function (`netlify/functions/ask.mts`, route `/api/ask`) through **Netlify AI Gateway**. There are **no API keys in this repo or in the browser**: the gateway injects the credentials into the function at runtime.

1. In Netlify, make sure **AI Features / AI Gateway** is enabled for the team (Team settings → AI features).
2. Deploy once after pushing (a push to `main` does this when the site is linked to the repo). The gateway is activated by a production deploy.
3. Done. Optional: set the `SSAI_MODEL` environment variable to pick a different model.

Until then the Ask tab shows **"AI not configured"** and falls back to local search.

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
- `js/manuals.js` – IndexedDB storage + pdf.js viewer
- `js/ask.js`, `js/app.js`, `css/app.css`, `sw.js`, `manifest.webmanifest`

## Limitations

- Diagrams are schematic drawings, not photographs, and not to scale.
- The generic layout for Brother/Bernina/Janome reuses the b59 text with a banner; the embroidery guide is b59-only.
- No PNG touch icon for iOS (SVG icons only).
- Releases: bump `VERSION` in `sw.js` on every release so installed copies pick up new files (the service worker serves cached files first, then refreshes them, so users may see the previous version for one load).
- Marker positions on the diagrams are nudged apart automatically on small screens, with a small leader line back to the real part.
- Always check important steps against the official manual.
