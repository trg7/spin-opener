import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { ArrowRightIcon } from './icons'

type Variant = 'primary' | 'outline' | 'text'
type Size = 'sm' | 'md' | 'lg'

interface StyleProps {
  variant?: Variant
  /** Pill height + padding (ignored by the `text` variant). */
  size?: Size
  /** Trailing arrow, as on every board CTA ("ADD TO BAG →"). */
  arrow?: boolean
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

const base =
  'inline-flex min-h-11 items-center justify-center gap-s16 whitespace-nowrap rounded-pill type-label transition-[background-color,color,transform] duration-200 ease-out-soft active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40'

const variants: Record<Variant, string> = {
  primary: 'bg-charcoal text-warm-white hover:bg-black',
  outline: 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-warm-white',
  text: 'px-0 text-charcoal underline-offset-4 hover:underline',
}

const sizes: Record<Size, string> = {
  sm: 'h-11 px-s24',
  md: 'h-12 px-s24',
  /** Large on wide screens (≥1280); `md` below, where columns are narrower. */
  lg: 'h-12 px-s24 xl:h-14 xl:px-s40',
}

function buttonParts({
  variant = 'primary',
  size = 'md',
  arrow = false,
  fullWidth = false,
  className = '',
  children,
}: StyleProps) {
  return {
    className: [
      base,
      variants[variant],
      variant === 'text' ? '' : sizes[size],
      fullWidth ? 'w-full' : '',
      className,
    ].join(' '),
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
  size,
  arrow,
  fullWidth,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const parts = buttonParts({ variant, size, arrow, fullWidth, className, children } as StyleProps)
  return (
    <button type={type} className={parts.className} {...rest}>
      {parts.content}
    </button>
  )
}

export function ButtonLink({
  variant,
  size,
  arrow,
  fullWidth,
  className,
  children,
  ...rest
}: LinkProps) {
  const parts = buttonParts({ variant, size, arrow, fullWidth, className, children } as StyleProps)
  return (
    <a className={parts.className} {...rest}>
      {parts.content}
    </a>
  )
}
