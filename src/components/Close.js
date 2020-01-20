import React from 'react'
import styled from 'styled-components'
import SvgButton from './SvgButton'
import PropTypes from 'prop-types'

function Close({ className, onClick, ariaLabel }) {
  return (
    <SvgButton className={className} onClick={onClick} aria-label={ariaLabel}>
      <svg viewBox="0 0 9.1 9.1" aria-hidden role="presentation">
        <path
          fill="currentColor"
          d="M5.9 4.5l2.8-2.8c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L4.5 3.1 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4l2.8 2.8L.3 7.4c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3L4.5 6l2.8 2.8c.3.2.5.3.8.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L5.9 4.5z"
        />
      </svg>
    </SvgButton>
  )
}

Close.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
}

const StyledClose = styled(Close)`
  position: absolute;
  top: 22px;
  right: 22px;
  width: 9px;
  height: 9px;
  color: #5e5e5e;
  &:hover {
    color: #000;
  }
`

export default StyledClose
