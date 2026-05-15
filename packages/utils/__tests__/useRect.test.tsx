import React, { useRef } from 'react'
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { act, render, renderHook } from '@testing-library/react'
import { getRect, useRect, useElemRect } from '../useRect'

beforeAll(() => {
  Object.defineProperty(window, 'innerWidth', { value: 1000, configurable: true })
  Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
})

function stubRect(el: Element, rect: Partial<DOMRect>) {
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
}

describe('getRect', () => {
  it('returns zeros for null', () => {
    expect(getRect(null)).toMatchObject({ width: 0, height: 0, x: 0, y: 0 })
  })

  it('returns the element rect', () => {
    const el = document.createElement('div')
    stubRect(el, { width: 200, height: 100, x: 5, y: 10 })
    expect(getRect(el)).toMatchObject({ width: 200, height: 100, x: 5, y: 10 })
  })
})

describe('useRect', () => {
  it('returns initial zero rect when ref has no current', () => {
    const ref = { current: null }
    const { result } = renderHook(() => useRect(ref))
    expect(result.current).toMatchObject({ width: 0, height: 0 })
  })

  it('reads dimensions from the ref element on mount', () => {
    function Probe({ snapshot }: { snapshot: (r: any) => void }) {
      const ref = useRef<HTMLDivElement | null>(null)
      const rect = useRect(ref)
      snapshot(rect)
      return (
        <div
          ref={(node) => {
            if (node) stubRect(node, { width: 250, height: 80, x: 1, y: 2 })
            ref.current = node
          }}
        />
      )
    }
    const seen: any[] = []
    render(<Probe snapshot={(r) => seen.push(r)} />)
    const last = seen[seen.length - 1]
    expect(last.width).toBe(250)
    expect(last.height).toBe(80)
  })

  it('re-measures on window resize', () => {
    let target: HTMLDivElement | null = null
    function Probe({ snapshot }: { snapshot: (r: any) => void }) {
      const ref = useRef<HTMLDivElement | null>(null)
      const rect = useRect(ref)
      snapshot(rect)
      return (
        <div
          ref={(node) => {
            if (node) stubRect(node, { width: 10, height: 10 })
            ref.current = node
            target = node
          }}
        />
      )
    }
    const seen: any[] = []
    render(<Probe snapshot={(r) => seen.push(r)} />)
    expect(seen[seen.length - 1].width).toBe(10)

    if (target) stubRect(target, { width: 999, height: 999 })
    act(() => {
      window.dispatchEvent(new Event('resize'))
    })
    expect(seen[seen.length - 1].width).toBe(999)
  })

  it('refreshes when the refresher value changes', () => {
    let measureCount = 0
    function Probe({
      refresher,
      snapshot,
    }: {
      refresher: number
      snapshot: (r: any) => void
    }) {
      const ref = useRef<HTMLDivElement | null>(null)
      const rect = useRect(ref, refresher)
      snapshot(rect)
      return (
        <div
          ref={(node) => {
            if (node) {
              measureCount++
              stubRect(node, { width: measureCount * 10, height: measureCount * 10 })
            }
            ref.current = node
          }}
        />
      )
    }
    const seen: any[] = []
    const { rerender } = render(
      <Probe refresher={0} snapshot={(r) => seen.push(r)} />
    )
    const before = seen[seen.length - 1].width
    rerender(<Probe refresher={1} snapshot={(r) => seen.push(r)} />)
    // A refresher bump re-runs the effect and re-measures, so width grows.
    expect(seen[seen.length - 1].width).toBeGreaterThan(before)
  })
})

describe('useElemRect', () => {
  it('returns the rect of a passed element', () => {
    const el = document.createElement('div')
    stubRect(el, { width: 42, height: 24 })
    const { result } = renderHook(() => useElemRect(el))
    expect(result.current.width).toBe(42)
    expect(result.current.height).toBe(24)
  })

  it('returns zeros when no element is passed', () => {
    const { result } = renderHook(() => useElemRect(undefined))
    expect(result.current).toMatchObject({ width: 0, height: 0 })
  })

  it('cleans up its resize listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener')
    const el = document.createElement('div')
    stubRect(el, { width: 1, height: 1 })
    const { unmount } = renderHook(() => useElemRect(el))
    unmount()
    expect(
      removeSpy.mock.calls.some(([type]) => type === 'resize')
    ).toBe(true)
    removeSpy.mockRestore()
  })
})
