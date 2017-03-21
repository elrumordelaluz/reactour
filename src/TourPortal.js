import React, { Component, PropTypes } from 'react'
import cn from 'classnames'
import * as h from './helpers'

const CN = {
  mask: {
    base: 'reactour__mask',
    afterOpen: 'reactour__mask--after-open',
    beforeClose: 'reactour__mask--before-close',
  },
  helper: {
    base: 'reactour__helper',
    afterOpen: 'reactour__helper--after-open',
    beforeClose: 'reactour__helper--before-close',
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
  
  static defaultProps = {}
  
  constructor () {
    super()
    
    this.state = {
      isOpen: false,
      afterOpen: false,
      beforeClose: false,
      steps: [],
    }
    
    this.shouldClose = null
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
    const { afterOpen, beforeClose } = this.state
    const { isOpen, onAfterOpen, steps } = this.props
    
    if (afterOpen && beforeClose) {
      this.setState({ beforeClose: false })
    } else {
      this.setState({ isOpen: true }, () => {
        this.setState({ 
          afterOpen: true,
          steps: steps.map(step => ({
            ...h.getNodeRect(document.querySelector(step.selector)),
            content: step.content,
          }))
        })
        
        if (onAfterOpen) {
          onAfterOpen()
        }
      })
    }
  }
  
  close () {
    this.setState({
      beforeClose: false,
      isOpen: false,
      afterOpen: false,
      steps: [],
    }, this.onBeforeClose)
  }
  
  onBeforeClose () {
    const { onBeforeClose } = this.props
    if (onBeforeClose) {
      onBeforeClose()
    }
  }
  
  shouldBeClosed () {
    const { isOpen, beforeClose } = this.state
    return !isOpen && !beforeClose
  }
  
  maskClickHandler = (e) => {
    const { shouldCloseOnMaskClick, onRequestClose } = this.props
    if (this.shouldClose === null) {
      this.shouldClose = true
    }
    if (this.shouldClose && shouldCloseOnMaskClick) {
      onRequestClose(e)
    }
    this.shouldClose = null;
  }
  
  
  render () {
    const { afterOpen, beforeClose } = this.state
    return this.shouldBeClosed() 
      ? <div/> 
      : (
        <div>
          <div 
            ref={c => this.mask = c}
            onClick={this.maskClickHandler}
            className={cn(CN.mask.base, {
              [CN.mask.afterOpen]: afterOpen,
              [CN.mask.beforeClose]: beforeClose,
            })}>
            <span style={maskStyle} />
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div 
            ref={c => this.helper = c}
            className={cn(CN.helper.base, {
              [CN.helper.afterOpen]: afterOpen,
              [CN.helper.beforeClose]: beforeClose,
            })}>
          </div>
        </div>
      )
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

export default TourPortal
