/**
 * Desktop-only annotation callouts + dimension lines over the hero stage.
 * Coordinates are % of the square stage, tuned to the 3D render `heroPrimary` placed at
 * left 11 %, top −2 %, width 78 %: product spans x 20.6–79.4 %, y 16–76.6 %; stem ≈ (50, 28);
 * steel collar (the opener) ≈ (63, 66). Re-tune if the hero render's camera changes.
 */
const line = { stroke: 'currentColor', strokeWidth: 1, vectorEffect: 'non-scaling-stroke' } as const

const labelClass =
  'absolute font-utility text-[0.625rem] font-medium uppercase leading-snug tracking-[0.14em] text-ink-muted'

export function HeroAnnotations({
  labels,
  widthLabel,
  heightLabel,
}: {
  labels: { spin: string; opener: string }
  widthLabel: string
  heightLabel: string
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
        <polyline points="2,16 22,16 49.5,28" fill="none" {...line} />
        {/* leader: opener → steel collar */}
        <polyline points="98,80 86,80 64,67" fill="none" {...line} />
        {/* height */}
        <line x1="88" y1="16" x2="88" y2="76.6" {...line} />
        <line x1="86.5" y1="16" x2="89.5" y2="16" {...line} />
        <line x1="86.5" y1="76.6" x2="89.5" y2="76.6" {...line} />
        {/* width */}
        <line x1="20.6" y1="86" x2="79.4" y2="86" {...line} />
        <line x1="20.6" y1="84.5" x2="20.6" y2="87.5" {...line} />
        <line x1="79.4" y1="84.5" x2="79.4" y2="87.5" {...line} />
      </svg>
      <span className={`${labelClass} left-[2%] top-[9.5%] max-w-[17ch]`}>{labels.spin}</span>
      <span className={`${labelClass} right-[2%] top-[82%] text-right`}>{labels.opener}</span>
      <span className={`${labelClass} left-[89.5%] top-[44%]`}>{heightLabel}</span>
      <span className={`${labelClass} left-1/2 top-[88%] -translate-x-1/2`}>{widthLabel}</span>
    </div>
  )
}
