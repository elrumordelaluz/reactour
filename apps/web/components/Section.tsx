import styled from '@emotion/styled'

type SectionProps = {
  center?: boolean
  align?: string
}

export default styled.section<SectionProps>`
  min-height: 100vh;
  max-width: 1024px;
  margin: auto;
  padding: 1em;
  text-align: ${(props) =>
    props.center ? 'center' : props.align ? props.align : 'left'};
`
