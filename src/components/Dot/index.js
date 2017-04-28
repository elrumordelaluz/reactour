import styled from 'styled-components';

const Dot = styled.button`
  counter-increment: dot;
  width: 5px;
  height: 5px;
  border: 0;
  border-radius: 100%;
  padding: 0;
  display: block;
  margin: 2px;
  outline: 0;
  transition: opacity .3s, transform .3s;
  cursor: ${props => props.current === props.index ? 'default' : 'pointer'};
  opacity: ${props => props.current === props.index ? 1 : .5};
  transform: scale(${props => props.current === props.index ? 1.1 : 1});
  color: ${props => props.current === props.index ? 'var(--reactour-accent)' : 'currentColor'};
  background-color: currentColor;

  &:before {
    content: counter(dot);
    position: absolute;
    bottom: calc(100% + .25em);
    left: 50%;
    transform: translate(-50%, 1em);
    opacity: 0;
    transition: .3s;
  }

  &:hover {
    opacity: 1;
    transform: scale(1.1);

    &:before {
      opacity: .3;
      transform: translate(-50%, 0);
    }
  }
`

export default Dot;
