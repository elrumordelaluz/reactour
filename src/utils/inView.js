const inView = ({ top, right, bottom, left, w, h, threshold = 0 }) => {
  return top >= (0 + threshold)
    && left >= (0 + threshold)
    && bottom <= (h - threshold)
    && right <= (w - threshold)
}

export default inView;
