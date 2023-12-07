import { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://cdn.carbonads.com/carbon.js?serve=CWYI623E&placement=wwwreacttours"
        id="_carbonads_js"
      />
      <Component {...pageProps} />
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
