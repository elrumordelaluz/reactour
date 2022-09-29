import { defaultFiles } from './defaults'

const AppJs = `import { TourProvider } from '@reactour/tour'
import { steps } from './steps.js'
import Main from './Main.js'
	
export default function App () {
  return (
    <TourProvider 
      steps={steps} 
      padding={{ 
        mask: 14, 
        popover: [5, 10], 
        wrapper: 20 
      }}
    >
      <Main />
    </TourProvider>
  )
}
`

export const paddingFiles = {
  ...defaultFiles,
  '/App.js': {
    code: AppJs,
  },
}
