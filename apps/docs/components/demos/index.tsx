import { Sandpack } from '@codesandbox/sandpack-react'
import { monokaiPro } from '@codesandbox/sandpack-themes'
import { configFiles } from './files/index'

const Demo: React.FC<
  React.PropsWithChildren<{
    demoId: string
    dependencies?: {}
  }>
> = ({ demoId, dependencies }) => {
  return (
    <div style={{ margin: '10px 0 0' }}>
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
    </div>
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
