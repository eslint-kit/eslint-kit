import { presetNextJs } from './next.js'
import { presetNode } from './node'
import { presetPrettier } from './prettier'
import { presetReact } from './react'
import { presetReactNewJSXTransform } from './react-new-jsx-transform'
import { presetTypescript } from './typescript'

export const PRESETS = {
  'node': presetNode,
  'prettier': presetPrettier,
  'typescript': presetTypescript,
  'react': presetReact,
  'react-new-jsx-transform': presetReactNewJSXTransform,
  'next.js': presetNextJs,
}

export type Preset = keyof typeof PRESETS

export const PRIORITY: Preset[] = [
  'node',
  'prettier',
  'typescript',
  'react',
  'react-new-jsx-transform',
  'next.js',
]
