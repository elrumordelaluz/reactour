import Portal from './Portal'
import Observables from './Observables'
import { useRect, useElemRect, RectResult, getRect } from './useRect'
import { smoothScroll } from './smoothScroll'

export function safe(sum: number): number {
  return sum < 0 ? 0 : sum
}

function getInViewThreshold(threshold: InViewArgs['threshold']) {
  if (typeof threshold === 'object' && threshold !== null) {
    return {
      thresholdX: threshold.x || 0,
      thresholdY: threshold.y || 0,
    }
  }
  return {
    thresholdX: threshold || 0,
    thresholdY: threshold || 0,
  }
}

export function getWindow(): { w: number; h: number } {
  const w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )
  const h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )
  return { w, h }
}

export function inView({
  top,
  right,
  bottom,
  left,
  threshold,
}: InViewArgs): boolean {
  const { w: windowWidth, h: windowHeight } = getWindow()
  const { thresholdX, thresholdY } = getInViewThreshold(threshold)

  return top < 0 && bottom - top > windowHeight
    ? true
    : top >= 0 + thresholdY &&
        left >= 0 + thresholdX &&
        bottom <= windowHeight - thresholdY &&
        right <= windowWidth - thresholdX
}

type InViewArgs = RectResult & {
  threshold?: { x?: number; y?: number } | number
}

export const isHoriz = (pos: string) => /(left|right)/.test(pos)
export const isOutsideX = (val: number, windowWidth: number): boolean => {
  return val > windowWidth
}
export const isOutsideY = (val: number, windowHeight: number): boolean => {
  return val > windowHeight
}

export function bestPositionOf(positions: PositionsObjectType): string[] {
  return Object.keys(positions)
    .map(p => {
      return {
        position: p,
        value: positions[p],
      }
    })
    .sort((a, b) => b.value - a.value)
    .map(p => p.position)
}

const defaultPadding = 10

export function getPadding(
  padding: number | [number, number] = defaultPadding
) {
  if (Array.isArray(padding)) {
    return padding[0]
      ? [padding[0], padding[1] ? padding[1] : padding[0]]
      : [defaultPadding, defaultPadding]
  }
  return [padding, padding]
}

export type PositionsType = 'left' | 'right' | 'top' | 'bottom'

export type PositionsObjectType = {
  [position: string]: number
}

export type CoordType = number[]

export type CoordsObjectType = {
  [position: string]: CoordType
}

export {
  Portal,
  Observables,
  useRect,
  useElemRect,
  RectResult,
  getRect,
  smoothScroll,
}
