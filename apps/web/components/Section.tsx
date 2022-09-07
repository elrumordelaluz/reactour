import styled from '@emotion/styled'

type SectionProps = {
  center?: boolean
  classic?: boolean
  sticky?: boolean
  align?: string
}

export default styled.section<SectionProps>`
  min-height: ${(props) => (props.classic ? 'auto' : '100vh')};
  max-width: 1024px;
  margin: auto;
  padding: 1em;
  text-align: ${(props) =>
    props.center ? 'center' : props.align ? props.align : 'left'};
  ${(props) =>
    props.sticky
      ? `position: sticky; top: 0; backdrop-filter: saturate(180%) blur(20px); z-index: 100;`
      : ''}
`
