import { conditional } from '../../shared/lib/eslint'
import { publicPresetNames } from '../names'
import { createPreset } from '../shared'

export const nextJs = createPreset({
  name: publicPresetNames.nextJs,
  compile: ({ meta }) => ({
    extends: ['plugin:@next/next/recommended'],
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      ...conditional.rules(meta.presets.has(publicPresetNames.imports), {
        'import-x/no-default-export': 'off',
      }),
    },
  }),
})
