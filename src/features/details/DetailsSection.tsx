import { useRef } from 'react'
import { SectionIntro } from '@/components/layout/SectionIntro'
import { SideView, TopView } from '@/components/technical/TechnicalDrawing'
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
      className="page-x border-t border-grid py-section"
    >
      <div className="page-container flex flex-col gap-s64 lg:grid-page lg:gap-y-s64">
        <div className="flex flex-col gap-s40 lg:col-span-4">
          <SectionIntro
            index={copy.index}
            headingId="details-heading"
            heading={[copy.heading]}
            role="section"
          />
          <dl className="divide-y divide-grid border-y border-grid">
            {copy.specs.map((s) => (
              <div
                key={s.term}
                data-details
                className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-baseline gap-s16 py-s16"
              >
                <dt className="type-label text-ink-muted">{s.term}</dt>
                <dd className="type-small">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Drawings + close-ups share columns 6–12, so their edges line up. */}
        <figure data-details className="flex flex-col gap-s24 lg:col-span-7 lg:col-start-6">
          {/* 4 : 3 widths draw the top view at the same scale as the side elevation */}
          <div className="grid grid-cols-[4fr_3fr] items-start gap-s24 text-ink-muted md:gap-s40">
            <SideView
              className="w-full"
              widthLabel={copy.dimensionTbc}
              heightLabel={copy.dimensionTbc}
            />
            <TopView className="w-full" />
          </div>
          <figcaption className="border-t border-grid pt-s16 type-caption text-ink-muted">
            {copy.drawingNote}
          </figcaption>
        </figure>

        {/* Mobile: a lead close-up over two squares (labels stay legible); ≥768: three squares */}
        <ul className="grid grid-cols-2 gap-s8 md:grid-cols-3 md:gap-grid lg:col-span-7 lg:col-start-6">
          {macros.map((m, i) => (
            <li key={m.src} data-details className={i === 0 ? 'col-span-2 md:col-span-1' : ''}>
              <ResponsiveImage
                asset={m}
                className={`overflow-hidden md:aspect-square ${i === 0 ? 'aspect-[16/10]' : 'aspect-square'}`}
                imgClassName="object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
