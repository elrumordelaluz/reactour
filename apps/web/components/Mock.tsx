import { PropsWithChildren } from 'react'
import { Card, Text } from '@nextui-org/react'

const MockItem: React.FC<PropsWithChildren<{}>> = ({ children, ...props }) => {
  return (
    <Card isHoverable isPressable color="default" {...props}>
      <Text h6 size={15} color="white" css={{ mt: 0 }}>
        {children}
      </Text>
    </Card>
  )
}

export default MockItem
