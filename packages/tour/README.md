<p align="center">
<a href="reactour.js.org">
  <img alt="Reactour" title="Reactour" src="https://raw.githubusercontent.com/elrumordelaluz/reactour/master/logo.svg" width="250"></a>
</p>
<p align="center" style="margin-top: 40px;margin-bottom: 40px;">
  <strong>Tourist Guide</strong> into your React Components
</p>

> This documentation is for the latest release, which uses [npm scoped package](https://docs.npmjs.com/cli/v7/using-npm/scope) `@reactour`. The original `reactour` is now on branch `v1` and its documentation can be found [here](https://github.com/elrumordelaluz/reactour/tree/v1).

## Install

```zsh
npm i -S @reactour/tour @emotion/react
# or
yarn add @reactour/tour @emotion/react
```

> From `v2.3.0` `@emotion/react` is a Peer Dependency

## Usage

Add the `TourProvider` at the root of your Application, passing the `steps` of the elements to highlight during the _Tour_.

```js
// ...
import { TourProvider } from '@reactour/tour'

ReactDOM.render(
  <TourProvider steps={steps}>
    <App />
  </TourProvider>,
  document.getElementById('root')
)

const steps = [
  {
    selector: '.first-step',
    content: 'This is my first Step',
  },
  // ...
]
```

Then somewhere down the Application tree, control the Tour using `useTour` hook.

```js
import { useTour } from '@reactour/tour'

function App() {
  const { setIsOpen } = useTour()
  return (
    <>
      <p className="first-step">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent at
        finibus nulla, quis varius justo. Vestibulum lorem lorem, viverra porta
        metus nec, porta luctus orci
      </p>
      <button onClick={() => setIsOpen(true)}>Open Tour</button>
    </>
  )
}
```

## Examples

#### Playground

The [Playground](https://github.com/elrumordelaluz/reactour/tree/master/packages/playground) is the perfect place to play aroud with all `@reactour` _Components_. [Here](https://reactour.vercel.app) is an online version.

#### Sandboxes

- [Using React Router](https://codesandbox.io/s/reactour-tour-demo-using-react-router-dom-kujql)
- [Using React Modal](https://codesandbox.io/s/reactour-tour-demo-using-react-modal-8v0eo)
- [Using Semantic UI Modal](https://codesandbox.io/s/reactour-tour-demo-using-semantic-ui-modal-xmqee)
- [Using React Bootstrap Modal](https://codesandbox.io/s/reactour-tour-demo-using-react-bootstrap-modal-qjws4)
- [Tour with data fetching](https://codesandbox.io/s/tour-with-data-fetching-dv2q0?file=/src/index.js)

[![Edit @reactour/tour Demo Template](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/reactour-tour-demo-template-fglzv?fontsize=14&hidenavigation=1&theme=dark)

> Feel free to make a PR proposing new sandboxes or demos to add in the playground.

## `TourProvider`

### `steps?: StepType[]`

Array of elements to highlight with special info and props.

<details>
  <summary><code>StepType</code></summary>
  
  #### `selector: string | Element`

A string containing one [CSS Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) to match and highlight the at the time of this step.

#### `content: string | ({ setCurrentStep, transition, isHighlightingObserved, currentStep, setIsOpen }) => void`

The content to show inside the _Popover_ at the time of this step. Using a `function` have parameters to use inside content.

#### `position?: 'top' | 'right' | 'bottom' | 'left' | 'center' | [number, number]`

The preferred postion to position the _Popover_ in relation with the highlighted element. Will be automatically calculated in case of unavailable space.

#### `highlightedSelectors?: string[]`

Array of [CSS Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) to be included (by union) in the highlighted region of the _Mask_.

#### `mutationObservables?: string[]`

Array of [CSS Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) that addition or removal will triggered a rerender of the _Mask_ shape.

#### `resizeObservables?: string[]`

Array of [CSS Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) that when resizeing each will triggered a rerender of the _Mask_ shape.

#### `navDotAriaLabel?: string`

String to assign to `aria-label` attribute of the _Dot_ of this step.

#### `stepInteraction?: boolean`

Allow to reenable the interaction for this specific step, when `disableInteraction` (from _TourProvider_) is `true`.

#### `action?: (elem: Element | null) => void`

Action fired when the _Tour_ arrives in this step.

#### `disableActions?: boolean`

Allow to disable all possible actions (interaction with _Mask_, _Navigation Arrows_, _Navigation Dots_, _Close_ button and keyboard events) when the _Tour_ is in this step.

#### `padding?: Padding`

Control padding spaces for this specific step.

#### `bypassElem?: boolean`

Excludes the main `selector` when calculating highlited area if present `highlightedSelectors`.

#### `styles?: StylesObj & PopoverStylesObj & MaskStylesObj`

Customize styles fro this specific step.

</details>

### `components?: PopoverComponentsType`

Prop to customize granurally each Component inside the _Popover_.

#### Components available

| key          | props                                                                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Badge`      | `styles`                                                                                                                                                            |
| `Close`      | `styles`, `onClick`, `disabled`                                                                                                                                     |
| `Content`    | `content`,`setCurrentStep`,`transition`, `isHighlightingObserved`,`currentStep`,`setIsOpen`                                                                         |
| `Navigation` | `styles`,`setCurrentStep`, `steps`, `currentStep`, `disableDots`, `nextButton`, `prevButton`, `setIsOpen`, `hideButtons`, `hideDots`, `disableAll`, `rtl`, `Arrow`, |
| `Arrow`      | `styles`, `inverted`, `disabled`                                                                                                                                    |

<details>
  <summary>Example</summary>

```js
import { components } from '@reactour/tour'

function Badge({ children }) {
  return (
    <components.Badge
      styles={{ badge: base => ({ ...base, backgroundColor: 'red' }) }}
    >
      👉 {children} 👈
    </components.Badge>
  )
}

function Close({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ position: 'absolute', right: 0, top: 0 }}
    >
      x
    </button>
  )
}

const steps = [
  /* ... */
]

export default function App() {
  return (
    <TourProvider steps={steps} components={{ Badge, Close }}>
      {/* ... */}
    </TourProvider>
  )
}
```

</details>

### `styles?: StylesObj & PopoverStylesObj & MaskStylesObj`

Prop to customize styles for the different parts of the _Mask_, _Popover_ and _Tour_ using a function that allows to extend the base styles an take advantage of some state props.

#### Style keys and props available

Refer to [Mask docs](https://github.com/elrumordelaluz/reactour/tree/master/packages/mask) and [Popover docs](https://github.com/elrumordelaluz/reactour/tree/master/packages/popover) for its specific Components

##### Tour Components

| key        | props                               |
| ---------- | ----------------------------------- |
| `badge`    |                                     |
| `controls` |                                     |
| `button`   | `disabled`                          |
| `arrow`    | `disabled`                          |
| `dot`      | `current`, `disabled`, `showNumber` |
| `close`    | `disabled`                          |

<details>
  <summary>Example</summary>

```js
const styles = {
  maskWrapper: base => ({
    ...base,
    color: 'red',
  }),
  highlightedArea: (base, { x, y }) => ({
    ...base,
    x: x + 10,
    y: y + 10,
  }),
  badge: base => ({ ...base, color: 'blue' }),
}
```

</details>

### `padding?: Padding`

<details>
  <summary><small>Type details</small></summary>

```ts
type Padding = number | { mask?: ComponentPadding; popover?: ComponentPadding }

// x and y same value or [x, y] handled separated
type ComponentPadding = number | [number, number]
```

</details>

Extra space to add between the _Mask_ and the _Popover_ and the highlighted element. A single number coordinates both spaces. Otherwise, passing an `Object` specifying the Component space.

### `position?: Position`

<details>
  <summary><small>Type details</small></summary>

```ts
type Position =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'center'
  | [number, number]
  | ((postionsProps: PositionProps) => Position)

type PositionProps = {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
  windowWidth: number
  windowHeight: number
}
```

</details>

Set a global position for the _Popover_ in all steps, fixed in case of `[number, number]`, calculated in case of position `string`

### `setCurrentStep: Dispatch<React.SetStateAction<number>>`

Function to control the _Tour_ current step state.

### `currentStep: number`

Custom _Tour_ current `step` state.

This option could be overrided on specific steps using [`stepInteraction`](#stepinteraction-boolean) prop.

### `disableInteraction?: boolean`

Disables the ability to click or interact in any way with the Highlighted element on every step.

This option could be overrided on specific steps using [`stepInteraction`](#stepinteraction-boolean) prop.

### `disableFocusLock?: boolean`

The _Tour_ uses [FocusScope](https://react-spectrum.adobe.com/react-aria/FocusScope.html) in order to lock the `focus` iteration inside the _Popover_ when _Tour_ is active. This prop allows to disable this behaviour.

### `disableDotsNavigation?: boolean`

Disable interactivity with _Dot_ navigation inside _Popover_.

### `disableKeyboardNavigation?: boolean | KeyboardParts[]`

<details>
  <summary><small>Type details</small></summary>

```ts
type KeyboardParts = 'esc' | 'left' | 'right'
```

</details>

Disable all keyboard navigation events when `true`, disable only selected keys when array.

default: `false`

### `className?: string`

[Class](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class) assigned to _Popover_.

default: `reactour__popover`

### `maskClassName?: string`

[Class](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class) assigned to _Mask_.

default: `reactour__mask`

### `highlightedMaskClassName?: string`

[Class](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class) assigned to highlighted part of _Mask_. Useful when using [`disableInteraction`](#disableinteraction-boolean).

### `nextButton?: (props: BtnFnProps) => void`

### `prevButton?: (props: BtnFnProps) => void`

<details>
  <summary><small>Type details</small></summary>

```ts
type BtnFnProps = {
  Button: React.FC<NavButtonProps>
  setCurrentStep: Dispatch<React.SetStateAction<number>>
  stepsLength: number
  currentStep: number
  setIsOpen: Dispatch<React.SetStateAction<Boolean>>
}

type NavButtonProps = {
  onClick?: () => void
  kind?: 'next' | 'prev'
  hideArrow?: boolean
}
```

</details>

Helper functions to customize the _Next_ and _Prev_ buttons inside _Popover_, with useful parameters. It is possible to use the base `Button` and customize the props.

### `afterOpen?: (target: Element | null) => void`

Action fired just after the _Tour_ is open.

### `beforeClose?: (target: Element | null) => void`

Action fired just before the _Tour_ is closed.

### `onClickMask?: (clickProps: ClickProps) => void`

<details>
  <summary><small>Type details</small></summary>

```ts
type ClickProps = {
  setIsOpen: Dispatch<React.SetStateAction<Boolean>>
  setCurrentStep: Dispatch<React.SetStateAction<number>>
  currentStep: number
  steps: StepType[]
}
```

</details>

Function that overrides the default close behavior of the _Mask_ click handler. Comes with useful parameters to play with.

### `onClickClose?: (clickProps: ClickProps) => void`

<details>
  <summary><small>Type details</small></summary>

```ts
type ClickProps = {
  setIsOpen: Dispatch<React.SetStateAction<Boolean>>
  setCurrentStep: Dispatch<React.SetStateAction<number>>
  currentStep: number
}
```

</details>

Function that overrides the default close behavior of the _Close icon_ click handler. Comes with useful parameters to play with.

### `onClickHighlighted?: MouseEventHandler<SVGRectElement>`

Click handler for highlighted area. Only works when `disableInteraction` is active. Useful in case is needed to avoid `onClickMask` when clicking the highlighted element.

<details>
  <summary>Example</summary>

```jsx
<TourProvider
  steps={steps}
  disableInteraction
  onClickHighlighted={e => {
    e.stopPropagation()
    console.log('No interaction at all')
  }}
>
  {/* ... */}
</TourProvider>
```

</details>

### `badgeContent?: (badgeProps: BadgeProps) => any`

<details>
  <summary><small>Type details</small></summary>

```ts
type BadgeProps = {
  totalSteps: number
  currentStep: number
  transition: boolean
}
```

</details>

Function to customize the content of the _Badge_ using helper parameters like the current and total steps and if the _Tour_ is transitioning between steps.

### `showNavigation?: boolean`

Show or hide the _Navigation_ (_Prev_ and _Next_ buttons and _Dots_) inside _Popover_.

### `showPrevNextButtons?: boolean`

Show or hide _Prev_ and _Next_ buttons inside _Popover_.

### `showCloseButton?: boolean`

Show or hide the _Close_ button inside _Popover_.

### `showBadge?: boolean`

Show or hide the _Badge_ inside _Popover_.

### `scrollSmooth?: boolean`

Activate `smooth` scroll behavior when steps are outside viewport.

default: `false`

### `inViewThreshold?: { x?: number, y?: number } | number`

Tolerance in pixels to add when calculating if the step element is outside viewport to scroll into view.

### `accessibilityOptions?: A11yOptions`

<details>
  <summary><small>Type details</small></summary>

```ts
type A11yOptions = {
  ariaLabelledBy: string
  closeButtonAriaLabel: string
  showNavigationScreenReaders: boolean
}
```

</details>

Configure generic accessibility related attributes like [aria-labelledby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute), [aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) for _Close_ button and if show or hide _Dot_ navigation in screen readers.

### `rtl?: boolean`

Option to navigate and show _Navigation_ in right-to-left mode

### `ContentComponent?: ComponentType<PopoverContentProps>`

Completelly custom component to rendere inside the _Popover_.

<details>
  <summary><small>Type details</small></summary>

```ts
type PopoverContentProps = {
  styles?: StylesObj & PopoverStylesObj & MaskStylesObj
  badgeContent?: (badgeProps: BadgeProps) => any
  components?: PopoverComponentsType
  accessibilityOptions?: A11yOptions
  disabledActions?: boolean
  onClickClose?: (clickProps: ClickProps) => void
  setCurrentStep: Dispatch<React.SetStateAction<number>>
  currentStep: number
  transition?: boolean
  isHighlightingObserved?: boolean
  setIsOpen: Dispatch<React.SetStateAction<Boolean>>
  steps: StepType[]
  showNavigation?: boolean
  showPrevNextButtons?: boolean
  showCloseButton?: boolean
  showBadge?: boolean
  nextButton?: (props: BtnFnProps) => void
  prevButton?: (props: BtnFnProps) => void
  disableDotsNavigation?: boolean
  rtl?: boolean
}
```

</details>

<details>
  <summary>Example</summary>

```js
function ContentComponent(props) {
  const isLastStep = props.currentStep === props.steps.length - 1
  return (
    <div style={{ border: '5px solid red', padding: 10, background: 'white' }}>
      {props.steps[props.currentStep].content}
      <button
        onClick={() => {
          if (isLastStep) {
            props.setIsOpen(false)
          } else {
            props.setCurrentStep(s => s + 1)
          }
        }}
      >
        {isLastStep ? 'x' : '>'}
      </button>
    </div>
  )
}

const steps = [
  /* ... */
]

function App() {
  return (
    <TourProvider
      steps={steps}
      ContentComponent={ContentComponent}
      styles={{ popover: base => ({ ...base, padding: 0 }) }}
    >
      {/* ... */}
    </TourProvider>
  )
}
```

</details>

## `useTour`

Later in any Component down in the tree of _TourProvider_ you can control the _Tour_ in many ways

```jsx
import { useTour } from '@reactour/tour'

function MyComponent() {
  const { isOpen, currentStep, steps, setIsOpen, setCurrentStep } = useTour()
  return (
    <>
      <h1>{isOpen ? 'Welcome to the tour!' : 'Thank you for participate!'}</h1>
      <p>
        Now you are visiting the place {currentStep + 1} of {steps.length}
      </p>
      <nav>
        <button onClick={() => setIsOpen(o => !o)}>Toggle Tour</button>
        <button onClick={() => setCurrentStep(3)}>
          Take a fast way to 4th place
        </button>
        <button
          onClick={() =>
            setSteps([
              { selector: '.new-place-1', content: 'New place 1' },
              { selector: '.new-place-2', content: 'New place 2' },
            ])
            setCurrentStep(1)
          }
        >
          Switch to a new set of places, starting from the last one!
        </button>
      </nav>
    </>
  )
}
```

### `isOpen: Boolean`

Is the _Tour_ open or close

### `currentStep: number`

The current step. **zero based**

### `steps: StepType[]`

The `Array` of steps set currently

### `setIsOpen: Dispatch<React.SetStateAction<Boolean>>`

`SetState` function open or close _Tour_

### `setSteps: Dispatch<React.SetStateAction<StepType[]>>`

`SetState` function to update the `Array` of steps

<!-- disabledActions: false,
  setDisabledActions: () => false, -->

## `withTour`

In case you needed there is an enhacer that allows you to have all `useTour` functionalities through a Higher Order Component.

```jsx
import { Component } from 'react'
import { withTour } from '@reactour/tour'

class MyComponent extends Component {
  render() {
    return (
      <>
        <button onClick={() => this.props.setIsOpen(true)}>Start Tour</button>
        <div>{/* ... */}</div>
      </>
    )
  }
}

export defatult withTour(MyCompnent)
```
