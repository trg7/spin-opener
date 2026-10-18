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
    <header
      data-site-header
      className="page-x sticky top-0 z-40 border-b border-grid bg-warm-white"
    >
      {/* Equal outer tracks keep the wordmark on the viewport centre whatever sits either side */}
      <div className="page-container grid h-(--header-h) grid-cols-[1fr_auto_1fr] items-center">
        <div className="flex items-center justify-self-start">
          {/* Menu below 1024 (D-008): native popover — light-dismiss + Esc for free */}
          <button
            type="button"
            popoverTarget={MENU_ID}
            aria-label={siteCopy.nav.menu}
            className={`${iconBtn} -ml-3 lg:hidden`}
          >
            <MenuIcon />
          </button>
          <p className="hidden type-label lg:block">{siteCopy.brand.origin}</p>
        </div>

        <a href="#top" aria-label={siteCopy.nav.home} className="-my-2 py-2">
          <Wordmark className="h-9 md:h-11" />
        </a>

        <nav aria-label="Primary" className="flex items-center gap-s40 justify-self-end">
          <ul className="hidden items-center gap-s40 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="type-label text-charcoal underline-offset-8 hover:underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

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
        className="page-x m-0 mt-0 w-full max-w-none border-b border-grid bg-warm-white pb-s24 [inset:0_0_auto_0]"
      >
        {/* Close sits where the menu button was */}
        <div className="flex h-(--header-h) items-center">
          <button
            type="button"
            popoverTarget={MENU_ID}
            popoverTargetAction="hide"
            aria-label={siteCopy.nav.closeMenu}
            className={`${iconBtn} -ml-3`}
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
                className="flex min-h-14 items-center type-title text-charcoal"
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
