import React, { Component } from 'react'
import Tour from '../index'

class App extends Component {
  constructor () {
    super()
    this.state = { showTutorial: false }
    this.openTutorial = this.openTutorial.bind(this)
    this.closeTutorial = this.closeTutorial.bind(this)
  }
  
  openTutorial () {
    this.setState({
      showTutorial: true
    })
  }
  
  closeTutorial () {
    this.setState({
      showTutorial: false
    })
  }
  
  render () {
    const { showTutorial } = this.state
    
    return (
      <div style={wrapperStyle}>
        <header style={headerStyle}>
          <button onClick={this.openTutorial}>Open Tutorial</button>
        </header>
        <div style={bodyStyle}>
          <main style={contentStyle}>
            <section style={{ height: '100vh' }}>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat assumenda quod est, itaque cupiditate ipsa quidem molestiae, quasi mollitia omnis doloremque ex saepe dolor aliquam nemo. Impedit at exercitationem, culpa voluptatum quisquam omnis repudiandae ad unde sint maiores! Eligendi facere, distinctio autem dolorum quo sunt cupiditate in, quas commodi porro consectetur dolorem temporibus quasi labore doloremque ipsam perferendis id modi voluptatibus rem ad laudantium officiis cum a molestiae. Odio necessitatibus non facilis culpa deserunt nulla adipisci fuga dolorum ratione a, libero maxime similique, officia? Veritatis, inventore harum. Sint ex fuga placeat optio eligendi quam doloribus, dolorum quia maiores obcaecati atque eaque veritatis adipisci sequi non voluptas ducimus tempore quo laudantium temporibus distinctio. Autem iste quos sit. Consequuntur expedita dolorem itaque enim corporis veritatis repudiandae nisi tempore molestias rem quaerat facere voluptatibus autem quis ducimus earum maiores reprehenderit ad, quo accusantium? Accusantium consectetur alias placeat odio, dignissimos tenetur, iure aliquam modi quod debitis obcaecati molestiae vero magni aspernatur! Quo minima, nam at numquam ab fugit ullam voluptatibus veritatis temporibus aut repudiandae accusamus suscipit vel veniam accusantium eligendi omnis sed. Nihil explicabo eligendi, pariatur numquam eum tempora cum quibusdam, tempore, quasi voluptatum corporis fugiat atque saepe aperiam sit voluptas commodi nemo magnam.</p>
            </section>
            <section style={{ height: '100vh' }}>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat assumenda quod est, itaque cupiditate ipsa quidem molestiae, quasi mollitia omnis doloremque ex saepe dolor aliquam nemo. Impedit at exercitationem, culpa voluptatum quisquam omnis repudiandae ad unde sint maiores! Eligendi facere, distinctio autem dolorum quo sunt cupiditate in, quas commodi porro consectetur dolorem temporibus quasi labore doloremque ipsam perferendis id modi voluptatibus rem ad laudantium officiis cum a molestiae. Odio necessitatibus non facilis culpa deserunt nulla adipisci fuga dolorum ratione a, libero maxime similique, officia? Veritatis, inventore harum. Sint ex fuga placeat optio eligendi quam doloribus, dolorum quia maiores obcaecati atque eaque veritatis adipisci sequi non voluptas ducimus tempore quo laudantium temporibus distinctio. Autem iste quos sit. Consequuntur expedita dolorem itaque enim corporis veritatis repudiandae nisi tempore molestias rem quaerat facere voluptatibus <span data-tut="2">autem</span> quis ducimus earum maiores reprehenderit ad, quo accusantium? Accusantium consectetur alias placeat odio, dignissimos tenetur, iure aliquam modi quod debitis obcaecati molestiae vero magni aspernatur! Quo minima, nam at numquam ab fugit ullam voluptatibus veritatis temporibus aut repudiandae accusamus suscipit vel veniam accusantium eligendi omnis sed. Nihil explicabo eligendi, pariatur numquam eum tempora cum quibusdam, tempore, quasi voluptatum corporis fugiat atque saepe aperiam sit voluptas commodi nemo magnam.</p>
            </section>
          </main>
          <nav 
            style={{
              ...sideStyle,
              ...navStyle,
            }}>
            <button 
              data-tut="1"
              style={buttonStyle}>Button</button>
          </nav>
          <aside style={sideStyle}>
            ciao
          </aside>
        </div>
        <footer>
          
        </footer>
        <Tour 
          onAfterOpen={() => console.log('8698670')}
          onBeforeClose={() => console.log('-----')}
          onRequestClose={this.closeTutorial}
          steps={[
            { 
              selector: '[data-tut="1"]', 
              content: 'step 1'
            },
            { 
              selector: '[data-tut="2"]', 
              content: 'step 2'
            }
          ]}
          isOpen={showTutorial}/>
      </div>
    )
  }
}

const wrapperStyle = {
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  marginTop: '1em'
}

const headerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: '#131313',
  color: 'white',
}

const bodyStyle = {
  display: 'flex',
  flex: 1,
}

const contentStyle = {
  flex: 1,
}

const sideStyle = {
  flex: '0 0 12em',
}

const navStyle = {
  order: -1,
}

const buttonStyle = {
  width: '80%',
  border: 0,
  padding: '1em',
  margin: '2em auto',
  display: 'block',
}

export default App
