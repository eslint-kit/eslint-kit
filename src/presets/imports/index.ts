import { EXTENSIONS } from '../../shared'
import { publicPresetNames } from '../names'
import { createPreset } from '../shared'
import { createAliasSettings } from './alias'
import { Options } from './types'

const DEFAULT_IMPORT_GROUPS: string[][] = [
  // side effects
  ['^\\u0000'],

  // node.js libraries and scoped libraries
  ['^(child_process|crypto|events|fs|http|https|os|path)(/.*)?$', '^@?\\w'],

  // common aliases (@app, @root, @/, ~/) and anything not matched
  ['^@app', '^@root', '^~', '^'],

  // relative imports
  ['^\\.'],
]

export const imports = createPreset<Options>({
  name: publicPresetNames.imports,
  updateMeta: ({ meta }) => {
    meta.imports.extensions.push(...EXTENSIONS.MISC)
    meta.imports.extensions.push(...EXTENSIONS.JS)
  },
  compile: ({ options = {}, meta }) => {
    const { sort = {} } = options
    const { newline = false, groups = DEFAULT_IMPORT_GROUPS } = sort

    const finalGroups = newline ? groups : [groups.flat()]

    return {
      plugins: ['import-x', 'simple-import-sort'],
      settings: {
        'import-x/core-modules': [],
        'import-x/ignore': ['\\.(coffee|scss|css|less|hbs|svg|json)$'],
        'import-x/internal-regex': '^@types/',
        ...createAliasSettings({ options, meta }),
      },
      rules: {
        'import-x/no-unresolved': [
          'error',
          { commonjs: true, caseSensitive: true },
        ],
        'import-x/no-default-export': 'warn',
        'import-x/no-anonymous-default-export': 'error',
        'import-x/export': 'error',
        'import-x/no-mutable-exports': 'error',
        'import-x/no-amd': 'error',
        'import-x/first': 'error',
        'import-x/no-duplicates': 'error',
        'import-x/newline-after-import': 'warn',
        'import-x/no-webpack-loader-syntax': 'error',
        'import-x/no-self-import': 'error',
        'import-x/no-useless-path-segments': ['warn', { commonjs: true }],

        'simple-import-sort/imports': ['warn', { groups: finalGroups }],
        'simple-import-sort/exports': 'warn',
      },
    }
  },
})
