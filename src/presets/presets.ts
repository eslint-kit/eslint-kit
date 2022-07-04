import { effector } from './effector'
import { fsd } from './fsd'
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

export const presets = {
  imports,
  node,
  prettier,
  typescript,
  react,
  vue,
  fsd,
  solidJs,
  effector,
  nextJs,
  remix,
  svelte,
}

/*
 * Typecheck presets
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PresetsCompound = Record<keyof typeof publicPresetNames, PresetFabric<any>>
const _typedPresets: PresetsCompound = presets
