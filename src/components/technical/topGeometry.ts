/**
 * Real geometry of the top, traced from the client's 3D model (references/3d/spin-top.blend)
 * with scripts/render/trace_profile.py: orthographic side mask at 10 px/mm → row extents →
 * Ramer–Douglas–Peucker (0.12 mm). Units are millimetres; origin at the stem top centre,
 * y grows downward (SVG). Regenerate with the script if the model changes — don't hand-edit.
 */

/** Overall size measured from the model (product spec values live in src/data/products.ts). */
export const sideExtents = { radius: 31.4, height: 65.6 } as const

export const SIDE_VIEWBOX = `${-sideExtents.radius - 0.6} -0.6 ${2 * sideExtents.radius + 1.2} ${sideExtents.height + 1.2}`

export const sideProfilePath =
  'M0.50 0.00 L1.20 0.30 L1.80 0.90 L2.10 1.90 L2.60 16.20 L3.00 20.60 L3.80 23.70 L4.50 25.20 L5.50 26.70 L7.00 28.30 L8.50 29.50 L10.10 30.50 L13.70 32.20 L19.80 34.10 L28.90 35.90 L29.80 36.40 L30.70 37.30 L31.40 38.90 L31.40 44.40 L30.90 45.40 L29.70 46.20 L10.70 46.40 L10.00 47.90 L9.60 49.70 L14.50 49.80 L14.50 51.80 L11.50 52.40 L12.30 52.50 L12.30 53.30 L11.70 54.40 L7.60 56.70 L5.50 58.70 L4.00 61.00 L3.20 62.90 L2.40 63.50 L2.30 64.10 L1.90 64.80 L1.50 65.20 L0.60 65.60 L-0.60 65.60 L-1.50 65.20 L-2.00 64.70 L-2.40 63.60 L-3.30 62.80 L-4.40 60.30 L-5.50 58.70 L-7.60 56.70 L-11.70 54.40 L-12.30 53.30 L-12.30 52.50 L-11.50 52.40 L-14.50 51.70 L-14.50 49.80 L-9.60 49.70 L-9.80 48.60 L-10.70 46.40 L-29.70 46.20 L-30.90 45.40 L-31.40 44.40 L-31.40 38.90 L-30.80 37.40 L-29.80 36.40 L-28.90 35.90 L-19.40 34.00 L-13.70 32.20 L-11.20 31.10 L-8.50 29.50 L-7.00 28.30 L-5.50 26.70 L-3.90 23.90 L-3.00 20.60 L-2.60 16.30 L-2.10 1.90 L-2.00 1.30 L-1.50 0.50 L-0.50 0.00 Z'

/** Concentric features seen from above / below (radius, mm), measured from the model. */
export const topViewRadii = [31.4, 28.6, 4.8, 2.6]
export const bottomViewRadii = [31.4, 25, 20.5, 14.5, 6.4, 2.4]
