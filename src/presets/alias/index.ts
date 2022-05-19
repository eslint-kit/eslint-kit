import pathLib from 'path'
import { Linter } from 'eslint'
import { createPreset, Meta } from '../shared'

export interface Options {
  root?: string
  paths?: Record<string, string>
  jsconfig?: string
}

export const alias = createPreset<'alias', Options | void>({
  name: 'alias',
  compile: ({ options = {}, meta }) => {
    return meta.typescript.used
      ? generateForTypeScript(meta)
      : generateForJavaScript(options, meta)
  },
})

function generateForJavaScript(options: Options, meta: Meta): Linter.Config {
  const { root = './', paths = {}, jsconfig } = options

  const map = Object.entries(paths).map(([alias, path]) => {
    return [alias, path.startsWith('.') ? pathLib.resolve(root, path) : path]
  })

  const settings: Linter.Config['settings'] = {
    'import/resolver': {
      alias: {
        map,
        extensions: meta.extensions,
      },
    },
  }

  if (jsconfig) {
    settings['import/resolver'].jsconfig = {
      config: jsconfig,
      extensions: meta.extensions,
    }
  }

  return { settings }
}

function generateForTypeScript(meta: Meta): Linter.Config {
  return {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: meta.typescript.tsconfig,
        },
      },
    },
  }
}
