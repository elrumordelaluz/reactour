import styled from 'styled-components'

const Dot = styled.button`
  counter-increment: dot;
  width: 8px;
  height: 8px;
  border: ${props =>
    props.current === props.index ? '0' : '1px solid #caccce'};

  border-radius: 100%;
  padding: 0;
  display: block;
  margin: 4px;
  transition: opacity 0.3s, transform 0.3s;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transform: scale(${props => (props.current === props.index ? 1.25 : 1)});

  color: ${props =>
    props.current === props.index ? 'var(--reactour-accent)' : '#caccce'};
  background: ${props =>
    props.current === props.index ? 'var(--reactour-accent)' : 'none'};

  color: ${props =>
    props.current === props.index ? props.accentColor : '#caccce'};
  background: ${props =>
    props.current === props.index ? props.accentColor : 'none'};

  &:before {
    content: counter(dot);
    position: absolute;
    bottom: calc(100% + 0.25em);
    left: 50%;
    opacity: 0;
    transform: translate(-50%, 1em);
    transition: 0.3s;
    display: ${props => (props.showNumber ? 'block' : 'none')};
  }

  &:hover {
    background-color: currentColor;

    &:before {
      opacity: 0.5;
      transform: translate(-50%, -2px);
    }
  }
`

export default Dot
