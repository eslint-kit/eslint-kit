/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeepMerge, PathsOf } from './types'

function isObject(value: any): value is Record<string, any> {
  return typeof value === 'object' && value !== null
}

export enum Merge {
  Shallow,
  Deep,
  Override,
}

type AllPaths<A, B> = PathsOf<A> | PathsOf<B> | null

// eslint-disable-next-line sonarjs/cognitive-complexity
export function deepMerge<A extends any, B extends any>(
  a: A,
  b: B,
  strategy: (path: AllPaths<A, B>) => Merge = () => Merge.Deep,
  basePath: string | null = null,
  root = true,
  shallow = false
): DeepMerge<A, B> {
  if (Array.isArray(a) && Array.isArray(b)) {
    return [...a, ...b] as DeepMerge<A, B>
  }

  if (isObject(a) && isObject(b)) {
    if (shallow) {
      return { ...a, ...b } as DeepMerge<A, B>
    }

    if (root) {
      if (strategy(null) === Merge.Shallow) {
        return deepMerge(a, b, strategy as any, null, false, true) as DeepMerge<
          A,
          B
        >
      }

      if (strategy(null) === Merge.Override) {
        return b as DeepMerge<A, B>
      }
    }

    const keys = [...Object.keys(a), ...Object.keys(b)]
    const final: any = {}

    for (const key of keys) {
      const path = basePath ? [basePath, key].join('.') : key

      if (strategy(path as any) === Merge.Shallow) {
        final[key] = deepMerge(
          a[key],
          b[key],
          strategy as any,
          path,
          false,
          true
        )
      } else if (strategy(path as any) === Merge.Override) {
        final[key] = b[key]
      } else {
        final[key] = deepMerge(a[key], b[key], strategy as any, path, false)
      }
    }

    return final
  }

  if (typeof b !== 'undefined') {
    return b as DeepMerge<A, B>
  }

  return a as DeepMerge<A, B>
}
