import { useState, useRef, useEffect, useCallback } from 'react'
import { Mask } from '@reactour/mask'
import { useRect, getRect, useIntersectionObserver } from '@reactour/utils'
import { RectResult } from '@reactour/utils/dist/index'
import { motion } from 'framer-motion'
import { keyframes, CSSObject } from '@emotion/react'
import { useMousePosition } from '../hooks'

export default function Docs() {
  return (
    <div>
      <StaticMask />
      <hr />
      <MoreMasks />
      <hr />
      <DynamicMask />
      <hr />
      <MaskDOMElem />
      <hr />
      <CustomStyles />
      <hr />
      <MultipleMasks />
    </div>
  )
}

function StaticMask() {
  const [isOpen, setIsOpen] = useState(false)
  const sizes = {
    width: 100,
    height: 100,
    top: 100,
    left: 100,
    right: 0,
    bottom: 0,
    x: 0,
    y: 0,
  }
  return (
    <>
      <button onClick={() => setIsOpen((o) => !o)}>
        {isOpen ? 'Close' : 'Open'} Mask
      </button>
      {isOpen ? <Mask sizes={sizes} onClick={() => setIsOpen(false)} /> : null}
    </>
  )
}

function MoreMasks() {
  const [isOpen, setIsOpen] = useState(false)
  const sizes = {
    width: 100,
    height: 100,
    top: 100,
    left: 100,
    right: 0,
    bottom: 0,
    x: 100,
    y: 100,
  }
  const sizes2 = {
    width: 50,
    height: 50,
    top: 50,
    left: 50,
    right: 0,
    bottom: 0,
    x: 50,
    y: 50,
  }
  const sizes3 = {
    width: 250,
    height: 250,
    top: 250,
    left: 250,
    right: 0,
    bottom: 0,
    x: 250,
    y: 250,
  }
  return (
    <>
      <button onClick={() => setIsOpen((o) => !o)}>
        {isOpen ? 'Close' : 'Open'} Mask
      </button>
      {isOpen ? (
        <>
          <Mask sizes={sizes} onClick={() => setIsOpen(false)} />
          <Mask sizes={sizes2} onClick={() => setIsOpen(false)} />
          <Mask
            maskId="my-mask"
            clipId="my-clip"
            sizes={sizes3}
            onClick={() => setIsOpen(false)}
          />
        </>
      ) : null}
    </>
  )
}

function DynamicMask() {
  const [isOpen, setIsOpen] = useState(false)

  const { x, y } = useMousePosition()
  return (
    <>
      <button onClick={() => setIsOpen((o) => !o)}>
        {isOpen ? 'Close' : 'Open'} Mask
      </button>
      {isOpen ? (
        <Mask
          sizes={{
            width: Math.max(x * 0.5, 50),
            height: Math.max(y * 0.5, 50),
            top: y - 50,
            left: x - 50,
            right: 0,
            bottom: 0,
            x: x - 50,
            y: y - 50,
          }}
          onClick={() => setIsOpen(false)}
        />
      ) : null}
    </>
  )
}

