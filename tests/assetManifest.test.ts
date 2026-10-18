import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { assets, imageMasks } from '@/data/assetManifest'
import { products } from '@/data/products'

const all = Object.entries(assets)

describe('asset manifest', () => {
  it.each(all.filter(([, a]) => a.src !== null))('%s file exists in public/', (_key, asset) => {
    expect(existsSync(resolve(__dirname, '../public', `.${asset.src}`))).toBe(true)
  })

  it('every non-final asset documents its replacement', () => {
    for (const [, a] of all)
      if (a.status !== 'final') expect(a.replaceWith.length).toBeGreaterThan(0)
  })

  it('missing assets have no src', () => {
    for (const [, a] of all) if (a.status === 'missing') expect(a.src).toBeNull()
  })

  it.each(Object.entries(imageMasks))('%s mask exists in public/', (_key, src) => {
    expect(existsSync(resolve(__dirname, '../public', `.${src}`))).toBe(true)
  })

  it('every product imageKey resolves', () => {
    for (const p of products) expect(p.imageKey in assets).toBe(true)
  })
})
