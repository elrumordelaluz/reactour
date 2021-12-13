<p align="center">
  <img alt="Reactour" title="Reactour" src="logo.svg" width="400">
</p>
<p align="center">
  A popover positioned based on certain values
</p>

## Install

```zsh
npm i -S @reactour/popover @emotion/react
# or
yarn add @reacmask/popover @emotion/react
```

> From `v0.3.0` `@emotion/react` is a Peer Dependency

## Usage

```js
import { Popover } from '@reactour/popover'

function App() {
  const sizes = {
    bottom: 0,
    left: 0,
  }

  return (
    <>
      {/* ... */}
      <Popover sizes={sizes}>
    </>
  )
}
```

## `Popover`

### `sizes: RectResult`

<details>
  <summary><small>Type details</small></summary>

```ts
type RectResult = {
  width?: number
  height?: number
  top?: number
  left?: number
  bottom?: number
  right?: number
}
```

</details>

Object containing size and position informations of where to position the _Popover_

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

The position for the _Popover_, fixed in case of `[number, number]`, calculated prefered position in case of `string`

### `padding?: number | [number, number]`

Extra space to add in _Popover_ position calculations. Useful when calculating space from `Element` bounding rect and want to add more space.

### `styles?: StylesObj`

Prop to customize styles for the different parts of the _Mask_ using a function that allows to extend the base styles an take advantage of some state props.

### `className?: string`

[Class](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class) to apply to the _Popover_

#### Style keys and props available

| key       | props |
| --------- | ----- |
| `popover` |       |

### `refresher?: any`

Any value that if changed, updates [rect](../packages/utils#refresher-any) calculations

#### Example

```js
const styles = {
  popover: base => ({
    ...base,
    boxShadow: '0 0 3em rgba(0, 0, 0, 0.5)',
    backgroundColor: '#dedede',
  }),
}
```
