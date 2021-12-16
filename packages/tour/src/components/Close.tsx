/** @jsx jsx */
import { jsx } from '@emotion/react'
import React from 'react'
import { StylesObj, stylesMatcher } from '../styles'

const Close: React.FC<CloseProps> = ({
  styles = {},
  onClick,
  disabled,
  ...props
}) => {
  const getStyles = stylesMatcher(styles)
  return (
    <button
      css={{ ...getStyles('button', {}), ...getStyles('close', { disabled }) }}
      onClick={onClick}
      {...props}
    >
      <svg viewBox="0 0 9.1 9.1" aria-hidden role="presentation">
        <path
          fill="currentColor"
          d="M5.9 4.5l2.8-2.8c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L4.5 3.1 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4l2.8 2.8L.3 7.4c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3L4.5 6l2.8 2.8c.3.2.5.3.8.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L5.9 4.5z"
        />
      </svg>
    </button>
  )
}

export type CloseProps = {
  styles?: StylesObj
  onClick?: () => void
  disabled?: boolean
}

export default Close
