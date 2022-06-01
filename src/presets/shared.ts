import { Linter } from 'eslint'
import { mergeConfigs } from '../shared/lib/eslint'
import { Jsconfig, PackageJson } from '../shared/types'
import { PresetName } from './names'

type ReplaceVoid<T> = void extends T ? Exclude<T, void> | undefined : T

export interface Meta {
  root: string
  readPackageJson(): PackageJson | null
  readJsconfig(): Jsconfig | null
  presets: Set<PresetName>
  imports: {
    extensions: string[]
  }
  typescript: {
    root: string
    tsconfig: string
  }
}

export interface Input<T = void> {
  options: ReplaceVoid<T>
  meta: Meta
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Preset<T = any> {
  name: PresetName
  options: T
  updateMeta(input: Input<T>): void
  compile(input: Input<T>): Linter.Config
}

export type PresetFabric<T = void> = (options: T) => Preset<T>

interface CreatePresetParams<T = void> {
  name: PresetName
  updateMeta?(input: Input<T>): void
  compile(input: Input<T>): Linter.Config
}

export function createPreset<T = void>({
  name,
  updateMeta = () => {},
  compile,
}: CreatePresetParams<T>): PresetFabric<T> {
  return (options) => ({
    name,
    options,
    updateMeta,
    compile,
  })
}

export const createMeta = (): Meta => ({
  root: process.cwd(),
  readPackageJson: () => null,
  readJsconfig: () => null,
  presets: new Set(),
  imports: {
    extensions: [],
  },
  typescript: {
    root: './',
    tsconfig: 'tsconfig.json',
  },
})

export function compilePresets(
  presets: Preset[],
  priority: string[]
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
    preset.compile({ meta, options: preset.options })
  )

  return mergeConfigs(configs)
}
