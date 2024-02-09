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
import { applyMode, mergeConfigs, Mode } from './shared/lib/eslint';
import path from 'node:path'

const ESLintKitOptionsSymbol = Symbol('ESLintKitOptions')
interface ExtendedLinterConfig<
  T extends Linter.RulesRecord = Linter.RulesRecord,
> extends Linter.Config<T> {
  [ESLintKitOptionsSymbol]: FinalOptions
}

interface Options {
  extends?: string | ExtendedLinterConfig
  root?: string
  mode?: Mode
  allowDebug?: boolean
  presets?: Preset[]
  extend?: Linter.Config
}

interface FinalOptions {
  extends?: Options['extends']
  root: Required<Options>['root']
  mode: Required<Options>['mode']
  allowDebug?: boolean
  presets: Required<Options>['presets']
  extend: Required<Options>['extend']
}

function finalizeOptions(options: Options): FinalOptions {
  const ownFinalOptions: FinalOptions = {
    ...options,
    root: options.root || process.cwd(),
    mode: options.mode || 'default',
    presets: options.presets || [],
    extend: options.extend || {},
  }

  if (options.extends) {
    let extendedOptions: FinalOptions

    if (typeof options.extends === 'string') {
      const config = require(path.resolve(ownFinalOptions.root, options.extends))

      if (!config) {
        throw new Error(`Cannot find config ${options.extends}`)
      }

      if (!config[ESLintKitOptionsSymbol]) {
        throw new Error(
          `The config ${options.extends} is not produced by ESLint Kit`,
        )
      }

      extendedOptions = config[ESLintKitOptionsSymbol]
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!options.extends[ESLintKitOptionsSymbol]) {
        throw new Error(
          `The config specified in "extends" is not produced by ESLint Kit`,
        )
      }

      extendedOptions = options.extends[ESLintKitOptionsSymbol]
    }

    return {
      root: ownFinalOptions.root || extendedOptions.root,
      mode:
        'mode' in ownFinalOptions ? ownFinalOptions.mode : extendedOptions.mode,
      allowDebug:
        'allowDebug' in ownFinalOptions
          ? ownFinalOptions.allowDebug
          : extendedOptions.allowDebug,
      presets: extendedOptions.presets.concat(ownFinalOptions.presets),
      extend: {
        ...extendedOptions.extend,
        ...ownFinalOptions.extend,
        rules: {
          ...extendedOptions.extend.rules,
          ...ownFinalOptions.extend.rules,
        },
        env: {
          ...extendedOptions.extend.env,
          ...ownFinalOptions.extend.env,
        },
        globals: {
          ...extendedOptions.extend.globals,
          ...ownFinalOptions.extend.globals,
        },
        plugins: [
          ...(extendedOptions.extend.plugins || []),
          ...(ownFinalOptions.extend.plugins || []),
        ],
        settings: {
          ...extendedOptions.extend.settings,
          ...ownFinalOptions.extend.settings,
        },
        overrides: [
          ...(extendedOptions.extend.overrides || []),
          ...(ownFinalOptions.extend.overrides || []),
        ],
      },
    }
  }

  return ownFinalOptions
}

export function configure(options: Options) {
  const finalOptions = finalizeOptions(options)

  const { root, mode, allowDebug, presets, extend } = finalOptions

  let kitConfig = compilePresets(
    [base({ root, allowDebug }), ...presets, presetExtend(extend)],
    PRIORITY,
  )

  // Apply mode only for included rules
  kitConfig = applyMode(kitConfig, mode)

  // Patch resolution only for included modules
  applyModuleResolutionPatch(kitConfig)

  const userConfig = compilePresets([presetExtend(extend)], PRIORITY)

  const config = mergeConfigs([kitConfig, userConfig]) as ExtendedLinterConfig
  config[ESLintKitOptionsSymbol] = finalOptions
  return config
}

export { presets }
