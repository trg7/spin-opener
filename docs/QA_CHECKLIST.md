# QA checklist

Run per stage. Tick only what was actually verified; note the tool/device.

## Every commit

- [ ] `npm run verify` (typecheck, lint, tests, build) passes
- [ ] No hardcoded copy / price / asset path / duration in components
- [ ] Diff scoped to the task; docs updated if meaningful

## Visual (Stage 1+)

- [x] Screenshots at 390, 768, 1440 captured and compared to boards _(Stage 1, Playwright Chromium)_
- [x] Hero shows product, proposition, price and Add to Bag above the fold at 390×844
- [ ] Palette/type tokens only; no gradients, heavy radii, shadows
- [x] Placeholder imagery visibly flagged (wordmark is now final)
- [ ] No horizontal scroll at any width (320–1920)

## Motion (Stage 2+)

- [ ] Only one pinned section
- [ ] Reverse scroll restores states
- [ ] Resize / orientation change recalculates without jumps
- [ ] Anchor nav (#shop, #details, #story) lands correctly past the pin
- [ ] `prefers-reduced-motion: reduce` → static, no pin
- [ ] No CLS from images (explicit dimensions)
- [ ] Smooth on mid-range mobile (throttled CPU 4× in DevTools)

## Commerce (Stage 3+)

- [ ] Top / stand / bundle selection; bundle adds ONE line
- [ ] Only confirmed colours selectable
- [ ] Quantity bounds; line totals; remove
- [ ] TBC lines → no misleading subtotal; checkout blocked
- [ ] Checkout shows "Prototype — checkout unavailable"
- [ ] Drawer: focus trap, Esc closes, focus returns, scroll lock without layout jump, safe-area padding
- [ ] Sticky bar never covers content or the home indicator _(spin footnote lifted clear; verify on device)_

## Accessibility

- [ ] Landmarks, single h1, logical headings
- [ ] Keyboard: all controls reachable, visible focus
- [ ] Touch targets ≥ 44px
- [ ] Contrast AA (tested for text tokens)
- [ ] Alt text from manifest; decorative SVG `aria-hidden`
- [x] Configurator options use radio-group semantics (native radios, explicit names + descriptions)

## Performance

- [ ] Lighthouse mobile ≥ 90 performance, ≥ 95 accessibility
- [ ] Hero image prioritised (`fetchpriority="high"`), others lazy
- [ ] Only latin font subset downloaded
