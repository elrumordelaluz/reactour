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
        docsLinks={[
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#onclickmask-clickprops-clickprops--void',
            prop: 'onClickMask',
          },
        ]}
      />

      <Demo
        title="Close click"
        demoId="close-click"
        description="Example to show the customizable behavior of the Close click event. Try clicking the 'x' and the Tour will proceed to the next step."
        docsLinks={[
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#onclickclose-clickprops-clickprops--void',
            prop: 'onClickClose',
          },
        ]}
      />

      <Demo
        title="Disable Keyboard"
        demoId="disable-keyboard"
        description="Example to show the customizable behavior of the Close click event. Try clicking the 'x' and the Tour will proceed to the next step."
        docsLinks={[
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#disablekeyboardnavigation-boolean--keyboardparts',
            prop: 'disableKeyboardNavigation',
          },
        ]}
      />

      <Demo
        title="Scroll Smooth"
        demoId="scroll-smooth"
        description="Use smooth scroll between steps if they aren't visible in viewport"
        docsLinks={[
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#scrollsmooth-boolean',
            prop: 'scrollSmooth',
          },
        ]}
      />

      <Demo
        title="Padding"
        demoId="padding"
        description="Custom wrapper, mask and popover paddings"
        docsLinks={[
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#padding-padding-1',
            prop: 'padding',
          },
        ]}
      />

      <Demo
        title="Custom Prev and Next buttons"
        demoId="custom-prev-next"
        description="Custom Prev and Next button"
        docsLinks={[
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#prevbutton-props-btnfnprops--void',
            prop: 'prevButton',
          },
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#nextbutton-props-btnfnprops--void',
            prop: 'nextButton',
          },
        ]}
      />

      <Demo
        title="Custom handlers"
        demoId="custom-handlers"
        description="Control currenStep externally. Useful when using global state."
        docsLinks={[
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#setcurrentstep-dispatchreactsetstateactionnumber',
            prop: 'setCurrentStep',
          },
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#currentstep-number',
            prop: 'currentStep',
          },
        ]}
      />

      <Demo
        title="RTL"
        demoId="rtl"
        description="RTL mode"
        docsLinks={[
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#rtl-boolean',
            prop: 'rtl',
          },
        ]}
      />

      <Demo
        title="Custom styles"
        demoId="custom-styles"
        description="Custom Tour, Mask and Popover components and parts styles"
        docsLinks={[
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#styles-stylesobj--popoverstylesobj--maskstylesobj-1',
            prop: 'styles',
          },
        ]}
      />

      <Demo
        title="Disable Scroll"
        demoId="scroll-lock"
        description={
          <>
            In this example, we are using <code>afterOpen</code> prop to lock
            the Y scroll and re-enable it through <code>beforeClose</code>prop.
          </>
        }
        docsLinks={[
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#afteropen-target-element--null--void',
            prop: 'afterOpen',
          },
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#beforeclose-target-element--null--void',
            prop: 'beforeClose',
          },
        ]}
        dependencies={{ 'body-scroll-lock': '^4.0.0-beta.0' }}
      />

      <Demo
        title="Custom Badge"
        demoId="custom-badge"
        description="Create a custom Badge content"
        docsLinks={[
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#badgecontent-badgeprops-badgeprops--any',
            prop: 'badgeContent',
          },
        ]}
      />

      <Demo
        title="Disable dots navigation"
        demoId="disable-dots-nav"
        description="Disable navigating through click in dots buttons"
        docsLinks={[
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#disabledotsnavigation-boolean',
            prop: 'disableDotsNavigation',
          },
        ]}
      />

      <Demo
        title="Disable interaction"
        demoId="disable-interaction"
        description="Disable highlighted area interaction. This example shows how to disable the default behavior and how to add an extra functionality when clicking this area. Try to select the highlighted text."
        docsLinks={[
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#disableinteraction-boolean',
            prop: 'disableInteraction',
          },
        ]}
      />

      <Demo
        title="Toggle navigation parts"
        demoId="toggle-nav-parts"
        description="Toggle Navigation parts as you want"
        docsLinks={[
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#showbadge-boolean',
            prop: 'showBadge',
          },
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#showclosebutton-boolean',
            prop: 'showCloseButton',
          },
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#shownavigation-boolean',
            prop: 'showNavigation',
          },
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#showprevnextbuttons-boolean',
            prop: 'showPrevNextButtons',
          },
          {
            link: 'https://github.com/elrumordelaluz/reactour/tree/main/packages/tour#showdots-boolean',
            prop: 'showDots',
          },
        ]}
      />

      <Demo
        title="Starts at"
        demoId="start-at"
        description="Start Tour at specific step. Keep in mind that the number is zero based, so 2 is the third step."
      />
    </Container>
  )
}
