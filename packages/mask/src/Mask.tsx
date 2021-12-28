/** @jsx jsx */
import { jsx } from '@emotion/react'
import React, { MouseEventHandler } from 'react'
import { StylesObj, stylesMatcher } from './styles'
import { safe, getWindow, getPadding, RectResult } from '@reactour/utils'

const Mask: React.FC<MaskProps> = ({
  padding = 10,
  onClick,
  onClickHighlighted,
  styles = {},
  sizes,
  className,
  highlightedAreaClassName,
  maskId,
  clipId,
}) => {
  const maskID = maskId || uniqueId('mask__')
  const clipID = clipId || uniqueId('clip__')
  const getStyles = stylesMatcher(styles)
  const [px, py] = getPadding(padding)
  const { w: windowWidth, h: windowHeight } = getWindow()
  const width = safe(sizes?.width + px * 2)
  const height = safe(sizes?.height + py * 2)
  const top = safe(sizes?.top - py)
  const left = safe(sizes?.left - px)

  return (
    <div
      css={getStyles('maskWrapper', {})}
      onClick={onClick}
      className={className}
    >
      <svg
        width={windowWidth}
        height={windowHeight}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id={maskID}>
            <rect
              x={0}
              y={0}
              width={windowWidth}
              height={windowHeight}
              fill="white"
            />
            <rect
              css={getStyles('maskArea', {
                x: left,
                y: top,
                width,
                height,
              })}
            />
          </mask>
          <clipPath id={clipID}>
            <polygon
              points={`0 0, 0 ${windowHeight}, ${left} ${windowHeight}, ${left} ${top}, ${left +
                width} ${top}, ${left + width} ${top + height}, ${left} ${top +
                height}, ${left} ${windowHeight}, ${windowWidth} ${windowHeight}, ${windowWidth} 0`}
            />
          </clipPath>
        </defs>

        {/* The actual Mask */}
        <rect
          css={getStyles('maskRect', {
            windowWidth,
            windowHeight,
            maskID,
          })}
        />
        {/* The clickable area */}
        <rect
          css={getStyles('clickArea', {
            windowWidth,
            windowHeight,
            top,
            left,
            width,
            height,
            clipID,
          })}
        />
        <rect
          css={getStyles('highlightedArea', {
            x: left,
            y: top,
            width,
            height,
          })}
          className={highlightedAreaClassName}
          onClick={onClickHighlighted}
        />
      </svg>
    </div>
  )
}

export type MaskProps = {
  children?: React.ReactNode
  sizes: RectResult
  styles?: StylesObj
  className?: string
  highlightedAreaClassName?: string
  padding?: number | [number, number]
  onClick?: MouseEventHandler<HTMLDivElement>
  onClickHighlighted?: MouseEventHandler<SVGRectElement>
  maskId?: string
  clipId?: string
}

export default Mask

function uniqueId(prefix: string) {
  return (
    prefix +
    Math.random()
      .toString(36)
      .substring(2, 16)
  )
}
