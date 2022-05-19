import { extensions } from './constants'

export const importSettings = {
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

interface ImportRules {
  [rule: string]: unknown
  'import/extensions': [string, string, Record<string, 'never'>]
}

export const importRules: ImportRules = {
  'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true }],
  'import/no-anonymous-default-export': [
    'error',
    {
      allowCallExpression: false,
    },
  ],
  'import/export': 'error',
  // 'import/no-extraneous-dependencies': [
  //   'error',
  //   {
  //     devDependencies: [
  //       'test/**', // tape, common npm pattern
  //       'tests/**', // also common npm pattern
  //       'spec/**', // mocha, rspec-like pattern
  //       '**/__tests__/**', // jest pattern
  //       '**/__mocks__/**', // jest pattern
  //       'test.{js,jsx}', // repos with a single test file
  //       'test-*.{js,jsx}', // repos with multiple top-level test files
  //       '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
  //       '**/jest.config.js', // jest config
  //       '**/jest.setup.js', // jest setup
  //       '**/vue.config.js', // vue-cli config
  //       '**/webpack.config.js', // webpack config
  //       '**/webpack.config.*.js', // webpack config
  //       '**/rollup.config.js', // rollup config
  //       '**/rollup.config.*.js', // rollup config
  //       '**/gulpfile.js', // gulp config
  //       '**/gulpfile.*.js', // gulp config
  //       '**/Gruntfile{,.js}', // grunt config
  //       '**/protractor.conf.js', // protractor config
  //       '**/protractor.conf.*.js', // protractor config
  //       '**/karma.conf.js', // karma config
  //     ],
  //     optionalDependencies: false,
  //   },
  // ],
  'import/no-mutable-exports': 'error',
  'import/no-amd': 'error',
  'import/first': 'error',
  'import/no-duplicates': 'error',
  'import/extensions': [
    'warn',
    'ignorePackages',
    {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
    },
  ],
  'import/newline-after-import': 'warn',
  'import/no-webpack-loader-syntax': 'error',
  'import/no-self-import': 'error',
  'import/no-cycle': ['error', { maxDepth: Number.POSITIVE_INFINITY }],
  'import/no-useless-path-segments': ['warn', { commonjs: true }],
}
