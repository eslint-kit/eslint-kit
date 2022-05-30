import { Linter } from 'eslint'

export function createExtensionsRule(extensions: string[]) {
  return [
    'warn',
    'ignorePackages',
    Object.fromEntries(extensions.map((ext) => [ext.slice(1), 'never'])),
  ] as Linter.RuleEntry
}
