// https://stackoverflow.com/questions/46795955/how-to-know-scroll-to-element-is-done-in-javascript
export function smoothScroll(
  elem: Element | null,
  options: ScrollIntoViewOptions
) {
  return new Promise(resolve => {
    if (!(elem instanceof Element)) {
      throw new TypeError('Argument 1 must be an Element')
    }
    let same = 0
    let lastPos: undefined | null | number = null
    const scrollOptions = Object.assign({ behavior: 'smooth' }, options)

    elem.scrollIntoView(scrollOptions)
    requestAnimationFrame(check)

    function check() {
      const newPos = elem?.getBoundingClientRect().top
      if (newPos === lastPos) {
        if (same++ > 2) {
          return resolve(null)
        }
      } else {
        same = 0
        lastPos = newPos
      }
      requestAnimationFrame(check)
    }
  })
}
