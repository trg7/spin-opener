import { useRef } from 'react'
import { StoryBand } from '@/components/layout/StoryBand'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { siteCopy } from '@/content/siteCopy'
import { assets } from '@/data/assetManifest'
import { useRevealMotion } from './useRevealMotion'

const copy = siteCopy.reveal

/**
 * 03 Reveal — static end state is the bottle being opened. With motion, the frame opens from
 * an inset and (≥768) crossfades from the underside close-up. The underside is rendered
 * from the 3D model; the in-use photo is still AI and should be replaced with a real one.
 */
export function BottleRevealSection() {
  const ref = useRef<HTMLElement>(null)
  useRevealMotion(ref)

  return (
    <StoryBand
      ref={ref}
      id="reveal"
      index={copy.index}
      heading={copy.headingLines}
      support={copy.support}
      media={
        <div data-reveal="frame" className="absolute inset-0 overflow-hidden">
          <div data-reveal="layer" className="absolute inset-0">
            <ResponsiveImage
              asset={assets.bottleReveal}
              mobileAsset={assets.bottleRevealPortrait}
              className="absolute inset-0"
              imgClassName="object-cover object-[50%_35%]"
            />
          </div>
          <div
            data-reveal="underside"
            className="invisible absolute inset-0 bg-warm-white opacity-0 max-md:hidden"
          >
            <ResponsiveImage
              asset={assets.bottleUnderside}
              className="absolute inset-0"
              imgClassName="object-contain p-[6%]"
              hideBadge
            />
          </div>
        </div>
      }
    />
  )
}
