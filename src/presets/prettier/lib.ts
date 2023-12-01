import { Linter } from 'eslint'
import { Options } from 'prettier'
import { Meta } from '../shared'

export interface Input {
  options?: Options
  meta: Meta
}

export function createPrettierRule({ meta, options }: Input) {
  const plugins: string[] = []

  /**
   * Add plugin layout only if import layout
   * included
   */
  if (meta.imports.layout) {
    plugins.push('prettier-plugin-layout')
  }

  return [
    'warn',
    {
      plugins,
      ...options,
    },
  ] as Linter.RuleEntry
}
