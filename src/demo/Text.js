import styled from 'styled-components'
import { fontFamily, themeColors } from './settings'

export default styled.p`
  font-family: ${fontFamily};
  margin: 0;
  color: ${props =>
    props.color
      ? themeColors[props.color]
        ? themeColors[props.color]
        : props.color
      : themeColors.black};
  line-height: 1.5;
  font-size: ${props => (props.size ? props.size : 'inherit')};
`
