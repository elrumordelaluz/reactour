import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

function Children({ className, children }) {
  return <div className={'reactour__children ' + className}>{children}</div>
}

Children.propTypes = {
  children: PropTypes.node,
}
const StyledChildren = styled(Children)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100000;
`
export default StyledChildren
