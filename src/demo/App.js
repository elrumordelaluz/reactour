import React, { Component } from 'react'
import Tour from '../index'
import styled from 'styled-components'
import css from './styles.css'

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
            <p>Lorem ipsum <span data-tut="9">autem</span> dolor sit amet, consectetur adipisicing elit. Quaerat assumenda quod est, itaque cupiditate ipsa quidem molestiae, quasi mollitia omnis doloremque ex saepe dolor aliquam nemo. Impedit at exercitationem, culpa voluptatum quisquam omnis repudiandae ad unde sint maiores! Eligendi facere, distinctio autem dolorum quo sunt cupiditate in, quas commodi porro consectetur dolorem temporibus quasi labore doloremque ipsam perferendis id modi voluptatibus rem ad laudantium officiis cum a molestiae. Odio necessitatibus non facilis culpa deserunt nulla adipisci fuga dolorum ratione a, libero maxime similique, officia? Veritatis, inventore harum. Sint ex fuga placeat optio eligendi quam doloribus, dolorum quia maiores obcaecati atque eaque veritatis adipisci sequi non voluptas ducimus tempore quo laudantium temporibus distinctio. Autem iste quos sit. Consequuntur expedita dolorem itaque enim corporis veritatis repudiandae nisi tempore molestias rem quaerat facere voluptatibus <span data-tut="8">autem</span> autem quis ducimus earum maiores reprehenderit ad, quo accusantium? Accusantium consectetur alias placeat odio, dignissimos tenetur, iure aliquam modi quod debitis obcaecati molestiae vero magni aspernatur! Quo minima, nam at numquam ab fugit ullam voluptatibus veritatis temporibus aut repudiandae accusamus suscipit vel veniam accusantium eligendi omnis sed. Nihil explicabo eligendi, pariatur numquam eum tempora cum quibusdam, tempore, quasi voluptatum corporis fugiat atque saepe aperiam sit voluptas <span data-tut="7">autem</span> commodi nemo magnam.</p>
          </Section>
          <Section>
            <p data-tut="4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat assumenda quod est, itaque cupiditate ipsa quidem molestiae, quasi mollitia omnis doloremque ex saepe dolor aliquam nemo. Impedit at exercitationem, culpa voluptatum quisquam omnis repudiandae ad unde sint maiores! Eligendi facere, distinctio autem dolorum quo sunt cupiditate in, quas commodi porro consectetur dolorem temporibus quasi labore doloremque ipsam perferendis id modi voluptatibus rem ad laudantium officiis cum a molestiae. Odio necessitatibus non facilis culpa deserunt nulla adipisci <span data-tut="10">autem</span> fuga dolorum ratione a, libero maxime similique, officia? Veritatis, inventore harum. Sint ex fuga placeat optio eligendi quam doloribus, dolorum quia maiores obcaecati atque eaque veritatis adipisci sequi non voluptas ducimus tempore quo laudantium temporibus distinctio. Autem iste quos sit. Consequuntur expedita dolorem itaque enim corporis veritatis repudiandae nisi tempore molestias rem quaerat facere voluptatibus <span data-tut="2">autem</span> quis ducimus earum maiores reprehenderit ad, quo accusantium? Accusantium consectetur alias placeat odio, dignissimos tenetur, iure aliquam modi quod debitis obcaecati molestiae vero magni aspernatur! Quo minima, nam at numquam ab fugit ullam voluptatibus veritatis temporibus aut repudiandae accusamus suscipit vel veniam accusantium eligendi omnis sed. Nihil explicabo eligendi, pariatur numquam eum tempora cum quibusdam, tempore, quasi voluptatum <span data-tut="6">autem</span> corporis fugiat atque saepe aperiam sit voluptas commodi nemo magnam.</p>
          </Section>
        </Main>
        <Sidebar>
          <Section data-tut="3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, ad!
          </Section>
          <Section>
            <Button>Button</Button>
          </Section>
        </Sidebar>
        <Tester data-tut="1" />
        <footer>
        </footer>
        <Tour 
          onRequestClose={this.closeTutorial}
          steps={tutConfig}
          isOpen={showTutorial}
          maskClassName="mask"
          className="helper" />
      </Wrapper>
    )
  }
}

const Compo = () => (
  <div>
    <h1>Hola</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, modi.</p>
  </div>
)

const tutConfig = [
  { 
    selector: '[data-tut="1"]', 
    content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, deleniti. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, deleniti. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, deleniti. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, deleniti. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, deleniti. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, deleniti. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, deleniti. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, deleniti.',
    position: 'left',
  },
  { 
    selector: '[data-tut="2"]', 
    content: <Compo />,
  },
  { 
    selector: '[data-tut="3"]', 
    content: 'step 3',
    position: 'bottom',
  },
  { 
    selector: '[data-tut="4"]', 
    content: 'step 4',
    position: 'top',
    action: (node) => console.log('In setp 4', node),
  },
  { 
    selector: '[data-tut="5"]', 
    content: 'step 5',
    position: 'left',
    action: () => console.log('In setp 5!!!'),
  },
  { 
    selector: '[data-tut="6"]', 
    content: 'step 6',
    position: 'left',
  },
  { 
    selector: '[data-tut="7"]', 
    content: 'step Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae impedit et officiis tenetur odit praesentium illo quos cupiditate dolores nam, earum a nobis error ducimus.',
    position: 'left',
  },
  { 
    selector: '[data-tut="8"]', 
    content: 'step Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, deserunt.',
    position: 'left',
  },
  { 
    selector: '[data-tut="9"]', 
    content: 'step 9',
    position: 'left',
  },
  { 
    selector: '[data-tut="10"]', 
    content: 'Lorem ipsum! Pariatur quis illo esse itaque voluptatum!',
    position: 'left',
  },
]

const Tester = styled.div`
  position: fixed;
  bottom: 250px;
  right: 0;
  width: 200px;
  height: 200px;
  background-color: red;
`;

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
  right: 0;
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
