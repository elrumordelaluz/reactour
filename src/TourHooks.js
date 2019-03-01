import React, { useState, useReducer, useEffect, createRef } from 'react'
import PropTypes from 'prop-types'
import scrollSmooth from 'scroll-smooth'
import Scrollparent from 'scrollparent'

import Portal from './Portal'
import { SvgMask, Guide } from './components/index'
import * as hx from './helpers'

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

  closeWithMask,
  onRequestClose,
  onAfterOpen,
  CustomHelper,
}) {
  const [current, setCurrent] = useState(0)
  const [state, dispatch] = useReducer(reducer, initialState)
  const helper = createRef()

  useEffect(() => {
    window.addEventListener('keydown', keyHandler, false)
    return () => window.removeEventListener('keydown', keyHandler)
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
    if (isOpen) {
      showStep()
    }
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
    })
  }

  function maskClickHandler(e) {
    onRequestClose(e)
  }
  console.log({ steps, current })

  return isOpen ? (
    <Portal>
      <div className="mask" onClick={maskClickHandler}>
        <SvgMask
          windowWidth={state.w}
          windowHeight={state.h}
          targetWidth={state.width}
          targetHeight={state.height}
          targetTop={state.top}
          targetLeft={state.left}
          padding={10}
          rounded={3}
          className={'maskClassName'}
          disableInteraction={
            steps[current].stepInteraction === false || disableInteraction
              ? !steps[current].stepInteraction
              : disableInteraction
          }
        />
      </div>
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
        className={'hjkh'}
        accentColor={'#f00'}
      >
        {children}
        {steps[current] &&
          (typeof steps[current].content === 'function'
            ? steps[current].content({
                close: onRequestClose,
                // goTo: this.gotoStep,
                // inDOM:,
                step: current + 1,
              })
            : steps[current].content)}
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

Tour.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  startAt: PropTypes.number,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      selector: PropTypes.string,
      content: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.element,
        PropTypes.func,
      ]).isRequired,
      position: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'center']),
      action: PropTypes.func,
      style: PropTypes.object,
      stepInteraction: PropTypes.bool,
    })
  ),
  inViewThreshold: PropTypes.number,
  scrollDuration: PropTypes.number,
}

Tour.defaultProps = {
  startAt: 0,
  scrollDuration: 100,
}

export default Tour
