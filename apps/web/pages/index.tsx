import { TourProvider } from '@reactour/tour'
import { ModalProvider } from 'modaaals'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { isMobile } from 'react-device-detect'
import Home from '../components/Home'
import Portal from '../components/Portal'
import { tourConfig } from '../components/config'

function App() {
  const disableBody = (target: Element | HTMLElement) =>
    disableBodyScroll(target)
  const enableBody = (target: Element | HTMLElement) => enableBodyScroll(target)

  return (
    <>
      <TourProvider
        // @ts-ignore
        steps={tourConfig}
        // @ts-ignore
        afterOpen={isMobile ? () => {} : disableBody}
        // @ts-ignore
        beforeClose={isMobile ? () => {} : enableBody}
        styles={{
          badge: (base) => ({ ...base, background: '#ef5a3d' }),
          // @ts-ignore
          dot: (base, { current }) => ({
            ...base,
            background: current ? '#ef5a3d' : '#ccc',
          }),
          popover: (base) => ({
            ...base,
            background: '#dedede',
            borderRadius: 10,
          }),
        }}
        position="bottom"
        Wrapper={Wrapper}
        disableInteraction={(clickProps) => clickProps.currentStep < 2}
        onClickHighlighted={(event, clickProps) => {
          if (clickProps.currentStep < 2) {
            event.preventDefault()
            clickProps.setCurrentStep(
              Math.min(clickProps.currentStep + 1, clickProps.steps.length - 1)
            )
          }
        }}
        onClickClose={({ setIsOpen, meta, setSteps, setMeta }) => {
          if (meta && meta === 'tour-2') {
            setMeta('tour-1')
            setSteps(tourConfig)
          } else {
            setIsOpen(false)
          }
        }}
        onClickMask={({ setIsOpen, meta, setSteps, setMeta }) => {
          if (meta && meta === 'tour-2') {
            setMeta('tour-1')
            setSteps(tourConfig)
          } else {
            setIsOpen(false)
          }
        }}
        // inViewThreshold={40}
        scrollSmooth
        clipId="demo-mask-clip"
        // keyboardHandler={(e, clickProps) => {
        //   if (e.key === 'ArrowRight') {
        //     clickProps.setCurrentStep(
        //       Math.min(clickProps.currentStep + 1, clickProps.steps.length - 1)
        //     )
        //   }
        //   if (e.key === 'ArrowLeft') {
        //     clickProps.setCurrentStep(Math.max(clickProps.currentStep - 1, 0))
        //   }
        //   if (e.key === 'Escape') {
        //     const nextStep = Math.floor(Math.random() * clickProps.steps.length)
        //     clickProps.setCurrentStep(nextStep)
        //   }
        // }}
        // disableKeyboardNavigation={['esc']}
      >
        <ModalProvider
          modals={modals}
          styles={{
            contentInner: (base) => ({ ...base, margin: 50 }),
          }}
          className="modaaals-modal"
          skipMotion
        >
          <Home />
        </ModalProvider>
      </TourProvider>
    </>
  )
}

const modals = {
  test: TestModal,
}

function Wrapper({ children }) {
  return <Portal>{children}</Portal>
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

export default App
