import { useRef } from 'react'
import type { Product } from '@/commerce/types'
import { AddToBagButton } from '@/components/commerce/AddToBagButton'
import { ConstructionGeometry } from '@/components/technical/ConstructionGeometry'
import { TechnicalViews } from '@/components/technical/TechnicalViews'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Price } from '@/components/ui/Price'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { SectionIndex } from '@/components/ui/SectionIndex'
import { siteCopy } from '@/content/siteCopy'
import { assets, imageMasks } from '@/data/assetManifest'
import { HeroAnnotations } from './HeroAnnotations'
import { heroProductStyle } from './heroGeometry'
import { useHeroMotion } from './useHeroMotion'

const copy = siteCopy.hero

/**
 * 01 Hero (approved direction, D-050).
 * ≥1280 on the page grid: copy cols 1–4 · product stage cols 4–9 (centred on the viewport, under
 * the wordmark) · technical views cols 11–12 behind a hairline divider.
 * 1024–1279: no views; the stage takes cols 5–12 so the copy keeps its room.
 * <1024: stacked; price + CTA pinned to the foot of the first screen.
 */
export function HeroSection({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null)
  useHeroMotion(ref)
  const variant = product.variants[0]
  if (!variant) return null

  /** Rendered twice (mobile foot / desktop copy column); only the mobile one is observed by the sticky bar. */
  const purchase = (observed: boolean) => (
    <div
      data-hero="purchase"
      className="flex items-center justify-between gap-s24 lg:justify-start xl:gap-s40"
    >
      <Price money={variant.price} className="type-price" />
      <div {...(observed ? { 'data-hero-cta': '' } : {})}>
        <AddToBagButton variantId={variant.id} quantity={1} size={observed ? 'md' : 'lg'} />
      </div>
    </div>
  )

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-heading"
      className="page-x relative overflow-x-clip"
    >
      <div className="page-container flex min-h-[calc(100svh-var(--header-h))] flex-col gap-s24 pb-s24 pt-s40 lg:grid-page lg:min-h-[max(40rem,calc(100svh-var(--header-h)))] lg:gap-y-0 lg:py-s40">
        {/* Copy */}
        <div className="section-intro relative z-10 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:justify-center">
          <SectionIndex>{copy.index}</SectionIndex>
          <h1 id="hero-heading" className="type-hero">
            {copy.headingLines.map((line) => (
              <span key={line} data-hero="line" className="block">
                {line}
              </span>
            ))}
          </h1>
          <p data-hero="support" className="max-w-measure type-lead text-ink-muted lg:max-w-none">
            {copy.supportLines.map((line) => (
              <span key={line} className="lg:block">
                {line}{' '}
              </span>
            ))}
          </p>
          <div data-intro-action className="hidden lg:block">
            {purchase(false)}
          </div>
        </div>

        {/* Product stage: square, centred under the wordmark; fits the screen height on desktop */}
        <div className="relative flex min-h-[18rem] flex-1 items-center justify-center lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:min-h-0 xl:col-span-6 xl:col-start-4">
          <div className="relative aspect-square w-full max-w-[34rem] md:max-w-[30rem] lg:w-[min(100%,calc(100svh-var(--header-h)-2*var(--spacing-s40)))] lg:max-w-none">
            <ConstructionGeometry detail="minimal" className="absolute inset-0 size-full" />
            <div data-hero="product" className="absolute" style={heroProductStyle}>
              <ResponsiveImage
                asset={assets.heroPrimary}
                maskSrc={imageMasks.heroPrimary}
                priority
                hideBadge
              />
            </div>
            {assets.heroPrimary.status !== 'final' && (
              <p className="absolute bottom-0 left-0 type-caption text-ink-muted">
                {siteCopy.meta.prototypeImage}
              </p>
            )}
            <HeroAnnotations image={assets.heroPrimary} />
          </div>
        </div>

        {/* Technical views (≥1280), behind a hairline divider */}
        <div
          data-hero="views"
          className="hidden xl:col-span-2 xl:col-start-11 xl:row-start-1 xl:flex xl:items-center xl:border-l xl:border-grid xl:pl-s24"
        >
          <TechnicalViews labels={copy.views} className="w-full gap-s40" />
        </div>

        {/* Mobile foot: origin + price/CTA */}
        <div data-hero="foot" className="flex flex-col gap-s16 lg:hidden">
          <div className="border-t border-grid pt-s16">
            <Eyebrow>{siteCopy.brand.origin}</Eyebrow>
          </div>
          {purchase(true)}
        </div>
      </div>
    </section>
  )
}
