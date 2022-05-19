import { Linter } from 'eslint'
import { extensions } from './constants'

export const importSettings: Linter.Config['settings'] = {
  'import/extensions': extensions.js,
  'import/resolver': {
    node: {
      extensions: extensions.js,
    },
  },
  'import/core-modules': [],
  'import/ignore': ['\\.(coffee|scss|css|less|hbs|svg|json)$'],
  'import/internal-regex': '^@types/',
}

type ImportExtensionsRule = [
  Linter.RuleLevel,
  'ignorePackages',
  Record<string, 'never'>
]

export const importExtensionsRule: ImportExtensionsRule = [
  'warn',
  'ignorePackages',
  {
    js: 'never',
    mjs: 'never',
    jsx: 'never',
  },
]

export const importRules: Linter.RulesRecord = {
  'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],
  'import/no-anonymous-default-export': [
    'error',
    {
      allowCallExpression: false,
    },
  ],
  'import/export': 'error',
  'import/no-mutable-exports': 'error',
  'import/no-amd': 'error',
  'import/first': 'error',
  'import/no-duplicates': 'error',
  'import/extensions': importExtensionsRule,
  'import/newline-after-import': 'warn',
  'import/no-webpack-loader-syntax': 'error',
  'import/no-self-import': 'error',
  'import/no-cycle': ['error', { maxDepth: Number.POSITIVE_INFINITY }],
  'import/no-useless-path-segments': ['warn', { commonjs: true }],
}
