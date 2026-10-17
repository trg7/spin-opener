# spin-sequence — agent notes

This is the **only pinned section** on the page. Keep it that way.

- The spin is a **scroll-scrubbed frame sequence** rendered from the 3D model
  (`sequences.spin` 1200×825 landscape, `sequences.spinPortrait` 720×1120; 36 frames each), drawn on a
  `<canvas>` by `FramePlayer` (framePlayer.ts). Frame 1 = at rest, last = full spin.
- Layers (bottom → top): construction geometry · poster `<img>` (last frame; the no-JS and
  reduced-motion state) · canvas (`invisible opacity-0` until the motion hook swaps it in) ·
  technical drawing (≥768 only; dissolves into frame 1).
- Frames preload lazily when the section is 1.5 viewports away; until a frame decodes, the nearest
  decoded frame is drawn.
- Pin start is dynamic: `top top` when the section fills the viewport (mobile overlay), otherwise
  `center center`. Pin lengths and scrub come from `designTokens.motion`.
- The part is rotationally symmetric: the visible "spin" is **precession** (a ≤3.2° tilt whose axis
  circles) plus motion blur, keyframed in `scripts/render/rig.py` (`spin_setup`). Don't CSS-rotate images.
- To change the motion: edit `spin_setup`, re-render (`spin-landscape`, `spin-portrait`), re-export.
  Frame count lives in the manifest (`sequence(..., 36, ...)`) and `SPIN_FRAMES` in the rig — keep equal.
- Copy reveal excludes `[data-spin]` children because the timeline owns the footnote.
