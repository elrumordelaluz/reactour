import React, { Dispatch, useEffect } from 'react'
import { KeyboardParts } from './types'

const Keyboard: React.FC<KeyboardProps> = ({
  disableKeyboardNavigation,
  setCurrentStep,
  setIsOpen,
  stepsLength,
  disable,
  rtl,
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
      setCurrentStep(c => Math.min(c + 1, stepsLength - 1))
    }

    function prev() {
      setCurrentStep(c => Math.max(c - 1, 0))
    }
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

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler, false)
    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    }
  }, [disable])

  return null
}

export type KeyboardProps = {
  disableKeyboardNavigation?: boolean | KeyboardParts[]
  setCurrentStep: Dispatch<React.SetStateAction<number>>
  setIsOpen: Dispatch<React.SetStateAction<Boolean>>
  stepsLength: number
  disable?: boolean
  rtl?: boolean
}

export default Keyboard
