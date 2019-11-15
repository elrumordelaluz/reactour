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
      if (helperPosition === 'center' || couldPositionAt(helperPosition)) {
        return coords[helperPosition]
      }
      return autoPosition(coords)
    }

    const p = pos(helperPosition)

    return `translate(${Math.round(p[0])}px, ${Math.round(p[1])}px)`
  }};
`

export default Guide
