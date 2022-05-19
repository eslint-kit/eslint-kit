import { createPreset } from '../shared'

export const node = createPreset({
  name: 'node',
  compile: () => ({
    env: {
      node: true,
    },
  }),
})
