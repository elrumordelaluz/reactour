import { AppProps } from 'next/app'
import Script from 'next/script'
import { NextUIProvider } from '@nextui-org/react'
import '../styles.css'
// import '@reactour/popover/dist/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-RVNNN272SS" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-RVNNN272SS');
        `}
      </Script>
    </>
  )
}
