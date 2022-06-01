import { effector } from './effector'
import { imports } from './imports'
import { publicPresetNames } from './names'
import { nextJs } from './nextjs'
import { node } from './node'
import { prettier } from './prettier'
import { react } from './react'
import { remix } from './remix'
import { PresetFabric } from './shared'
import { solidJs } from './solid'
import { svelte } from './svelte'
import { typescript } from './typescript'
import { vue } from './vue'

export type PresetsCompound = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [Key in keyof typeof publicPresetNames]: PresetFabric<any>
}

export const presets: PresetsCompound = {
  imports,
  node,
  prettier,
  typescript,
  react,
  vue,
  solidJs,
  effector,
  nextJs,
  remix,
  svelte,
}