function MaskDOMElem() {
  const [isOpen, setIsOpen] = useState(false)
  const [elem, setElem] = useState('box')
  const refBox = useRef(null)
  const refParagraph = useRef(null)
  const [updater, setUpdater] = useState<number[]>([])
  let r = elem === 'box' ? refBox : refParagraph
  const sizes = useRect(r, updater)

  useEffect(() => {
    const udt = () => setUpdater([])
    window.addEventListener('scroll', udt)
    return () => window.removeEventListener('scroll', udt)
  }, [])

  return (
    <>
      <button
        onClick={() => setIsOpen((o) => !o)}
        style={{ marginBottom: '1em' }}
      >
        {isOpen ? 'Close' : 'Open'} Mask to Highlight{' '}
        {elem === 'box' ? 'Box' : 'Paragraph'}
      </button>{' '}
      <br />
      <button onClick={() => setElem((e) => (e === 'box' ? 'p' : 'box'))}>
        Switch to Highlight {elem === 'box' ? 'Paragraph' : 'Box'}
      </button>
      <p ref={refParagraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. mauris ante.
        Fusce at ante nunc. Maecenas ut leo eu erat porta fermentum.
      </p>
      <motion.div
        ref={refBox}
        drag
        onDragEnd={(event, info) => setUpdater([info.point.x, info.point.y])}
        style={{
          width: 100,
          height: 100,
          backgroundColor: '#5ae',
          padding: 10,
          borderRadius: 10,
        }}
      >
        Element to be highlighted
      </motion.div>
      {isOpen ? (
        <Mask
          sizes={sizes}
          wrapperPadding={20}
          onClick={() => setIsOpen(false)}
        />
      ) : null}
    </>
  )
}

function CustomStyles() {
  const [isOpen, setIsOpen] = useState(false)
  const [color, setColor] = useState('#1aafa1')
  const ref = useRef(null)
  const sizes = useRect(ref)

  return (
    <>
      <button onClick={() => setIsOpen((o) => !o)} ref={ref}>
        {isOpen ? 'Close' : 'Open'} Mask
      </button>
      {isOpen ? (
        <>
          <input
            type="color"
            value={color}
            onInput={(e: any) => {
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
              maskWrapper: (base) => ({ ...base, color, opacity: 0.99 }),
              maskArea: (base) => ({ ...base, rx: 10 }),
              // @ts-ignore
              clickArea: (base, { top, left, width }) => {
                console.log({ top, left, width })
                return {
                  ...base,
                  width: 20,
                  height: 20,
                  x: left + width + 5,
                  y: top - 27,
                  fill: '#af2f60',
                  clipPath:
                    'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)',
                  cursor: 'pointer',
                  // '&:hover': {
                  //   fill: '#f60af2',
                  // },
                }
              },
              // @ts-ignore
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
    </>
  )
}

const multipleDemoStyles = {
  maskWrapper: (base: CSSObject) => ({
    ...base,
    color: 'transparent',
  }),
  clickArea: (base: CSSObject) => ({
    ...base,
    display: 'none',
  }),
  highlightedArea: (base: CSSObject, props: any) => ({
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
    x: props.x + 10,
    y: props.y + 10,
    // animationDuration: '3s',
    // animationName: keyframesRotate,
    // animationIterationCount: 'infinite',
    // '&:hover': {
    //   strokeWidth: 20,
    //   stroke: '#ea5',
    //   fill: '#ea5',
    // },
  }),
}

const keyframesRotate = keyframes`
  50% {
    stroke-width: 20px;
  }
}`

function MultipleMasks() {
  const [isOpen, setIsOpen] = useState(false)
  const [sizesss, setSizes] = useState<RectResult[]>([])

  const handleResize = useCallback(() => {
    const steps = [
      { selector: '[data-item="1"]' },
      { selector: '[data-item="2"]' },
      { selector: '[data-item="3"]' },
    ]
    const selectors = steps.map(({ selector }) =>
      document.querySelector(selector)
    )
    setSizes(selectors.map((s) => getRect(s)))
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

  const ref = useRef(null)
  const entry = useIntersectionObserver(ref, {})
  const isVisible = entry && !!entry.isIntersecting
  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen((o) => !o)}>
        {isOpen ? 'Hide' : 'Show'} Dots
      </button>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        volutpat quam eu mauris euismod imperdiet. Nullam elementum fermentum
        neque a placerat. Vivamus sed dui nisi. Phasellus vel dolor interdum,
        accumsan eros ut, rutrum dolor. Etiam in leo urna. Vestibulum maximus
        vitae urna at congue. Vivamus lectus nisi, pellentesque at orci a,
        tempor lobortis orci. Praesent non lorem erat. Ut augue massa, aliquam
        in bibendum sed, euismod vitae magna. Nulla sit amet sodales augue.
        Curabitur in nulla in magna luctus porta et sit amet dolor. Pellentesque
        a magna enim. Pellentesque malesuada egestas urna, et pulvinar lorem
        viverra suscipit. Duis sit amet mauris ante. Fusce at ante nunc.
        Maecenas ut leo eu erat porta fermentum.
      </p>
      <button data-item="1">Hello World</button>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        volutpat quam eu mauris euismod imperdiet. Nullam elementum fermentum
        neque a placerat. <span data-item="2">Vivamus sed dui nisi.</span>{' '}
        Phasellus vel dolor interdum, accumsan eros ut, rutrum dolor. Etiam in
        leo urna. Vestibulum maximus vitae urna at congue. Vivamus lectus nisi,
        pellentesque at orci a, tempor lobortis orci. Praesent non lorem erat.
        Ut augue massa, aliquam in bibendum sed, euismod vitae magna. Nulla sit
        amet sodales augue.{' '}
        <span data-item="3">
          Curabitur in nulla in magna luctus porta et sit amet dolor.{' '}
        </span>
        Pellentesque a magna enim. Pellentesque malesuada egestas urna, et
        pulvinar lorem viverra suscipit. Duis sit amet mauris ante. Fusce at
        ante nunc. Maecenas ut leo eu erat porta fermentum.
      </p>
      {isOpen && isVisible
        ? sizesss.map((size, index) => {
            return (
              <Mask
                key={`${size.left}_${index}`}
                sizes={size}
                // @ts-ignore
                styles={multipleDemoStyles}
                onClickHighlighted={() =>
                  alert(`Highlighted Item ${index + 1}`)
                }
              />
            )
          })
        : null}
    </div>
  )
}
