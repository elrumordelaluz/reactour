import pick from 'lodash.pick';

const getNodeRect = node => {
  return pick(node.getBoundingClientRect(), [
    'top', 'right', 'bottom', 'left',
    'width', 'height',
  ])
};

export default getNodeRect;
