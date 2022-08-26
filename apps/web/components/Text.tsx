import styled from '@emotion/styled'
import { fontFamily, themeColors } from './settings'

type TextProps = {
  color?: string
  size?: string
}

export default styled.p<TextProps>`
  font-family: ${fontFamily};
  margin: 0;
  color: ${(props) => (props.color ? props.color : themeColors.black)};
  line-height: 1.5;
  font-size: ${(props) => (props.size ? props.size : 'inherit')};
`
