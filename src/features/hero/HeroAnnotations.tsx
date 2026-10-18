/**
 * Desktop-only annotation callouts + dimension lines over the hero stage.
 * Coordinates are % of the square stage and are tuned to the placeholder hero crop
 * (product spans ≈ x 21–79 %, y 24–76 %; disc edge ≈ 78 %, 52 %). Re-tune when the real render lands.
 */
const line = { stroke: 'currentColor', strokeWidth: 1, vectorEffect: 'non-scaling-stroke' } as const

const labelClass = 'absolute type-caption text-ink-muted'

export function HeroAnnotations({
  labels,
  dimensionLabel,
}: {
  labels: { spin: string; opener: string }
  dimensionLabel: string
}) {
  return (
    <div data-hero="annotations" className="pointer-events-none absolute inset-0 hidden lg:block">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full text-ink-muted/60"
        aria-hidden="true"
      >
        {/* leader: spin → stem */}
        <polyline points="2,16 22,16 49,31" fill="none" {...line} />
        {/* leader: opener → disc edge */}
        <polyline points="98,16 84,16 78,50" fill="none" {...line} />
        {/* height */}
        <line x1="88" y1="24" x2="88" y2="76" {...line} />
        <line x1="86.5" y1="24" x2="89.5" y2="24" {...line} />
        <line x1="86.5" y1="76" x2="89.5" y2="76" {...line} />
        {/* width */}
        <line x1="21" y1="84" x2="79" y2="84" {...line} />
        <line x1="21" y1="82.5" x2="21" y2="85.5" {...line} />
        <line x1="79" y1="82.5" x2="79" y2="85.5" {...line} />
      </svg>
      <span className={`${labelClass} left-[2%] top-[9.5%] max-w-[17ch]`}>{labels.spin}</span>
      <span className={`${labelClass} right-[2%] top-[12%] text-right`}>{labels.opener}</span>
      <span className={`${labelClass} left-[90%] top-[48%]`}>{dimensionLabel}</span>
      <span className={`${labelClass} left-1/2 top-[86%] -translate-x-1/2`}>{dimensionLabel}</span>
    </div>
  )
}
