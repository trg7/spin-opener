/**
 * PROVISIONAL side-profile of the top, traced by eye from the AI hero render
 * (references/boards/ai-asset-board.png, cell 01). It is NOT measured geometry.
 * Replace with a profile exported from the real CAD model. TODO(PRODUCT_DATA)
 *
 * viewBox: 0 0 200 140 — body spans x 20–180, tip at y 134.
 */
export const SIDE_VIEWBOX = '0 0 200 140'

export const sideProfilePath = [
  'M93 10 Q93 6 100 6 Q107 6 107 10', // rounded stem top
  'L108 44 C110 60 130 68 168 70 Q180 71 180 76', // stem flaring into the disc shoulder
  'L180 94 Q180 98 174 98 L138 98', // disc edge + underside
  'L136 104 C134 112 118 116 110 120 L106 128 Q100 134 94 128 L90 120', // hub + tip
  'C82 116 66 112 64 104 L62 98 L26 98 Q20 98 20 94', // mirror: hub + underside
  'L20 76 Q20 71 32 70 C70 68 90 60 92 44 Z', // mirror: shoulder + stem
].join(' ')

/** Metal ring band seen under the disc in the renders (unconfirmed). */
export const ringPath = 'M63 101 L137 101'

/** Body extents in viewBox units, for dimension lines. */
export const sideExtents = { left: 20, right: 180, top: 6, bottom: 134 } as const

/** Concentric rings for top/bottom views (radii in a 0 0 100 100 viewBox). */
export const topViewRadii = [46, 40, 14, 9, 3]
export const bottomViewRadii = [46, 26, 22, 12, 4]
