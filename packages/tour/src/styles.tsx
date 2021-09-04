export type StylesKeys =
  | 'badge'
  | 'controls'
  | 'navigation'
  | 'button'
  | 'arrow'
  | 'dot'
  | 'close'

export type StylesObj = {
  [key in StylesKeys]?: StyleFn
}

export type StyleFn = (
  props: { [key: string]: any },
  state?: { [key: string]: any }
) => React.CSSProperties

export type Styles = {
  badge: StyleFn
  controls: StyleFn
  navigation: StyleFn
  button: StyleFn
  arrow: StyleFn
  dot: StyleFn
  close: StyleFn
}

export type StyleKey = keyof Styles

export const defaultStyles: Styles = {
  badge: () => ({
    position: 'absolute',
    fontFamily: 'monospace',
    background: 'var(--reactour-accent,#007aff)',
    height: '1.875em',
    lineHeight: 2,
    paddingLeft: '0.8125em',
    paddingRight: '0.8125em',
    fontSize: '1em',
    borderRadius: '1.625em',
    color: 'white',
    textAlign: 'center',
    boxShadow: '0 0.25em 0.5em rgba(0, 0, 0, 0.3)',
    top: '-0.8125em',
    left: '-0.8125em',
  }),
  controls: () => ({
    display: 'flex',
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  navigation: () => ({
    counterReset: 'dot',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  }),
  button: ({ disabled }) => ({
    display: 'block',
    padding: 0,
    border: 0,
    background: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
  }),
  arrow: ({ disabled }) => ({
    color: disabled ? '#caccce' : '#646464',
    width: 16,
    height: 12,
    flex: '0 0 16px',
    '&:hover': {
      color: disabled ? '#caccce' : '#000',
    },
  }),
  dot: ({ current, disabled, showNumber }) => ({
    counterIncrement: 'dot',
    width: 8,
    height: 8,
    border: current ? '0' : '1px solid #caccce',
    borderRadius: '100%',
    padding: 0,
    display: 'block',
    margin: 4,
    transition: 'opacity 0.3s, transform 0.3s',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transform: `scale(${current ? 1.25 : 1})`,
    color: current ? 'var(--reactour-accent, #007aff)' : '#caccce',
    background: current ? 'var(--reactour-accent, #007aff)' : 'none',
    '&:before': {
      content: 'counter(dot)',
      position: 'absolute',
      bottom: 'calc(100% + 0.25em)',
      left: '50%',
      opacity: 0,
      transform: 'translate(-50%, 1em)',
      transition: '0.3s',
      display: showNumber ? 'block' : 'none',
    },
    '&:hover': {
      backgroundColor: 'currentColor',
      '&:before': {
        opacity: 0.5,
        transform: 'translate(-50%, -2px)',
      },
    },
  }),
  close: ({ disabled }) => ({
    position: 'absolute',
    top: 22,
    right: 22,
    width: 9,
    height: 9,
    color: disabled ? '#caccce' : '#5e5e5e',
    '&:hover': {
      color: disabled ? '#caccce' : '#000',
    },
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
