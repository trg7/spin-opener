"""Soft silhouette mask for the hero placeholder photo (D-050).

Keeps the product and its contact shadow, drops the photo's own beige backdrop, so the
rectangular placeholder sits on the page without a visible box. The photo's pixels are not
changed — the mask is applied in CSS (`mask-image`).

    python3 -I scripts/assets/hero_mask.py public/assets/product/hero-beauty.webp \
        public/assets/product/hero-beauty-mask.png
"""

import sys

import numpy as np
from PIL import Image
from scipy import ndimage

src, out = sys.argv[1], sys.argv[2]
rgb = np.asarray(Image.open(src).convert("RGB"), dtype=np.float64)
h, w, _ = rgb.shape
ys, xs = np.mgrid[0:h, 0:w]

# Backdrop model: quadratic in y, linear in x, fitted on the frame's outer band (no product there).
band = (xs < 0.05 * w) | (xs > 0.95 * w) | (ys < 0.15 * h)
A = np.stack([np.ones_like(ys), ys / h, (ys / h) ** 2, xs / w], -1)
coef, *_ = np.linalg.lstsq(A[band], rgb[band], rcond=None)
backdrop = A @ coef

# Product: the largest teal region, closed vertically to take in the zinc ring between disc and
# cone, plus the steel tip just under the cone.
r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
teal = (g - r > 25) & (b - r > 25)
labels, _ = ndimage.label(teal)
sizes = np.bincount(labels.ravel())
sizes[0] = 0
body = ndimage.binary_closing(labels == sizes.argmax(), structure=np.ones((15, 3)))
# Rotationally symmetric part: fill each row between its outermost pixels (closes highlight notches).
for y in np.where(body.any(1))[0]:
    cols = np.where(body[y])[0]
    body[y, cols.min() : cols.max() + 1] = True
rows = np.where(body.any(1))[0]
cone = np.where(body[rows[-1]])[0]
dist = np.linalg.norm(rgb - backdrop, axis=-1)
tip = np.zeros_like(body)
tip[rows[-1] : rows[-1] + 12, cone.min() - 2 : cone.max() + 3] = True
body |= tip & (dist > 20)
product = ndimage.gaussian_filter(ndimage.binary_dilation(body, iterations=1).astype(float), 1.0)

# Contact shadow: only pixels darker than the backdrop, only in the zone under the disc.
lum = rgb @ [0.2126, 0.7152, 0.0722]
darker = np.clip((backdrop @ [0.2126, 0.7152, 0.0722] - lum - 6) / 28, 0, 1)
bottom = ys[product > 0.5].max()
zone = np.exp(-(((xs - 0.6 * w) / (0.3 * w)) ** 4 + ((ys - bottom) / (0.07 * h)) ** 2))
shadow = ndimage.gaussian_filter(darker * zone, 3)

alpha = np.maximum(product, shadow)

# Never reach the frame edge.
edge = np.minimum.reduce([xs, w - 1 - xs, ys, h - 1 - ys]).astype(float)
alpha *= np.clip(edge / 6, 0, 1)

mask = np.zeros((h, w, 4), dtype=np.uint8)
mask[..., 3] = np.round(np.clip(alpha, 0, 1) * 255).astype(np.uint8)
Image.fromarray(mask, "RGBA").save(out, optimize=True)
print(f"{out}: {w}x{h}, coverage {alpha.mean():.1%}")
