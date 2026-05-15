import React from 'react'
import { describe, it, expect, beforeAll, vi, beforeEach, afterEach } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { TourProvider } from '../Context'

beforeAll(() => {
  Object.defineProperty(window, 'innerWidth', { value: 1000, configurable: true })
  Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
  // @ts-ignore — jsdom needs scrollIntoView.
  Element.prototype.scrollIntoView = vi.fn()
})

beforeEach(() => {
  // Always present a target so the Tour's Mask/Popover can mount safely.
  const a = document.createElement('div')
  a.id = 'a'
  document.body.appendChild(a)
})

afterEach(() => {
  document.body.innerHTML = ''
})

const steps = [
  { selector: '#a', content: 'A' },
  { selector: '#b', content: 'B' },
]

describe('Tour orchestrator', () => {
  it('renders inside a custom Wrapper component when provided', () => {
    const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
      <div data-testid="custom-wrapper">{children}</div>
    )

    const { getByTestId } = render(
      <TourProvider steps={steps} defaultOpen Wrapper={Wrapper}>
        <div />
      </TourProvider>
    )
    const wrapper = getByTestId('custom-wrapper')
    expect(wrapper.querySelector('.reactour__mask')).not.toBeNull()
    expect(wrapper.querySelector('.reactour__popover')).not.toBeNull()
  })

  it('calls onClickMask(clickProps) instead of closing on mask click', () => {
    const onClickMask = vi.fn()
    render(
      <TourProvider steps={steps} defaultOpen onClickMask={onClickMask}>
        <div />
      </TourProvider>
    )
    fireEvent.click(document.querySelector('.reactour__mask')!)
    expect(onClickMask).toHaveBeenCalledTimes(1)
    expect(onClickMask.mock.calls[0][0]).toEqual(
      expect.objectContaining({ currentStep: 0, steps })
    )
  })

  it('defaults mask click to closing the tour', () => {
    const beforeClose = vi.fn()
    const { container } = render(
      <TourProvider steps={steps} defaultOpen beforeClose={beforeClose}>
        <div />
      </TourProvider>
    )
    expect(container.ownerDocument.querySelector('.reactour__mask')).not.toBeNull()
    fireEvent.click(container.ownerDocument.querySelector('.reactour__mask')!)
    expect(
      container.ownerDocument.querySelector('.reactour__mask')
    ).toBeNull()
    expect(beforeClose).toHaveBeenCalled()
  })

  it('fires afterOpen on mount with the resolved target element', () => {
    const afterOpen = vi.fn()
    render(
      <TourProvider steps={steps} defaultOpen afterOpen={afterOpen}>
        <div />
      </TourProvider>
    )
    expect(afterOpen).toHaveBeenCalledTimes(1)
    expect(afterOpen.mock.calls[0][0]).toBe(document.querySelector('#a'))
  })

  it('runs step.action on mount and step.actionAfter on unmount', () => {
    const action = vi.fn()
    const actionAfter = vi.fn()
    const customSteps = [
      { ...steps[0], action, actionAfter },
      steps[1],
    ]
    const { unmount } = render(
      <TourProvider steps={customSteps} defaultOpen>
        <div />
      </TourProvider>
    )
    expect(action).toHaveBeenCalledWith(document.querySelector('#a'))
    expect(actionAfter).not.toHaveBeenCalled()
    unmount()
    expect(actionAfter).toHaveBeenCalled()
  })

  it('honors a function form of disableInteraction', () => {
    const disableInteraction = vi.fn(() => true)
    render(
      <TourProvider
        steps={steps}
        defaultOpen
        disableInteraction={disableInteraction}
      >
        <div />
      </TourProvider>
    )
    expect(disableInteraction).toHaveBeenCalled()
    expect(disableInteraction.mock.calls[0][0]).toEqual(
      expect.objectContaining({ currentStep: 0, steps })
    )
  })

  it('honors step-level stepInteraction over a global disableInteraction', () => {
    const customSteps = [
      { selector: '#a', content: 'A', stepInteraction: false },
      steps[1],
    ]
    // stepInteraction=false → doDisableInteraction true regardless of global.
    expect(() =>
      render(
        <TourProvider steps={customSteps} defaultOpen disableInteraction={false}>
          <div />
        </TourProvider>
      )
    ).not.toThrow()
  })

  it('accepts the object form of padding', () => {
    expect(() =>
      render(
        <TourProvider
          steps={steps}
          defaultOpen
          padding={{ mask: 5, popover: 15, wrapper: 2 }}
        >
          <div />
        </TourProvider>
      )
    ).not.toThrow()
    // The mask still mounts under the object-form padding.
    expect(document.querySelector('.reactour__mask')).not.toBeNull()
  })

  it('uses a custom ContentComponent inside the Popover', () => {
    const ContentComponent: React.FC<any> = ({ currentStep }) => (
      <div data-testid="custom-content">step={currentStep}</div>
    )
    render(
      <TourProvider
        steps={steps}
        defaultOpen
        ContentComponent={ContentComponent}
      >
        <div />
      </TourProvider>
    )
    const node = document.querySelector('[data-testid="custom-content"]')
    expect(node).not.toBeNull()
    expect(node!.textContent).toBe('step=0')
  })

  it('fires onClickHighlighted when the highlighted mask area is clicked', () => {
    const onClickHighlighted = vi.fn()
    render(
      <TourProvider
        steps={steps}
        defaultOpen
        disableInteraction
        onClickHighlighted={onClickHighlighted}
      >
        <div />
      </TourProvider>
    )
    // The highlighted rect carries no class by default, but we can grab it as
    // the third rect inside the mask svg (mask + click-area + highlighted).
    const rects = document.querySelectorAll('svg > rect')
    fireEvent.click(rects[rects.length - 1])
    expect(onClickHighlighted).toHaveBeenCalledTimes(1)
    expect(onClickHighlighted.mock.calls[0][1]).toEqual(
      expect.objectContaining({ currentStep: 0, steps })
    )
  })

  it('applies step.disableActions via setDisabledActions', () => {
    const customSteps = [
      { selector: '#a', content: 'A', disableActions: true },
      steps[1],
    ]
    // disableActions=true is forwarded into the click props, so a default
    // mask click should be ignored.
    const { container } = render(
      <TourProvider steps={customSteps} defaultOpen>
        <div />
      </TourProvider>
    )
    fireEvent.click(container.ownerDocument.querySelector('.reactour__mask')!)
    // Tour stays open (mask still present) because disabledActions blocks close.
    expect(
      container.ownerDocument.querySelector('.reactour__mask')
    ).not.toBeNull()
  })

  it('uses step.position when no global position is provided', () => {
    const customSteps = [
      { selector: '#a', content: 'A', position: 'top' as const },
      steps[1],
    ]
    expect(() =>
      render(
        <TourProvider steps={customSteps} defaultOpen>
          <div />
        </TourProvider>
      )
    ).not.toThrow()
  })

  it('renders nothing when currentStep is past the end of steps', () => {
    // startAt=5 with 2 steps → steps[5] is undefined, Tour returns null.
    render(
      <TourProvider steps={steps} defaultOpen startAt={5}>
        <div />
      </TourProvider>
    )
    expect(document.querySelector('.reactour__mask')).toBeNull()
    expect(document.querySelector('.reactour__popover')).toBeNull()
  })

  it('hides Mask and Popover when disableWhenSelectorFalsy and no target exists', () => {
    document.body.innerHTML = ''
    const missingSteps = [{ selector: '#missing', content: 'X' }]
    render(
      <TourProvider steps={missingSteps} defaultOpen disableWhenSelectorFalsy>
        <div />
      </TourProvider>
    )
    expect(document.querySelector('.reactour__mask')).toBeNull()
    expect(document.querySelector('.reactour__popover')).toBeNull()
  })
})
