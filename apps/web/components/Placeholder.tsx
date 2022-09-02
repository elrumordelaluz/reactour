import { Grid, Button, Spacer, GridContainerProps } from '@nextui-org/react'
import { useTour } from '@reactour/tour'
import * as Icon from '../icons'
import MockItem from './Mock'

const Placeholder: React.FC<
  GridContainerProps & {
    demoId: string
    length: number
  }
> = ({ demoId, length = 3, children, ...props }) => {
  const { setIsOpen } = useTour()
  return (
    <>
      <Spacer y={1} />
      <Button onClick={() => setIsOpen(true)}>Start Tour</Button>
      <Spacer y={1} />
      {children}
      <PlaceholderGrid demoId={demoId} length={length} {...props} />
    </>
  )
}

export default Placeholder

export const PlaceholderGrid: React.FC<
  GridContainerProps & {
    demoId: string
    length: number
  }
> = ({ demoId, length = 3, ...props }) => {
  return (
    <Grid.Container gap={2} {...props}>
      {Array.from({ length }, (_, i) => (
        <Grid xs={4} sm={2} key={`step-${i + 1}-${demoId}`}>
          <MockItem data-tour={`step-${i + 1}-${demoId}`}>
            {stepsIcons[i]}
          </MockItem>
        </Grid>
      ))}
    </Grid.Container>
  )
}

const stepsIcons = [
  <Icon.Beach />,
  <Icon.Ball />,
  <Icon.Icecream />,
  <Icon.Boat />,
  <Icon.Guide />,
]
