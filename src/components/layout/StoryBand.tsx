import { useId, type ReactNode, type Ref } from 'react'
import { SectionIntro } from './SectionIntro'

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
 * Shared editorial band for the story sections (spin, lifestyle, reveal, making).
 * <768: copy + full-bleed image (or overlay). 768–1023: stacked, landscape image.
 * ≥1024: on the 12-column grid — copy in columns 1–5, vertically centred on the media;
 * media from column 6, bleeding to the right viewport edge. The media box sets the band's
 * size (`object-cover`), so alignment never depends on an image's own dimensions.
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
      className={`page-x relative overflow-x-clip ${className}`}
    >
      <div className="page-container relative lg:grid-page lg:min-h-band lg:items-center">
        <SectionIntro
          motion="copy"
          index={index}
          headingId={headingId}
          heading={heading}
          support={support}
          supportClassName={mobileOverlay ? 'hidden md:block' : ''}
          className={`z-10 lg:col-span-5 lg:py-s64 ${
            mobileOverlay
              ? 'absolute inset-x-0 top-0 pt-s40 md:relative md:pb-s40 md:pt-section'
              : 'relative pb-s40 pt-section'
          }`}
        >
          {children}
        </SectionIntro>

        <div
          data-motion="media"
          className={`relative bleed-x overflow-hidden md:aspect-[16/10] md:h-auto md:max-h-none md:min-h-0 lg:col-start-6 lg:col-end-13 lg:aspect-auto lg:min-h-band lg:self-stretch lg:bleed-right ${
            mobileOverlay ? 'h-[100svh] max-h-[52rem] min-h-[34rem]' : 'aspect-[4/5] max-h-[80svh]'
          }`}
        >
          {media}
          {mediaCaption}
        </div>
      </div>
    </section>
  )
}
