import { useState, useEffect, Component } from 'react'
import {
  Text,
  Container,
  Checkbox,
  Button,
  Progress,
  Spacer,
} from '@nextui-org/react'
import Placeholder, { PlaceholderGrid } from '../components/Placeholder'
import Paragraphs from '../components/Paragraphs'
import Demo from '../components/Demo'
import {
  useTour,
  KeyboardParts,
  PopoverContentProps,
  withTour,
} from '@reactour/tour'
// import { useIntersectionObserver } from '@reactour/utils'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { ModalProvider, useModaaals } from 'modaaals'
import { keyframes } from '@emotion/react'

function RoutesDemo() {}

const radius = 10
const keyframesRotate = keyframes`
  50% {
    transform: translateY(-5px  );
  }
}`

export default function Docs() {
  return (
    <Container justify="center">
      <Text
        h1
        size={60}
        css={{ textGradient: '45deg, $blue500 -20%, $pink500 50%' }}
        weight="bold"
      >
        Tour
      </Text>
      <Text>Here are the examples for the Tour package</Text>
      <Spacer y={3} />

      <Demo title="Basic example" demoId="basic" providerProps={{}}>
        <Paragraphs demoId="basic" />
      </Demo>

      <Demo
        title="Mask click"
        demoId="mask-click"
        providerProps={{
          onClickMask: ({ setCurrentStep, currentStep, steps, setIsOpen }) => {
            if (steps) {
              if (currentStep === steps.length - 1) {
                setIsOpen(false)
              }
              setCurrentStep(s => (s === steps.length - 1 ? 0 : s + 1))
            }
          },
        }}
        code={`<TourProvider 
  onClickMask={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
    if (currentStep === steps.length - 1) {
      setIsOpen(false)  
    }
    setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1))
  }}
/>`}
      >
        <Placeholder demoId="mask-click" length={3} />
      </Demo>

      <Demo
        title="Close click"
        demoId="close-click"
        providerProps={{
          onClickClose: ({ setCurrentStep, currentStep, steps, setIsOpen }) => {
            if (steps) {
              if (currentStep === steps.length - 1) {
                setIsOpen(false)
              }
              setCurrentStep(s => (s === steps.length - 1 ? 0 : s + 1))
            }
          },
        }}
        code={`<TourProvider 
  onClickClose={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
    if (currentStep === steps.length - 1) {
      setIsOpen(false)  
    }
    setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1))
  }}
/>`}
      >
        <Placeholder demoId="close-click" length={3} />
      </Demo>

      <DisableKeyboardDemo />

      <Demo
        title="Scroll smooth"
        demoId="scroll-smooth"
        length={5}
        providerProps={{
          scrollSmooth: true,
        }}
        code={`<TourProvider scrollSmooth />`}
      >
        <Placeholder
          demoId="scroll-smooth"
          length={5}
          direction="column"
          gap={12}
        />
      </Demo>

      <Demo
        title="Padding"
        demoId="padding"
        providerProps={{
          padding: { mask: 14, popover: [5, 10], wrapper: 20 },
        }}
        code={`<TourProvider padding={{ mask: 14, popover: [5, 10], wrapper: 20 }} />`}
      >
        <Placeholder demoId="padding" length={3} />
      </Demo>

      <PrevNextDemo />

      <Demo
        title="RTL"
        demoId="rtl"
        providerProps={{
          rtl: true,
        }}
      >
        <Placeholder demoId="rtl" length={3} />
      </Demo>
      <Demo
        title="Custom styles"
        demoId="custom-styles"
        providerProps={{
          styles: {
            popover: base => ({
              ...base,
              '--reactour-accent': '#ef5a3d',
              borderRadius: radius,
            }),
            maskArea: base => ({ ...base, rx: radius }),
            maskWrapper: base => ({ ...base, color: '#ef5a3d' }),
            badge: base => ({ ...base, left: 'auto', right: '-0.8125em' }),
            controls: base => ({ ...base, marginTop: 100 }),
            close: base => ({ ...base, right: 'auto', left: 8, top: 8 }),
            dot: base => ({
              ...base,
              animationDuration: '1s',
              animationName: keyframesRotate,
              animationIterationCount: 'infinite',
              '&:nth-of-type(1)': {
                animationDelay: '.3s',
              },
              '&:nth-of-type(2)': {
                animationDelay: '.6s',
              },
            }),
          },
        }}
      >
        <Placeholder demoId="custom-styles" length={3} />
      </Demo>
      <DisableScrollDemo />
      <Demo
        title="Custom Badge"
        demoId="custom-badge"
        providerProps={{
          badgeContent: ({ totalSteps, currentStep }) =>
            `${currentStep + 1}/${totalSteps}`,
        }}
      >
        <Placeholder demoId="custom-badge" length={3} />
      </Demo>
      <Demo
        title="Disable dots navigation"
        demoId="disable-dots-nav"
        providerProps={{
          disableDotsNavigation: true,
        }}
      >
        <Placeholder demoId="disable-dots-nav" length={3} />
      </Demo>
      <Demo
        title="Disable interaction"
        demoId="disable-interaction"
        providerProps={{
          onClickHighlighted: e => {
            e.stopPropagation()
            console.log('No interaction')
          },
          disableInteraction: true,
        }}
      >
        <Placeholder demoId="disable-interaction" length={3} />
      </Demo>
      <ToggleNavPartsDemo />
      <Demo
        title="Starts at specific step"
        demoId="start-at"
        providerProps={{ startAt: 1 }}
      >
        <Placeholder demoId="start-at" length={3} />
      </Demo>
      <ModalsDemo />
      <AutoplayDemo />
      <DisableActionsDemo />
      <HOC />
      {/* <FollowScrollDemo /> */}
    </Container>
  )
}

