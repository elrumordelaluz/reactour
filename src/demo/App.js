import React, { Component } from 'react'
import Tour from '../index'
import styled from 'styled-components'

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
      <Wrapper>
        <Header>
          <button onClick={this.openTutorial}>Open Tutorial</button>
        </Header>
        <Main>
          <Section>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat assumenda quod est, itaque cupiditate ipsa quidem molestiae, quasi mollitia omnis doloremque ex saepe dolor aliquam nemo. Impedit at exercitationem, culpa voluptatum quisquam omnis repudiandae ad unde sint maiores! Eligendi facere, distinctio autem dolorum quo sunt cupiditate in, quas commodi porro consectetur dolorem temporibus quasi labore doloremque ipsam perferendis id modi voluptatibus rem ad laudantium officiis cum a molestiae. Odio necessitatibus non facilis culpa deserunt nulla adipisci fuga dolorum ratione a, libero maxime similique, officia? Veritatis, inventore harum. Sint ex fuga placeat optio eligendi quam doloribus, dolorum quia maiores obcaecati atque eaque veritatis adipisci sequi non voluptas ducimus tempore quo laudantium temporibus distinctio. Autem iste quos sit. Consequuntur expedita dolorem itaque enim corporis veritatis repudiandae nisi tempore molestias rem quaerat facere voluptatibus autem quis ducimus earum maiores reprehenderit ad, quo accusantium? Accusantium consectetur alias placeat odio, dignissimos tenetur, iure aliquam modi quod debitis obcaecati molestiae vero magni aspernatur! Quo minima, nam at numquam ab fugit ullam voluptatibus veritatis temporibus aut repudiandae accusamus suscipit vel veniam accusantium eligendi omnis sed. Nihil explicabo eligendi, pariatur numquam eum tempora cum quibusdam, tempore, quasi voluptatum corporis fugiat atque saepe aperiam sit voluptas commodi nemo magnam.</p>
          </Section>
          <Section>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat assumenda quod est, itaque cupiditate ipsa quidem molestiae, quasi mollitia omnis doloremque ex saepe dolor aliquam nemo. Impedit at exercitationem, culpa voluptatum quisquam omnis repudiandae ad unde sint maiores! Eligendi facere, distinctio autem dolorum quo sunt cupiditate in, quas commodi porro consectetur dolorem temporibus quasi labore doloremque ipsam perferendis id modi voluptatibus rem ad laudantium officiis cum a molestiae. Odio necessitatibus non facilis culpa deserunt nulla adipisci fuga dolorum ratione a, libero maxime similique, officia? Veritatis, inventore harum. Sint ex fuga placeat optio eligendi quam doloribus, dolorum quia maiores obcaecati atque eaque veritatis adipisci sequi non voluptas ducimus tempore quo laudantium temporibus distinctio. Autem iste quos sit. Consequuntur expedita dolorem itaque enim corporis veritatis repudiandae nisi tempore molestias rem quaerat facere voluptatibus <span data-tut="2">autem</span> quis ducimus earum maiores reprehenderit ad, quo accusantium? Accusantium consectetur alias placeat odio, dignissimos tenetur, iure aliquam modi quod debitis obcaecati molestiae vero magni aspernatur! Quo minima, nam at numquam ab fugit ullam voluptatibus veritatis temporibus aut repudiandae accusamus suscipit vel veniam accusantium eligendi omnis sed. Nihil explicabo eligendi, pariatur numquam eum tempora cum quibusdam, tempore, quasi voluptatum corporis fugiat atque saepe aperiam sit voluptas commodi nemo magnam.</p>
          </Section>
        </Main>
        <Sidebar>
          <Section>
            <Button data-tut="1">Button</Button>
          </Section>
          <Section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, ad!
          </Section>
        </Sidebar>
        <footer>
        </footer>
        <Tour 
          onRequestClose={this.closeTutorial}
          steps={tutConfig}
          isOpen={showTutorial}/>
      </Wrapper>
    )
  }
}

const tutConfig = [
  { 
    selector: '[data-tut="1"]', 
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, deleniti.',
    position: 'left',
  },
  { 
    selector: '[data-tut="2"]', 
    content: 'step 2',
    position: 'left',
  },
]

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  margin-top: 1em;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #131313;
  color: white;
  z-index: 1;
  height: 40px;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
`;

const Main = styled.main`
  position: relative;
  left: 200px;
  top: 40px;
  width: calc(100% - 200px);
`;

const Sidebar = styled.aside`
  flex: 0 0 12em;
  position: fixed;
  width: 200px;
  height: 100%;
  background-color: #fafafa;
  top: 0;
  padding-top: 40px;
  overflow-y: scroll;
`;

const Button = styled.button`
  width: 80%;
  border: 0;
  padding: 1em;
  margin: 2em auto;
  display: block
`;

const Section = styled.section`
  height: 100vh;
`;

export default App
