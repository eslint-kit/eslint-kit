import { Linter } from 'eslint'
import { Preset, PRESETS, PRIORITY } from './presets'
import { presetBase } from './presets/base'
import { mergeConfigs } from './shared/lib/eslint'

interface Options {
  presets: Preset[]
  extend?: Linter.Config
}

export function configure({ presets, extend = {} }: Options) {
  const configs = presets
    .sort((a, b) => PRIORITY.indexOf(a) - PRIORITY.indexOf(b))
    .map((name) => PRESETS[name])
  const merged = mergeConfigs([presetBase, ...configs, extend])
  return merged
}
