import { describe, it, expect, beforeAll } from 'vitest'
import {
  safe,
  getInViewThreshold,
  inView,
  isHoriz,
  isOutsideX,
  isOutsideY,
  bestPositionOf,
  getPadding,
} from '../helpers'

describe('safe', () => {
  it('returns 0 for negatives', () => {
    expect(safe(-1)).toBe(0)
    expect(safe(-100)).toBe(0)
  })

  it('returns the value when non-negative', () => {
    expect(safe(0)).toBe(0)
    expect(safe(42)).toBe(42)
  })
})

describe('getInViewThreshold', () => {
  it('handles a numeric threshold', () => {
    expect(getInViewThreshold(10)).toEqual({ thresholdX: 10, thresholdY: 10 })
  })

  it('handles a per-axis object', () => {
    expect(getInViewThreshold({ x: 5, y: 8 })).toEqual({
      thresholdX: 5,
      thresholdY: 8,
    })
  })

  it('defaults missing axes to 0', () => {
    expect(getInViewThreshold({ x: 5 })).toEqual({
      thresholdX: 5,
      thresholdY: 0,
    })
  })

  it('treats undefined as 0', () => {
    expect(getInViewThreshold(undefined as any)).toEqual({
      thresholdX: 0,
      thresholdY: 0,
    })
  })
})

describe('isHoriz / isOutsideX / isOutsideY', () => {
  it('isHoriz matches left/right only', () => {
    expect(isHoriz('left')).toBe(true)
    expect(isHoriz('right')).toBe(true)
    expect(isHoriz('top')).toBe(false)
    expect(isHoriz('bottom')).toBe(false)
  })

  it('isOutsideX/Y compare against window dimensions', () => {
    expect(isOutsideX(1001, 1000)).toBe(true)
    expect(isOutsideX(999, 1000)).toBe(false)
    expect(isOutsideY(801, 800)).toBe(true)
    expect(isOutsideY(799, 800)).toBe(false)
  })
})

describe('inView', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'innerWidth', {
      value: 1000,
      configurable: true,
    })
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      configurable: true,
    })
  })

  it('returns true when the rect is entirely inside the window', () => {
    expect(
      inView({
        top: 100,
        left: 100,
        right: 200,
        bottom: 200,
        threshold: 0,
      })
    ).toBe(true)
  })

  it('returns false when the rect is outside on the right', () => {
    expect(
      inView({
        top: 100,
        left: 900,
        right: 1100,
        bottom: 200,
        threshold: 0,
      })
    ).toBe(false)
  })

  it('respects per-axis thresholds', () => {
    expect(
      inView({
        top: 5,
        left: 5,
        right: 200,
        bottom: 200,
        threshold: { y: 10 },
      })
    ).toBe(false)
  })
})

describe('bestPositionOf', () => {
  it('orders positions by descending available space', () => {
    expect(
      bestPositionOf({ top: 10, right: 50, bottom: 30, left: 5 })
    ).toEqual(['right', 'bottom', 'top', 'left'])
  })

  it('drops positions with no space', () => {
    expect(
      bestPositionOf({ top: 0, right: 50, bottom: 30, left: 0 })
    ).toEqual(['right', 'bottom'])
  })

  it('demotes filtered positions', () => {
    // when "horizontal is impossible" we pass ['right','left'] to deprioritise them
    const ordered = bestPositionOf(
      { top: 10, right: 50, bottom: 30, left: 5 },
      ['right', 'left']
    )
    expect(ordered.indexOf('right')).toBeGreaterThan(ordered.indexOf('top'))
    expect(ordered.indexOf('right')).toBeGreaterThan(ordered.indexOf('bottom'))
  })
})

describe('getPadding', () => {
  it('expands a single number to all sides', () => {
    expect(getPadding(8)).toEqual([8, 8, 8, 8])
  })

  it('expands a 1-tuple', () => {
    expect(getPadding([8])).toEqual([8, 8, 8, 8])
  })

  it('expands a 2-tuple to [v,h,v,h]', () => {
    // current implementation: [padding[1], padding[0], padding[1], padding[0]]
    // i.e. [horizontal, vertical, horizontal, vertical]
    expect(getPadding([4, 8])).toEqual([8, 4, 8, 4])
  })

  it('expands a 3-tuple', () => {
    expect(getPadding([1, 2, 3])).toEqual([1, 2, 3, 2])
  })

  it('passes 4-tuples through', () => {
    expect(getPadding([1, 2, 3, 4])).toEqual([1, 2, 3, 4])
  })

  it('falls back to the default when no argument is given', () => {
    expect(getPadding()).toEqual([10, 10, 10, 10])
  })
})
