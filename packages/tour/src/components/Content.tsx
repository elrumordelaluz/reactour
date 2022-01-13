import React, { Dispatch } from 'react'

const Content: React.FC<ContentProps> = ({
  content,
  setCurrentStep,
  transition,
  isHighlightingObserved,
  currentStep,
  setIsOpen,
}) => {
  return typeof content === 'function'
    ? content({
        setCurrentStep,
        transition,
        isHighlightingObserved,
        currentStep,
        setIsOpen,
      })
    : content
}

export type ContentProps = {
  content: any
  setCurrentStep: Dispatch<React.SetStateAction<number>>
  setIsOpen?: Dispatch<React.SetStateAction<Boolean>>
  currentStep: number
  transition?: boolean
  isHighlightingObserved?: boolean
}

export default Content
