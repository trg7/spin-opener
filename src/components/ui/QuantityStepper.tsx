import { siteCopy } from '@/content/siteCopy'
import { MinusIcon, PlusIcon } from './icons'

interface Props {
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
  /** Accessible name, e.g. "Quantity" or "Quantity, Display Stand". */
  label: string
  size?: 'md' | 'sm'
}

export function QuantityStepper({ value, min = 1, max = 10, onChange, label, size = 'md' }: Props) {
  const btn =
    'flex size-11 items-center justify-center text-charcoal transition-colors hover:text-teal disabled:opacity-30 disabled:hover:text-charcoal'
  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex items-center rounded-pill border border-grid ${size === 'sm' ? 'h-9' : 'h-11'}`}
    >
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={siteCopy.commerce.decrease}
      >
        <MinusIcon size={16} />
      </button>
      <output aria-live="polite" className="min-w-6 text-center text-sm tabular-nums">
        {value}
      </output>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={siteCopy.commerce.increase}
      >
        <PlusIcon size={16} />
      </button>
    </div>
  )
}
