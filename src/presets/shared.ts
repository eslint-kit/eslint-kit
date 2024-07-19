import { Linter } from 'eslint'
import { mergeConfigs } from '../shared/lib/eslint'
import { Jsconfig, PackageJson } from '../shared/types'
import { PresetName } from './names'

export type Meta = {
  root: string
  allowDebug: boolean
  readPackageJson(): PackageJson | null
  readJsconfig(): Jsconfig | null
  presets: Set<PresetName>
  imports: {
    extensions: string[]
  }
  typescript: {
    root: string
    tsconfig: string
    enforceUsingType: boolean
  }
}

export type Input<T = void> = {
  options?: T
  meta: Meta
}

export type Preset<T = void> = {
  name: PresetName
  options?: T
  updateMeta(input: Input<T>): void
  compile(input: Input<T>): Linter.Config
}

type CreatePresetParams<T = void> = {
  name: PresetName
  updateMeta?(input: Input<T>): void
  compile(input: Input<T>): Linter.Config
}

export function createPreset<T = void>({
  name,
  updateMeta = () => {},
  compile,
}: CreatePresetParams<T>) {
  return (options?: T): Preset<T> => ({
    name,
    options,
    updateMeta,
    compile,
  })
}

export const createMeta = (): Meta => ({
  root: process.cwd(),
  allowDebug: false,
  readPackageJson: () => null,
  readJsconfig: () => null,
  presets: new Set(),
  imports: {
    extensions: [],
  },
  typescript: {
    root: './',
    tsconfig: 'tsconfig.json',
    enforceUsingType: false,
  },
})

export function compilePresets(
  presets: Preset<unknown>[],
  priority: string[],
): Linter.Config {
  const prioritized = presets
    .slice()
    .sort((a, b) => priority.indexOf(a.name) - priority.indexOf(b.name))

  const meta = createMeta()

  for (const preset of prioritized) {
    meta.presets.add(preset.name)
    preset.updateMeta({ meta, options: preset.options })
  }

  const configs = prioritized.map((preset) =>
    preset.compile({ meta, options: preset.options }),
  )

  return mergeConfigs(configs)
}
