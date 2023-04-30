import { readJson } from '../../shared/lib/fs'
import { Jsconfig, PackageJson } from '../../shared/types'
import { servicePresetNames } from '../names'
import { createPreset } from '../shared'

interface Options {
  root?: string
  allowDebug?: boolean
}

export const base = createPreset<Options>({
  name: servicePresetNames.base,
  updateMeta: ({ options = {}, meta }) => {
    const { root = process.cwd(), allowDebug = false } = options

    meta.root = root
    meta.allowDebug = allowDebug

    meta.readPackageJson = () => {
      return readJson<PackageJson>(root, 'package.json')
    }

    meta.readJsconfig = () => {
      return readJson<Jsconfig>(root, 'jsconfig.json')
    }
  },
  compile: ({ meta }) => ({
    plugins: ['unicorn', 'sonarjs'],
    env: {
      es6: true,
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
      requireConfigFile: false,
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    rules: {
      // eslint error-check rules
      'for-direction': 'error',
      'getter-return': 'error',
      'no-async-promise-executor': 'error',
      'no-compare-neg-zero': 'error',
      'no-cond-assign': 'error',
      'no-constant-condition': 'error',
      'no-control-regex': 'error',
      'no-debugger': meta.allowDebug ? 'off' : 'error',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-empty-character-class': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'warn',
      'no-func-assign': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': 'error',
      'no-irregular-whitespace': 'error',
      'no-misleading-character-class': 'error',
      'no-obj-calls': 'error',
      'no-prototype-builtins': 'warn',
      'no-regex-spaces': 'warn',
      'no-setter-return': 'error',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',
      'require-atomic-updates': 'warn',
      'use-isnan': 'error',

      // eslint best-practice rules
      'array-callback-return': 'error',
      'default-case': 'error',
      'dot-notation': 'warn',
      'eqeqeq': ['error', 'smart'],
      'no-alert': meta.allowDebug ? 'off' : 'warn',
      'no-console': [
        meta.allowDebug ? 'off' : 'warn',
        { allow: ['warn', 'error', 'info', 'group', 'groupEnd', 'table'] },
      ],
      'no-case-declarations': 'warn',
      'no-constructor-return': 'warn',
      'no-else-return': ['warn', { allowElseIf: false }],
      'no-empty-pattern': 'error',
      'no-extend-native': 'error',
      'no-fallthrough': 'warn',
      'no-global-assign': 'error',
      'no-implicit-coercion': 'warn',
      'no-loop-func': 'error',
      'no-new': 'warn',
      'no-new-wrappers': 'error',
      'no-octal': 'error',
      'no-octal-escape': 'error',
      'no-param-reassign': ['warn', { props: false }],
      'no-proto': 'error',
      'no-redeclare': 'error',
      'no-return-assign': 'warn',
      'no-return-await': 'warn',
      'no-self-assign': 'error',
      'no-self-compare': 'error',
      'no-sequences': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-unused-expressions': 'warn',
      'no-unused-labels': 'error',
      'no-useless-call': 'warn',
      'no-useless-escape': 'warn',
      'no-useless-return': 'warn',
      'no-void': ['warn', { allowAsStatement: true }],
      'no-with': 'error',
      'radix': 'error',
      'yoda': 'warn',

      // eslint variable rules
      'no-delete-var': 'error',
      'no-shadow-restricted-names': 'error',
      'no-undef': 'error',
      'no-undef-init': 'warn',
      'no-unused-vars': [
        'warn',
        {
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],

      // eslint stylistic rules
      'lines-between-class-members': [
        'warn',
        'always',
        { exceptAfterSingleLine: true },
      ],
      'no-lonely-if': 'warn',
      'no-bitwise': 'warn',
      'no-array-constructor': 'warn',
      'no-new-object': 'warn',
      'no-unneeded-ternary': 'warn',
      'operator-assignment': 'warn',
      'prefer-exponentiation-operator': 'warn',

      // eslint es6 rules
      'constructor-super': 'error',
      'no-class-assign': 'error',
      'no-const-assign': 'error',
      'no-dupe-class-members': 'error',
      'no-new-symbol': 'error',
      'no-this-before-super': 'error',
      'no-useless-computed-key': 'warn',
      'no-useless-constructor': 'warn',
      'no-useless-rename': 'warn',
      'no-var': 'error',
      'object-shorthand': 'warn',
      'prefer-arrow-callback': 'warn',
      'prefer-const': 'warn',
      'prefer-rest-params': 'warn',
      'prefer-spread': 'warn',
      'require-yield': 'error',

      // unicorn plugin
      'unicorn/catch-error-name': 'warn',
      'unicorn/error-message': 'warn',
      'unicorn/escape-case': 'warn',
      'unicorn/explicit-length-check': 'warn',
      'unicorn/new-for-builtins': 'error',
      'unicorn/no-abusive-eslint-disable': 'warn',
      'unicorn/no-instanceof-array': 'error',
      'unicorn/no-console-spaces': 'warn',
      'unicorn/no-for-loop': 'warn',
      'unicorn/no-hex-escape': 'warn',
      'unicorn/no-nested-ternary': 'warn',
      'unicorn/no-new-buffer': 'error',
      'unicorn/no-unreadable-array-destructuring': 'warn',
      'unicorn/no-zero-fractions': 'warn',
      'unicorn/number-literal-case': 'warn',
      'unicorn/prefer-add-event-listener': 'error',
      // rule does not exist but listed in docs
      // 'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-dom-node-dataset': 'warn',
      'unicorn/prefer-keyboard-event-key': 'error',
      'unicorn/prefer-array-flat-map': 'warn',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-negative-index': 'warn',
      'unicorn/prefer-dom-node-append': 'error',
      'unicorn/prefer-dom-node-remove': 'error',
      'unicorn/prefer-number-properties': ['warn', { checkInfinity: false }],
      'unicorn/prefer-query-selector': 'error',
      'unicorn/prefer-string-starts-ends-with': 'error',
      'unicorn/prefer-string-slice': 'error',
      'unicorn/prefer-dom-node-text-content': 'error',
      'unicorn/prefer-string-trim-start-end': 'warn',
      'unicorn/prefer-type-error': 'error',
      'unicorn/throw-new-error': 'error',

      // 'sonarjs/generator-without-yield': 'error',
      'sonarjs/no-all-duplicated-branches': 'warn',
      'sonarjs/no-element-overwrite': 'warn',
      'sonarjs/no-identical-conditions': 'warn',
      'sonarjs/no-identical-expressions': 'warn',
      'sonarjs/no-one-iteration-loop': 'warn',
      'sonarjs/no-use-of-empty-return-value': 'warn',
      'sonarjs/max-switch-cases': ['warn', 20],
      'sonarjs/no-collapsible-if': 'warn',
      'sonarjs/no-collection-size-mischeck': 'error',
      'sonarjs/no-duplicate-string': ['warn', 6],
      'sonarjs/no-identical-functions': 'warn',
      'sonarjs/no-inverted-boolean-check': 'error',
      'sonarjs/no-redundant-boolean': 'warn',
      'sonarjs/no-redundant-jump': 'warn',
      'sonarjs/no-same-line-conditional': 'error',
      'sonarjs/no-small-switch': 'warn',
      'sonarjs/no-unused-collection': 'error',
      'sonarjs/no-useless-catch': 'warn',
      'sonarjs/prefer-object-literal': 'warn',
      'sonarjs/prefer-while': 'warn',
    },
  }),
})
