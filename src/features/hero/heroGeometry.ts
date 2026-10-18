import type { CSSProperties } from 'react'

/**
 * Hero product placement and callouts (≥1024, D-050). All values are % of the square stage, so
 * the product, dots, leaders and labels scale together.
 *
 * `HERO_PRODUCT` places the hero image; `anchor` points are fractions of that image, measured on
 * the current placeholder (`product/hero-beauty.webp`): upper stem and the right end of the zinc
 * opener ring. Re-measure them when the hero image is replaced.
 */
export const HERO_PRODUCT = { left: 10.5, top: 2, width: 79 } as const

export type Point = readonly [number, number]
export const callouts: Record<
  'spin' | 'open',
  { anchor: Point; elbow: Point; lineEnd: number; labelX: number }
> = {
  spin: { anchor: [0.477, 0.293], elbow: [28, 22], lineEnd: 6, labelX: 6 },
  open: { anchor: [0.658, 0.656], elbow: [70, 75.5], lineEnd: 104, labelX: 86 },
}

/** Product image box as stage-% styles. */
export const heroProductStyle: CSSProperties = {
  left: `${HERO_PRODUCT.left}%`,
  top: `${HERO_PRODUCT.top}%`,
  width: `${HERO_PRODUCT.width}%`,
}
