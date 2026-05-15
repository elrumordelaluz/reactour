import { describe, it, expect } from 'vitest'
import { getRect } from '../useRect'

describe('getRect', () => {
  it('returns a zero rect for null', () => {
    expect(getRect(null)).toEqual({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
    })
  })

  it('returns the DOMRect of an element', () => {
    const el = document.createElement('div')
    // jsdom returns zeros for getBoundingClientRect, but we can stub it.
    Object.defineProperty(el, 'getBoundingClientRect', {
      value: () => ({
        bottom: 200,
        height: 100,
        left: 50,
        right: 150,
        top: 100,
        width: 100,
        x: 50,
        y: 100,
        toJSON: () => ({}),
      }),
    })
    const rect = getRect(el)
    expect(rect.width).toBe(100)
    expect(rect.height).toBe(100)
    expect(rect.left).toBe(50)
    expect(rect.top).toBe(100)
  })
})
