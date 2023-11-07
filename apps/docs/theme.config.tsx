import { useRouter } from 'next/router'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'

const logo = (
  <svg
    height="30"
    viewBox="0 0 177 26"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style
      dangerouslySetInnerHTML={{
        __html:
          '.st1{fill:url(#SVGID_00000178183635163137821780000005899064768443433389_)}',
      }}
    />
    <radialGradient
      id="SVGID_1_"
      cx="30.979"
      cy="19.337"
      r="104.689"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset={0} stopColor="#191654" />
      <stop offset={1} stopColor="#43c6ac" />
    </radialGradient>
    <path
      fill="url(#SVGID_1_)"
      d="M43.9 17c1-.4 1.7-1 2.2-1.8s.8-1.7.8-2.8c0-1.1-.3-2-.8-2.8-.5-.8-1.3-1.4-2.2-1.8-.9-.4-2-.6-3.3-.6h-6.3v14.4h3.4v-4h3l2.8 4.1h3.7L43.9 17zm-1.2-6.4c.5.5.8 1.1.8 1.9 0 .7-.3 1.4-.8 1.8-.5.5-1.3.7-2.3.7h-2.7V9.9h2.7c1 0 1.8.2 2.3.7zm14.6.6c-.8-.5-1.8-.7-2.9-.7-1.1 0-2.1.2-3 .7-.9.5-1.6 1.1-2.1 2-.5.9-.8 1.9-.8 3s.3 2 .8 2.9c.5.8 1.2 1.5 2.2 2 .9.5 2 .7 3.3.7 1 0 1.9-.1 2.6-.3.8-.3 1.4-.7 1.9-1.3l-1.7-1.9c-.3.4-.7.6-1.2.8-.5.2-1 .3-1.6.3s-1.2-.2-1.7-.4c-.5-.3-.8-.6-1.1-1.1-.2-.3-.3-.5-.3-.8h8.5v-.8c0-1.2-.3-2.2-.8-3.1-.5-.9-1.2-1.5-2.1-2zM53 13.3c.5-.3.9-.4 1.5-.4.5 0 1 .2 1.4.4.4.2.8.6 1 1 .2.3.3.6.4.9h-5.6l.3-.9c.3-.4.6-.8 1-1zm13.4-2.9c-.9 0-1.7.2-2.6.4-.9.2-1.6.6-2.2 1l1.2 2.3c.4-.4.9-.6 1.5-.8.5-.2 1.1-.3 1.7-.3.9 0 1.6.1 2 .5s.6.9.6 1.6v.1H66c-1.1 0-2 .1-2.7.4-.7.3-1.2.7-1.5 1.2s-.5 1-.5 1.7c0 .6.2 1.2.5 1.7s.8.9 1.4 1.2c.6.3 1.3.4 2.2.4 1 0 1.8-.2 2.3-.5.5-.2.8-.6 1.1-1.1v1.4h2.9v-6.3c0-1.7-.5-2.9-1.4-3.7-.9-.8-2.2-1.2-3.9-1.2zm1.2 8.9c-.4.3-.9.4-1.4.4s-1-.2-1.3-.4c-.3-.3-.5-.6-.5-1 0-.3.1-.7.4-.9.3-.3.8-.4 1.6-.4h2.2v1.5l-.1-.3c-.2.5-.5.8-.9 1.1zm10.1-4.9c-.3.5-.4 1-.4 1.7 0 .6.1 1.2.4 1.7s.6.8 1 1.1c.4.2.9.4 1.5.4.5 0 1-.1 1.4-.4.4-.2.8-.6 1.1-1.2l2.5 1.4c-.4.9-1.1 1.6-1.9 2.1-1 .4-2 .6-3.1.6-1.2 0-2.3-.2-3.2-.7s-1.7-1.2-2.2-2c-.5-.9-.8-1.9-.8-3s.3-2.1.8-3c.5-.9 1.3-1.5 2.2-2 .9-.5 2-.7 3.2-.7s2.2.2 3.1.7c.9.5 1.5 1.2 1.9 2.1l-2.5 1.3c-.3-.5-.7-.9-1.1-1.2-.4-.2-.9-.4-1.4-.4-.6 0-1 .1-1.5.4-.4.2-.8.6-1 1.1zm19-4.5h-4.6v11.7h-3.4V9.9h-4.6V7.2h12.6v2.7zm8.8 1.3c-.9-.5-1.9-.7-3.1-.7-1.1 0-2.2.2-3.1.7-.9.5-1.7 1.1-2.2 2-.5.9-.8 1.9-.8 3s.3 2 .8 2.9c.6.8 1.3 1.5 2.2 2 .9.5 1.9.7 3.1.7 1.2 0 2.1-.2 3.1-.7s1.7-1.1 2.2-2c.5-.8.8-1.8.8-2.9 0-1.2-.3-2.1-.8-3-.6-.8-1.3-1.5-2.2-2zm-.7 6.5c-.2.5-.6.9-1 1.1-.4.3-.9.4-1.4.4s-1-.1-1.4-.4-.7-.6-1-1.1c-.3-.4-.4-1-.4-1.6 0-.7.1-1.2.4-1.7.2-.5.6-.9 1-1.1.4-.3.9-.4 1.4-.4s1 .2 1.4.4c.4.3.8.6 1 1.1.3.5.4 1.1.4 1.7 0 .6-.2 1.1-.4 1.6zm13.8-7.1h3.2v11.1h-3.1v-1.3c-.3.3-.6.6-1 .8-.7.4-1.5.6-2.3.6-.9 0-1.7-.2-2.5-.5-.7-.4-1.3-.9-1.7-1.6-.4-.7-.6-1.7-.6-2.8v-6.3h3.2v5.8c0 .9.2 1.6.6 2 .4.4.9.7 1.7.7.5 0 .9-.1 1.3-.3.4-.2.7-.5.9-1 .2-.4.3-1 .3-1.7v-5.5zm13.3-.2v3h-.8c-.9 0-1.6.3-2.1.8s-.8 1.3-.8 2.3v5.2h-3.3V10.6h3.1v1.5c.3-.4.7-.8 1.2-1.1.7-.4 1.6-.6 2.7-.6z"
    />
    <radialGradient
      id="SVGID_00000056401725522644037400000017111811060283636629_"
      cx="25.826"
      cy="12.791"
      r="26.12"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset={0} stopColor="#191654" />
      <stop offset={1} stopColor="#43c6ac" />
    </radialGradient>
    <path
      fill="url(#SVGID_00000056401725522644037400000017111811060283636629_)"
      d="M17.2 16.1c.1 0 .1 0 0 0 1.2-.5 2-1.2 2.6-2.2.6-.9.9-2 .9-3.3s-.3-2.4-.9-3.4-1.5-1.7-2.6-2.2-2.5-.8-4-.8H5.8v3.3c.7 1.6 2.5 2.6 4.3 2.3.7-.1 1.4-.2 2.2-.2-.2-.6-.3-1.2-.5-1.8-.1-.6-.3-1.2-.5-1.9.6.1 1.1 0 1.4.6.7.8 1.3 1.6 1.9 2.5.1.2.3.3.5.3 1.2-.1 2.4-.1 3.6-.1.6 0 .9.3 1 .8 0 .4-.3.8-.8.9-1.2.2-2.4.5-3.6.7-.1 0-.2.2-.3.3-.4 1-.7 1.9-1 2.9-.2.7-.7.8-1.4 1v-3.5c0-.3 0-.4-.4-.4-.9.1-1.8.3-2.7.3-1.8.1-3.1 1.1-3.7 2.5v7.1h4V17h3.7l3.3 4.8h4.3l-3.9-5.7z"
    />

    <style jsx>{`
      svg {
        mask-image: linear-gradient(
          60deg,
          black 25%,
          rgba(0, 0, 0, 0.2) 50%,
          black 75%
        );
        mask-size: 400%;
        mask-position: 0%;
      }
      svg:hover {
        mask-position: 100%;
        transition:
          mask-position 1s ease,
          -webkit-mask-position 1s ease;
      }
    `}</style>
  </svg>
)

