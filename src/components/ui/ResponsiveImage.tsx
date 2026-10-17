import { useState } from 'react'
import { siteConfig } from '@/config/siteConfig'
import { siteCopy } from '@/content/siteCopy'
import type { ImageAsset } from '@/data/assetManifest'

interface Props {
  asset: ImageAsset
  /** Swapped in below 768px (e.g. a portrait crop). */
  mobileAsset?: ImageAsset
  className?: string
  imgClassName?: string
  /** Above-the-fold image: eager + high fetch priority. */
  priority?: boolean
  /** Decorative images get empty alt. */
  decorative?: boolean
  /** Hide the "Prototype image" badge (e.g. tiny thumbnails). */
  hideBadge?: boolean
}

/**
 * Manifest-driven image: explicit dimensions (no layout shift), lazy by default,
 * labelled fallback on error or when the asset is missing, and a review badge on
 * provisional imagery.
 */
export function ResponsiveImage({
  asset,
  mobileAsset,
  className = '',
  imgClassName = '',
  priority = false,
  decorative = false,
  hideBadge = false,
}: Props) {
  const [failed, setFailed] = useState(false)
  const isPlaceholder =
    asset.status !== 'final' || (mobileAsset !== undefined && mobileAsset.status !== 'final')
  const showBadge = siteConfig.showPlaceholderLabels && isPlaceholder && !hideBadge

  if (!asset.src || failed) {
    return (
      <div
        role={decorative ? undefined : 'img'}
        aria-label={decorative ? undefined : asset.alt}
        className={`flex items-center justify-center border border-dashed border-grid bg-paper ${className}`}
      >
        <span className="px-3 text-center font-utility text-label uppercase text-ink-muted">
          {siteCopy.meta.imageUnavailable}
        </span>
      </div>
    )
  }

  // Callers may position the wrapper (e.g. `absolute inset-0`); only default to `relative`
  // otherwise — combining both lets Tailwind's later `relative` rule win.
  const positioned = /\b(absolute|fixed|sticky)\b/.test(className)

  return (
    <div className={`${positioned ? '' : 'relative'} ${className}`}>
      <picture className="block size-full">
        {mobileAsset?.src && (
          <source
            media="(max-width: 767px)"
            srcSet={mobileAsset.src}
            width={mobileAsset.width}
            height={mobileAsset.height}
          />
        )}
        <img
          src={asset.src}
          alt={decorative ? '' : asset.alt}
          width={asset.width}
          height={asset.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onError={() => setFailed(true)}
          className={`block h-full w-full ${imgClassName}`}
        />
      </picture>
      {showBadge && (
        <span className="pointer-events-none absolute bottom-2 left-2 rounded-sm bg-warm-white/85 px-1.5 py-0.5 font-utility text-[0.5625rem] font-medium uppercase tracking-[0.12em] text-ink-muted">
          {siteCopy.meta.prototypeImage}
        </span>
      )}
    </div>
  )
}
