import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import ExecutionEnvironment from 'exenv'
// import elementClass from 'element-class'
import TourPortal from './TourPortal'

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer
const SafeHTMLElement = ExecutionEnvironment.canUseDOM ? window.HTMLElement : {}

function getParentElement (parentSelector) {
  return parentSelector()
}

class Tour extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    portalClassName: PropTypes.string,
    appElement: PropTypes.instanceOf(SafeHTMLElement),
    onAfterOpen: PropTypes.func,
    onRequestClose: PropTypes.func,
    closeWithMask: PropTypes.bool,
    parentSelector: PropTypes.func
  }
  
  static defaultProps = {
    isOpen: false,
    portalClassName: 'reactour-portal',
    closeWithMask: true,
    parentSelector () { return document.body }
  }
  
  componentDidMount () {
    this.node = document.createElement('div')
    this.node.className = this.props.portalClassName
    const parent = getParentElement(this.props.parentSelector)
    parent.appendChild(this.node)
    this.renderPortal(this.props)
  }
  
  componentWillReceiveProps (nextProps) {
    const currentParent = getParentElement(this.props.parentSelector)
    const newParent = getParentElement(nextProps.parentSelector)
    
    if (newParent !== currentParent) {
      currentParent.removeChild(this.node)
      newParent.appendChild(this.node)
    }
    
    this.renderPortal(nextProps)
  }
  
  componentWillUnmount () {
    this.removePortal()
  }
  
  renderPortal (props) {
    if (props.isOpen) {
      document.body.classList.add('reactour__body')
    } else {
      document.body.classList.remove('reactour__body')
    }
    
    this.portal = renderSubtreeIntoContainer(
      this, 
      <TourPortal {...props} />, 
      this.node
    )
  }
  
  removePortal () {
    ReactDOM.unmountComponentAtNode(this.node)
    const parent = getParentElement(this.props.parentSelector)
    parent.removeChild(this.node)
    document.body.classList.remove('reactour__body')
  }
  
  render () {
    return null
  }
}

export default Tour
