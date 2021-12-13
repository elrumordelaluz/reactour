/** @jsx jsx */ import { jsx } from '@emotion/react'
import React, { useRef } from 'react'
import {
  useRect,
  isHoriz,
  bestPositionOf,
  isOutsideX,
  isOutsideY,
  PositionsObjectType,
  CoordsObjectType,
  CoordType,
  getWindow,
  getPadding,
  RectResult,
} from '@reactour/utils'

import { StylesObj, stylesMatcher } from './styles'

const Popover: React.FC<PopoverProps> = ({
  children,
  position: providedPosition = 'bottom',
  padding = 10,
  styles = {},
  sizes,
  refresher,
  ...props
}) => {
  const helperRef = useRef(null)
  const positionRef = useRef('')
  const verticalAlignRef = useRef('')
  const horizontalAlignRef = useRef('')
  const { w: windowWidth, h: windowHeight } = getWindow()
  const getStyles = stylesMatcher(styles)

  const { width: helperWidth, height: helperHeight } = useRect(
    helperRef,
    refresher
  )

  const targetLeft = sizes?.left
  const targetTop = sizes?.top
  const targetRight = sizes?.right
  const targetBottom = sizes?.bottom

  const position =
    providedPosition && typeof providedPosition === 'function'
      ? providedPosition({
          width: helperWidth,
          height: helperHeight,
          windowWidth,
          windowHeight,
          top: targetTop,
          left: targetLeft,
          right: targetRight,
          bottom: targetBottom,
        })
      : providedPosition

  const available: PositionsObjectType = {
    left: targetLeft,
    right: windowWidth - targetRight,
    top: targetTop,
    bottom: windowHeight - targetBottom,
  }

  const [px, py] = getPadding(padding)

  const couldPositionAt = (position: string) => {
    return (
      available[position] >
      (isHoriz(position) ? helperWidth + px * 2 : helperHeight + py * 2)
    )
  }

  const autoPosition = (coords: CoordsObjectType): CoordType => {
    const positionsOrder: string[] = bestPositionOf(available)
    for (let j = 0; j < positionsOrder.length; j++) {
      if (couldPositionAt(positionsOrder[j])) {
        positionRef.current = positionsOrder[j]
        return coords[positionsOrder[j]]
      }
    }
    positionRef.current = 'center'
    return coords.center
  }

  const pos = (helperPosition: Position) => {
    if (Array.isArray(helperPosition)) {
      const isOutX = isOutsideX(helperPosition[0], windowWidth)
      const isOutY = isOutsideY(helperPosition[1], windowHeight)

      // if (isOutX) warn('x', helperPosition[0])
      // if (isOutY) warn('y', helperPosition[1])
      positionRef.current = 'custom'
      return [
        isOutX ? windowWidth / 2 - helperWidth / 2 : helperPosition[0],
        isOutY ? windowHeight / 2 - helperHeight / 2 : helperPosition[1],
      ]
    }

    const hX = isOutsideX(targetLeft + helperWidth, windowWidth)
      ? targetRight - helperWidth + px
      : targetLeft - px
    const x = hX > px ? hX : px
    const hY = isOutsideY(targetTop + helperHeight, windowHeight)
      ? targetBottom - helperHeight + py
      : targetTop - py
    const y = hY > py ? hY : py

    if (isOutsideY(targetTop + helperHeight, windowHeight)) {
      verticalAlignRef.current = 'bottom'
    } else {
      verticalAlignRef.current = 'top'
    }
    if (isOutsideX(targetLeft + helperWidth, windowWidth)) {
      horizontalAlignRef.current = 'left'
    } else {
      horizontalAlignRef.current = 'right'
    }

    const coords = {
      top: [x, targetTop - helperHeight - py * 2],
      right: [targetRight + px * 2, y],
      bottom: [x, targetBottom + py * 2],
      left: [targetLeft - helperWidth - px * 2, y],
      center: [
        windowWidth / 2 - helperWidth / 2,
        windowHeight / 2 - helperHeight / 2,
      ],
    }
    if (helperPosition === 'center' || couldPositionAt(helperPosition)) {
      positionRef.current = helperPosition
      return coords[helperPosition]
    }
    return autoPosition(coords)
  }

  const p = pos(position)

  return (
    <div
      css={{
        ...getStyles('popover', {
          position: positionRef.current,
          verticalAlign: verticalAlignRef.current,
          horizontalAlign: horizontalAlignRef.current,
        }),
        transform: `translate(${Math.round(p[0])}px, ${Math.round(p[1])}px)`,
      }}
      ref={helperRef}
      {...props}
    >
      {children}
    </div>
  )
}

export default Popover

export type PopoverProps = {
  sizes: RectResult
  children?: React.ReactNode
  position?: PositionType
  padding?: number | [number, number]
  styles?: StylesObj
  className?: string
  refresher?: any
}

export type PositionType =
  | Position
  | ((postionsProps: PositionProps) => Position)

export type PositionProps = RectResult & {
  windowWidth: number
  windowHeight: number
}

export type Position =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'center'
  | [number, number]

// const warn = (axis: 'x' | 'y', num: number) => {
//   console.warn(`${axis}:${num} is outside window, falling back to center`)
// }
