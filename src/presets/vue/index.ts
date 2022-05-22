import { parse } from 'semver'
import { conditional } from '../../shared/lib/eslint'
import { getPackageSemver } from '../../shared/lib/packages'
import { createPreset } from '../shared'
import { typescriptRules } from '../typescript'

export interface Options {
  version?: string | 'detect'
}

export const vue = createPreset<'vue', Options | void>({
  name: 'vue',
  compile: ({ options = {}, meta }) => {
    const { version = 'detect' } = options

    const semver =
      version === 'detect'
        ? getPackageSemver('vue', meta.packageJson)
        : parse(version)

    const major = semver?.major ?? 3

    return {
      env: {
        browser: true,
      },
      plugins: ['vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@babel/eslint-parser',
        ...conditional.parserOptions(meta.typescript.used, {
          parser: '@typescript-eslint/parser',
        }),
        ecmaFeatures: {
          jsx: true,
        },
      },
      extends: [
        ...conditional.extends(major === 2, ['plugin:vue/recommended']),
        ...conditional.extends(major === 3, ['plugin:vue/vue3-recommended']),
      ],
      rules: {
        'import/no-default-export': 'off',
      },
      overrides: conditional.overrides(meta.typescript.used, [
        {
          files: ['*.vue'],
          rules: typescriptRules,
        },
      ]),
    }
  },
})
