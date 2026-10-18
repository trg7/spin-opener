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
  const radioMark = (
    <span
      aria-hidden="true"
      className={`hidden size-4 shrink-0 rounded-full border lg:block ${
        checked ? 'border-charcoal bg-charcoal ring-2 ring-inset ring-paper' : 'border-grid'
      }`}
    />
  )
  return (
    <label
      className={`group relative flex h-full cursor-pointer items-center gap-s16 rounded-card border p-s16 transition-colors lg:flex-col lg:items-stretch ${
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
      <span className="flex min-w-0 flex-1 flex-col gap-s8 lg:pt-s8">
        <span className="flex items-center justify-between gap-s8">
          <span className="type-label">{product.title}</span>
          {radioMark}
        </span>
        <span id={`${descId}-sub`} className="type-small text-ink-muted">
          {product.subtitle}
        </span>
      </span>
      {/* Price sits on the card foot (≥1024) so all three line up regardless of copy length */}
      <span
        id={`${descId}-price`}
        className="shrink-0 type-small lg:mt-auto lg:border-t lg:border-grid lg:pt-s16 lg:type-body"
      >
        <Price money={variant?.price ?? null} />
      </span>
    </label>
  )
}
