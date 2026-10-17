import { previewNote } from './previewNote'

describe('previewNote', () => {
  it('is silent when the selected top colour is pictured', () => {
    expect(previewNote(['top'], { top: 'teal', stand: 'teal' })).toBeNull()
  })

  it('says which colour is shown when the selected top colour has no imagery', () => {
    expect(previewNote(['top'], { top: 'red', stand: 'teal' })).toBe(
      'Shown in Teal. Red imagery coming soon.',
    )
  })

  it('flags the placeholder stand for any stand colour', () => {
    expect(previewNote(['stand'], { top: 'teal', stand: 'white' })).toMatch(
      /placeholder\. White stand/,
    )
  })

  it('combines both notes for a bundle', () => {
    const note = previewNote(['top', 'stand'], { top: 'blue', stand: 'orange' })
    expect(note).toMatch(/Shown in Teal\. Blue/)
    expect(note).toMatch(/Orange stand/)
  })
})
