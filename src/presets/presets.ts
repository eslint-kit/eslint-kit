import { astro } from './astro'
import { effector } from './effector'
import { imports } from './imports'
import { publicPresetNames } from './names'
import { nextJs } from './nextjs'
import { node } from './node'
import { prettier } from './prettier'
import { react } from './react'
import { remix } from './remix'
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
  astro,
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
type PresetsCompound = Record<keyof typeof publicPresetNames, CallableFunction>
const _typedPresets: PresetsCompound = presets
