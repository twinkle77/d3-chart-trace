import { terser } from "rollup-plugin-terser"
import buble from 'rollup-plugin-buble'
import alias from 'rollup-plugin-alias'
import replace from 'rollup-plugin-replace'
import { eslint } from 'rollup-plugin-eslint'

import path from 'path'

import * as meta from "./package.json"

const pathResolve = p => path.resolve(__dirname, p)

export default [
  {
    input: 'src/index.js',
    output: {
      name: meta.name,
      file: `dist/${meta.name}.js`,
      format: 'umd'
    },
    plugins: [
      buble(),
      alias({
        '@': pathResolve('src')
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      eslint()
    ]
  },
  {
    input: 'src/index.js',
    output: {
      name: meta.name,
      file: `dist/${meta.name}.min.js`,
      format: 'umd',
    },
    plugins: [
      terser(),
      buble(),
      alias({
        '@': pathResolve('src')
      })
    ]
  }
]
