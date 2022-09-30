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
    <div className="demo">
      <header>
        <button onClick={() => setIsOpen(true)}>Open Tour</button>
      </header>
      <p>
        <span className="first-step">Lorem ipsum</span> dolor sit amet, consectetur adipiscing elit. Praesent at
        finibus nulla, quis varius justo. <span className="second-step">Vestibulum lorem</span> lorem.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit enim vel libero sagittis efficitur. Maecenas iaculis metus et magna mollis, sit amet dictum arcu elementum. Vestibulum non turpis at enim aliquet lobortis. Donec vel gravida tellus. Praesent nec tristique velit, at ullamcorper nibh. Suspendisse potenti. Proin ac dolor justo. <span className="third-step">Praesent nisi mauris</span>, eleifend sed iaculis a, tincidunt et tellus. Etiam vitae velit risus.  
      </p>
    </div>
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

const stylesCss = `
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont,
    'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetical Neue', sans-serif;
}
.demo {
  padding: 1em;
}
.demo header {
  display: flex;
  justify-content: flex-end;
}
.demo button { 
  border: 0;
  border-radius: 4px;
  color: white;
  padding: .5em 1em;
  font: inherit;
  margin-left: .25em;
  margin-right: .25em; 
  background-color: #1c8f9e;
}
.demo button:hover {
  opacity: .9;
}
.scroll-demo p {
  margin-bottom: 100vh;
}
.demo-selectors {
  margin: 0;
  position: fixed;
  bottom: 10px;
  left: 10px;
  background-color: white;
  z-index: 100000;
  padding: 1em;
  box-shadow: 0 0 25px rgba(0,0,0,.1);
}
.demo-selectors code {
  display: flex;
}
.demo-selectors.column code {
  flex-direction: column
}
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
  '/styles.css': {
    code: stylesCss,
    hidden: true,
  },
}
