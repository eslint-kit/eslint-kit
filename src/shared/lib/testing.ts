/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'
import { ESLint } from 'eslint'
import { compilePresets, Preset, PresetName, PRIORITY } from '../../presets'
import { base } from '../../presets/base'

export type Options = {
  presets: Preset<unknown>[]
  priority?: PresetName[]
  dirname: string
  files: string[]
  extension: 'js' | 'jsx' | 'ts' | 'tsx' | 'svelte' | 'vue'
  disableLogs?: boolean
}

export async function testConfig({
  presets,
  priority = PRIORITY,
  dirname,
  files,
  extension,
  disableLogs = false,
}: Options) {
  const root = path.resolve(dirname, './tests')

  const cli = new ESLint({
    baseConfig: compilePresets([base({ root }), ...presets], priority),
    useEslintrc: false,
    cwd: root,
    ignore: false,
  })

  const log = console.log

  if (disableLogs) {
    console.log = () => {}
  }

  for (const file of files) {
    const filePath = path.resolve(root, `./${file}.${extension}`)
    const code = fs.readFileSync(filePath).toString()
    const result = await cli.lintText(code, { filePath })
    expect(result).toMatchSnapshot(`${file}`)
  }

  if (disableLogs) {
    console.log = log
  }
}
