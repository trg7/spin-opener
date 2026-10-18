/**
 * Fine construction circles + crosshair drawn behind an object.
 * Hairline (non-scaling 1px) in the `grid` token. Decorative.
 * `minimal` (hero, D-050): one circle (r = 75% of the half-width), a vertical axis and two short
 * horizontal ticks outside the circle.
 */
export function ConstructionGeometry({
  detail = 'full',
  className = '',
}: {
  detail?: 'full' | 'simple' | 'minimal'
  className?: string
}) {
  const full = detail === 'full'
  if (detail === 'minimal') {
    return (
      <svg
        viewBox="0 0 400 400"
        className={`pointer-events-none text-grid ${className}`}
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        focusable="false"
        data-construction
      >
        <g strokeWidth={1}>
          <circle cx="200" cy="200" r="150" vectorEffect="non-scaling-stroke" />
          <line x1="200" y1="30" x2="200" y2="400" vectorEffect="non-scaling-stroke" />
          <line x1="22" y1="200" x2="58" y2="200" vectorEffect="non-scaling-stroke" />
          <line x1="342" y1="200" x2="378" y2="200" vectorEffect="non-scaling-stroke" />
        </g>
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 400 400"
      className={`pointer-events-none text-grid ${className}`}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      focusable="false"
      data-construction
    >
      <g strokeWidth={1} vectorEffect="non-scaling-stroke">
        <circle cx="200" cy="200" r="190" vectorEffect="non-scaling-stroke" />
        <circle cx="200" cy="200" r="140" vectorEffect="non-scaling-stroke" />
        {full && <circle cx="200" cy="200" r="78" vectorEffect="non-scaling-stroke" />}
        <line x1="0" y1="200" x2="400" y2="200" vectorEffect="non-scaling-stroke" />
        <line x1="200" y1="0" x2="200" y2="400" vectorEffect="non-scaling-stroke" />
        {full && (
          <>
            <line x1="66" y1="66" x2="334" y2="334" vectorEffect="non-scaling-stroke" />
            <line x1="334" y1="66" x2="66" y2="334" vectorEffect="non-scaling-stroke" />
          </>
        )}
      </g>
    </svg>
  )
}
