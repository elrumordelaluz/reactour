import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Badge from '../components/Badge'

describe('Badge', () => {
  it('renders children inside a span', () => {
    const { container } = render(<Badge>1</Badge>)
    const span = container.querySelector('span')
    expect(span).not.toBeNull()
    expect(span).toHaveTextContent('1')
  })

  it('honors a custom badge style override', () => {
    const { container } = render(
      <Badge styles={{ badge: (base) => ({ ...base, color: 'red' }) }}>
        7
      </Badge>
    )
    const span = container.querySelector('span') as HTMLSpanElement
    expect(span.style.color).toBe('red')
  })
})
