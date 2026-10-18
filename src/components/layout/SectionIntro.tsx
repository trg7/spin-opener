import type { ReactNode } from 'react'
import { SectionIndex } from '@/components/ui/SectionIndex'

interface Props {
  index: string
  headingId: string
  /** Each entry is a deliberate line break (set `inlineFromLg` to run them together on desktop). */
  heading: readonly string[]
  /** `editorial` for story bands, `section` for functional sections (shop, details). */
  role?: 'editorial' | 'section'
  inlineFromLg?: boolean
  support?: ReactNode
  supportClassName?: string
  /** Actions/footnotes. `a`, `button` and `[data-intro-action]` children get the 40px step. */
  children?: ReactNode
  className?: string
  /** Hook for section motion (`[data-motion="copy"] > *`). */
  motion?: 'copy'
}

/** Index → heading → support → action, on the shared rhythm (`.section-intro`). */
export function SectionIntro({
  index,
  headingId,
  heading,
  role = 'editorial',
  inlineFromLg = false,
  support,
  supportClassName = '',
  children,
  className = '',
  motion,
}: Props) {
  return (
    <div data-motion={motion} className={`section-intro ${className}`}>
      <SectionIndex>{index}</SectionIndex>
      <h2 id={headingId} className={role === 'editorial' ? 'type-editorial' : 'type-section'}>
        {heading.map((line) => (
          <span key={line} className={inlineFromLg ? 'block lg:inline' : 'block'}>
            {line}
            {inlineFromLg && ' '}
          </span>
        ))}
      </h2>
      {support && (
        <p className={`max-w-measure type-lead text-ink-muted ${supportClassName}`}>{support}</p>
      )}
      {children}
    </div>
  )
}
