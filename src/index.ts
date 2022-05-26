import '@rushstack/eslint-patch/modern-module-resolution'
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
  const config = compilePresets(
    [base({ root }), ...presets, presetExtend(extend)],
    PRIORITY
  )

  applyModuleResolutionPatch(config)

  return config
}

export { presets }
