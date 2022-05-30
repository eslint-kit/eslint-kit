import fs from 'fs'
import path from 'path'
import { ESLint } from 'eslint'
import { compilePresets, Preset, PresetName, PRIORITY } from '../../presets'
import { base } from '../../presets/base'

export interface Options {
  presets: Preset[]
  priority?: PresetName[]
  dirname: string
  files: string[]
  extension: 'js' | 'jsx' | 'ts' | 'tsx' | 'svelte' | 'vue'
}

export async function testConfig({
  presets,
  priority = PRIORITY,
  dirname,
  files,
  extension,
}: Options) {
  const root = path.resolve(dirname, './tests')

  const cli = new ESLint({
    baseConfig: compilePresets([base({ root }), ...presets], priority),
    useEslintrc: false,
    cwd: root,
    ignore: false,
  })

  for (const file of files) {
    const filePath = path.resolve(root, `./${file}.${extension}`)
    const code = fs.readFileSync(filePath).toString()
    const result = await cli.lintText(code, { filePath })
    expect(result).toMatchSnapshot(`${file}`)
  }
}
