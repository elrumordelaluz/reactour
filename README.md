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
  <a href="https://codesandbox.io/s/7kjp4nzv9q?module=%2FApp.js">
    <img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="dit 7kjp4nzv9q">
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

| Prop  | Desc          | Type  | Default | Is Required |
| ----- | ------------- | ----- | ------- | ------ |
| `badgeContent` | Function to customize Badge content `(current, total) => {} ` | `func` |  |  |
| `className` | Custom class to add to the **helper** | `string` |  |  |
| `closeWithMask` | Close clicking the **mask** | `bool` | `true` |  |
| `disableInteraction` | Isn't possible to interact with highlighted elements | `bool` |  |  |
| `highlightedMaskClassName` | Custom class name for element which is overlaid target element | `string` |  |  |
| `inViewThreshold` | Scroll element to show when is outiside _viewport_ adding this threshold value | `number` |  |  |
| `isOpen` | you know… | `bool` |  | ✅ |
| `lastStepNextButton` | Change _Next_ button in last step into a custom button to close the _Tour_ | `string` |  |  |
| `maskClassName` | Custom class to add to the **mask** | `string` |  |  |
| `maskSpace` | padding between elemente showed and **mask** | `number` | `10`  |  |
| `nextButton` | next navigation button text | `string` |  |  |
| `onAfterOpen` | function triggered after open | `func` | `() => { document.body.style.overflowY = 'hidden' }`  |  |
| `onBeforeClose` | function triggered before close | `func` | `() => { document.body.style.overflowY = 'auto' }`  |  |
| `onRequestClose` | function triggered to close | `func` |  |  |
| `prevButton` | prev navigation button text | `string` |  |  |
| `scrollDuration` | Smooth scroll duration when positioning the target element | `number` | `1` |  |
| `scrollOffset` | Offset when positioning the target element | `number` | calculates the vertical center of the page |  |
| `showButtons` | Show **helper** navigation butons | `bool` | `true` |  |
| `showNavigation` | Show **helper** navigation dots | `bool` | `true` |  |
| `showNavigationNumber` | Show number when hovers on each navigation dots | `bool` | `true` |  |
| `showNumber` | Show **helper** number badge | `bool` | `true` |  |
| `startAt` | Starting step each time the Tour is open | `number` |  |  |
| `steps` | Array of steps with info and `props` | [view bellow] |  | ✅ |
| `update` | Value to listen if a forced update is needed | `string` |  |  |
| `updateDelay` | Delay time when forcing update. Useful when there are known animation/transitions | `number` | 1 |  |

```js
steps: PropTypes.arrayOf(PropTypes.shape({
  'selector': PropTypes.string.isRequired,
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
        Lorem ipsum <button onClick={() => goTo(4)}>Got to Step 5</button>
        <br />{ inDOM && '🎉 Look at your step!'}
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
