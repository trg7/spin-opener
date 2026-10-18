import {
  bottomViewRadii,
  ringPath,
  SIDE_VIEWBOX,
  sideExtents,
  sideProfilePath,
  topViewRadii,
} from './topGeometry'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1,
  vectorEffect: 'non-scaling-stroke',
} as const

/** Side elevation with centre line and optional dimension lines (labels are passed in — never invented). */
export function SideView({
  className = '',
  widthLabel,
  heightLabel,
}: {
  className?: string
  widthLabel?: string
  heightLabel?: string
}) {
  const { left, right, top, bottom } = sideExtents
  const dims = widthLabel !== undefined || heightLabel !== undefined
  return (
    <svg
      viewBox={dims ? '0 -4 232 170' : SIDE_VIEWBOX}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <line x1="100" y1="0" x2="100" y2="140" {...stroke} strokeDasharray="4 3" opacity={0.5} />
      <path d={sideProfilePath} {...stroke} />
      <path d={ringPath} {...stroke} opacity={0.6} />
      {widthLabel !== undefined && (
        <g>
          <line x1={left} y1="150" x2={right} y2="150" {...stroke} />
          <line x1={left} y1="145" x2={left} y2="155" {...stroke} />
          <line x1={right} y1="145" x2={right} y2="155" {...stroke} />
          <text
            x="100"
            y="165"
            textAnchor="middle"
            className="fill-current font-utility text-[9px] lg:text-[7px] uppercase tracking-[0.14em]"
          >
            {widthLabel}
          </text>
        </g>
      )}
      {heightLabel !== undefined && (
        <g>
          <line x1="200" y1={top} x2="200" y2={bottom} {...stroke} />
          <line x1="195" y1={top} x2="205" y2={top} {...stroke} />
          <line x1="195" y1={bottom} x2="205" y2={bottom} {...stroke} />
          <text
            x="208"
            y="73"
            className="fill-current font-utility text-[9px] lg:text-[7px] uppercase tracking-[0.14em]"
          >
            {heightLabel}
          </text>
        </g>
      )}
    </svg>
  )
}

function RingsView({
  radii,
  crosshair,
  className = '',
}: {
  radii: number[]
  crosshair?: boolean
  className?: string
}) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      {radii.map((r) => (
        <circle key={r} cx="50" cy="50" r={r} {...stroke} />
      ))}
      {crosshair && (
        <>
          <line x1="0" y1="50" x2="100" y2="50" {...stroke} opacity={0.4} />
          <line x1="50" y1="0" x2="50" y2="100" {...stroke} opacity={0.4} />
        </>
      )}
    </svg>
  )
}

export const TopView = ({ className }: { className?: string }) => (
  <RingsView radii={topViewRadii} crosshair className={className ?? ''} />
)

export const BottomView = ({ className }: { className?: string }) => (
  <RingsView radii={bottomViewRadii} crosshair className={className ?? ''} />
)
