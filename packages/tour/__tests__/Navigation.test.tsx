import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import Navigation from '../components/Navigation'

const steps = [
  { selector: '#a', content: 'A' },
  { selector: '#b', content: 'B' },
  { selector: '#c', content: 'C' },
]

const baseProps = {
  steps,
  setCurrentStep: vi.fn(),
  setIsOpen: vi.fn(),
  currentStep: 0,
}

describe('Navigation', () => {
  it('renders one button per step as a dot plus prev/next', () => {
    render(<Navigation {...baseProps} />)
    // 3 dots + prev + next = 5 buttons.
    expect(screen.getAllByRole('button')).toHaveLength(5)
    expect(screen.getByLabelText('Go to next step')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to prev step')).toBeInTheDocument()
  })

  it('advances on next click', () => {
    const setCurrentStep = vi.fn()
    render(
      <Navigation
        {...baseProps}
        setCurrentStep={setCurrentStep}
        currentStep={0}
      />
    )
    fireEvent.click(screen.getByLabelText('Go to next step'))
    expect(setCurrentStep).toHaveBeenCalledWith(1)
  })

  it('goes back on prev click', () => {
    const setCurrentStep = vi.fn()
    render(
      <Navigation
        {...baseProps}
        setCurrentStep={setCurrentStep}
        currentStep={2}
      />
    )
    fireEvent.click(screen.getByLabelText('Go to prev step'))
    expect(setCurrentStep).toHaveBeenCalledWith(1)
  })

  it('caps next at last step', () => {
    const setCurrentStep = vi.fn()
    render(
      <Navigation
        {...baseProps}
        setCurrentStep={setCurrentStep}
        currentStep={2}
      />
    )
    fireEvent.click(screen.getByLabelText('Go to next step'))
    // Math.min(2 + 1, 3 - 1) === 2; still called, but stays at 2.
    expect(setCurrentStep).toHaveBeenCalledWith(2)
  })

  it('floors prev at 0', () => {
    const setCurrentStep = vi.fn()
    render(
      <Navigation
        {...baseProps}
        setCurrentStep={setCurrentStep}
        currentStep={0}
      />
    )
    fireEvent.click(screen.getByLabelText('Go to prev step'))
    expect(setCurrentStep).toHaveBeenCalledWith(0)
  })

  it('jumps to a step when a dot is clicked', () => {
    const setCurrentStep = vi.fn()
    render(
      <Navigation {...baseProps} setCurrentStep={setCurrentStep} />
    )
    fireEvent.click(screen.getByLabelText('Go to step 3'))
    expect(setCurrentStep).toHaveBeenCalledWith(2)
  })

  it('uses navDotAriaLabel when provided', () => {
    const labeledSteps = [
      { selector: '#a', content: 'A', navDotAriaLabel: 'Intro dot' },
      { selector: '#b', content: 'B' },
    ]
    render(<Navigation {...baseProps} steps={labeledSteps} />)
    expect(screen.getByLabelText('Intro dot')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to step 2')).toBeInTheDocument()
  })

  it('hides nav buttons when hideButtons is set', () => {
    render(<Navigation {...baseProps} hideButtons />)
    expect(screen.queryByLabelText('Go to next step')).toBeNull()
    expect(screen.queryByLabelText('Go to prev step')).toBeNull()
    // Dots remain.
    expect(screen.getAllByRole('button')).toHaveLength(3)
  })

  it('hides dots when hideDots is set', () => {
    render(<Navigation {...baseProps} hideDots />)
    expect(screen.queryByLabelText('Go to step 1')).toBeNull()
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  it('disableDots blocks dot clicks but not buttons', () => {
    const setCurrentStep = vi.fn()
    render(
      <Navigation
        {...baseProps}
        disableDots
        setCurrentStep={setCurrentStep}
      />
    )
    fireEvent.click(screen.getByLabelText('Go to step 2'))
    expect(setCurrentStep).not.toHaveBeenCalled()
    fireEvent.click(screen.getByLabelText('Go to next step'))
    expect(setCurrentStep).toHaveBeenCalledWith(1)
  })

  it('disableAll blocks every interaction', () => {
    const setCurrentStep = vi.fn()
    render(
      <Navigation
        {...baseProps}
        disableAll
        setCurrentStep={setCurrentStep}
      />
    )
    fireEvent.click(screen.getByLabelText('Go to next step'))
    fireEvent.click(screen.getByLabelText('Go to prev step'))
    fireEvent.click(screen.getByLabelText('Go to step 2'))
    expect(setCurrentStep).not.toHaveBeenCalled()
  })

  it('rtl flips the container direction', () => {
    const { container } = render(<Navigation {...baseProps} rtl />)
    expect(container.firstChild).toHaveAttribute('dir', 'rtl')
  })

  it('lets a custom nextButton render prop replace the next button', () => {
    const nextButton = vi.fn(({ currentStep, stepsLength }) => (
      <button aria-label="custom-next">
        {currentStep + 1}/{stepsLength}
      </button>
    ))
    render(<Navigation {...baseProps} nextButton={nextButton} />)
    expect(screen.getByLabelText('custom-next')).toHaveTextContent('1/3')
    expect(screen.queryByLabelText('Go to next step')).toBeNull()
    expect(nextButton).toHaveBeenCalled()
  })

  it('lets a custom prevButton render prop replace the prev button', () => {
    const prevButton = vi.fn(({ currentStep, stepsLength }) => (
      <button aria-label="custom-prev">
        back ({currentStep}/{stepsLength})
      </button>
    ))
    render(<Navigation {...baseProps} prevButton={prevButton} />)
    expect(screen.getByLabelText('custom-prev')).toBeInTheDocument()
    expect(screen.queryByLabelText('Go to prev step')).toBeNull()
    expect(prevButton).toHaveBeenCalled()
  })

  it('renders the Button render prop with a working onClick override', () => {
    const handler = vi.fn()
    const nextButton = vi.fn(({ Button }) => (
      <Button onClick={handler} hideArrow>
        custom!
      </Button>
    ))
    render(<Navigation {...baseProps} nextButton={nextButton} />)
    const btn = screen.getByText('custom!')
    fireEvent.click(btn)
    expect(handler).toHaveBeenCalled()
    // hideArrow strips the svg arrow.
    expect(btn.querySelector('svg')).toBeNull()
  })
})
