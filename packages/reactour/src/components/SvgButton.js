import styled from '../styled'

export default styled.button`
  display: block;
  padding: 0;
  border: 0;
  background: none;
  font-size: 0;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
`
