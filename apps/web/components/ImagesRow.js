import { useState } from 'react'
import { Button } from './Button'
import Row from './Row'
import Box from './Box'

export default function ImagesRow({ children }) {
  const [visible, setVisible] = useState(false)

  return (
    <Box center width="100%" data-tut="reactour__state">
      <link
        rel="preload"
        as="image"
        href="https://cdn.dribbble.com/users/235991/screenshots/1931264/house8.png"
      />
      <link
        rel="preload"
        as="image"
        href="https://cdn.dribbble.com/users/235991/screenshots/1972953/greekhouse.png"
      />
      <link
        rel="preload"
        as="image"
        href="https://cdn.dribbble.com/users/235991/screenshots/1919911/house_french.png"
      />
      <Button onClick={() => setVisible(!visible)}>
        {visible ? 'Hide' : 'Show'} extra Buildings
      </Button>
      {visible && (
        <Row data-tut="reactour__state-absolute-child">{children}</Row>
      )}
    </Box>
  )
}
