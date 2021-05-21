import React from 'react'

export default function Navigation({ children, ...props }) {
  return (
    <nav
      style={{
        counterReset: 'dot',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
      {...props}
    >
      {children}
    </nav>
  )
}
