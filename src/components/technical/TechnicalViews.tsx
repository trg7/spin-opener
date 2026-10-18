import { BottomView, SideView, TopView } from './TechnicalDrawing'

/**
 * Top / side / bottom views (desktop hero column). Borderless; drawn at one scale: the side
 * view's disc spans 80% of its box and the ring views' outer circle 92%, so the ring views are
 * sized to 80/92 of the column width.
 */
const RING_VIEW_WIDTH = `${(80 / 92) * 100}%`

export function TechnicalViews({
  labels,
  className = '',
}: {
  labels: { top: string; side: string; bottom: string }
  className?: string
}) {
  const ring = { width: RING_VIEW_WIDTH }
  const panels = [
    { key: 'top', label: labels.top, drawing: <TopView className="aspect-square" />, style: ring },
    { key: 'side', label: labels.side, drawing: <SideView className="w-full" />, style: undefined },
    {
      key: 'bottom',
      label: labels.bottom,
      drawing: <BottomView className="aspect-square" />,
      style: ring,
    },
  ]
  return (
    <ul className={`flex flex-col ${className}`}>
      {panels.map((p) => (
        <li key={p.key} className="flex flex-col items-center gap-s16 text-ink-muted">
          <div className="flex w-full justify-center">
            <div className="[&>svg]:block [&>svg]:w-full" style={p.style ?? { width: '100%' }}>
              {p.drawing}
            </div>
          </div>
          <span className="type-caption">{p.label}</span>
        </li>
      ))}
    </ul>
  )
}
