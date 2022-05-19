import { Linter } from 'eslint'
import { createPreset } from '../shared'

export const extend = createPreset<'extend', Linter.Config>({
  name: 'extend',
  compile: ({ options }) => options,
})
