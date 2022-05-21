import { alias } from './alias'
import { effector } from './effector'
import { nextJs } from './nextjs'
import { node } from './node'
import { prettier } from './prettier'
import { react } from './react'
import { ExtractName } from './shared'
import { typescript } from './typescript'

export const presets = {
  node,
  prettier,
  typescript,
  react,
  effector,
  nextJs,
  alias,
}

export type PresetName = ExtractName<typeof presets[keyof typeof presets]>
