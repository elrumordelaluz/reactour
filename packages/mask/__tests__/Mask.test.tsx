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

  it('calls onClickHighlighted when the highlighted rect is clicked', () => {
    const onClickHighlighted = vi.fn()
    const { container } = render(
      <Mask
        sizes={SIZES}
        highlightedAreaClassName="hl"
        onClickHighlighted={onClickHighlighted}
      />
    )
    fireEvent.click(container.querySelector('.hl')!)
    expect(onClickHighlighted).toHaveBeenCalledOnce()
  })

  it('inflates the highlighted area by numeric padding', () => {
    const { container } = render(
      <Mask sizes={SIZES} padding={20} highlightedAreaClassName="hl" />
    )
    const rect = container.querySelector('.hl') as unknown as SVGRectElement
    // Mask applies x/y/width/height via inline style (presentation CSS).
    expect(rect.style.width).toBe('140px')
    expect(rect.style.height).toBe('140px')
    expect(rect.style.x).toBe('30px')
    expect(rect.style.y).toBe('80px')
  })

  it('accepts an array padding (top/right/bottom/left)', () => {
    const { container } = render(
      <Mask sizes={SIZES} padding={[5, 10, 15, 20]} highlightedAreaClassName="hl" />
    )
    const rect = container.querySelector('.hl') as unknown as SVGRectElement
    expect(rect.style.width).toBe('130px')
    expect(rect.style.height).toBe('120px')
    expect(rect.style.x).toBe('30px')
    expect(rect.style.y).toBe('95px')
  })

  it('clamps negative coordinates to 0 via safe()', () => {
    const { container } = render(
      <Mask
        sizes={{ ...SIZES, top: 5, left: 5 }}
        padding={50}
        highlightedAreaClassName="hl"
      />
    )
    const rect = container.querySelector('.hl') as unknown as SVGRectElement
    expect(rect.style.x).toBe('0')
    expect(rect.style.y).toBe('0')
  })

  it('emits the rx attribute when the style provides rx', () => {
    const { container } = render(
      <Mask
        sizes={SIZES}
        highlightedAreaClassName="hl"
        styles={{
          highlightedArea: (base) => ({ ...base, rx: 4 }),
          maskArea: (base) => ({ ...base, rx: 4 }),
        }}
      />
    )
    const highlight = container.querySelector('.hl')
    expect(highlight?.getAttribute('rx')).toBe('1')
    // The masked rect (no class) is the second rect inside <mask>.
    const masked = container.querySelector('mask rect:nth-of-type(2)')
    expect(masked?.getAttribute('rx')).toBe('1')
  })

  it('omits rx when no style provides it', () => {
    const { container } = render(
      <Mask sizes={SIZES} highlightedAreaClassName="hl" />
    )
    expect(container.querySelector('.hl')?.hasAttribute('rx')).toBe(false)
  })

  it('honors a custom maskWrapper style override', () => {
    const { container } = render(
      <Mask
        sizes={SIZES}
        className="wrapper"
        styles={{ maskWrapper: (base) => ({ ...base, opacity: 0.3 }) }}
      />
    )
    const wrapper = container.querySelector('.wrapper') as HTMLDivElement
    expect(wrapper.style.opacity).toBe('0.3')
  })

  it('generates unique mask/clip ids across instances when none are provided', () => {
    const { container: a } = render(<Mask sizes={SIZES} />)
    const { container: b } = render(<Mask sizes={SIZES} />)
    const idA = a.querySelector('mask')?.getAttribute('id')
    const idB = b.querySelector('mask')?.getAttribute('id')
    expect(idA).toMatch(/^mask__/)
    expect(idB).toMatch(/^mask__/)
    expect(idA).not.toBe(idB)
  })
})
