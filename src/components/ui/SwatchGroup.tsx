import { useId } from 'react'

export interface SwatchOption {
  id: string
  label: string
  swatch: string
}

interface Props {
  legend: string
  options: SwatchOption[]
  value: string
  onChange: (id: string) => void
}

/** Radio group of colour swatches (native radios → arrow-key support for free). */
export function SwatchGroup({ legend, options, value, onChange }: Props) {
  const name = useId()
  const selected = options.find((o) => o.id === value)
  return (
    <fieldset>
      <legend className="mb-s8 type-label text-ink-muted">
        {legend} {selected && <span className="ml-s8 text-charcoal">{selected.label}</span>}
      </legend>
      <div className="-ml-2 flex flex-wrap">
        {options.map((o) => (
          <label
            key={o.id}
            className="group relative flex size-11 cursor-pointer items-center justify-center"
          >
            <input
              type="radio"
              name={name}
              value={o.id}
              checked={o.id === value}
              onChange={() => onChange(o.id)}
              className="peer sr-only"
              aria-label={o.label}
            />
            <span
              aria-hidden="true"
              className="size-7 rounded-full ring-1 ring-black/10 ring-offset-2 ring-offset-warm-white transition-shadow peer-checked:ring-charcoal peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-teal"
              style={{ backgroundColor: o.swatch }}
            />
          </label>
        ))}
      </div>
    </fieldset>
  )
}
