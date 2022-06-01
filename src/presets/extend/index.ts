import { Linter } from 'eslint'
import { servicePresetNames } from '../names'
import { createPreset } from '../shared'

export const extend = createPreset<Linter.Config>({
  name: servicePresetNames.extend,
  compile: ({ options }) => {
    const { rules = {}, overrides = [], ...rest } = options

    return {
      ...rest,
      overrides: [
        ...overrides,
        {
          files: ['*.*'],
          rules,
        },
      ],
    }
  },
})
