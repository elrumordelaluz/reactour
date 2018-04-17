<p align="center">
  <img alt="Reactour" title="Reactour" src="/logo.svg" width="250">
</p>
<p align="center" style="margin-top: 40px">
  <strong>Tourist Guide</strong> into your React Components
</p>
<p align="center">
  <a href="https://elrumordelaluz.github.io/reactour/">Demo</a>
</p>
<p align="center">
  <a href="https://codesandbox.io/s/1ql2n6l9o3?module=%2FApp.js">
    <img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="Edit 1ql2n6l9o3">
  </a>
</p>

### Install

```
npm i --save reactour
```

```
yarn add reactour
```

### Initialize

Add the `Tour` Component in your Application:

```js
import Tour from 'reactour'

class App extends Component {
  // ...

  render  (
    <div>
      { /* other stuff */}
      <Tour
        steps={steps}
        isOpen={this.state.isTourOpen}
        onRequestClose={this.closeTour} />
    </div>
  )
}

const steps = [
  {
    selector: '.first-step',
    content: 'This is my first Step',
  },
  // ...
]
```

### PropTypes

| Prop                        | Desc                                                                              | Type          | Default                                              | Is Required |
| --------------------------- | --------------------------------------------------------------------------------- | ------------- | ---------------------------------------------------- | ----------- |
| `accentColor`               | Change `--reactour-accent` color (helper number + dots)                           | `string`      | `#007aff`                                            |             |
| `badgeContent`              | Function to customize Badge content `(current, total) => {}`                      | `func`        |                                                      |             |
| `className`                 | Custom class to add to the **helper**                                             | `string`      |                                                      |             |
| `closeWithMask`             | Close clicking the **mask**                                                       | `bool`        | `true`                                               |             |
| `disableDotsNavigation`     | Isn't possible to interact with helper dots                                       | `bool`        |                                                      |             |
| `disableInteraction`        | Isn't possible to interact with highlighted elements                              | `bool`        |                                                      |             |
| `disableKeyboardNavigation` | Isn't possible to interact with keyboard arrows                                   | `bool`        |                                                      |             |
| `getCurrentStep`            | Function triggered each time current step change                                  | `func`        | `step => { /* 'step' is the current step index */ }` |             |
| `goToStep`                  | Programmatically change current step                                              | `number`      |                                                      |             |
| `highlightedMaskClassName`  | Custom class name for element which is overlaid target element                    | `string`      |                                                      |             |
| `inViewThreshold`           | Scroll element to show when is outiside _viewport_ adding this threshold value    | `number`      |                                                      |             |
| `isOpen`                    | You know…                                                                         | `bool`        |                                                      | ✅          |
| `lastStepNextButton`        | Change _Next_ button in last step into a custom button to close the _Tour_        | `node`        |                                                      |             |
| `maskClassName`             | Custom class to add to the **mask**                                               | `string`      |                                                      |             |
| `maskSpace`                 | Padding between elemente showed and **mask**                                      | `number`      | `10`                                                 |             |
| `nextButton`                | Next navigation button text                                                       | `node`        |                                                      |             |
| `nextStep`                  | Override default `nextStep` function to use a custom one                          | `func`        |                                                      |             |
| `onAfterOpen`               | Function triggered after open                                                     | `func`        | `() => { document.body.style.overflowY = 'hidden' }` |             |
| `onBeforeClose`             | Function triggered before close                                                   | `func`        | `() => { document.body.style.overflowY = 'auto' }`   |             |
| `onRequestClose`            | Function triggered to close                                                       | `func`        |                                                      |             |
| `prevButton`                | Prev navigation button text                                                       | `node`        |                                                      |             |
| `prevStep`                  | Override default `prevStep` function to use a custom one                          | `func`        |                                                      |             |
| `rounded`                   | Beautify helper + mask with border-radius (in px)                                 | `number`      | `0`                                                  |             |
| `scrollDuration`            | Smooth scroll duration when positioning the target element                        | `number`      | `1`                                                  |             |
| `scrollOffset`              | Offset when positioning the target element                                        | `number`      | calculates the vertical center of the page           |             |
| `showButtons`               | Show **helper** navigation butons                                                 | `bool`        | `true`                                               |             |
| `showNavigation`            | Show **helper** navigation dots                                                   | `bool`        | `true`                                               |             |
| `showNavigationNumber`      | Show number when hovers on each navigation dots                                   | `bool`        | `true`                                               |             |
| `showNumber`                | Show **helper** number badge                                                      | `bool`        | `true`                                               |             |
| `startAt`                   | Starting step each time the Tour is open                                          | `number`      |                                                      |             |
| `steps`                     | Array of steps with info and `props`                                              | [view bellow] |                                                      | ✅          |
| `update`                    | Value to listen if a forced update is needed                                      | `string`      |                                                      |             |
| `updateDelay`               | Delay time when forcing update. Useful when there are known animation/transitions | `number`      | 1                                                    |             |

```js
steps: PropTypes.arrayOf(PropTypes.shape({
  'selector': PropTypes.string,
  'content': PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
  'position': PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']),
  'action': PropTypes.func,
  'style': PropTypes.object,
})),
```

### Steps example

```js
const steps = [
  {
    selector: '[data-tour="my-first-step"]',
    content: ({ goTo, inDOM }) => (
      <div>
        Lorem ipsum <button onClick={() => goTo(4)}>Go to Step 5</button>
        <br />
        {inDOM && '🎉 Look at your step!'}
      </div>
    ),
    position: 'top',
    action: node => {
      node.focus()
      console.log('yup, the target element is also focused!')
    },
    style: {
      backgroundColor: '#bada55',
    },
  },
  // ...
]
```