function DisableKeyboardDemo() {
  const [disableKeyboardNavigation, setDisable] = useState<KeyboardParts[]>([
    'esc',
  ])

  return (
    <Demo
      title="Disable Keyboard"
      demoId="disable-keyboard"
      providerProps={{
        disableKeyboardNavigation,
      }}
      code={`<TourProvider 
  disableKeyboardNavigation={[${disableKeyboardNavigation}]}
/>`}
    >
      <Checkbox.Group
        label="Select keys to disable"
        color="secondary"
        value={disableKeyboardNavigation}
        // @ts-ignore
        onChange={setDisable}
        orientation="horizontal"
      >
        <Checkbox
          value="all"
          onChange={checked => {
            if (checked) {
              // @ts-ignore
              setDisable(['all', 'left', 'right', 'esc'])
            } else {
              setDisable([])
            }
          }}
        >
          All
        </Checkbox>
        <Checkbox value="left">Left</Checkbox>
        <Checkbox value="right">Right</Checkbox>
        <Checkbox value="esc">Esc</Checkbox>
      </Checkbox.Group>
      <Placeholder demoId="disable-keyboard" length={3} />
    </Demo>
  )
}

function PrevNextDemo() {
  return (
    <Demo
      title="Custom Prev and Next buttons"
      demoId="custom-prev-next"
      providerProps={{
        nextButton: ({
          Button,
          currentStep,
          stepsLength,
          setIsOpen,
          setCurrentStep,
          steps,
        }) => {
          const last = currentStep === stepsLength - 1
          return (
            <Button
              hideArrow={last}
              onClick={() => {
                if (last) {
                  setIsOpen(false)
                } else {
                  if (steps) {
                    setCurrentStep(s => (s === steps?.length - 1 ? 0 : s + 1))
                  }
                }
              }}
            >
              {last ? 'Close!' : null}
            </Button>
          )
        },
        prevButton: ({ currentStep, setCurrentStep, steps }) => {
          const first = currentStep === 0
          return (
            <Button
              auto
              ghost
              size="xs"
              onClick={() => {
                if (steps) {
                  if (first) {
                    setCurrentStep(s => steps.length - 1)
                  } else {
                    setCurrentStep(s => s - 1)
                  }
                }
              }}
            >
              Back
            </Button>
          )
        },
      }}
      code={`<TourProvider 
  prevButton={({ currentStep, setCurrentStep, steps }) => {
    const first = currentStep === 0
    return (
      <button
        onClick={() => {
          if (first) {
            setCurrentStep((s) => steps.length - 1)
          } else {
            setCurrentStep((s) => s - 1)
          }
        }}
      >
        Back
      </button>
    )
  }} 
  nextButton={({
    Button,
    currentStep,
    stepsLength,
    setIsOpen,
    setCurrentStep,
    steps,
  }) => {
    const last = currentStep === stepsLength - 1
    return (
      <Button
        onClick={() => {
          if (last) {
            setIsOpen(false)
          } else {
            setCurrentStep((s) => (s === steps?.length - 1 ? 0 : s + 1))  
          }
        }}
      >
        {last ? 'Close!' : null}
      </Button>
    )
  }} 
/>`}
    >
      <Placeholder demoId="custom-prev-next" length={3} />
    </Demo>
  )
}

