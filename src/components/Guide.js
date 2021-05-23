import React from 'react'
import * as hx from '../helpers'

import './components.css'

export default React.forwardRef(function Guide({ children, ...props }, ref) {
  const defaultStyles = props.defaultStyles ? 'default-styles ' : ''

  return (
    <div
      style={{
        '--reactour-accent': props.accentColor,
        transform: calcTransform(props),
        borderRadius: props.rounded,
      }}
      className={'Guide ' + defaultStyles}
      ref={ref}
    >
      {children}
    </div>
  )
})

function calcTransform(props) {
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
        console.warn(`${axis}:${num} is outside window, falling back to center`)
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
}
