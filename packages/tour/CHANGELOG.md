# @reactour/tour

## 3.7.0

### Minor Changes

- Update popover to last version

## 3.6.3

### Patch Changes

- Fix issue with padding calculations
- Updated dependencies
  - @reactour/popover@1.1.2

## 3.6.2

### Patch Changes

- Update Boolean type to boolean

## 3.6.1

### Patch Changes

- Fix types for `onClickHighlighted`

## 3.6.0

### Minor Changes

- Pass clickProps into `onClickHighlighted` and improve `disableInteraction` with function

## 3.5.0

### Minor Changes

- add option for disable tour when selector falsy

## 3.4.0

### Minor Changes

- Change padding calculations allowing to pass separated values for each side

### Patch Changes

- Updated dependencies
  - @reactour/mask@1.1.0
  - @reactour/popover@1.1.0
  - @reactour/utils@0.5.0

## 3.3.0

### Minor Changes

- Add keybordHandler prop

## 3.2.1

### Patch Changes

- Remove console.log

## 3.2.0

### Minor Changes

- Add props `maskId` and `clipId` to pass into Mask. Thanks to @bachlv for the idea and demo implementation.

## 3.1.11

### Patch Changes

- Fix disableInteraction boolean check. Thanks to @uig-julia

## 3.1.10

### Patch Changes

- Fix step padding to be compared with nullish coalescing instead of OR. Thanks @uig-julia

## 3.1.9

### Patch Changes

- Add meta and setMeta into ClickProps allowing to have global meta info

## 3.1.8

### Patch Changes

- Export missing type

## 3.1.7

### Patch Changes

- Add missing type for StyleObj

## 3.1.6

### Patch Changes

- Rollback performance changes

## 3.1.5

### Patch Changes

- Attemp to improve performance

## 3.1.4

### Patch Changes

- Fix Observable issue
- Updated dependencies
  - @reactour/utils@0.4.7

## 3.1.3

### Patch Changes

- Add missing type

## 3.1.2

### Patch Changes

- Add missing dependency in Observables #500 by @utkarsh-dixit

## 3.1.1

### Patch Changes

- Fix close visual bug

## 3.1.0

### Minor Changes

- Not renders inside a Portal as default, allowing to pass a `Wrapper` to end user.

### Patch Changes

- Updated dependencies
  - @reactour/popover@1.0.5
  - @reactour/utils@0.4.6

## 3.0.5

### Patch Changes

- 57bc37f: Fix export
- Updated dependencies [57bc37f]
  - @reactour/mask@1.0.4
  - @reactour/popover@1.0.4
  - @reactour/utils@0.4.3

## 3.0.4

### Patch Changes

- b3301d2: Attemp to solve react external issue, using tsdx
- Updated dependencies [b3301d2]
  - @reactour/mask@1.0.3
  - @reactour/popover@1.0.3
  - @reactour/utils@0.4.2

## 3.0.3

### Patch Changes

- Fix build step including /dist folder
- Updated dependencies
  - @reactour/mask@1.0.2
  - @reactour/popover@1.0.2
  - @reactour/utils@0.4.1

## 3.0.2

### Patch Changes

- Fix issues related on css-in-js agnostic
- Updated dependencies
  - @reactour/mask@1.0.1
  - @reactour/popover@1.0.1
