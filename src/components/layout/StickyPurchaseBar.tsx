import { useEffect, useState } from 'react'
import type { Product } from '@/commerce/types'
import { AddToBagButton } from '@/components/commerce/AddToBagButton'
import { Price } from '@/components/ui/Price'
import { siteConfig } from '@/config/siteConfig'
import { useUiStore } from '@/store/uiStore'

/** Selectors observed to decide visibility. Hero CTA carries `data-hero-cta`. */
const HERO_CTA = '[data-hero-cta]'
const SHOP_SECTION = '#shop'

/**
 * Mobile-only compact purchase bar. Appears once the hero CTA has scrolled away; hides
 * while the configurator is on screen (it has its own CTA) and while the bag is open.
 */
export function StickyPurchaseBar({ product }: { product: Product }) {
  const [heroCtaVisible, setHeroCtaVisible] = useState(true)
  const [shopVisible, setShopVisible] = useState(false)
  const isCartOpen = useUiStore((s) => s.isCartOpen)
  const variant = product.variants[0]

  useEffect(() => {
    const hero = document.querySelector(HERO_CTA)
    const shop = document.querySelector(SHOP_SECTION)
    if (!hero || !shop || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setHeroCtaVisible(e.isIntersecting || e.boundingClientRect.top > 0)
        if (e.target === shop) setShopVisible(e.isIntersecting)
      }
    })
    io.observe(hero)
    io.observe(shop)
    return () => io.disconnect()
  }, [])

  if (!siteConfig.stickyPurchaseBar || !variant) return null
  const visible = !heroCtaVisible && !shopVisible && !isCartOpen

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-grid bg-warm-white/95 backdrop-blur-sm transition-transform duration-300 ease-out-soft md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="page-x flex h-16 items-center justify-between gap-4">
        <div className="flex flex-col leading-tight">
          <span className="type-label">{product.title}</span>
          <Price money={variant.price} className="type-small text-ink-muted" />
        </div>
        <AddToBagButton variantId={variant.id} quantity={1} size="sm" />
      </div>
    </div>
  )
}
