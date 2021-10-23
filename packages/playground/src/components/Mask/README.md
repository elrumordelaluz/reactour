### Static Mask

Open a Mask a certain position and with specific size

```jsx
import { useState } from 'react'

const AppDemo = () => {
  const [isOpen, setIsOpen] = useState(false)

  const sizes = {
    width: 100,
    height: 100,
    top: 100,
    left: 100,
  }

  return (
    <div>
      <button onClick={() => setIsOpen(o => !o)}>
        {isOpen ? 'Close' : 'Open'} Mask
      </button>
      {isOpen ? <Mask sizes={sizes} onClick={() => setIsOpen(false)} /> : null}
    </div>
  )
}

<AppDemo />
```

### Dynamic Mask

Update the Mask position from cursor pointer

```jsx
import { useState, useEffect } from 'react'

const AppDemo = () => {
  const [isOpen, setIsOpen] = useState(false)

  const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: null, y: null })

    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }

    useEffect(() => {
      window.addEventListener('mousemove', updateMousePosition)

      return () => window.removeEventListener('mousemove', updateMousePosition)
    }, [])

    return mousePosition
  }

  const { x, y } = useMousePosition()

  return (
    <div>
      <button onClick={() => setIsOpen(o => !o)}>
        {isOpen ? 'Close' : 'Open'} Mask
      </button>
      {isOpen ? (
        <Mask
          sizes={{
            width: Math.max(x * 0.5, 50),
            height: Math.max(y * 0.5, 50),
            top: y - 50,
            left: x - 50,
          }}
          onClick={() => setIsOpen(false)}
        />
      ) : null}
    </div>
  )
}

<AppDemo />
```

### Masking DOM Elements

Masks a specific element from DOM and updates when resizing the window

```jsx
import { useState, useRef, useEffect } from 'react'
import { useRect } from '@reactour/utils'
import { motion } from 'framer-motion'

const AppDemo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [elem, setElem] = useState('box')
  const refBox = useRef(null)
  const refParagraph = useRef(null)
  const [updater, setUpdater] = useState([])
  let r = elem === 'box' ? refBox : refParagraph
  const sizes = useRect(r, updater)

  useEffect(() => {
    window.addEventListener('scroll', () => setUpdater([]))
    return () => window.removeEventListener('scroll')
  }, [])

  return (
    <div>
      <button onClick={() => setIsOpen(o => !o)} style={{ marginBottom: '1em' }}>
        {isOpen ? 'Close' : 'Open'} Mask to Highlight{' '}
        {elem === 'box' ? 'Box' : 'Paragraph'}
      </button>{' '}
      <br />
      <button onClick={() => setElem(e => (e === 'box' ? 'p' : 'box'))}>
        Switch to Highlight {elem === 'box' ? 'Paragraph' : 'Box'}
      </button>
      <p ref={refParagraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. mauris ante. Fusce
        at ante nunc. Maecenas ut leo eu erat porta fermentum.
      </p>
      <motion.div
        ref={refBox}
        drag
        onDrag={(event, info) => setUpdater([info.point.x, info.point.y])}
        style={{
          width: 100,
          heigth: 100,
          backgroundColor: '#5ae',
          padding: 10,
          borderRadius: 10,
        }}
      >
        Element to be highlighted
      </motion.div>
      {isOpen ? <Mask sizes={sizes} onClick={() => setIsOpen(false)} /> : null}
    </div>
  )
}

<AppDemo />
```

### Custom styles

Try updating the color when open the Mask

```jsx
import { useState, useRef } from 'react'
import { useRect } from '@reactour/utils'

const AppDemo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [color, setColor] = useState('#1aafa1')
  const ref = useRef(null)
  const sizes = useRect(ref)

  return (
    <div>
      <button onClick={() => setIsOpen(o => !o)} ref={ref}>
        {isOpen ? 'Close' : 'Open'} Mask
      </button>
      {isOpen ? (
        <>
          <input
            type="color"
            value={color}
            onInput={e => {
              setColor(e.target.value)
            }}
            style={{
              position: 'fixed',
              bottom: '1em',
              left: '1em',
              zIndex: 1999999,
            }}
          />
          <Mask
            sizes={sizes}
            onClick={() => setIsOpen(false)}
            styles={{
              maskWrapper: base => ({ ...base, color, opacity: 0.99 }),
              maskArea: base => ({ ...base, rx: 10 }),
              clickArea: (
                base,
                { windowWidth, windowHeight, top, left, width, height }
              ) => ({
                ...base,
                width: 20,
                height: 20,
                x: left + width + 5,
                y: top - 27,
                fill: '#af2f60',
                clipPath:
                  'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)',
                cursor: 'pointer',
                '&:hover': {
                  fill: '#f60af2',
                },
              }),
              highlightedArea: (base, { x, y, width, height }) => ({
                ...base,
                display: 'block',
                stroke: '#af2f60',
                strokeWidth: 5,
                width: width + 20,
                height: height + 20,
                rx: 10,
                x: x - 10,
                y: y - 10,
                pointerEvents: 'none',
              }),
            }}
          />
      </>
    ) : null}
  </div>
  )
}

<AppDemo />
```

