import Tour from './Tour'
import TourContext, { TourProvider, useTour } from './Context'
import './styles.css'

export { default as withTour } from './withTour'
export default Tour
export { Tour, TourContext, TourProvider, useTour }
export type {
  StepType,
  Position,
  ProviderProps,
  TourProps,
  PopoverContentProps,
  KeyboardParts,
  StylesObj,
} from './types'
export { components } from './components'
