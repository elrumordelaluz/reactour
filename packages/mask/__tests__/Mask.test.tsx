import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { Mask } from '../index'

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

describe('Mask', () => {
  it('renders an SVG with a <mask> and <clipPath>', () => {
    const { container } = render(<Mask sizes={SIZES} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(container.querySelector('mask')).toBeInTheDocument()
    expect(container.querySelector('clipPath')).toBeInTheDocument()
  })

  it('honors caller-supplied maskId and clipId', () => {
    const { container } = render(
      <Mask sizes={SIZES} maskId="custom-mask" clipId="custom-clip" />
    )
    expect(container.querySelector('#custom-mask')).toBeInTheDocument()
    expect(container.querySelector('#custom-clip')).toBeInTheDocument()
  })

  it('forwards highlightedAreaClassName to the highlighted rect', () => {
    const { container } = render(
      <Mask sizes={SIZES} highlightedAreaClassName="boom" />
    )
    expect(container.querySelector('.boom')).not.toBeNull()
  })

  it('calls onClick when the mask wrapper is clicked', () => {
    const onClick = vi.fn()
    const { container } = render(
      <Mask sizes={SIZES} onClick={onClick} className="wrapper" />
    )
    fireEvent.click(container.querySelector('.wrapper')!)
    expect(onClick).toHaveBeenCalledOnce()
  })
})
