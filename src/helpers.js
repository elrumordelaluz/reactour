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
