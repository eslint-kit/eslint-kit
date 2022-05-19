import { Preset, PRESETS, PRIORITY } from './presets'
import { presetBase } from './presets/base'
import { mergeConfigs } from './shared/lib/eslint'

interface Options {
  presets: Preset[]
}

export function configure({ presets }: Options) {
  const configs = presets
    .sort((a, b) => PRIORITY.indexOf(a) - PRIORITY.indexOf(b))
    .map((name) => PRESETS[name])
  const merged = mergeConfigs([presetBase, ...configs])
  return merged
}
