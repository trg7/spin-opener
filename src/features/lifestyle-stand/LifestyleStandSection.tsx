import { useRef } from 'react'
import { StoryBand } from '@/components/layout/StoryBand'
import { ArrowRightIcon } from '@/components/ui/icons'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { siteCopy } from '@/content/siteCopy'
import { assets } from '@/data/assetManifest'
import { useStoryBandMotion } from '@/motion/useStoryBandMotion'

const copy = siteCopy.lifestyle

/** 04 Lifestyle + stand — the stand is introduced here, with a quiet link to the configurator. */
export function LifestyleStandSection() {
  const ref = useRef<HTMLElement>(null)
  useStoryBandMotion(ref)
  return (
    <StoryBand
      ref={ref}
      id="lifestyle"
      index={copy.index}
      heading={copy.headingLines}
      support={copy.support}
      media={
        <ResponsiveImage
          asset={assets.lifestyleWide}
          mobileAsset={assets.lifestyleWithStand}
          className="absolute inset-0"
          imgClassName="object-cover object-[40%_60%]"
        />
      }
    >
      <a
        href="#shop"
        className="relative inline-flex items-center gap-s8 type-label before:absolute before:-inset-y-4 before:inset-x-0 text-charcoal underline-offset-4 hover:underline"
      >
        {copy.exploreStand}
        <ArrowRightIcon size={14} />
      </a>
    </StoryBand>
  )
}
