import { useId, useState } from 'react'
import type { ProductKind } from '@/commerce/types'
import { AddToBagButton } from '@/components/commerce/AddToBagButton'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { GiftIcon } from '@/components/ui/icons'
import { Price } from '@/components/ui/Price'
import { QuantityStepper } from '@/components/ui/QuantityStepper'
import { SwatchGroup } from '@/components/ui/SwatchGroup'
import { siteConfig } from '@/config/siteConfig'
import { siteCopy } from '@/content/siteCopy'
import { getProductByKind, standColours, topColours } from '@/data/products'
import { previewNote } from './previewNote'
import { SetupOption } from './SetupOption'
import {
  colourPickersFor,
  confirmedOnly,
  resolveVariant,
  type ColourSelection,
} from './resolveVariant'

const copy = siteCopy.configurator
const KINDS: ProductKind[] = ['top', 'stand', 'bundle']
const availableColours = { top: confirmedOnly(topColours), stand: confirmedOnly(standColours) }
const colourLegend = { top: copy.topColourLabel, stand: copy.standColourLabel }

/** 05 Choose your setup — top / stand / bundle, confirmed colours, quantity, one Add to bag. */
export function ProductConfigurator() {
  const groupName = useId()
  const [kind, setKind] = useState<ProductKind>(siteConfig.defaultSetup)
  const [colours, setColours] = useState<ColourSelection>({
    top: availableColours.top[0]?.id ?? '',
    stand: availableColours.stand[0]?.id ?? '',
  })
  const [quantity, setQuantity] = useState(1)

  const product = getProductByKind(kind)
  const variant = resolveVariant(product, colours)
  const pickers = colourPickersFor(kind)
  const isTbc = variant?.priceStatus === 'tbc'
  const note = previewNote(pickers, colours)

  return (
    <section id="shop" aria-labelledby="shop-heading" className="page-x py-20 lg:py-28">
      <div className="page-container">
        <div className="flex flex-col gap-4">
          <Eyebrow>{copy.index}</Eyebrow>
          <h2 id="shop-heading" className="text-display-l font-light">
            {copy.headingLines.map((line) => (
              <span key={line} className="block lg:inline">
                {line}{' '}
              </span>
            ))}
          </h2>
          <p className="max-w-[34ch] text-body text-ink-muted">{copy.support}</p>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          <fieldset className="lg:col-span-7">
            <legend className="sr-only">{copy.setupLegend}</legend>
            <div className="grid gap-3 lg:grid-cols-3 lg:gap-4">
              {KINDS.map((k) => (
                <SetupOption
                  key={k}
                  name={groupName}
                  product={getProductByKind(k)}
                  checked={k === kind}
                  onSelect={() => setKind(k)}
                />
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-7 lg:col-span-5 lg:border-l lg:border-grid lg:pl-12">
            <div className="flex flex-wrap gap-x-10 gap-y-6">
              {pickers.map((p) => (
                <SwatchGroup
                  key={p}
                  legend={pickers.length > 1 ? colourLegend[p] : copy.colourLegend}
                  options={availableColours[p]}
                  value={colours[p]}
                  onChange={(id) => setColours((c) => ({ ...c, [p]: id }))}
                />
              ))}
            </div>
            {note && (
              <p aria-live="polite" className="-mt-3 text-sm text-ink-muted">
                {note}
              </p>
            )}

            <div className="flex items-end justify-between gap-6 border-t border-grid pt-6">
              <div className="flex flex-col gap-2">
                <span className="font-utility text-label font-medium uppercase text-ink-muted">
                  {copy.quantity}
                </span>
                <QuantityStepper value={quantity} onChange={setQuantity} label={copy.quantity} />
              </div>
              <div className="flex flex-col items-end gap-1" aria-live="polite">
                <Price money={variant?.price ?? null} className="text-2xl font-light" />
                {variant?.priceStatus === 'provisional' && (
                  <span className="font-utility text-[0.5625rem] uppercase tracking-[0.14em] text-ink-muted">
                    {copy.provisionalPrice}
                  </span>
                )}
              </div>
            </div>

            {isTbc && <p className="text-sm text-ink-muted">{copy.tbcNotice}</p>}

            {variant && <AddToBagButton variantId={variant.id} quantity={quantity} fullWidth />}

            <p className="flex items-center gap-3 text-sm text-ink-muted">
              <GiftIcon size={18} />
              {copy.giftNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
