import { Mask } from '@reactour/mask'
import { Popover } from '@reactour/popover'
import { Observables } from '@reactour/utils'
import React, { useEffect } from 'react'
import PopoverContent from './components/PopoverContent'
import { useSizes } from './hooks'
import Keyboard from './Keyboard'
import { Padding, TourProps } from './types'

const Tour: React.FC<TourProps> = ({
  currentStep,
  setCurrentStep,
  setIsOpen,
  steps = [],
  setSteps,
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
  clipId,
  maskId,
  disableInteraction,
  // disableFocusLock,
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
  Wrapper,
  meta,
  setMeta,
  onTransition = () => {
    // const arr: [number, number] = [prev.x, prev.y]
    return 'center'
  },
  ...popoverProps
}) => {
  const step = steps[currentStep]
  const styles = { ...globalStyles, ...step?.styles }

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

  const { maskPadding, popoverPadding, wrapperPadding } = getPadding(
    step?.padding ?? padding
  )

  function maskClickHandler() {
    if (!disabledActions) {
      if (onClickMask && typeof onClickMask === 'function') {
        onClickMask({
          setCurrentStep,
          setIsOpen,
          currentStep,
          setSteps,
          steps,
          setMeta,
          meta,
        })
      } else {
        setIsOpen(false)
      }
    }
  }

  const doDisableInteraction =
    typeof step?.stepInteraction === 'boolean'
      ? !step?.stepInteraction
      : disableInteraction

  useEffect(() => {
    if (step?.action && typeof step?.action === 'function') {
      step?.action(target)
    }

    if (step?.disableActions !== undefined) {
      setDisabledActions(step?.disableActions)
    }

    return () => {
      if (step?.actionAfter && typeof step?.actionAfter === 'function') {
        step?.actionAfter(target)
      }
    }
  }, [step])

  const popoverPosition = transition
    ? onTransition
    : step?.position
    ? step?.position
    : position

  const TourWrapper = Wrapper ? Wrapper : React.Fragment
  return step ? (
    <TourWrapper>
      <Observables
        mutationObservables={step?.mutationObservables}
        resizeObservables={step?.resizeObservables}
        refresh={observableRefresher}
      />

      <Keyboard
        setCurrentStep={setCurrentStep}
        currentStep={currentStep}
        setIsOpen={setIsOpen}
        stepsLength={steps.length}
        disableKeyboardNavigation={disableKeyboardNavigation}
        disable={disabledActions}
        rtl={rtl}
      />

      <Mask
        sizes={transition ? initialState : sizes}
        onClick={maskClickHandler}
        styles={{
          highlightedArea: (base: any) => ({
            ...base,
            display: doDisableInteraction ? 'block' : 'none',
          }),
          ...styles,
        }}
        padding={transition ? 0 : maskPadding}
        highlightedAreaClassName={highlightedMaskClassName}
        className={maskClassName}
        onClickHighlighted={onClickHighlighted}
        wrapperPadding={wrapperPadding}
        clipId={clipId}
        maskId={maskId}
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
            setSteps={setSteps}
            accessibilityOptions={accessibilityOptions}
            disabledActions={disabledActions}
            transition={transition}
            isHighlightingObserved={isHighlightingObserved}
            rtl={rtl}
            meta={meta}
            setMeta={setMeta}
            {...popoverProps}
          />
        )}
      </Popover>
    </TourWrapper>
  ) : null
}

export default Tour

export interface CustomCSS extends React.CSSProperties {
  rx: number
}

function getPadding(padding?: Padding) {
  if (typeof padding === 'object' && padding !== null) {
    return {
      maskPadding: padding.mask,
      popoverPadding: padding.popover,
      wrapperPadding: padding.wrapper,
    }
  }
  return {
    maskPadding: padding,
    popoverPadding: padding,
    wrapperPadding: 0,
  }
}

const initialState = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
}
