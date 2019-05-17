import React, { useState, useReducer, useEffect, useRef, memo } from 'react'
import cn from 'classnames'
import scrollSmooth from 'scroll-smooth'
import Scrollparent from 'scrollparent'
import debounce from 'lodash.debounce'
import useMutationObserver from '@rooks/use-mutation-observer'
import FocusLock from 'react-focus-lock'
import { GlobalStyle } from './style'
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

function checkFnAndRun(fn = null) {
  if (fn && typeof fn === 'function') {
    return function(...args) {
      return fn(...args)
    }
  }
}

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
  onBeforeClose,
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
  const helper = useRef(null)
  const observer = useRef(null)

  useMutationObserver(observer, (mutationList, observer) => {
    if (isOpen) {
      showStep()
      mutationList.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          setTimeout(
            () => makeCalculations(hx.getNodeRect(mutation.addedNodes[0])),
            500
          )
        } else if (
          mutation.type === 'childList' &&
          mutation.removedNodes.length > 0
        ) {
          console.log('Removed node, do something')
        }
      })
    } else {
      observer.disconnect()
    }
  })

  useEffect(() => {
    const debouncedShowStep = debounce(showStep, 100)
    window.addEventListener('keydown', keyHandler, false)
    window.addEventListener('resize', debouncedShowStep, false)

    return () => {
      window.removeEventListener('keydown', keyHandler)
      window.removeEventListener('resize', debouncedShowStep)
    }
  }, [current])

  useEffect(() => {
    if (isOpen) {
      showStep(startAt)
      if (helper.current) {
        helper.current.focus()
        checkFnAndRun(onAfterOpen)(helper.current)
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
      close()
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

  function close(e) {
    checkFnAndRun(onBeforeClose)(helper.current)
    onRequestClose(e)
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

  async function showStep(nextStep) {
    const step = steps[nextStep] || steps[current]
    const { w, h } = hx.getWindow()

    if (step.actionBefore && typeof step.actionBefore === 'function') {
      dispatch({ type: 'without_node', w, h })
      await step.actionBefore()
    }

    const node = step.selector ? document.querySelector(step.selector) : null

    if (step.observe) {
      observer.current = document.querySelector(step.observe)
    }

    if (node) {
      // DOM node exists
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
      dispatch({
        type: 'without_node',
        helperPosition: step.position,
        w,
        h,
        inDOM: false,
      })
    }

    if (step.action && typeof step.action === 'function') {
      await step.action(node)
    }
  }

  function makeCalculations(nodeRect, helperPosition) {
    const { w, h } = hx.getWindow()
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
      close(e)
    }
  }

  const stepContent =
    steps[current] &&
    (typeof steps[current].content === 'function'
      ? steps[current].content({
          close: close,
          goTo,
          inDOM: state.inDOM,
          step: current + 1,
        })
      : steps[current].content)

  return isOpen ? (
    <Portal>
      <GlobalStyle />
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
      <FocusLock>
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
          defaultStyles={!CustomHelper}
          className={cn(CN.helper.base, className, {
            [CN.helper.isOpen]: isOpen,
          })}
        >
          {CustomHelper ? (
            <CustomHelper
              current={current}
              totalSteps={steps.length}
              gotoStep={goTo}
              close={close}
              content={stepContent}
            >
              {children}
            </CustomHelper>
          ) : (
            <>
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
                            ? close
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
            </>
          )}
        </Guide>
      </FocusLock>
    </Portal>
  ) : null
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
        left: action.w / 2 - state.helperWidth / 2,
        width: 0,
        height: 0,
        w: action.w,
        h: action.h,
        helperPosition: 'center',
      }
    default:
      throw new Error()
  }
}

Tour.propTypes = propTypes

Tour.defaultProps = defaultProps

export default memo(Tour)
