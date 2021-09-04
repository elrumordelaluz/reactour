import React, { useLayoutEffect, useState, useRef, ReactChild } from 'react'
import { createPortal } from 'react-dom'

const Portal: React.FC<PortalProps> = ({
  children,
  type = 'reactour-portal',
}) => {
  let mountNode = useRef<HTMLDivElement | null>(null)
  let portalNode = useRef<Element | null>(null)
  let [, forceUpdate] = useState({})

  useLayoutEffect(() => {
    if (!mountNode.current) return

    const ownerDocument = mountNode.current!.ownerDocument
    portalNode.current = ownerDocument?.createElement(type)!
    ownerDocument!.body.appendChild(portalNode.current)
    forceUpdate({})

    return () => {
      if (portalNode.current && portalNode.current.ownerDocument) {
        portalNode.current.ownerDocument.body.removeChild(portalNode.current)
      }
    }
  }, [type])

  return portalNode.current ? (
    createPortal(children, portalNode.current)
  ) : (
    <span ref={mountNode} />
  )
}

export type PortalProps = {
  children?: ReactChild
  type?: string
}

export default Portal
