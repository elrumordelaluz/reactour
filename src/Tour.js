import React, { Component, createRef } from 'react'
import cn from 'classnames'
import scrollSmooth from 'scroll-smooth'
import Scrollparent from 'scrollparent'
import debounce from 'lodash.debounce'
import FocusLock from 'react-focus-lock'
import { GlobalStyle } from './style'
import {
  Arrow,
  Close,
  Guide,
  Badge,
  Controls,
  Navigation,
  Dot,
  SvgMask,
} from './components/index'
import Portal from './Portal'
import * as hx from './helpers'
import { propTypes, defaultProps } from './propTypes'
import CN from './classNames'

class Tour extends Component {
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
      focusUnlocked: false,
    }
    this.helper = createRef()
    this.helperElement = null
    this.debouncedShowStep = debounce(this.showStep, 70)
  }

  componentDidMount() {
    const { isOpen, startAt } = this.props
    if (isOpen) {
      this.open(startAt)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isOpen, update, updateDelay } = this.props

    if (!isOpen && nextProps.isOpen) {
      this.open(nextProps.startAt)
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

    if (
      isOpen &&
      nextProps.isOpen &&
      this.state.current !== nextProps.goToStep
    ) {
      this.gotoStep(nextProps.goToStep)
    }
  }

  componentWillUnmount() {
    const { isOpen } = this.props
    if (isOpen) {
      this.close()
    }
    if (this.state.observer) {
      this.state.observer.disconnect()
    }
  }

  open(startAt) {
    const { onAfterOpen } = this.props
    this.setState(
      prevState => ({
        isOpen: true,
        current: startAt !== undefined ? startAt : prevState.current,
      }),
      () => {
        setTimeout(this.showStep, 1)
        this.helperElement = this.helper.current
        this.helper.current.focus()
        if (onAfterOpen) {
          onAfterOpen(this.helperElement)
        }
      }
    )

    window.addEventListener('resize', this.debouncedShowStep, false)
    window.addEventListener('keydown', this.keyDownHandler, false)
  }

  unlockFocus = callback => {
    this.setState(
      {
        focusUnlocked: true,
      },
      callback()
    )
  }

  showStep = () => {
    const { steps } = this.props
    const { current, focusUnlocked } = this.state
    if (focusUnlocked) {
      this.setState({
        focusUnlocked: false,
      })
    }
    const step = steps[current]
    const node = step.selector ? document.querySelector(step.selector) : null

    const stepCallback = o => {
      if (step.action && typeof step.action === 'function') {
        this.unlockFocus(() => step.action(o))
      }
    }

    if (step.observe) {
      const target = document.querySelector(step.observe)
      const config = { attributes: true, childList: true, characterData: true }
      this.setState(
        prevState => {
          if (prevState.observer) {
            setTimeout(() => {
              prevState.observer.disconnect()
            }, 0)
          }
          return {
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
          }
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
      this.setState(
        setNodeState(null, this.helper.current, step.position),
        stepCallback
      )

      step.selector &&
        console.warn(
          `Doesn't find a DOM node '${step.selector}'. Please check the 'steps' Tour prop Array at position ${current}.`
        )
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
      const offset = scrollOffset
        ? scrollOffset
        : attrs.height > h
        ? -25
        : -(h / 2) + attrs.height / 2
      scrollSmooth.to(node, {
        context: hx.isBody(parentScroll) ? window : parentScroll,
        duration: scrollDuration,
        offset,
        callback: nd => {
          this.setState(setNodeState(nd, this.helper.current, stepPosition), cb)
        },
      })
    } else {
      this.setState(setNodeState(node, this.helper.current, stepPosition), cb)
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
    window.removeEventListener('resize', this.debouncedShowStep)
    window.removeEventListener('keydown', this.keyDownHandler)
  }

  onBeforeClose() {
    const { onBeforeClose } = this.props
    if (onBeforeClose) {
      onBeforeClose(this.helperElement)
    }
  }

  maskClickHandler = e => {
    const { closeWithMask, onRequestClose } = this.props
    if (
      closeWithMask &&
      !e.target.classList.contains(CN.mask.disableInteraction)
    ) {
      onRequestClose(e)
    }
  }

  nextStep = () => {
    const { steps, getCurrentStep } = this.props
    this.setState(prevState => {
      const nextStep =
        prevState.current < steps.length - 1
          ? prevState.current + 1
          : prevState.current

      if (typeof getCurrentStep === 'function') {
        getCurrentStep(nextStep)
      }

      return {
        current: nextStep,
      }
    }, this.showStep)
  }

  prevStep = () => {
    const { getCurrentStep } = this.props
    this.setState(prevState => {
      const nextStep =
        prevState.current > 0 ? prevState.current - 1 : prevState.current

      if (typeof getCurrentStep === 'function') {
        getCurrentStep(nextStep)
      }

      return {
        current: nextStep,
      }
    }, this.showStep)
  }

  gotoStep = n => {
    const { steps, getCurrentStep } = this.props
    this.setState(prevState => {
      const nextStep = steps[n] ? n : prevState.current

      if (typeof getCurrentStep === 'function') {
        getCurrentStep(nextStep)
      }

      return {
        current: nextStep,
      }
    }, this.showStep)
  }

  keyDownHandler = e => {
    const {
      onRequestClose,
      nextStep,
      prevStep,
      disableKeyboardNavigation,
      showCloseButton,
    } = this.props
    e.stopPropagation()

    if (disableKeyboardNavigation === true) {
      return
    }

    let isEscDisabled, isRightDisabled, isLeftDisabled

    if (disableKeyboardNavigation) {
      isEscDisabled = disableKeyboardNavigation.includes('esc')
      isRightDisabled = disableKeyboardNavigation.includes('right')
      isLeftDisabled = disableKeyboardNavigation.includes('left')
    }

    if (e.keyCode === 27 && !isEscDisabled) {
      // esc
      e.preventDefault()
      onRequestClose()
    }

    if (e.keyCode === 39 && !isRightDisabled) {
      // right
      e.preventDefault()
      typeof nextStep === 'function' ? nextStep() : this.nextStep()
    }

    if (e.keyCode === 37 && !isLeftDisabled) {
      // left
      e.preventDefault()
      typeof prevStep === 'function' ? prevStep() : this.prevStep()
    }
  }

  render() {
    const {
      className,
      steps,
      maskClassName,
      showButtons,
      showCloseButton,
      showNavigation,
      showNavigationNumber,
      showNumber,
      onRequestClose,
      maskSpace,
      lastStepNextButton,
      nextButton,
      prevButton,
      badgeContent,
      highlightedMaskClassName,
      disableInteraction,
      disableDotsNavigation,
      nextStep,
      prevStep,
      rounded,
      accentColor,
      CustomHelper,
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
      focusUnlocked,
    } = this.state

    if (isOpen) {
      return (
        <Portal>
          <GlobalStyle />
          <SvgMask
            className={cn(CN.mask.base, maskClassName, {
              [CN.mask.isOpen]: isOpen,
            })}
            onClick={this.maskClickHandler}
            forwardRef={c => (this.mask = c)}
            windowWidth={windowWidth}
            windowHeight={windowHeight}
            targetWidth={targetWidth}
            targetHeight={targetHeight}
            targetTop={targetTop}
            targetLeft={targetLeft}
            padding={maskSpace}
            rounded={rounded}
            className={maskClassName}
            disableInteraction={
              steps[current].stepInteraction === false || disableInteraction
                ? !steps[current].stepInteraction
                : disableInteraction
            }
            disableInteractionClassName={`${CN.mask.disableInteraction} ${highlightedMaskClassName}`}
          />
          <FocusLock disabled={focusUnlocked}>
            <Guide
              ref={this.helper}
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
              rounded={rounded}
              className={cn(CN.helper.base, className, {
                [CN.helper.isOpen]: isOpen,
              })}
              accentColor={accentColor}
              defaultStyles={!CustomHelper}
            >
              {CustomHelper ? (
                <CustomHelper
                  current={current}
                  totalSteps={steps.length}
                  gotoStep={this.gotoStep}
                  close={onRequestClose}
                  content={
                    steps[current] &&
                    (typeof steps[current].content === 'function'
                      ? steps[current].content({
                          close: onRequestClose,
                          goTo: this.gotoStep,
                          inDOM,
                          step: current + 1,
                        })
                      : steps[current].content)
                  }
                >
                  {this.props.children}
                </CustomHelper>
              ) : (
                <>
                  {this.props.children}
                  {steps[current] &&
                    (typeof steps[current].content === 'function'
                      ? steps[current].content({
                          close: onRequestClose,
                          goTo: this.gotoStep,
                          inDOM,
                          step: current + 1,
                        })
                      : steps[current].content)}
                  {showNumber && (
                    <Badge data-tour-elem="badge" accentColor={accentColor}>
                      {typeof badgeContent === 'function'
                        ? badgeContent(current + 1, steps.length)
                        : current + 1}
                    </Badge>
                  )}
                  {(showButtons || showNavigation) && (
                    <Controls data-tour-elem="controls">
                      {showButtons && (
                        <Arrow
                          onClick={
                            typeof prevStep === 'function'
                              ? prevStep
                              : this.prevStep
                          }
                          disabled={current === 0}
                          label={prevButton ? prevButton : null}
                        />
                      )}

                      {showNavigation && (
                        <Navigation data-tour-elem="navigation">
                          {steps.map((s, i) => (
                            <Dot
                              key={`${s.selector ? s.selector : 'undef'}_${i}`}
                              onClick={() => this.gotoStep(i)}
                              current={current}
                              index={i}
                              accentColor={accentColor}
                              disabled={current === i || disableDotsNavigation}
                              showNumber={showNavigationNumber}
                              data-tour-elem="dot"
                              className={cn(CN.dot.base, {
                                [CN.dot.active]: current === i,
                              })}
                              aria-label={s.navDotAriaLabel}
                            />
                          ))}
                        </Navigation>
                      )}

                      {showButtons && (
                        <Arrow
                          onClick={
                            current === steps.length - 1
                              ? lastStepNextButton
                                ? onRequestClose
                                : () => {}
                              : typeof nextStep === 'function'
                              ? nextStep
                              : this.nextStep
                          }
                          disabled={
                            !lastStepNextButton && current === steps.length - 1
                          }
                          inverted
                          label={
                            lastStepNextButton && current === steps.length - 1
                              ? lastStepNextButton
                              : nextButton
                              ? nextButton
                              : null
                          }
                        />
                      )}
                    </Controls>
                  )}

                  {showCloseButton ? <Close onClick={onRequestClose} /> : null}
                </>
              )}
            </Guide>
          </FocusLock>
        </Portal>
      )
    }

    return null
  }
}

const setNodeState = (node, helper, position) => {
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
  return function update() {
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

Tour.propTypes = propTypes

Tour.defaultProps = defaultProps

export default Tour
