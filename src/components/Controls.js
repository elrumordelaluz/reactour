import styled from 'styled-components'
const Controls = styled.div`
  display: flex;
  margin-top: 24px;
  align-items: center;
  justify-content: ${props => {
    if (props.alignNavbar === 'center' || !props.alignNavbar) {
      return 'center'
    }
    if (props.alignNavbar === 'right') {
      return 'flex-end'
    }
    if (props.alignNavbar === 'left') {
      return 'flex-start'
    }
  }};
`
export default Controls
