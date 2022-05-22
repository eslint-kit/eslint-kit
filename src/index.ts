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
  root?: string
  presets: Preset[]
  extend?: Linter.Config
}

export function configure({
  root = process.cwd(),
  presets,
  extend = {},
}: Options) {
  return compilePresets(
    [base({ root }), ...presets, presetExtend(extend)],
    PRIORITY
  )
}

export { presets }
