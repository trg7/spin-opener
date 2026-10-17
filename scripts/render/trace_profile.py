"""Trace the side mask into a simplified SVG path in mm (origin: tip at bottom centre). Usage: trace.py mask.png"""
import sys, json
from PIL import Image
im = Image.open(sys.argv[1]).getchannel('A'); W, H = im.size; px = im.load()
PPM, CZ = 10.0, 33.0  # px per mm; camera centre height (mm)
rows = []
for y in range(H):
    xs = [x for x in range(W) if px[x, y] > 127]
    if xs:
        z = CZ + (H / 2 - (y + 0.5)) / PPM
        rows.append((z, (xs[-1] + 1 - W / 2) / PPM, (xs[0] - W / 2) / PPM))
zmin = min(r[0] for r in rows)
right = [(r[1], r[0] - zmin) for r in rows]          # top -> bottom
left = [(r[2], r[0] - zmin) for r in reversed(rows)]  # bottom -> top
def rdp(pts, eps):
    if len(pts) < 3: return pts
    (x1, y1), (x2, y2) = pts[0], pts[-1]
    dx, dy = x2 - x1, y2 - y1; L = (dx * dx + dy * dy) ** 0.5 or 1e-9
    d = [abs(dy * x - dx * y + x2 * y1 - y2 * x1) / L for x, y in pts]
    i = max(range(len(d)), key=d.__getitem__)
    return rdp(pts[:i + 1], eps)[:-1] + rdp(pts[i:], eps) if d[i] > eps else [pts[0], pts[-1]]
outline = rdp(right, 0.12) + rdp(left, 0.12)
height = max(r[0] for r in rows) - zmin
radius = max(max(abs(r[1]), abs(r[2])) for r in rows)
print(json.dumps({'points': len(outline), 'height_mm': round(height, 2), 'diameter_mm': round(2 * radius, 2)}))
# SVG: x right, y down; mm units; viewBox origin at (-radius, 0) with height at top
path = 'M' + ' L'.join(f'{x:.2f} {height - z:.2f}' for x, z in outline) + ' Z'
open(sys.argv[1].replace('.png', '.path.txt'), 'w').write(path)
print(path[:300], '...')
