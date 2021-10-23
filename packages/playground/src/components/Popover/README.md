### Static Popover position

Show a Popover a certain position

```jsx
import { useState } from 'react'

const AppDemo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const sizes = {
    bottom: 0,
    left: 0,
  }

  return (
    <>
      <button onClick={() => setIsOpen(o => !o)}>
        {isOpen ? 'Hide' : 'Show'} Popover
      </button>
      {isOpen ? (
        <Popover sizes={sizes}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            volutpat quam eu mauris euismod imperdiet.
          </p>
          <button onClick={() => setIsOpen(false)}>Hide me</button>
        </Popover>
      ) : null}
    </>
  )
}

<AppDemo />
```

### Center postion Popover

Show a Popover at the center of the screen

```jsx
import { useState } from 'react'

const AppDemo = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(o => !o)}>
        {isOpen ? 'Hide' : 'Show'} Popover
      </button>
      {isOpen ? (
        <Popover position="center">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            volutpat quam eu mauris euismod imperdiet.
          </p>
          <button onClick={() => setIsOpen(false)}>Hide me</button>
        </Popover>
      ) : null}
    </>
  )
}

<AppDemo />
```

### Dynamic Popover position

Update the Popover position from cursor pointer

```jsx
import { useState, useEffect } from 'react'
import { getWindow } from '@reactour/utils'

const AppDemo = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { w: windowWidth, h: windowHeight } = getWindow()

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
    <>
      <button onClick={() => setIsOpen(o => !o)}>
        {isOpen ? 'Hide' : 'Show'} Popover
      </button>
      {isOpen ? (
        <Popover
          sizes={{
            top: y,
            bottom: y,
            left: x,
            right: x,
          }}
          position="right"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            volutpat quam eu mauris euismod imperdiet.
          </p>
        </Popover>
      ) : null}
  </>
  )
}

<AppDemo />
```

### Attaching to a DOM Element

Follow a specifix element from DOM and updates when resizing the window

```jsx
import { useState, useRef, useEffect } from 'react'
import { useRect } from '@reactour/utils'
import { motion } from 'framer-motion'

const AppDemo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [updater, setUpdater] = useState([])
  const ref = useRef(null)
  const sizes = useRect(ref, updater)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setUpdater([])
    })
    return () => {
      window.removeEventListener('scroll', () => {
        setUpdater([])
      })
    }
  }, [setUpdater])

  return (
    <>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. mauris ante. Fusce
        at ante nunc. Maecenas ut leo eu erat porta fermentum.
      </p>
      <motion.div
        ref={ref}
        drag
        onDrag={(event, info) => setUpdater([info.point.x, info.point.y])}
        style={{
          width: 230,
          heigth: 230,
          border: '2px solid #5ae',
          background: 'white',
          padding: 10,
          borderRadius: 10,
          textAlign: 'center',
          fontSize: '.7em',
        }}
      >
        Element followed by a Popover. Drag me!
        <hr style={{ border: 0, borderBottom: '1px solid rgba(0,0,0,.3)' }} />
        <button onClick={() => setIsOpen(o => !o)}>
          {isOpen ? 'Hide' : 'Show'} Popover
        </button>
      </motion.div>
      {isOpen ? (
        <Popover sizes={sizes} position="right">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            volutpat quam eu mauris euismod imperdiet.
          </p>
        </Popover>
      ) : null}
    </>
  )
}

<AppDemo />
```

### Multiple Popovers

Show more than one Popover

```jsx
import { useState, useRef, useEffect } from 'react'
import { useRect } from '@reactour/utils'
import { motion } from 'framer-motion'

const AppDemo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [updater, setUpdater] = useState([])
  const ref = useRef(null)
  const sizes = useRect(ref, updater)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setUpdater([])
    })
    return () => {
      window.removeEventListener('scroll', () => {
        setUpdater([])
      })
    }
  }, [setUpdater])

  return (
    <>
      <button onClick={() => setIsOpen(o => !o)} style={{ marginBottom: '1em' }}>
        {isOpen ? 'Hide' : 'Show'} Popovers
      </button>{' '}
      <br />
      <span ref={ref}>Lorem ipsum dolor sit amet.</span>
      {isOpen ? (
        <>
          <Popover sizes={sizes} position="top">
            Lorem
          </Popover>
          <Popover sizes={sizes} position="left">
            ipsum
          </Popover>
          <Popover sizes={sizes} position="bottom">
            dolor
          </Popover>
          <Popover sizes={sizes} position="right">
            <button onClick={() => setIsOpen(false)}>Hide Popovers</button>
          </Popover>
        </>
      ) : null}
    </>
  )
}

<AppDemo />
```

### Custom styles

In this example we are customizing dynamic styles to show a directional arrow in the Popover

