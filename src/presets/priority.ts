import { PresetName } from './presets'

export const PRIORITY: PresetName[] = [
  // should be applied first
  'typescript',

  'prettier',
  'node',
  'react',
  'solid.js',

  // apply after react preset
  'next.js',

  // may need next.js integration in future
  'effector',

  // apply after all extensions are set
  'alias',
]
