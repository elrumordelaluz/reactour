export type StylesKeys = 'popover'

export type StylesObj = {
  [key in StylesKeys]?: StyleFn
}

export type StyleFn = (
  props: { [key: string]: any },
  state?: { [key: string]: any }
) => React.CSSProperties

export type Styles = {
  popover: StyleFn
}

export type StyleKey = keyof Styles

export const defaultStyles: Styles = {
  popover: () => ({
    position: 'fixed',
    maxWidth: 353,
    // minWidth: 150,
    backgroundColor: '#fff',
    padding: '24px 30px',
    boxShadow: '0 0.5em 3em rgba(0, 0, 0, 0.3)',
    color: 'inherit',
    zIndex: 100000,
    transition: 'transform 0.3s',
    top: 0,
    left: 0,
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
