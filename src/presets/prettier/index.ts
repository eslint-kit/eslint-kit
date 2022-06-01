import { Options } from 'prettier'
import { publicPresetNames } from '../names'
import { createPreset } from '../shared'

export const prettier = createPreset<Options | void>({
  name: publicPresetNames.prettier,
  compile: ({ options }) => ({
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': options ? ['warn', options] : 'warn',
    },
  }),
})
