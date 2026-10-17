import { containRect, frameIndex, nearestLoaded } from './framePlayer'

describe('framePlayer maths', () => {
  it('maps progress to frame indices, clamped', () => {
    expect(frameIndex(0, 36)).toBe(0)
    expect(frameIndex(1, 36)).toBe(35)
    expect(frameIndex(0.5, 36)).toBe(18)
    expect(frameIndex(-0.2, 36)).toBe(0)
    expect(frameIndex(1.4, 36)).toBe(35)
  })

  it('falls back to the nearest decoded frame', () => {
    const loaded = [true, false, false, false, true]
    expect(nearestLoaded(1, loaded)).toBe(0)
    expect(nearestLoaded(3, loaded)).toBe(4)
    expect(nearestLoaded(2, loaded)).toBe(0) // tie → earlier frame
    expect(nearestLoaded(2, [false, false, false])).toBe(-1)
  })

  it('fits frames like object-fit: contain', () => {
    expect(containRect(1000, 500, 1600, 1100)).toEqual({
      x: (1000 - 1600 * (500 / 1100)) / 2,
      y: 0,
      w: 1600 * (500 / 1100),
      h: 500,
    })
    expect(containRect(400, 800, 900, 1400).w).toBeCloseTo(400)
  })
})
