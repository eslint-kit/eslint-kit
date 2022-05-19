import { Linter } from 'eslint'
import { deepMerge, Strategy } from './deep-merge'

export function mergeConfigs(configs: Linter.Config[]): Linter.Config {
  return configs.reduce((final, current) => {
    return deepMerge(final, current, (path) => {
      if (path === 'rules') return Strategy.Shallow
      return Strategy.Deep
    })
  })
}
