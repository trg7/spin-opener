# SPIN OPENER — website prototype

Mobile-first, scroll-driven e-commerce prototype for SPIN OPENER: a spinning top that opens bottles,
designed and 3D printed in Melbourne. Mock commerce only — no payments.

```bash
nvm use            # Node 24 (≥ 22.12)
npx npm@11 install # npm ≥ 11 required (see docs/DECISIONS.md D-012)
npm run dev
npm run verify     # typecheck + lint + test + build
```

**Agents and contributors: start with [`AGENTS.md`](./AGENTS.md).**

| Doc                                                          | Contents                                               |
| ------------------------------------------------------------ | ------------------------------------------------------ |
| [`docs/REFERENCE_AUDIT.md`](docs/REFERENCE_AUDIT.md)         | What each reference establishes, gaps, contradictions  |
| [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md) | Stages and checklist                                   |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)               | Layers, component hierarchy, commerce adapter          |
| [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md)             | Tokens, type, layout, technical graphics               |
| [`docs/ANIMATION_SPEC.md`](docs/ANIMATION_SPEC.md)           | Scroll choreography, triggers, mobile + reduced-motion |
| [`docs/ASSET_MANIFEST.md`](docs/ASSET_MANIFEST.md)           | Every image: role, source, size, replacement spec      |
| [`docs/DECISIONS.md`](docs/DECISIONS.md)                     | Dated decisions, proposals awaiting approval           |
| [`docs/QA_CHECKLIST.md`](docs/QA_CHECKLIST.md)               | Per-stage verification                                 |

Status: **Stage 0 — foundation.** All imagery is provisional AI placeholder; prices for the stand and bundle are TBC.
