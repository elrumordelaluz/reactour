import React from 'react'
import PropTypes from 'prop-types'
export default function SvgButton({ children, disabled, style, ...props }) {
  return (
    <button
      style={{
        display: 'block',
        padding: 0,
        border: 0,
        background: 'none',
        fontSize: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  )
}

SvgButton.propTypes = {
  children: PropTypes.element.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  'aria-label': PropTypes.string,
}
