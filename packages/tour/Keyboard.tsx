import React, { Dispatch, useEffect } from 'react'
import { KeyboardParts, ClickProps, KeyboardHandler } from './types'

const Keyboard: React.FC<KeyboardProps> = ({
  disableKeyboardNavigation,
  setCurrentStep,
  currentStep,
  setIsOpen,
  stepsLength,
  disable,
  rtl,
  clickProps,
  keyboardHandler,
}) => {
  function keyDownHandler(e: any) {
    e.stopPropagation()

    if (disableKeyboardNavigation === true || disable) {
      return
    }
    let isEscDisabled, isRightDisabled, isLeftDisabled
    if (disableKeyboardNavigation) {
      isEscDisabled = disableKeyboardNavigation.includes('esc')
      isRightDisabled = disableKeyboardNavigation.includes('right')
      isLeftDisabled = disableKeyboardNavigation.includes('left')
    }

    function next() {
      setCurrentStep(Math.min(currentStep + 1, stepsLength - 1))
    }

    function prev() {
      setCurrentStep(Math.max(currentStep - 1, 0))
    }

    if (keyboardHandler && typeof keyboardHandler === 'function') {
      keyboardHandler(e, clickProps, {
        isEscDisabled,
        isRightDisabled,
        isLeftDisabled,
      })
    } else {
      if (e.keyCode === 27 && !isEscDisabled) {
        e.preventDefault()
        setIsOpen(false)
      }
      if (e.keyCode === 39 && !isRightDisabled) {
        e.preventDefault()
        if (rtl) {
          prev()
        } else {
          next()
        }
      }
      if (e.keyCode === 37 && !isLeftDisabled) {
        e.preventDefault()
        if (rtl) {
          next()
        } else {
          prev()
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler, false)
    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    }
  }, [disable, setCurrentStep, currentStep])

  return null
}

export type KeyboardProps = KeyboardHandler & {
  disableKeyboardNavigation?: boolean | KeyboardParts[]
  setCurrentStep: Dispatch<React.SetStateAction<number>>
  currentStep: number
  setIsOpen: Dispatch<React.SetStateAction<boolean>>
  stepsLength: number
  disable?: boolean
  rtl?: boolean
  clickProps?: ClickProps
}

export default Keyboard
