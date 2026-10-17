# SPIN OPENER — Claude Code master build brief

You are the lead creative developer, senior frontend architect, motion designer and e-commerce UX engineer for SPIN OPENER. Build a high-fidelity, **working, mobile-first prototype** faithful to the supplied references. Do not generate a generic Shopify template. Do not integrate real payments or Shopify yet.

## Inputs and authority

Inspect every file in `references/` before writing implementation code. Inputs include the original SPIN OPENER wordmark, real product photographs, the approved desktop scroll-animation storyboard, mobile concept, one-page style guide, and AI-generated visual asset board. The **real photographs are authoritative for product geometry and bottle-opening mechanism**; the storyboard is authoritative for composition, section sequence and visual atmosphere; the style guide is authoritative for visual system. AI imagery is provisional and may be geometrically inaccurate. Do not present invented dimensions, colour availability, prices, production footage, reviews or packaging as facts.

Before coding, write `docs/REFERENCE_AUDIT.md` identifying each reference, what it establishes, what is provisional, and any contradictions. Make a brief plan and asset inventory. Do not block on missing details: use visibly flagged configuration placeholders.

## Brand and visual design

SPIN OPENER is a Melbourne-designed and 3D-printed spinning top with a secondary bottle-opening function, intended as a tactile curiosity, coffee-table object and gift. A companion display stand will be offered. The visual style is **playful industrial / editorial object catalogue**: warm off-white, charcoal, teal object photography, fine construction circles, delicate technical grid, original letter-spaced logo, light grotesk display typography, small uppercase annotation labels, generous negative space and highly controlled asymmetry. Avoid stock UI gradients, excessive rounded cards, emoji decoration, loud sales copy and generic template styling.

Brand copy, editable in one content file:
- Hero: `Made to spin.`
- Hero support: `A spinning top. A bottle opener. A little something for your coffee table.`
- Spin: `Go on. Give it a spin.`
- Reveal: `Oh, and it opens bottles.`
- Lifestyle + stand (combined section): `Looks good doing nothing.`
- Stand support: `A place to land when the spinning stops.`
- Commerce: `Choose your setup.`
- Manufacturing: `Made here. Made to spin.`
- Transactional buttons: `Add to bag`, `View bag`, `Checkout` (checkout mocked, never process payment).

## Page hierarchy and conversion journey

One coherent homepage, with direct navigation to sections and a cart drawer. No separate store page required for the prototype. The user must be able to buy without completing the animated story.

1. Header: original wordmark, Shop, Story, Details, cart.
2. Hero: oversized product, restrained SVG technical geometry, concise copy, provisional A$24.99 top price and direct Add to Bag. The hero should immediately explain the dual function.
3. Spin: short pinned scroll animation with image crossfades, subtle rotation and parallax; no heavyweight frame sequence required for prototype.
4. Bottle reveal: underside close-up and bottle-opening visual; transition is reversible.
5. **Combined lifestyle + stand**: object displayed on the stand in a coffee-table environment. Introduce stand naturally here. Include a subtle `Explore the stand` anchor to the commerce configurator, not a disruptive second sales funnel.
6. Choose your setup: top only / stand only / top + stand. Display each with image, selection state, configurable price, quantity, actual available colours only, and one clear Add to Bag. Default to top + stand **only if that selection is clearly visible and not misleading**. Do not invent savings or 'most popular' badges. Stand and bundle prices must be marked `TBC` in prototype configuration until confirmed; prevent a misleading priced checkout for TBC items.
7. Details: technical diagrams and factual dimensions only when supplied; otherwise labelled placeholder. Include care/material placeholders.
8. Manufacturing/story: Melbourne small-batch 3D printing, using provisional imagery labelled internally as placeholder; no fake claims.
9. Footer: basic navigation, shipping/returns placeholder, contact placeholder.

## Mobile-first behaviour

