import styled from 'styled-components'
import * as hx from './helpers'

export const Helper = styled.div`
  --reactour-accent: #007aff;
  position: fixed;
  background-color: #fff;
  transition: transform .3s;
  padding: 24px 30px;
  box-shadow: 0 .5em 3em rgba(0,0,0,.3);
  top: 0;
  left: 0;
  color: inherit;
  z-index: 1000000;
  max-width: 331px;
  min-width: 150px;
  outline: 0;
  padding-right: 40px;
  
  &:after {
    content: "${props => props.current + 1}${props => props.showTotalSteps ? props => {return '/' + props.totalSteps} : null}";
    position: absolute;
    font-family: monospace;
    background-color: var(--reactour-accent);
    height: 1.875em;
    line-height: 2;
    padding-left: .8125em;
    padding-right: .8125em;
    font-size: 1em;
    border-radius: 1.625em;
    color: white;
    text-align: center;
    box-shadow: 0 .25em .5em rgba(0,0,0,.3);
    top: -.8125em;
    left: -.8125em;
    display: ${props => (props.showNumber ? 'block' : 'none')};
  }
  
  transform: ${props => {
    const {
      targetTop,
      targetRight,
      targetBottom,
      targetLeft,
      targetWidth,
      targetHeight,
      windowWidth,
      windowHeight,
      helperWidth,
      helperHeight,
      helperPosition,
      padding,
    } = props

    const available = {
      left: targetLeft,
      right: windowWidth - targetRight,
      top: targetTop,
      bottom: windowHeight - targetBottom,
    }

    const couldPositionAt = position => {
      return (
        available[position] >
        (hx.isHoriz(position)
          ? helperWidth + padding * 2
          : helperHeight + padding * 2)
      )
    }

    const autoPosition = coords => {
      const positionsOrder = hx.bestPositionOf(available)
      for (let j = 0; j < positionsOrder.length; j++) {
        if (couldPositionAt(positionsOrder[j])) {
          return coords[positionsOrder[j]]
        }
      }
      return coords.center
    }

    const pos = helperPosition => {
      const outsideY = targetTop + helperHeight > windowHeight
      const hX = hx.isOutsideX(targetLeft + helperWidth, windowWidth)
        ? hx.isOutsideX(targetRight + padding, windowWidth)
          ? targetRight - helperWidth
          : targetRight - helperWidth + padding
        : targetLeft - padding
      const hY = hx.isOutsideY(targetTop + helperHeight, windowHeight)
        ? hx.isOutsideY(targetBottom + padding, windowHeight)
          ? targetBottom - helperHeight
          : targetBottom - helperHeight + padding
        : targetTop - padding
      const coords = {
        top: [hX, targetTop - helperHeight - padding * 2],
        right: [targetRight + padding * 2, hY],
        bottom: [hX, targetBottom + padding * 2],
        left: [targetLeft - helperWidth - padding * 2, hY],
        center: [
          windowWidth / 2 - helperWidth / 2,
          windowHeight / 2 - helperHeight / 2,
        ],
      }
      if (couldPositionAt(helperPosition)) {
        return coords[helperPosition]
      }
      return autoPosition(coords)
    }

    const p = pos(helperPosition)

    return `translate(${p[0]}px, ${p[1]}px)`
  }}
`

export const Mask = styled.div`
  background-color: rgba(0,0,0,.7);
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  position: fixed;
  z-index: 99999;
`

export const TopMask = styled(Mask)`
  height: ${props => hx.safe(props.targetTop - props.padding)}px
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
export const HelperControls = styled.div`
  display: flex;
  margin-top: 24px;
  align-items: center;
`

export const Navigation = styled.nav`
  counter-reset: dot;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Dot = styled.button`
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
  cursor: ${props => (props.current === props.index ? 'default' : 'pointer')};
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

export const Button = styled.button`
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

export const CloseButton = styled.button`
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
