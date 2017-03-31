import React, { Component, PropTypes } from 'react'
import cn from 'classnames'
import styled from 'styled-components'
import scrollSmooth from 'scroll-smooth'
import Scrollparent from 'scrollparent'
import * as C from './components'
import * as hx from './helpers'

class TourPortal extends Component {
  static propTypes = {
    className: PropTypes.string,
    closeWithMask: PropTypes.bool,
    inViewThreshold: PropTypes.number,
    isOpen: PropTypes.bool.isRequired,
    maskClassName: PropTypes.string,
    maskSpace: PropTypes.number,
    onAfterOpen: PropTypes.func,
    onBeforeClose: PropTypes.func,
    onRequestClose: PropTypes.func,
    scrollDuration: PropTypes.number,
    scrollOffset: PropTypes.number,
    showButtons: PropTypes.bool,
    showNavigation: PropTypes.bool,
    showNumber: PropTypes.bool,
    startAt: PropTypes.number,
    steps: PropTypes.arrayOf(PropTypes.shape({
      'selector': PropTypes.string.isRequired,
      'content': PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.element,
        PropTypes.func,
      ]).isRequired,
      'position': PropTypes.string,
      'action': PropTypes.func,
      'style': PropTypes.object,
    })),
    update: PropTypes.string,
  }
  
  static defaultProps = {
    onAfterOpen: () => { document.body.style.overflowY = 'hidden' },
    onBeforeClose: () => { document.body.style.overflowY = 'auto' },
    showNavigation: true,
    showButtons: true,
    showNumber: true,
    scrollDuration: 1,
    maskSpace: 10,
  }
  
  constructor () {
    super()
    this.state = {
      isOpen: false,
      current: 0,
      top: 0, 
      right: 0, 
      bottom: 0, 
      left: 0, 
      width: 0,
      height: 0, 
      w: 0, 
      h: 0,
      inDOM: false,
      observer: null,
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
    
    if (this.props.isOpen && (this.props.update !== nextProps.update)) {
      if (nextProps.steps[this.state.current]) {
        this.showStep()
      } else {
        this.props.onRequestClose()
      }
    }
  }
  
  open () {
    const { isOpen, onAfterOpen, startAt } = this.props
    this.setState(prevState => ({ 
      isOpen: true,
      current: startAt !== undefined ? startAt : prevState.current,
    }), () => {
      this.showStep()
      this.helper.focus()
      if (onAfterOpen) onAfterOpen()
    })
    // TODO: debounce it.
    window.addEventListener('resize', this.showStep, false)
    window.addEventListener('keydown', this.keyDownHandler, false)
  }
  
  showStep = () => {
    const { steps } = this.props
    const { current } = this.state
    const step = steps[current]
    const node = document.querySelector(step.selector) 
    
    const stepCallback = o => {
      if (step.action && typeof step.action === 'function') {
        step.action(o)
      }
    }
    
    if (step.observe) {
      const target = document.querySelector(step.observe)
      const config = { attributes: true, childList: true, characterData: true };
      this.setState({
        observer: new MutationObserver(mutations => {
          mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
              const cb = () => stepCallback(mutation.addedNodes[0])
              setTimeout(() => this.calculateNode(mutation.addedNodes[0], step.position, cb), 100)
            } else if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
              const cb = () => stepCallback(node)
              this.calculateNode(node, step.position, cb)
            }
          })    
        })
      }, () => this.state.observer.observe(target, config))
    } else {
      if (this.state.observer) {
        this.state.observer.disconnect()
        this.setState({
          observer: null,
        })
      }
    }
    
    if (node) {
      const cb = () => stepCallback(node)
      this.calculateNode(node, step.position, cb)
    } else {
      this.setState(setNodeSate(null, this.helper, step.position), stepCallback)
      console.warn(`Doesn't found a DOM node \`${step.selector}\`.
Please check the \`steps\` Tour prop Array at position: ${current + 1}.`)
    }
  }
  
  calculateNode = (node, stepPosition, cb) => {
    const { scrollDuration, inViewThreshold, scrollOffset } = this.props
    const attrs = hx.getNodeRect(node)
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    if (!hx.inView({...attrs, w, h, threshold: inViewThreshold })) {
      const parentScroll = Scrollparent(node)
      scrollSmooth.to(node, {
        context: hx.isBody(parentScroll) ? window : parentScroll,
        duration: scrollDuration,
        offset: scrollOffset || -(h/2),
        callback: nd => {
          this.setState(setNodeSate(nd, this.helper, stepPosition), cb)
        }
      })
    } else {
      this.setState(setNodeSate(node, this.helper, stepPosition), cb)
    }
  }
  
  close () {
    this.setState(prevState => {
      if (prevState.observer) {
        prevState.observer.disconnect()
      }
      return {
        isOpen: false,
        observer: null,
      }
    }, this.onBeforeClose)
    window.removeEventListener('resize', this.showStep)
    window.removeEventListener('keydown', this.keyDownHandler)
  }
  
  onBeforeClose () {
    const { onBeforeClose } = this.props
    if (onBeforeClose) {
      onBeforeClose()
    }
  }
  
  maskClickHandler = e => {
    const { closeWithMask, onRequestClose } = this.props
    if (closeWithMask) {
      onRequestClose(e)
    }
  }
  
  nextStep = () => {
    const { steps } = this.props
    this.setState(prevState => {
      const nextStep = prevState.current < steps.length - 1 
        ? prevState.current + 1
        : prevState.current 
      return {
        current: nextStep,
      }
    }, this.showStep)
  }
  
  prevStep = () => {
    const { steps } = this.props
    this.setState(prevState => {
      const nextStep = prevState.current > 0
        ? prevState.current - 1
        : prevState.current 
      return {
        current: nextStep,
      }
    }, this.showStep)
  }
  
  gotoStep = n => {
    const { steps } = this.props
    this.setState(prevState => {
      const nextStep = steps[n] ? n : prevState.current 
      return {
        current: nextStep,
      }
    }, this.showStep)
  }
  
  keyDownHandler = e => {
    const { onRequestClose } = this.props
    e.stopPropagation()
    if (e.keyCode === 27) { // esc
      e.preventDefault()
      onRequestClose()
    }
    if (e.keyCode === 39) { // rioght
      e.preventDefault()
      this.nextStep()
    }
    if (e.keyCode === 37) { // left
      e.preventDefault()
      this.prevStep()
    }
  }
  
  render () {
    const { 
      className,
      steps, 
      maskClassName,
      showButtons,
      showNavigation,
      showNumber,
      onRequestClose,
      maskSpace,
    } = this.props
    const { 
      isOpen, 
      current,
      inDOM,
      top: targetTop, 
      right: targetRight, 
      bottom: targetBottom, 
      left: targetLeft, 
      width: targetWidth, 
      height: targetHeight, 
      w: windowWidth, 
      h: windowHeight,
      helperWidth, 
      helperHeight,
      helperPosition,
    } = this.state
    
    if (isOpen) {
      return (
        <div>
          <div 
            ref={c => this.mask = c}
            onClick={this.maskClickHandler}
            className={cn(CN.mask.base, {
              [CN.mask.isOpen]: isOpen,
            })}>
            <C.TopMask 
              targetTop={targetTop} 
              padding={maskSpace}
              className={maskClassName} />
            <C.RightMask 
              targetTop={targetTop} 
              targetLeft={targetLeft}
              targetWidth={targetWidth}
              targetHeight={targetHeight}
              windowWidth={windowWidth}
              padding={maskSpace}
              className={maskClassName} />
            <C.BottomMask
              targetHeight={targetHeight}
              targetTop={targetTop} 
              windowHeight={windowHeight}
              padding={maskSpace}
              className={maskClassName} />
            <C.LeftMask
              targetHeight={targetHeight}
              targetTop={targetTop} 
              targetLeft={targetLeft}
              padding={maskSpace}
              className={maskClassName} />
          </div>
          <C.Helper 
            innerRef={c => this.helper = c}
            targetHeight={targetHeight}
            targetWidth={targetWidth}
            targetTop={targetTop} 
            targetRight={targetRight}
            targetBottom={targetBottom}
            targetLeft={targetLeft}
            windowWidth={windowWidth}
            windowHeight={windowHeight}
            helperWidth={helperWidth}
            helperHeight={helperHeight}
            helperPosition={helperPosition}
            padding={maskSpace}
            tabIndex={-1}
            current={current}
            showNumber={showNumber}
            style={steps[current].style ? steps[current].style : {}}
            className={cn(CN.helper.base, className, {
              [CN.helper.isOpen]: isOpen,
            })}>
            { 
              steps[current] && (
                typeof steps[current].content === 'function' 
                  ? steps[current].content({ 
                    goTo: this.gotoStep,
                    inDOM,
                  }) 
                  : steps[current].content
                )
            }
            <C.HelperControls>
              { showButtons && (
                <C.Button 
                  onClick={this.prevStep}
                  disabled={current === 0}>Prev</C.Button>
              )}
              { showNavigation && (
                <C.Navigation>
                  { steps.map((s,i) => (
                    <C.Dot 
                      key={`${s.selector}_${i}`}
                      onClick={() => this.gotoStep(i)}
                      current={current}
                      index={i}
                      disabled={current === i} />
                  ))}
                </C.Navigation>
              )}
              { showButtons && ( 
                <C.Button 
                  onClick={this.nextStep}
                  disabled={current === steps.length - 1}>Next</C.Button>
              )}
            </C.HelperControls>
            <C.CloseButton onClick={onRequestClose}>✕</C.CloseButton>
          </C.Helper>
        </div>
      )
    }
    
    return <div/>
  }
}

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

const setNodeSate = (node, helper, position) => {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  const { width: helperWidth, height: helperHeight } = hx.getNodeRect(helper)
  const attrs = node ? hx.getNodeRect(node) : {
    top: h + 10, 
    right: w/2 + 9,  
    bottom: h/2 + 9, 
    left: w/2 - helperWidth/2, 
    width: 0, height: 0, w, h,
    helperPosition: 'center',
  }
  return function update(state) {
    return {
      w,
      h,
      helperWidth,
      helperHeight,
      helperPosition: position,
      ...attrs,
      inDOM: node ? true : false,
    }
  }
}

export default TourPortal
