import type { Money } from '@/commerce/types'
import { siteConfig } from '@/config/siteConfig'

const formatter = new Intl.NumberFormat(siteConfig.locale, {
  style: 'currency',
  currency: siteConfig.currencyCode,
  currencyDisplay: 'narrowSymbol',
})

/** Formats as "A$24.99" to match the reference boards. */
export const formatMoney = (money: Money): string => `A${formatter.format(money.amountCents / 100)}`
