import { useRef } from 'react'
import { StoryBand } from '@/components/layout/StoryBand'
import { ConstructionGeometry } from '@/components/technical/ConstructionGeometry'
import { SideView } from '@/components/technical/TechnicalDrawing'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { siteCopy } from '@/content/siteCopy'
import { sequencePoster, sequences } from '@/data/assetManifest'
import { useSpinMotion } from './useSpinMotion'

const copy = siteCopy.spin

/**
 * 02 Spin — the ONE pinned sequence. See ./AGENTS.md and docs/ANIMATION_SPEC.md §2.
 * Layers (bottom → top): construction geometry · poster (last frame; no-JS / reduced motion) ·
 * canvas (scroll-scrubbed frame sequence) · technical drawing (≥768, fades into frame 1).
 */
export function SpinSection() {
  const ref = useRef<HTMLElement>(null)
  useSpinMotion(ref)

  return (
    <StoryBand
      ref={ref}
      id="story"
      index={copy.index}
      heading={copy.headingLines}
      support={copy.support}
      mobileOverlay
      media={
        <div className="absolute inset-0 bg-warm-white">
          <div data-spin="geometry" className="absolute inset-0 flex items-center justify-center">
            <ConstructionGeometry
              detail="simple"
              className="w-[125%] max-w-none translate-y-[14%] md:h-[88%] md:w-auto md:translate-y-0"
            />
          </div>
          <div data-spin="poster" className="absolute inset-0">
            <ResponsiveImage
              asset={sequencePoster(sequences.spin)}
              mobileAsset={sequencePoster(sequences.spinPortrait)}
              className="absolute inset-0"
              imgClassName="object-contain"
            />
          </div>
          <canvas
            data-spin="canvas"
            aria-hidden="true"
            className="invisible absolute inset-0 size-full opacity-0"
          />
          <div
            data-spin="technical"
            aria-hidden="true"
            className="invisible absolute inset-0 flex items-center justify-center bg-warm-white text-ink-muted opacity-0 max-md:hidden"
          >
            <ConstructionGeometry className="absolute left-1/2 top-1/2 h-[88%] -translate-x-1/2 -translate-y-1/2" />
            <SideView className="relative w-[34%]" />
          </div>
        </div>
      }
      mediaCaption={
        /* clear of the sticky purchase bar (64px + safe area) */
        <div
          data-spin="footnote-mobile"
          className="absolute inset-x-0 bottom-24 flex flex-col items-center gap-3 md:hidden"
        >
          <span aria-hidden="true" className="h-6 w-px bg-charcoal/50" />
          <p className="font-utility text-label font-medium uppercase text-charcoal/80">
            {copy.footnote}
          </p>
        </div>
      }
    >
      <p
        data-spin="footnote"
        className="mt-6 hidden font-utility text-label font-medium uppercase text-ink-muted md:block"
      >
        {copy.footnote}
      </p>
    </StoryBand>
  )
}
