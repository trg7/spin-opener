# Asset manifest

Runtime source: `src/data/assetManifest.ts` (components use keys, never paths).
All `placeholder-ai` assets are cropped from `references/boards/ai-asset-board.png` (1536×1024) with
Pillow, saved as WebP q90, **no upscaling**. Crop boxes are `(left, top, right, bottom)` in board pixels.

Status: `placeholder-ai` = provisional, may be geometrically wrong · `missing` = not supplied · `final` = approved.

## Wired to semantic keys

| Key                     | File (`public/assets/…`)                     | Role                        | Crop box                 | Size              | Ratio | Status         | Production replacement                                                                                 |
| ----------------------- | -------------------------------------------- | --------------------------- | ------------------------ | ----------------- | ----- | -------------- | ------------------------------------------------------------------------------------------------------ |
| `brandWordmark`         | `brand/spin-opener-wordmark.svg`             | Header/footer logo          | viewBox 250 686 1550 677 | 1550×677 (vector) | 2.29  | **final**      | Original client SVG; only viewBox/fill adjusted (D-017)                                                |
| `heroPrimary`           | `product/hero-beauty.webp`                   | Hero object                 | 4,56,308,466             | 304×410           | 0.74  | placeholder-ai | Transparent render ≥1600px tall, consistent 3/4 elevation (cutout lets construction SVG sit behind it) |
| `spinRest`              | `motion/spin-rest.webp`                      | Spin frame 1                | 323,53,560,179           | 237×126           | 1.88  | placeholder-ai | Render/video still ≥2400×1350                                                                          |
| `spinMotion`            | `motion/spin-motion-01.webp`                 | Spin frame 2 (blur)         | 323,185,560,311          | 237×126           | 1.88  | placeholder-ai | Same camera as `spinRest`                                                                              |
| `spinMotionFast`        | `motion/spin-motion-02.webp`                 | Spin frame 3 (more blur)    | 323,318,560,448          | 237×130           | 1.82  | placeholder-ai | Same camera; ideally replaced by a short muted video loop                                              |
| `bottleUnderside`       | `motion/bottle-underside.webp`               | Reveal: underside           | 579,53,844,214           | 265×161           | 1.65  | placeholder-ai | **Real photo** of actual mechanism (high-risk asset)                                                   |
| `bottleReveal`          | `motion/bottle-in-use.webp`                  | Reveal: opening a bottle    | 579,222,844,462          | 265×240           | 1.10  | placeholder-ai | **Real photo** in use, ≥2000px                                                                         |
| `lifestyleWithStand`    | `lifestyle/lifestyle-stand-closeup.webp`     | Lifestyle (mobile portrait) | 864,53,1205,462          | 341×409           | 0.83  | placeholder-ai | Lifestyle photo ≥2400px, portrait crop                                                                 |
| `lifestyleWide`         | `lifestyle/lifestyle-coffee-table-wide.webp` | Lifestyle (desktop)         | 17,770,512,998           | 495×228           | 2.17  | placeholder-ai | ≥2880×1320 landscape                                                                                   |
| `lifestyleAlt`          | `lifestyle/lifestyle-sideboard.webp`         | Optional secondary scene    | 530,770,837,998          | 307×228           | 1.35  | placeholder-ai | ≥2400px                                                                                                |
| `productTop`            | `product/colours/teal.webp`                  | Configurator: top           | 1228,58,1368,172         | 140×114           | 1.23  | placeholder-ai | Transparent render ≥1000px per confirmed colour                                                        |
| `standProduct`          | `product/stand-side.webp`                    | Configurator: stand         | 52,530,224,662           | 172×132           | 1.30  | placeholder-ai | Transparent render ≥1000px — stand design unconfirmed                                                  |
| `standTop`              | `product/stand-top.webp`                     | Stand detail (top view)     | 229,530,393,703          | 164×173           | 0.95  | placeholder-ai | ≥1000px                                                                                                |
| `topOnStand`            | `product/top-on-stand.webp`                  | Configurator: bundle        | 409,530,583,703          | 174×173           | 1.01  | placeholder-ai | Transparent combined render ≥1000px                                                                    |
| `topOnStandTilted`      | `product/top-on-stand-tilted.webp`           | Stand detail / reveal hint  | 588,530,760,703          | 172×173           | 0.99  | placeholder-ai | ≥1000px                                                                                                |
| `detailTexture`         | `product/detail-texture.webp`                | Details: surface            | 779,530,896,703          | 117×173           | 0.68  | placeholder-ai | Macro of real print texture ≥1200px                                                                    |
| `detailRing`            | `product/detail-ring.webp`                   | Details: ring/opener        | 900,530,1015,703         | 115×173           | 0.66  | placeholder-ai | Macro ≥1200px                                                                                          |
| `detailTip`             | `product/detail-tip.webp`                    | Details: tip                | 1020,530,1134,703        | 114×173           | 0.66  | placeholder-ai | Macro ≥1200px                                                                                          |
| `manufacturingPrintBed` | `manufacturing/manufacturing-print-bed.webp` | Manufacturing               | 856,770,1150,998         | 294×228           | 1.29  | placeholder-ai | **Real** Melbourne production photo/video ≥2400px                                                      |

## Mobile portrait crops (UX concept board)

Cropped from `references/boards/ux-concept-board.png` phone screens, **below** the baked headings and
above the baked captions — no text or UI included. Used for the 390px layout, where the landscape
asset-board crops would need heavy side-cropping.

| Key                    | File                                 | Crop box (UX board) | Size    | Status         | Replacement                      |
| ---------------------- | ------------------------------------ | ------------------- | ------- | -------------- | -------------------------------- |
| `spinMotionPortrait`   | `motion/spin-motion-portrait.webp`   | 304,252,520,578     | 216×326 | placeholder-ai | Portrait render/video ≥1290×2000 |
| `bottleRevealPortrait` | `motion/bottle-in-use-portrait.webp` | 549,266,757,608     | 208×342 | placeholder-ai | Real portrait photo ≥1290×2100   |

## Colour imagery (`colourImages`)

Launch range (D-048): Teal, Red, Blue, Green, White, Orange — top and stand. Only the **teal top**
has an image (`productTop`, AI placeholder); the stand image is an AI charcoal placeholder in no
launch colour. Missing colours fall back to the default image with an explicit preview note in the
configurator. Needed: one transparent image per colour for the top (×6) and stand (×6), plus
top-on-stand pairings for the bundle card if desired. The off-range AI crops (black, sand, coral,
lilac, sage) were removed.

## Built in code (not images)

| Element                                      | Location (Stage 1)                     | Notes                                                                                      |
| -------------------------------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------ |
| Construction circles, grid, dimension lines  | `src/components/technical/` (SVG)      | Hairline, `grid` token; animatable stroke                                                  |
| Side / top / bottom technical views          | `src/components/technical/` (SVG)      | Traced from AI silhouette; labelled provisional; **no numeric dimensions** until confirmed |
| Icons (bag, arrow, close, plus/minus, check) | `src/components/ui/icons` (inline SVG) | Thin 1.25px strokes to match boards                                                        |

## Not extracted

- Board cell 09 (AI technical drawings) — baked labels; recreated as SVG instead.
- Board cell 13 (gift packaging) — contains an AI-recreated wordmark; packaging unconfirmed.
- Any region of the UX/storyboard boards — contain baked UI and text.

## Re-generating crops

The crop script lives outside the repo (session scratchpad). Crop boxes above are sufficient to
reproduce; if re-cropping becomes routine, add `scripts/crop-board.py` with these boxes.
