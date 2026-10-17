import type { Colour, Product, ProductKind, ProductVariant } from '@/commerce/types'

export interface ColourSelection {
  top: string
  stand: string
}

/** Finds the variant matching the selected colours. Bundles match on both colours. */
export function resolveVariant(
  product: Product,
  colours: ColourSelection,
): ProductVariant | undefined {
  return product.variants.find((v) => {
    if (product.kind === 'bundle') {
      return v.bundleColours?.top === colours.top && v.bundleColours.stand === colours.stand
    }
    return v.colourId === (product.kind === 'top' ? colours.top : colours.stand)
  })
}

/** Which colour pickers a setup needs. */
export function colourPickersFor(kind: ProductKind): Array<keyof ColourSelection> {
  if (kind === 'top') return ['top']
  if (kind === 'stand') return ['stand']
  return ['top', 'stand']
}

export const confirmedOnly = (colours: Colour[]) => colours.filter((c) => c.status === 'confirmed')
