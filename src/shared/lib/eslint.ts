import { Linter } from 'eslint'
import { deepMerge, Strategy } from './deep-merge'

function parseExtension(pattern: string): string | null {
  if (!pattern.startsWith('*.')) return null
  return pattern.slice(2)
}

function splitOverrides(
  overrides: Linter.ConfigOverride[]
): Linter.ConfigOverride[] {
  const result: Linter.ConfigOverride[] = []

  for (const { files, ...rest } of overrides) {
    const patterns = Array.isArray(files) ? files : [files]
    for (const pattern of patterns) {
      result.push({ files: [pattern], ...rest })
    }
  }

  return result
}

export function overrideOverrides(
  overrides: Linter.ConfigOverride[]
): Linter.ConfigOverride[] {
  const result: Linter.ConfigOverride[] = []

  const reversedOverrides = overrides.slice().reverse()

  const starRules = new Set<string>()
  const usedRules = new Map<string, Set<string>>()

  for (const { files, rules = {}, ...rest } of reversedOverrides) {
    const [pattern] = Array.isArray(files) ? files : [files]

    const extension = parseExtension(pattern)
    if (!extension) continue

    if (!usedRules.has(extension)) {
      usedRules.set(extension, new Set<string>())
    }

    const extensionUsedRules = usedRules.get(extension) ?? new Set()
    if (!usedRules.has(extension)) usedRules.set(extension, extensionUsedRules)

    const overridedRules: Linter.RulesRecord = {}

    for (const [ruleName, ruleEntry] of Object.entries(rules)) {
      if (!ruleEntry) continue
      if (extensionUsedRules.has(ruleName)) continue
      if (starRules.has(ruleName)) continue
      overridedRules[ruleName] = ruleEntry
      extensionUsedRules.add(ruleName)
      if (extension === '*') starRules.add(ruleName)
    }

    result.push({ files, rules: overridedRules, ...rest })
  }

  return result
}

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OnlyCollections<T> = T extends any[] ? T : T extends object ? T : never

function applier<
  T extends 'rules' | 'settings' | 'extends' | 'parserOptions' | 'overrides'
>() {
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
  parserOptions: applier<'parserOptions'>(),
  overrides: applier<'overrides'>(),
}
