import { MotionProvider } from '@/app/providers/MotionProvider'
import { CartDrawer } from '@/components/commerce/CartDrawer'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { StickyPurchaseBar } from '@/components/layout/StickyPurchaseBar'
import { siteCopy } from '@/content/siteCopy'
import { getProductByKind } from '@/data/products'
import { BottleRevealSection } from '@/features/bottle-reveal/BottleRevealSection'
import { DetailsSection } from '@/features/details/DetailsSection'
import { HeroSection } from '@/features/hero/HeroSection'
import { LifestyleStandSection } from '@/features/lifestyle-stand/LifestyleStandSection'
import { ManufacturingSection } from '@/features/manufacturing/ManufacturingSection'
import { ProductConfigurator } from '@/features/product-configurator/ProductConfigurator'
import { SpinSection } from '@/features/spin-sequence/SpinSection'

const top = getProductByKind('top')

/** Composition only — section order follows the style guide (§04) and brief. */
export function App() {
  return (
    <MotionProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-warm-white focus:px-4 focus:py-2"
      >
        {siteCopy.meta.skipToContent}
      </a>
      <SiteHeader />
      <main id="main">
        <HeroSection product={top} />
        <SpinSection />
        <BottleRevealSection />
        <LifestyleStandSection />
        <ProductConfigurator />
        <DetailsSection />
        <ManufacturingSection />
      </main>
      <SiteFooter />
      <StickyPurchaseBar product={top} />
      <CartDrawer />
    </MotionProvider>
  )
}
