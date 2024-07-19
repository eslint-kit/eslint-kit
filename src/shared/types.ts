export type Dependencies = Record<string, string>

export type PackageJson = {
  version: string
  dependencies?: Dependencies
  devDependencies?: Dependencies
}

export type Jsconfig = {
  compilerOptions?: {
    baseUrl?: string
    paths?: Record<string, string[]>
  }
}
