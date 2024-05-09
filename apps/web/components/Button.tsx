import styled from '@emotion/styled'

import { fontFamily, headingSizes, themeColors } from './settings'

type ButtonProps = {
  h?: string
  color?: 'dark' | 'light' | 'black' | 'white'
  bg?: 'dark' | 'light' | 'black'
  width?: string
  nospaces?: boolean
  onClick?: () => void
}

const styles = `
    border: 0;
    border-radius: 4px;
    color: white;
    padding: .5em 1em;
    font-family: ${fontFamily};
    margin-left: .25em;
    margin-right: .25em;
`
const Button = styled.button<ButtonProps>`
  ${styles};
`
const Link = styled.a<ButtonProps>`
  ${styles};
`

const StyledButton = styled(Button)`
  font-size: ${(props) =>
    props.h
      ? props.h
        ? headingSizes[Number(props.h) - 1]
        : 'inherit'
      : 'inherit'};
  background-color: ${(props) =>
    props.color ? themeColors[props.color] : themeColors.dark};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  outline: ${(props) => (props.disabled ? '2px solid black' : 1)};
`

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: ${(props) =>
    props.h ? headingSizes[Number(props.h) - 1] : 'inherit'};
  background: ${(props) => (props.bg ? themeColors[props.bg] : 'none')};
  color: ${(props) =>
    props.bg
      ? 'white'
      : props.color
        ? themeColors[props.color]
        : themeColors.black};
  ${(props) =>
    props.nospaces &&
    `
    display: inline-block;
    padding: 0;
    margin: 0;
  `};
`

export { StyledButton as Button }
export { StyledLink as Link }
