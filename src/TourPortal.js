import React, { Component, PropTypes } from 'react'
import cn from 'classnames'
import * as h from './helpers'

const CN = {
  mask: {
    base: 'reactour__mask',
    isOpen: 'reactour__mask--is-open',
  },
  helper: {
    base: 'reactour__helper',
    isOpen: 'reactour__helper--is-open',
  }
}

class TourPortal extends Component {
  static propTypes = {
    className: PropTypes.string,
    current: PropTypes.number,
    delay: PropTypes.number,
    isOpen: PropTypes.bool.isRequired,
    maskClassName: PropTypes.string,
    onAfterOpen: PropTypes.func,
    onBeforeClose: PropTypes.func,
    onRequestClose: PropTypes.func,
    shouldCloseOnMaskClick: PropTypes.bool,
    steps: PropTypes.arrayOf(PropTypes.shape({
      'selector': PropTypes.string.isRequired,
      'content': PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.element,
      ]).isRequired,
    })),
  }
  
  static defaultProps = {
    onAfterOpen: () => { document.body.style.overflowY = 'hidden' },
    onBeforeClose: () => { document.body.style.overflowY = 'auto' },
  }
  
  constructor () {
    super()
    this.state = {
      isOpen: false,
      steps: [],
      current: 1,
    }
  }
  
  componentDidMount () {
    const { isOpen } = this.props
    if (isOpen) {
      this.open()
    }
  }
  
  componentWillReceiveProps (nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.open()
    } else if (this.props.isOpen && !nextProps.isOpen){
      this.close()
    }
  }
  
  open () {
    const { isOpen, onAfterOpen, steps } = this.props
    
    this.setState({ isOpen: true }, () => {
      this.setState({ 
        steps: steps.map(step => ({
          ...h.getNodeRect(document.querySelector(step.selector)),
          content: step.content,
        }))
      })
      
      if (onAfterOpen) onAfterOpen()
    })
  }
  
  close () {
    this.setState({
      isOpen: false,
      steps: [],
    }, this.onBeforeClose)
  }
  
  onBeforeClose () {
    const { onBeforeClose } = this.props
    if (onBeforeClose) {
      onBeforeClose()
    }
  }
  
  maskClickHandler = (e) => {
    const { shouldCloseOnMaskClick, onRequestClose } = this.props
    if (shouldCloseOnMaskClick) {
      onRequestClose(e)
    }
  }
  
  getStepPosition (number) {
    const { steps } = this.state
    if (steps.length) {
      const { top, right, bottom, left, width, height } = steps[number]
      return { top, right, bottom, left, width, height }
    }
    
    return {
      top: 0, right: 0, bottom: 0, left: 0, 
      width: 0, height: 0,
    }
  }
  
  maskPosition ({ top, right, bottom, left, width, height }) {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    const padding = 10
    const helperDistance = 10
    
    return {
      masksPositions: {
        top: {
          ...maskStyle,
          height: top - padding,
        },
        right: {
          ...maskStyle,
          top: top - padding,
          left: left + width + padding,
          width: w - width - left - padding,
          height: height + (padding * 2),
        },
        bottom: {
          ...maskStyle,
          top: height + top + padding,
          height: h + height - top - padding,
        },
        left: {
          ...maskStyle,
          top: top - padding,
          width: left - padding,
          height: height + (padding * 2),
        },
      },
      helperPosition: {
        top: top + height / 2,
        left: left + width + padding + helperDistance,
      }
    }
  }
  
  elementPosition () {
    const { steps, current } = this.state
    const { top, right, bottom, left, width, height } = steps[current]
    return { top, right, bottom, left, width, height }
  }
  
  render () {
    const { isOpen, steps } = this.state
    if (isOpen && steps.length) {
      const { top, right, bottom, left, width, height } = this.elementPosition()
      const { masksPositions, helperPosition } = this.maskPosition(this.elementPosition())
      return (
        <div>
          <div 
            ref={c => this.mask = c}
            onClick={this.maskClickHandler}
            className={cn(CN.mask.base, {
              [CN.mask.isOpen]: isOpen,
            })}>
            <span style={masksPositions.top} />
            <span style={masksPositions.right} />
            <span style={masksPositions.bottom} />
            <span style={masksPositions.left} />
          </div>
          <div 
            ref={c => this.helper = c}
            style={{
              ...helperStyle,
              ...helperPosition,
            }}
            className={cn(CN.helper.base, {
              [CN.helper.isOpen]: isOpen,
          })}>hola</div>
        </div>
      )
    }
    
    return <div/>
  }
}

const maskStyle = {
  backgroundColor: 'rgba(0,0,0,.85)',
  width: '100%',
  left: 0,
  top: 0,
  height: '100%',
  position: 'fixed',
}

const helperStyle = {
  position: 'fixed',
  backgroundColor: '#fff',
  transition: '.3s',
  padding: '.6em',
  boxShadow: '0 .5em 3em rgba(0,0,0,.3)',
  transform: 'translateY(-50%)',
  width: '200px',
  height: '200px',
}

export default TourPortal
