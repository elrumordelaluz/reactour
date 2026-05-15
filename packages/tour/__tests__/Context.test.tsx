import React from 'react'
import { describe, it, expect, beforeAll } from 'vitest'
import { render, act } from '@testing-library/react'
import { TourProvider, useTour } from '../Context'

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

const steps = [
  { selector: '#a', content: 'Step A' },
  { selector: '#b', content: 'Step B' },
]

describe('TourProvider + useTour', () => {
  it('exposes default state when closed', () => {
    let snapshot: ReturnType<typeof useTour> | undefined
    function Probe() {
      snapshot = useTour()
      return null
    }
    render(
      <TourProvider steps={steps}>
        <Probe />
      </TourProvider>
    )
    expect(snapshot?.isOpen).toBe(false)
    expect(snapshot?.currentStep).toBe(0)
    expect(snapshot?.steps).toEqual(steps)
  })

  it('honors defaultOpen and startAt', () => {
    // Add a real target so the Tour content can mount without crashing.
    const target = document.createElement('div')
    target.id = 'a'
    document.body.appendChild(target)

    let snapshot: ReturnType<typeof useTour> | undefined
    function Probe() {
      snapshot = useTour()
      return null
    }
    render(
      <TourProvider steps={steps} defaultOpen startAt={1}>
        <Probe />
      </TourProvider>
    )
    expect(snapshot?.isOpen).toBe(true)
    expect(snapshot?.currentStep).toBe(1)

    document.body.removeChild(target)
  })

  it('setIsOpen and setCurrentStep update state', () => {
    let snapshot: ReturnType<typeof useTour> | undefined
    function Probe() {
      snapshot = useTour()
      return null
    }
    render(
      <TourProvider steps={steps}>
        <Probe />
      </TourProvider>
    )
    act(() => {
      snapshot?.setCurrentStep(1)
    })
    expect(snapshot?.currentStep).toBe(1)
  })
})
