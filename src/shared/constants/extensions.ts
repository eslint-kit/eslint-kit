const MISC = ['.json']
const JS = ['.js', '.mjs', '.cjs', '.jsx']
const TS = ['.ts', '.tsx', '.d.ts']

export const EXTENSIONS = {
  MISC,
  JS,
  TS,
  JS_AND_TS: [...JS, ...TS],
}
