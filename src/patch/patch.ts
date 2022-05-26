import { Linter } from 'eslint'
import { ModuleResolver } from './rushstack'

function getModuleNames(config: Linter.Config) {
  const { parser, plugins = [], parserOptions = {} } = config
  const additionalParser: string | undefined = parserOptions.parser

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

  return moduleNames
}

export function applyModuleResolutionPatch(config: Linter.Config) {
  const moduleNames = getModuleNames(config)

  const resolved = moduleNames.map((name) => ({
    name,
    path: require.resolve(name, { paths: [__dirname] }),
  }))

  const originalResolve = ModuleResolver.resolve

  ModuleResolver.resolve = (request, relativeTo) => {
    for (const { name, path } of resolved) {
      if (request === name) return path
    }

    return originalResolve(request, relativeTo)
  }
}
