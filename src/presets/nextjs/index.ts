import { createPreset } from '../shared'

export const nextJs = createPreset({
  name: 'next.js',
  compile: () => ({
    extends: ['plugin:@next/next/recommended'],
    rules: {
      'import/no-default-export': 'off',
    },
  }),
})
