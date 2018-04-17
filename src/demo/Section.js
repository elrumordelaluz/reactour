import styled from 'styled-components'

export default styled.section`
  min-height: 100vh;
  max-width: 1024px;
  margin: auto;
  padding: 1em;
  text-align: ${props =>
    props.center ? 'center' : props.align ? props.align : 'left'};
`
