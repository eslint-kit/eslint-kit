import { publicPresetNames } from '../names'
import { createPreset } from '../shared'

export const node = createPreset({
  name: publicPresetNames.node,
  compile: () => ({
    env: {
      node: true,
    },
  }),
})
