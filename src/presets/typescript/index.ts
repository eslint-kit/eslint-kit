import path from 'path'
import { EXTENSIONS } from '../../shared'
import { conditional } from '../../shared/lib/eslint'
import { createExtensionsRule } from '../imports/lib'
import { publicPresetNames } from '../names'
import { createPreset } from '../shared'
import { createTypescriptRules } from './lib'

export interface Options {
  root?: string
  tsconfig?: string
}

export const typescript = createPreset<Options | void>({
  name: publicPresetNames.typescript,
  updateMeta: ({ meta, options }) => {
    meta.imports.extensions = meta.imports.extensions.concat(EXTENSIONS.TS)
    meta.typescript.root = path.resolve(meta.root, options?.root ?? './')
    meta.typescript.tsconfig = options?.tsconfig ?? 'tsconfig.json'
  },
  compile: ({ meta }) => ({
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: meta.typescript.tsconfig,
      createDefaultProgram: true,
      tsconfigRootDir: meta.typescript.root,
    },
    settings: conditional.settings(
      meta.presets.has(publicPresetNames.imports),
      {
        'import/extensions': meta.imports.extensions,
        'import/resolver': {
          node: {
            extensions: meta.imports.extensions,
          },
        },
        'import/ignore': ['\\.(coffee|scss|css|less|hbs|svg|json)$'],
        'import/external-module-folders': [
          'node_modules',
          'node_modules/@types',
        ],
        'import/parsers': {
          '@typescript-eslint/parser': EXTENSIONS.TS,
        },
      }
    ),
    rules: conditional.rules(meta.presets.has(publicPresetNames.imports), {
      'import/extensions': createExtensionsRule(meta.imports.extensions),
    }),
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        rules: createTypescriptRules(meta),
      },
    ],
  }),
})
