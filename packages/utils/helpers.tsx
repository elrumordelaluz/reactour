import { InViewArgs, PositionsObjectType } from './types'

export function safe(sum: number): number {
  return sum < 0 ? 0 : sum
}

export function getInViewThreshold(threshold: InViewArgs['threshold']) {
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

export const isHoriz = (pos: string) => /(left|right)/.test(pos)
export const isOutsideX = (val: number, windowWidth: number): boolean => {
  return val > windowWidth
}
export const isOutsideY = (val: number, windowHeight: number): boolean => {
  return val > windowHeight
}

export function bestPositionOf(
  positions: PositionsObjectType,
  filters: string[] = []
): string[] {
  const compareFn = (a: string, b: string) =>
    filters.includes(a) ? 1 : filters.includes(b) ? -1 : 0
  return Object.keys(positions)
    .map((p) => {
      return {
        position: p,
        value: positions[p],
      }
    })
    .sort((a, b) => b.value - a.value)
    .sort((a, b) => compareFn(a.position, b.position))
    .filter((p) => p.value > 0)
    .map((p) => p.position)
}

const defaultPadding = 10

export function getPadding(
  padding: number | number[] = defaultPadding
): number[] {
  if (Array.isArray(padding)) {
    if (padding.length === 1) {
      return [padding[0], padding[0], padding[0], padding[0]]
    }
    if (padding.length === 2) {
      return [padding[1], padding[0], padding[1], padding[0]]
    }
    if (padding.length === 3) {
      return [padding[0], padding[1], padding[2], padding[1]]
    }
    if (padding.length > 3) {
      return [padding[0], padding[1], padding[2], padding[3]]
    }
    return [defaultPadding, defaultPadding]
  }
  return [padding, padding, padding, padding]
}
