import pick from 'lodash.pick'

export const getNodeRect = node => {
  return pick(node.getBoundingClientRect(), [
    'top',
    'right',
    'bottom',
    'left',
    'width',
    'height',
  ])
}

export const inView = ({ top, right, bottom, left, w, h, threshold = 0 }) => {
  return (
    top >= 0 + threshold &&
    left >= 0 + threshold &&
    bottom <= h - threshold &&
    right <= w - threshold
  )
}

export const isBody = node =>
  node === document.querySelector('body') ||
  node === document.querySelector('html')
export const isHoriz = pos => /(left|right)/.test(pos)
export const isOutsideX = (val, windowWidth) => val > windowWidth
export const isOutsideY = (val, windowHeight) => val > windowHeight
export const safe = sum => (sum < 0 ? 0 : sum)

export const bestPositionOf = positions => {
  return Object.keys(positions)
    .map(p => ({
      position: p,
      value: positions[p],
    }))
    .sort((a, b) => b.value - a.value)
    .map(p => p.position)
}
