export type StylesKeys =
  | 'maskWrapper'
  | 'maskArea'
  | 'maskRect'
  | 'clickArea'
  | 'highlightedArea'

export type StylesObj = {
  [key in StylesKeys]?: StyleFn
}

export type StyleFn = (
  props: { [key: string]: any },
  state?: { [key: string]: any }
) => React.CSSProperties

export type Styles = {
  maskWrapper: StyleFn
  maskArea: StyleFn
  maskRect: StyleFn
  clickArea: StyleFn
  highlightedArea: StyleFn
}

export type StyleKey = keyof Styles

export const defaultStyles: Styles = {
  maskWrapper: () => ({
    opacity: 0.7,
    left: 0,
    top: 0,
    position: 'fixed',
    zIndex: 99999,
    pointerEvents: 'none',
    color: '#000',
  }),
  maskArea: ({ x, y, width, height }) => ({
    x,
    y,
    width,
    height,
    fill: 'black',
    rx: 0,
  }),
  maskRect: ({ windowWidth, windowHeight, maskID }) => ({
    x: 0,
    y: 0,
    width: windowWidth,
    height: windowHeight,
    fill: 'currentColor',
    mask: `url(#${maskID})`,
  }),
  clickArea: ({ windowWidth, windowHeight, top, left, width, height }) => ({
    x: 0,
    y: 0,
    width: windowWidth,
    height: windowHeight,
    fill: 'currentcolor',
    pointerEvents: 'auto',
    clipPath: `polygon(0 0, 0 ${windowHeight}px, ${left}px ${windowHeight}px, ${left}px ${top}px, ${left +
      width}px ${top}px, ${left + width}px ${top + height}px, ${left}px ${top +
      height}px, ${left}px ${windowHeight}px, ${windowWidth}px ${windowHeight}px, ${windowWidth}px 0)`,
  }),
  highlightedArea: ({ x, y, width, height }) => ({
    x,
    y,
    width,
    height,
    pointerEvents: 'auto',
    fill: 'transparent',
    display: 'none',
  }),
}

export type getStylesType = (key: StylesKeys, extra?: any) => {}

export function stylesMatcher(styles: StylesObj) {
  return (key: StyleKey, state: {}): {} => {
    const base = defaultStyles[key](state)
    const custom = styles[key]
    return custom ? custom(base, state) : base
  }
}
