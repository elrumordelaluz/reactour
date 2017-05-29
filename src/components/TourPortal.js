import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import styled from 'styled-components';
import scrollSmooth from 'scroll-smooth';
import Scrollparent from 'scrollparent';

import ComponentSpotLight from 'components/ComponentSpotLight';
import Button from 'components/Button';
import CloseButton from 'components/CloseButton';
import Helper from 'components/Helper';
import HelperControls from 'components/HelperControls';
import Navigation from 'components/Navigation';
import NextButton from 'components/NextButton';
import PrevButton from 'components/PrevButton';

import getNodeRect from 'utils/getNodeRect';
import inView from 'utils/inView';
import isBody from 'utils/isBody';
import setNodeSate from 'utils/setNodeSate';

class TourPortal extends Component {
  static propTypes = {
    className: PropTypes.string,
    closeWithMask: PropTypes.bool,
    inViewThreshold: PropTypes.number,
    isOpen: PropTypes.bool.isRequired,
    lastStepNextButton: PropTypes.string,
    maskClassName: PropTypes.string,
    maskSpace: PropTypes.number,
    nextButton: PropTypes.string,
    onAfterOpen: PropTypes.func,
    onBeforeClose: PropTypes.func,
    onRequestClose: PropTypes.func,
    prevButton: PropTypes.string,
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
    nextButton: 'Next',
    prevButton: 'Prev',
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
    const attrs = getNodeRect(node)
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    if (!inView({...attrs, w, h, threshold: inViewThreshold })) {
      const parentScroll = Scrollparent(node)
      scrollSmooth.to(node, {
        context: isBody(parentScroll) ? window : parentScroll,
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
      lastStepNextButton,
      nextButton,
      prevButton,
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
          <ComponentSpotLight
            refFromParent={c => this.mask = c}
            onClick={this.maskClickHandler}
            isOpen={isOpen}
            targetTop={targetTop}
            targetLeft={targetLeft}
            targetWidth={targetWidth}
            targetHeight={targetHeight}
            windowWidth={windowWidth}
            windowHeight={windowHeight}
            maskSpace={maskSpace}
            maskClassName={maskClassName}
          />
          <Helper
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
            <HelperControls
              current={current}
              prevButton={prevButton}
              prevStep={this.prevStep}
              gotoStep={this.gotoStep}
              steps={steps}
              lastStepNextButton={lastStepNextButton}
              onRequestClose={onRequestClose}
              nextStep={this.nextStep}
              nextButton={nextButton}
              showButtons={showButtons}
              showNavigation={showNavigation}
            />
            <CloseButton onClick={onRequestClose}>✕</CloseButton>
          </Helper>
        </div>
      )
    }

    return <div/>
  }
}

const CN = {
  helper: {
    base: 'reactour__helper',
    isOpen: 'reactour__helper--is-open',
  }
}

export default TourPortal
