import styled from 'styled-components'

const Badge = styled.span`
  position: absolute;
  font-family: monospace;
  background-color: var(--reactour-accent);
  height: 1.875em;
  line-height: 2;
  padding-left: .8125em;
  padding-right: .8125em;
  font-size: 1em;
  border-radius: 1.625em;
  color: white;
  text-align: center;
  box-shadow: 0 .25em .5em rgba(0,0,0,.3);
  top: -.8125em;
  left: -.8125em;
`

export default Badge
