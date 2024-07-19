/* eslint-disable @typescript-eslint/no-explicit-any */
import { Linter } from 'eslint'
import Module from 'module'
import { ModuleResolver } from './rushstack'

type Resolved = {
  name: string
  path: string
}

function getModuleNames(config: Linter.Config) {
  const { parser, plugins = [], parserOptions = {}, settings = {} } = config
  const additionalParser: string | undefined = parserOptions.parser
  const resolversSettings = settings['import-x/resolver'] || {}

  const moduleNames: string[] = []

  if (parser) {
    moduleNames.push(parser)
  }

  if (additionalParser) {
    moduleNames.push(additionalParser)
  }

  for (const plugin of plugins) {
    if (plugin.startsWith('@')) {
      moduleNames.push(`${plugin}/eslint-plugin`)
    } else {
      moduleNames.push(`eslint-plugin-${plugin}`)
    }
  }

  for (const resolver of Object.keys(resolversSettings)) {
    if (resolver.startsWith('eslint-import-resolver')) {
      moduleNames.push(resolver)
      continue
    }

    moduleNames.push(`eslint-import-resolver-${resolver}`)
  }

  return moduleNames
}

function patchRequire(require: NodeRequire, resolved: Resolved[]) {
  const originalResolve = require.resolve

  const resolve = function resolve(id: string, options: any) {
    for (const { name, path } of resolved) {
      if (id === name) return path
    }

    return originalResolve(id, options)
  }

  require.resolve = Object.assign(resolve, { paths: originalResolve.paths })
}

export function applyModuleResolutionPatch(config: Linter.Config) {
  const moduleNames = getModuleNames(config)

  /*
   * Resolve modules relative to eslint-kit
   */

  const resolved: Resolved[] = moduleNames.map((name) => ({
    name,
    path: require.resolve(name, { paths: [__dirname] }),
  }))

  /*
   * Patch eslint ModuleResolver
   */

  const originalResolve = ModuleResolver.resolve

  ModuleResolver.resolve = (id, relativeTo) => {
    for (const { name, path } of resolved) {
      if (id === name) return path
    }

    return originalResolve(id, relativeTo)
  }

  /*
   * Patch default "require"
   */

  patchRequire(require, resolved)

  /*
   * Patch manually created "require" functions
   */

  const originalCreateRequire = Module.createRequire

  Module.createRequire = (path) => {
    const require = originalCreateRequire(path)
    patchRequire(require, resolved)
    return require
  }

  /*
   * Patch resolver in eslint-module-utils
   */

  const ModuleRequire = require('eslint-module-utils/module-require')

  const originalModuleRequire = ModuleRequire.default

  ModuleRequire.default = (id: string) => {
    for (const { name, path } of resolved) {
      if (id === name) return require(path)
    }

    return originalModuleRequire(id)
  }
}
