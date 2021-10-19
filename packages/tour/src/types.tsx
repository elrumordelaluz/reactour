import { Dispatch, MouseEventHandler, ReactElement } from 'react'
import { Position, PopoverStylesObj } from '@reactour/popover'
import { MaskStylesObj } from '@reactour/mask'
import { StylesObj } from './styles'

type SharedProps = {
  steps: StepType[]
  styles?: StylesObj & PopoverStylesObj & MaskStylesObj
  padding?: Padding
  position?: Position
  disableInteraction?: boolean
  disableFocusLock?: boolean
  disableDotsNavigation?: boolean
  disableKeyboardNavigation?: boolean | KeyboardParts[]
  className?: string
  maskClassName?: string
  highlightedMaskClassName?: string
  nextButton?: (props: BtnFnProps) => void
  prevButton?: (props: BtnFnProps) => void
  afterOpen?: (target: Element | null) => void
  beforeClose?: (target: Element | null) => void
  onClickMask?: (clickProps: ClickProps) => void
  onClickHighlighted?: MouseEventHandler<SVGRectElement>
  badgeContent?: (badgeProps: BadgeProps) => any
  showNavigation?: boolean
  showPrevNextButtons?: boolean
  showCloseButton?: boolean
  showBadge?: boolean
  scrollSmooth?: boolean
  inViewThreshold?: number
  accessibilityOptions?: A11yOptions
  rtl?: boolean
}

type A11yOptions = {
  ariaLabelledBy: string
  closeButtonAriaLabel: string
  showNavigationScreenReaders: boolean
}

type ComponentPadding = number | [number, number]
export type Padding =
  | number
  | { mask?: ComponentPadding; popover?: ComponentPadding }

export type KeyboardParts = 'esc' | 'left' | 'right'

type ClickProps = {
  setIsOpen: Dispatch<React.SetStateAction<Boolean>>
  setCurrentStep: Dispatch<React.SetStateAction<number>>
  currentStep: number
}

export type TourProps = SharedProps &
  ClickProps & {
    isOpen: Boolean
    setSteps: Dispatch<React.SetStateAction<StepType[]>>
    disabledActions: boolean
    setDisabledActions: Dispatch<React.SetStateAction<boolean>>
  }

type BadgeProps = {
  totalSteps: number
  currentStep: number
  transition: boolean
}

export type ProviderProps = SharedProps & {
  children: React.ReactNode
  defaultOpen?: Boolean
  startAt?: number
}

export type ContentProps = {
  setCurrentStep: Dispatch<React.SetStateAction<number>>
  transition: boolean
  currentStep: number
  setIsOpen: Dispatch<React.SetStateAction<Boolean>>
}

export type StepType = {
  selector: string
  content: ReactElement | string | ((props: ContentProps) => void)
  position?: Position
  highlightedSelectors?: string[]
  mutationObservables?: string[]
  resizeObservables?: string[]
  navDotAriaLabel?: string
  stepInteraction?: boolean
  action?: (elem: Element | null) => void
  disableActions?: boolean
  padding?: Padding
  bypassElem?: boolean
  styles?: StylesObj & PopoverStylesObj & MaskStylesObj
}

export type BtnFnProps = {
  Button: React.FC<NavButtonProps>
  setCurrentStep: Dispatch<React.SetStateAction<number>>
  stepsLength: number
  currentStep: number
  setIsOpen: Dispatch<React.SetStateAction<Boolean>>
}

export type NavButtonProps = {
  onClick?: () => void
  kind?: 'next' | 'prev'
  hideArrow?: boolean
}
export { Position }
