import { useRef } from 'react'
import type { Product } from '@/commerce/types'
import { AddToBagButton } from '@/components/commerce/AddToBagButton'
import { ConstructionGeometry } from '@/components/technical/ConstructionGeometry'
import { TechnicalViews } from '@/components/technical/TechnicalViews'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { BookmarkIcon, GiftIcon, PrintIcon } from '@/components/ui/icons'
import { Price } from '@/components/ui/Price'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { siteCopy } from '@/content/siteCopy'
import { assets } from '@/data/assetManifest'
import { topSpecs } from '@/data/products'
import { HeroAnnotations } from './HeroAnnotations'
import { useHeroMotion } from './useHeroMotion'

const copy = siteCopy.hero
const featureIcons = [BookmarkIcon, PrintIcon, GiftIcon]

/**
 * 01 Hero — object + proposition + buy. Mobile (<1024): stacked as on the UX board,
 * price + CTA pinned to the bottom of the first screen. Desktop: copy | object | views.
 */
export function HeroSection({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null)
  useHeroMotion(ref)
  const variant = product.variants[0]
  if (!variant) return null

  /** Rendered twice (mobile foot / desktop copy column); only the mobile one is observed by the sticky bar. */
  const purchase = (observed: boolean) => (
    <div data-hero="purchase" className="flex items-center justify-between gap-6 lg:justify-start">
      <Price money={variant.price} className="text-2xl font-light lg:text-[1.75rem]" />
      <div {...(observed ? { 'data-hero-cta': '' } : {})}>
        <AddToBagButton variantId={variant.id} quantity={1} />
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
      <div className="page-container flex min-h-[calc(100svh-4rem)] flex-col pb-6 pt-6 md:pt-10 lg:grid lg:min-h-[44rem] lg:grid-cols-12 lg:gap-x-8 lg:pb-12 lg:pt-12">
        {/* Copy */}
        <div className="relative z-10 flex flex-col gap-5 lg:col-span-4 lg:justify-center lg:gap-7">
          <Eyebrow className="hidden lg:block">{copy.origin}</Eyebrow>
          <h1 id="hero-heading" className="text-display-xl font-light">
            {copy.headingLines.map((line) => (
              <span key={line} data-hero="line" className="block">
                {line}
              </span>
            ))}
          </h1>
          <p data-hero="support" className="max-w-[22ch] text-body text-ink-muted lg:max-w-[30ch]">
            {copy.supportLines.map((line) => (
              <span key={line} className="block lg:inline">
                {line}{' '}
              </span>
            ))}
          </p>
          <div className="hidden lg:mt-4 lg:block">{purchase(false)}</div>
        </div>

        {/* Object stage */}
        <div className="relative flex min-h-[18rem] flex-1 items-center justify-center lg:col-span-6 lg:min-h-0">
          <div className="relative aspect-square w-full max-w-[34rem]">
            <ConstructionGeometry
              detail="simple"
              className="absolute left-1/2 top-1/2 w-[118%] max-w-none -translate-x-1/2 -translate-y-1/2 lg:hidden"
            />
            <ConstructionGeometry className="absolute inset-0 hidden size-full lg:block" />
            <div data-hero="product" className="absolute left-[11%] top-[-2%] w-[78%]">
              <ResponsiveImage asset={assets.heroPrimary} priority />
            </div>
            <HeroAnnotations
              labels={copy.annotations}
              widthLabel={siteCopy.details.mm(topSpecs.diameterMm)}
              heightLabel={siteCopy.details.mm(topSpecs.heightMm)}
            />
          </div>
        </div>

        {/* Technical views (desktop) */}
        <div data-hero="views" className="hidden lg:col-span-2 lg:flex lg:items-center">
          <TechnicalViews labels={copy.views} className="w-full" />
        </div>

        {/* Mobile foot: origin + price/CTA */}
        <div data-hero="foot" className="flex flex-col gap-4 lg:hidden">
          <div className="border-t border-grid pt-3">
            <Eyebrow>{copy.origin}</Eyebrow>
          </div>
          {purchase(true)}
        </div>

        {/* Desktop feature row */}
        <ul
          data-hero="features"
          className="hidden border-t border-grid pt-6 lg:col-span-10 lg:mt-4 lg:flex lg:gap-14"
        >
          {copy.features.map((f, i) => {
            const Icon = featureIcons[i] ?? BookmarkIcon
            return (
              <li key={f} className="flex items-center gap-3">
                <Icon size={18} className="text-ink-muted" />
                <span className="max-w-[16ch] font-utility text-[0.625rem] font-medium uppercase leading-snug tracking-[0.14em] text-ink-muted">
                  {f}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
