import React from 'react'
import { describe, it, expect, beforeAll, vi } from 'vitest'
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

  it('setSteps replaces the steps array', () => {
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
    const next = [{ selector: '#c', content: 'Step C' }]
    act(() => {
      snapshot?.setSteps?.(next)
    })
    expect(snapshot?.steps).toEqual(next)
  })

  it('setMeta updates exposed meta', () => {
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
      snapshot?.setMeta?.('hello')
    })
    expect(snapshot?.meta).toBe('hello')
  })

  it('setDisabledActions toggles disabledActions', () => {
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
    expect(snapshot?.disabledActions).toBe(false)
    act(() => {
      snapshot?.setDisabledActions?.(true)
    })
    expect(snapshot?.disabledActions).toBe(true)
  })

  it('honors a custom controlled setCurrentStep', () => {
    const customSetCurrentStep = vi.fn()
    let snapshot: ReturnType<typeof useTour> | undefined
    function Probe() {
      snapshot = useTour()
      return null
    }
    render(
      <TourProvider
        steps={steps}
        currentStep={1}
        setCurrentStep={customSetCurrentStep}
      >
        <Probe />
      </TourProvider>
    )
    expect(snapshot?.currentStep).toBe(1)
    expect(snapshot?.setCurrentStep).toBe(customSetCurrentStep)
    act(() => {
      snapshot?.setCurrentStep(2)
    })
    expect(customSetCurrentStep).toHaveBeenCalledWith(2)
  })

  it('useTour returns the default state when used outside a provider', () => {
    let snapshot: ReturnType<typeof useTour> | undefined
    function Probe() {
      snapshot = useTour()
      return null
    }
    render(<Probe />)
    expect(snapshot?.isOpen).toBe(false)
    expect(snapshot?.currentStep).toBe(0)
    expect(snapshot?.steps).toEqual([])
    // The default no-op setters return their initial values rather than
    // throwing — exercise each so they aren't dead code.
    expect(snapshot?.setIsOpen(true as any)).toBe(false)
    expect(snapshot?.setCurrentStep(1 as any)).toBe(0)
    expect(snapshot?.setSteps?.([] as any)).toEqual([])
    expect(snapshot?.setMeta?.('hi')).toBe('')
    expect(snapshot?.setDisabledActions?.(true)).toBe(false)
  })

  it('mounts Tour only when isOpen is true', () => {
    const target = document.createElement('div')
    target.id = 'a'
    document.body.appendChild(target)

    let snapshot: ReturnType<typeof useTour> | undefined
    function Probe() {
      snapshot = useTour()
      return null
    }
    const { container } = render(
      <TourProvider steps={steps}>
        <Probe />
      </TourProvider>
    )
    // Tour mounts a Mask <div>; while closed nothing extra is rendered.
    expect(container.querySelectorAll('div').length).toBe(0)
    act(() => {
      snapshot?.setIsOpen(true)
    })
    expect(document.querySelector('.reactour__mask')).not.toBeNull()
    act(() => {
      snapshot?.setIsOpen(false)
    })
    expect(document.querySelector('.reactour__mask')).toBeNull()

    document.body.removeChild(target)
  })
})
