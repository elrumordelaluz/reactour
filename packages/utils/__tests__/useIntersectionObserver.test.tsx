import React, { useRef } from 'react'
import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import { render, act } from '@testing-library/react'
import { useIntersectionObserver } from '../useIntersectionObserver'

type Cb = (entries: any[]) => void

// We replace window.IntersectionObserver with a controllable stub so we can
// observe what useIntersectionObserver wires up and fire callbacks manually.
const instances: Array<{
  callback: Cb
  options: any
  observed: Element[]
  disconnect: ReturnType<typeof vi.fn>
}> = []

class StubIntersectionObserver {
  callback: Cb
  options: any
  observed: Element[] = []
  disconnect = vi.fn()
  constructor(cb: Cb, options: any) {
    this.callback = cb
    this.options = options
    instances.push(this)
  }
  observe(el: Element) {
    this.observed.push(el)
  }
  unobserve() {}
  takeRecords() {
    return []
  }
}

beforeAll(() => {
  // @ts-ignore
  window.IntersectionObserver = StubIntersectionObserver as any
})

afterEach(() => {
  instances.length = 0
})

function Probe({
  options = {},
  snapshot,
}: {
  options?: any
  snapshot: (entry: any) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(ref as any, options)
  snapshot(entry)
  return <div ref={ref} />
}

describe('useIntersectionObserver', () => {
  it('creates an IntersectionObserver with the supplied options', () => {
    render(
      <Probe
        options={{ threshold: 0.5, rootMargin: '10%' }}
        snapshot={() => {}}
      />
    )
    expect(instances).toHaveLength(1)
    expect(instances[0].options).toMatchObject({
      threshold: 0.5,
      rootMargin: '10%',
      root: null,
    })
  })

  it('observes the ref element', () => {
    const { container } = render(<Probe snapshot={() => {}} />)
    expect(instances[0].observed).toEqual([container.firstChild])
  })

  it('exposes the latest entry to the consumer', () => {
    const seen: any[] = []
    render(<Probe snapshot={(e) => seen.push(e)} />)
    expect(seen[seen.length - 1]).toBeUndefined()

    // Drive the observer callback like the browser would.
    act(() => {
      instances[0].callback([
        { isIntersecting: true, target: instances[0].observed[0] },
      ])
    })

    // The next render after setState carries the new entry.
    expect(seen[seen.length - 1]).toMatchObject({ isIntersecting: true })
  })

  it('disconnects the observer on unmount', () => {
    const { unmount } = render(<Probe snapshot={() => {}} />)
    const observer = instances[0]
    unmount()
    expect(observer.disconnect).toHaveBeenCalled()
  })

  it('freezes the observer once visible when freezeOnceVisible is set', () => {
    const seen: any[] = []
    const { rerender } = render(
      <Probe
        options={{ freezeOnceVisible: true }}
        snapshot={(e) => seen.push(e)}
      />
    )
    expect(instances).toHaveLength(1)

    // Fire a visible entry — flips the frozen flag on the next render.
    act(() => {
      instances[0].callback([{ isIntersecting: true }])
    })

    // A rerender re-runs the effect with `frozen=true` → no new observer.
    rerender(
      <Probe
        options={{ freezeOnceVisible: true }}
        snapshot={(e) => seen.push(e)}
      />
    )

    expect(instances).toHaveLength(1)
  })
})