function DisableScrollDemo() {
  const disableBody = (target: Element | HTMLElement) =>
    disableBodyScroll(target)
  const enableBody = (target: Element | HTMLElement) => enableBodyScroll(target)

  return (
    <Demo
      title="Disable Scroll"
      demoId="scroll-lock"
      providerProps={{
        // @ts-ignore
        afterOpen: disableBody,
        // @ts-ignore
        beforeClose: enableBody,
      }}
    >
      <Placeholder demoId="scroll-lock" length={3} />
    </Demo>
  )
}

function ToggleNavPartsDemo() {
  const [navParts, setNavparts] = useState<string[]>([
    'badge',
    'close',
    'nav',
    'prevNext',
  ])

  return (
    <Demo
      title="Toggle navigation parts"
      demoId="toggle-nav-parts"
      providerProps={{
        showBadge: navParts.includes('badge'),
        showCloseButton: navParts.includes('close'),
        showNavigation: navParts.includes('nav'),
        showPrevNextButtons: navParts.includes('prevNext'),
      }}
    >
      <Checkbox.Group
        label="Select parts to toggle"
        color="secondary"
        value={navParts}
        onChange={setNavparts}
        orientation="horizontal"
      >
        <Checkbox value="badge">Badge</Checkbox>
        <Checkbox value="close">Close button </Checkbox>
        <Checkbox value="nav">Navigation</Checkbox>
        <Checkbox value="prevNext">Prev Next Buttons</Checkbox>
      </Checkbox.Group>
      <Placeholder demoId="toggle-nav-parts" length={3} />
    </Demo>
  )
}

