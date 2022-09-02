import React, { PropsWithChildren } from 'react'
import { StylesObj, stylesMatcher } from '../styles'

const Badge: React.FC<PropsWithChildren<BadgeProps>> = ({
  styles = {},
  children,
}) => {
  const getStyles = stylesMatcher(styles)
  return <span style={getStyles('badge', {})}>{children}</span>
}

export type BadgeProps = {
  styles?: StylesObj
}

export default Badge
