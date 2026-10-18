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
  heroPrimary: ai(
    'product/hero-beauty.webp',
    304,
    410,
    'Teal SPIN OPENER spinning top standing on its tip',
    'Transparent PNG/WebP render, ≥1600px tall, centred, consistent 3/4 elevation',
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
  bottleUnderside: ai(
    'motion/bottle-underside.webp',
    265,
    161,
    'Underside of the SPIN OPENER showing the opener mechanism',
    'Real photograph/render of the actual mechanism ≥2000px wide',
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
  productTop: ai(
    'product/colours/teal.webp',
    140,
    114,
    'Teal SPIN OPENER',
    'Transparent product render ≥1000px, per colour',
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
 * Per-colour product imagery. Only the teal top exists (AI placeholder); every other colour —
 * and every stand colour (the stand image is an AI charcoal placeholder) — falls back to the
 * default image and the configurator says so. Add entries here as colour images arrive.
 */
export const colourImages: {
  top: Partial<Record<string, ImageAsset>>
  stand: Partial<Record<string, ImageAsset>>
} = {
  top: { teal: assets.productTop },
  stand: {},
}

/** The colour the default image actually shows (for the "shown in …" note). */
export const defaultImageColour = { top: 'teal', stand: null } as const

/**
 * Alpha masks for placeholder photos whose own backdrop shouldn't show (applied as CSS
 * `mask-image`; the photo itself is untouched). Generated by `scripts/assets/hero_mask.py`.
 * Drop the entry when a transparent production render replaces the photo.
 */
export const imageMasks: Partial<Record<AssetKey, string>> = {
  heroPrimary: '/assets/product/hero-beauty-mask.png',
}