function ModalsDemo() {
  const steps = [
    {
      selector: '[data-tour="step-1-with-modals"]',
      content: ({ isHighlightingObserved }: PopoverContentProps) => {
        return isHighlightingObserved
          ? 'Is showing the observed highlighted selector'
          : 'text 1'
      },
      highlightedSelectors: ['.modaaals-modal'],
      mutationObservables: ['#portaaal'],
    },
    { selector: '[data-tour="step-2-with-modals"]', content: 'text 2' },
    { selector: '[data-tour="step-3-with-modals"]', content: 'text 3' },
  ]
  return (
    <Demo title="Using Modals" demoId="with-modals" customSteps={steps}>
      <ModalProvider
        modals={modals}
        styles={{
          contentInner: base => ({ ...base, margin: 50 }),
        }}
        className="modaaals-modal"
        skipMotion
      >
        <DemoModalContent />
      </ModalProvider>
    </Demo>
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

function DemoModalContent() {
  const { setIsOpen } = useTour()
  const { openModal } = useModaaals()
  return (
    <div style={{ textAlign: 'center', padding: 50 }}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        volutpat quam eu mauris euismod imperdiet. Nullam elementum fermentum
        neque a placerat. Vivamus sed dui nisi. Phasellus vel dolor interdum,
        accumsan eros ut, rutrum dolor. Etiam in leo urna. Vestibulum maximus
        vitae urna at congue.{' '}
        <button
          data-tour="step-1-with-modals"
          onClick={() => openModal('test')}
        >
          Open Modal
        </button>
        Vivamus lectus nisi, pellentesque at orci a, tempor lobortis orci.
        Praesent non lorem erat. Ut augue massa, aliquam in bibendum sed,
        euismod vitae magna. Nulla sit amet sodales augue. Curabitur in nulla in
        magna luctus porta et sit amet dolor. Pellentesque a magna enim.
        Pellentesque malesuada egestas urna, et pulvinar lorem viverra suscipit.
        Duis sit amet mauris ante. Fusce at ante nunc. Maecenas ut leo eu erat
        porta fermentum.
      </p>{' '}
      <button data-tour="step-2-with-modals">Back Home 2</button>{' '}
      <button onClick={() => setIsOpen(true)}>Open</button>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        volutpat quam eu mauris euismod imperdiet. Nullam elementum fermentum
        neque a placerat. Vivamus sed dui nisi. Phasellus vel dolor interdum,
        accumsan eros ut, rutrum dolor. Etiam in leo urna. Vestibulum maximus
        vitae urna at congue. Vivamus lectus nisi, pellentesque at orci a,
        tempor lobortis orci. Praesent non lorem erat. Ut augue massa, aliquam
        in bibendum sed, euismod vitae magna. Nulla sit amet sodales augue.
        Curabitur in nulla in magna luctus porta et sit amet dolor. Pellentesque
        a magna enim. Pellentesque malesuada{' '}
        <button data-tour="step-3-with-modals">Back Home 3</button>
        egestas urna, et pulvinar lorem viverra suscipit. Duis sit amet mauris
        ante. Fusce at ante nunc. Maecenas ut leo eu erat porta fermentum.
      </p>
    </div>
  )
}

function AutoplayDemo() {
  return (
    <Demo title="Autoplay" demoId="autoplay" length={5}>
      <AutoplayPlaceholder />
    </Demo>
  )
}

function AutoplayPlaceholder() {
  const { steps, isOpen, currentStep, setCurrentStep } = useTour()

  useEffect(() => {
    const delay = 3000
    let timer: NodeJS.Timeout
    if (isOpen) {
      timer = setTimeout(
        () => setCurrentStep(s => (s === steps.length - 1 ? 0 : s + 1)),
        delay
      )
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isOpen, currentStep, setCurrentStep, steps.length])

  return (
    <Placeholder demoId="autoplay" length={5}>
      <Progress value={(currentStep * 100) / steps.length} />
    </Placeholder>
  )
}

// function FollowScrollDemo() {
//   const demoId = 'follows-scroll'
//   const steps = [
//     {
//       selector: `[data-tour="step-1-${demoId}"]`,
//       content: 'Lorem ipsum dolor sit amet',
//       disableActions: false,
//     },
//     {
//       selector: `[data-tour="step-2-${demoId}"]`,
//       content: 'You are the only one that could let the Tour continue.',
//     },
//     {
//       selector: `[data-tour="step-3-${demoId}"]`,
//       content: 'Etiam in leo urna.',
//     },
//   ]
//   return (
//     <Demo title="Follows Scroll" demoId={demoId} customSteps={steps}>
//       <FollowScrollDemoContent demoId={demoId} />
//     </Demo>
//   )
// }

// function FollowScrollDemoContent(props: { demoId: string }) {
//   const ref = useRef(null)
//   const entry = useIntersectionObserver(ref, {
//     threshold: 1,
//   })
//   const isVisible = entry && !!entry.isIntersecting

//   const { setRefresher, setIsOpen } = useTour()

//   useEffect(() => {
//     const udt = () => {
//       if (isVisible) {
//         setRefresher(performance.now())
//       }
//     }
//     window.addEventListener('scroll', udt)
//     return () => window.removeEventListener('scroll', udt)
//   }, [setRefresher, isVisible])

//   return (
//     <>
//       <Button
//         // @ts-ignore
//         onClick={() => setIsOpen(true)}
//       >
//         Start Tour
//       </Button>
//       <div ref={ref}>
//         <PlaceholderGrid length={3} demoId={props.demoId} />
//       </div>
//     </>
//   )
// }

function DisableActionsDemo() {
  const disableSteps = [
    {
      selector: '[data-tour="step-1-disable-actions"]',
      content: 'Lorem ipsum dolor sit amet',
      disableActions: false,
    },
    {
      selector: '[data-tour="step-2-disable-actions"]',
      content: 'You are the only one that could let the Tour continue.',
      disableActions: true,
      stepInteraction: true,
      highlightedSelectors: ['.step-wrapper'],
      mutationObservables: ['.to-observe'],
    },
    {
      selector: '[data-tour="step-3-disable-actions"]',
      content: 'Etiam in leo urna.',
    },
  ]
  return (
    <Demo
      title="Disable Actions"
      demoId="disable-actions"
      length={5}
      customSteps={disableSteps}
    >
      <DisableActionsDemoContent />
    </Demo>
  )
}

function DisableActionsDemoContent() {
  const {
    setIsOpen,
    setCurrentStep,
    setDisabledActions,
    disabledActions,
  } = useTour()

  return (
    <div style={{ textAlign: 'center', padding: 50 }}>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        volutpat quam eu mauris euismod imperdiet. Nullam elementum fermentum
        neque a placerat. Vivamus sed dui nisi. Phasellus vel dolor interdum,
        accumsan eros ut, rutrum dolor. Etiam in leo urna. Vestibulum maximus
        vitae urna at congue.{' '}
        <button data-tour="step-1-disable-actions">Lorem Ipsum</button>
        Vivamus lectus nisi, pellentesque at orci a, tempor lobortis orci.
        Praesent non lorem erat. Ut augue massa, aliquam in bibendum sed,
        euismod vitae magna. Nulla sit amet sodales augue. Curabitur in nulla in
        magna luctus porta et sit amet dolor. Pellentesque a magna enim.
        Pellentesque malesuada egestas urna, et pulvinar lorem viverra suscipit.
        Duis sit amet mauris ante. Fusce at ante nunc. Maecenas ut leo eu erat
        porta fermentum.
      </p>{' '}
      <p className="step-wrapper">
        <button
          onClick={() => {
            setIsOpen(false)
            setCurrentStep(2)
          }}
        >
          Close and back to step 1
        </button>{' '}
        <br />
        At this point you need to make an action to continue the Tour. Please
        <button
          data-tour="step-2-disable-actions"
          onClick={() => setDisabledActions(false)}
        >
          Enable actions
        </button>{' '}
        {!disabledActions && (
          <>
            <br />
            <strong className="to-observe">Great! Actions are enabled.</strong>
          </>
        )}
      </p>
      <button onClick={() => setIsOpen(true)}>Open Tour</button>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        volutpat quam eu mauris euismod imperdiet. Nullam elementum fermentum
        neque a placerat. Vivamus sed dui nisi. Phasellus vel dolor interdum,
        accumsan eros ut, rutrum dolor. Etiam in leo urna. Vestibulum maximus
        vitae urna at congue. Vivamus lectus nisi, pellentesque at orci a,
        tempor lobortis orci. Praesent non lorem erat. Ut augue massa, aliquam
        in bibendum sed, euismod vitae magna. Nulla sit amet sodales augue.
        Curabitur in nulla in magna luctus porta et sit amet dolor. Pellentesque
        a magna enim. Pellentesque malesuada{' '}
        <button
          data-tour="step-3-disable-actions"
          onClick={() => setCurrentStep(0)}
        >
          Back To Fisrt Step{' '}
        </button>
        egestas urna, et pulvinar lorem viverra suscipit. Duis sit amet mauris
        ante. Fusce at ante nunc. Maecenas ut leo eu erat porta fermentum.
      </p>
    </div>
  )
}

class HOCPlaceholder extends Component {
  render() {
    return (
      <>
        <Button
          // @ts-ignore
          onClick={() => this.props.setIsOpen(true)}
        >
          Start Tour
        </Button>
        <PlaceholderGrid length={3} demoId="withTour" />
      </>
    )
  }
}

const PlaceholderWithTour = withTour(HOCPlaceholder)

function HOC() {
  return (
    <Demo title="HOC" demoId="withTour" length={3}>
      <PlaceholderWithTour />
    </Demo>
  )
}
