import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import css from 'rollup-plugin-import-css'
import pkg from './package.json'

export default {
  input: 'src/index.js',
  external: [
    ...Object.keys(pkg.peerDependencies),
    ...Object.keys(pkg.dependencies),
  ],
  plugins: [
    resolve(),
    babel({
      exclude: ['node_modules/**'],
    }),
    filesize(),
    css(),
  ],
  output: [
    { file: pkg.main, format: 'cjs', exports: 'named' },
    { file: pkg.module, format: 'es', exports: 'named' },
  ],
}
