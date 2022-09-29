import {
  Text,
  Spacer,
  Link,
  Snippet,
  StyledSnippetPre,
} from '@nextui-org/react'
import { Sandpack } from '@codesandbox/sandpack-react'
import {
  SandpackProvider,
  ClasserProvider,
  SandpackPreview,
  useActiveCode,
  SandpackLayout,
  SandpackStack,
  FileTabs,
  useSandpack,
} from '@codesandbox/sandpack-react'
import Editor from '@monaco-editor/react'
import { getLanguageOfFile } from './utils'
import { monokaiPro } from '@codesandbox/sandpack-themes'
import { configFiles } from './files/index'

function MonacoEditor() {
  const { code, updateCode } = useActiveCode()
  const { sandpack } = useSandpack()

  const language = getLanguageOfFile(sandpack.activeFile)

  return (
    <SandpackStack style={{ minHeight: 400, margin: 0 }}>
      <FileTabs />
      <div style={{ flex: 1, paddingTop: 8, background: '#1e1e1e' }}>
        <Editor
          width="100%"
          height="100%"
          language={language}
          theme="vs-dark"
          key={sandpack.activeFile}
          defaultValue={code}
          onChange={(value) => updateCode(value || '')}
        />
      </div>
    </SandpackStack>
  )
}

const Demo: React.FC<
  React.PropsWithChildren<{
    demoId: string
    title?: string
    description?: string
    docsLink?: string
    prop?: string
  }>
> = ({ title, description, demoId, docsLink, prop }) => {
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
      <SandpackProvider
        template="react"
        files={configFiles(demoId)}
        theme={monokaiPro}
        customSetup={{
          dependencies: {
            '@reactour/tour': '*',
          },
        }}
      >
        <SandpackLayout>
          <MonacoEditor />
          <SandpackPreview style={{ minHeight: 400 }} />
        </SandpackLayout>
      </SandpackProvider>
      {/* <Sandpack
        template="react"
        files={configFiles(demoId)}
        theme={monokaiPro}
        customSetup={{
          dependencies: {
            '@reactour/tour': '*',
          },
        }}
      /> */}
      <Spacer y={1} />
      {docsLink ? (
        <Link
          href={docsLink}
          target="_blank"
          rel="noopener noreferrer"
          isExternal
          color="secondary"
        >
          {prop ? <code style={{ marginRight: '.5em' }}>{prop}</code> : null}
          Docs
        </Link>
      ) : null}
      <Spacer y={3} />
    </>
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
