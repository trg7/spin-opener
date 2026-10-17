# Animation spec

Principle (style guide §05): **Scroll = reveal, not friction.** Pin briefly; reversible; reduced
complexity on mobile. Implementation in Stage 2. All numbers live in `designTokens.motion`.

## Engine

- GSAP 3 + ScrollTrigger, registered once in `app/providers/`.
- Each feature exposes `use<Feature>Motion(refs)` built with `useGSAP({ scope })` → automatic revert on unmount/HMR.
- `gsap.matchMedia()` contexts: `(min-width: 768px) and (prefers-reduced-motion: no-preference)`, `(max-width: 767px) and (prefers-reduced-motion: no-preference)`, `(prefers-reduced-motion: reduce)`.
- `ScrollTrigger.config({ ignoreMobileResize: true })`; refresh after hero/spin images decode. No `normalizeScroll`, no smooth-scroll library (don't hijack native scroll).
- Animate only `transform`, `opacity`, and a capped `filter: blur()` on one layer. Images carry explicit `width`/`height` → no layout shift.

## Sequence

| #   | Section             | Trigger (start → end)                                                     | Behaviour                                                                                                                                                                                                                                                                                            | Mobile (<768)                                | Reduced motion                               |
| --- | ------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| 1   | Hero intro          | page load (not scroll)                                                    | Construction circles stroke-draw (0.9s, stagger), product fades in + settles from −4° tilt / y 12px, annotations + dimension lines draw, then copy/CTA fade up. Total ≤1.6s; CTA usable immediately (no opacity 0 on interactive elements beyond 300ms).                                             | 2 circles, no side views, annotations hidden | All static, final state                      |
| 1b  | Hero scroll         | hero `top top` → `bottom top`, scrub                                      | Subtle push-in (scale 1 → 1.04), construction lines fade to 0.4                                                                                                                                                                                                                                      | Same, scale 1.02                             | None                                         |
| 2   | **Spin (pinned)**   | section `top top` → `+=220%` (mobile `+=150%`), `pin: true`, `scrub: 0.6` | 0–15%: heading in. 10–55%: crossfade `spinRest` → `spinMotion` → `spinMotionFast`; motion ring SVG ellipses rotate & fade in; blur layer to `spinMaxBlur`. 30–70%: background shifts from technical grid (warm white) to real surface photo. 70–100%: hold, footnote "Smooth. Balanced. Satisfying." | Shorter pin, blur ≤2px, ring count halved    | No pin; show `spinMotion` still with heading |
| 3   | Bottle reveal       | section `top 80%` → `center center`, scrub (not pinned)                   | `bottleUnderside` scales 1.12 → 1 inside a clip-path inset reveal; at ~60% crossfade to `bottleReveal`; callout leader line draws + label fades. Fully reversible.                                                                                                                                   | Single image column, callout under image     | Static `bottleReveal`                        |
| 4   | Lifestyle + stand   | section enters → leaves, scrub                                            | Image `yPercent` parallax (≤ `parallax` px); heading + support fade up (toggleActions `play none none reverse`); "Explore the stand" link fades in last                                                                                                                                              | Parallax 24px                                | Static                                       |
| 5   | Configurator        | —                                                                         | No scroll motion. CSS transitions only: selection border, swatch ring, stepper press, add-to-bag tactile press (scale 0.98).                                                                                                                                                                         | Same                                         | Transitions ≈0                               |
| 6   | Details             | `top 75%`, once                                                           | Technical drawing strokes draw (stroke-dashoffset), labels fade                                                                                                                                                                                                                                      | Simplified drawing                           | Static                                       |
| 7   | Manufacturing       | enter → leave, scrub                                                      | Slight horizontal pan/parallax of print-bed image; heading fades up                                                                                                                                                                                                                                  | Vertical parallax only                       | Static                                       |
| —   | Cart drawer         | open/close                                                                | Slide from right (desktop) / bottom sheet-like from right on mobile, `duration.drawer`; backdrop fade                                                                                                                                                                                                | Full-height, safe-area padding               | Instant                                      |
| —   | Sticky purchase bar | IntersectionObserver on hero CTA                                          | Slides up when hero CTA leaves viewport; hides when configurator is in view or drawer open                                                                                                                                                                                                           | Mobile only                                  | Instant                                      |

## Why no in-plane rotation

The images are 2D photographs of a vertically spinning top. Rotating them with CSS `rotate()` would
tilt the object, not spin it — misrepresenting geometry. The spin is conveyed by frame crossfades,
motion blur, and rotating SVG motion rings. A real video/frame sequence replaces this later
(`spinMotion*` keys in the manifest).

## Robustness checklist

- Reverse scroll returns to identical states (scrubbed timelines, no `once` on scrubbed parts).
- Resize/orientation change: matchMedia contexts re-create; pin spacing recalculated.
- Anchor navigation (`#shop`) jumps past the pin correctly (verify in Stage 2).
- Touch: no scroll jank on iOS Safari (pin uses `pinType` auto; test `anticipatePin: 1`).
- Pin length kept short so users can reach commerce quickly; purchase is always available via header/sticky bar.
