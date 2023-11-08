import nextra from 'nextra'
import { PHASE_EXPORT } from 'next/constants.js'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true,
  flexsearch: {
    codeblocks: false,
  },
  defaultShowCopyCode: true,
})

export default function (phase) {
  return withNextra({
    ...(phase === PHASE_EXPORT
      ? {
          images: {
            unoptimized: true,
          },
        }
      : {}),
    reactStrictMode: true,
    eslint: {
      // ESLint behaves weirdly in this monorepo.
      ignoreDuringBuilds: true,
    },
    webpack(config) {
      const allowedSvgRegex = /components\/icons\/.+\.svg$/

      const fileLoaderRule = config.module.rules.find((rule) =>
        rule.test?.test?.('.svg')
      )
      fileLoaderRule.exclude = allowedSvgRegex

      config.module.rules.push({
        test: allowedSvgRegex,
        use: ['@svgr/webpack'],
      })
      return config
    },
  })
}
