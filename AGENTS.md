# AGENTS.md — SPIN OPENER

Instructions for any coding agent (Claude Code or otherwise) working in this repo. Read this file
fully before editing. Keep it current when conventions change.

## 1. Project purpose

A mobile-first, design-led, single-page e-commerce **prototype** for SPIN OPENER — a
Melbourne-designed, 3D-printed spinning top that also opens bottles, with a companion display
stand. Visual style: **playful industrial / editorial object catalogue**. No real payments, no
Shopify yet; commerce is mocked behind a typed adapter.

## 2. Source-of-truth hierarchy

When sources disagree, the higher one wins. Record any resolved conflict in `docs/DECISIONS.md`.

1. **The user's latest explicit instruction** in the session.
2. **Master brief** — `references/brief/SPIN_OPENER_Claude_Code_Master_Prompt.md` (copy, rules, commerce constraints).
3. **Original wordmark** — `references/brand/spin-opener-logo.svg` (supplied). **Real product photographs** — authoritative for geometry and the bottle-opening mechanism (_not yet supplied_).
4. **Style guide** — `references/brief/SPIN_OPENER_Style_Guide.pdf` (palette, type, identity, layout order).
5. **Scroll animation storyboard** — `references/boards/scroll-animation-storyboard.png` (composition, sequence, motion).
6. **UX concept board** — `references/boards/ux-concept-board.png` (mobile screens, configurator, cart drawer).
7. **AI asset board** — `references/boards/ai-asset-board.png` (provisional imagery only; may be geometrically wrong).

Boards show prices, badges, colours, dimensions and claims that the brief forbids or marks TBC.
**Never copy facts from boards into the UI without checking `docs/REFERENCE_AUDIT.md`.**

## 3. Commands

Requires Node ≥ 22.12 (`.nvmrc` → 24) and **npm ≥ 11** (npm 10.9 crashes resolving this tree; use `npx npm@11 install` if needed).

| Command                | Purpose                                                                                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`          | Vite dev server                                                                                                                                                       |
| `npm run typecheck`    | Strict TS (`tsc -b --noEmit`)                                                                                                                                         |
| `npm run lint`         | ESLint (incl. no hardcoded `/assets/` paths)                                                                                                                          |
| `npm test`             | Vitest (jsdom)                                                                                                                                                        |
| `npm run build`        | Production build                                                                                                                                                      |
| `npm run verify`       | All of the above — run before every commit                                                                                                                            |
| `npm run format:check` | Prettier                                                                                                                                                              |
| `npm run screenshots`  | Build + Playwright: static captures **and motion checks** (pin, reversibility, anchors, reduced motion, console errors) at 390/768/1440 → `screenshots/` (gitignored) |

## 4. Folder ownership

| Path                         | Owns                                                                      | Don't                                              |
| ---------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------- |
| `src/app/`                   | `App.tsx` section composition, providers                                  | Put section markup here                            |
| `src/features/<section>/`    | One homepage section: TSX, its animation hook, local tests                | Import from another feature                        |
| `src/components/layout/`     | Header, footer, sticky purchase bar, section shell                        | Contain product data                               |
| `src/components/ui/`         | Primitives: Button, Price, QuantityStepper, Swatch, ResponsiveImage       | Know about products or the cart                    |
| `src/components/commerce/`   | Cart drawer, line items, add-to-bag wiring                                | Call anything except the store/adapter             |
| `src/components/technical/`  | SVG construction geometry, technical drawings, annotation callouts        | Invent dimensions — read from data                 |
| `src/content/siteCopy.ts`    | **All** user-facing copy                                                  | Inline marketing strings in components             |
| `src/config/designTokens.ts` | Colours, fonts, breakpoints, **all motion timings**                       | Duplicate values elsewhere                         |
| `src/styles/theme.css`       | Tailwind `@theme` mirror of tokens (parity enforced by tests)             | Add colours not in `designTokens.ts`               |
| `src/config/siteConfig.ts`   | Feature flags, locale/currency, defaults                                  |                                                    |
| `src/data/products.ts`       | Catalogue, variants, prices, colours                                      | Hardcode prices anywhere else                      |
| `src/data/assetManifest.ts`  | **The only place image paths appear** (semantic keys)                     | Reference `/assets/...` in components (lint fails) |
| `src/commerce/`              | Types, `CommerceAdapter` interface, mock adapter                          | Import React or UI                                 |
| `src/motion/`                | GSAP registration, presets (`fadeUpOnEnter`, `parallax`), story-band hook | Import `gsap` directly in features                 |
| `src/hooks/`                 | Shared hooks (`useReducedMotion`, `useMediaQuery`)                        |                                                    |
| `public/assets/`             | Served images, grouped by role                                            | Store originals (they live in `references/`)       |
| `references/`                | Original design inputs. **Read-only. Never served.**                      | Edit, rename, or delete                            |
| `docs/`                      | Audit, architecture, animation spec, manifest, decisions, QA              |                                                    |

Add a feature-level `AGENTS.md` only when a feature has non-obvious rules (e.g. spin-sequence pinning).

## 5. Design constraints (non-negotiable)

- Palette from the style guide only: warm white `#F3F1ED`, charcoal `#222322`, teal `#008E96`, grid `#D4D1CB`, sage `#7D806F` (+ two derived tones in `designTokens.ts`). No gradients, no new accent colours.
- Type: light grotesk display with restrained tracking; small uppercase letter-spaced utility labels. Tokens only.
- Use the **original wordmark asset** (`assets.brandWordmark`, centred lockup with rule). Never redraw, re-typeset or alter it.
- Fine construction circles / technical grid in SVG, hairline weight, `grid` colour.
- Generous negative space, controlled asymmetry. Avoid stock UI gradients, heavily rounded cards, emoji, loud sales copy, template styling.
- Real HTML for all copy and commerce; images only for visual scenes. No text baked into images.
- Mobile first at 390px, then 768px, then 1440px. Touch targets ≥ 44px. Respect safe areas.

