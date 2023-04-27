import React, { MouseEventHandler } from 'react'
import { StylesObj, stylesMatcher } from './styles'
import { safe, getWindow, getPadding, RectResult } from '@reactour/utils'

const Mask: React.FC<MaskProps> = ({
  padding = 10,
  wrapperPadding = 0,
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
  const [pt, pr, pb, pl] = getPadding(padding)
  const [wpt, wpr, wpb, wpl] = getPadding(wrapperPadding)
  const { w, h } = getWindow()
  const width = safe(sizes?.width + pl + pr)
  const height = safe(sizes?.height + pt + pb)
  const top = safe(sizes?.top - pt - wpt)
  const left = safe(sizes?.left - pl - wpl)
  const windowWidth = w - wpl - wpr
  const windowHeight = h - wpt - wpb

  const maskAreaStyles = getStyles('maskArea', {
    x: left,
    y: top,
    width,
    height,
  })

  const highlightedAreaStyles = getStyles('highlightedArea', {
    x: left,
    y: top,
    width,
    height,
  })

  return (
    <div
      style={getStyles('maskWrapper', {})}
      onClick={onClick}
      className={className}
    >
      <svg
        width={windowWidth}
        height={windowHeight}
        xmlns="http://www.w3.org/2000/svg"
        style={getStyles('svgWrapper', {
          windowWidth,
          windowHeight,
          wpt,
          wpl,
        })}
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
              style={maskAreaStyles}
              // Needs for Safari, as we pass any value, css rx will apply.
              rx={maskAreaStyles.rx ? 1 : undefined}
            />
          </mask>
          <clipPath id={clipID}>
            <polygon
              points={`0 0, 0 ${windowHeight}, ${left} ${windowHeight}, ${left} ${top}, ${
                left + width
              } ${top}, ${left + width} ${top + height}, ${left} ${
                top + height
              }, ${left} ${windowHeight}, ${windowWidth} ${windowHeight}, ${windowWidth} 0`}
            />
          </clipPath>
        </defs>

        {/* The actual Mask */}
        <rect
          style={getStyles('maskRect', {
            windowWidth,
            windowHeight,
            maskID,
          })}
        />
        {/* The clickable area */}
        <rect
          style={getStyles('clickArea', {
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
          style={highlightedAreaStyles}
          className={highlightedAreaClassName}
          onClick={onClickHighlighted}
          rx={highlightedAreaStyles.rx ? 1 : undefined}
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
  padding?: number | number[]
  wrapperPadding?: number | number[]
  onClick?: MouseEventHandler<HTMLDivElement>
  onClickHighlighted?: MouseEventHandler<SVGRectElement>
  maskId?: string
  clipId?: string
}

export default Mask

function uniqueId(prefix: string) {
  return prefix + Math.random().toString(36).substring(2, 16)
}
