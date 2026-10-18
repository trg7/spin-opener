import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { CloseIcon } from '@/components/ui/icons'
import { siteCopy } from '@/content/siteCopy'
import { useUiStore } from '@/store/uiStore'

/**
 * Bag drawer on a native modal <dialog>: focus trap, Esc, inert page and focus return
 * come from the platform. Stage 1 shows the empty state; Stage 3 renders cart lines.
 */
export function CartDrawer() {
  const isOpen = useUiStore((s) => s.isCartOpen)
  const closeCart = useUiStore((s) => s.closeCart)
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal?.()
    if (!isOpen && dialog.open) dialog.close?.()
  }, [isOpen])

  return (
    <dialog
      ref={ref}
      onClose={closeCart}
      onClick={(e) => e.target === ref.current && closeCart()}
      aria-labelledby="cart-title"
      className="drawer m-0 ml-auto h-dvh max-h-none w-full max-w-[26rem] bg-warm-white p-0 text-charcoal open:flex open:flex-col"
    >
      <div className="page-x flex h-16 shrink-0 items-center justify-between border-b border-grid md:px-s40">
        <h2 id="cart-title" className="type-label">
          {siteCopy.commerce.bagTitle}
        </h2>
        <button
          type="button"
          onClick={closeCart}
          aria-label={siteCopy.commerce.closeBag}
          className="-mr-3 flex size-11 items-center justify-center hover:text-teal"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="page-x flex flex-1 flex-col items-start justify-center gap-s24 overflow-y-auto py-s40 md:px-s40">
        <p className="type-title">{siteCopy.commerce.emptyBag}</p>
        <Button variant="text" onClick={closeCart}>
          {siteCopy.commerce.continueShopping}
        </Button>
      </div>

      <div
        className="page-x shrink-0 border-t border-grid pt-s24 md:px-s40"
        style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mb-s16 flex items-center justify-between type-small">
          <span className="type-label">{siteCopy.commerce.subtotal}</span>
          <span className="tabular-nums text-ink-muted">—</span>
        </div>
        <Button arrow fullWidth disabled>
          {siteCopy.commerce.checkout}
        </Button>
        <p className="mt-s16 text-center type-caption text-ink-muted">
          {siteCopy.commerce.checkoutUnavailable}
        </p>
      </div>
    </dialog>
  )
}
