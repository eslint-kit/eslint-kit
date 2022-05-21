import fs from 'fs'
import path from 'path'
import { ESLint, Linter } from 'eslint'

export interface Options {
  config: Linter.Config
  basePath: string
  files: string[]
  extension: 'js' | 'jsx' | 'ts' | 'tsx' | 'svelte'
}

export async function testConfig({
  config,
  basePath,
  files,
  extension,
}: Options) {
  const cli = new ESLint({
    baseConfig: config as Linter.Config<Linter.RulesRecord>,
    useEslintrc: false,
    cwd: path.resolve(basePath, './tests'),
    ignore: false,
  })

  for (const file of files) {
    const filePath = path.resolve(basePath, `./tests/${file}.${extension}`)
    const code = fs.readFileSync(filePath).toString()
    const result = await cli.lintText(code, { filePath })
    expect(result).toMatchSnapshot(`${file}`)
  }
}
