import { defaultFiles } from './defaults'

const AppJs = `import { TourProvider } from '@reactour/tour'
import { steps } from './steps.js'
import Main from './Main.js'
	
export default function App () {
  const radius = 10
  
  return (
    <TourProvider 
      steps={steps} 
      styles={{
        popover: (base) => ({
          ...base,
          '--reactour-accent': '#ef5a3d',
          borderRadius: radius,
        }),
        maskArea: (base) => ({ ...base, rx: radius }),
        maskWrapper: (base) => ({ ...base, color: '#ef5a3d' }),
        badge: (base) => ({ ...base, left: 'auto', right: '-0.8125em' }),
        controls: (base) => ({ ...base, marginTop: 100 }),
        close: (base) => ({ ...base, right: 'auto', left: 8, top: 8 }),
      }}
    >
      <Main />
    </TourProvider>
  )
}
`

export const customStylesFiles = {
  ...defaultFiles,
  '/App.js': {
    code: AppJs,
  },
}
