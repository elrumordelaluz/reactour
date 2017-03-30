import React, { Component } from 'react'
import Demo from './Demo'
import Tour from '../index'
import css from './styles.css'
import * as Cx from './helperComponents'
import Text from './Text'
import { Link } from './Button'

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
          scrollOffset={-200} />
      </div>
    )
  }
}

const tourConfig = [
  {
    selector: '[data-tut="reactour__iso"]', 
    content: `Ok, let's start with the name of the Tour that is about to begin.`,
  },
  {
    selector: '[data-tut="reactour__logo"]', 
    content: `And this is our cool bus...`,
  },
  {
    selector: '[data-tut="reactour__copy"]', 
    content: `Keep in mind that you could try and test everithing during the Tour. 
      For example, try selecting the highlighted text…`,
  },
  {
    selector: '[data-tut="reactour__style"]', 
    content: () => (
      <div>        
        <Cx.glitch data-glitch="Styled">Styled</Cx.glitch>
        <Text color="#e5e5e5">
          The <Cx.span>tourist guide</Cx.span> could be dressed in any way, using custom Components and Styles…
        </Text>
        <Text color="#373737" size=".7em" style={{ marginTop: '.7em'}}>
          <Link 
            href="http://codepen.io/lbebber/full/ypgql/" 
            color="dark"
            nospaces>Text effect</Link> by <Link 
            href="https://twitter.com/lucasbebber" 
            color="dark"
            nospaces>Lucas Bebber</Link>
        </Text>
      </div>
    ),
    style: {
      backgroundColor: 'black',
      color: 'white',
    }
  },
  {
    selector: '[data-tut="reactour__stepWildlife"]', 
    content: ({ goTo }) => (
      <div>
        If anyone want go directly to another place, is absolutely possible. 
        <br />Try going back <button onClick={() => goTo(1)}>to the 🚌</button>
      </div>
    )
  },
]

export default App
