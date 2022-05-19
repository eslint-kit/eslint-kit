import { Options } from 'prettier'
import { createPreset } from '../shared'

export const prettier = createPreset<'prettier', Options | void>({
  name: 'prettier',
  compile: ({ options }) => ({
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': options ? ['warn', options] : 'warn',
    },
  }),
})
