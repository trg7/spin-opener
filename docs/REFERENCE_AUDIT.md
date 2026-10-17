# Reference audit

_Stage 0 · 2026-10-17_

## 1. Inputs received

| #   | File (in `references/`)                              | Origin         | What it establishes                                                                                                                                                             | Authority                                                             |
| --- | ---------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 1   | `brief/SPIN_OPENER_Claude_Code_Master_Prompt.md`     | Starter kit    | Copy, section order, commerce rules, tech stack, stages, git policy                                                                                                             | **Authoritative**                                                     |
| 2   | `brief/SPIN_OPENER_Style_Guide.pdf`                  | Starter kit    | Palette (5 colours), type direction, identity rule, layout order (7 sections), motion/copy/photo principles                                                                     | **Authoritative** for visual system                                   |
| 3   | `brief/SPIN_OPENER_Git_Workflow_AGENTS.md`           | Starter kit    | Git policy (merged into root `AGENTS.md`)                                                                                                                                       | Authoritative                                                         |
| 4   | `brief/START_HERE.txt`                               | Starter kit    | Process notes                                                                                                                                                                   | —                                                                     |
| 5   | `boards/scroll-animation-storyboard.png` (1536×1024) | Supplied image | Desktop composition, section sequence, key animation frames, mobile key screens, mobile expectations (pin 2–3 screen heights, persistent purchase bar, thumb-friendly swatches) | Authoritative for **composition and motion**                          |
| 6   | `boards/ux-concept-board.png` (1536×1024)            | Supplied image | Six mobile screens, configurator list + expanded option, bundle card, added-to-bag drawer, 5 key UX notes                                                                       | Authoritative for **mobile UX**; commerce details overridden by brief |
| 7   | `boards/ai-asset-board.png` (1536×1024)              | Supplied image | 13 provisional imagery cells (hero, spin ×3, bottle ×2, lifestyle, colours ×6, stand ×2, top+stand ×2, details ×3, technical, lifestyle ×2, manufacturing, packaging)           | **Provisional only**; source of prototype crops                       |

## 2. Expected but missing

| Missing input                               | Brief says                                                        | Impact                                                                 | Interim handling                                                                                                |
| ------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Original SPIN OPENER wordmark**           | "Use the original supplied logo asset. Do not recreate it."       | Header, footer, favicon                                                | Labelled text placeholder (`assets.brandWordmark.status = 'missing'`). Not vectorised.                          |
| **Real product photographs**                | "Authoritative for product geometry and bottle-opening mechanism" | We cannot verify geometry, the opener mechanism, colour, or dimensions | All imagery is AI-derived and flagged `placeholder-ai`. Technical drawings use labelled placeholder dimensions. |
| Confirmed dimensions                        | "Factual dimensions only when supplied"                           | Details section, hero callouts                                         | Placeholder text "Dimensions to be confirmed"; drawings unlabelled or marked TBC                                |
| Confirmed colour range (top + stand)        | "Actual available colours only"                                   | Configurator                                                           | Teal top + charcoal stand only (see DECISIONS D-004)                                                            |
| Stand + bundle prices                       | "TBC until confirmed"                                             | Configurator, cart                                                     | `price: null`, UI shows "Price TBC", checkout blocked                                                           |
| Materials, care, shipping, returns, contact | Placeholders required                                             | Details, footer                                                        | `TODO(PRODUCT_DATA)` placeholders in `siteCopy.ts`                                                              |
| Typeface name/licence                       | "Light grotesk" only                                              | Whole site                                                             | Provisional Inter Tight Variable (see D-003)                                                                    |
| Video / Blender renders                     | Future                                                            | Spin & reveal fidelity                                                 | Still-image crossfades per brief                                                                                |

## 3. Also found (not supplied, not used)

In `~/Downloads` there are two earlier drafts: `Spin Opener_ A Teal Technical Object.png` and an older
`Spin Opener Scroll Animation Storyboard.png` (headline "A small object. A strange obsession.", FAQ
nav, six-colour "Make it yours" section, no stand). They are **superseded** by the supplied boards
and were not copied into the project. Confirm if any element of them should be revived.

## 4. Contradictions and how they are resolved

| #   | Boards show                                                             | Brief / style guide says                                | Resolution                                                                                                                   |
| --- | ----------------------------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| C1  | Stand A$14.99, bundle A$34.99, cart subtotal A$39.98                    | Stand and bundle prices **TBC**                         | Brief wins: TBC, no priced checkout                                                                                          |
| C2  | "MOST POPULAR" badge on Top + Stand                                     | "Do not invent … 'most popular' badges"                 | Removed                                                                                                                      |
| C3  | "Save when you buy together"                                            | "Do not invent savings"                                 | Removed                                                                                                                      |
| C4  | Six top colours (teal, black, sand, coral, lilac, sage)                 | "Actual available colours only"                         | Only teal offered; others cropped but gated off                                                                              |
| C5  | Three stand colours (charcoal, grey, terracotta)                        | "Stand appearance requires confirmation"                | Charcoal only, flagged                                                                                                       |
| C6  | 78 mm × 52 mm top; 78 mm × 22 mm stand                                  | Dimensions only when supplied                           | Placeholder; note the AI board gives the stand the same 78 mm diameter as the top, which looks inconsistent with the imagery |
| C7  | Manufacturing heading "Designed and made in Melbourne."                 | Copy: "Made here. Made to spin."                        | Brief copy used; board body copy kept as provisional support text                                                            |
| C8  | Feature list: "Quality materials", "Smooth finish", "Satisfying weight" | "No inflated claims"                                    | Not used until confirmed                                                                                                     |
| C9  | "Ships from Melbourne, Australia"                                       | "Shipping … unconfirmed; do not fabricate"              | Removed; footer placeholder                                                                                                  |
| C10 | Storyboard: "Cap pops off (with sound option)"                          | "No forced autoplay audio"                              | No audio in prototype                                                                                                        |
| C11 | Hero side panel: Top / Side / Bottom view drawings with dimensions      | Dimensions unconfirmed                                  | SVG views drawn from AI silhouette, explicitly labelled provisional; no numeric dimensions                                   |
| C12 | Mobile board: "Stand details open inline … (or as a drawer)"            | "Stand introduced naturally; not a second sales funnel" | Inline expand within configurator; lifestyle section only has a subtle anchor                                                |
| C13 | Gift packaging cell (box with recreated wordmark)                       | Don't present packaging as fact; don't recreate logo    | Not cropped, not used                                                                                                        |
| C14 | Storyboard copy "Object 001 / Melbourne" eyebrow                        | Not in brief                                            | Treated as provisional label (approval item)                                                                                 |

## 5. Geometry / truth risks in AI imagery

- The AI renders are internally inconsistent: some show a polished metal ring and ball tip on the underside, some don't; the stem profile and body thickness vary between cells.
- **The bottle-opening mechanism is invented by the image model.** The underside close-up (ring + ball bearing) may not match the real product. This is the highest-risk asset — the reveal section should be re-shot from the real product before launch.
- Product scale vs. bottle and hand is not reliable.

## 6. Resolution of AI crops

All crops come from a 1536×1024 composite. Largest usable crop is 495×228 (wide lifestyle); the hero
is 304×410. At 390px wide on a 3× display the hero needs ~1100px; at 1440 desktop the spin scene
needs ~2400px. **Crops will look soft at full bleed.** Per the brief they are not upscaled; layouts in
Stage 1 will size images conservatively and label them as placeholders. See `ASSET_MANIFEST.md`.
