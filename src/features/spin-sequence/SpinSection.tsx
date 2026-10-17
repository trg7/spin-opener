import { StoryBand } from '@/components/layout/StoryBand'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { siteCopy } from '@/content/siteCopy'
import { assets } from '@/data/assetManifest'

const copy = siteCopy.spin

/**
 * 02 Spin — static end state for Stage 1 (motion frame). Stage 2 pins this section and
 * crossfades spinRest → spinMotion → spinMotionFast (docs/ANIMATION_SPEC.md).
 */
export function SpinSection() {
  return (
    <StoryBand
      id="story"
      index={copy.index}
      heading={copy.headingLines}
      support={copy.support}
      mobileOverlay
      media={
        <ResponsiveImage
          asset={assets.spinMotion}
          mobileAsset={assets.spinMotionPortrait}
          className="absolute inset-0"
          imgClassName="object-cover object-[50%_60%]"
        />
      }
      mediaCaption={
        /* clear of the sticky purchase bar (64px + safe area) */
        <div className="absolute inset-x-0 bottom-24 flex flex-col items-center gap-3 md:hidden">
          <span aria-hidden="true" className="h-6 w-px bg-charcoal/50" />
          <p className="font-utility text-label font-medium uppercase text-charcoal/80">
            {copy.footnote}
          </p>
        </div>
      }
    >
      <p className="mt-6 hidden font-utility text-label font-medium uppercase text-ink-muted md:block">
        {copy.footnote}
      </p>
    </StoryBand>
  )
}
