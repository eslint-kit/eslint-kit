import { Linter } from 'eslint'
import {
  compilePresets,
  Preset,
  presetExtend,
  presets,
  PRIORITY,
} from './presets'
import { base } from './presets/base'

interface Options {
  presets: Preset[]
  extend?: Linter.Config
}

export function configure({ presets, extend = {} }: Options) {
  return compilePresets([base(), ...presets, presetExtend(extend)], PRIORITY)
}

export { presets }
