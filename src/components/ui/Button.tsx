import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRightIcon } from './icons'

type Variant = 'primary' | 'outline' | 'text'

interface StyleProps {
  variant?: Variant
  /** Trailing arrow, as on every board CTA ("ADD TO BAG →"). */
  arrow?: boolean
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

const base =
  'inline-flex min-h-11 items-center justify-center gap-s16 rounded-pill type-label transition-[background-color,color,transform] duration-200 ease-out-soft active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40'

const variants: Record<Variant, string> = {
  primary: 'h-12 bg-charcoal px-s24 text-warm-white hover:bg-black',
  outline:
    'h-12 border border-charcoal px-s24 text-charcoal hover:bg-charcoal hover:text-warm-white',
  text: 'px-0 text-charcoal underline-offset-4 hover:underline',
}

function buttonParts({
  variant = 'primary',
  arrow = false,
  fullWidth = false,
  className = '',
  children,
}: StyleProps) {
  return {
    className: [base, variants[variant], fullWidth ? 'w-full' : '', className].join(' '),
    content: (
      <>
        <span>{children}</span>
        {arrow && <ArrowRightIcon size={16} />}
      </>
    ),
  }
}

type ButtonProps = StyleProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof StyleProps>
type LinkProps = StyleProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof StyleProps>

export function Button({
  variant,
  arrow,
  fullWidth,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const parts = buttonParts({ variant, arrow, fullWidth, className, children } as StyleProps)
  return (
    <button type={type} className={parts.className} {...rest}>
      {parts.content}
    </button>
  )
}

export function ButtonLink({ variant, arrow, fullWidth, className, children, ...rest }: LinkProps) {
  const parts = buttonParts({ variant, arrow, fullWidth, className, children } as StyleProps)
  return (
    <a className={parts.className} {...rest}>
      {parts.content}
    </a>
  )
}
