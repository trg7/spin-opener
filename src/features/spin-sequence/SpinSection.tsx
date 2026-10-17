import { useRef } from 'react'
import { StoryBand } from '@/components/layout/StoryBand'
import { ConstructionGeometry } from '@/components/technical/ConstructionGeometry'
import { SideView } from '@/components/technical/TechnicalDrawing'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { siteCopy } from '@/content/siteCopy'
import { assets } from '@/data/assetManifest'
import { useSpinMotion } from './useSpinMotion'

const copy = siteCopy.spin
/** Layers hidden by default so the no-JS / reduced-motion state is the spinMotion frame. */
const hiddenLayer = 'invisible absolute inset-0 opacity-0 max-md:hidden'

/**
 * 02 Spin — the ONE pinned sequence. See ./AGENTS.md and docs/ANIMATION_SPEC.md §2.
 * Layer stack (bottom → top): spinMotion (base, static end state) · spinRest · spinMotionFast · technical.
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
        <div className="absolute inset-0">
          <div data-spin="base" className="absolute inset-0">
            <ResponsiveImage
              asset={assets.spinMotion}
              mobileAsset={assets.spinMotionPortrait}
              className="absolute inset-0"
              imgClassName="object-cover object-[50%_60%]"
            />
          </div>
          <div data-spin="rest" className={hiddenLayer}>
            <ResponsiveImage
              asset={assets.spinRest}
              className="absolute inset-0"
              imgClassName="object-cover object-[50%_60%]"
              hideBadge
            />
          </div>
          <div data-spin="fast" className={hiddenLayer}>
            <ResponsiveImage
              asset={assets.spinMotionFast}
              className="absolute inset-0"
              imgClassName="object-cover object-[50%_60%]"
              hideBadge
            />
          </div>
          <div
            data-spin="technical"
            aria-hidden="true"
            className={`${hiddenLayer} flex items-center justify-center bg-warm-white text-ink-muted`}
          >
            <ConstructionGeometry className="absolute left-1/2 top-1/2 h-[88%] -translate-x-1/2 -translate-y-1/2" />
            <SideView className="relative w-[38%]" />
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
