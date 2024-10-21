import { conditional } from '../../shared/lib/eslint'
import { publicPresetNames } from '../names'
import { createPreset } from '../shared'
import { createTypescriptRules } from '../typescript/lib'

export const astro = createPreset({
  name: publicPresetNames.astro,
  compile: ({ meta }) => {
    return {
      plugins: ['astro'],
      extends: ['plugin:astro/recommended'],
      parserOptions: {
        extraFileExtensions: ['.astro'],
      },
      rules: {},
      overrides: [
        {
          files: ['*.astro'],
          parser: 'astro-eslint-parser',
          parserOptions: {
            ...conditional.parserOptions(
              meta.presets.has(publicPresetNames.typescript),
              { parser: '@typescript-eslint/parser' },
            ),
            extraFileExtensions: ['.astro'],
          },
          rules: {
            'astro/no-unused-define-vars-in-style': 'warn',
            ...conditional.rules(
              meta.presets.has(publicPresetNames.typescript),
              createTypescriptRules(meta),
            ),

            /**
             * Enforcing "type" is disabled for Astro because Props should be defined using "interface"
             */
            ...conditional.rules(
              meta.presets.has(publicPresetNames.typescript) &&
                meta.typescript.enforceUsingType,
              { '@typescript-eslint/consistent-type-definitions': 'off' },
            ),

            ...conditional.rules(meta.presets.has(publicPresetNames.react), {
              'react/no-unknown-property': 'off',
              'react/self-closing-comp': [
                'warn',
                { component: true, html: false },
              ],
            }),
            ...conditional.rules(meta.presets.has(publicPresetNames.imports), {
              'import-x/no-unresolved': [
                'error',
                {
                  commonjs: true,
                  caseSensitive: true,
                  ignore: [
                    '^astro:actions$',
                    '^astro:assets$',
                    '^astro:components$',
                    '^astro:container$',
                    '^astro:content$',
                    '^astro:i18n$',
                    '^astro:middleware$',
                    '^astro:prefetch$',
                    '^astro:schema$',
                    '^astro:transitions$',
                    '^astro:transitions/client$',
                  ],
                },
              ],
            }),
          },
        },
      ],
    }
  },
})
