import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import Close from '../components/Close'

describe('Close', () => {
  it('renders a button with the reactour close class', () => {
    render(<Close onClick={() => {}} />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('reactour__close-button')
  })

  it('fires onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Close onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('passes through aria-label', () => {
    render(<Close onClick={() => {}} aria-label="Close Tour" />)
    expect(screen.getByLabelText('Close Tour')).toBeInTheDocument()
  })
})
