import { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import '../styles.css'
// import '@reactour/popover/dist/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}
