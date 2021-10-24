/** @jsx jsx */
import { jsx } from '@emotion/react'
import React, { MouseEventHandler } from 'react'
import { StylesObj, stylesMatcher } from './styles'
import { safe, getWindow, getPadding, RectResult } from '@reactour/utils'
const maskID = 'tour__mask'
const clipID = 'tour__clip'

const Mask: React.FC<MaskProps> = ({
  padding = 10,
  onClick,
  onClickHighlighted,
  styles = {},
  sizes,
  className,
  highlightedAreaClassName,
}) => {
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
            <rect x={0} y={0} width={windowWidth} height={top} />
            <rect x={0} y={top} width={left} height={height} />
            <rect
              x={left + width + px}
              y={top}
              width={safe(windowWidth - width - left)}
              height={height}
            />
            <rect
              x={0}
              y={top + height + py}
              width={windowWidth}
              height={safe(windowHeight - height - top)}
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

  /**
   * Object containing size and position informations of where to position the Mask.
   */
  sizes: RectResult

  /**
   * Prop to customize styles for the different parts of the Mask using a function that allows to extend the base styles an take advantage of some state props.
   */
  styles?: StylesObj

  /**
   * Class to apply to the Mask wrapper
   */
  className?: string

  /**
   * Class to apply to the Highlighted area rect
   */
  highlightedAreaClassName?: string

  /**
   * Extra space to add in Mask calculations. Useful when calculating space from Element bounding rect and want to add more space.
   * Single number sets sema space for x and y, otherwise, an Array sets [x, y].
   */
  padding?: number | [number, number]

  /**
   * Click handler for the Mask except the highlighted area.
   */
  onClick?: MouseEventHandler<HTMLDivElement>

  /**
   * Click handler for the Highlighted area.
   */
  onClickHighlighted?: MouseEventHandler<SVGRectElement>
}

export default Mask
