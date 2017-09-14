import styled from 'styled-components'
import * as hx from '../helpers'

const Mask = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  position: fixed;
  z-index: 99999;
`

export const TopMask = styled(Mask)`
  height: ${props => hx.safe(props.targetTop - props.padding)}px;
`

export const RightMask = styled(Mask)`
  top: ${props => props.targetTop - props.padding}px;
  left: ${props => props.targetLeft + props.targetWidth + props.padding}px;
  width: ${props =>
    hx.safe(
      props.windowWidth - props.targetWidth - props.targetLeft - props.padding
    )}px;
  height: ${props => props.targetHeight + props.padding * 2}px;
`

export const BottomMask = styled(Mask)`
  top: ${props => props.targetHeight + props.targetTop + props.padding}px;
  height: ${props =>
    props.windowHeight +
    props.targetHeight -
    props.targetTop -
    props.padding}px;
`

export const LeftMask = styled(Mask)`
  top: ${props => props.targetTop - props.padding}px;
  width: ${props => hx.safe(props.targetLeft - props.padding)}px;
  height: ${props => props.targetHeight + props.padding * 2}px;
`
