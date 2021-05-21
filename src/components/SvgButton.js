import React from 'react'
import PropTypes from 'prop-types'
export default function SvgButton({ children, disabled, ...props }) {
  console.log('props are', props)
  return (
    <button
      style={{
        display: 'block',
        padding: 0,
        border: 0,
        background: 'none',
        fontSize: 0,
        cursor: disabled ? 'not-allowed' : 'pointer',
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
}
