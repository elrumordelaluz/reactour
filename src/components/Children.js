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
  z-index: 100000;
  top: 0;
`
export default StyledChildren
