import React from 'react'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { TourProvider } from '../Context'
import withTour from '../withTour'

const steps = [
  { selector: '#a', content: 'A' },
  { selector: '#b', content: 'B' },
]

describe('withTour', () => {
  it('forwards own props and injects tour props', () => {
    type Props = { label: string }
    const Inner: React.FC<Props & { isOpen?: boolean; currentStep?: number }> = ({
      label,
      isOpen,
      currentStep,
    }) => (
      <div data-testid="probe">
        {label}|{String(isOpen)}|{currentStep}
      </div>
    )
    const Wrapped = withTour(Inner)

    const { getByTestId } = render(
      <TourProvider steps={steps} startAt={1}>
        <Wrapped label="hi" />
      </TourProvider>
    )

    expect(getByTestId('probe').textContent).toBe('hi|false|1')
  })

  it('lets own props override injected tour props', () => {
    type Props = { currentStep: number }
    const Inner: React.FC<Props> = ({ currentStep }) => (
      <div data-testid="probe">{currentStep}</div>
    )
    const Wrapped = withTour(Inner)

    const { getByTestId } = render(
      <TourProvider steps={steps} startAt={0}>
        {/* The HOC spreads `{...props} {...tourProps}`, so tour wins on conflicts. */}
        <Wrapped currentStep={99} />
      </TourProvider>
    )

    // tourProps.currentStep (0) overrides the prop (99).
    expect(getByTestId('probe').textContent).toBe('0')
  })
})
