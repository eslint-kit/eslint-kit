import { conditional } from '../../shared/lib/eslint'
import { publicPresetNames } from '../names'
import { createPreset } from '../shared'

export const remix = createPreset({
  name: publicPresetNames.remix,
  compile: ({ meta }) => ({
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      ...conditional.rules(meta.presets.has(publicPresetNames.imports), {
        'import/no-default-export': 'off',
      }),
    },
  }),
})
