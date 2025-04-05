import {
  useMemo,
  useLayoutEffect,
  useEffect,
  forwardRef,
  isValidElement,
  cloneElement,
} from 'react'
import { findDOMNode, createPortal } from 'react-dom'

function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value)
  } else if (ref) {
    ref.current = value
  }
}

function useForkRef(refA, refB) {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null
    }
    return (refValue) => {
      setRef(refA, refValue)
      setRef(refB, refValue)
    }
  }, [refA, refB])
}

function getContainer(container) {
  container = typeof container === 'function' ? container() : container
  // #StrictMode ready
  return findDOMNode(container)
}

const useEnhancedEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Portals provide a first-class way to render children into a DOM node
 * that exists outside the DOM hierarchy of the parent component.
 */
const Portal = forwardRef(function Portal(props, ref) {
  const { children, container, disablePortal = false } = props
  const [mountNode, setMountNode] = useState(null)
  const handleRef = useForkRef(
    isValidElement(children) ? children.ref : null,
    ref
  )

  useEnhancedEffect(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body)
    }
  }, [container, disablePortal])

  useEnhancedEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(ref, mountNode)
      return () => {
        setRef(ref, null)
      }
    }

    return undefined
  }, [ref, mountNode, disablePortal])

  if (disablePortal) {
    if (isValidElement(children)) {
      return cloneElement(children, {
        ref: handleRef,
      })
    }
    return children
  }

  return mountNode ? createPortal(children, mountNode) : mountNode
})

export default Portal
