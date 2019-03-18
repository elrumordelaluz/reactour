import React, { useState, useReducer, useEffect, createRef } from 'react'
import cn from 'classnames'
import scrollSmooth from 'scroll-smooth'
import Scrollparent from 'scrollparent'

import Portal from './Portal'
import {
  SvgMask,
  Guide,
  Badge,
  Controls,
  Arrow,
  Navigation,
  Dot,
} from './components/index'
import * as hx from './helpers'
import { propTypes, defaultProps } from './propTypes'
import CN from './classNames'

function Tour({
  children,
  isOpen,
  startAt,
  steps,

  scrollDuration,
  inViewThreshold,
  scrollOffset,

  disableInteraction,
  disableKeyboardNavigation,
  className,
  closeWithMask,
  onRequestClose,
  onAfterOpen,
  CustomHelper,
  showNumber,
  accentColor,
  highlightedMaskClassName,
  maskClassName,
  showButtons,
  showNavigation,
  prevButton,
  showNavigationNumber,
  disableDotsNavigation,
  lastStepNextButton,
  nextButton,
}) {
  const [current, setCurrent] = useState(0)
  const [state, dispatch] = useReducer(reducer, initialState)
  const helper = createRef()

  useEffect(() => {
    window.addEventListener('keydown', keyHandler, false)

    return () => {
      window.removeEventListener('keydown', keyHandler)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      open(startAt)
      showStep()
      if (helper.current) {
        helper.current.focus()
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) showStep()
  }, [current])

  function keyHandler(e) {
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
      nextStep()
    }

    if (e.keyCode === 37 && !isLeftDisabled) {
      // left
      e.preventDefault()
      prevStep()
    }
  }

  function open(startAt) {
    const firstStep = startAt || 0
    setCurrent(firstStep)

    if (onAfterOpen) {
      onAfterOpen(helper.current)
    }
  }

  function nextStep() {
    setCurrent(prev => (prev < steps.length - 1 ? prev + 1 : prev))
  }

  function prevStep() {
    setCurrent(prev => (prev > 0 ? prev - 1 : prev))
  }

  function goTo(step) {
    setCurrent(step)
  }

  function showStep() {
    const step = steps[current]
    const node = step.selector ? document.querySelector(step.selector) : null
    if (node) {
      // DOM node exists
      const { w, h } = getWindow()
      const nodeRect = hx.getNodeRect(node)

      // step is outside view
      if (!hx.inView({ ...nodeRect, w, h, threshold: inViewThreshold })) {
        const parentScroll = Scrollparent(node)
        scrollSmooth.to(node, {
          context: hx.isBody(parentScroll) ? window : parentScroll,
          duration: scrollDuration,
          offset: scrollOffset || -(h / 2),
          callback: _node => {
            makeCalculations(hx.getNodeRect(_node), step.position)
          },
        })
      } else {
        makeCalculations(nodeRect, step.position)
      }
    } else {
      // No DOM node
      dispatch({
        type: 'without_node',
        // ...nodeRect,
        helperWidth,
        helperHeight,
        helperPosition: step.position,
        w,
        h,
        inDOM: false,
      })
    }
  }

  function makeCalculations(nodeRect, helperPosition) {
    const { w, h } = getWindow()
    const { width: helperWidth, height: helperHeight } = hx.getNodeRect(
      helper.current
    )
    dispatch({
      type: 'with_node',
      ...nodeRect,
      helperWidth,
      helperHeight,
      helperPosition,
      w,
      h,
      inDOM: true,
    })
  }

  function maskClickHandler(e) {
    if (
      closeWithMask &&
      !e.target.classList.contains(CN.mask.disableInteraction)
    ) {
      onRequestClose(e)
    }
  }

  const stepContent =
    steps[current] &&
    (typeof steps[current].content === 'function'
      ? steps[current].content({
          close: onRequestClose,
          goTo,
          inDOM: state.inDOM,
          step: current + 1,
        })
      : steps[current].content)

  return isOpen ? (
    <Portal>
      <SvgMask
        onClick={maskClickHandler}
        windowWidth={state.w}
        windowHeight={state.h}
        targetWidth={state.width}
        targetHeight={state.height}
        targetTop={state.top}
        targetLeft={state.left}
        padding={10}
        rounded={3}
        className={maskClassName}
        disableInteraction={
          steps[current].stepInteraction === false || disableInteraction
            ? !steps[current].stepInteraction
            : disableInteraction
        }
        disableInteractionClassName={cn(
          CN.mask.disableInteraction,
          highlightedMaskClassName
        )}
      />
      <Guide
        ref={helper}
        windowWidth={state.w}
        windowHeight={state.h}
        targetWidth={state.width}
        targetHeight={state.height}
        targetTop={state.top}
        targetLeft={state.left}
        targetRight={state.right}
        targetBottom={state.bottom}
        helperWidth={state.helperWidth}
        helperHeight={state.helperHeight}
        helperPosition={state.helperPosition}
        padding={10}
        tabIndex={-1}
        current={current}
        style={steps[current].style ? steps[current].style : {}}
        rounded={3}
        accentColor={accentColor}
        className={cn(CN.helper.base, className, {
          [CN.helper.isOpen]: isOpen,
        })}
      >
        {children}
        {stepContent}
        {showNumber && (
          <Badge data-tour-elem="badge">
            {typeof badgeContent === 'function'
              ? badgeContent(current + 1, steps.length)
              : current + 1}
          </Badge>
        )}

        {(showButtons || showNavigation) && (
          <Controls data-tour-elem="controls">
            {showButtons && (
              <Arrow
                onClick={prevStep}
                disabled={current === 0}
                label={prevButton ? prevButton : null}
              />
            )}

            {showNavigation && (
              <Navigation data-tour-elem="navigation">
                {steps.map((s, i) => (
                  <Dot
                    key={`${s.selector ? s.selector : 'undef'}_${i}`}
                    onClick={() => goTo(i)}
                    current={current}
                    index={i}
                    disabled={current === i || disableDotsNavigation}
                    showNumber={showNavigationNumber}
                    data-tour-elem="dot"
                    className={cn(CN.dot.base, {
                      [CN.dot.active]: current === i,
                    })}
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
                disabled={!lastStepNextButton && current === steps.length - 1}
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
      </Guide>
    </Portal>
  ) : null
}

function getWindow() {
  const w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )
  const h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )
  return { w, h }
}

const initialState = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
  w: 0,
  h: 0,
}

function reducer(state, action) {
  switch (action.type) {
    case 'with_node':
      const { type, ...newState } = action
      return { ...state, ...newState }
    case 'without_node':
      return {
        ...state,
        top: state.h + 10,
        right: state.w / 2 + 9,
        bottom: state.h / 2 + 9,
        left: w / 2 - state.helperWidth / 2,
        width: 0,
        height: 0,
        w,
        h,
        helperPosition: 'center',
      }
    default:
      throw new Error()
  }
}

Tour.propTypes = propTypes

Tour.defaultProps = defaultProps

export default Tour
