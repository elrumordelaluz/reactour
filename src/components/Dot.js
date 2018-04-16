import styled from 'styled-components'

const Dot = styled.button`
  counter-increment: dot;
  width: 8px;
  height: 8px;
  border: 1px solid;
  border-radius: 100%;
  padding: 0;
  display: block;
  margin: 4px;
  outline: 0;
  transition: opacity .3s, transform .3s;
  cursor: ${props => (props.current === props.index || props.disabled ? 'default' : 'pointer')};
  transform: scale(${props => (props.current === props.index ? 1.25 : 1)});
  color: ${props =>
    props.current === props.index ? 'var(--reactour-accent)' : '#caccce'};
  background-color: ${props =>
    props.current === props.index ? 'var(--reactour-accent)' : 'transparent'};

  &:before {
    content: counter(dot);
    position: absolute;
    bottom: calc(100% + .25em);
    left: 50%;
    opacity: 0;
    transform: translate(-50%, 1em);
    transition: .3s;
    display: ${props =>
      props.showNumber ? 'block' : 'none'};
  }

  &:hover {
    background-color: currentColor;

    &:before {
      opacity: .5;
      transform: translate(-50%, -2px);
    }
  }
`

export default Dot
