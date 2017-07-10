import React from 'react'
import styled from 'styled-components'
import SvgButton from './SvgButton'

const Label = styled.span`
  font-size: 12px;
  line-height: 1;
`

const Arrow = ({ className, onClick, disabled, inverted, label }) =>
  <SvgButton className={className} onClick={onClick}>
    {label
      ? <Label>
          {label}
        </Label>
      : <svg viewBox="0 0 18.4 14.4">
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
        </svg>}
  </SvgButton>

const StyledArrow = styled(Arrow)`
  display: block;
  cursor: pointer;
  
  color: ${props => (props.disabled ? '#caccce' : '#646464')};
  
  ${props => (props.inverted ? 'margin-left: 24px;' : 'margin-right: 24px;')};
  ${props =>
    !props.label &&
    `
    width: 16px;
    height: 12px;
  `};
  
  &:hover {
    color: ${props => (props.disabled ? '#caccce' : '#000')};
  }
`

export default StyledArrow
