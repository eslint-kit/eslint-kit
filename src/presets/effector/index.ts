import { conditional } from '../../shared/lib/eslint'
import { publicPresetNames } from '../names'
import { createPreset } from '../shared'

export interface Options {
  onlySample?: boolean
}

export const effector = createPreset<Options | void>({
  name: publicPresetNames.effector,
  compile: ({ options }) => {
    return {
      plugins: ['effector'],
      extends: [
        'plugin:effector/recommended',
        'plugin:effector/scope',
        'plugin:effector/react',
        ...conditional.extends(options?.onlySample, ['plugin:effector/future']),
      ],
    }
  },
})
