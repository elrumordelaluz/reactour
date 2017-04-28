import styled from 'styled-components';

const CloseButton = styled.button`
  position: absolute;
  border: 0;
  background: none;
  outline: 0;
  top: 2px;
  right: 2px;
  opacity: .5;
  cursor: pointer;
  transition: opacity .3s;
  &:hover {
    opacity: 1;
  }
`

export default CloseButton;
