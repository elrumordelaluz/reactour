import { Dispatch, MouseEventHandler, ReactElement } from 'react'
import { Position, PopoverStylesObj } from '@reactour/popover'
import { MaskStylesObj } from '@reactour/mask'
import { StylesObj } from './styles'

type SharedProps = {

  /**
   * Array of elements to highlight with special info and props.
   */
  steps: StepType[]

  /**
   * Prop to customize styles for the different parts of the Mask, Popover and Tour using a function that allows to extend the base styles an take advantage of some state props.
   */
  styles?: StylesObj & PopoverStylesObj & MaskStylesObj

  /**
   * Extra space to add between the Mask and the Popover and the highlighted element. A single number coordinates both spaces. Otherwise, passing an Object specifying the Component space.
   */
  padding?: Padding

  /**
   * Set a global position for the Popover in all steps, fixed in case of [number, number], calculated in case of position string
   */
  position?: Position

  /**
   * Disables the ability to click or interact in any way with the Highlighted element on every step.
   * This option could be overrided on specific steps using stepInteraction prop.
   */
  disableInteraction?: boolean

  /**
   * The Tour uses FocusScope in order to lock the focus iteration inside the Popover when Tour is active. This prop allows to disable this behaviour.
   */
  disableFocusLock?: boolean

  /**
   * Disable interactivity with Dot navigation inside Popover.
   */
  disableDotsNavigation?: boolean

  /**
   * Disable all keyboard navigation events when true, disable only selected keys when array.
   * default: false
   */
  disableKeyboardNavigation?: boolean | KeyboardParts[]

  /**
   * Class assigned to Popover.
   */
  className?: string

  /**
   * Class assigned to Mask.
   */
  maskClassName?: string

  /**
   * Class assigned to highlighted part of Mask. Useful when using disableInteraction.
   */
  highlightedMaskClassName?: string

  /**
   * Helper function to customize the Next button inside Popover, with useful parameters. It is possible to use the base Button and customize the props.
   */
  nextButton?: (props: BtnFnProps) => void

  /**
   * Helper function to customize the Prev button inside Popover, with useful parameters. It is possible to use the base Button and customize the props.
   */
  prevButton?: (props: BtnFnProps) => void

  /**
   * Action fired just after the Tour is open.
   */
  afterOpen?: (target: Element | null) => void

  /**
   * Action fired just before the Tour is closed.
   */
  beforeClose?: (target: Element | null) => void

  /**
   * Function that overrides the default close behavior of the Mask click handler. Comes with useful parameters to play with.
   */
  onClickMask?: (clickProps: ClickProps) => void

  /**
   * Click handler for highlighted area. Only works when disableInteraction is active. Useful in case is needed to avoid onClickMask when clicking the highlighted element.
   */
  onClickHighlighted?: MouseEventHandler<SVGRectElement>

  /**
   * Function to customize the content of the Badge using helper parameters like the current and total steps and if the Tour is transitioning between steps.
   */
  badgeContent?: (badgeProps: BadgeProps) => any

  /**
   * Show or hide the Navigation (Prev and Next buttons and Dots) inside Popover.
   */
  showNavigation?: boolean

  /**
   * Show or hide Prev and Next buttons inside Popover.
   */
  showPrevNextButtons?: boolean

  /**
   * Show or hide the Close button inside Popover.
   */
  showCloseButton?: boolean

  /**
   * Show or hide the Badge inside Popover.
   */
  showBadge?: boolean

  /**
   * Activate smooth scroll behavior when steps are outside viewport.
   * default: false
   */
  scrollSmooth?: boolean

  /**
   * Tolerance in pixels to add when calculating if the step element is outside viewport to scroll into view.
   */
  inViewThreshold?: number

  /**
   * Configure generic accessibility related attributes like aria-labelledby, aria-label for Close button and if show or hide Dot navigation in screen readers.
   */
  accessibilityOptions?: A11yOptions

  /**
   * Option to navigate and show Navigation in right-to-left mode
   */
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
  /**
   * Set the initial Open state
   */
  defaultOpen?: Boolean

  /**
   * Set the initial Step number when the tour starts
   */
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
