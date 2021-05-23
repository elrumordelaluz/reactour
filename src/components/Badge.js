import React from 'react'
import PropTypes from 'prop-types'
import './components.css'
export default function Badge({ children, className, accentColor, ...props }) {
  return (
    <span
      className={'Badge ' + className}
      style={{
        background: accentColor,
      }}
      {...props}
    >
      {children}
    </span>
  )
}

Badge.propTypes = {
  children: PropTypes.any.isRequired,
  accentColor: PropTypes.string,
  className: PropTypes.string,
}
