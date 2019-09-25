import styled from 'styled-components'

const Badge = styled.span`
  position: absolute;
  font-family: monospace;
  background: var(--reactour-accent);
  background: ${props => props.accentColor};
  height: 1.875em;
  line-height: 2;
  padding-left: 0.8125em;
  padding-right: 0.8125em;
  font-size: 1em;
  border-radius: 1.625em;
  color: white;
  text-align: center;
  box-shadow: 0 0.25em 0.5em rgba(0, 0, 0, 0.3);
  top: -0.8125em;
  left: -0.8125em;
`

export default Badge
