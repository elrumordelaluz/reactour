import React, { useEffect } from 'react'
import { Portal, Observables } from '@reactour/utils'
import { Mask } from '@reactour/mask'
import { Popover } from '@reactour/popover'
import { FocusScope } from '@react-aria/focus'
import { useSizes } from './hooks'
import { TourProps, Padding } from './types'
import Badge from './Badge'
import Navigation from './Navigation'
import Content from './Content'
import Close from './Close'
import Keyboard from './Keyboard'

const Tour: React.FC<TourProps> = ({
  currentStep,
  setCurrentStep,
  setIsOpen,
  steps = [],
  styles: globalStyles = {},
  scrollSmooth,
  afterOpen,
  beforeClose,
  padding = 10,
  position,
  onClickMask,
  onClickHighlighted,
  badgeContent,
  className = 'reactour__popover',
  maskClassName = 'reactour__mask',
  highlightedMaskClassName,
  disableInteraction,
  disableFocusLock,
  disableDotsNavigation,
  disableKeyboardNavigation,
  inViewThreshold,
  nextButton,
  prevButton,
  showPrevNextButtons = true,
  showCloseButton = true,
  showNavigation = true,
  showBadge = true,
  disabledActions,
  setDisabledActions,
  rtl,
  accessibilityOptions = {
    closeButtonAriaLabel: 'Close Tour',
    showNavigationScreenReaders: true,
  },
}) => {
  const step = steps[currentStep]
  const styles = step?.styles || globalStyles

  const { sizes, transition, observableRefresher, target } = useSizes(step, {
    block: 'center',
    behavior: scrollSmooth ? 'smooth' : 'auto',
    inViewThreshold,
  })

  useEffect(() => {
    if (afterOpen && typeof afterOpen === 'function') {
      afterOpen(target)
    }
    return () => {
      if (beforeClose && typeof beforeClose === 'function') {
        beforeClose(target)
      }
    }
  }, [])

  const { maskPadding, popoverPadding } = getPadding(step?.padding || padding)

  function maskClickHandler() {
    if (!disabledActions) {
      if (onClickMask && typeof onClickMask === 'function') {
        onClickMask({ setCurrentStep, setIsOpen, currentStep })
      } else {
        setIsOpen(false)
      }
    }
  }

  const badge =
    badgeContent && typeof badgeContent === 'function'
      ? badgeContent({ currentStep, totalSteps: steps.length, transition })
      : currentStep + 1

  const doDisableInteraction = step?.stepInteraction
    ? !step?.stepInteraction
    : disableInteraction

  useEffect(() => {
    if (step?.action && typeof step?.action === 'function') {
      step?.action(target)
    }

    if (step?.disableActions) {
      setDisabledActions(true)
    }
  }, [step])

  const popoverPosition = transition
    ? 'center'
    : step?.position
    ? step?.position
    : position

  return step ? (
    <Portal>
      <FocusManager disabled={disableFocusLock}>
        <Observables
          mutationObservables={step?.mutationObservables}
          resizeObservables={step?.resizeObservables}
          refresh={observableRefresher}
        />

        <Keyboard
          setCurrentStep={setCurrentStep}
          setIsOpen={setIsOpen}
          stepsLength={steps.length}
          disableKeyboardNavigation={disableKeyboardNavigation}
          disable={disabledActions}
          rtl={rtl}
        />

        <Mask
          sizes={sizes}
          onClick={maskClickHandler}
          styles={{
            highlightedArea: base => ({
              ...base,
              display: doDisableInteraction ? 'block' : 'none',
            }),
            ...styles,
          }}
          padding={maskPadding}
          highlightedAreaClassName={highlightedMaskClassName}
          className={maskClassName}
          onClickHighlighted={onClickHighlighted}
        />

        <Popover
          sizes={sizes}
          styles={styles}
          position={popoverPosition}
          padding={popoverPadding}
          aria-labelledby={accessibilityOptions?.ariaLabelledBy}
          className={className}
          refresher={currentStep}
        >
          {showBadge ? <Badge styles={styles}>{badge}</Badge> : null}
          {showCloseButton ? (
            <Close
              styles={styles}
              aria-label={accessibilityOptions?.closeButtonAriaLabel}
              disabled={disabledActions}
              onClick={() => {
                if (!disabledActions) setIsOpen(false)
              }}
            />
          ) : null}
          <Content
            content={step?.content}
            setCurrentStep={setCurrentStep}
            currentStep={currentStep}
            transition={transition}
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
            />
          ) : null}
        </Popover>
      </FocusManager>
    </Portal>
  ) : null
}

export default Tour

export interface CustomCSS extends React.CSSProperties {
  rx: number
}

const FocusManager: React.FC<FocusProps> = ({ disabled, children }) => {
  return disabled ? (
    <>{children}</>
  ) : (
    <FocusScope contain autoFocus restoreFocus>
      {children}
    </FocusScope>
  )
}

type FocusProps = {
  disabled?: boolean
}

function getPadding(padding?: Padding) {
  if (typeof padding === 'object' && padding !== null) {
    return {
      maskPadding: padding.mask,
      popoverPadding: padding.popover,
    }
  }
  return {
    maskPadding: padding,
    popoverPadding: padding,
  }
}
