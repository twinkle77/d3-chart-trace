import { terser } from "rollup-plugin-terser"

import * as meta from "./package.json"

export default [
  {
    input: 'src/index.js',
    output: {
      name: meta.name,
      file: `dist/${meta.name}.js`,
      format: 'umd'
    },
    plugins: []
  },
  {
    input: 'src/index.js',
    output: {
      name: meta.name,
      file: `dist/${meta.name}.min.js`,
      format: 'umd',
    },
    plugins: [terser()]
  }
]
