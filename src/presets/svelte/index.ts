import { conditional } from '../../shared/lib/eslint'
import { createPreset } from '../shared'
import { typescriptRules } from '../typescript'

export interface Options {
  typescriptPackage: unknown
  noTypeCheck: boolean
}

export const svelte = createPreset<'svelte', Options | void>({
  name: 'svelte',
  compile: ({ options, meta }) => {
    const useTypeCheck = !options?.noTypeCheck
    const useTS = meta.typescript.used && useTypeCheck

    return {
      env: {
        browser: true,
      },
      plugins: ['svelte3'],
      parserOptions: {
        ecmaVersion: 2019,
        ...conditional.parserOptions(useTS, {
          extraFileExtensions: ['.svelte'],
        }),
      },
      settings: {
        'svelte3/typescript': true,
        ...conditional.settings(options?.typescriptPackage, {
          'svelte3/typescript': options?.typescriptPackage,
        }),
      },
      overrides: [
        {
          files: ['*.svelte'],
          processor: 'svelte3/svelte3',
        },
        ...conditional.overrides(useTS, [
          {
            files: ['*.svelte'],
            rules: typescriptRules,
          },
        ]),
      ],
    }
  },
})
