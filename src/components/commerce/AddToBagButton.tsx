import { Button } from '@/components/ui/Button'
import { siteCopy } from '@/content/siteCopy'

interface Props {
  variantId: string
  quantity: number
  fullWidth?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
}

/**
 * Single wiring point for every "Add to bag" CTA (hero, sticky bar, configurator).
 * Stage 1: renders only. TODO(Stage 3): dispatch `addLines([{ variantId, quantity }])`
 * via the cart store, then open the drawer with the "Added to your bag." confirmation.
 */
export function AddToBagButton({
  variantId,
  quantity,
  fullWidth = false,
  size = 'md',
  className = '',
  label,
}: Props) {
  return (
    <Button
      arrow
      fullWidth={fullWidth}
      size={size}
      className={className}
      data-variant-id={variantId}
      data-quantity={quantity}
    >
      {label ?? siteCopy.commerce.addToBag}
    </Button>
  )
}
