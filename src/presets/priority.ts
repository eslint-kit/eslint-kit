import { PresetName } from './names'

export const PRIORITY: PresetName[] = [
  // should be applied first
  'base',
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
  'remix',

  // may need next.js integration in future
  'effector',

  // should be applied last
  'extend',
]
