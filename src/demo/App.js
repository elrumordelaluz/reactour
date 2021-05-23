import React, { useState, useEffect, Suspense, lazy } from 'react'
import Tour, { Navigation, Dot, Controls, Arrow } from '../index'
import 'focus-outline-manager'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import './styles.css'

function App() {
  const [isTourOpen, setOpen] = useState(false)
  const [isShowingMore, setShowingMore] = useState(true)
  const [customComps, setCustomComps] = useState(false)

  useEffect(() => {
    function keyHandling(e) {
      if (e.keyCode === 75) {
        e.preventDefault()
        setOpen(true)
      }

      if (isTourOpen && e.keyCode === 13) {
        e.preventDefault()
        setCustomComps(!customComps)
      }
    }
    window.addEventListener('keyup', keyHandling)
    return () => window.removeEventListener('keyup', keyHandling)
  }, [isTourOpen, customComps])

  const disableBody = target => disableBodyScroll(target)
  const enableBody = target => enableBodyScroll(target)
  const accentColor = 'linear-gradient(to right, #1c8f9e, #5cb7b7)'
  return (
    <>
      <div>
        <h1 className="header">Hello World</h1>
        <p className="text">This is a paragraph text</p>
        <footer
          id="footer"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: 24,
            background: '#efefef',
          }}
        >
          This is a footer
        </footer>
      </div>
      <div>
        <button style={{}} onClick={() => setOpen(true)}>
          Try It
        </button>
      </div>
      <Suspense fallback={<React.Fragment />}>
        <Tour
          onAfterOpen={disableBody}
          onBeforeClose={enableBody}
          onRequestClose={() => setOpen(false)}
          steps={newTourConfig}
          isOpen={isTourOpen}
          maskClassName="mask"
          className="helper"
          rounded={5}
          accentColor={accentColor}
          CustomHelper={customComps ? MyCustomHelper : null}
        />
      </Suspense>
    </>
  )
}

function MyCustomHelper({ current, content, totalSteps, gotoStep, close }) {
  const accessories = [
    'Blank',
    'Kurt',
    'Prescription01',
    'Prescription02',
    'Round',
    'Sunglasses',
    'Wayfarers',
  ]
  return (
    <main className="CustomHelper__wrapper">
      <aside className="CustomHelper__sidebar">
        <span className="CustomHelper__sidebar_step">Step {current + 1}</span>
        <img
          className="CustomHelper__sidebar_img"
          src={`https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=${accessories[current]}&hairColor=Brown&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerSweater&eyeType=WinkWacky&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=Pale`}
        />
        <span className="CustomHelper__sidebar_step">Lorem Ipsum</span>
      </aside>
      <div className="CustomHelper__content">
        {content}
        <Controls
          data-tour-elem="controls"
          className="CustomHelper__controls"
          style={{ position: 'absolute' }}
        >
          <Arrow
            onClick={() => gotoStep(current - 1)}
            disabled={current === 0}
            className="CustomHelper__navArrow"
          />
          <Navigation data-tour-elem="navigation">
            {Array.from(Array(totalSteps).keys()).map((li, i) => (
              <Dot
                key={li}
                onClick={() => current !== i && gotoStep(i)}
                current={current}
                index={i}
                disabled={current === i}
                showNumber={true}
                data-tour-elem="dot"
              />
            ))}
          </Navigation>
          <Arrow
            onClick={() => gotoStep(current + 1)}
            disabled={current === totalSteps - 1}
            className="CustomHelper__navArrow"
            inverted
          />
        </Controls>
      </div>
    </main>
  )
}

const newTourConfig = [
  {
    selector: '.header',
    content: 'Ok, so it begins',
  },
  {
    selector: '.text',
    content: 'And another step now',
  },
  {
    selector: '#footer',
    content: 'Now we are at the footer',
  },
]

export default App
