import { StoryBand } from '@/components/layout/StoryBand'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { siteCopy } from '@/content/siteCopy'
import { assets } from '@/data/assetManifest'

const copy = siteCopy.manufacturing

/** 07 Making — Melbourne small-batch 3D printing. Placeholder imagery is AI, not real production. */
export function ManufacturingSection() {
  return (
    <StoryBand
      id="making"
      index={copy.index}
      heading={copy.headingLines}
      support={copy.support}
      media={
        <ResponsiveImage
          asset={assets.manufacturingPrintBed}
          className="absolute inset-0"
          imgClassName="object-cover"
        />
      }
    />
  )
}
