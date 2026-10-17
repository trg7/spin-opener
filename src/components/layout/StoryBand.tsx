import { useId, type ReactNode, type Ref } from 'react'
import { Eyebrow } from '@/components/ui/Eyebrow'

interface Props {
  /** Section element, for the owning feature's motion hook. */
  ref?: Ref<HTMLElement>
  id: string
  index: string
  /** Each entry renders on its own line (deliberate breaks from the boards). */
  heading: readonly string[]
  support?: string
  /** Full-bleed media. Must fill its box (`h-full w-full object-cover`). */
  media: ReactNode
  /**
   * Mobile: overlay the copy on the top of the image (spin board screen), instead of
   * stacking copy above it. Only use where the image top is calm, blurred background.
   */
  mobileOverlay?: boolean
  /** Extra content under the copy (links, footnotes). */
  children?: ReactNode
  /** Rendered over the bottom of the media (e.g. the spin footnote). */
  mediaCaption?: ReactNode
  className?: string
}

/**
 * Shared editorial band for the story sections (spin, reveal, lifestyle, making).
 * <768: copy + full-bleed image (or overlay). 768–1023: stacked, landscape image.
 * ≥1024: copy left (5/12), image bleeding to the right edge (7/12).
 *
 * Motion hooks target `[data-motion="copy"] > *` (copy blocks) and
 * `[data-motion="media"] > :first-child` (the media layer).
 */
export function StoryBand({
  id,
  index,
  heading,
  support,
  media,
  mobileOverlay = false,
  children,
  mediaCaption,
  className = '',
  ref,
}: Props) {
  const headingId = useId()
  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={headingId}
      className={`relative lg:grid lg:min-h-[40rem] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center ${className}`}
    >
      <div
        data-motion="copy"
        className={`page-x z-10 flex flex-col gap-4 lg:py-20 lg:pr-12 lg:pl-[max(2.5rem,calc((100vw-90rem)/2+4rem))] ${
          mobileOverlay
            ? 'absolute inset-x-0 top-0 pt-10 md:relative md:pb-8 md:pt-20'
            : 'relative pb-8 pt-16 md:pt-20'
        }`}
      >
        <Eyebrow>{index}</Eyebrow>
        <h2 id={headingId} className="text-display-l font-light">
          {heading.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        {support && (
          <p
            className={`max-w-[34ch] text-body text-ink-muted ${mobileOverlay ? 'hidden md:block' : ''}`}
          >
            {support}
          </p>
        )}
        {children}
      </div>

      <div
        data-motion="media"
        className={`relative w-full overflow-hidden md:aspect-[16/10] md:h-auto md:max-h-none md:min-h-0 lg:aspect-auto lg:h-full lg:min-h-[40rem] ${
          mobileOverlay ? 'h-[100svh] max-h-[52rem] min-h-[34rem]' : 'aspect-[4/5] max-h-[80svh]'
        }`}
      >
        {media}
        {mediaCaption}
      </div>
    </section>
  )
}
