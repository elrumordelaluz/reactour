import React from 'react'
import styled from 'styled-components'
import * as hx from '../helpers'
import PropTypes from 'prop-types'

const SvgMaskWrapper = styled.div`
  opacity: ${props => !props.maskClassName && 0.7};
  color: ${props => !props.maskClassName && '#000'};
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  position: fixed;
  z-index: 99999;
  pointer-events: none;
`

export default function SvgMask({
  windowWidth,
  windowHeight,
  targetWidth,
  targetHeight,
  targetTop,
  targetLeft,
  padding,
  rounded,
  roundedStep,
  disableInteraction,
  disableInteractionClassName,
  className,
  onClick,
  highlightedBorder,
}) {
  const width = hx.safe(targetWidth + padding * 2)
  const height = hx.safe(targetHeight + padding * 2)
  const top = hx.safe(targetTop - padding)
  const left = hx.safe(targetLeft - padding)

  const roundedRadius = roundedStep ? Math.min(width / 2, height / 2) : rounded

  return (
    <SvgMaskWrapper onClick={onClick} maskClassName={className}>
      <svg
        width={windowWidth}
        height={windowHeight}
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <mask id="mask-main">
            <rect
              x={0}
              y={0}
              width={windowWidth}
              height={windowHeight}
              fill="white"
            />
            <rect x={left} y={top} width={width} height={height} fill="black" />
            {/* top left rounded corner */}
            <rect
              x={left - 1}
              y={top - 1}
              width={roundedRadius}
              height={roundedRadius}
              fill="white"
            />
            <circle
              cx={left + roundedRadius}
              cy={top + roundedRadius}
              r={roundedRadius}
              fill="black"
            />
            {/* top right rounded corner */}
            <rect
              x={left + width - roundedRadius + 1}
              y={top - 1}
              width={roundedRadius}
              height={roundedRadius}
              fill="white"
            />
            <circle
              cx={left + width - roundedRadius}
              cy={top + roundedRadius}
              r={roundedRadius}
              fill="black"
            />
            {/* bottom left rounded corner */}
            <rect
              x={left - 1}
              y={top + height - roundedRadius + 1}
              width={roundedRadius}
              height={roundedRadius}
              fill="white"
            />
            <circle
              cx={left + roundedRadius}
              cy={top + height - roundedRadius}
              r={roundedRadius}
              fill="black"
            />
            {/* bottom right rounded corner */}
            <rect
              x={left + width - roundedRadius + 1}
              y={top + height - roundedRadius + 1}
              width={roundedRadius}
              height={roundedRadius}
              fill="white"
            />
            <circle
              cx={left + width - roundedRadius}
              cy={top + height - roundedRadius}
              r={roundedRadius}
              fill="black "
            />
          </mask>
          <clipPath id="clip-path">
            {/* top */}
            <rect x={0} y={0} width={windowWidth} height={top} />
            {/* left */}
            <rect x={0} y={top} width={left} height={height} />
            {/* right */}
            <rect
              x={targetLeft + targetWidth + padding}
              y={top}
              width={hx.safe(windowWidth - targetWidth - left)}
              height={height}
            />
            {/* bottom */}
            <rect
              x={0}
              y={targetTop + targetHeight + padding}
              width={windowWidth}
              height={hx.safe(windowHeight - targetHeight - top)}
            />
          </clipPath>
        </defs>
        <rect
          x={0}
          y={0}
          width={windowWidth}
          height={windowHeight}
          fill="currentColor"
          mask="url(#mask-main)"
        />
        <rect
          x={0}
          y={0}
          width={windowWidth}
          height={windowHeight}
          fill="currentColor"
          clipPath="url(#clip-path)"
          pointerEvents="auto"
        />
        <rect
          x={left}
          y={top}
          width={width}
          height={height}
          pointerEvents="auto"
          fill="transparent"
          display={disableInteraction ? 'block' : 'none'}
          className={disableInteractionClassName}
        />
        {/* border */}
        {highlightedBorder && (
          <rect
            x={hx.safe(left + highlightedBorder.width / 2.0)}
            y={hx.safe(top + highlightedBorder.width / 2.0)}
            width={hx.safe(width - highlightedBorder.width)}
            height={hx.safe(height - highlightedBorder.width)}
            pointerEvents="auto"
            fill="none"
            strokeWidth={highlightedBorder.width}
            stroke={highlightedBorder.color}
            rx={roundedRadius - 2}
          />
        )}
      </svg>
    </SvgMaskWrapper>
  )
}

SvgMask.propTypes = {
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
  targetWidth: PropTypes.number.isRequired,
  targetHeight: PropTypes.number.isRequired,
  targetTop: PropTypes.number.isRequired,
  targetLeft: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
  rounded: PropTypes.number.isRequired,
  roundedStep: PropTypes.bool,
  disableInteraction: PropTypes.bool.isRequired,
  disableInteractionClassName: PropTypes.string.isRequired,
  highlightedBorder: PropTypes.shape({
    color: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  }),
}
