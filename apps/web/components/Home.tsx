import { useEffect, useContext } from 'react'
import { useTour } from '@reactour/tour'
import { ModalContext } from 'modaaals'
import Section from './Section'
import Logo from './Logo'
import Text from './Text'
import Heading from './Heading'
import Row from './Row'
import Box from './Box'
import Scrollable from './Scrollable'
import Footer from './Footer'
import Image from './Image'
import { Button, Link } from './Button'
import Dropdown from './Dropdown'
import ImagesRow from './ImagesRow'
import Tabs from './Tabs'
import { tourConfig, tourConfigAlt } from './config'

export default function Home() {
  const { setIsOpen, setSteps, setMeta, meta, setCurrentStep } = useTour()
  const { openModal } = useContext(ModalContext)

  useEffect(() => {
    function keyHandling(e: KeyboardEvent) {
      if (e.keyCode === 75) {
        e.preventDefault()
        setIsOpen(true)
      }
    }
    window.addEventListener('keyup', keyHandling)
    return () => window.removeEventListener('keyup', keyHandling)
  }, [setIsOpen])

  return (
    <>
      <Section center classic>
        <Logo />
        <Heading h="3" data-tut="reactour__copy">
          Tourist Guide into your React Components
        </Heading>
      </Section>

      <Section
        classic
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          zIndex: 9999999,
        }}
      >
        <Button
          h="6"
          onClick={() => {
            setMeta('tour-1')
            setSteps(tourConfig)
          }}
          disabled={meta === 'tour-1'}
        >
          Steps 1
        </Button>
        <Button
          h="6"
          onClick={() => {
            setMeta('tour-2')
            setSteps(tourConfigAlt)
            setCurrentStep(0)
          }}
          disabled={meta === 'tour-2'}
        >
          Steps 2
        </Button>
      </Section>
      <Section center classic sticky>
        <Button h="4" onClick={() => setIsOpen(true)}>
          Try it
        </Button>
        <Link
          h="4"
          target="_blank"
          rel="noopener noreferrer"
          href="https://docs.react.tours"
        >
          Docs
        </Link>
        <Link
          h="4"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/elrumordelaluz/reactour"
        >
          Github
        </Link>
      </Section>
      <Section>
        <Row>
          <Box center width="100%">
            <Heading h="1">Expedition into the awesome wildlife</Heading>
            <Heading
              data-tut="reactour__style"
              h="4"
              color="black"
              style={{ width: '50%', margin: '0 auto 2em' }}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores voluptatibus aperiam minus reprehenderit fugiat?
              Officia modi quo.
            </Heading>
          </Box>
        </Row>
        <Row>
          <Box data-tut="reactour__goTo">
            <Link href="https://dribbble.com/shots/2524506-Tweet" nospaces>
              <Image
                alt="cockatoodr"
                src="https://cdn.dribbble.com/users/235991/screenshots/2524506/cockatoodr.png"
              />
            </Link>
            <Text size=".7em">
              Image by{' '}
              <Link href="https://twitter.com/hoolahk" color="dark" nospaces>
                Kate Hoolahan
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading h="2" data-tut="reactour__position">
              Tweet
            </Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Praesentium esse adipisci dolores itaque aliquid vero, officiis
              ipsam officia, corporis non magnam voluptates reprehenderit
              impedit quibusdam quo amet, ex rerum. Necessitatibus eum adipisci
              hic deserunt, ipsam eveniet, vel commodi odit id explicabo autem
              quibusdam pariatur! Voluptatem blanditiis praesentium architecto,
              temporibus quaerat?
            </Text>
          </Box>
        </Row>

        <Row>
          <Box align="right">
            <Heading h="2">{"I'm bringin silver back"}</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
              odio asperiores ex autem impedit consequatur, iste distinctio
              illum, delectus eius minima? Laudantium labore numquam, nihil.
            </Text>
          </Box>
          <Box>
            <Link
              href="https://dribbble.com/shots/2696833-I-m-bringin-silver-back"
              nospaces
            >
              <Image
                alt="giril"
                src="https://cdn.dribbble.com/users/235991/screenshots/2696833/giril-01.png"
              />
            </Link>
            <Text size=".7em">
              Image by{' '}
              <Link href="https://twitter.com/hoolahk" color="dark" nospaces>
                Kate Hoolahan
              </Link>
            </Text>
          </Box>
        </Row>

        <Row>
          <Box>
            <Link href="https://dribbble.com/shots/3380738-Little-dog" nospaces>
              <Image
                alt="dog"
                src="https://cdn.dribbble.com/users/235991/screenshots/3380738/dog.png"
              />
            </Link>
            <Text size=".7em">
              Image by{' '}
              <Link href="https://twitter.com/hoolahk" color="dark" nospaces>
                Kate Hoolahan
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading h="2">Little Dog</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores voluptatibus aperiam minus reprehenderit fugiat?
              Officia modi quo, rerum labore et consectetur minima consequatur
              rem, animi quis molestias optio facere pariatur cupiditate?
              Accusamus architecto maiores, beatae earum eaque, autem eius
              saepe, nesciunt aut, ducimus aliquid sequi itaque fugit veniam
              non. Suscipit hic, ad aliquid veniam quod veritatis id voluptas
              similique nemo.
            </Text>
          </Box>
        </Row>
      </Section>

      <Section
        data-tut="reactour__state--observe"
        style={{ paddingBottom: '3em' }}
      >
        <Row>
          <Box center>
            <Heading h="1">Also its beautiful Buildings</Heading>
          </Box>
        </Row>
        <Row>
          <Box data-tut="reactour__action">
            <Link
              href="https://dribbble.com/shots/2788237-Tilford-Street"
              nospaces
            >
              <Image
                alt="tilforddr"
                src="https://cdn.dribbble.com/users/235991/screenshots/2788237/tilforddr-01.png"
              />
            </Link>
            <Text size=".7em">
              Image by{' '}
              <Link href="https://twitter.com/hoolahk" color="dark" nospaces>
                Kate Hoolahan
              </Link>
            </Text>
          </Box>
          <Box>
            <Heading h="2">Tilford Street</Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Asperiores voluptatibus aperiam minus reprehenderit fugiat?
              Officia modi quo, rerum labore et consectetur minima consequatur
              rem, animi quis molestias optio facere pariatur cupiditate?
              Accusamus architecto maiores, beatae earum eaque, autem eius
              saepe, nesciunt aut, ducimus aliquid sequi itaque fugit veniam
              non. Suscipit hic, ad aliquid veniam quod veritatis id voluptas
              similique nemo.
            </Text>
          </Box>
        </Row>

        <Row>
          <Box align="right">
            <Heading
              h="2"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
              data-tut="reactour__highlighted"
            >
              109 Baptist St
              <Dropdown>
                <Tabs>
                  <Tabs.Tab>
                    This is a div in absolute position which will be in the
                    highlighted region of the mask when tour is running.
                  </Tabs.Tab>
                  <Tabs.Tab>
                    This is a long text which demonstrates how resizeObservables
                    works. Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Optio neque vero consequuntur recusandae, dolore. Aut
                    molestiae error enim illum odio vero sunt laborum
                    consectetur minus deleniti pariatur eos quos, earum tenetur
                    architecto veniam voluptatum sit! Optio similique ducimus
                    esse vel inventore eaque earum adipisci quo, sit illum
                    reprehenderit? Fugiat rerum inventore commodi dolores nisi
                    soluta, nulla velit omnis! Quisquam est illo deserunt.
                    Consequatur modi voluptatem consectetur nesciunt, eligendi,
                    natus animi.
                  </Tabs.Tab>
                </Tabs>
              </Dropdown>
            </Heading>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
              neque vero consequuntur recusandae, dolore. Aut molestiae error
              enim illum odio vero sunt laborum consectetur minus deleniti
              pariatur eos quos, earum tenetur architecto veniam voluptatum sit!
              Optio similique ducimus esse vel inventore eaque earum adipisci
              quo, sit illum reprehenderit? Fugiat rerum inventore commodi
              dolores nisi soluta, nulla velit omnis! Quisquam est illo
              deserunt. Consequatur modi voluptatem consectetur nesciunt,
              eligendi, natus animi.
            </Text>
          </Box>
          <Box>
            <Link
              href="https://dribbble.com/shots/2757736-109-Baptist-St"
              nospaces
            >
              <Image
                alt="terrace3"
                src="https://cdn.dribbble.com/users/235991/screenshots/2757736/terrace3-04.png"
              />
            </Link>
            <Text size=".7em">
              Image by{' '}
              <Link href="https://twitter.com/hoolahk" color="dark" nospaces>
                Kate Hoolahan
              </Link>
            </Text>
          </Box>
        </Row>

        <ImagesRow>
          <Box>
            <Link href="https://dribbble.com/shots/1931264-Lean-Green" nospaces>
              <Image
                alt="house8"
                src="https://cdn.dribbble.com/users/235991/screenshots/1931264/house8.png"
              />
            </Link>
            <Text size=".7em">
              Image by{' '}
              <Link href="https://twitter.com/hoolahk" color="dark" nospaces>
                Kate Hoolahan
              </Link>
            </Text>
          </Box>
          <Box>
            <Link
              href="https://dribbble.com/shots/1972953-Greek-House"
              nospaces
            >
              <Image
                alt="greekhouse"
                src="https://cdn.dribbble.com/users/235991/screenshots/1972953/greekhouse.png"
              />
            </Link>
            <Text size=".7em">
              Image by{' '}
              <Link href="https://twitter.com/hoolahk" color="dark" nospaces>
                Kate Hoolahan
              </Link>
            </Text>
          </Box>
          <Box>
            <Link
              href="https://dribbble.com/shots/1919911-House-Fancy"
              nospaces
            >
              <Image
                alt="house french"
                src="https://cdn.dribbble.com/users/235991/screenshots/1919911/house_french.png"
              />
            </Link>
            <Text size=".7em">
              Image by{' '}
              <Link href="https://twitter.com/hoolahk" color="dark" nospaces>
                Kate Hoolahan
              </Link>
            </Text>
          </Box>
        </ImagesRow>

        <Box center width="100%">
          <Button data-tour="open_modal" onClick={() => openModal('test')}>
            Open Modal
          </Button>
        </Box>

        <Row style={{ margin: '2em 0' }}>
          <Box center width="18%" />
          <Box center width="64%">
            <Heading h="2">Gold Sponsors</Heading>
            <Link
              href="https://frigade.com/?source=reactour-site"
              style={{ marginTop: '2em' }}
              nospaces
            >
              <Image alt="Frigade" src="/sponsor-frigade.png" />
            </Link>
            <Text>
              Reactour is proud to be sponsored by{' '}
              <Link
                href="https://frigade.com/?source=reactour-site"
                color="dark"
                nospaces
              >
                Frigade
              </Link>
              , a developer tool for building better product onboarding: guided
              tours, getting started checklists, announcements, and more.
            </Text>
          </Box>
          <Box center width="18%" />
        </Row>
      </Section>

      <Scrollable>
        <Link
          style={{
            width: '70%',
            marginTop: '200vh',
            marginBottom: '200vh',
            boxShadow: '0 .5em 3em rgba(0,0,0,.3)',
          }}
          data-tut="reactour__scroll--hidden"
          href="https://dribbble.com/shots/2783174-Funny-little-bird"
          nospaces
        >
          <Image
            alt="htweetydr"
            src="https://cdn.dribbble.com/users/235991/screenshots/2783174/tweetydr-01.png"
          />
        </Link>
      </Scrollable>

      <Footer>
        <Logo size="20vw" iso={false} />
        <Text size=".7em">
          <span data-tut="reactour__scroll">
            Made with{' '}
            <span role="img" aria-label="heart">
              ❤️
            </span>
          </span>{' '}
          by{' '}
          <Link
            href="https://twitter.com/elrumordelaluz"
            target="_blank"
            rel="noopener noreferrer"
            color="white"
            nospaces
          >
            @elrumordelaluz
          </Link>{' '}
          ·{' '}
          <Link
            href="https://docs.react.tours"
            target="_blank"
            rel="noopener noreferrer"
            nospaces
          >
            Documentation
          </Link>{' '}
          ·{' '}
          <Link
            href="https://github.com/elrumordelaluz/reactour"
            target="_blank"
            rel="noopener noreferrer"
            nospaces
          >
            Github
          </Link>
        </Text>
      </Footer>
    </>
  )
}
