/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'
import { defaultComponents } from './index'
import { PopoverContentProps } from '../types'

const PopoverContent: React.FC<PopoverContentProps> = ({
  styles,
  components = {},
  badgeContent,
  accessibilityOptions,
  disabledActions,
  onClickClose,
  steps,
  setCurrentStep,
  currentStep,
  transition,
  isHighlightingObserved,
  setIsOpen,
  nextButton,
  prevButton,
  disableDotsNavigation,
  rtl,
  showPrevNextButtons = true,
  showCloseButton = true,
  showNavigation = true,
  showBadge = true,
}) => {
  const step = steps[currentStep]
  const { Badge, Close, Content, Navigation, Arrow } = defaultComponents(
    components
  )

  const badge =
    badgeContent && typeof badgeContent === 'function'
      ? badgeContent({
          currentStep,
          totalSteps: steps.length,
          transition,
        })
      : currentStep + 1

  function closeClickHandler() {
    if (!disabledActions) {
      if (onClickClose && typeof onClickClose === 'function') {
        onClickClose({ setCurrentStep, setIsOpen, currentStep })
      } else {
        setIsOpen(false)
      }
    }
  }

  return (
    <React.Fragment>
      {showBadge ? <Badge styles={styles}>{badge}</Badge> : null}
      {showCloseButton ? (
        <Close
          styles={styles}
          aria-label={accessibilityOptions?.closeButtonAriaLabel}
          disabled={disabledActions}
          onClick={closeClickHandler}
        />
      ) : null}
      <Content
        content={step?.content}
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        transition={transition}
        isHighlightingObserved={isHighlightingObserved}
        setIsOpen={setIsOpen}
      />
      {showNavigation ? (
        <Navigation
          setCurrentStep={setCurrentStep}
          currentStep={currentStep}
          setIsOpen={setIsOpen}
          steps={steps}
          styles={styles}
          aria-hidden={!accessibilityOptions?.showNavigationScreenReaders}
          nextButton={nextButton}
          prevButton={prevButton}
          disableDots={disableDotsNavigation}
          hideButtons={!showPrevNextButtons}
          disableAll={disabledActions}
          rtl={rtl}
          Arrow={Arrow}
        />
      ) : null}
    </React.Fragment>
  )
}

export default PopoverContent
