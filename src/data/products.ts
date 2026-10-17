import type { Colour, Money, Product } from '@/commerce/types'

/**
 * Physical spec of the top. Diameter/height confirmed by the client (2026-10-17) and matching
 * the 3D model (62.9 × 65.7 mm). Materials, weight and finish are still unconfirmed.
 */
export const topSpecs = {
  diameterMm: 62,
  heightMm: 65,
} as const

const aud = (amountCents: number): Money => ({ amountCents, currencyCode: 'AUD' })

/**
 * Colours. Six top colours appear in the AI asset board, but none are confirmed as
 * available. Teal is the hero colour in every reference, so it is treated as the single
 * offered colour until the client confirms the range. TODO(PRODUCT_DATA)
 */
export const topColours: Colour[] = [
  { id: 'teal', label: 'Teal', swatch: '#008E96', status: 'confirmed' },
  { id: 'black', label: 'Black', swatch: '#1E1F1E', status: 'unconfirmed' },
  { id: 'sand', label: 'Sand', swatch: '#C9BBA8', status: 'unconfirmed' },
  { id: 'coral', label: 'Coral', swatch: '#E0553F', status: 'unconfirmed' },
  { id: 'lilac', label: 'Lilac', swatch: '#8E5BD6', status: 'unconfirmed' },
  { id: 'sage', label: 'Sage', swatch: '#5E6B52', status: 'unconfirmed' },
]

/** Stand appearance requires confirmation (style guide footer). TODO(PRODUCT_DATA) */
export const standColours: Colour[] = [
  { id: 'charcoal', label: 'Charcoal', swatch: '#2E2F2E', status: 'confirmed' },
]

export const products: Product[] = [
  {
    id: 'mock-product-top',
    handle: 'spin-opener',
    kind: 'top',
    title: 'SPIN OPENER',
    subtitle: 'The spinning top.',
    imageKey: 'productTop',
    variants: [
      {
        id: 'mock-variant-top-teal',
        colourId: 'teal',
        price: aud(2499), // provisional A$24.99 per brief
        priceStatus: 'provisional',
        availableForSale: true,
      },
    ],
  },
  {
    id: 'mock-product-stand',
    handle: 'display-stand',
    kind: 'stand',
    title: 'Display Stand',
    subtitle: 'A home for your SPIN OPENER.',
    imageKey: 'standProduct',
    variants: [
      {
        id: 'mock-variant-stand-charcoal',
        colourId: 'charcoal',
        price: null, // TODO(PRODUCT_DATA): stand price TBC (board shows A$14.99 — unapproved)
        priceStatus: 'tbc',
        availableForSale: true,
      },
    ],
  },
  {
    id: 'mock-product-bundle',
    handle: 'top-and-stand',
    kind: 'bundle',
    title: 'Top + Stand',
    subtitle: 'The complete set.',
    imageKey: 'topOnStand',
    bundleComponents: [
      { productId: 'mock-product-top', quantity: 1 },
      { productId: 'mock-product-stand', quantity: 1 },
    ],
    variants: [
      {
        id: 'mock-variant-bundle-teal-charcoal',
        colourId: 'teal',
        bundleColours: { top: 'teal', stand: 'charcoal' },
        price: null, // TODO(PRODUCT_DATA): bundle price TBC (board shows A$34.99 — unapproved)
        priceStatus: 'tbc',
        availableForSale: true,
      },
    ],
  },
]

export const getProductByKind = (kind: Product['kind']): Product => {
  const product = products.find((p) => p.kind === kind)
  if (!product) throw new Error(`No product of kind "${kind}"`)
  return product
}
