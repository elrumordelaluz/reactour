import React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, act } from '@testing-library/react'

const observeSpy = vi.fn()
const disconnectSpy = vi.fn()

vi.mock('resize-observer-polyfill', () => {
  return {
    default: class {
      observe = observeSpy
      disconnect = disconnectSpy
      unobserve = vi.fn()
    },
  }
})

import Observables from '../Observables'

afterEach(() => {
  document.body.innerHTML = ''
  observeSpy.mockClear()
  disconnectSpy.mockClear()
})

describe('Observables', () => {
  it('renders nothing into the DOM tree', () => {
    const { container } = render(<Observables refresh={() => {}} />)
    expect(container.firstChild).toBeNull()
  })

  it('calls refresh(true) when a matching mutationObservable node is added', async () => {
    const refresh = vi.fn()
    render(
      <Observables mutationObservables={['.watch-me']} refresh={refresh} />
    )

    // Mutation observers fire asynchronously after the microtask queue, so we
    // poll briefly after triggering an add.
    await act(async () => {
      const el = document.createElement('div')
      el.className = 'watch-me'
      document.body.appendChild(el)
      // Yield once so the MO has a chance to deliver.
      await new Promise((r) => setTimeout(r, 10))
    })

    expect(refresh).toHaveBeenCalledWith(true)
  })

  it('ignores non-matching mutations', async () => {
    const refresh = vi.fn()
    render(
      <Observables mutationObservables={['.target']} refresh={refresh} />
    )

    await act(async () => {
      const el = document.createElement('div')
      el.className = 'something-else'
      document.body.appendChild(el)
      await new Promise((r) => setTimeout(r, 10))
    })

    expect(refresh).not.toHaveBeenCalled()
  })

  it('attaches a ResizeObserver to elements matching resizeObservables', () => {
    const target = document.createElement('div')
    target.className = 'resize-me'
    document.body.appendChild(target)

    const { unmount } = render(
      <Observables resizeObservables={['.resize-me']} refresh={() => {}} />
    )

    expect(observeSpy).toHaveBeenCalledWith(target)

    unmount()
    expect(disconnectSpy).toHaveBeenCalled()
  })

  it('does not throw when resizeObservables selectors find nothing', () => {
    expect(() =>
      render(
        <Observables
          resizeObservables={['.does-not-exist']}
          refresh={() => {}}
        />
      )
    ).not.toThrow()
  })
})
