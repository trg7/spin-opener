import { StoryBand } from '@/components/layout/StoryBand'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { siteCopy } from '@/content/siteCopy'
import { assets } from '@/data/assetManifest'

const copy = siteCopy.reveal

/**
 * 03 Reveal — static end state (bottle being opened). Stage 2 starts on bottleUnderside
 * and crossfades to this frame. Imagery is AI-invented: replace with the real mechanism.
 */
export function BottleRevealSection() {
  return (
    <StoryBand
      id="reveal"
      index={copy.index}
      heading={copy.headingLines}
      support={copy.support}
      media={
        <ResponsiveImage
          asset={assets.bottleReveal}
          mobileAsset={assets.bottleRevealPortrait}
          className="absolute inset-0"
          imgClassName="object-cover object-[50%_35%]"
        />
      }
    />
  )
}
