import pick from 'lodash.pick'

export const getNodeRect = node => {
  return pick(node.getBoundingClientRect(), [
    'top', 'right', 'bottom', 'left', 
    'width', 'height',
  ])
}

export const inView = ({ top, right, bottom, left, w, h }) => {
  return top >= 0 && left >= 0 && bottom <= h && right <= w
}

export const isBody = node => node === document.querySelector('body')
export const isHoriz = pos => /(left|right)/.test(pos)
export const isOutsideX = (val, windowWidth) => val > windowWidth
export const isOutsideY = (val, windowHeight) => val > windowHeight
export const safe = sum => sum < 0 ? 0 : sum

export const bestPositionOf = positions => {
  return Object.keys(positions)
    .map(p => ({ 
      position: p,
      value: positions[p],
    }))
    .sort((a,b) => b.value - a.value)
    .map(p => p.position)
}