Design at 390px first, then 768px and 1440px. Mobile hero should show product, proposition, price and purchase action quickly. Technical annotations simplify on small screens. Provide a sticky compact Add to Bag affordance after the hero that never obscures content or device safe areas. Use large touch targets (>=44px), sensible type sizes, accessible contrast, responsive image crops and a touch-friendly cart drawer. Do not trap scroll.

## Motion and interaction

Use GSAP + ScrollTrigger for scroll choreography, with React lifecycle cleanup. Use one short pinned sequence rather than pinning the entire homepage. Scroll must remain reversible and normal navigation must work. Prototype spin using still-image layers, scale/rotation, opacity and a limited blur effect; bottle reveal with crossfade, crop/scale and callout motion; lifestyle reveal with subtle parallax. Prefer performance and natural scrolling over effects. Honor `prefers-reduced-motion` with instant static states. Avoid layout shift, animate transform/opacity wherever possible. No forced autoplay audio. Make animations robust across viewport changes and touch scrolling.

## Technology and code architecture

Use React + Vite + TypeScript, Tailwind CSS, GSAP ScrollTrigger and Zustand. Use strict TS, semantic HTML and reusable components. No Shopify dependency in this phase. The commerce layer must be isolated behind a typed adapter interface so Shopify Storefront API can replace mock data/actions later without modifying visual components.

Suggested project tree (adjust only with a documented reason):

```text
spin-opener/
  AGENTS.md
  README.md
  package.json
  public/
    assets/
      brand/
      product/
      lifestyle/
      manufacturing/
      technical/
      motion/
  references/              # original design references; not served as page UI
  docs/
    DESIGN_SYSTEM.md
    REFERENCE_AUDIT.md
    ARCHITECTURE.md
    ANIMATION_SPEC.md
    ASSET_MANIFEST.md
    DECISIONS.md
    QA_CHECKLIST.md
  src/
    app/
      App.tsx
      providers/
    components/
      layout/
      ui/
      commerce/
      technical/
    features/
      hero/
      spin-sequence/
      bottle-reveal/
      lifestyle-stand/
      product-configurator/
      details/
      manufacturing/
    content/
      siteCopy.ts
    config/
      designTokens.ts
      siteConfig.ts
    data/
      products.ts
    commerce/
      types.ts
      commerceAdapter.ts
      mockCommerceAdapter.ts
    hooks/
    styles/
    utils/
  tests/
```

Each feature owns its TSX, styles if needed, animation setup and local tests. Shared tokens, copy, product catalogue, prices, image URLs and animation durations must be centralized rather than duplicated. Every visual asset is accessed through a semantic asset manifest (e.g. `heroPrimary`, `spinRest`, `spinMotion`, `bottleReveal`, `lifestyleWithStand`, `standProduct`). Do not hardcode asset filenames in components. Keep final imagery drop-in replaceable.

## Agent-friendly iteration rules

Create `AGENTS.md` at the repo root with project purpose, source-of-truth hierarchy, folder ownership, commands, design constraints, common pitfalls and definition of done. Create short feature-level `AGENTS.md` files only where useful, not redundant copies. Maintain `docs/DECISIONS.md` with dated decisions and `docs/ASSET_MANIFEST.md` with asset role, source, dimensions, aspect ratio, placeholder status and replacement requirements. Use explicit `TODO(PRODUCT_DATA)` for unconfirmed details. Document animation start/end triggers and mobile differences in `docs/ANIMATION_SPEC.md`. Keep changes small and scoped: visual changes should not rewrite commerce logic. Preserve original brand files. Do not alter the approved creative direction without stating the reason.

## Asset preparation

The supplied asset board is a composite moodboard, not production-ready website imagery. For prototype only, crop usable photographic regions into individual files, avoiding headings, gutters, baked-in UI and captions. Preserve originals in `references/`. Use WebP for photographic crops, PNG/WebP with alpha only when needed, SVG for grid/technical elements and the original logo if a faithful vector exists. Do not hallucinate a vector from the wordmark. If a clean asset cannot be extracted, use a clearly documented placeholder rather than silently inventing product geometry. Avoid upscaling small crops beyond their practical resolution. Implement image fallbacks.

