import React, { useState, useEffect, Suspense, lazy } from 'react'
import Tour, { Navigation, Dot, Controls, Arrow } from '../index'
import 'focus-outline-manager'
import { GlobalStyle } from './../style'
import Demo from './Demo'
import Text from './Text'
import Glitch from './Glitch'
import Tooltip from './Tooltip'
import { Link } from './Button'
import PropTypes from 'prop-types'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import './styles.css'

// const LazyTour = React.lazy(() =>
//   import(/* webpackChunkName: "reactour" */ '../index')
// )

function App() {
  const [isTourOpen, setOpen] = useState(false)
  const [isShowingMore, setShowingMore] = useState(false)
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
      <GlobalStyle />
      <Demo
        openTour={() => setOpen(true)}
        toggleShowMore={() => setShowingMore(!isShowingMore)}
        isShowingMore={isShowingMore}
      />
      <Suspense fallback={<React.Fragment />}>
        <Tour
          onAfterOpen={disableBody}
          onBeforeClose={enableBody}
          onRequestClose={() => setOpen(false)}
          steps={tourConfig}
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

const timeout = ms => new Promise(res => setTimeout(res, ms))

const tourConfig = [
  {
    selector: '[data-tut="reactour__iso"]',
    content:
      "Ok, let's start with the name of the Tour that is about to begin.",
    actionBefore: async () => {
      await timeout(5000)
      console.log('Hola!')
    },
  },
  {
    selector: '[data-tut="reactour__logo"]',
    content: 'And this is our cool bus...',
    position: [20, 20],
  },
  {
    selector: '[data-tut="reactour__copy"]',
    content: `Keep in mind that you could try and test everything during the Tour.
      For example, try selecting the highlighted text…`,
  },
  {
    selector: '[data-tut="reactour__style"]',
    content: function DemoHelperComponent() {
      return (
        <div>
          <Glitch data-glitch="Styled">Styled</Glitch>
          <Text color="#e5e5e5">
            The <Tooltip data-tooltip="this helper ⬇">tourist guide</Tooltip>{' '}
            could be dressed in any way, using custom components, styles and so
            on…
          </Text>
          <Text color="#373737" size=".7em" style={{ marginTop: '.7em' }}>
            <Link
              href="http://codepen.io/lbebber/full/ypgql/"
              color="dark"
              nospaces
            >
              Text effect
            </Link>{' '}
            by{' '}
            <Link href="https://twitter.com/lucasbebber" color="dark" nospaces>
              Lucas Bebber
            </Link>
          </Text>
        </div>
      )
    },
    style: {
      backgroundColor: 'black',
      color: 'white',
    },
  },
  {
    selector: '[data-tut="reactour__goTo"]',
    content: function DemoHelperComponent({ goTo }) {
      DemoHelperComponent.propTypes = {
        goTo: PropTypes.func.isRequired,
      }

      return (
        <div>
          If you wanna go anywhere, skipping places, it is absolutely possible.
          <br />
          &quot;Oh, I forgot something inside the bus&hellip;&quot;{' '}
          <button
            style={{
              border: '1px solid #f7f7f7',
              background: 'none',
              padding: '.3em .7em',
              fontSize: 'inherit',
              display: 'block',
              cursor: 'pointer',
              margin: '1em auto',
            }}
            onClick={() => goTo(1)}
          >
            Please go back to 🚌
          </button>
        </div>
      )
    },
  },
  {
    selector: '[data-tut="reactour__position"]',
    content: function DemoHelperComponent() {
      return (
        <Text>
          The <Tooltip data-tooltip="this helper ⬇">tourist guide</Tooltip>{' '}
          could be positioned where you want.
          <br />
          In this case will try to stay in the <strong>left side</strong> if
          there is available space, otherwise will{' '}
          <strong>auto position</strong>.
        </Text>
      )
    },
    position: 'left',
  },
  {
    selector: '[data-tut="reactour__scroll"]',
    content:
      'Probably you noted that the Tour scrolled directly to the desired place, and you could control the time also…',
  },
  {
    selector: '[data-tut="reactour__scroll--hidden"]',
    content: 'Also when places are pretty hidden…',
  },
  {
    selector: '[data-tut="reactour__action"]',
    content:
      'When arrived on each place you could fire an action, like… (look at the console)',
    action: () =>
      console.log(`
                  ------------🏠🏚---------
      🚌 Arrived to explore these beautiful buildings! 🚌
                  ------------🏠🏚---------
   🚧 This action could also fire a method in your Component 🚧
    `),
  },
  {
    selector: '[data-tut="reactour__state"]',
    content:
      'And the Tour could be observing changes to update the view, try clicking the button…',
    observe: '[data-tut="reactour__state--observe"]',
    action: node => node.focus(),
  },
]

export default App
