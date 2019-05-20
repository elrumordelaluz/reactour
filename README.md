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
  <a href="https://codesandbox.io/s/6z56m8x18k?module=%2FApp.js">
    <img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="Edit 6z56m8x18k">
  </a>
</p>

## Install

```zsh
npm i -S reactour
# or
yarn add reactour
```

<small>From `v1.9.1` [styled-components](https://www.styled-components.com/) it isn't bundled into the package and is required `styled-components@^4` and `react@^16.3` due to the use of [createRef](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs), so: </small>

```zsh
npm i -S styled-components@^4.0.0
# or
yarn add styled-components@^4.0.0
```

## Usage

Add the `Tour` Component in your Application, passing the `steps` with the elements to highlight during the _Tour_.

```js
import React from 'react'
import Tour from 'reactour'

class App extends Component {
  // ...

  render  (
    <>
      { /* other stuff */}
      <Tour
        steps={steps}
        isOpen={this.state.isTourOpen}
        onRequestClose={this.closeTour} />
    </>
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

### Tour Props

#### accentColor

> Change `--reactour-accent` _(defaults to accentColor on IE)_ css custom prop to apply color in _Helper_, number, dots, etc

Type: `string`

Default: `#007aff`

#### badgeContent

> Customize _Badge_ content using `current` and `total` steps values

Type: `func`

```js
// example
<Tour badgeContent={(curr, tot) => `${curr} of ${tot}`} />
```

#### children

> Content to be rendered inside the _Helper_

Type: `node | elem`

#### className

> Custom class name to add to the _Helper_

Type: `string`

#### closeWithMask

> Close the _Tour_ by clicking the _Mask_

Type: `bool`

Default: `true`

#### deterministic

> If jumping between steps (e.g. with dots) should we attempt to execute all preAction/action/postAction (or rewind) handlers in between? The element of each step (step.selector) is parsed and passed to each function, but may not be completely accurate, due to the fact that each step has to be replayed quickly - some UI elements may not respond quickly enough.

Type: `bool`

Default: `true`

#### disableDotsNavigation

> Disable interactivity with _Dots_ navigation in _Helper_

Type: `bool`

#### disableInteraction

> Disable the ability to click or intercat in any way with the _Highlighted_ element

Type: `bool`

#### disableKeyboardNavigation

> Disable all keyboard navigation (next and prev step) when true, disable only selected keys when array

Type: `bool | array(['esc', 'right', 'left'])`

```js
// example
<Tour disableKeyboardNavigation={['esc']} />
```

#### getCurrentStep

> Function triggered each time current step change

Type: `func`

```js
// example
<Tour getCurrentStep={curr => console.log(`The current step is ${curr + 1}`)} />
```

#### goToStep

> Programmatically change current step after the first render, when the value changes

Type: `number`

#### highlightedMaskClassName

> Custom class name to add to the element which is the overlay for the target element when `disableInteraction`

Type: `string`

#### inViewThreshold

> Tolerance in pixels to add when calculating if an element is outside viewport to scroll into view

Type: `number`

#### isOpen

> You know…

Type: `bool`

Required: `true`

#### lastStepNextButton

> Change Next button in last step into a custom button to close the Tour

Type: `node`

```js
// example
<Tour lastStepNextButton={<MyButton>Done! Let's start playing</MyButton>} />
```

#### maskClassName

> Custom class name to add to the _Mask_

Type: `string`

#### maskSpace

> Extra Space between in pixels between Highlighted element and _Mask_

Type: `number`

Default: `10`

#### nextButton

> Renders as next button navigation

Type: `node`

#### nextStep

> Overrides default `nextStep` internal function. Gets passed the default `nextStep` handler as a parameter, so you can choose to execute it based on a requirement. Strange behaviour is expected if you change the current step then also execute the default implementation!

Type: `func`

```js
<Tour prevStep={(defaultNext) => someRequirement && defaultNext()} />
```

#### onAfterOpen

> Do something after _Tour_ is opened

Type: `func`

```js
// example
<Tour onAfterOpen={target => (document.body.style.overflowY = 'hidden')} />
```

#### onBeforeClose

> Do something before _Tour_ is closed

Type: `func`

```js
// example
<Tour onBeforeClose={target => (document.body.style.overflowY = 'auto')} />
```

#### onRequestClose

> Function to close the _Tour_

Type: `func`

Required: `true`

#### prevButton

> Renders as prev button navigation

Type: `node`

#### prevStep

> Overrides default `prevStep` internal function. Gets passed the default `prevStep` handler as a parameter, so you can choose to execute it based on a requirement. Strange behaviour is expected if you change the current step then also execute the default implementation!

Type: `func`

```js
<Tour prevStep={(defaultPrev) => someRequirement && defaultPrev()} />
```

#### rounded

> Beautify _Helper_ and _Mask_ with `border-radius` (in px)

Type: `number`

Default: `0`

#### scrollDuration

> Smooth scroll duration when positioning the target element (in ms)

Type: `number`

Default: `1`

#### scrollOffset

> Offset when positioning the target element after scroll to it

Type: `number`

Default: a calculation to the center of the viewport

#### showButtons

> Show/Hide _Helper_ Navigation buttons

Type: `bool`

Default: `true`

#### showCloseButton

> Show/Hide _Helper_ Close button

Type: `bool`

Default: `true`

#### showNavigation

> Show/Hide _Helper_ Navigation Dots

Type: `bool`

Default: `true`

#### showNavigationNumber

> Show/Hide number when hovers on each Navigation Dot

Type: `bool`

Default: `true`

#### showNumber

> Show/Hide _Helper_ Number Badge

Type: `bool`

Default: `true`

#### startAt

> Starting step when _Tour_ is open the first time

Type: `number`

#### steps

> Array of elements to highlight with special info and props

Type: `shape`

Required: `true`

##### Steps shape

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
  'stepInteraction': PropTypes.bool,
  'preAction': propTypes.func,
  'postAction': propTypes.func,
  'rewindAction': propTypes.func
})),
```

##### Steps example

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
      // by using this, focus trap is temporary disabled
      node.focus()
      console.log('yup, the target element is also focused!')
    },
    style: {
      backgroundColor: '#bada55',
    },
    // Disable interaction for this specific step.
    // Could be enabled passing `true`
    // when `disableInteraction` prop is present in Tour
    stepInteraction: false,
    preAction: () => {
        // this is executed before this step starts
        // preActions will NOT run if used on the first step
        console.log("Step is about to start")
    },
    postAction: () => {
        // this is executed before this step ends
        // postActions will NOT run if used on the last step
        console.log("Step is about to finish")
    }
  },
  // ...
]
```

