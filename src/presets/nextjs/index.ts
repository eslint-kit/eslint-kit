import { createPreset } from '../shared'

export const nextJs = createPreset({
  name: 'next.js',
  compile: () => ({
    extends: ['plugin:@next/next/recommended'],
    rules: {
      'import/no-default-export': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  }),
})
