import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import PopoverContent from '../components/PopoverContent'

const steps = [
  { selector: '#a', content: 'Welcome' },
  { selector: '#b', content: 'Second step' },
  { selector: '#c', content: 'Last step' },
]

const baseProps = {
  styles: {},
  steps,
  setCurrentStep: vi.fn(),
  setIsOpen: vi.fn(),
  currentStep: 0,
  setSteps: vi.fn(),
  setMeta: vi.fn(),
  meta: '',
}

describe('PopoverContent', () => {
  it('renders the current step content, badge, close, and nav by default', () => {
    render(<PopoverContent {...baseProps} />)
    // Step text.
    expect(screen.getByText('Welcome')).toBeInTheDocument()
    // Default badge = currentStep + 1.
    expect(screen.getByText('1')).toBeInTheDocument()
    // Close button + 2 nav buttons + 3 dots = 6.
    expect(screen.getAllByRole('button')).toHaveLength(6)
  })

  it('supports a function content render-prop', () => {
    const content = vi.fn(({ currentStep }) => (
      <div>step is {currentStep}</div>
    ))
    const dynamicSteps = [{ selector: '#a', content }]
    render(
      <PopoverContent {...baseProps} steps={dynamicSteps} currentStep={0} />
    )
    expect(screen.getByText('step is 0')).toBeInTheDocument()
    expect(content).toHaveBeenCalled()
  })

  it('renders a custom badgeContent function', () => {
    const badgeContent = vi.fn(
      ({ currentStep, totalSteps }) => `${currentStep + 1} of ${totalSteps}`
    )
    render(
      <PopoverContent
        {...baseProps}
        currentStep={1}
        badgeContent={badgeContent}
      />
    )
    expect(screen.getByText('2 of 3')).toBeInTheDocument()
    expect(badgeContent).toHaveBeenCalledWith(
      expect.objectContaining({ currentStep: 1, totalSteps: 3 })
    )
  })

  it('hides badge, close, and navigation when their show* flags are false', () => {
    render(
      <PopoverContent
        {...baseProps}
        showBadge={false}
        showCloseButton={false}
        showNavigation={false}
      />
    )
    expect(screen.queryByText('1')).toBeNull()
    // No buttons at all once everything optional is hidden.
    expect(screen.queryAllByRole('button')).toHaveLength(0)
    // Content still renders.
    expect(screen.getByText('Welcome')).toBeInTheDocument()
  })

  it('clicking the close button calls setIsOpen(false) by default', () => {
    const setIsOpen = vi.fn()
    const { container } = render(
      <PopoverContent {...baseProps} setIsOpen={setIsOpen} />
    )
    fireEvent.click(container.querySelector('.reactour__close-button')!)
    expect(setIsOpen).toHaveBeenCalledWith(false)
  })

  it('calls a custom onClickClose handler with clickProps', () => {
    const onClickClose = vi.fn()
    const setIsOpen = vi.fn()
    const { container } = render(
      <PopoverContent
        {...baseProps}
        setIsOpen={setIsOpen}
        onClickClose={onClickClose}
      />
    )
    fireEvent.click(container.querySelector('.reactour__close-button')!)
    expect(onClickClose).toHaveBeenCalledWith(
      expect.objectContaining({
        currentStep: 0,
        steps,
        setIsOpen,
      })
    )
    // Custom handler replaces the default close, so setIsOpen isn't auto-called.
    expect(setIsOpen).not.toHaveBeenCalled()
  })

  it('disabledActions blocks the close click handler', () => {
    const onClickClose = vi.fn()
    const setIsOpen = vi.fn()
    const { container } = render(
      <PopoverContent
        {...baseProps}
        disabledActions
        onClickClose={onClickClose}
        setIsOpen={setIsOpen}
      />
    )
    fireEvent.click(container.querySelector('.reactour__close-button')!)
    expect(onClickClose).not.toHaveBeenCalled()
    expect(setIsOpen).not.toHaveBeenCalled()
  })

  it('uses accessibilityOptions.closeButtonAriaLabel', () => {
    render(
      <PopoverContent
        {...baseProps}
        accessibilityOptions={{
          closeButtonAriaLabel: 'Dismiss tour',
          showNavigationScreenReaders: true,
        }}
      />
    )
    expect(screen.getByLabelText('Dismiss tour')).toBeInTheDocument()
  })
})
