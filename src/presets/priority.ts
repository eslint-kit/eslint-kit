import { PresetName } from './presets'

export const PRIORITY: PresetName[] = [
  // should be applied first
  'imports',
  'typescript',

  'prettier',
  'node',
  'react',
  'vue',
  'solid.js',
  'svelte',

  // apply after react preset
  'next.js',

  // may need next.js integration in future
  'effector',
]
