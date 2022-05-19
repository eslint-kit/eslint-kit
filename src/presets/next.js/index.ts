import { Linter } from 'eslint'

export const presetNextJs: Linter.Config = {
  rules: {
    'import/no-default-export': 'off',
  },
}