## Commerce requirements

Mock cart supports selecting top/stand/bundle, colour (only confirmed colours), quantity, add/remove, line totals, and a drawer. A bundle must not accidentally double-add individual products. All prices in AUD. Initial top price A$24.99 is provisional. Stand and bundle prices TBC. Shipping and delivery are unconfirmed; do not fabricate. Mock checkout should clearly say `Prototype — checkout unavailable` rather than simulate a real payment. Keep product data compatible with future Shopify variant IDs.

## Delivery stages — stop for review after each

**Stage 0: audit and plan.** Inspect references; generate audit, asset manifest, architecture plan, design tokens, and implementation checklist. Explain gaps. Do not implement UI until plan is written.

**Stage 1: static fidelity.** Build full responsive page and functional mock cart with NO elaborate animation. Compare screenshots at 390px, 768px, 1440px against references. Fix visual hierarchy before moving on. Provide screenshots and a short mismatch report.

**Stage 2: motion.** Add spin, reveal, lifestyle and annotation motion. Test reduced-motion, reverse scroll, resize and mobile smoothness. Avoid excessive pinning.

**Stage 3: polish.** Improve loading, keyboard access, image quality, accessibility, metadata, tests and cart edge cases. Produce a list of what is real vs placeholder and what will be replaced by Blender/video/Shopify.

At every stage, run build, typecheck and lint; add practical component and commerce tests. If browser automation is available, capture and inspect desktop/mobile screenshots. Do not claim visual verification without actually running it.

## Your immediate task

Begin with **Stage 0 only**: inspect the reference assets, create the proposed project and documentation structure, inventory images, specify the design system and component boundaries, and write a prioritized plan. Then report findings and wait for my approval before Stage 1. Do not prematurely implement the entire website.

## Git workflow and autonomous commit policy

At Stage 0, create or update root `AGENTS.md` with this policy. First inspect `git status`, branch, and history. Never discard or overwrite pre-existing user changes. If repository is not initialized, initialize Git only inside this project folder and create a `.gitignore` before the first commit. Do not create remote repositories or configure remotes.

Commit policy:
- Make one baseline commit after Stage 0 documentation/configuration is complete and verified, then one or more focused commits for independently working milestones within each approved stage (e.g. layout, cart, animation). Do not commit every minor edit or leave an entire stage as one unreviewable giant commit.
- Before risky refactors or major visual/animation experiments, ensure the current known-good work is committed. Do not commit knowingly broken work just to make a checkpoint; use a separate branch or local working copy if needed.
- Before each commit: review `git diff` and `git status`; run the available lint, typecheck, tests and build appropriate to the changed files. If a check fails, fix it or report the failure and do not call the commit verified. For Stage 0, where app commands may not exist yet, validate docs, paths and config instead.
- Stage only relevant files explicitly. Never use `git add -A` blindly. Exclude `.env*`, secrets, credentials, `node_modules`, build output, caches, and unnecessary large source renders; ensure `.gitignore` covers these. Never rewrite existing commits, force push, delete branches, or run destructive Git cleanup.
- Use Conventional Commits: `docs(agents): define project workflow`, `feat(hero): implement responsive hero`, `feat(cart): add mock bundle selection`, `feat(motion): add scroll-driven spin`, `fix(mobile): correct sticky purchase bar`.
- After each approved stage, report commit hashes, verification results, screenshots if available, remaining issues, and exact files changed. Then pause for review before starting the next stage.
- Local commits within an approved stage are authorized. Never push, deploy, merge, rebase shared branches, or connect Shopify without explicit user approval.
- Keep `docs/DECISIONS.md`, `docs/ANIMATION_SPEC.md`, `docs/ASSET_MANIFEST.md`, and `AGENTS.md` synchronized with meaningful changes; don't generate documentation churn for trivial edits.
