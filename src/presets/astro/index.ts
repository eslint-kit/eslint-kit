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
          },
        },
      ],
    }
  },
})
