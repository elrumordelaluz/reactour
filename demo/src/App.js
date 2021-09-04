import React, { useState } from 'react'
import { TourProvider } from '@reactour/tour'
import { ModalProvider } from 'modaaals'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Demo from './Demo'
import Text from './Text'
import Tooltip from './Tooltip'
import { Link } from './Button'

function App() {
  const [isShowingMore, setShowingMore] = useState(false)
  const disableBody = target => disableBodyScroll(target)
  const enableBody = target => enableBodyScroll(target)

  return (
    <>
      <TourProvider
        steps={tourConfig}
        afterOpen={disableBody}
        beforeClose={enableBody}
        styles={{
          badge: base => ({ ...base, background: '#ef5a3d' }),
          dot: (base, { current }) => ({
            ...base,
            background: current ? '#ef5a3d' : '#ccc',
          }),
          popover: base => ({
            ...base,
            background: '#dedede',
            borderRadius: 10,
          }),
        }}
        scrollSmooth
      >
        <ModalProvider
          modals={modals}
          styles={{
            contentInner: base => ({ ...base, margin: 50 }),
          }}
          className="modaaals-modal"
          skipMotion
        >
          <Demo
            toggleShowMore={() => setShowingMore(!isShowingMore)}
            isShowingMore={isShowingMore}
          />
        </ModalProvider>
      </TourProvider>
    </>
  )
}

const modals = {
  test: TestModal,
}

function TestModal() {
  return (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat
      quam eu mauris euismod imperdiet. Nullam elementum fermentum neque a
      placerat. Vivamus sed dui nisi. Phasellus vel dolor interdum, accumsan
      eros ut, rutrum dolor. Etiam in leo urna. Vestibulum maximus vitae urna at
      congue.
    </p>
  )
}

const tourConfig = [
  {
    selector: '[data-tut="reactour__iso"]',
    content:
      "Ok, let's start with the name of the Tour that is about to begin.",
  },
  {
    selector: '[data-tut="reactour__logo"]',
    content: 'And this is our cool bus...',
    position: [20, 20],
    roundedStep: true,
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
          {/* <Glitch data-glitch="Styled">Styled</Glitch> */}
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
    content: function DemoHelperComponent({ setCurrentStep }) {
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
            onClick={() => setCurrentStep(1)}
          >
            Please go back to{' '}
            <span role="img" aria-label="bus">
              🚌
            </span>
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

    highlightedSelectors: [
      '[data-tut="reactour__highlighted-absolute-child_2"]',
    ],
    mutationObservables: [
      '[data-tut="reactour__highlighted-absolute-child_2"]',
    ],

    action: node => node.focus(),
  },
  {
    selector: '[data-tut="reactour__highlighted"]',
    content:
      'Moreover you can highlight multiple elements and adjust highlighted region depending on DOM resizes and mutations. Try clicking the "?" tooltip and playing with tabs...',
    highlightedSelectors: ['[data-tut="reactour__highlighted-absolute-child"]'],
    mutationObservables: ['[data-tut="reactour__highlighted-absolute-child"]'],
    resizeObservables: ['[data-tut="reactour__highlighted-absolute-child"]'],
  },
  {
    selector: '[data-tour="open_modal"]',
    content:
      'Moreover you can highlight multiple elements and adjust highlighted region depending on DOM resizes and mutations. Try clicking the "?" tooltip and playing with tabs...',
    highlightedSelectors: ['.modaaals-modal'],
    mutationObservables: ['#portaaal'],
  },
]

export default App
