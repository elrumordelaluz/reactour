const withTM = require('next-transpile-modules')([
  '@reactour/utils',
  '@reactour/mask',
  '@reactour/popover',
  '@reactour/tour',
])

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['cdn.dribbble.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
})

// module.exports = {
//   reactStrictMode: true,
//   typescript: {
//     ignoreBuildErrors: true,
//   },
// }
