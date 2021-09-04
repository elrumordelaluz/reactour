import { useEffect, useCallback, useState } from 'react'

export function getRect<T extends Element>(
  element?: T | undefined | null
): RectResult {
  let rect: RectResult = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  }
  if (element) {
    const domRect: DOMRect = element.getBoundingClientRect()
    rect = {
      bottom: domRect.bottom,
      height: domRect.height,
      left: domRect.left,
      right: domRect.right,
      top: domRect.top,
      width: domRect.width,
    }
  }
  return rect
}

export function useRect<T extends Element>(
  ref: React.RefObject<T> | undefined,
  refresher?: any
): RectResult {
  const [dimensions, setdDimensions] = useState(initialState)
  const handleResize = useCallback(() => {
    if (!ref?.current) return
    setdDimensions(getRect(ref?.current))
  }, [ref?.current])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [ref?.current, refresher])

  return dimensions
}

export function useElemRect(
  elem: Element | undefined,
  refresher?: any
): RectResult {
  const [dimensions, setdDimensions] = useState(initialState)
  const handleResize = useCallback(() => {
    if (!elem) return
    setdDimensions(getRect(elem))
  }, [elem])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [elem, refresher])

  return dimensions
}

const initialState = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
}

export type RectResult = {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
}
