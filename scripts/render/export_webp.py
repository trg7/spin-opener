"""
Export a rig render (RGBA PNG) to web WebP, fading the shadow-catcher shadow to zero inside an
ellipse around the contact point so no rectangular edge shows on the page.

  python3 -I scripts/render/export_webp.py in.png out.webp [--shadow CX CY RX RY] [--width W]

CX/CY/RX/RY are fractions of the image size. The object (alpha ≥ 0.97, dilated 4 px) is never
faded — only the semi-transparent shadow around it.
"""
import argparse
from PIL import Image, ImageChops, ImageFilter

ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('dst')
ap.add_argument('--shadow', nargs=4, type=float, metavar=('CX', 'CY', 'RX', 'RY'))
ap.add_argument('--width', type=int)
ap.add_argument('--quality', type=int, default=86)
a = ap.parse_args()

im = Image.open(a.src).convert('RGBA')
if a.shadow:
    W, H = im.size
    cx, cy, rx, ry = a.shadow[0] * W, a.shadow[1] * H, a.shadow[2] * W, a.shadow[3] * H
    alpha = im.getchannel('A')
    obj = alpha.point(lambda v: 255 if v >= 247 else 0).filter(ImageFilter.MaxFilter(9))
    # elliptical falloff: 1 inside 55 % of the ellipse, smooth to 0 at its edge
    fall = Image.new('L', im.size)
    px = fall.load()
    for y in range(H):
        dy = (y - cy) / ry
        for x in range(W):
            d = (((x - cx) / rx) ** 2 + dy * dy) ** 0.5
            t = min(max((d - 0.55) / 0.45, 0.0), 1.0)
            px[x, y] = int(255 * (1 - t * t * (3 - 2 * t)))
    faded = ImageChops.multiply(alpha, fall)
    im.putalpha(ImageChops.lighter(ImageChops.multiply(alpha, obj), faded))
if a.width:
    im = im.resize((a.width, round(im.height * a.width / im.width)), Image.LANCZOS)
im.save(a.dst, 'WEBP', quality=a.quality, alpha_quality=90, method=6)
print(a.dst, im.size)
