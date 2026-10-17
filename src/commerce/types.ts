/**
 * Commerce domain types. Shaped to map 1:1 onto Shopify Storefront API objects
 * (Product → ProductVariant → CartLine) so a Shopify adapter can replace the mock
 * without touching visual components.
 */

export type CurrencyCode = 'AUD'

/** Integer minor units (cents) to avoid float maths. Shopify's MoneyV2 decimal string is converted in the adapter. */
export interface Money {
  amountCents: number
  currencyCode: CurrencyCode
}

/**
 * - `confirmed`   real, approved price
 * - `provisional` usable in the prototype, shown as a price, but not final
 * - `tbc`         unknown; UI shows "Price TBC" and the item cannot proceed to a priced checkout
 */
export type PriceStatus = 'confirmed' | 'provisional' | 'tbc'

export type ProductKind = 'top' | 'stand' | 'bundle'

export interface Colour {
  id: string
  label: string
  /** Swatch hex for UI only. */
  swatch: string
  /** Only `confirmed` colours may be offered for sale. */
  status: 'confirmed' | 'unconfirmed'
}

export interface ProductVariant {
  /** Mock id now; becomes a Shopify `gid://shopify/ProductVariant/...` later. */
  id: string
  sku?: string
  /** Colour of the top (or stand). For bundles, see `bundleColours`. */
  colourId: string
  /** For bundles: the top and stand colours that make up this variant. */
  bundleColours?: { top: string; stand: string }
  price: Money | null
  priceStatus: PriceStatus
  availableForSale: boolean
}

export interface BundleComponent {
  productId: string
  quantity: number
}

export interface Product {
  /** Mock id now; becomes a Shopify `gid://shopify/Product/...` later. */
  id: string
  handle: string
  kind: ProductKind
  title: string
  subtitle: string
  /** Semantic key into the asset manifest — never a file path. */
  imageKey: string
  variants: ProductVariant[]
  /** Bundles are sold as ONE line item; components are informational only. */
  bundleComponents?: BundleComponent[]
}

export interface CartLine {
  id: string
  variantId: string
  productId: string
  quantity: number
  /** null when the variant price is TBC. */
  unitPrice: Money | null
  lineTotal: Money | null
}

export interface Cart {
  id: string
  lines: CartLine[]
  totalQuantity: number
  /** null if any line has a TBC price — the UI must not show a misleading total. */
  subtotal: Money | null
  /** True when any line is TBC; checkout is blocked. */
  hasUnpricedLines: boolean
}

export interface CartLineInput {
  variantId: string
  quantity: number
}

export type CheckoutResult =
  | { status: 'redirect'; url: string }
  | { status: 'unavailable'; reason: 'prototype' | 'unpriced-lines' }
