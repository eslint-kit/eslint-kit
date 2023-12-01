import { Options } from 'prettier'
import { publicPresetNames } from '../names'
import { createPreset } from '../shared'
import { createPrettierRule } from './lib'

export const prettier = createPreset<Options>({
  name: publicPresetNames.prettier,
  compile: ({ options = {}, meta }) => {
    return {
      plugins: ['prettier'],
      rules: {
        'prettier/prettier': createPrettierRule({ options, meta }),
      },
    }
  },
})
