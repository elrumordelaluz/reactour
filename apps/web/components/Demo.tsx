import { Text, Spacer, Snippet, StyledSnippetPre } from '@nextui-org/react'
import { TourProvider, ProviderProps, StepType } from '@reactour/tour'

const Demo: React.FC<
  React.PropsWithChildren<{
    title?: string
    description?: string
    demoId: string
    length?: number
    customSteps?: StepType[]
    providerProps?: Omit<ProviderProps, 'steps' | 'children'>
    code?: string
  }>
> = ({
  title,
  description,
  demoId,
  length = 3,
  children,
  customSteps,
  providerProps,
  code,
}) => {
  const steps =
    customSteps && customSteps.length > 0
      ? customSteps
      : doSteps(demoId, length)
  return (
    <TourProvider steps={steps} {...providerProps}>
      <Text
        h2
        size={34}
        css={{ textGradient: '45deg, $blue500 -20%, $pink500 50%' }}
        weight="bold"
        id={demoId}
      >
        <a href={`#${demoId}`}>{title}</a>
      </Text>
      <Text>{description}</Text>
      {children}

      {code ? (
        <>
          <Spacer y={1} />
          <Code>{code}</Code>
        </>
      ) : null}
      <Spacer y={5} />
    </TourProvider>
  )
}

export default Demo

export function doSteps(demoId: string, length: number) {
  return Array.from({ length }, (_, i) => ({
    selector: `[data-tour="step-${i + 1}-${demoId}"]`,
    content: stepsContent[i],
  }))
}

const stepsContent = [
  <p>Vamos a la playa!</p>,
  <p>Play beach ball all day long!</p>,
  <p>Then, a deliciuos ice cream!</p>,
  <p>What about going to fish?</p>,
  <p>Let's stay traveling!</p>,
]

const Code: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <Snippet
      lang="js"
      css={{
        boxShadow: '0px 5px 20px -5px rgb(0 0 0 / 20%)',
        [`& ${StyledSnippetPre}`]: {
          border: '0px',
          padding: '0px',
          width: '100%',
          overflow: 'scroll',
        },
      }}
      symbol=""
    >
      {children}
    </Snippet>
  )
}
