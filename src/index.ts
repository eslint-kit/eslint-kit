import { Linter } from 'eslint'
import { applyModuleResolutionPatch } from './patch/patch'
import {
  compilePresets,
  Preset,
  presetExtend,
  presets,
  PRIORITY,
} from './presets'
import { base } from './presets/base'
import { mergeConfigs } from './shared/lib/eslint'

interface Options {
  root?: string
  presets: Preset[]
  extend?: Linter.Config
}

export function configure({
  root = process.cwd(),
  presets,
  extend = {},
}: Options) {
  const kitConfig = compilePresets(
    [base({ root }), ...presets, presetExtend(extend)],
    PRIORITY
  )

  // Patch resolution only for included modules
  applyModuleResolutionPatch(kitConfig)

  const userConfig = compilePresets([presetExtend(extend)], PRIORITY)

  return mergeConfigs([kitConfig, userConfig])
}

export { presets }
