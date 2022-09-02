import { useEffect, useRef, useState } from 'react'
import { inView, useRect, smoothScroll } from '@reactour/utils'

export default function Docs() {
  const [scrolled, setScrolled] = useState(false)
  const [isInView, setIsInView] = useState(false)
  // const paddingA = getPadding([10, 20])
  // const paddingB = getPadding(5)

  const ref = useRef<HTMLDivElement>(null)
  const rect = useRect(ref, scrolled)

  useEffect(() => {
    setIsInView(inView(rect))
  }, [rect])

  async function onClickScroll() {
    await smoothScroll(ref.current, {})
    setScrolled(true)
  }

  return (
    <div
      style={{
        borderWidth: 4,
        borderStyle: 'solid',
        borderColor: isInView ? 'green' : 'red',
      }}
    >
      <button onClick={onClickScroll}>scroll</button>
      <div
        ref={ref}
        style={{
          marginTop: 1000,
          width: 200,
          height: 200,
          backgroundColor: 'red',
        }}
      />
    </div>
  )
}
