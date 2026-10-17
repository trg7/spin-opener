import { siteCopy } from '@/content/siteCopy'
import { colourImages, defaultImageColour } from '@/data/assetManifest'
import { colourRange } from '@/data/products'
import type { ColourSelection } from './resolveVariant'

const label = (id: string) => colourRange.find((c) => c.id === id)?.label ?? id

/**
 * A note for colours we have no imagery for yet, so the configurator never implies the
 * photo shows the selected colour. Returns null when every selected colour is pictured.
 */
export function previewNote(
  pickers: Array<keyof ColourSelection>,
  colours: ColourSelection,
): string | null {
  const notes: string[] = []
  for (const part of pickers) {
    const wanted = colours[part]
    if (colourImages[part][wanted]) continue
    const shown = defaultImageColour[part]
    notes.push(
      part === 'top' && shown
        ? siteCopy.configurator.preview.top(label(shown), label(wanted))
        : siteCopy.configurator.preview.stand(label(wanted)),
    )
  }
  return notes.length ? notes.join(' ') : null
}
