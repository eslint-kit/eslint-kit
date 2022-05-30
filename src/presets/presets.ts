import { effector } from './effector'
import { imports } from './imports'
import { nextJs } from './nextjs'
import { node } from './node'
import { prettier } from './prettier'
import { react } from './react'
import { ExtractName } from './shared'
import { solidJs } from './solid'
import { svelte } from './svelte'
import { typescript } from './typescript'
import { vue } from './vue'

export const presets = {
  imports,
  node,
  prettier,
  typescript,
  react,
  vue,
  solidJs,
  effector,
  nextJs,
  svelte,
}

export type PresetName = ExtractName<typeof presets[keyof typeof presets]>
