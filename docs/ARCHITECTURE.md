# Architecture

React 19 + Vite 8 + TypeScript (strict) · Tailwind CSS v4 · GSAP 3 + ScrollTrigger (`@gsap/react`)
· Zustand 5 · Vitest 4 + Testing Library. No Shopify dependency in this phase.

## Layers

```
content/  config/  data/          ← copy, tokens, flags, catalogue, asset manifest (pure data)
      │       │       │
      ▼       ▼       ▼
commerce/ (types, CommerceAdapter, mockCommerceAdapter)   ← no React
      │
      ▼
store (Zustand: cart + drawer UI state, calls the adapter)
      │
      ▼
components/ui · components/technical · components/layout · components/commerce
      │
      ▼
features/<section>/  (each homepage section + its animation hook)
      │
      ▼
app/App.tsx  (composition only)
```

Dependency rule: arrows point down only. Features never import other features. `components/ui`
never imports data or the store.

## Page / component hierarchy (planned for Stage 1)

```
App
├─ SkipLink
├─ SiteHeader                      components/layout
│   ├─ Wordmark                    (asset or labelled placeholder)
│   ├─ PrimaryNav                  Shop · Story · Details (anchor links; hidden <768, see D-008)
│   └─ CartButton                  bag icon + count → opens CartDrawer
├─ main
│   ├─ HeroSection                 features/hero          #top
│   │   ├─ ConstructionGeometry    components/technical (circles, grid, dims)
│   │   ├─ ProductStage            ResponsiveImage(heroPrimary)
│   │   ├─ AnnotationCallout ×2    "Smooth, balanced spin" / "Opens bottles" (desktop; 0 on mobile)
│   │   ├─ TechnicalViews          top/side/bottom (desktop only)
│   │   └─ PurchaseRow             Price (top) + AddToBagButton
│   ├─ SpinSequence                features/spin-sequence  #story   (the ONE pinned section)
│   ├─ BottleReveal                features/bottle-reveal
│   ├─ LifestyleStand              features/lifestyle-stand  ("Explore the stand" → #shop)
│   ├─ ProductConfigurator         features/product-configurator  #shop
│   │   ├─ SetupOption ×3          top · stand · top+stand (radio group semantics)
│   │   ├─ OptionDetail            inline expand (stand description, image)
│   │   ├─ ColourSwatches          confirmed colours only
│   │   ├─ QuantityStepper
│   │   └─ AddToBagButton          disabled-with-reason for TBC? → see D-006
│   ├─ DetailsSection              features/details  #details
│   │   ├─ TechnicalDrawing        side + top views, dimensions TBC
│   │   └─ SpecList                materials / care / dimensions placeholders
│   └─ ManufacturingSection        features/manufacturing
├─ SiteFooter                      components/layout
├─ StickyPurchaseBar               components/layout (mobile, appears after hero CTA leaves view)
└─ CartDrawer                      components/commerce (dialog, focus trap, Esc, swipe-safe)
    ├─ CartLineItem ×n             image, title, colour, QuantityStepper, remove
    ├─ CartSummary                 subtotal or "Price TBC" notice
    └─ CheckoutButton              → "Prototype — checkout unavailable"
```

Shared UI primitives (`components/ui`): `Button`, `Eyebrow`, `SectionHeading`, `Price`
(handles provisional/TBC), `QuantityStepper`, `Swatch`, `ResponsiveImage` (manifest key → `<img>`
with width/height, lazy loading, error fallback, optional "Prototype image" badge), `icons`.

## Commerce

- `commerce/types.ts` — `Product`, `ProductVariant`, `Colour`, `Money` (integer cents), `Cart`,
  `CartLine`, `CheckoutResult`. Shapes map to Shopify Storefront `Product/ProductVariant/Cart`.
- `commerce/commerceAdapter.ts` — the interface. UI depends on this only.
- `commerce/mockCommerceAdapter.ts` _(Stage 3)_ — in-memory implementation; computes line totals;
  subtotal `null` when any line is TBC; `beginCheckout()` → `{ status: 'unavailable' }`.
- `store/uiStore.ts` _(Stage 1)_ — drawer open state only.
- `store/cartStore.ts` _(Stage 3)_ — Zustand store: cart snapshot, `isDrawerOpen`, async actions
  delegating to the adapter. Swap adapters in `app/providers/`.
- Bundles are a single variant/line. Quantity bounds 1–10 (TBC with client).

Future Shopify swap: implement `shopifyCommerceAdapter.ts`, map `gid://` ids into `products.ts` (or
fetch the catalogue), switch the provider. No visual component changes.

## Assets

`data/assetManifest.ts` maps semantic keys → `{ src, width, height, alt, status, replaceWith }`.
Lint forbids `'/assets/...'` literals elsewhere. Replacing an image = editing one manifest entry.

## Animation

Each animated feature owns `use<Feature>Motion.ts`, called with refs from its component, built
with `useGSAP` + `gsap.matchMedia()`. Durations/lengths come from `designTokens.motion`.
See `ANIMATION_SPEC.md`.

## Testing

- `tests/` — cross-cutting data tests (tokens, catalogue, manifest).
- `src/**/*.test.ts(x)` — co-located unit/component tests.
- Stage 1 adds Playwright for screenshots at 390/768/1440 (`tests/visual/`).

## Deviations from the suggested tree

- Added `src/utils/money.ts`, `src/data/assetManifest.ts`, `src/styles/theme.css`, `src/store/` (Stage 3),
  `docs/IMPLEMENTATION_PLAN.md`. Reason: keeps formatting, asset paths, CSS tokens and app state each in one place.
- `public/assets/motion/` holds spin/reveal stills (brief lists `motion/` for animation assets).
