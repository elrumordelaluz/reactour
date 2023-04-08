import React, {
  ReactNode,
  Dispatch,
  ComponentType,
  PropsWithChildren,
} from 'react'
import { StylesObj, stylesMatcher } from '../styles'
import { StepType, BtnFnProps, NavButtonProps } from '../types'

const Navigation: React.FC<NavigationProps> = ({
  styles = {},
  steps,
  setCurrentStep,
  currentStep,
  setIsOpen,
  nextButton,
  prevButton,
  lastStepNextButton,
  disableDots,
  hideDots,
  hideButtons,
  disableAll,
  rtl,
  Arrow = DefaultArrow,
}) => {
  const stepsLength = steps.length
  const getStyles = stylesMatcher(styles)
  const isLastStep = currentStep === steps.length - 1

  const Button: React.FC<PropsWithChildren<NavButtonProps>> = ({
    onClick,
    kind = 'next',
    children,
    hideArrow,
  }) => {
    function clickHandler() {
      if (!disableAll) {
        if (onClick && typeof onClick === 'function') {
          onClick()
        } else {
          if (kind === 'next') {
            setCurrentStep(Math.min(currentStep + 1, stepsLength - 1))
          } else {
            setCurrentStep(Math.max(currentStep - 1, 0))
          }
        }
      }
    }

    return (
      <button
        style={getStyles('button', {
          kind,
          disabled: disableAll
            ? disableAll
            : kind === 'next'
            ? stepsLength - 1 === currentStep
            : currentStep === 0,
        })}
        onClick={clickHandler}
        aria-label={`Go to ${kind} step`}
      >
        {!hideArrow ? (
          <Arrow
            styles={styles}
            inverted={rtl ? kind === 'prev' : kind === 'next'}
            disabled={
              disableAll
                ? disableAll
                : kind === 'next'
                ? stepsLength - 1 === currentStep
                : currentStep === 0
            }
          />
        ) : null}
        {children}
      </button>
    )
  }

  return (
    <div style={getStyles('controls', {})} dir={rtl ? 'rtl' : 'ltr'}>
      {!hideButtons ? (
        prevButton && typeof prevButton === 'function' ? (
          prevButton({
            Button,
            setCurrentStep,
            currentStep,
            stepsLength,
            setIsOpen,
            steps,
          })
        ) : (
          <Button kind="prev" />
        )
      ) : null}
      {!hideDots ? (
        <div style={getStyles('navigation', {})}>
          {Array.from({ length: stepsLength }, (_, i) => i).map((index) => {
            return (
              <button
                style={getStyles('dot', {
                  current: index === currentStep,
                  disabled: disableDots || disableAll,
                })}
                onClick={() => {
                  if (!disableDots && !disableAll) setCurrentStep(index)
                }}
                key={`navigation_dot_${index}`}
                aria-label={
                  steps[index]?.navDotAriaLabel || `Go to step ${index + 1}`
                }
              />
            )
          })}
        </div>
      ) : null}
      {!hideButtons ? (
        isLastStep &&
        lastStepNextButton &&
        typeof lastStepNextButton === 'function' ? (
          lastStepNextButton({
            Button,
            setCurrentStep,
            currentStep,
            stepsLength,
            setIsOpen,
            steps,
          })
        ) : nextButton && typeof nextButton === 'function' ? (
          nextButton({
            Button,
            setCurrentStep,
            currentStep,
            stepsLength,
            setIsOpen,
            steps,
          })
        ) : (
          <Button />
        )
      ) : null}
    </div>
  )
}

type BaseProps = {
  styles?: StylesObj
}

export type NavigationProps = BaseProps & {
  setCurrentStep: Dispatch<React.SetStateAction<number>>
  steps: StepType[]
  currentStep: number
  disableDots?: boolean
  nextButton?: (props: BtnFnProps) => ReactNode | null
  prevButton?: (props: BtnFnProps) => ReactNode | null
  lastStepNextButton?: (props: BtnFnProps) => ReactNode | null
  setIsOpen: Dispatch<React.SetStateAction<Boolean>>
  hideButtons?: boolean
  hideDots?: boolean
  disableAll?: boolean
  rtl?: boolean
  Arrow?: ComponentType<ArrowProps>
}

export default Navigation

export type ArrowProps = BaseProps & {
  inverted?: Boolean
  disabled?: Boolean
}

export const DefaultArrow: React.FC<ArrowProps> = ({
  styles = {},
  inverted = false,
  disabled,
}) => {
  const getStyles = stylesMatcher(styles)
  return (
    <svg
      viewBox="0 0 18.4 14.4"
      style={getStyles('arrow', { inverted, disabled })}
    >
      <path
        d={
          inverted
            ? 'M17 7.2H1M10.8 1L17 7.2l-6.2 6.2'
            : 'M1.4 7.2h16M7.6 1L1.4 7.2l6.2 6.2'
        }
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeMiterlimit="10"
      />
    </svg>
  )
}
