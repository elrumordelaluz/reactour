import { useState, useEffect, Component } from 'react'
import { Text, Container, Spacer } from '@nextui-org/react'
import Demo from './index'

export default function TourDemos() {
  return (
    <Container justify="center">
      <Text
        h1
        size={60}
        css={{ textGradient: '45deg, $blue500 -20%, $pink500 50%' }}
        weight="bold"
      >
        Tour
      </Text>
      <Text>Here are the examples for the Tour package</Text>
      <Spacer y={3} />

      <Demo
        demoId="basic"
        title="Basic example"
        description="This is the minimal example"
      />

      <Demo
        demoId="mask-click"
        title="Mask click"
        description="Example to show the customizable behavior of the Mask click event. Try clicking the Mask and the Tour will proceed to the next step."
        docsLink="https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#onclickmask-clickprops-clickprops--void"
        prop="onClickMask"
      />

      <Demo
        title="Close click"
        demoId="close-click"
        description="Example to show the customizable behavior of the Close click event. Try clicking the 'x' and the Tour will proceed to the next step."
        docsLink="https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#onclickclose-clickprops-clickprops--void"
        prop="onClickClose"
      />

      <Demo
        title="Disable Keyboard"
        demoId="disable-keyboard"
        description="Example to show the customizable behavior of the Close click event. Try clicking the 'x' and the Tour will proceed to the next step."
        docsLink="https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#disablekeyboardnavigation-boolean--keyboardparts"
        prop="disableKeyboardNavigation"
      />
    </Container>
  )
}
