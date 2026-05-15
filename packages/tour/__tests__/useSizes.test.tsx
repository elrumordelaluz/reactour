import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSizes } from '../hooks'
import type { StepType } from '../types'

// jsdom doesn't implement scrollIntoView; useSizes triggers smoothScroll when
// the target is out of view, which would otherwise throw.
beforeAll(() => {
  // @ts-ignore — patching jsdom.
  Element.prototype.scrollIntoView = vi.fn()
  Object.defineProperty(window, 'innerWidth', { value: 1000, configurable: true })
  Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
})

const baseOptions = { block: 'center' as const, behavior: 'auto' as const }

function makeTarget(id: string, rect: Partial<DOMRect> = {}) {
  const el = document.createElement('div')
  el.id = id
  document.body.appendChild(el)
  el.getBoundingClientRect = () =>
    ({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
      ...rect,
    } as DOMRect)
  return el
}

describe('useSizes', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('returns a null target when no step is provided', () => {
    const { result } = renderHook(() =>
      useSizes(undefined as unknown as StepType, baseOptions)
    )
    expect(result.current.target).toBeNull()
    expect(result.current.transition).toBe(false)
    expect(result.current.isHighlightingObserved).toBe(false)
  })

  it('returns null target when the selector does not match', () => {
    const { result } = renderHook(() =>
      useSizes({ selector: '#nope', content: 'x' }, baseOptions)
    )
    expect(result.current.target).toBeNull()
  })

  it('resolves a CSS selector to its element', () => {
    const el = makeTarget('a')
    const { result } = renderHook(() =>
      useSizes({ selector: '#a', content: 'x' }, baseOptions)
    )
    expect(result.current.target).toBe(el)
  })

  it('accepts an Element directly as the selector', () => {
    const el = makeTarget('b')
    const { result } = renderHook(() =>
      useSizes({ selector: el, content: 'x' } as unknown as StepType, baseOptions)
    )
    expect(result.current.target).toBe(el)
  })

  it('exposes dimensions read from the target rect', () => {
    makeTarget('c', { top: 10, left: 20, right: 220, bottom: 110, width: 200, height: 100 })
    const { result } = renderHook(() =>
      useSizes({ selector: '#c', content: 'x' }, baseOptions)
    )
    expect(result.current.sizes).toMatchObject({
      top: 10,
      left: 20,
      right: 220,
      bottom: 110,
      width: 200,
      height: 100,
      windowWidth: 1000,
      windowHeight: 800,
    })
  })

  it('re-measures when the window resizes', () => {
    const el = makeTarget('d', { top: 10, left: 10, right: 110, bottom: 110, width: 100, height: 100 })
    const { result } = renderHook(() =>
      useSizes({ selector: '#d', content: 'x' }, baseOptions)
    )
    expect(result.current.sizes.width).toBe(100)

    // Move the element off-screen, fire a resize, expect new dimensions.
    el.getBoundingClientRect = () =>
      ({
        top: 50,
        left: 50,
        right: 250,
        bottom: 250,
        width: 200,
        height: 200,
        x: 50,
        y: 50,
        toJSON: () => ({}),
      } as DOMRect)

    act(() => {
      window.dispatchEvent(new Event('resize'))
    })
    expect(result.current.sizes.width).toBe(200)
    expect(result.current.sizes.top).toBe(50)
  })

  it('observableRefresher flips isHighlightingObserved when highlightedSelectors match', () => {
    makeTarget('e')
    const highlight = makeTarget('hl', { top: 5, left: 5, right: 25, bottom: 25, width: 20, height: 20 })
    highlight.id = 'hl'

    const { result } = renderHook(() =>
      useSizes(
        { selector: '#e', content: 'x', highlightedSelectors: ['#hl'] },
        baseOptions
      )
    )
    expect(result.current.isHighlightingObserved).toBe(false)

    act(() => {
      result.current.observableRefresher()
    })
    expect(result.current.isHighlightingObserved).toBe(true)
  })

  it('merges highlighted rects into the target rect when bypassElem=false', () => {
    const target = makeTarget('g', { top: 100, left: 100, right: 200, bottom: 200, width: 100, height: 100 })
    void target
    const highlight = document.createElement('div')
    highlight.id = 'hl2'
    document.body.appendChild(highlight)
    highlight.getBoundingClientRect = () =>
      ({
        top: 50,
        left: 80,
        right: 300,
        bottom: 250,
        width: 220,
        height: 200,
        x: 80,
        y: 50,
        toJSON: () => ({}),
      } as DOMRect)

    const { result } = renderHook(() =>
      useSizes(
        {
          selector: '#g',
          content: 'x',
          highlightedSelectors: ['#hl2'],
          bypassElem: false,
        },
        baseOptions
      )
    )

    act(() => {
      result.current.observableRefresher()
    })

    // With bypassElem=false the function expands the target rect to enclose
    // the highlight (top=50, left=80, right=300, bottom=250).
    expect(result.current.sizes.top).toBe(50)
    expect(result.current.sizes.left).toBe(80)
    expect(result.current.sizes.right).toBe(300)
    expect(result.current.sizes.bottom).toBe(250)
    expect(result.current.sizes.width).toBe(220)
    expect(result.current.sizes.height).toBe(200)
  })

  it('calls scrollIntoView when the target is outside the viewport', () => {
    const el = makeTarget('off', {
      top: 5000,
      left: 5000,
      right: 5100,
      bottom: 5100,
      width: 100,
      height: 100,
    })
    const scrollSpy = vi.fn()
    el.scrollIntoView = scrollSpy as any

    renderHook(() =>
      useSizes({ selector: '#off', content: 'x' }, baseOptions)
    )

    expect(scrollSpy).toHaveBeenCalled()
  })

  it('skips highlighted elements that are hidden via display:none', () => {
    makeTarget('f')
    const hidden = makeTarget('hide', { top: 5, left: 5, right: 25, bottom: 25, width: 20, height: 20 })
    hidden.id = 'hide'
    hidden.style.display = 'none'

    const { result } = renderHook(() =>
      useSizes(
        { selector: '#f', content: 'x', highlightedSelectors: ['#hide'] },
        baseOptions
      )
    )
    act(() => {
      result.current.observableRefresher()
    })
    expect(result.current.isHighlightingObserved).toBe(false)
  })
})
