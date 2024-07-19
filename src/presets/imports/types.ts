export type Options = {
  sort?: {
    newline?: boolean
    groups?: string[][]
  }
  alias?: {
    root?: string
    paths?: Record<string, string>
    jsconfig?: string
  }
}
