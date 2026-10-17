# Implementation plan

Stop for user review after each stage. Commits listed are the intended focused milestones.

## Stage 0 — Foundation ✅

- [x] Inspect starter kit, style guide, three boards; audit (`REFERENCE_AUDIT.md`)
- [x] Copy originals into `references/`
- [x] Crop provisional assets from AI board (`ASSET_MANIFEST.md`)
- [x] Tooling: Vite, TS strict, Tailwind v4, ESLint, Prettier, Vitest
- [x] Tokens, copy, catalogue, asset manifest, commerce types + adapter interface
- [x] Data tests (token parity, contrast, catalogue rules, manifest files)
- [x] `AGENTS.md` + docs; baseline commit

## Stage 1 — Static fidelity ✅

See `docs/reviews/STAGE_1.md` for the screenshot review and mismatch report.

- [x] Playwright + screenshot script (390/768/1440) — `chore(tooling)`
- [x] UI primitives: Button, Eyebrow, Price, ResponsiveImage (fallback + badge), icons, QuantityStepper, Swatch — `feat(ui)`
- [x] Technical SVGs: ConstructionGeometry, TechnicalViews, AnnotationCallout — `feat(technical)`
- [x] Header (wordmark placeholder, nav, bag), footer, section shell — `feat(layout)`
- [x] Hero (mobile first) — `feat(hero)`
- [x] Spin, Reveal, Lifestyle + stand (static end states) — `feat(story)`
- [x] Configurator (static, interactive selection UI) + Details + Manufacturing — `feat(configurator)`, `feat(details)`
- [x] Sticky purchase bar + static cart drawer UI — `feat(layout)`
- [x] Screenshot comparison vs boards, mismatch report, fixes — `fix(visual)`

## Stage 2 — Motion ✅

See `docs/reviews/STAGE_2.md`.

- [x] GSAP provider, `useReducedMotion`, matchMedia contexts — `feat(motion)`
- [x] Hero intro + scroll push-in
- [x] Pinned spin sequence (checkpoint commit before) — `feat(motion): add scroll-driven spin`
- [x] Bottle reveal, lifestyle parallax, details draw, manufacturing pan
- [x] Test: reverse scroll, resize, reduced motion, anchor nav, iOS touch

## Render pass (between Stages 2 and 3) — reverted on main (D-046), kept on `experiment/blender-story`

- [x] Studio renders from the 3D model: hero, configurator thumbnail, underside
- [x] Technical drawings traced from the model; real dimensions (62 × 65 mm)
- [x] Spin frame sequence from the model (36 frames, landscape + portrait)

## Stage 3 — Commerce

1. `mockCommerceAdapter` + unit tests (bundle-as-one-line, TBC, bounds) — `feat(cart)`
2. Zustand cart store + provider
3. Wire configurator, hero CTA, sticky bar → add to bag; drawer lines/qty/remove; added-to-bag confirmation
4. Mock checkout notice; component tests

## Stage 4 — Refinement

Mobile perf, type/spacing/timing polish, a11y audit, Lighthouse, metadata/OG, real-vs-placeholder register, Shopify swap notes.

## Blocking inputs (ask client)

1. Original wordmark (SVG preferred)
2. Real product photographs (especially underside/opener mechanism)
3. Confirmed dimensions, materials, care
4. Confirmed colour range (top, stand)
5. Stand + bundle prices
6. Shipping/returns/contact copy
7. Typeface choice/licence
