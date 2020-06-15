import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { themeColors } from './settings'

const Trigger = styled.a`
  cursor: pointer;
  margin-right: 5px;
  color: ${themeColors.light};
`

const Tabs = ({ children }) => {
  const [active, setActive] = useState(0)

  return (
    <>
      <div>
        {children.map((_, i) => {
          return (
            <Trigger key={i} onClick={() => setActive(i)}>
              tab{i}
            </Trigger>
          )
        })}
      </div>
      <div>
        {children.map((child, i) =>
          React.cloneElement(child, { key: i, active: i === active })
        )}
      </div>
    </>
  )
}

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
}

Tabs.Tab = ({ children, active }) => {
  return active ? children : null
}

Tabs.Tab.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
}

export default Tabs
