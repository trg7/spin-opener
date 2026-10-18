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
    <div
      data-hero="purchase"
      className="flex items-center justify-between gap-s24 lg:justify-start"
    >
      <Price money={variant.price} className="type-price" />
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
      <div className="page-container flex min-h-[calc(100svh-4rem)] flex-col gap-s24 pb-s24 pt-s24 md:pt-s40 lg:grid-page lg:min-h-[44rem] lg:gap-y-0 lg:pb-s64 lg:pt-s40">
        {/* Copy */}
        <div className="section-intro relative z-10 lg:col-span-4 lg:justify-center">
          <Eyebrow className="trim-cap hidden lg:block">{copy.origin}</Eyebrow>
          <h1 id="hero-heading" className="type-hero max-lg:mt-0!">
            {copy.headingLines.map((line) => (
              <span key={line} data-hero="line" className="block">
                {line}
              </span>
            ))}
          </h1>
          <p data-hero="support" className="max-w-[22ch] type-body text-ink-muted lg:max-w-[30ch]">
            {copy.supportLines.map((line) => (
              <span key={line} className="block lg:inline">
                {line}{' '}
              </span>
            ))}
          </p>
          <div data-intro-action className="hidden lg:block">
            {purchase(false)}
          </div>
        </div>

        {/* Object stage */}
        <div className="relative flex min-h-[18rem] flex-1 items-center justify-center lg:col-span-6 lg:min-h-0">
          <div className="relative aspect-square w-full max-w-[34rem]">
            <ConstructionGeometry
              detail="simple"
              className="absolute left-1/2 top-1/2 w-[118%] max-w-none -translate-x-1/2 -translate-y-1/2 lg:hidden"
            />
            <ConstructionGeometry className="absolute inset-0 hidden size-full lg:block" />
            <div data-hero="product" className="absolute left-[15%] top-[3%] w-[70%]">
              <ResponsiveImage asset={assets.heroPrimary} priority imgClassName="feather-radial" />
            </div>
            <HeroAnnotations
              labels={copy.annotations}
              dimensionLabel={siteCopy.details.dimensionTbc}
            />
          </div>
        </div>

        {/* Technical views (desktop) */}
        <div data-hero="views" className="hidden lg:col-span-2 lg:flex lg:items-center">
          <TechnicalViews labels={copy.views} className="w-full" />
        </div>

        {/* Mobile foot: origin + price/CTA */}
        <div data-hero="foot" className="flex flex-col gap-s16 lg:hidden">
          <div className="border-t border-grid pt-s16">
            <Eyebrow>{copy.origin}</Eyebrow>
          </div>
          {purchase(true)}
        </div>

        {/* Desktop feature row */}
        <ul
          data-hero="features"
          className="hidden border-t border-grid pt-s24 lg:col-span-10 lg:mt-s24 lg:flex lg:gap-s64"
        >
          {copy.features.map((f, i) => {
            const Icon = featureIcons[i] ?? BookmarkIcon
            return (
              <li key={f} className="flex items-center gap-s16">
                <Icon size={18} className="text-ink-muted" />
                <span className="max-w-[16ch] type-caption text-ink-muted">{f}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
