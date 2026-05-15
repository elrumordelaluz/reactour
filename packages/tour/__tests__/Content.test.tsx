import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import Content from '../components/Content'

const baseProps = {
  setCurrentStep: vi.fn(),
  setIsOpen: vi.fn(),
  currentStep: 0,
}

describe('Content', () => {
  it('renders a plain ReactNode as-is', () => {
    const { getByText } = render(
      <Content {...baseProps} content={<span>Hello there</span>} />
    )
    expect(getByText('Hello there')).toBeInTheDocument()
  })

  it('renders a string content as-is', () => {
    const { container } = render(<Content {...baseProps} content="Just text" />)
    expect(container).toHaveTextContent('Just text')
  })

  it('calls the function form with the expected props', () => {
    const setCurrentStep = vi.fn()
    const setIsOpen = vi.fn()
    const content = vi.fn(({ currentStep }) => <div>step {currentStep}</div>)

    const { getByText } = render(
      <Content
        content={content}
        currentStep={2}
        transition
        isHighlightingObserved
        setCurrentStep={setCurrentStep}
        setIsOpen={setIsOpen}
      />
    )

    expect(content).toHaveBeenCalledWith({
      setCurrentStep,
      setIsOpen,
      currentStep: 2,
      transition: true,
      isHighlightingObserved: true,
    })
    expect(getByText('step 2')).toBeInTheDocument()
  })
})
