import { useRef } from 'react'
import { SideView, TopView } from '@/components/technical/TechnicalDrawing'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { siteCopy } from '@/content/siteCopy'
import { assets } from '@/data/assetManifest'
import { useDetailsMotion } from './useDetailsMotion'

const copy = siteCopy.details
const macros = [assets.detailTexture, assets.detailRing, assets.detailTip]

/**
 * 06 Details — drawings, specs, close-ups. Every dimension and spec is a labelled
 * placeholder until the client supplies real data. TODO(PRODUCT_DATA)
 */
export function DetailsSection() {
  const ref = useRef<HTMLElement>(null)
  useDetailsMotion(ref)
  return (
    <section
      ref={ref}
      id="details"
      aria-labelledby="details-heading"
      className="page-x border-t border-grid py-20 lg:py-28"
    >
      <div className="page-container grid gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-8 lg:col-span-4">
          <div className="flex flex-col gap-4">
            <Eyebrow>{copy.index}</Eyebrow>
            <h2 id="details-heading" className="text-display-l font-light">
              {copy.heading}
            </h2>
          </div>
          <dl className="divide-y divide-grid border-y border-grid">
            {copy.specs.map((s) => (
              <div
                key={s.term}
                data-details
                className="grid grid-cols-[7.5rem_1fr] gap-4 py-4 text-sm"
              >
                <dt className="font-utility text-label font-medium uppercase text-ink-muted">
                  {s.term}
                </dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure data-details className="flex flex-col gap-6 lg:col-span-8">
          <div className="grid grid-cols-[1fr_auto] items-center gap-6 text-ink-muted md:gap-12">
            <SideView
              className="w-full max-w-[24rem]"
              widthLabel={copy.dimensionTbc}
              heightLabel={copy.dimensionTbc}
            />
            <TopView className="w-24 md:w-40" />
          </div>
          <figcaption className="font-utility text-label uppercase text-ink-muted">
            {copy.drawingNote}
          </figcaption>
        </figure>

        <ul className="grid grid-cols-3 gap-3 lg:col-span-8 lg:col-start-5 lg:gap-4">
          {macros.map((m) => (
            <li key={m.src} data-details>
              <ResponsiveImage
                asset={m}
                className="aspect-[2/3] overflow-hidden lg:aspect-square"
                imgClassName="object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
