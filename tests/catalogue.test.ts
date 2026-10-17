import { products, standColours, topColours } from '@/data/products'
import { formatMoney } from '@/utils/money'

const allColourIds = new Set([...topColours, ...standColours].map((c) => c.id))
const confirmed = new Set(
  [...topColours, ...standColours].filter((c) => c.status === 'confirmed').map((c) => c.id),
)

describe('product catalogue', () => {
  it('has exactly one top, one stand and one bundle', () => {
    expect(products.map((p) => p.kind).sort()).toEqual(['bundle', 'stand', 'top'])
  })

  it('uses unique product and variant ids', () => {
    const ids = products.flatMap((p) => [p.id, ...p.variants.map((v) => v.id)])
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('never sells a variant in an unconfirmed colour', () => {
    for (const v of products.flatMap((p) => p.variants)) {
      expect(allColourIds.has(v.colourId)).toBe(true)
      if (v.availableForSale) expect(confirmed.has(v.colourId)).toBe(true)
    }
  })

  it('keeps price and priceStatus consistent (TBC ⇔ no price)', () => {
    for (const v of products.flatMap((p) => p.variants)) {
      expect(v.priceStatus === 'tbc').toBe(v.price === null)
    }
  })

  it('keeps stand and bundle prices TBC until confirmed', () => {
    for (const p of products.filter((p) => p.kind !== 'top')) {
      for (const v of p.variants) expect(v.priceStatus).toBe('tbc')
    }
  })

  it('bundle references real component products', () => {
    const bundle = products.find((p) => p.kind === 'bundle')
    const ids = new Set(products.map((p) => p.id))
    expect(bundle?.bundleComponents?.every((c) => ids.has(c.productId))).toBe(true)
  })

  it('formats AUD as A$', () => {
    expect(formatMoney({ amountCents: 2499, currencyCode: 'AUD' })).toBe('A$24.99')
  })
})
