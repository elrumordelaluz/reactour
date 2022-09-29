export const DefautltAppJs = `import { TourProvider } from '@reactour/tour'
import { steps } from './steps.js'
import Main from './Main.js'
	
export default function App () {
  return (
    <TourProvider steps={steps}>
      <Main />
    </TourProvider>
  )
}
`

export const DefaultMainJs = `import { useTour } from '@reactour/tour'
export default function Main () {
  const { setIsOpen } = useTour()
  return (
    <>
      <p>
        <span className="first-step">Lorem ipsum</span> dolor sit amet, consectetur adipiscing elit. Praesent at
        finibus nulla, quis varius justo. <span className="second-step">Vestibulum lorem</span> lorem.
      </p>
      <p>
        Viverra porta metus nec, <span className="third-step">porta luctus</span> orci.
      </p>
      <button onClick={() => setIsOpen(true)}>Open Tour</button>
    </>
  )
}
`

export const defaultStepsjs = `export const steps = [
  {
    selector: '.first-step',
    content: 'This is the first Step',
  },
  {
    selector: '.second-step',
    content: 'This is the second Step',
  },
  {
    selector: '.third-step',
    content: 'This is the third Step',
  },
  // ...
]
`

export const defaultFiles = {
  '/App.js': {
    code: DefautltAppJs,
  },
  '/Main.js': {
    code: DefaultMainJs,
  },
  '/steps.js': {
    code: defaultStepsjs,
  },
}
