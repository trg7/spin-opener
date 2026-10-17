import { useRef } from 'react'
import { siteCopy } from '@/content/siteCopy'
import { useUiStore } from '@/store/uiStore'
import { BagIcon, CloseIcon, MenuIcon } from '@/components/ui/icons'
import { navLinks } from './navLinks'
import { Wordmark } from './Wordmark'

const MENU_ID = 'site-menu'

export function SiteHeader({ cartCount = 0 }: { cartCount?: number }) {
  const openCart = useUiStore((s) => s.openCart)
  const menuRef = useRef<HTMLDivElement>(null)
  const iconBtn = 'relative flex size-11 items-center justify-center text-charcoal hover:text-teal'

  return (
    <header className="page-x relative z-20">
      <div className="page-container flex h-16 items-center justify-between md:h-20">
        <a href="#top" aria-label={siteCopy.nav.home} className="-my-2 py-2">
          <Wordmark className="h-9 md:h-11" />
        </a>

        <nav aria-label="Primary" className="flex items-center gap-1 md:gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-utility text-label font-medium uppercase text-charcoal underline-offset-8 hover:underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile menu (D-008): native popover — light-dismiss + Esc for free */}
          <button
            type="button"
            popoverTarget={MENU_ID}
            aria-label={siteCopy.nav.menu}
            className={`${iconBtn} md:hidden`}
          >
            <MenuIcon />
          </button>

          <button
            type="button"
            onClick={openCart}
            aria-label={`${siteCopy.nav.cart} (${cartCount})`}
            className={`${iconBtn} -mr-3`}
          >
            <BagIcon />
            {cartCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-charcoal text-[0.5625rem] font-medium text-warm-white tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>

      <div
        id={MENU_ID}
        ref={menuRef}
        popover="auto"
        className="page-x m-0 mt-0 w-full max-w-none border-b border-grid bg-warm-white pb-6 [inset:0_0_auto_0]"
      >
        <div className="flex h-16 items-center justify-end">
          <button
            type="button"
            popoverTarget={MENU_ID}
            popoverTargetAction="hide"
            aria-label={siteCopy.nav.closeMenu}
            className={`${iconBtn} -mr-3`}
          >
            <CloseIcon />
          </button>
        </div>
        <ul className="flex flex-col">
          {navLinks.map((l) => (
            <li key={l.href} className="border-t border-grid">
              <a
                href={l.href}
                onClick={() => menuRef.current?.hidePopover()}
                className="flex min-h-14 items-center text-display-m font-light text-charcoal"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
