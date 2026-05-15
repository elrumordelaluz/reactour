import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Portal from '../Portal'

describe('Portal', () => {
  it('appends a portal node of the default type to the body', () => {
    render(
      <Portal>
        <span data-testid="ported">hi</span>
      </Portal>
    )
    const node = document.querySelector('reactour-portal')
    expect(node).not.toBeNull()
    expect(node!.parentElement).toBe(document.body)
    expect(node!.querySelector('[data-testid="ported"]')).not.toBeNull()
  })

  it('uses a custom element type when provided', () => {
    render(
      <Portal type="my-portal">
        <span>x</span>
      </Portal>
    )
    expect(document.querySelector('my-portal')).not.toBeNull()
  })

  it('renders children inside the portal node, not the original tree', () => {
    const { container } = render(
      <Portal>
        <span data-testid="inside">only here</span>
      </Portal>
    )
    expect(container.querySelector('[data-testid="inside"]')).toBeNull()
    expect(document.body.querySelector('[data-testid="inside"]')).not.toBeNull()
  })

  it('removes the portal node from the body on unmount', () => {
    const { unmount } = render(
      <Portal>
        <span>bye</span>
      </Portal>
    )
    expect(document.querySelector('reactour-portal')).not.toBeNull()
    unmount()
    expect(document.querySelector('reactour-portal')).toBeNull()
  })
})
