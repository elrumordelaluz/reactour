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
      maskPadding,
      helperPadding,
      stepPadding,
    } = props

    const maskPaddingTop = stepPadding ? stepPadding[0] : maskPadding
    const maskPaddingRight = stepPadding ? stepPadding[1] : maskPadding
    const maskPaddingBottom = stepPadding ? stepPadding[2] : maskPadding
    const maskPaddingLeft = stepPadding ? stepPadding[3] : maskPadding

    const available = {
      left: targetLeft - maskPaddingLeft,
      right: windowWidth - targetRight - maskPaddingRight,
      top: targetTop - maskPaddingTop,
      bottom: windowHeight - targetBottom - maskPaddingBottom,
    }

    const couldPositionAt = position => {
      return (
        available[position] >
        (hx.isHoriz(position)
          ? helperWidth + helperPadding
          : helperHeight + helperPadding)
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

      const hX = hx.isOutsideX(
        targetLeft - maskPaddingLeft + helperWidth,
        windowWidth
      )
        ? hx.isOutsideX(targetRight + maskPaddingRight, windowWidth)
          ? targetRight - helperWidth
          : targetRight + maskPaddingRight - helperWidth
        : targetLeft - maskPaddingLeft
      const x = hX > helperPadding ? hX : helperPadding

      const hY = hx.isOutsideY(targetTop + helperHeight, windowHeight)
        ? hx.isOutsideY(targetBottom + maskPaddingBottom, windowHeight)
          ? targetBottom - helperHeight
          : targetBottom + maskPaddingBottom - helperHeight
        : targetTop - maskPaddingTop
      const y = hY > helperPadding ? hY : helperPadding

      const coords = {
        top: [x, targetTop - maskPaddingTop - helperHeight - helperPadding],
        right: [targetRight + maskPaddingRight + helperPadding, y],
        bottom: [x, targetBottom + maskPaddingBottom + helperPadding],
        left: [targetLeft - maskPaddingLeft - helperWidth - helperPadding, y],
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
