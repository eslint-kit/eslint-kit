import { Linter } from 'eslint'
import { EXTENSIONS } from '../../shared'

export function createExtensionsRule(extensions: string[]) {
  return [
    'warn',
    'ignorePackages',
    Object.fromEntries(
      extensions
        // remove misc extensions, since they are often required
        .filter((ext) => !EXTENSIONS.MISC.includes(ext))
        .map((ext) => [ext.slice(1), 'never']),
    ),
  ] as Linter.RuleEntry
}
