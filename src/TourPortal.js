import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import scrollSmooth from 'scroll-smooth'
import Scrollparent from 'scrollparent'
import {
  Arrow,
  Close,
  Guide,
  Badge,
  TopMask,
  RightMask,
  BottomMask,
  LeftMask,
  ElementMask,
  Controls,
  Navigation,
  Dot,
} from './components/index'
import * as hx from './helpers'

class TourPortal extends Component {
  static propTypes = {
    badgeContent: PropTypes.func,
    elementClassName: PropTypes.string,
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
    showNavigationNumber: PropTypes.bool,
    showNumber: PropTypes.bool,
    startAt: PropTypes.number,
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        selector: PropTypes.string.isRequired,
        content: PropTypes.oneOfType([
          PropTypes.node,
          PropTypes.element,
          PropTypes.func,
        ]).isRequired,
        position: PropTypes.string,
        action: PropTypes.func,
        style: PropTypes.object,
      })
    ),
    update: PropTypes.string,
    updateDelay: PropTypes.number,
  }

  static defaultProps = {
    onAfterOpen: () => {
      document.body.style.overflowY = 'hidden'
    },
    onBeforeClose: () => {
      document.body.style.overflowY = 'auto'
    },
    showNavigation: true,
    showNavigationNumber: true,
    showButtons: true,
    showNumber: true,
    scrollDuration: 1,
    maskSpace: 10,
    updateDelay: 1,
  }

  constructor() {
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

  componentDidMount() {
    const { isOpen } = this.props
    if (isOpen) {
      this.open()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen, update, updateDelay } = this.props

    if (!isOpen && nextProps.isOpen) {
      this.open()
    } else if (isOpen && !nextProps.isOpen) {
      this.close()
    }

    if (isOpen && update !== nextProps.update) {
      if (nextProps.steps[this.state.current]) {
        setTimeout(this.showStep, updateDelay)
      } else {
        this.props.onRequestClose()
      }
    }
  }

  open() {
    const { isOpen, onAfterOpen, startAt } = this.props
    this.setState(
      prevState => ({
        isOpen: true,
        current: startAt !== undefined ? startAt : prevState.current,
      }),
      () => {
        this.showStep()
        this.helper.focus()
        if (onAfterOpen) onAfterOpen()
      }
    )
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
      const config = { attributes: true, childList: true, characterData: true }
      this.setState(
        {
          observer: new MutationObserver(mutations => {
            mutations.forEach(mutation => {
              if (
                mutation.type === 'childList' &&
                mutation.addedNodes.length > 0
              ) {
                const cb = () => stepCallback(mutation.addedNodes[0])
                setTimeout(
                  () =>
                    this.calculateNode(
                      mutation.addedNodes[0],
                      step.position,
                      cb
                    ),
                  100
                )
              } else if (
                mutation.type === 'childList' &&
                mutation.removedNodes.length > 0
              ) {
                const cb = () => stepCallback(node)
                this.calculateNode(node, step.position, cb)
              }
            })
          }),
        },
        () => this.state.observer.observe(target, config)
      )
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
    const w = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )
    const h = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    )
    if (!hx.inView({ ...attrs, w, h, threshold: inViewThreshold })) {
      const parentScroll = Scrollparent(node)
      scrollSmooth.to(node, {
        context: hx.isBody(parentScroll) ? window : parentScroll,
        duration: scrollDuration,
        offset: scrollOffset || -(h / 2),
        callback: nd => {
          this.setState(setNodeSate(nd, this.helper, stepPosition), cb)
        },
      })
    } else {
      this.setState(setNodeSate(node, this.helper, stepPosition), cb)
    }
  }

  close() {
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

  onBeforeClose() {
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
      const nextStep =
        prevState.current < steps.length - 1
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
      const nextStep =
        prevState.current > 0 ? prevState.current - 1 : prevState.current
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
    if (e.keyCode === 27) {
      // esc
      e.preventDefault()
      onRequestClose()
    }
    if (e.keyCode === 39) {
      // rioght
      e.preventDefault()
      this.nextStep()
    }
    if (e.keyCode === 37) {
      // left
      e.preventDefault()
      this.prevStep()
    }
  }

  render() {
    const {
      className,
      steps,
      maskClassName,
      showButtons,
      showNavigation,
      showNavigationNumber,
      showNumber,
      onRequestClose,
      maskSpace,
      lastStepNextButton,
      nextButton,
      prevButton,
      badgeContent,
      elementClassName,
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
            ref={c => (this.mask = c)}
            onClick={this.maskClickHandler}
            className={cn(CN.mask.base, {
              [CN.mask.isOpen]: isOpen,
            })}>
            <TopMask
              targetTop={targetTop}
              padding={maskSpace}
              className={maskClassName}
            />
            <RightMask
              targetTop={targetTop}
              targetLeft={targetLeft}
              targetWidth={targetWidth}
              targetHeight={targetHeight}
              windowWidth={windowWidth}
              padding={maskSpace}
              className={maskClassName}
            />
            <BottomMask
              targetHeight={targetHeight}
              targetTop={targetTop}
              windowHeight={windowHeight}
              padding={maskSpace}
              className={maskClassName}
            />
            <LeftMask
              targetHeight={targetHeight}
              targetTop={targetTop}
              targetLeft={targetLeft}
              padding={maskSpace}
              className={maskClassName}
            />
            <ElementMask
              targetTop={targetTop}
              targetLeft={targetLeft}
              targetWidth={targetWidth}
              targetHeight={targetHeight}
              padding={maskSpace}
              className={elementClassName}
            />
          </div>
          <Guide
            innerRef={c => (this.helper = c)}
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
            style={steps[current].style ? steps[current].style : {}}
            className={cn(CN.helper.base, className, {
              [CN.helper.isOpen]: isOpen,
            })}>
            {steps[current] &&
              (typeof steps[current].content === 'function'
                ? steps[current].content({
                    goTo: this.gotoStep,
                    inDOM,
                    step: current + 1,
                  })
                : steps[current].content)}
            {showNumber && (
              <Badge>
                {typeof badgeContent === 'function' ? (
                  badgeContent(current + 1, steps.length)
                ) : (
                  current + 1
                )}
              </Badge>
            )}
            <Controls>
              {showButtons && (
                <Arrow
                  onClick={this.prevStep}
                  disabled={current === 0}
                  label={prevButton ? prevButton : null}
                />
              )}

              {showNavigation && (
                <Navigation>
                  {steps.map((s, i) => (
                    <Dot
                      key={`${s.selector}_${i}`}
                      onClick={() => this.gotoStep(i)}
                      current={current}
                      index={i}
                      disabled={current === i}
                      showNumber={showNavigationNumber}
                    />
                  ))}
                </Navigation>
              )}

              {showButtons && (
                <Arrow
                  onClick={
                    current === steps.length - 1 ? lastStepNextButton ? (
                      onRequestClose
                    ) : (
                      () => {}
                    ) : (
                      this.nextStep
                    )
                  }
                  disabled={!lastStepNextButton && current === steps.length - 1}
                  inverted
                  label={
                    lastStepNextButton && current === steps.length - 1 ? (
                      lastStepNextButton
                    ) : nextButton ? (
                      nextButton
                    ) : null
                  }
                />
              )}
            </Controls>

            <Close onClick={onRequestClose} />
          </Guide>
        </div>
      )
    }

    return <div />
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
  },
}

const setNodeSate = (node, helper, position) => {
  const w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )
  const h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )
  const { width: helperWidth, height: helperHeight } = hx.getNodeRect(helper)
  const attrs = node
    ? hx.getNodeRect(node)
    : {
        top: h + 10,
        right: w / 2 + 9,
        bottom: h / 2 + 9,
        left: w / 2 - helperWidth / 2,
        width: 0,
        height: 0,
        w,
        h,
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
