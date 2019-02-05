import { Component } from 'react'
import { createPortal } from 'react-dom'

class Portal extends Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.el.setAttribute('id', '___reactour')
  }

  componentDidMount() {
    document.body.appendChild(this.el)
  }

  componentWillUnmount() {
    document.body.removeChild(this.el)
  }

  render() {
    return createPortal(this.props.children, this.el)
  }
}

export default Portal
