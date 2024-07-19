import { defineConfig } from 'rollup'
import bundleSize from 'rollup-plugin-bundle-size'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const src = (file) => `src/${file}`
const dist = (file) => `dist/${file}`

const bundle = (input, config) =>
  defineConfig({
    ...config,
    input,
    external: (id) => !/^[./]/.test(id),
    plugins: [...(config.plugins || []), bundleSize()],
  })

const config = defineConfig([
  bundle(src('index.ts'), {
    plugins: [esbuild()],
    output: [
      {
        file: dist('index.js'),
        format: 'cjs',
      },
      {
        file: dist('index.mjs'),
        format: 'es',
      },
    ],
  }),
  bundle(src('index.ts'), {
    plugins: [dts()],
    output: [
      {
        file: dist('index.d.ts'),
        format: 'es',
      },
    ],
  }),
])

// eslint-disable-next-line import-x/no-default-export
export default config
