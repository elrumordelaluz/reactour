import React from 'react'
import './components.css'

export default function Controls({ children, className, ...props }) {
  return (
    <div className={'Controls ' + className} {...props}>
      {children}
    </div>
  )
}
