import styled from 'styled-components'

export default styled.div`
  flex: 0 0 100%;
  padding: 1em;
  text-align: ${props =>
    props.center ? 'center' : props.align ? props.align : 'left'};
  @media (min-width: 40em) {
    flex: ${props => (props.width ? `0 0 ${props.width}` : 1)};
    width: ${props => (props.width ? props.width : '100%')};
  }
`
