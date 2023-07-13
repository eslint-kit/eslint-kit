import { Linter } from 'eslint'

function parseExtension(pattern: string): string | null {
  if (!pattern.startsWith('*.')) return null
  return pattern.slice(2)
}

export function splitOverrides(
  overrides: Linter.ConfigOverride[],
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
  overrides: Linter.ConfigOverride[],
): Linter.ConfigOverride[] {
  const result: Linter.ConfigOverride[] = []

  const reversedOverrides = overrides.slice().reverse()

  const starRules = new Set<string>()
  const usedRules = new Map<string, Set<string>>()

  for (const { files, rules = {}, ...rest } of reversedOverrides) {
    const [pattern] = Array.isArray(files) ? files : [files]

    const extension = parseExtension(pattern)

    if (!extension) {
      result.push({ files, rules, ...rest })
      continue
    }

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

  return result.reverse()
}