#### update

> Value to listen if a forced update is needed

Type: `string`

#### updateDelay

> Delay time when forcing update. Useful when there are known animation/transitions

Type: `number`

Default: `1`

### Step props

#### content

> The content of the step, which can be simple text, a node, element or a function that returns any of these.

Type: `node`|`element`|`func`

Required: true

#### observe

> Watches an element for changes and updates the spotlight accordingly

Type: `node`

#### position

> Where the step modal will appear relative to the selected element.

Type: `func`

#### action

> Action handler that is executed after this step executes.

Type: `func`

Parameters: `node`

Resolves [`step.selector`](#selector) as a node (with [`document.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)) and passed to this handler.

#### preAction

> Action handler that is executed before this step executes.

Type: `func`

Parameters: `node`

See [`action`](#action)

#### postAction

> Action handler that is executed after this step executes.

Type: `func`

Parameters: `node`

See [`action`](#action)

#### rewindAction

> Action handler that is executed if this step is rewinded (for resetting)

Type: `func`

Parameters: `node`

This performs the same role as the parameter for preAction, Action and postAction, but as the step is backwards, this may not be as reliable.

#### selector

> This string is used with [`document.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) to select the element for this step.

Type: `string`

#### stepInteraction

> Disables interaction only for this step, rather than needing to enable it globally with `disableInteraction`.

Type: `func`

#### style

> CSS/style to be applied to this step only. Pass as an object (or inline CSS).

Type: `object`

## FAQ

<p>
  <details>
    <summary>How is the scroll lock behaviour implemented in the <a href="https://github.com/elrumordelaluz/reactour/blob/master/src/demo/App.js">Demo</a>?</summary>
    <p>
      To guarantee a cross browser behaviour we use <a href="https://www.npmjs.com/package/body-scroll-lock">body-scroll-lock</a>. </p>
      <p>Import the library
        <pre lang=js>
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'</pre>
    </p>
    <p>Create the event handlers
        <pre lang=js>
disableBody = target => disableBodyScroll(target)
enableBody = target => enableBodyScroll(target)</pre>
    </p>
    <p>Then assign them into the Tour props
        <pre lang=js>
&lt;Tour
  {...props}
  onAfterOpen={this.disableBody}
  onBeforeClose={this.enableBody}
/&gt;</pre>
    </p>
  </details>
</p>

<p>
  <details>
    <summary>Why should I use pre instead of post? I can just use post in the step before (and vice versa).</summary>
    <p>
In many cases, choosing between the pre & post action will not matter to the actual tour. They are mainly there to logically separate actions for the programmer.
    </p>
    <p>
Look at the example below to see an example of where this might help writing steps.

The bad version:
    </p>
    <pre lang=js>
[
  {
    selector: '#modal',
    content: 'Here you can enter data'
    postAction: () => openTheDropdown()
  },
  {
    selector: '#the-dropdown',
    content: 'Here is the dropdown'
  },
]
    </pre>
    <p>
This works, but why should the modal step care about the dropdown? In this case, the `preAction` handler makes more sense.

The better version:
    </p>
    <pre lang=js>
[
  {
    selector: '#modal',
    content: 'Here you can enter data'
  },
  {
    selector: '#the-dropdown',
    content: 'Here is the dropdown',
    preAction: () => openTheDropdown()
  },
]
    </pre>
    <p>
Now if you have a lot of tour steps, each step is well separated in scope.
    </p>
  </details>
</p>
