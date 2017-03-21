import pick from 'lodash.pick'

export const getNodeRect = node => {
  return pick(node.getBoundingClientRect(), [
    'top', 'right', 'bottom', 'left', 
    'width', 'height',
  ])
}
