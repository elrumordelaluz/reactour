import React from 'react'
import { useTour } from './Context'
import { TourProps } from '.'

export default function withTour<P>(WrappedComponent: React.ComponentType<P>) {
  const ComponentWithTour = (props: Exclude<P, keyof TourProps>) => {
    const tourProps = useTour()
    return <WrappedComponent {...props} {...tourProps} />
  }
  return ComponentWithTour
}
