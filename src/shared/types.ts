export type Dependencies = Record<string, string>

export interface PackageJson {
  version: string
  dependencies?: Dependencies
  devDependencies?: Dependencies
}

export interface Jsconfig {
  compilerOptions?: {
    baseUrl?: string
    paths?: Record<string, string[]>
  }
}
