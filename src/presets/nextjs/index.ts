import { createPreset } from '../shared'

export const nextJs = createPreset({
  name: 'next.js',
  compile: () => ({
    rules: {
      'import/no-default-export': 'off',
    },
  }),
})
