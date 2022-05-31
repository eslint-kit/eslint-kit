import { Linter } from 'eslint'
import { deepMerge, Strategy } from '../deep-merge'
import { overrideOverrides, splitOverrides } from './override'

export function mergeConfigs(configs: Linter.Config[]): Linter.Config {
  const config = configs.reduce((final, current) => {
    return deepMerge(final, current, (path) => {
      if (path === 'rules') return Strategy.Shallow
      return Strategy.Deep
    })
  })

  const splittedOverrides = splitOverrides(config.overrides ?? [])
  const overrides = overrideOverrides(splittedOverrides)

  return { ...config, overrides }
}
