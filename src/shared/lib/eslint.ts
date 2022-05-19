import { deepMerge, Merge } from './deep-merge'

export interface ESLintConfig {
  root?: boolean
  env?: Record<string, boolean>
  extends?: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings?: Record<string, any>
  parser?: string
  parserOptions?: Record<string, unknown>
  plugins?: string[]
  rules?: Record<string, unknown>
  ignorePatterns?: string[]
  overrides?: unknown[]
}

export function mergeConfigs(configs: ESLintConfig[]): ESLintConfig {
  return configs.reduce((final, current) => {
    const merged = deepMerge(final, current, (path) => {
      if (path === 'rules') return Merge.Shallow
      return Merge.Deep
    })

    return merged as ESLintConfig
  })
}
