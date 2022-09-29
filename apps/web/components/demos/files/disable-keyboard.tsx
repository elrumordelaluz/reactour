import { DefaultMainJs, defaultStepsjs } from './defaults'

const AppJs = `import { TourProvider } from '@reactour/tour'
import { useState } from 'react'
import { steps } from './steps.js'
import Main from './Main.js'
	
export default function App () {
  const [disableKeyboardNavigation, setDisable] = useState([
    'esc',
  ])

  function onChange(event) {
    let updatedList = [...disableKeyboardNavigation];
    if (event.target.checked) {
      updatedList = [...disableKeyboardNavigation, event.target.value];
    } else {
      updatedList.splice(disableKeyboardNavigation.indexOf(event.target.value), 1);
    }
    setDisable(updatedList);
  }

  return (
    <>
      <pre>
        <code>Disabled keys: 
          <label>
            <input 
            type="checkbox" 
            name="dk" 
            value="left" 
            onChange={onChange} 
            checked={disableKeyboardNavigation.includes("left")} /> left
          </label>
          <label>
            <input 
            type="checkbox" 
            name="dk" 
            value="right" 
            onChange={onChange} 
            checked={disableKeyboardNavigation.includes("right")} /> right
          </label>
          <label>
            <input 
            type="checkbox" 
            name="dk" 
            value="esc" 
            onChange={onChange} 
            checked={disableKeyboardNavigation.includes("esc")} /> esc
          </label>
        </code>
      </pre>
      <TourProvider 
        steps={steps}
        disableKeyboardNavigation={disableKeyboardNavigation}
      >
        <Main />
      </TourProvider>
    </>
  )
}
`

export const disableKeyboardFiles = {
  '/App.js': {
    code: AppJs,
  },
  '/Main.js': {
    code: DefaultMainJs,
  },
  '/steps.js': {
    code: defaultStepsjs,
  },
}
