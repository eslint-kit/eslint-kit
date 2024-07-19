import path from 'path'
import { EXTENSIONS } from '../../shared'
import { conditional } from '../../shared/lib/eslint'
import { publicPresetNames } from '../names'
import { createPreset } from '../shared'
import { createTypescriptRules } from './lib'

export type Options = {
  root?: string
  tsconfig?: string
  enforceUsingType?: boolean
}

export const typescript = createPreset<Options>({
  name: publicPresetNames.typescript,
  updateMeta: ({ meta, options }) => {
    meta.imports.extensions = meta.imports.extensions.concat(EXTENSIONS.TS)
    meta.typescript.root = path.resolve(meta.root, options?.root ?? './')
    meta.typescript.tsconfig =
      options?.tsconfig ?? path.resolve(meta.typescript.root, 'tsconfig.json')
    meta.typescript.enforceUsingType = options?.enforceUsingType ?? false
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
        'import-x/resolver': {
          node: {
            extensions: meta.imports.extensions,
          },
        },
        'import-x/ignore': ['\\.(coffee|scss|css|less|hbs|svg|json)$'],
        'import-x/external-module-folders': [
          'node_modules',
          'node_modules/@types',
        ],
        'import-x/parsers': {
          '@typescript-eslint/parser': EXTENSIONS.TS,
        },
      },
    ),
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        rules: createTypescriptRules(meta),
      },
      {
        /**
         * Disable the rule for enforcing `type` for .d.ts because it can break the global type definitions
         */
        files: ['*.d.ts'],
        rules: {
          '@typescript-eslint/consistent-type-definitions': 'off',
        },
      },
    ],
  }),
})
