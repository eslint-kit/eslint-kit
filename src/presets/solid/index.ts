import { conditional } from '../../shared/lib/eslint'
import { createPreset } from '../shared'

export interface Options {
  version?: string | 'detect'
  newJSXTransform?: boolean
}

export const solidJs = createPreset({
  name: 'solid.js',
  compile: ({ meta }) => ({
    env: {
      browser: true,
    },
    parserOptions: {
      babelOptions: {
        presets: ['solid'],
      },
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['solid'],
    extends: [
      'plugin:solid/recommended',
      ...conditional.extends(meta.typescript.used, ['plugin:solid/typescript']),
    ],
  }),
})
