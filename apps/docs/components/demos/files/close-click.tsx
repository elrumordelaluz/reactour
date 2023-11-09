import { defaultFiles } from './defaults'

const AppJs = `import { TourProvider } from '@reactour/tour'
import { steps } from './steps.js'
import Main from './Main.js'
	
export default function App () {
  return (
    <TourProvider 
      steps={steps}
      onClickClose={({ setCurrentStep, currentStep, steps, setIsOpen }) => {
        if (steps) {
          if (currentStep === steps.length - 1) {
            setIsOpen(false)
          }
          setCurrentStep((s) => (s === steps.length - 1 ? 0 : s + 1))
        }
      }}>
      <Main />
    </TourProvider>
  )
}
`

export const closeClickFiles = {
  ...defaultFiles,
  '/App.js': {
    code: AppJs,
  },
}
