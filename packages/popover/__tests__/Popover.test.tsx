import React from 'react'
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Popover } from '../index'

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

const SIZES = {
  bottom: 200,
  height: 100,
  left: 50,
  right: 150,
  top: 100,
  width: 100,
  x: 50,
  y: 100,
}

describe('Popover', () => {
  it('renders children inside a positioned wrapper', () => {
    const { getByText, container } = render(
      <Popover sizes={SIZES}>
        <span>hello</span>
      </Popover>
    )
    expect(getByText('hello')).toBeInTheDocument()
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).not.toBeNull()
    expect(wrapper.style.transform).toMatch(/^translate\(/)
  })

  it('forwards className via the default reactour__popover class', () => {
    const { container } = render(
      <Popover sizes={SIZES}>
        <span>x</span>
      </Popover>
    )
    expect(container.querySelector('.reactour__popover')).not.toBeNull()
  })

  it('accepts a tuple position and renders without throwing', () => {
    const { container } = render(
      <Popover sizes={SIZES} position={[200, 200]}>
        <span>x</span>
      </Popover>
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.style.transform).toMatch(/^translate\(/)
  })

  it('accepts a function position', () => {
    const positionFn = () => 'top' as const
    const { container } = render(
      <Popover sizes={SIZES} position={positionFn}>
        <span>x</span>
      </Popover>
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.style.transform).toMatch(/^translate\(/)
  })

  it('calls the function position with positional context', () => {
    const positionFn = vi.fn(() => 'right' as const)
    render(
      <Popover sizes={SIZES} position={positionFn}>
        <span>x</span>
      </Popover>
    )
    // useRect's mount setState triggers a re-render so the spy is called more
    // than once; we only care that the first invocation gets the expected shape.
    expect(positionFn).toHaveBeenCalled()
    const args = positionFn.mock.calls[0]
    expect(args[0]).toMatchObject({
      windowWidth: 1000,
      windowHeight: 800,
      // padding=10 default → targetTop = 100 - 10 = 90.
      top: 90,
      left: 40,
      right: 160,
      bottom: 210,
    })
  })

  it('forwards arbitrary props (aria-*) to the popover element', () => {
    const { container } = render(
      <Popover sizes={SIZES} aria-labelledby="step-title">
        <span>x</span>
      </Popover>
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.getAttribute('aria-labelledby')).toBe('step-title')
  })

  it('renders explicit center position centered on the window', () => {
    const { container } = render(
      <Popover sizes={SIZES} position="center">
        <span>x</span>
      </Popover>
    )
    const wrapper = container.firstChild as HTMLElement
    // helperRect width/height start at 0 in jsdom, so center = (windowWidth/2, windowHeight/2).
    expect(wrapper.style.transform).toBe('translate(500px, 400px)')
  })

  it('clamps a tuple position whose coords lie outside the window', () => {
    const { container } = render(
      <Popover sizes={SIZES} position={[5000, 5000]}>
        <span>x</span>
      </Popover>
    )
    const wrapper = container.firstChild as HTMLElement
    // Both axes are outside → falls back to window center.
    expect(wrapper.style.transform).toBe('translate(500px, 400px)')
  })

  it('honors a custom popover style override', () => {
    const { container } = render(
      <Popover
        sizes={SIZES}
        styles={{ popover: (base) => ({ ...base, padding: 0 }) }}
      >
        <span>x</span>
      </Popover>
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.style.padding).toBe('0px')
  })

  it('falls back to auto-position when the requested side cannot fit', () => {
    // Target way off the right edge → available.right is negative, so
    // couldPositionAt('right', ...) returns false and we hit autoPosition.
    const farRight = { ...SIZES, left: 1500, right: 1600, x: 1500 }
    const { container } = render(
      <Popover sizes={farRight} position="right">
        <span>x</span>
      </Popover>
    )
    const wrapper = container.firstChild as HTMLElement
    // No throw and a sensible translate(...) result is enough — the exact
    // coordinates depend on the fallback that autoPosition picks.
    expect(wrapper.style.transform).toMatch(/^translate\(/)
  })

  it('exercises the helper-outside-X axis path without throwing', () => {
    const farRight = { ...SIZES, left: 1500, right: 1600, x: 1500 }
    const { container } = render(
      <Popover sizes={farRight} position="bottom">
        <span>x</span>
      </Popover>
    )
    const wrapper = container.firstChild as HTMLElement
    // The `!isHelperOutsideX` guard makes the explicit position fall back to
    // autoPosition; we only verify the resulting translate is finite.
    expect(wrapper.style.transform).toMatch(/^translate\(-?\d+px, -?\d+px\)$/)
  })

  it('clamps the helper y when the target overflows vertically', () => {
    const farBottom = { ...SIZES, top: 750, bottom: 900, y: 750 }
    const { container } = render(
      <Popover sizes={farBottom} position="bottom">
        <span>x</span>
      </Popover>
    )
    const wrapper = container.firstChild as HTMLElement
    // isHelperOutsideY branch produces a deterministic translate.
    expect(wrapper.style.transform).toMatch(/^translate\(/)
  })

  it('falls back to window center when no side has room', () => {
    // A target that fills nearly the entire viewport leaves no side with
    // enough room for the helper, so autoPosition lands on 'center'.
    const filling = {
      top: 5,
      left: 5,
      right: 995,
      bottom: 795,
      width: 990,
      height: 790,
      x: 5,
      y: 5,
    }
    const { container } = render(
      <Popover sizes={filling} position="right">
        <span>x</span>
      </Popover>
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.style.transform).toBe('translate(500px, 400px)')
  })

  it('respects padding when computing the transform', () => {
    const { container: a } = render(
      <Popover sizes={SIZES} position="bottom">
        <span>x</span>
      </Popover>
    )
    const { container: b } = render(
      <Popover sizes={SIZES} position="bottom" padding={40}>
        <span>x</span>
      </Popover>
    )
    // Larger padding pushes the popover further away from the target.
    expect(a.firstChild).not.toEqual(b.firstChild)
    const aY = parseInt(
      ((a.firstChild as HTMLElement).style.transform.match(/(-?\d+)px\)$/) ||
        [])[1] || '0',
      10
    )
    const bY = parseInt(
      ((b.firstChild as HTMLElement).style.transform.match(/(-?\d+)px\)$/) ||
        [])[1] || '0',
      10
    )
    expect(bY).toBeGreaterThan(aY)
  })
})
