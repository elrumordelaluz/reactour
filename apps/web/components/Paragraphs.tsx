import { PropsWithChildren } from 'react'
import { Spacer, Button, Text } from '@nextui-org/react'
import { useTour } from '@reactour/tour'

const Paragraphs: React.FC<PropsWithChildren<{ demoId: string }>> = ({
  demoId,
  children,
}) => {
  const { setIsOpen } = useTour()
  return (
    <>
      <Spacer y={1} />
      <Button onClick={() => setIsOpen(true)}>Start Tour</Button>
      <Spacer y={1} />
      {children}
      <Text>
        <span data-tour={`step-1-${demoId}`}>Lorem ipsum</span> dolor sit amet,
        consectetur adipiscing elit. Vivamus volutpat quam eu mauris euismod
        imperdiet. Nullam elementum fermentum neque a placerat. Vivamus sed dui
        nisi. Phasellus vel dolor interdum, accumsan eros ut, rutrum dolor.{' '}
        <span data-tour={`step-2-${demoId}`}>
          Pellentesque a magna enim. Pellentesque malesuada egestas urna, et
          pulvinar lorem viverra suscipit.
        </span>
        Duis sit amet mauris ante. Fusce at ante nunc. Maecenas ut leo eu erat
        porta fermentum.
      </Text>{' '}
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        volutpat quam eu mauris euismod imperdiet.{' '}
        <span data-tour={`step-3-${demoId}`}>
          Vivamus sed dui nisi. Phasellus vel dolor interdum,
        </span>
        Ut augue massa, aliquam in bibendum sed, euismod vitae magna. Nulla sit
        amet sodales augue. Curabitur in nulla in magna luctus porta et sit amet
        dolor. Pellentesque a magna enim.
      </Text>
    </>
  )
}

export default Paragraphs
