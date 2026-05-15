import { describe, it, expect, beforeAll, vi, afterEach } from 'vitest'
import { smoothScroll } from '../smoothScroll'

beforeAll(() => {
  // @ts-ignore — jsdom doesn't implement scrollIntoView by default.
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = function () {}
  }

  // Drive rAF synchronously so the polling loop terminates fast.
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    return setTimeout(() => cb(0), 0) as unknown as number
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('smoothScroll', () => {
  it('rejects when given a non-Element', async () => {
    // The throw happens inside the Promise executor, so the function returns
    // a rejected promise rather than throwing synchronously.
    // @ts-ignore — exercising the runtime guard.
    await expect(smoothScroll(null, {})).rejects.toBeInstanceOf(TypeError)
  })

  it('calls scrollIntoView on the element with merged options', () => {
    const el = document.createElement('div')
    const spy = vi.fn()
    el.scrollIntoView = spy as any
    void smoothScroll(el, { block: 'start' })
    expect(spy).toHaveBeenCalledOnce()
    expect(spy.mock.calls[0][0]).toMatchObject({ behavior: 'smooth', block: 'start' })
  })

  it('resolves when the element position stops changing', async () => {
    const el = document.createElement('div')
    el.scrollIntoView = vi.fn() as any
    // Always return the same top → "same" counter ticks up to >2 and resolves.
    el.getBoundingClientRect = () =>
      ({
        top: 50,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      } as DOMRect)

    await expect(smoothScroll(el, {})).resolves.toBeNull()
  })
})
