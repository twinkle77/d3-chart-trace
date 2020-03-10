import { terser } from "rollup-plugin-terser"
import { eslint } from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from '@rollup/plugin-replace'
import alias from '@rollup/plugin-alias'
import babel from 'rollup-plugin-babel'
import less from 'rollup-plugin-less'
import path from 'path'
import * as meta from "./package.json"

const pathResolve = p => path.resolve(__dirname, p)

const root = pathResolve('src')

const plugins = [
  eslint({
    fix: true,
    include: `${root}/**`,
    exclude: [`${root}/assets/**`]
  }),
  less({
    insert: true,
    output: false
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  resolve({
    browser: true,
    main: true,
    jsnext: true
  }),
  commonjs(),
  alias({
    entries: {
      '@': root
    }
  }),
  babel(
    {
      exclude: 'node_modules/**'
    }
  )
]

const config = [
  {
    input: 'src/index.js',
    output: {
      name: meta.name,
      dir: `dist`,
      format: 'esm',
      sourcemap: 'inline',
      entryFileNames: `${meta.name}.js`
    },
    plugins
  }
]

if (process.env.NODE_ENV === 'production') {
  config.push({
    input: 'src/index.js',
    output: {
      name: meta.name,
      dir: `dist`,
      format: 'esm',
      entryFileNames: `${meta.name}.min.js`,
      chunkFileNames: '[name]-[hash].min.js'
    },
    plugins: [...plugins, terser()]
  })
}

export default config
