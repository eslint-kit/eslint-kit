import { Linter } from 'eslint'

export const presetPrettier: Linter.Config = {
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
}