### Multiple Masks

Useful solution to use when blink dots needed in certain Elements of the viewport

```jsx
import { useState, useEffect, useCallback, useRef } from 'react'
import { getRect } from '@reactour/utils'
import { keyframes } from '@emotion/core'
import { useIntersectionObserver } from '../hooks'

const AppDemo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [sizesss, setSizes] = useState([])

  const handleResize = useCallback(() => {
    const steps = [
      { selector: '[data-item="1"]' },
      { selector: '[data-item="2"]' },
      { selector: '[data-item="3"]' },
    ]
    const selectors = steps.map(({ selector }) =>
      document.querySelector(selector)
    )
    setSizes(selectors.map(s => getRect(s)))
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize)
    return () => {
      window.removeEventListener('scroll', handleResize)
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  const styles = {
    maskWrapper: base => ({
      ...base,
      color: 'transparent',
    }),
    clickArea: base => ({
      ...base,
      display: 'none',
    }),
    highlightedArea: (base, { x, y }) => ({
      ...base,
      display: 'block',
      stroke: '#5ae',
      fill: 'rgb(85, 170, 238,.5);',
      cursor: 'pointer',
      // Dot with animation
      strokeWidth: 4,
      width: 15,
      height: 15,
      rx: 100,
      x: x + 10,
      y: y + 10,
      animationDuration: '3s',
      animationName: keyframesRotate,
      animationIterationCount: 'infinite',
      '&:hover': {
        strokeWidth: 20,
        stroke: '#ea5',
        fill: '#ea5',
      },
    }),
  }

  const keyframesRotate = keyframes`
    50% {
      stroke-width: 20px;
    }
  }`

  const ref = useRef(null)
  const entry = useIntersectionObserver(ref, {})
  const isVisible = entry && !!entry.isIntersecting

  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(o => !o)}>
        {isOpen ? 'Hide' : 'Show'} Dots
      </button>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat
        quam eu mauris euismod imperdiet. Nullam elementum fermentum neque a
        placerat. Vivamus sed dui nisi. Phasellus vel dolor interdum, accumsan eros
        ut, rutrum dolor. Etiam in leo urna. Vestibulum maximus vitae urna at
        congue. Vivamus lectus nisi, pellentesque at orci a, tempor lobortis orci.
        Praesent non lorem erat. Ut augue massa, aliquam in bibendum sed, euismod
        vitae magna. Nulla sit amet sodales augue. Curabitur in nulla in magna
        luctus porta et sit amet dolor. Pellentesque a magna enim. Pellentesque
        malesuada egestas urna, et pulvinar lorem viverra suscipit. Duis sit amet
        mauris ante. Fusce at ante nunc. Maecenas ut leo eu erat porta fermentum.
      </p>
      <button data-item="1" to="/">
        Hello World
      </button>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat
        quam eu mauris euismod imperdiet. Nullam elementum fermentum neque a
        placerat. <span data-item="2">Vivamus sed dui nisi.</span> Phasellus vel
        dolor interdum, accumsan eros ut, rutrum dolor. Etiam in leo urna.
        Vestibulum maximus vitae urna at congue. Vivamus lectus nisi, pellentesque
        at orci a, tempor lobortis orci. Praesent non lorem erat. Ut augue massa,
        aliquam in bibendum sed, euismod vitae magna. Nulla sit amet sodales augue.{' '}
        <span data-item="3">
          Curabitur in nulla in magna luctus porta et sit amet dolor.{' '}
        </span>
        Pellentesque a magna enim. Pellentesque malesuada egestas urna, et pulvinar lorem
        viverra suscipit. Duis sit amet mauris ante. Fusce at ante nunc. Maecenas ut
        leo eu erat porta fermentum.
      </p>
      {isOpen && isVisible
        ? sizesss.map((size, index) => {
            return (
              <Mask
                key={`${size.left}_${index}`}
                sizes={size}
                styles={styles}
                onClickHighlighted={() => alert(`Highlighted Item ${index + 1}`)}
              />
            )
          })
        : null}
  </div>
  )
}

<AppDemo />
```
