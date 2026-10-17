import type { Colour, Money, Product } from '@/commerce/types'

const aud = (amountCents: number): Money => ({ amountCents, currencyCode: 'AUD' })

/**
 * Launch colour range — the same six for the top and the stand (client, 2026-10-17).
 * Teal's swatch is the brand teal; the other swatch hexes are provisional picks.
 * TODO(PRODUCT_DATA): match swatches to the actual filament colours.
 */
export const colourRange: Colour[] = [
  { id: 'teal', label: 'Teal', swatch: '#008E96', status: 'confirmed' },
  { id: 'red', label: 'Red', swatch: '#C63A32', status: 'confirmed' },
  { id: 'blue', label: 'Blue', swatch: '#2D5C9E', status: 'confirmed' },
  { id: 'green', label: 'Green', swatch: '#3E7D4F', status: 'confirmed' },
  { id: 'white', label: 'White', swatch: '#F7F6F2', status: 'confirmed' },
  { id: 'orange', label: 'Orange', swatch: '#E57A2C', status: 'confirmed' },
]

export const topColours: Colour[] = colourRange
export const standColours: Colour[] = colourRange

const TOP_PRICE = aud(2499) // provisional A$24.99 per brief

export const products: Product[] = [
  {
    id: 'mock-product-top',
    handle: 'spin-opener',
    kind: 'top',
    title: 'SPIN OPENER',
    subtitle: 'The spinning top.',
    imageKey: 'productTop',
    variants: topColours.map((c) => ({
      id: `mock-variant-top-${c.id}`,
      colourId: c.id,
      price: TOP_PRICE,
      priceStatus: 'provisional' as const,
      availableForSale: true,
    })),
  },
  {
    id: 'mock-product-stand',
    handle: 'display-stand',
    kind: 'stand',
    title: 'Display Stand',
    subtitle: 'A home for your SPIN OPENER.',
    imageKey: 'standProduct',
    variants: standColours.map((c) => ({
      id: `mock-variant-stand-${c.id}`,
      colourId: c.id,
      price: null, // TODO(PRODUCT_DATA): stand price TBC (board shows A$14.99 — unapproved)
      priceStatus: 'tbc' as const,
      availableForSale: true,
    })),
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
    // Every top × stand pairing (matching or contrasting) is its own variant — maps to a
    // Shopify product with two options (6 × 6 = 36 variants, under Shopify's limit).
    variants: topColours.flatMap((t) =>
      standColours.map((st) => ({
        id: `mock-variant-bundle-${t.id}-${st.id}`,
        colourId: t.id,
        bundleColours: { top: t.id, stand: st.id },
        price: null, // TODO(PRODUCT_DATA): bundle price TBC (board shows A$34.99 — unapproved)
        priceStatus: 'tbc' as const,
        availableForSale: true,
      })),
    ),
  },
]

export const getProductByKind = (kind: Product['kind']): Product => {
  const product = products.find((p) => p.kind === kind)
  if (!product) throw new Error(`No product of kind "${kind}"`)
  return product
}