const config: DocsThemeConfig = {
  project: {
    link: 'https://github.com/elrumordelaluz/reactour',
  },
  docsRepositoryBase:
    'https://github.com/elrumordelaluz/reactour/tree/main/apps/docs',
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – Reactour',
      }
    }
  },
  logo,
  head: function useHead() {
    const { title } = useConfig()
    const { route } = useRouter()
    const socialCard =
      route === '/' || !title
        ? 'https://docs.react.tours/og.jpeg'
        : `https://docs.react.tours/api/og?title=${title}`

    return (
      <>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta
          name="description"
          content="Tourist Guide into your React Components"
        />
        <meta
          name="og:description"
          content="Tourist Guide into your React Components"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={socialCard} />
        <meta name="twitter:site:domain" content="react.tours" />
        <meta name="twitter:url" content="https://react.tours" />
        <meta
          name="og:title"
          content={title ? title + ' – Reactour' : 'Reactour'}
        />
        <meta name="og:image" content={socialCard} />
        <meta name="apple-mobile-web-app-title" content="Reactour" />
        <link rel="icon" href="/favicon.png" type="image/png" />
      </>
    )
  },
  editLink: {
    text: 'Edit this page on GitHub →',
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
  },
  sidebar: {
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <span className="cursor-default">{title}</span>
      }
      return <>{title}</>
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <div>
          <a
            className="flex items-center gap-1 text-current"
            target="_blank"
            rel="noopener noreferrer"
            title="vercel.com homepage"
            href="https://vercel.com?utm_source=docs.react.tours"
          >
            <span>Powered by</span>
            <svg height={20} viewBox="0 0 283 64" fill="none">
              <title>Vercel</title>
              <path
                fill="currentColor"
                d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"
              />
            </svg>
          </a>
        </div>
        <p className="mt-6 text-xs">
          © {new Date().getFullYear()}{' '}
          <a
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
            title="vercel.com homepage"
            href="https://elrumordelaluz.com"
          >
            elrumordelaluz
          </a>
        </p>
      </div>
    ),
  },
  toc: {
    backToTop: true,
  },
}

export default config
