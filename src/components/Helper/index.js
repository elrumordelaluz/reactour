import styled from 'styled-components';

import isHoriz from 'utils/isHoriz';
import isOutsideX from 'utils/isOutsideX';
import isOutsideY from 'utils/isOutsideY';
import bestPositionOf from 'utils/bestPositionOf';

const Helper = styled.div`
  --reactour-accent: #007aff;
  position: fixed;
  background-color: #fff;
  transition: transform .3s;
  padding: .6em;
  box-shadow: 0 .5em 3em rgba(0,0,0,.3);
  top: 0;
  left: 0;
  color: inherit;
  z-index: 1000000;
  max-width: 300px;
  min-width: 150px;
  outline: 0;
  padding-right: 1.2em;

  &:after {
    content: '${props => props.current + 1}';
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
    display: ${props => props.showNumber ? 'block' : 'none'};
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
      return available[position] > (
        isHoriz(position)
        ? helperWidth + padding * 2
        : helperHeight + padding * 2
      )
    }

    const autoPosition = coords => {
      const positionsOrder = bestPositionOf(available)
      for( let j = 0; j < positionsOrder.length; j++ ) {
        if (couldPositionAt(positionsOrder[j])) {
          return coords[positionsOrder[j]]
        }
      }
      return coords.center
    }

    const pos = helperPosition => {
      const outsideY = (targetTop + helperHeight) > windowHeight
      const hX = isOutsideX(targetLeft + helperWidth, windowWidth)
        ? isOutsideX(targetRight + padding, windowWidth)
          ? targetRight - helperWidth
          : targetRight - helperWidth + padding
        : targetLeft - padding
      const hY = isOutsideY(targetTop + helperHeight, windowHeight)
        ? isOutsideY(targetBottom + padding, windowHeight)
          ? targetBottom - helperHeight
          : targetBottom - helperHeight + padding
        : targetTop - padding
      const coords = {
        top: [ hX, targetTop - helperHeight - padding * 2 ],
        right: [ targetRight + padding * 2, hY ],
        bottom: [ hX, targetBottom + padding * 2 ],
        left: [ targetLeft - helperWidth - padding * 2, hY ],
        center: [
          windowWidth / 2 - helperWidth / 2,
          windowHeight / 2 - helperHeight / 2,
        ]
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
export default Helper;
