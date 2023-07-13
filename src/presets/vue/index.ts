import { parse, SemVer } from 'semver'
import { PackageJsonNotFoundException } from '../../shared'
import { conditional } from '../../shared/lib/eslint'
import { getPackageSemver } from '../../shared/lib/packages'
import { publicPresetNames } from '../names'
import { createPreset } from '../shared'
import { createTypescriptRules } from '../typescript/lib'

export interface Options {
  version?: string | 'detect'
}

export const vue = createPreset<Options>({
  name: publicPresetNames.vue,
  compile: ({ options = {}, meta }) => {
    const { version = 'detect' } = options

    let semver: SemVer | null

    if (version === 'detect') {
      const packageJson = meta.readPackageJson()
      if (!packageJson) throw new PackageJsonNotFoundException()
      semver = getPackageSemver('vue', packageJson)
    } else {
      semver = parse(version)
    }

    const major = semver?.major ?? 3

    return {
      env: {
        browser: true,
      },
      plugins: ['vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@babel/eslint-parser',
        ...conditional.parserOptions(
          meta.presets.has(publicPresetNames.typescript),
          {
            parser: '@typescript-eslint/parser',
          },
        ),
        ecmaFeatures: {
          jsx: true,
        },
      },
      extends: [
        ...conditional.extends(major === 2, ['plugin:vue/recommended']),
        ...conditional.extends(major === 3, ['plugin:vue/vue3-recommended']),
      ],
      rules: conditional.rules(meta.presets.has(publicPresetNames.imports), {
        'import/no-default-export': 'off',
      }),
      overrides: conditional.overrides(
        meta.presets.has(publicPresetNames.typescript),
        [
          {
            files: ['*.vue'],
            rules: createTypescriptRules(meta),
          },
        ],
      ),
    }
  },
})
