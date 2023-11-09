import { defaultFiles } from './defaults'

const AppJs = `import { TourProvider } from '@reactour/tour'
import { steps } from './steps.js'
import Main from './Main.js'
	
export default function App () {
  return (
    <TourProvider steps={steps} scrollSmooth>
      <Main />
    </TourProvider>
  )
}
`

const MainJs = `import { useTour } from '@reactour/tour'

export default function Main () {
  const { setIsOpen } = useTour()

  return (
    <div className="demo scroll-demo">
      <header>
        <button onClick={() => setIsOpen(true)}>Open Tour</button>
      </header>
      <p>
        <span className="first-step">Lorem ipsum</span> dolor sit amet, consectetur adipiscing elit. Praesent at
        finibus nulla, quis varius justo.
      </p>
      <p>
        <span className="second-step">Vestibulum lorem</span> lorem.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis pretium odio. Sed hendrerit enim vel libero sagittis efficitur. Maecenas iaculis metus et magna mollis, sit amet dictum arcu elementum. Vestibulum non turpis at enim aliquet lobortis. Donec vel gravida tellus. Praesent nec tristique velit, at ullamcorper nibh. Suspendisse potenti. Proin ac dolor justo. <span className="third-step">Praesent nisi mauris</span>, eleifend sed iaculis a, tincidunt et tellus. Etiam vitae velit risus. Duis eget dolor mi. 
      </p>
    </div>
  )
}
`

export const scrollSmoothFiles = {
  ...defaultFiles,
  '/App.js': {
    code: AppJs,
  },
  '/Main.js': {
    code: MainJs,
  },
}
