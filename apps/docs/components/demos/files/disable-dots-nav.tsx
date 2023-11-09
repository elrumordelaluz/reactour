import { defaultFiles } from './defaults'

const AppJs = `import { TourProvider } from '@reactour/tour'
import { steps } from './steps.js'
import Main from './Main.js'
	
export default function App () {
  return (
    <TourProvider steps={steps} disableDotsNavigation>
      <Main />
    </TourProvider>
  )
}
`

export const disableDotsNavFiles = {
  ...defaultFiles,
  '/App.js': {
    code: AppJs,
  },
}
