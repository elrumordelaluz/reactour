import React from 'react'
import SvgButton from './SvgButton'
import PropTypes from 'prop-types'

import './components.css'

function Arrow({ className, onClick, inverted, label, disabled }) {
  const [isHovered, setIsHovered] = React.useState(false)

  const toggleHover = () => {
    setIsHovered(isHovered => !isHovered)
  }

  const labelStyles = !label
    ? {
        width: '16px',
        height: '12px',
        flex: '0 0 16px',
      }
    : {}

  const hoverStyle = isHovered
    ? {
        color: disabled ? '#caccce' : '#000',
      }
    : {}

  return (
    <SvgButton
      style={{
        color: disabled ? '#caccce' : '#646464',
        marginLeft: inverted ? '24px' : 'auto',
        marginRight: inverted ? 'auto' : '24px',
        ...labelStyles,
        ...hoverStyle,
      }}
      className={className}
      onClick={onClick}
      data-tour-elem={`${inverted ? 'right' : 'left'}-arrow`}
      disabled={disabled}
      onMouseEnter={() => toggleHover()}
      onMouseLeave={() => toggleHover()}
    >
      {label ? (
        <span className="Arrow__label">{label}</span>
      ) : (
        <svg viewBox="0 0 18.4 14.4">
          <path
            d={
              inverted
                ? 'M17 7.2H1M10.8 1L17 7.2l-6.2 6.2'
                : 'M1.4 7.2h16M7.6 1L1.4 7.2l6.2 6.2'
            }
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
          />
        </svg>
      )}
    </SvgButton>
  )
}

Arrow.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  inverted: PropTypes.bool,
  label: PropTypes.node,
  disabled: PropTypes.bool,
}

export default Arrow
