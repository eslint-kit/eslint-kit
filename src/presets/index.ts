import { presetNode } from './node'
import { presetPrettier } from './prettier'
import { presetReact } from './react'
import { presetReactNewJSXTransform } from './react-new-jsx-transform'
import { presetTypescript } from './typescript'

export const PRESETS = {
  'node': presetNode,
  'prettier': presetPrettier,
  'react': presetReact,
  'react-new-jsx-transform': presetReactNewJSXTransform,
  'typescript': presetTypescript,
}

export type Preset = keyof typeof PRESETS

export const PRIORITY: Preset[] = [
  'node',
  'prettier',
  'react',
  'react-new-jsx-transform',
  'typescript',
]
