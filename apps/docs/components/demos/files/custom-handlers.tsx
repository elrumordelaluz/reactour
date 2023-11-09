import { defaultFiles } from './defaults'

const AppJs = `import { useState } from 'react'
import { TourProvider } from '@reactour/tour'
import { steps } from './steps.js'
import Main from './Main.js'
	
export default function App () {
  const [currentStep, setCurrentStep] = useState(0)
  console.log(currentStep)
  return (
    <TourProvider 
      steps={steps} 
      currentStep={currentStep}
      setCurrentStep={() => {
        if (currentStep === steps.length - 1) {
            setCurrentStep(0)    
        } else {
            setCurrentStep(currentStep + 1)
        }
      }}
    >
      <Main />
    </TourProvider>
  )
}
`

export const customHandlersFiles = {
  ...defaultFiles,
  '/App.js': {
    code: AppJs,
  },
}
