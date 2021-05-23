import React from 'react'

import './components.css'

export default function Dot({ children, className, ...props }) {
  let displayStyleClass = props.showNumber ? 'showNumber ' : ''
  let selectedStyle =
    props.current === props.index ? 'selected ' : 'not-selected '
  let cursorStyle = props.disabled ? 'disabled ' : 'not-disabled '

  return (
    <button
      style={{
        transform: `scale(${props.current === props.index ? 1.25 : 1})`,
      }}
      className={
        'Dot ' + cursorStyle + selectedStyle + displayStyleClass + className
      }
      {...props}
    >
      {children}
    </button>
  )
}
