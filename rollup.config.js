import { terser } from "rollup-plugin-terser"
import { eslint } from 'rollup-plugin-eslint'

import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

import replace from '@rollup/plugin-replace'
import alias from '@rollup/plugin-alias'
import buble from '@rollup/plugin-buble'

import path from 'path'

import * as meta from "./package.json"

const pathResolve = p => path.resolve(__dirname, p)

const plugins = [
  eslint({
    fix: true,
    include: pathResolve('src') + '/**'
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
      '@': pathResolve('src')
    }
  }),
  buble({
    transforms: {
      dangerousForOf: true,
      generator: false
    }
  })
]

const config = [
  {
    input: 'src/index.js',
    output: {
      name: meta.name,
      file: `dist/${meta.name}.js`,
      format: 'umd',
      sourcemap: 'inline'
    },
    plugins
  }
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(terser())

  config.push({
    input: 'src/index.js',
    output: {
      name: meta.name,
      file: `dist/${meta.name}.min.js`,
      format: 'umd'
    },
    plugins
  })
}

export default config
