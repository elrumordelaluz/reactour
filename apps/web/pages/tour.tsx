import { useEffect, Component } from 'react'
import { Button, Progress } from '@nextui-org/react'
import Placeholder, { PlaceholderGrid } from '../components/Placeholder'
import TourDemos from '../components/demos/TourDemos'
import Demo from '../components/demos/index'
import { useTour, PopoverContentProps, withTour } from '@reactour/tour'
// import { useIntersectionObserver } from '@reactour/utils'
import { ModalProvider, useModaaals } from 'modaaals'

function RoutesDemo() {}

export default function Tour() {
  return <TourDemos />
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
    <Demo title="Using Modals" demoId="with-modals">
      <ModalProvider
        modals={modals}
        styles={{
          contentInner: (base) => ({ ...base, margin: 50 }),
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
    <Demo title="Autoplay" demoId="autoplay">
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
        () => setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1)),
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
    <Demo title="Disable Actions" demoId="disable-actions">
      <DisableActionsDemoContent />
    </Demo>
  )
}

function DisableActionsDemoContent() {
  const { setIsOpen, setCurrentStep, setDisabledActions, disabledActions } =
    useTour()

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
    <Demo title="HOC" demoId="withTour">
      <PlaceholderWithTour />
    </Demo>
  )
}
