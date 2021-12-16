/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'
import { StylesObj, stylesMatcher } from '../styles'

const Badge: React.FC<BadgeProps> = ({ styles = {}, children }) => {
  const getStyles = stylesMatcher(styles)
  return <span css={getStyles('badge', {})}>{children}</span>
}

export type BadgeProps = {
  styles?: StylesObj
}

export default Badge
