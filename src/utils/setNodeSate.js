import getNodeRect from 'utils/getNodeRect';

const setNodeState = (node, helper, position) => {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  const { width: helperWidth, height: helperHeight } = getNodeRect(helper)
  const attrs = node ? getNodeRect(node) : {
    top: h + 10,
    right: w/2 + 9,
    bottom: h/2 + 9,
    left: w/2 - helperWidth/2,
    width: 0, height: 0, w, h,
    helperPosition: 'center',
  }
  return function update(state) {
    return {
      w,
      h,
      helperWidth,
      helperHeight,
      helperPosition: position,
      ...attrs,
      inDOM: node ? true : false,
    }
  }
}

export default setNodeState;
