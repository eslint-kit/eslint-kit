import { Linter } from 'eslint'

type Level = 'off' | 'warn' | 'error'

export type Mode =
  | 'default'
  | 'only-errors'
  | 'only-warns'
  | 'disable-warns'
  | 'decrease-level'

type MapLevel = {
  [level in Level]: Level
}

function normalizeLevel(raw: Linter.RuleLevel): Level {
  if (raw === 0) return 'off'
  if (raw === 1) return 'warn'
  if (raw === 2) return 'error'
  return raw
}

const mappers: Record<Mode, MapLevel> = {
  'default': {
    off: 'off',
    warn: 'warn',
    error: 'error',
  },
  'only-errors': {
    off: 'off',
    warn: 'error',
    error: 'error',
  },
  'only-warns': {
    off: 'off',
    warn: 'warn',
    error: 'warn',
  },
  'disable-warns': {
    off: 'off',
    warn: 'off',
    error: 'error',
  },
  'decrease-level': {
    off: 'off',
    warn: 'off',
    error: 'warn',
  },
}

function mapRuleEntry(
  ruleEntry: Linter.RuleEntry,
  mapper: MapLevel
): Linter.RuleEntry {
  if (!Array.isArray(ruleEntry)) {
    const normalized = normalizeLevel(ruleEntry)
    return mapper[normalized]
  }

  const [level, ...rest] = ruleEntry
  const normalized = normalizeLevel(level)
  return [mapper[normalized], ...rest]
}

function mapRules(
  rules: Partial<Linter.RulesRecord> | undefined = {},
  mapper: MapLevel
): Partial<Linter.RulesRecord> {
  return Object.fromEntries(
    Object.entries(rules).map(([ruleName, ruleEntry]) => [
      ruleName,
      ruleEntry ? mapRuleEntry(ruleEntry, mapper) : 'off',
    ])
  )
}

export function applyMode(config: Linter.Config, mode: Mode): Linter.Config {
  const { rules = {}, overrides = [], ...rest } = config
  const mapper = mappers[mode]

  return {
    ...rest,
    rules: mapRules(rules, mapper),
    overrides: overrides.map((override) => ({
      ...override,
      rules: mapRules(override.rules, mapper),
    })),
  }
}
