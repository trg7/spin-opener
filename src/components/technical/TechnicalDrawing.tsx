import {
  bottomViewRadii,
  sideExtents,
  sideProfilePath,
  SIDE_VIEWBOX,
  topViewRadii,
} from './topGeometry'

/** All drawings use millimetre user units (see topGeometry.ts). */
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1,
  vectorEffect: 'non-scaling-stroke',
} as const

const labelClass = 'fill-current font-utility uppercase tracking-[0.14em]'

/**
 * Side elevation traced from the 3D model, with optional dimension lines.
 * Labels are passed in from product data — never invented here.
 */
export function SideView({
  className = '',
  widthLabel,
  heightLabel,
}: {
  className?: string
  widthLabel?: string
  heightLabel?: string
}) {
  const { radius: r, height: h } = sideExtents
  const dims = widthLabel !== undefined || heightLabel !== undefined
  const tick = 1.5
  const dimY = h + 6 // width dimension line below the tip
  const dimX = r + 6 // height dimension line right of the disc
  return (
    <svg
      viewBox={dims ? `${-r - 2} -2 ${2 * r + 24} ${h + 16}` : SIDE_VIEWBOX}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <line x1="0" y1="-1" x2="0" y2={h + 1} {...stroke} strokeDasharray="3 2" opacity={0.45} />
      <path d={sideProfilePath} {...stroke} />
      {widthLabel !== undefined && (
        <g>
          <line x1={-r} y1={dimY} x2={r} y2={dimY} {...stroke} />
          <line x1={-r} y1={dimY - tick} x2={-r} y2={dimY + tick} {...stroke} />
          <line x1={r} y1={dimY - tick} x2={r} y2={dimY + tick} {...stroke} />
          <text
            x="0"
            y={dimY + 6}
            textAnchor="middle"
            className={`${labelClass} text-[3.4px] lg:text-[2.6px]`}
          >
            {widthLabel}
          </text>
        </g>
      )}
      {heightLabel !== undefined && (
        <g>
          <line x1={dimX} y1="0" x2={dimX} y2={h} {...stroke} />
          <line x1={dimX - tick} y1="0" x2={dimX + tick} y2="0" {...stroke} />
          <line x1={dimX - tick} y1={h} x2={dimX + tick} y2={h} {...stroke} />
          <text
            x={dimX + 2.5}
            y={h / 2 + 1}
            className={`${labelClass} text-[3.4px] lg:text-[2.6px]`}
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
  const R = Math.max(...radii) + 1
  return (
    <svg
      viewBox={`${-R} ${-R} ${2 * R} ${2 * R}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {radii.map((r) => (
        <circle key={r} cx="0" cy="0" r={r} {...stroke} />
      ))}
      {crosshair && (
        <>
          <line x1={-R} y1="0" x2={R} y2="0" {...stroke} opacity={0.4} />
          <line x1="0" y1={-R} x2="0" y2={R} {...stroke} opacity={0.4} />
        </>
      )}
    </svg>
  )
}

export const TopView = ({ className }: { className?: string }) => (
  <RingsView radii={topViewRadii} crosshair className={className ?? ''} />
)

export const BottomView = ({ className }: { className?: string }) => (
  <RingsView radii={bottomViewRadii} className={className ?? ''} />
)
