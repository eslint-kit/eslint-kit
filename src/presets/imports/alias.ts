import path from 'path'
import { conditional } from '../../shared/lib/eslint'
import { readJson } from '../../shared/lib/fs'
import { Jsconfig } from '../../shared/types'
import { publicPresetNames } from '../names'
import { Meta } from '../shared'
import { Options } from './types'

export interface Input {
  options?: Options
  meta: Meta
}

export function createAliasSettings({ options = {}, meta }: Input) {
  const { alias: aliasOptions = {} } = options
  const {
    root = meta.root,
    paths = {},
    jsconfig = 'jsconfig.json',
  } = aliasOptions

  const jsconfigJson = readJson<Jsconfig>(meta.root, jsconfig)

  const useTsconfig = meta.presets.has(publicPresetNames.typescript)
  const useJsconfig = Boolean(jsconfigJson)

  const alias = Object.entries(paths).reduce<Record<string, string>>(
    (alias, [key, value]) => {
      alias[key] = path.join(root, value)
      return alias
    },
    {}
  )

  return {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias,
        extensions: meta.imports.extensions,
      },
      ...conditional.settings(useJsconfig, {
        jsconfig: {
          config: path.resolve(meta.root, jsconfig),
          extensions: meta.imports.extensions,
        }
      }),
      ...conditional.settings(useTsconfig, {
        typescript: {
          alwaysTryTypes: true,
          project: meta.typescript.tsconfig,
        },
      }),
    },
  }
}
