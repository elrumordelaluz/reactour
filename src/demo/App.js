import React, { Component } from 'react'
import Demo from './Demo'
import Tour from '../index'
import css from './styles.css'

class App extends Component {
  constructor () {
    super()
    this.state = { isTourOpen: false }
  }
  
  closeTour = () => {
    this.setState({ isTourOpen: false })
  }
  
  openTour = () => {
    this.setState({ isTourOpen: true })
  }

  render () {
    const { isTourOpen } = this.state
    return (
      <div>
        <Demo openTour={this.openTour} />,
        <Tour 
          onRequestClose={this.closeTour}
          steps={tourConfig}
          isOpen={isTourOpen}
          maskClassName="mask"
          className="helper"
          inViewThreshold={400}
          scrollOffset={-200} />
      </div>
    )
  }
}

const tourConfig = [
  {
    selector: '[data-tut="reactour__iso"]', 
    content: `Let's started by showing you the name of this Library.`
  },
  {
    selector: '[data-tut="reactour__logo"]', 
    content: `Cool, but the VWT2 that transport us it's awesome, isn't it?`
  }
]

export default App
