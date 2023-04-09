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
import { applyMode, mergeConfigs, Mode } from './shared/lib/eslint'

interface Options {
  root?: string
  mode?: Mode
  allowDebug?: boolean
  presets: Preset[]
  extend?: Linter.Config
}

export function configure({
  root = process.cwd(),
  mode = 'default',
  allowDebug,
  presets,
  extend = {},
}: Options) {
  let kitConfig = compilePresets(
    [base({ root, allowDebug }), ...presets, presetExtend(extend)],
    PRIORITY
  )

  // Apply mode only for included rules
  kitConfig = applyMode(kitConfig, mode)

  // Patch resolution only for included modules
  applyModuleResolutionPatch(kitConfig)

  const userConfig = compilePresets([presetExtend(extend)], PRIORITY)

  return mergeConfigs([kitConfig, userConfig])
}

export { presets }
