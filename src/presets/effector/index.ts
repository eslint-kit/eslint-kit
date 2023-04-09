import { conditional } from '../../shared/lib/eslint'
import { publicPresetNames } from '../names'
import { createPreset } from '../shared'

export interface Options {
  future?: boolean
}

export const effector = createPreset<Options>({
  name: publicPresetNames.effector,
  compile: ({ options = {}, meta }) => {
    const { future = true } = options

    return {
      plugins: ['effector'],
      extends: [
        'plugin:effector/recommended',
        'plugin:effector/scope',
        ...conditional.extends(meta.presets.has('react'), [
          'plugin:effector/react',
        ]),
        ...conditional.extends(future, ['plugin:effector/future']),
      ],
      rules: {
        'effector/no-patronum-debug': meta.allowDebug ? 'off' : 'error',
      },
    }
  },
})
