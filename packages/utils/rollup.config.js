import typescript from '@rollup/plugin-typescript'

export default {
  input: 'index.tsx',
  output: [
    {
      dir: 'dist',
      format: 'es',
    },
    {
      dir: 'dist',
      format: 'cjs',
    },
  ],
  plugins: [typescript()],
  external: [
    'react',
    'react-dom',
    '@rooks/use-mutation-observer',
    'resize-observer-polyfill',
  ],
}
