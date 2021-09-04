### Basic example

```jsx
import { useState, useCallback } from 'react'
const [show, setShow] = useState(false)

function refresh() {
  console.log('mutated')
}
;<>
  <button onClick={() => setShow(o => !o)}>
    {show ? 'Hide' : 'Show'} extra paragraph
  </button>{' '}
  and Take a look at the <code>console</code>
  <p
    style={{
      minHeight: 30,
      minWidth: 30,
      resize: 'both',
      overflow: 'auto',
      maxHeight: 'fit-content',
      maxWidth: 'fit-content',
    }}
    className="resize-elem"
  >
    Otherwise, try resizing this <code>div</code> and Take a look at the{' '}
    <code>console</code>. Lorem ipsum dolor sit amet, consectetur adipiscing
    elit. Vivamus volutpat quam eu mauris euismod imperdiet. Nullam elementum
    fermentum neque a placerat. Vivamus sed dui nisi. Phasellus vel dolor
    interdum, accumsan eros ut, rutrum dolor. Etiam in leo urna.
  </p>
  {show ? (
    <p className="mutation-elem">
      Vestibulum maximus vitae urna at congue. Vivamus lectus nisi, pellentesque
      at orci a, tempor lobortis orci. Praesent non lorem erat. Ut augue massa,
      aliquam in bibendum sed, euismod vitae magna. Nulla sit amet sodales
      augue. Curabitur in nulla in magna luctus porta et sit amet dolor.
      Pellentesque a magna enim. Pellentesque malesuada egestas urna, et
      pulvinar lorem viverra suscipit. Duis sit amet mauris ante. Fusce at ante
      nunc. Maecenas ut leo eu erat porta fermentum.
    </p>
  ) : null}
  <Observables resizeObservables={['.resize-elem']} mutationObservables={['.mutation-elem']} refresh={refresh} />
</>
```
