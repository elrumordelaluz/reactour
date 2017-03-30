import React from 'react'
import styled from 'styled-components'
import { fontFamily, themeColors } from './settings'

export default styled.p`
  font-family: ${fontFamily};
  margin: 0;
  color: ${props => props.color ? themeColors[props.colo] : themeColors.black};
  line-height: 1.5;
  font-size: ${props => props.size ? props.size : 'inherit'};
`
