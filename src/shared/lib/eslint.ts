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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OnlyCollections<T> = T extends any[] ? T : T extends object ? T : never

function applier<T extends 'rules' | 'settings' | 'extends'>() {
  return (
    condition: unknown,
    entity: OnlyCollections<Linter.Config[T]>
  ): OnlyCollections<Linter.Config[T]> => {
    const fallback = Array.isArray(entity) ? [] : {}
    if (!condition) return fallback as OnlyCollections<Linter.Config[T]>
    return entity
  }
}

export const conditional = {
  rules: applier<'rules'>(),
  settings: applier<'settings'>(),
  extends: applier<'extends'>(),
}
