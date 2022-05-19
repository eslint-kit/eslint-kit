import { alias } from './alias'
import { nextJs } from './nextjs'
import { node } from './node'
import { prettier } from './prettier'
import { react } from './react'
import { reactNewJSXTransform } from './react-new-jsx-transform'
import { ExtractName } from './shared'
import { typescript } from './typescript'

export const presets = {
  node,
  prettier,
  typescript,
  react,
  reactNewJSXTransform,
  nextJs,
  alias,
}

export type PresetName = ExtractName<typeof presets[keyof typeof presets]>
