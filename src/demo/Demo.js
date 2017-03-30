import React from 'react'
import Section from './Section'
import Logo from './Logo'
import Text from './Text'
import Heading from './Heading'
import Row from './Row'
import Box from './Box'
import Image from './Image'
import { Button, Link } from './Button'

const Demo = ({
  openTour,
}) => (
  <div>
    <Section center>
      <Logo />
      <Heading h="3" data-tut="reactour__copy">
        Tourist Guide into your React Components
      </Heading>
      <Button h="4" onClick={openTour}>Try it</Button>
      <Link color="dark" h="4" href="https://github.com/elrumordelaluz/reactour">Github</Link>
    </Section>
    <Section>
      
      <Row>
        <Box center width="0 0 100%">
          <Heading h="1">Expedition into the awesome wildlife</Heading>
          <Heading 
            data-tut="reactour__style"
            h="4" 
            color="black" 
            style={{ width: '50%', margin: '0 auto 2em' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores voluptatibus aperiam minus reprehenderit fugiat? Officia modi quo.
          </Heading>
        </Box>
      </Row>
      
      <Row>
        <Box data-tut="reactour__stepWildlife">
          <Link href="https://dribbble.com/shots/2524506-Tweet" nospaces>
            <Image src="https://d13yacurqjgara.cloudfront.net/users/235991/screenshots/2524506/cockatoodr.png" />
          </Link>
          <Text size=".7em">Image by <Link 
            href="https://twitter.com/hoolahk" 
            color="dark"
            nospaces>Kate Hoolahan</Link></Text>
        </Box>
        <Box>
          <Heading h="2">Tweet</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium esse adipisci dolores itaque aliquid vero, officiis ipsam officia, corporis non magnam voluptates reprehenderit impedit quibusdam quo amet, ex rerum. Necessitatibus eum adipisci hic deserunt, ipsam eveniet, vel commodi odit id explicabo autem quibusdam pariatur! Voluptatem blanditiis praesentium architecto, temporibus quaerat?
          </Text>
        </Box>
      </Row>
      
      <Row>
        <Box align="right">
          <Heading h="2">{'I\'m bringin silver back'}</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem odio asperiores ex autem impedit consequatur, iste distinctio illum, delectus eius minima? Laudantium labore numquam, nihil.
          </Text>
        </Box>
        <Box>
          <Link href="https://dribbble.com/shots/2696833-I-m-bringin-silver-back" nospaces>
            <Image src="https://d13yacurqjgara.cloudfront.net/users/235991/screenshots/2696833/giril-01.png" />
          </Link>
          <Text size=".7em">Image by <Link 
            href="https://twitter.com/hoolahk" 
            color="dark"
            nospaces>Kate Hoolahan</Link></Text>
        </Box>
      </Row>
      
      <Row>
        <Box>
          <Link href="https://dribbble.com/shots/3380738-Little-dog" nospaces>
            <Image src="https://d13yacurqjgara.cloudfront.net/users/235991/screenshots/3380738/dog.png" />
          </Link>
          <Text size=".7em">Image by <Link 
            href="https://twitter.com/hoolahk" 
            color="dark"
            nospaces>Kate Hoolahan</Link></Text>
        </Box>
        <Box>
          <Heading h="2">Little Dog</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores voluptatibus aperiam minus reprehenderit fugiat? Officia modi quo, rerum labore et consectetur minima consequatur rem, animi quis molestias optio facere pariatur cupiditate? Accusamus architecto maiores, beatae earum eaque, autem eius saepe, nesciunt aut, ducimus aliquid sequi itaque fugit veniam non. Suscipit hic, ad aliquid veniam quod veritatis id voluptas similique nemo.
          </Text>
        </Box>
      </Row>
      
    </Section>
    
    <Section>
      <Row>
        <Box center>
          <Heading h="1">Also its beautiful Buildings</Heading>
        </Box>
      </Row>
      <Row>
        <Box>
          <Link href="https://dribbble.com/shots/2788237-Tilford-Street" nospaces>
            <Image src="https://d13yacurqjgara.cloudfront.net/users/235991/screenshots/2788237/tilforddr-01.png" />
          </Link>
          <Text size=".7em">Image by <Link 
            href="https://twitter.com/hoolahk" 
            color="dark"
            nospaces>Kate Hoolahan</Link></Text>
        </Box>
        <Box>
          <Heading h="2">Tilford Street</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores voluptatibus aperiam minus reprehenderit fugiat? Officia modi quo, rerum labore et consectetur minima consequatur rem, animi quis molestias optio facere pariatur cupiditate? Accusamus architecto maiores, beatae earum eaque, autem eius saepe, nesciunt aut, ducimus aliquid sequi itaque fugit veniam non. Suscipit hic, ad aliquid veniam quod veritatis id voluptas similique nemo.
          </Text>
        </Box>
      </Row>
      
      <Row>
        <Box>
          <Link href="https://dribbble.com/shots/1931264-Lean-Green" nospaces>
            <Image src="https://d13yacurqjgara.cloudfront.net/users/235991/screenshots/1931264/house8.png" />
          </Link>
          <Text size=".7em">Image by <Link 
            href="https://twitter.com/hoolahk" 
            color="dark"
            nospaces>Kate Hoolahan</Link></Text>
        </Box>
        <Box>
          <Link href="https://dribbble.com/shots/1972953-Greek-House" nospaces>
            <Image src="https://d13yacurqjgara.cloudfront.net/users/235991/screenshots/1972953/greekhouse.png" />
          </Link>
          <Text size=".7em">Image by <Link 
            href="https://twitter.com/hoolahk" 
            color="dark"
            nospaces>Kate Hoolahan</Link></Text>
        </Box>
        <Box>
          <Link href="https://dribbble.com/shots/1919911-House-Fancy" nospaces>
            <Image src="https://d13yacurqjgara.cloudfront.net/users/235991/screenshots/1919911/house_french.png" />
          </Link>
          <Text size=".7em">Image by <Link 
            href="https://twitter.com/hoolahk" 
            color="dark"
            nospaces>Kate Hoolahan</Link></Text>
        </Box>
      </Row>
      
    </Section>
  </div>
)

export default Demo
