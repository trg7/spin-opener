import type { Money } from '@/commerce/types'
import { siteCopy } from '@/content/siteCopy'
import { formatMoney } from '@/utils/money'

/** Renders a price, or "Price TBC" when the amount is unconfirmed (null). */
export function Price({ money, className = '' }: { money: Money | null; className?: string }) {
  if (!money) {
    return <span className={`text-ink-muted ${className}`}>{siteCopy.configurator.priceTbc}</span>
  }
  return <span className={`tabular-nums ${className}`}>{formatMoney(money)}</span>
}
