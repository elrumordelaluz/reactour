import { defaultFiles } from './defaults'

const AppJs = `import { TourProvider } from '@reactour/tour'
import { steps } from './steps.js'
import Main from './Main.js'
	
export default function App () {
  return (
    <TourProvider steps={steps} rtl>
      <Main />
    </TourProvider>
  )
}
`

export const rtlFiles = {
  ...defaultFiles,
  '/App.js': {
    code: AppJs,
  },
}
