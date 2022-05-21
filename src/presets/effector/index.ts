import { conditional } from '../../shared/lib/eslint'
import { createPreset } from '../shared'

export interface Options {
  onlySample?: boolean
}

export const effector = createPreset<'effector', Options | void>({
  name: 'effector',
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