```jsx
import { useState, useRef, useEffect } from 'react'
import { useRect } from '@reactour/utils'
import { motion } from 'framer-motion'

const AppDemo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [updater, setUpdater] = useState([])
  const ref = useRef(null)
  const sizes = useRect(ref, updater)

  const styles = {
    popover: (base, state) => {
      return {
        ...base,
        borderRadius: 10,
        ...doArrow(state.position, state.verticalAlign, state.horizontalAlign),
      }
    },
  }

  const opositeSide = {
    top: 'bottom',
    bottom: 'top',
    right: 'left',
    left: 'right',
  }

  function doArrow(position, verticalAlign, horizontalAlign) {
    if (!position || position === 'custom') {
      return {}
    }

    const width = 16
    const height = 12
    const color = 'white'
    const isVertical = position === 'top' || position === 'bottom'
    const spaceFromSide = 10
    const obj = {
      [isVertical ? 'borderLeft' : 'borderTop']: `${width /
        2}px solid transparent`, // CSS Triangle width
      [isVertical ? 'borderRight' : 'borderBottom']: `${width /
        2}px solid transparent`, // CSS Triangle width
      [`border${position[0].toUpperCase()}${position.substring(
        1
      )}`]: `${height}px solid ${color}`, // CSS Triangle height
      [isVertical ? opositeSide[horizontalAlign] : verticalAlign]:
        height + spaceFromSide, // space from side
      [opositeSide[position]]: -height + 2,
    }

    return {
      '&::after': {
        content: "''",
        width: 0,
        height: 0,
        position: 'absolute',
        ...obj,
      },
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setUpdater([])
    })
    return () => {
      window.removeEventListener('scroll', () => {
        setUpdater([])
      })
    }
  }, [setUpdater])

  return (
    <>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. mauris ante. Fusce
        at ante nunc. Maecenas ut leo eu erat porta fermentum.
      </p>
      <motion.div
        ref={ref}
        drag
        onDrag={(event, info) => setUpdater([info.point.x, info.point.y])}
        style={{
          width: 230,
          heigth: 230,
          border: '2px solid #5ae',
          background: 'white',
          padding: 10,
          borderRadius: 10,
          textAlign: 'center',
          fontSize: '.7em',
        }}
      >
        Element followed by a Popover. Drag me!
        <hr style={{ border: 0, borderBottom: '1px solid rgba(0,0,0,.3)' }} />
        <button onClick={() => setIsOpen(o => !o)}>
          {isOpen ? 'Hide' : 'Show'} Popover
        </button>
      </motion.div>
      {isOpen ? (
        <Popover sizes={sizes} styles={styles}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            volutpat quam eu mauris euismod imperdiet.
          </p>
        </Popover>
      ) : null}
    </>
  )
}

<AppDemo />
```

### Combined with Mask

Highlight an Element from DOM using Mask and attaching a Popover

```jsx
import { useState, useRef, useEffect } from 'react'
import { useRect } from '@reactour/utils'
import { Mask } from '@reactour/mask'
import { motion, AnimatePresence } from 'framer-motion'
import { useIntersectionObserver } from '../hooks'

const AppDemo = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [updater, setUpdater] = useState([])
  const ref = useRef(null)
  const sizes = useRect(ref, updater)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setUpdater([])
    })
    return () => {
      window.removeEventListener('scroll', () => {
        setUpdater([])
      })
    }
  }, [setUpdater])

  const wrapperRef = useRef(null)
  const entry = useIntersectionObserver(ref, {})
  const isVisible = entry && !!entry.isIntersecting

  return (
   <div ref={wrapperRef}>
    <button onClick={() => setIsOpen(o => !o)}>
      {isOpen ? 'Hide' : 'Show'} Popover
    </button>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat
      quam eu mauris euismod imperdiet. Nullam elementum fermentum neque a
      placerat. Vivamus sed dui nisi. Phasellus vel dolor interdum, accumsan eros
      ut, rutrum dolor. Etiam in leo urna. Vestibulum maximus vitae urna at
      congue. Vivamus lectus nisi, pellentesque at orci a, tempor lobortis orci.{' '}
      <span ref={ref} style={{ color: '#5ae' }}>
        Praesent non lorem erat.
      </span>{' '}
      Ut augue massa, aliquam in bibendum sed, euismod vitae magna. Nulla sit amet
      sodales augue. Curabitur in nulla in magna luctus porta et sit amet dolor.
      Pellentesque a magna enim. Pellentesque malesuada egestas urna, et pulvinar
      lorem viverra suscipit. Duis sit amet mauris ante. Fusce at ante nunc.
      Maecenas ut leo eu erat porta fermentum.
    </p>
    <AnimatePresence>
      {isOpen && isVisible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'relative', zIndex: 99999 }}
        >
          <Mask
            sizes={sizes}
            styles={{ maskWrapper: base => ({ ...base, zIndex: 99999 }) }}
            onClick={() => {
              setIsOpen(false)
            }}
          />
          <Popover sizes={sizes}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              volutpat quam eu mauris euismod imperdiet.
            </p>
          </Popover>
        </motion.div>
      ) : null}
    </AnimatePresence>
  </div>
  )
}

<AppDemo />
```
