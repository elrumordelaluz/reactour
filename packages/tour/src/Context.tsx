import React, { useState, useContext } from 'react'
// import { useControllableState } from '@chakra-ui/hooks'

import Tour from './Tour'
import { ProviderProps, TourProps } from './types'

const defaultState = {
  isOpen: false,
  setIsOpen: () => false,
  currentStep: 0,
  setCurrentStep: () => 0,
  steps: [],
  setSteps: () => [],
  disabledActions: false,
  setDisabledActions: () => false,
  components: {},
}

const TourContext = React.createContext<TourProps>(defaultState)

const TourProvider: React.FC<ProviderProps> = ({
  children,
  defaultOpen = false,
  startAt = 0,
  steps: defaultSteps,
  setCurrentStep: customSetCurrentStep,
  currentStep: customCurrentStep,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [currentStep, setCurrentStep] = useState(startAt)
  const [steps, setSteps] = useState(defaultSteps)
  const [disabledActions, setDisabledActions] = useState(false)

  const value = {
    isOpen,
    setIsOpen,
    currentStep: customCurrentStep || currentStep,
    setCurrentStep: customSetCurrentStep || setCurrentStep,
    steps,
    setSteps,
    disabledActions,
    setDisabledActions,
    ...props,
  }

  return (
    <TourContext.Provider value={value}>
      {children}
      {isOpen ? <Tour {...value} /> : null}
    </TourContext.Provider>
  )
}

export { TourProvider }

export default TourContext

export function useTour() {
  return useContext(TourContext)
}
