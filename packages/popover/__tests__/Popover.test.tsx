import React from 'react'
import { describe, it, expect, beforeAll } from 'vitest'
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
})
