import type { CurrencyCode } from '@/commerce/types'

/**
 * Feature flags and store-level settings. Product prices/colours live in src/data/products.ts.
 */
export const siteConfig = {
  locale: 'en-AU',
  currencyCode: 'AUD' satisfies CurrencyCode,
  /** Prototype: checkout is always mocked; never process payment. */
  checkoutEnabled: false,
  /** Whether to show a sticky compact Add to Bag bar after the hero (mobile). */
  stickyPurchaseBar: true,
  /** Default configurator selection. 'bundle' only if the selection is clearly visible (brief §6). */
  defaultSetup: 'top' as 'top' | 'stand' | 'bundle', // TODO(PRODUCT_DATA): revisit once stand/bundle prices confirmed
  /** Shows a small "Prototype" marker on placeholder imagery during review builds. */
  showPlaceholderLabels: true,
} as const
