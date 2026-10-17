/**
 * Semantic asset manifest — the ONLY place image paths appear.
 * Components request assets by key (e.g. `assets.heroPrimary`). To replace an image with a
 * real render/photo, change `src`, dimensions and `status` here; no component edits needed.
 *
 * Full provenance, crop boxes and replacement specs: docs/ASSET_MANIFEST.md
 */

export type AssetStatus =
  /** Cropped from the AI asset board — provisional, may be geometrically inaccurate. */
  | 'placeholder-ai'
  /** Needed but not supplied; render a labelled placeholder. */
  | 'missing'
  /** Rendered from the client's 3D model — accurate geometry; colour/material pending approval. */
  | 'render'
  /** Approved production asset. */
  | 'final'

export interface ImageAsset {
  src: string | null
  alt: string
  width: number
  height: number
  status: AssetStatus
  /** Required size/format for the production replacement. */
  replaceWith: string
}

const render = (
  src: string,
  width: number,
  height: number,
  alt: string,
  replaceWith: string,
): ImageAsset => ({ src: `/assets/${src}`, width, height, alt, status: 'render', replaceWith })

const ai = (
  src: string,
  width: number,
  height: number,
  alt: string,
  replaceWith: string,
): ImageAsset => ({
  src: `/assets/${src}`,
  width,
  height,
  alt,
  status: 'placeholder-ai',
  replaceWith,
})

export const assets = {
  // Brand
  brandWordmark: {
    src: '/assets/brand/spin-opener-wordmark.svg',
    alt: 'SPIN OPENER',
    width: 1550,
    height: 677,
    status: 'final',
    replaceWith:
      'Original client SVG (references/brand/). Only the viewBox was tightened — never redraw.',
  },

  // Hero
  heroPrimary: render(
    'product/hero-render.webp',
    1600,
    2000,
    'Teal SPIN OPENER spinning top standing on its steel tip',
    'Approved studio render or photo with alpha (scripts/render/rig.py shot "hero")',
  ),

  // Spin sequence
  spinRest: ai(
    'motion/spin-rest.webp',
    237,
    126,
    'SPIN OPENER at rest on a stone surface',
    'Render/video frame ≥2400×1350',
  ),
  spinMotion: ai(
    'motion/spin-motion-01.webp',
    237,
    126,
    'SPIN OPENER spinning with light motion blur',
    'Render/video frame ≥2400×1350, same camera as spinRest',
  ),
  spinMotionFast: ai(
    'motion/spin-motion-02.webp',
    237,
    130,
    'SPIN OPENER spinning fast with motion blur',
    'Render/video frame ≥2400×1350, same camera as spinRest',
  ),
  /** Mobile portrait crop from the UX concept board (spin screen). */
  spinMotionPortrait: ai(
    'motion/spin-motion-portrait.webp',
    216,
    326,
    'SPIN OPENER spinning on a stone surface',
    'Portrait render/video frame ≥1290×2000 (9:14), same scene as spinMotion',
  ),

  // Bottle reveal
  bottleUnderside: render(
    'product/underside-render.webp',
    1800,
    1200,
    'Underside of the SPIN OPENER showing the steel collar and tip',
    'Approved render or real photo of the underside (rig shot "underside")',
  ),
  bottleReveal: ai(
    'motion/bottle-in-use.webp',
    265,
    240,
    'Hand using the SPIN OPENER to open a bottle',
    'Real photograph of the actual mechanism in use ≥2000px wide',
  ),
  /** Mobile portrait crop from the UX concept board (reveal screen). */
  bottleRevealPortrait: ai(
    'motion/bottle-in-use-portrait.webp',
    208,
    342,
    'Hand using the SPIN OPENER to open a bottle',
    'Real portrait photograph of the mechanism in use ≥1290×2100',
  ),

  // Lifestyle + stand
  lifestyleWithStand: ai(
    'lifestyle/lifestyle-stand-closeup.webp',
    341,
    409,
    'SPIN OPENER resting on its display stand on a terrazzo coffee table',
    'Lifestyle photo ≥2400px, portrait + landscape crops',
  ),
  lifestyleWide: ai(
    'lifestyle/lifestyle-coffee-table-wide.webp',
    495,
    228,
    'SPIN OPENER on its stand beside books and a bowl on a coffee table',
    'Lifestyle photo ≥2880×1320',
  ),
  lifestyleAlt: ai(
    'lifestyle/lifestyle-sideboard.webp',
    307,
    228,
    'SPIN OPENER on its stand on a timber sideboard',
    'Lifestyle photo ≥2400px',
  ),

  // Products / configurator
  productTop: render(
    'product/top-render.webp',
    800,
    800,
    'Teal SPIN OPENER',
    'Approved render per confirmed colour (rig shot "thumb")',
  ),
  standProduct: ai(
    'product/stand-side.webp',
    172,
    132,
    'Charcoal display stand',
    'Transparent stand render ≥1000px (stand design unconfirmed)',
  ),
  standTop: ai(
    'product/stand-top.webp',
    164,
    173,
    'Display stand from above',
    'Stand render from above ≥1000px',
  ),
  topOnStand: ai(
    'product/top-on-stand.webp',
    174,
    173,
    'SPIN OPENER sitting on its display stand',
    'Transparent combined render ≥1000px',
  ),
  topOnStandTilted: ai(
    'product/top-on-stand-tilted.webp',
    172,
    173,
    'SPIN OPENER tilted on its stand showing the underside',
    'Combined render ≥1000px',
  ),

  // Details
  detailTexture: ai(
    'product/detail-texture.webp',
    117,
    173,
    'Close-up of the printed surface texture',
    'Macro photo ≥1200px of real print texture',
  ),
  detailRing: ai(
    'product/detail-ring.webp',
    115,
    173,
    'Close-up of the metal ring and opener tip',
    'Macro photo ≥1200px',
  ),
  detailTip: ai(
    'product/detail-tip.webp',
    114,
    173,
    'Close-up of the spinning tip',
    'Macro photo ≥1200px',
  ),

  // Manufacturing
  manufacturingPrintBed: ai(
    'manufacturing/manufacturing-print-bed.webp',
    294,
    228,
    'Rows of teal tops on a 3D printer bed',
    'Real production photo/video of the Melbourne print process ≥2400px',
  ),
} satisfies Record<string, ImageAsset>

export type AssetKey = keyof typeof assets

/**
 * Unconfirmed colour variants cropped from the board. Kept for when the range is confirmed;
 * the configurator must only show colours whose status is `confirmed` in src/data/products.ts.
 */
export const topColourImages: Record<string, ImageAsset> = {
  teal: assets.productTop,
  black: ai(
    'product/colours/black.webp',
    140,
    114,
    'Black SPIN OPENER',
    'Transparent product render ≥1000px',
  ),
  sand: ai(
    'product/colours/sand.webp',
    140,
    110,
    'Sand SPIN OPENER',
    'Transparent product render ≥1000px',
  ),
  coral: ai(
    'product/colours/coral.webp',
    140,
    110,
    'Coral SPIN OPENER',
    'Transparent product render ≥1000px',
  ),
  lilac: ai(
    'product/colours/lilac.webp',
    140,
    105,
    'Lilac SPIN OPENER',
    'Transparent product render ≥1000px',
  ),
  sage: ai(
    'product/colours/sage.webp',
    140,
    105,
    'Sage SPIN OPENER',
    'Transparent product render ≥1000px',
  ),
}
