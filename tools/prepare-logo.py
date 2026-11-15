#!/usr/bin/env python3
"""Prepares the shop logo for the app.
Input : assets/sewing-studio-logo.jpg   (embroidered logo on a grey background – copy the file there first)
Output: assets/sewing-studio-logo.webp  (transparent background, cropped, max 600px wide – used by the app)
        assets/sewing-studio-logo.png   (same, PNG)
Also prints the logo's teal (median of the saturated teal pixels) so css/app.css --teal can match it.
Usage : python3 tools/prepare-logo.py [input.jpg]
"""
import sys, colorsys
import numpy as np
from PIL import Image

src = sys.argv[1] if len(sys.argv) > 1 else 'assets/sewing-studio-logo.jpg'
im = Image.open(src).convert('RGB')
# the photo has a thin dark border: trim it off
BORDER = 10
im = im.crop((BORDER, BORDER, im.width - BORDER, im.height - BORDER))
a = np.asarray(im).astype(np.float32)
h, w, _ = a.shape
# background colour = median of a 6px frame round the picture
frame = np.concatenate([a[:6].reshape(-1, 3), a[-6:].reshape(-1, 3), a[:, :6].reshape(-1, 3), a[:, -6:].reshape(-1, 3)])
bg = np.median(frame, axis=0)
dist = np.sqrt(((a - bg) ** 2).sum(axis=2))
alpha = np.clip((dist - 22) / 46, 0, 1)                    # soft edge: close to bg -> transparent
# keep the biggest connected blob area tidy: drop isolated specks (JPEG noise) with a simple 3x3 majority filter
from PIL import ImageFilter
am = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.MedianFilter(3))
alpha = np.asarray(am).astype(np.float32) / 255
# un-mix the background from semi-transparent edge pixels so there is no grey halo
al = np.maximum(alpha, 1e-3)[..., None]
rgb = np.clip((a - bg * (1 - al)) / al, 0, 255)
rgb = np.where(alpha[..., None] > 0.02, rgb, 0)
out = np.dstack([rgb, alpha * 255]).astype(np.uint8)
img = Image.fromarray(out, 'RGBA')
bbox = Image.fromarray((alpha > 0.15).astype(np.uint8) * 255).getbbox()
pad = 6
if bbox:
    img = img.crop((max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(w, bbox[2] + pad), min(h, bbox[3] + pad)))
if img.width > 600:
    img = img.resize((600, round(img.height * 600 / img.width)), Image.LANCZOS)
img.save('assets/sewing-studio-logo.png', optimize=True)
img.save('assets/sewing-studio-logo.webp', quality=88, method=6)
# sample the teal: median of the lit thread pixels (green-teal hue, saturated, not the dark shadowed stitches)
def lum(c):
    f = lambda v: v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = [f(x / 255) for x in c]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
def contrast(c1, c2):
    a, b = sorted([lum(c1), lum(c2)], reverse=True)
    return (a + 0.05) / (b + 0.05)
px = np.asarray(img).reshape(-1, 4)
px = px[px[:, 3] > 230][:, :3]
teal = []
for r, g, b in px:
    hh, ss, vv = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
    if 140 < hh * 360 < 180 and ss > 0.3 and vv > 0.35:
        teal.append((r, g, b))
if teal:
    t = np.median(np.array(teal), axis=0).astype(int)
    print('teal (median of %d lit-thread px): #%02x%02x%02x' % (len(teal), *t), '| white-on-teal contrast %.2f' % contrast((255, 255, 255), t))
else:
    print('no teal pixels found – check the input image')
print('background was rgb', bg.astype(int).tolist(), '-> wrote assets/sewing-studio-logo.webp and .png', img.size)
