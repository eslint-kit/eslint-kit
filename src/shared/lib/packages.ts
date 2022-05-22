import { parse } from 'semver'

type Dependencies = Record<string, string>

export interface PackageJson {
  version: string
  dependencies?: Dependencies
  devDependencies?: Dependencies
}

function mergeDependencies(packageJson: PackageJson) {
  const { dependencies = {}, devDependencies = {} } = packageJson
  return { ...dependencies, ...devDependencies }
}

export function getPackageSemver(name: string, packageJson: PackageJson) {
  const allDependencies = mergeDependencies(packageJson)
  const version = allDependencies[name]
  if (!version) return null
  const parsed = parse(version)
  if (!parsed) return null
  return parsed
}