## 6. Product-truth rules

- Use `TODO(PRODUCT_DATA)` for every unconfirmed fact.
- Top price **A$24.99 is provisional**. Stand and bundle prices are **TBC** (`price: null`). A cart containing TBC lines shows no misleading subtotal and cannot proceed to a priced checkout.
- Offer only colours with `status: 'confirmed'`. Currently: Teal top, Charcoal stand.
- No invented savings, "Most popular" badges, reviews, shipping promises, dimensions, materials or production claims.
- A bundle is **one** cart line (bundle variant) — never add the top and stand lines separately.
- Checkout is mocked: show `Prototype — checkout unavailable`. Never simulate payment.

## 7. Motion rules

See `docs/ANIMATION_SPEC.md`. In short: GSAP + ScrollTrigger via `useGSAP` (auto cleanup) and
`gsap.matchMedia()`. **One** short pinned sequence (spin) only. All scroll motion reversible.
Animate `transform`/`opacity` (blur capped by token). `prefers-reduced-motion` → instant static
end states, no pin. Never trap or hijack scroll. Never rotate the product image in-plane to fake a
spin — it misrepresents geometry.

## 8. Common pitfalls

- Hardcoding a price, colour, path or duration in a component → put it in data/config/tokens.
- Pinning without explicit image dimensions → layout shift breaks ScrollTrigger. Always set `width`/`height` from the manifest and call `ScrollTrigger.refresh()` after images load.
- Creating ScrollTriggers out of DOM order → wrong pin spacing. Create top-to-bottom or set `refreshPriority`.
- Using `100vh` on mobile → use `svh`/`dvh`.
- Treating AI board details (6 colours, 78 mm, A$34.99, "Most popular") as facts.
- Visual changes rewriting commerce logic, or vice-versa. Keep diffs scoped.

## 9. Testing requirements

- Commerce: unit tests for cart maths, bundle-as-one-line, TBC handling, quantity bounds.
- Data: catalogue integrity, asset manifest files exist, token parity, colour contrast (`tests/`).
- Components: Testing Library for configurator selection, quantity, drawer open/close, focus trap.
- Visual: screenshots at 390 / 768 / 1440 for each stage (Playwright, added in Stage 1). Never claim visual verification without actually capturing screenshots.

## 10. Definition of done (per change)

1. `npm run verify` passes.
2. No hardcoded copy, prices, asset paths or durations in components.
3. Works at 390 / 768 / 1440 and with reduced motion.
4. Relevant docs updated (`DECISIONS.md`, `ASSET_MANIFEST.md`, `ANIMATION_SPEC.md`, this file) — only when meaningful.
5. Placeholders visibly flagged.

## 11. Git workflow

- Before edits: inspect `git status`, current branch and recent history. Preserve all pre-existing user changes; never discard uncommitted work.
- Commit a verified baseline after Stage 0, then focused, independently working milestones within each **approved** stage (e.g. layout, cart, animation). No commit-per-keystroke, no giant stage-sized commit.
- Before risky refactors or major visual/animation experiments, ensure known-good work is committed. Never commit knowingly broken work as a checkpoint; use a separate local branch for experiments.
- Before each commit: review `git diff` and `git status`; run `npm run verify`. If a check fails, fix it or report it and do not call the commit verified.
- Stage files explicitly. **Never `git add -A` / `git add .` blindly.** Never commit `.env*`, secrets, `node_modules`, `dist`, caches, or large raw renders (`.gitignore` covers these).
- Conventional Commits: `feat(hero): implement responsive hero`, `fix(mobile): correct sticky purchase bar`, `docs(agents): …`, `chore(tooling): …`.
- Local commits within an approved stage are authorised. **Never** push, deploy, merge, rebase shared branches, force push, delete branches, rewrite history, run destructive cleanup, or connect Shopify without explicit user approval.
- After each stage: report commit hashes, changed files, checks run, screenshot results, unresolved issues — then **stop for user review**.

## 12. Stage plan

See `docs/IMPLEMENTATION_PLAN.md`. Stage 0 (foundation) → 1 (static) → 2 (motion) → 3 (commerce) → 4 (refinement). Stop for review after each.
