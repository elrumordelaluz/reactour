import { useState, useEffect, Component } from 'react'
import { Text, Container, Spacer } from '@nextui-org/react'
import Demo from './index'

export default function TourDemos() {
  return (
    <Container>
      <Text
        h1
        size={60}
        css={{ textGradient: '45deg, $blue500 -20%, $pink500 50%' }}
        weight="bold"
      >
        @reactour/tour
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

      <Demo
        title="Scroll Smooth"
        demoId="scroll-smooth"
        description="Use smooth scroll between steps if there aren't visible in viewport"
        docsLink="https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#scrollsmooth-boolean"
        prop="scrollSmooth"
      />

      <Demo
        title="Padding"
        demoId="padding"
        description="Custom wrapper, mask and popover paddings"
        docsLink="https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#padding-padding-1"
        prop="padding"
      />

      <Demo
        title="Custom Prev and Next buttons"
        demoId="custom-prev-next"
        description="Custom Prev and Next button"
        docsLink="https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#nextbutton-props-btnfnprops--void"
        prop="prevButton | nextButton"
      />

      <Demo
        title="RTL"
        demoId="rtl"
        description="RTL mode"
        docsLink="https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#rtl-boolean"
        prop="rtl"
      />

      <Demo
        title="Custom styles"
        demoId="custom-styles"
        description="Custom Tour, Mask and Popover components and parts styles"
        docsLink="https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#styles-stylesobj--popoverstylesobj--maskstylesobj-1"
        prop="styles"
      />
    </Container>
  )
}
