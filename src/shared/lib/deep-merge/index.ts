/* eslint-disable @typescript-eslint/no-explicit-any */
import { Merge, PathsOf } from './types'

function isObject(value: any): value is Record<string, any> {
  return typeof value === 'object' && value !== null
}

export enum Strategy {
  Shallow,
  Deep,
  Override,
}

type AllPaths<A, B> = PathsOf<A> | PathsOf<B> | null

function shallowMerge<A, B>(a: A, b: B): Merge<A, B> {
  let merged: any

  if (Array.isArray(a) && Array.isArray(b)) {
    merged = [...a, ...b]
  } else if (isObject(a) && isObject(b)) {
    merged = { ...a, ...b }
  } else if (typeof b !== 'undefined') {
    merged = b
  } else {
    merged = a
  }

  return merged as Merge<A, B>
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export function deepMerge<A, B>(
  a: A,
  b: B,
  strategy: (path: AllPaths<A, B>) => Strategy = () => Strategy.Deep,
  basePath: AllPaths<A, B> = null,
): Merge<A, B> {
  if (strategy(basePath) === Strategy.Shallow) {
    return shallowMerge(a, b)
  }

  if (strategy(basePath) === Strategy.Override) {
    return b as Merge<A, B>
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return shallowMerge(a, b)
  }

  if (isObject(a) && isObject(b)) {
    const keys = [...Object.keys(a), ...Object.keys(b)]
    const final: any = {}

    for (const key of keys) {
      const path = basePath ? [basePath, key].join('.') : key
      final[key] = deepMerge(
        (a as any)[key],
        (b as any)[key],
        strategy,
        path as AllPaths<A, B>,
      )
    }

    return final
  }

  return shallowMerge(a, b)
}
