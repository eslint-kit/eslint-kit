import { Linter } from 'eslint'
import { mergeConfigs } from '../shared/lib/eslint'
import { PackageJson, Jsconfig } from '../shared/types'

type ReplaceVoid<T> = void extends T ? Exclude<T, void> | undefined : T

export interface Meta {
  root: string
  readPackageJson(): PackageJson | null
  readJsconfig(): Jsconfig | null
  extensions: string[]
  typescript: {
    used: boolean
    root: string
    tsconfig: string
  }
}

export interface Input<T = void> {
  options: ReplaceVoid<T>
  meta: Meta
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Preset<N extends string = string, T = any> {
  name: N
  options: T
  updateMeta(input: Input<T>): void
  compile(input: Input<T>): Linter.Config
}

type PresetFabric<N extends string, T = void> = (options: T) => Preset<N, T>

interface CreatePresetParams<N, T = void> {
  name: N
  updateMeta?(input: Input<T>): void
  compile(input: Input<T>): Linter.Config
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtractName<T> = T extends PresetFabric<infer Name, any>
  ? Name
  : never

export function createPreset<N extends string = string, T = void>({
  name,
  updateMeta = () => {},
  compile,
}: CreatePresetParams<N, T>): PresetFabric<N, T> {
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
  extensions: [],
  typescript: {
    used: false,
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
    preset.updateMeta({ meta, options: preset.options })
  }

  const configs = prioritized.map((preset) =>
    preset.compile({ meta, options: preset.options })
  )

  return mergeConfigs(configs)
}
