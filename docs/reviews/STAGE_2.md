# Stage 2 review — motion

_2026-10-17 · `npm run screenshots` (Playwright Chromium) → `screenshots/<viewport>/motion/`._

## Built

| Section           | Motion                                                                                                                                 | Verified                                                                         |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Hero              | Load intro (construction → object settle → copy → CTA by ≈0.85s); scroll push-in                                                       | Mid-intro + settled captures, all viewports                                      |
| Spin              | **Single pin.** ≥768: technical drawing → rest → spin → fast spin (+ blur ≤4px), footnote, hold. <768: pull-back on the portrait frame | Frames at 0/30/55/80/100%; reverse frame pixel-identical; exactly one pin (unit) |
| Bottle reveal     | Scrubbed clip-path open + settle; underside → bottle crossfade (≥768)                                                                  | Start/mid/end captures                                                           |
| Lifestyle, Making | Copy fade-up (reversible) + parallax                                                                                                   | Static captures                                                                  |
| Details           | Staggered rise-in, once                                                                                                                | Static captures                                                                  |
| Drawer            | CSS slide-in / backdrop fade                                                                                                           | Drawer capture                                                                   |
| Reduced motion    | No triggers, no pin, static end frames                                                                                                 | Playwright (no `.pin-spacer`) + unit                                             |
| Anchors           | `#shop` lands at top past the pin                                                                                                      | Playwright (±4px)                                                                |
| Errors            | No console errors while scrolling                                                                                                      | Playwright                                                                       |

## Differences from the storyboard / plan

1. Mobile spin is a pull-back, not a frame sequence (only one portrait frame exists) — D-025.
2. The desktop pin holds the band centred rather than full-screen — D-026.
3. No separate motion-ring overlay (rings are baked into the AI frames); no reveal callout; no "cap pops off" (would need a separate cap asset).
4. "Subtle lighting shift" and "camera moves under the object" (storyboard 02/03) are not achievable with stills; they need video or renders.
5. Chapter index (01–07) not added.

## Open items

- Real assets will transform this section: a 2–3 s spin video or a 24–48 frame sequence (landscape + portrait) and a real underside → opening sequence.
- JS bundle is 126 kB gzipped (React + GSAP/ScrollTrigger). Fine for a prototype; consider splitting motion code in Stage 4.
- Physical iOS/Android test (URL-bar resize, pin smoothness under touch) still to do (Stage 4).
