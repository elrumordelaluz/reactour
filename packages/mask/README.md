<p align="center">
  <img alt="Reactour" title="Reactour" src="logo.svg" width="400">
</p>
<p align="center">
  An SVG mask that cover all the window contents except the one specified by certain position and sizes values
</p>

## Install

```zsh
npm i -S @reactour/mask @emotion/react
# or
yarn add @reactour/mask @emotion/react
```

> From `v0.3.0` `@emotion/react` is a Peer Dependency

## Usage

```js
import { Mask } from '@reactour/mask'

function App() {
  const sizes = {
    width: 100,
    height: 100,
    top: 100,
    left: 100,
  }

  return (
    <>
      {/* ... */}
      <Mask sizes={sizes} />
    </>
  )
}
```

## `Mask`

### `sizes: RectResult`

<details>
  <summary><small>Type details</small></summary>

```ts
type RectResult = {
  width: number
  height: number
  top: number
  left: number
  bottom?: number
  right?: number
}
```

</details>

Object containing size and position informations of where to position the _Mask_

### `className?: string`

[Class](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class) to apply to the _Mask_ wrapper

### `highlightedAreaClassName?: string`

[Class](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class) to apply to the _Highlighted_ area `rect`

### `padding?: number | [number, number]`

Extra space to add in _Mask_ calculations. Useful when calculating space from `Element` bounding rect and want to add more space.

Single number sets sema space for `x` and `y`, otherwise, an Array sets `[x, y]`.

### `onClick?: MouseEventHandler<HTMLDivElement>`

Click handler for the _Mask_ except the highlighted area.

### `onClickHighlighted?: MouseEventHandler<SVGRectElement>`

Click handler for the _Highlighted_ area.

### `maskId?: string`

String to be assigned to the `<mask />` element, otherwise an automatic unique id is assigned.

### `clipId?: string`

String to be assigned to the `<clipPath />` element, otherwise an automatic unique id is assigned.

### `styles?: StylesObj`

Prop to customize styles for the different parts of the _Mask_ using a function that allows to extend the base styles an take advantage of some state props.

#### Style keys and props available

| key               | props                                   |
| ----------------- | --------------------------------------- |
| `maskArea`        | `x`, `y`, `width`, `height`             |
| `maskRect`        | `windowWidth`, `windowHeight`, `maskID` |
| `clickArea`       | `windowWidth`, `windowHeight`, `clipID` |
| `highlightedArea` | `x`, `y`, `width`, `height`             |

#### Example

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
}
```
