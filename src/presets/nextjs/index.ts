import { conditional } from '../../shared/lib/eslint'
import { createPreset } from '../shared'

export const nextJs = createPreset({
  name: 'next.js',
  compile: ({ meta }) => ({
    extends: ['plugin:@next/next/recommended'],
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      ...conditional.rules(meta.imports.used, {
        'import/no-default-export': 'off',
      }),
    },
  }),
})
