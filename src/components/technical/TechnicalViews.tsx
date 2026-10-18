import { BottomView, SideView, TopView } from './TechnicalDrawing'

/** Stacked top / side / bottom view panels (desktop hero side column). */
export function TechnicalViews({
  labels,
  className = '',
}: {
  labels: { top: string; side: string; bottom: string }
  className?: string
}) {
  const panels = [
    { key: 'top', label: labels.top, drawing: <TopView className="size-full" /> },
    { key: 'side', label: labels.side, drawing: <SideView className="size-full" /> },
    { key: 'bottom', label: labels.bottom, drawing: <BottomView className="size-full" /> },
  ]
  return (
    <ul className={`flex flex-col gap-s24 ${className}`}>
      {panels.map((p) => (
        <li key={p.key} className="flex flex-col items-center gap-s8">
          <div className="flex aspect-square w-full items-center justify-center border border-grid p-s16 text-ink-muted">
            {p.drawing}
          </div>
          <span className="type-caption text-ink-muted">{p.label}</span>
        </li>
      ))}
    </ul>
  )
}
