<p align="center">
  <img alt="Reactour" title="Reactour" src="https://raw.githubusercontent.com/elrumordelaluz/reactour/master/packages/utils/logo.svg" width="400">
</p>
<p align="center">
  A set of utilities used by <code>@reactour</code> packages
</p>

## Install

```zsh
npm i -S @reactour/utils
# or
yarn add @reacmask/utils
```

## `Portal`

A handy Portal Component

### `type?: string`

The type of Element to render in the DOM

```js
import { Portal } from '@reactour/utils'
function App() {
  return <Portal type="div">{/* ...*/}</Portal>
}
```

## `Observables`

A component used by _Tour_ to handle Mutation and Resize Observer.

### `mutationObservables?: string[]`

`Array` of [CSS Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) to track mutations

### `resizeObservables?: string[]`

`Array` of [CSS Selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) to track resizing

### `refresh?: any`

Function to fire on each mutation update

```js
import { Portal } from '@reactour/utils'
function App() {
  function refresh() {
    console.log('mutated!')
  }
  return (
    <>
      <p className="mutation-elem">Vestibulum maximus vitae </p>
      <textarea
        className="resize-elem"
        defaultValue="Vestibulum maximus vitae"
      />
      <Observables
        resizeObservables={['.resize-elem']}
        mutationObservables={['.mutation-elem']}
        refresh={refresh}
      />
      {/* ...*/}
    </>
  )
}
```

## `useRect({ ref, refresher })`

Calculates Element [Bounding Rect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) by `ref` provided

### `ref?: React.RefObject<T>`

Ref attached at the element

### `refresher?: any`

Any value that if changed, updates calculations

```js
import { useRef } from 'react'
import { useRect } from '@reactour/utils'
function App() {
  const ref = useRef(null)
  const sizes = useRect(ref)
  return (
    <>
      <p ref={ref}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      {/* ...*/}
    </>
  )
}
```

## `useElemRect({ elem, refresher })`

Same as `useRect` but providing an [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)

### `elem?: Element`

DOM [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)

### `refresher?: any`

Any value that if changed, updates calculations

```js
import { useElemRect } from '@reactour/utils'
function App() {
  const elem = document.querySelector('.elem')
  const sizes = useElemRect(elem)
  return (
    <>
      <p class="elem">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      {/* ...*/}
    </>
  )
}
```

## More Utils

### `getRect(element?:Element): RectResult`

<details>
  <summary><small>Type details</small></summary>

```ts
type RectResult = {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
}
```

</details>

Get Element [Bounding Rect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) from [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)

```js
const elem = documet.querySelector('.elem')
const sizes = getRect(elem)
```

### `getWindow(): { w: number; h: number }`

Get window `width` and `height`

```js
import { getWindow } from '@reactour/utils'

const { w, h } = getWindow()
```

### `inView(args: InViewArgs): boolean`

<details>
  <summary><small>Type details</small></summary>

```ts
type InViewArgs = {
  width: number
  height: number
  top: number
  left: number
  bottom?: number
  right?: number
  threshold?: { x: number, y: number } | number
}
```

</details>

Check if position values are in viewport

```js
import { inView } from '@reactour/utils'

const isInView = inView({ top: 10, right: 10, bottom: 10, left: 10 })
```

### `smoothScroll(elem: Element | null, options: ScrollIntoViewOptions)`

Scroll DOM Element into view using native `smooth` behavior with a callback when scroll finishes

```js
const elem = documet.querySelector('.elem')

smoothScroll(elem).then(() => {
  console.log('Scrolled!')
})
```
