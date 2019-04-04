import styled from 'styled-components'
import { fontFamily, headingSizes, themeColors } from './settings'

const styles = `
    border: 0;
    border-radius: 4px;
    color: white;
    padding: .5em 1em;
    font-family: ${fontFamily};
    margin-left: .25em;
    margin-right: .25em;

    &:hover {
        opacity: .9;
    }
`
const Button = styled.button`
  ${styles};
`
const Link = styled.a`
  ${styles};
`

const StyledButton = styled(Button)`
  font-size: ${props => (props.h ? headingSizes[props.h - 1] : 'inherit')};
  background-color: ${props => themeColors[props.color] || themeColors.dark};
`

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: ${props => (props.h ? headingSizes[props.h - 1] : 'inherit')};
  background: ${props => (props.bg ? themeColors[props.bg] : 'none')};
  color: ${props =>
    props.bg
      ? 'white'
      : props.color
        ? themeColors[props.color]
        : themeColors.black};
  ${props =>
    props.nospaces &&
    `
    display: inline-block;
    padding: 0;
    margin: 0;
  `};
`

export { StyledButton as Button }
export { StyledLink as Link }
