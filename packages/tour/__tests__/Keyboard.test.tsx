import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import Keyboard from '../Keyboard'

const baseProps = {
  setCurrentStep: vi.fn(),
  currentStep: 0,
  setIsOpen: vi.fn(),
  stepsLength: 3,
  clickProps: undefined as any,
}

describe('Keyboard', () => {
  it('advances on ArrowRight', () => {
    const setCurrentStep = vi.fn()
    render(
      <Keyboard {...baseProps} setCurrentStep={setCurrentStep} currentStep={0} />
    )
    fireEvent.keyDown(window, { keyCode: 39 })
    expect(setCurrentStep).toHaveBeenCalledWith(1)
  })

  it('goes back on ArrowLeft', () => {
    const setCurrentStep = vi.fn()
    render(
      <Keyboard {...baseProps} setCurrentStep={setCurrentStep} currentStep={2} />
    )
    fireEvent.keyDown(window, { keyCode: 37 })
    expect(setCurrentStep).toHaveBeenCalledWith(1)
  })

  it('closes on Escape', () => {
    const setIsOpen = vi.fn()
    render(<Keyboard {...baseProps} setIsOpen={setIsOpen} />)
    fireEvent.keyDown(window, { keyCode: 27 })
    expect(setIsOpen).toHaveBeenCalledWith(false)
  })

  it('reverses arrow direction when rtl', () => {
    const setCurrentStep = vi.fn()
    render(
      <Keyboard
        {...baseProps}
        rtl
        setCurrentStep={setCurrentStep}
        currentStep={1}
      />
    )
    fireEvent.keyDown(window, { keyCode: 39 })
    expect(setCurrentStep).toHaveBeenCalledWith(0)
  })

  it('does nothing when disable=true', () => {
    const setCurrentStep = vi.fn()
    const setIsOpen = vi.fn()
    render(
      <Keyboard
        {...baseProps}
        disable
        setCurrentStep={setCurrentStep}
        setIsOpen={setIsOpen}
      />
    )
    fireEvent.keyDown(window, { keyCode: 39 })
    fireEvent.keyDown(window, { keyCode: 27 })
    expect(setCurrentStep).not.toHaveBeenCalled()
    expect(setIsOpen).not.toHaveBeenCalled()
  })

  it('does nothing when disableKeyboardNavigation=true', () => {
    const setCurrentStep = vi.fn()
    render(
      <Keyboard
        {...baseProps}
        disableKeyboardNavigation
        setCurrentStep={setCurrentStep}
      />
    )
    fireEvent.keyDown(window, { keyCode: 39 })
    expect(setCurrentStep).not.toHaveBeenCalled()
  })

  it('honors a partial disableKeyboardNavigation list', () => {
    const setCurrentStep = vi.fn()
    const setIsOpen = vi.fn()
    render(
      <Keyboard
        {...baseProps}
        disableKeyboardNavigation={['esc']}
        setCurrentStep={setCurrentStep}
        setIsOpen={setIsOpen}
      />
    )
    fireEvent.keyDown(window, { keyCode: 27 })
    expect(setIsOpen).not.toHaveBeenCalled()
    fireEvent.keyDown(window, { keyCode: 39 })
    expect(setCurrentStep).toHaveBeenCalledWith(1)
  })

  it('advances on ArrowLeft when rtl', () => {
    const setCurrentStep = vi.fn()
    render(
      <Keyboard
        {...baseProps}
        rtl
        setCurrentStep={setCurrentStep}
        currentStep={0}
      />
    )
    fireEvent.keyDown(window, { keyCode: 37 })
    expect(setCurrentStep).toHaveBeenCalledWith(1)
  })

  it('delegates to a custom keyboardHandler with disabled-keys context', () => {
    const handler = vi.fn()
    const setCurrentStep = vi.fn()
    const setIsOpen = vi.fn()
    render(
      <Keyboard
        {...baseProps}
        disableKeyboardNavigation={['esc']}
        keyboardHandler={handler}
        setCurrentStep={setCurrentStep}
        setIsOpen={setIsOpen}
      />
    )
    fireEvent.keyDown(window, { keyCode: 39 })
    expect(handler).toHaveBeenCalledTimes(1)
    const args = handler.mock.calls[0]
    expect(args[2]).toEqual({
      isEscDisabled: true,
      isRightDisabled: false,
      isLeftDisabled: false,
    })
    // When a custom handler is supplied, the built-in nav is skipped.
    expect(setCurrentStep).not.toHaveBeenCalled()
    expect(setIsOpen).not.toHaveBeenCalled()
  })
})
