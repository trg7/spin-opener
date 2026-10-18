import { useId, useState } from 'react'
import type { ProductKind } from '@/commerce/types'
import { AddToBagButton } from '@/components/commerce/AddToBagButton'
import { SectionIntro } from '@/components/layout/SectionIntro'
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
    <section id="shop" aria-labelledby="shop-heading" className="page-x py-section">
      <div className="page-container">
        <SectionIntro
          index={copy.index}
          headingId="shop-heading"
          heading={copy.headingLines}
          role="section"
          inlineFromLg
          support={copy.support}
        />

        <div className="mt-s40 grid gap-s40 lg:mt-s64 lg:grid-page lg:items-start">
          <fieldset className="lg:col-span-7">
            <legend className="sr-only">{copy.setupLegend}</legend>
            <div className="grid gap-s16 lg:grid-cols-3 lg:gap-grid">
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

          <div className="flex flex-col gap-s24 lg:col-span-5 lg:col-start-8 lg:self-stretch lg:border-l lg:border-grid lg:pl-s40">
            <div className="flex flex-col gap-s16">
              <div className="flex flex-wrap gap-x-s40 gap-y-s24">
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
                <p aria-live="polite" className="max-w-measure type-small text-ink-muted">
                  {note}
                </p>
              )}
            </div>

            <div className="flex items-end justify-between gap-s24 border-t border-grid pt-s24">
              <div className="flex flex-col gap-s8">
                <span className="type-label text-ink-muted">{copy.quantity}</span>
                <QuantityStepper value={quantity} onChange={setQuantity} label={copy.quantity} />
              </div>
              <div className="flex flex-col items-end gap-s8" aria-live="polite">
                <Price money={variant?.price ?? null} className="type-price" />
                {variant?.priceStatus === 'provisional' && (
                  <span className="type-caption text-ink-muted">{copy.provisionalPrice}</span>
                )}
              </div>
            </div>

            {isTbc && <p className="type-small text-ink-muted">{copy.tbcNotice}</p>}

            {variant && <AddToBagButton variantId={variant.id} quantity={quantity} fullWidth />}

            <p className="flex items-center gap-s16 type-small text-ink-muted">
              <GiftIcon size={18} />
              {copy.giftNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
