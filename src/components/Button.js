import styled from 'styled-components';

const Button = styled.button`
  border: 0;
  background: none;
  outline: 0;
  opacity: .5;
  transition: opacity .3s;
  color: inherit;

  &:disabled {
    text-decoration: line-through;
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  &:not(:disabled):hover {
    opacity: 1;
  }
`

export default Button;
