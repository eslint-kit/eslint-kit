import { createPreset } from '../shared'

export interface Options {
  onlySample?: boolean
}

export const effector = createPreset<'effector', Options | void>({
  name: 'effector',
  compile: ({ options }) => {
    const basedOn: string[] = [
      'plugin:effector/recommended',
      'plugin:effector/scope',
      'plugin:effector/react',
    ]

    if (options?.onlySample) {
      basedOn.push('plugin:effector/future')
    }

    return {
      plugins: ['effector'],
      extends: basedOn,
    }
  },
})
