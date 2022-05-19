import fs from 'fs'
import path from 'path'
import { ESLint, Linter } from 'eslint'

export interface Options {
  config: unknown
  basePath: string
  files: string[]
  extension: 'js' | 'ts' | 'tsx'
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
    cwd: process.cwd(),
    ignore: false,
  })

  for (const file of files) {
    const filePath = path.resolve(basePath, `./tests/${file}.${extension}`)
    const code = fs.readFileSync(filePath).toString()
    const isTS = ['ts', 'tsx'].includes(extension)
    const result = await cli.lintText(code, {
      filePath: isTS ? filePath : undefined,
    })
    expect(result).toMatchSnapshot(`${file}`)
  }
}
