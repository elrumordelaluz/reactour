import {
  Text,
  Spacer,
  Link,
  Snippet,
  StyledSnippetPre,
} from '@nextui-org/react'
import { Sandpack } from '@codesandbox/sandpack-react'
import { monokaiPro } from '@codesandbox/sandpack-themes'
import { configFiles } from './files/index'
import { ReactNode } from 'react'

const Demo: React.FC<
  React.PropsWithChildren<{
    demoId: string
    title?: string
    description?: ReactNode
    docsLinks?: Array<{ link: string; prop: string }>
    dependencies?: {}
  }>
> = ({ title, description, demoId, docsLinks = [], dependencies }) => {
  return (
    <>
      <Text
        h2
        css={{ textGradient: '45deg, $blue500 -20%, $pink500 50%' }}
        weight="bold"
        id={demoId}
      >
        <a href={`#${demoId}`}>{title}</a>
      </Text>

      <Text blockquote>{description}</Text>
      <Spacer y={1} />
      <Sandpack
        template="react"
        files={configFiles(demoId)}
        theme={monokaiPro}
        customSetup={{
          dependencies: {
            '@reactour/tour': '*',
            ...dependencies,
          },
        }}
      />
      <Spacer y={1} />
      {docsLinks?.map(({ link, prop }) => (
        <DocLink link={link} prop={prop} key={link} />
      ))}

      <Spacer y={3} />
    </>
  )
}

function DocLink({ link, prop }) {
  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      isExternal
      color="secondary"
      style={{ marginBottom: '.5em' }}
    >
      {prop ? <code style={{ marginRight: '.5em' }}>{prop}</code> : null}
      Docs
    </Link>
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
  <p>Let`&apos;s stay traveling!</p>,
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
