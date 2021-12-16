import { ComponentType } from 'react'
import Badge, { BadgeProps } from './Badge'
import Close, { CloseProps } from './Close'
import Content, { ContentProps } from './Content'
import Navigation, {
  NavigationProps,
  DefaultArrow as Arrow,
  ArrowProps,
} from './Navigation'

export interface PopoverComponents {
  Badge: ComponentType<BadgeProps>
  Close: ComponentType<CloseProps>
  Content: ComponentType<ContentProps>
  Navigation: ComponentType<NavigationProps>
  Arrow: ComponentType<ArrowProps>
}

export type PopoverComponentsType = Partial<PopoverComponents>

export const components = {
  Badge,
  Close,
  Content,
  Navigation,
  Arrow,
}

export type PopoverComponentGeneric = typeof components

export const defaultComponents = (
  comps: PopoverComponentsType
): PopoverComponentGeneric =>
  ({
    ...components,
    ...comps,
  } as PopoverComponentGeneric)
