import styled from 'styled-components'
import * as hx from '../helpers'

const Guide = styled.div`
  --reactour-accent: ${props => props.accentColor};
  ${props =>
    props.defaultStyles
      ? `
  max-width: 331px;
  min-width: 150px;
  padding-right: 40px;
  border-radius: ${props.rounded}px;
  background-color: #fff;
  padding: 24px 30px;
  box-shadow: 0 0.5em 3em rgba(0, 0, 0, 0.3);
  color: inherit;
  `
      : ''}
  position: fixed;
  transition: transform 0.3s;
  top: 0;
  left: 0;
  z-index: 1000000;

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
      showArrow,
      arrowSize = 25
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
          return showArrow ? [...coords[positionsOrder[j]], positionsOrder[j]] : coords[positionsOrder[j]]
        }
      }
      return coords.center
    }

    const pos = helperPosition => {
      if (Array.isArray(helperPosition)) {
        const isOutX = hx.isOutsideX(helperPosition[0], windowWidth)
        const isOutY = hx.isOutsideY(helperPosition[1], windowHeight)
        const warn = (axis, num) => {
          console.warn(
            `${axis}:${num} is outside window, falling back to center`
          )
        }
        if (isOutX) warn('x', helperPosition[0])
        if (isOutY) warn('y', helperPosition[1])
        return [
          isOutX ? windowWidth / 2 - helperWidth / 2 : helperPosition[0],
          isOutY ? windowHeight / 2 - helperHeight / 2 : helperPosition[1],
        ]
      }

      const hX = hx.isOutsideX(targetLeft + helperWidth, windowWidth)
        ? hx.isOutsideX(targetRight + padding, windowWidth)
          ? targetRight - helperWidth
          : targetRight - helperWidth + padding
        : targetLeft - padding
      const x = hX > padding ? hX : padding
      const hY = hx.isOutsideY(targetTop + helperHeight, windowHeight)
        ? hx.isOutsideY(targetBottom + padding, windowHeight)
          ? targetBottom - helperHeight
          : targetBottom - helperHeight + padding
        : targetTop - padding
      const y = hY > padding ? hY : padding
      const coords = {
        top: [x, targetTop - helperHeight - padding * 2],
        right: [targetRight + padding * 2, y],
        bottom: [x, targetBottom + padding * 2],
        left: [targetLeft - helperWidth - padding * 2, y],
        center: [
          windowWidth / 2 - helperWidth / 2,
          windowHeight / 2 - helperHeight / 2,
        ],
      }

      if (showArrow) {
        coords.top[1] -= arrowSize
        coords.right[0] += arrowSize
        coords.bottom[1] += arrowSize
        coords.left[0] -= arrowSize
      }
      
      if (helperPosition === 'center' || couldPositionAt(helperPosition)) {
        return coords[helperPosition]
      }
      return autoPosition(coords)
    }

    const arrow = position => {
      if (position.length !== 3) {
        return '';
      }

      const arrowPos = position[2]
      const offset = !hx.isHoriz(arrowPos) ?
        `left: ${(targetWidth + 2 * padding < helperWidth ? targetWidth + 2 * padding : helperWidth) / 2 - arrowSize
          + (position[0] + padding < targetLeft ? targetLeft - position[0] - padding : 0)}px`
        : `top: ${(targetHeight + 2 * padding < helperHeight ? targetHeight + 2 * padding : helperHeight) / 2 - arrowSize 
          + (position[1] + padding < targetTop ? targetTop - position[1] - padding : 0)}px`
      const arrowColor = props.style.backgroundColor || '#fff'
      return `
        &::before 
        {
          content: "";
          position: absolute;
          ${arrowPos}: ${(hx.isHoriz(arrowPos) ? helperWidth : helperHeight) - 1}px;
          ${offset};
          border-style: solid;
          border-width: ${arrowSize}px;
          border-color: ${arrowPos === 'top' ? arrowColor : 'transparent'}
            ${arrowPos === 'right' ? arrowColor : 'transparent'}
            ${arrowPos === 'bottom' ? arrowColor : 'transparent'}
            ${arrowPos === 'left' ? arrowColor : 'transparent'};
          display: block;
          width: 0;
        };
      `
    }

    const p = pos(helperPosition)

    return `translate(${p[0]}px, ${p[1]}px);
    ${showArrow && arrow(p)}`
  }}
`

export default Guide
