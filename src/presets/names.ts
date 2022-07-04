export const servicePresetNames = {
  base: 'base',
  extend: 'extend',
} as const

export const publicPresetNames = {
  imports: 'imports',
  node: 'node',
  prettier: 'prettier',
  typescript: 'typescript',
  react: 'react',
  vue: 'vue',
  solidJs: 'solid.js',
  effector: 'effector',
  nextJs: 'next.js',
  remix: 'remix',
  svelte: 'svelte',
  fsd: 'fsd',
} as const

export type ServicePresetName =
  typeof servicePresetNames[keyof typeof servicePresetNames]

export type PublicPresetName =
  typeof publicPresetNames[keyof typeof publicPresetNames]

export type PresetName = ServicePresetName | PublicPresetName
