import { assets } from '@/data/assetManifest'

/** The original client wordmark (centred lockup with rule). Never re-typeset. */
export function Wordmark({ className = '' }: { className?: string }) {
  const { src, alt, width, height } = assets.brandWordmark
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`block w-auto ${className}`}
    />
  )
}
