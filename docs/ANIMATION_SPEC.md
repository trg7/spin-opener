# Animation spec

Principle (style guide §05): **Scroll = reveal, not friction.** Pin briefly; reversible; reduced
complexity on mobile. Implemented in Stage 2. All numbers live in `designTokens.motion`.

## Engine

- GSAP 3.15 + ScrollTrigger, registered once in `src/motion/gsap.ts`. Features import GSAP from there, never from `'gsap'`.
- Each animated feature owns `use<Feature>Motion(ref)` built with `useGSAP({ scope })` → automatic revert on unmount/HMR.
- `gsap.matchMedia()` contexts from `designTokens.motion.queries`: `small` (<768, motion OK), `large` (≥768, motion OK), `reduced`. Nothing is registered under `reduced`.
- **Markup is the static end state.** Hidden animation layers carry `invisible opacity-0` classes; timelines set their start states with `fromTo`. No-JS and reduced-motion therefore show the final frame with no flash.
- `ScrollTrigger.config({ ignoreMobileResize: true })`. `MotionProvider` calls `ScrollTrigger.refresh()` after `document.fonts.ready` and `window.load`. No `normalizeScroll`, no smooth-scroll library.
- Animate `transform`/`opacity`/`clip-path`, plus a capped `filter: blur()` on one spin layer. Images carry explicit dimensions → no layout shift.
- Shared helpers: `src/motion/presets.ts` (`fadeUpOnEnter`, `parallax`), `src/motion/useStoryBandMotion.ts`.

## Sequence (as built)

> Since D-050 the header is sticky: the spin pin starts below it (`top <header>px` / centred in the space under it) and anchors land below it.
>
> Page order since D-047: Hero → Spin → **Lifestyle + stand (03)** → **Reveal (04)** → Configurator → Details → Making. Row numbers below are the original spec ids.

| #   | Section                 | Trigger (start → end)                                                                                    | Behaviour                                                                                                                                                                                      | <768                                                                                | Reduced motion             |
| --- | ----------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------- |
| 1   | Hero intro              | page load, `heroIntro.delay` 0.1s                                                                        | Construction circles/lines scale+fade in (staggered), object settles from −4° / y 18, heading lines + support rise, purchase row at 0.25s (fully visible ≈0.85s), annotations 0.8s, views 0.6s | Same, fewer construction elements                                                   | Static                     |
| 1b  | Hero scroll             | hero `top top` → `bottom top`, scrub                                                                     | Object scale 1 → 1.04                                                                                                                                                                          | 1.02                                                                                | None                       |
| 2   | **Spin (the only pin)** | start `top top` if the section fills the viewport, else `center center`; end `+=220%` of vh; `scrub 0.6` | 5–30%: technical drawing layer fades out → 40–60%: `spinRest` fades revealing `spinMotion` → 65–85%: `spinMotionFast` fades in with blur 0 → 4px → 80–90%: footnote → hold                     | Pin `top top`, `+=100%`: single portrait frame pulls back 1.14 → 1; footnote at 60% | No pin; `spinMotion` frame |
| 3   | Bottle reveal           | section `top 85%` → `center 45%`, scrub, not pinned                                                      | Clip `inset(10% 8%)` → 0, layers scale 1.15 → 1; underside close-up fades to bottle-in-use at 50–85%                                                                                           | Clip + scale on the portrait frame only                                             | Static `bottleReveal`      |
| 4   | Lifestyle + stand       | copy: `top 75%` toggle (reverses); media: `top bottom` → `bottom top` scrub                              | Copy (incl. "Explore the stand") fades up; image parallax ±60px at scale 1.1                                                                                                                   | ±24px                                                                               | Static                     |
| 5   | Configurator            | —                                                                                                        | CSS transitions only (selection border, swatch ring, button press 0.98)                                                                                                                        | Same                                                                                | Transitions ≈0             |
| 6   | Details                 | `top 75%`, once                                                                                          | Spec rows, drawing and close-ups rise in, staggered                                                                                                                                            | Same                                                                                | Static                     |
| 7   | Making                  | as Lifestyle                                                                                             | Copy fade-up + parallax                                                                                                                                                                        | ±24px                                                                               | Static                     |
| —   | Cart drawer             | dialog open/close                                                                                        | CSS `@starting-style` slide from right, backdrop fade, `duration.drawer`                                                                                                                       | Same                                                                                | Instant                    |
| —   | Sticky purchase bar     | IntersectionObserver on the mobile hero CTA + `#shop`                                                    | CSS translate-y slide                                                                                                                                                                          | Mobile only                                                                         | Instant                    |

## Deviations from the original plan (and why)

- **Mobile spin has no frame crossfade.** Only one portrait frame exists (UX board crop). Cropping the landscape frames to portrait would mean a ~7× upscale. Mobile instead gets a short (100%) pin with a pull-back. Restore the full crossfade when a portrait video or frame sequence lands (D-025).
- **Desktop pin holds the band centred** (`center center`) rather than full-screen, so the low-resolution frames aren't stretched to fill 1440×900 (D-026).
- **Motion-ring SVG overlay dropped.** The AI frames already contain baked motion rings, and an overlay would need per-aspect alignment with an object-cover image.
- **Reveal callout leader line not added.** The opener's position in the placeholder is unreliable; add it with the real photo.
- **Chapter index (01–07) not added.** Deferred to Stage 4 polish if wanted.

## Verification (`npm run screenshots` → `tests/visual/motion.spec.ts`)

- The spin pin exists at every viewport; frames are captured at 0/30/55/80/100% into `screenshots/<vp>/motion/`.
- **Reversibility:** a frame at 30% reached by scrolling back up is pixel-identical to the forward frame.
- `#shop` anchor lands at viewport top (±4px) past the pin.
- Reduced motion: no `.pin-spacer` in the DOM; static spin frame captured.
- The page logs no console errors while scrolling (`screenshots.spec.ts`).
- Unit (`useSpinMotion.test.tsx`): exactly one pinned trigger when motion is allowed, none under reduced motion, triggers killed on unmount.

## Robustness notes

- ScrollTriggers are created in DOM order (sibling effects run in order), so triggers after the pin include its spacing.
- `invalidateOnRefresh` on the pin, with function-based start/end → recalculated on resize/orientation change.
- `html { scroll-behavior: smooth }` is kept; ScrollTrigger disables it during refresh internally. If anchor jumps misbehave on a device, remove it first.
- Not yet tested on a physical iOS device (URL-bar resize, `svh`). Stage 4.
