import { useId } from 'react'
import type { Product } from '@/commerce/types'
import { Price } from '@/components/ui/Price'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { assets, type AssetKey } from '@/data/assetManifest'

interface Props {
  product: Product
  name: string
  checked: boolean
  onSelect: () => void
}

/** One radio card: row on mobile (UX board), column with image on top at ≥1024 (storyboard). */
export function SetupOption({ product, name, checked, onSelect }: Props) {
  const variant = product.variants[0]
  const image = assets[product.imageKey as AssetKey]
  const descId = useId()
  return (
    <label
      className={`group relative flex cursor-pointer items-center gap-4 rounded-card border p-3 transition-colors lg:flex-col lg:items-stretch lg:gap-3 ${
        checked ? 'border-charcoal bg-paper' : 'border-grid bg-paper/60 hover:border-ink-muted'
      } has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-teal`}
    >
      <input
        type="radio"
        name={name}
        value={product.kind}
        checked={checked}
        onChange={onSelect}
        aria-label={product.title}
        aria-describedby={`${descId}-sub ${descId}-price`}
        className="sr-only"
      />
      <ResponsiveImage
        asset={image}
        decorative
        hideBadge
        className="size-16 shrink-0 overflow-hidden rounded-[0.25rem] lg:aspect-[4/3] lg:size-auto lg:w-full"
        imgClassName="object-cover"
      />
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="font-utility text-label font-medium uppercase">{product.title}</span>
        <span id={`${descId}-sub`} className="text-sm text-ink-muted">
          {product.subtitle}
        </span>
      </span>
      <span id={`${descId}-price`} className="shrink-0 text-sm lg:text-base">
        <Price money={variant?.price ?? null} />
      </span>
      <span
        aria-hidden="true"
        className={`absolute right-3 top-3 hidden size-4 rounded-full border lg:block ${
          checked ? 'border-charcoal bg-charcoal ring-2 ring-inset ring-paper' : 'border-grid'
        }`}
      />
    </label>
  )
}
