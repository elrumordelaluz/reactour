import { defaultFiles } from './defaults'

const AppJs = `import { TourProvider } from '@reactour/tour'
import { steps } from './steps.js'
import Main from './Main.js'
	
export default function App () {
  return (
    <TourProvider 
      steps={steps} 
      onClickHighlighted={(e) => {
        e.stopPropagation()
        console.log('No interaction')
      }} 
      disableInteraction
      >
      <Main />
    </TourProvider>
  )
}
`

export const disableInteractionFiles = {
  ...defaultFiles,
  '/App.js': {
    code: AppJs,
  },
}
