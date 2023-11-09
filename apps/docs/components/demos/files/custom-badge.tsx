import { defaultFiles } from './defaults'

const AppJs = `import { TourProvider } from '@reactour/tour'
import { steps } from './steps.js'
import Main from './Main.js'
	
export default function App () {
  return (
    <TourProvider 
      steps={steps}
      badgeContent={({ totalSteps, currentStep }) => currentStep + 1 + "/" + totalSteps}
    >
      <Main />
    </TourProvider>
  )
}
`

export const customBadgeFiles = {
  ...defaultFiles,
  '/App.js': {
    code: AppJs,
  },
}
