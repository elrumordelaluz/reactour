import { defaultFiles } from './defaults'

const AppJs = `import { TourProvider } from '@reactour/tour'
import { useState } from 'react'
import { steps } from './steps.js'
import Main from './Main.js'
	
export default function App () {
  const [enabledParts, setEnabled] = useState([
    'badge','close','nav','buttons','dots'
  ])

  function onChange(event) {
    let updatedList = [...enabledParts];
    if (event.target.checked) {
      updatedList = [...enabledParts, event.target.value];
    } else {
      updatedList.splice(enabledParts.indexOf(event.target.value), 1);
    }
    setEnabled(updatedList);
  }

  return (
    <>
      <pre className="demo-selectors column">
        <code>Enabled parts: 
          <label>
            <input 
            type="checkbox" 
            name="dk" 
            value="badge" 
            onChange={onChange} 
            checked={enabledParts.includes("badge")} /> badge
          </label>
          <label>
            <input 
            type="checkbox" 
            name="dk" 
            value="close" 
            onChange={onChange} 
            checked={enabledParts.includes("close")} /> close button
          </label>
          <label>
            <input 
            type="checkbox" 
            name="dk" 
            value="nav" 
            onChange={onChange} 
            checked={enabledParts.includes("nav")} /> navigation
          </label>
          <label>
            <input 
            type="checkbox" 
            name="dk" 
            value="buttons" 
            onChange={onChange} 
            checked={enabledParts.includes("buttons")} /> prev & next buttons
          </label>
          <label>
            <input 
            type="checkbox" 
            name="dk" 
            value="dots" 
            onChange={onChange} 
            checked={enabledParts.includes("dots")} /> dots
          </label>
        </code>
      </pre>
      <TourProvider 
        steps={steps}
        showBadge={enabledParts.includes('badge')}
        showCloseButton={enabledParts.includes('close')}
        showNavigation={enabledParts.includes('nav')}
        showPrevNextButtons={enabledParts.includes('buttons')}
        showDots={enabledParts.includes('dots')}
      >
        <Main />
      </TourProvider>
    </>
  )
}
`

export const toggleNavPartsFiles = {
  ...defaultFiles,
  '/App.js': {
    code: AppJs,
  },
}
