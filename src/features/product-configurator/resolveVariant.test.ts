import { getProductByKind } from '@/data/products'
import { colourPickersFor, resolveVariant } from './resolveVariant'

const colours = { top: 'teal', stand: 'charcoal' }

describe('resolveVariant', () => {
  it('resolves top, stand and bundle variants from colour selection', () => {
    expect(resolveVariant(getProductByKind('top'), colours)?.id).toBe('mock-variant-top-teal')
    expect(resolveVariant(getProductByKind('stand'), colours)?.id).toBe(
      'mock-variant-stand-charcoal',
    )
    expect(resolveVariant(getProductByKind('bundle'), colours)?.id).toBe(
      'mock-variant-bundle-teal-charcoal',
    )
  })

  it('returns undefined for an unavailable colour', () => {
    expect(resolveVariant(getProductByKind('top'), { ...colours, top: 'coral' })).toBeUndefined()
  })

  it('asks for both colours only for the bundle', () => {
    expect(colourPickersFor('top')).toEqual(['top'])
    expect(colourPickersFor('stand')).toEqual(['stand'])
    expect(colourPickersFor('bundle')).toEqual(['top', 'stand'])
  })
})
