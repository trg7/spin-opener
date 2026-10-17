import type { Cart, CartLineInput, CheckoutResult, Product } from './types'

/**
 * The only surface UI code may use to talk to commerce.
 *
 * Stage 3 provides `mockCommerceAdapter.ts` (in-memory, AUD, no payments).
 * A future `shopifyCommerceAdapter.ts` implements the same interface against the
 * Storefront API (cartCreate / cartLinesAdd / cartLinesUpdate / cartLinesRemove / checkoutUrl).
 */
export interface CommerceAdapter {
  getProducts(): Promise<Product[]>
  getCart(): Promise<Cart>
  addLines(lines: CartLineInput[]): Promise<Cart>
  updateLineQuantity(lineId: string, quantity: number): Promise<Cart>
  removeLine(lineId: string): Promise<Cart>
  /** Mock always returns `{ status: 'unavailable' }`; never processes payment. */
  beginCheckout(): Promise<CheckoutResult>
}
