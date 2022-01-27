import Portal from './Portal'
import Observables from './Observables'
import { useRect, useElemRect, RectResult, getRect } from './useRect'
import { smoothScroll } from './smoothScroll'

export function safe(sum: number): number {
  return sum < 0 ? 0 : sum
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
  threshold = 0,
}: InViewArgs): boolean {
  const { w: windowWidth, h: windowHeight } = getWindow()
  return top < 0 && bottom - top > windowHeight
    ? true
    : top >= 0 + threshold &&
        left >= 0 + threshold &&
        bottom <= windowHeight - threshold &&
        right <= windowWidth - threshold
}

type InViewArgs = RectResult & {
  threshold?: number
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
