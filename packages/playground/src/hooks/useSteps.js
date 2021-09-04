import { useRef, createRef } from 'react'

export function useSteps(steps = []) {
  let refs = useRef([])
  if (refs.current.length === 0) {
    refs.current = Array(steps.length)
      .fill()
      .map(
        (_, i) =>
          refs.current[i] ||
          createRef(
            steps[i]?.selector
              ? document.querySelector(steps[i]?.selector)
              : null
          )
      )
  }

  return refs.current.map((ref, index) => ({
    selector: isObject(steps[index]) ? steps[index].selector || null : null,
    content: isObject(steps[index])
      ? steps[index].content || 'Empty Content'
      : steps[index],
    ...ref,
  }))
}

function isObject(value) {
  return typeof value === 'object' && value !== null
}
