# Render tooling

> **Not wired into the site on `main`** (D-046). The renders were reverted at the client's request;
> the integrated version lives on branch `experiment/blender-story`. Output paths below refer to that work.

Product imagery rendered from the client's 3D model (`references/3d/spin-top.blend`, 1 unit = 1 mm).
Requires Blender 5.x. Scripts are run headless with **auto-run disabled**; the `.blend` is never saved back.

```bash
B=/Applications/Blender.app/Contents/MacOS/Blender
OUT=/tmp/spin-renders

# Studio shots (Cycles, transparent film + shadow catcher). Append @fast for a 50 % / 48-sample preview.
$B -b --disable-autoexec references/3d/spin-top.blend --python scripts/render/rig.py -- $OUT hero thumb underside

# Export to the site (fades the catcher shadow inside an ellipse so no box edge shows)
python3 -I scripts/render/export_webp.py $OUT/hero.png      public/assets/product/hero-render.webp      --shadow 0.5 0.81 0.36 0.13
python3 -I scripts/render/export_webp.py $OUT/thumb.png     public/assets/product/top-render.webp       --shadow 0.5 0.80 0.36 0.14 --width 800
python3 -I scripts/render/export_webp.py $OUT/underside.png public/assets/product/underside-render.webp

# Spin sequences (~33 s/frame on an M1 Pro GPU; SPIN_RANGE=1,18,36 renders a subset for tests)
$B -b --disable-autoexec references/3d/spin-top.blend --python scripts/render/rig.py -- $OUT spin-landscape
$B -b --disable-autoexec references/3d/spin-top.blend --python scripts/render/rig.py -- $OUT spin-portrait
for f in $OUT/spin-landscape/*.png; do python3 -I scripts/render/export_webp.py $f public/assets/motion/spin/$(basename ${f%.png}).webp --shadow 0.5 0.855 0.32 0.13 --width 1200 --quality 80; done
for f in $OUT/spin-portrait/*.png;  do python3 -I scripts/render/export_webp.py $f public/assets/motion/spin-portrait/$(basename ${f%.png}).webp --shadow 0.5 0.88 0.44 0.105 --width 720 --quality 80; done

# Technical drawing outline (writes <mask>.path.txt → paste into src/components/technical/topGeometry.ts)
$B -b --disable-autoexec references/3d/spin-top.blend --python scripts/render/side_mask.py -- $OUT/mask.png
python3 -I scripts/render/trace_profile.py $OUT/mask.png
```

## Look decisions (see docs/DECISIONS.md)

- Colour: brand teal `#008E96` (the .blend's PETG material is `#077354`-ish — awaiting client confirmation).
- Standard view transform, exposure −0.7 → lit midtones ≈ `#30989B`.
- Matte PETG (roughness 0.62) with 0.2 mm layer-line bump; stainless tip; zinc-plated steel collar
  (the opener ring — no material in the model, assigned in the rig).
- Only the key light casts onto the shadow catcher → compact contact shadow.
- If the hero camera changes, re-tune `src/features/hero/HeroAnnotations.tsx` (coordinates documented there).
