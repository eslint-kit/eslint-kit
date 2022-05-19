import { PresetName } from './presets'

export const PRIORITY: PresetName[] = [
  // should be applied first
  'typescript',

  'prettier',
  'node',
  'react',

  // apply after react preset
  'react-new-jsx-transform',

  // apply after react preset
  'next.js',

  // apply after all extensions are set
  'alias',
]
