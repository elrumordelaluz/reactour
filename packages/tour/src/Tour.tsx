import React, { useEffect } from 'react'
import { Portal, Observables } from '@reactour/utils'
import { Mask } from '@reactour/mask'
import { Popover } from '@reactour/popover'
import { FocusScope } from '@react-aria/focus'
import { useSizes } from './hooks'
import { TourProps, Padding } from './types'
import Keyboard from './Keyboard'
import PopoverContent from './components/PopoverContent'

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
  className = 'reactour__popover',
  maskClassName = 'reactour__mask',
  highlightedMaskClassName,
  disableInteraction,
  disableFocusLock,
  disableKeyboardNavigation,
  inViewThreshold,
  disabledActions,
  setDisabledActions,
  rtl,
  accessibilityOptions = {
    closeButtonAriaLabel: 'Close Tour',
    showNavigationScreenReaders: true,
  },
  ContentComponent,
  ...popoverProps
}) => {
  const step = steps[currentStep]
  const styles = step?.styles || globalStyles

  const {
    sizes,
    transition,
    observableRefresher,
    isHighlightingObserved,
    target,
  } = useSizes(step, {
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
        onClickMask({ setCurrentStep, setIsOpen, currentStep, steps })
      } else {
        setIsOpen(false)
      }
    }
  }

  const doDisableInteraction = step?.stepInteraction
    ? !step?.stepInteraction
    : disableInteraction

  useEffect(() => {
    if (step?.action && typeof step?.action === 'function') {
      step?.action(target)
    }

    if (step?.disableActions !== undefined) {
      setDisabledActions(step?.disableActions)
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
            highlightedArea: (base: any) => ({
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
          {ContentComponent ? (
            <ContentComponent
              styles={styles}
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
              setIsOpen={setIsOpen}
              steps={steps}
              accessibilityOptions={accessibilityOptions}
              disabledActions={disabledActions}
              transition={transition}
              isHighlightingObserved={isHighlightingObserved}
              rtl={rtl}
              {...popoverProps}
            />
          ) : (
            <PopoverContent
              styles={styles}
              setCurrentStep={setCurrentStep}
              currentStep={currentStep}
              setIsOpen={setIsOpen}
              steps={steps}
              accessibilityOptions={accessibilityOptions}
              disabledActions={disabledActions}
              transition={transition}
              isHighlightingObserved={isHighlightingObserved}
              rtl={rtl}
              {...popoverProps}
            />
          )}
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
