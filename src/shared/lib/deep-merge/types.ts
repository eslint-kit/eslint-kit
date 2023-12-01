/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type MergePrimitives<A, B> = B

export type MergeMaybeObjects<A, B> = A extends object
  ? B extends object
    ? A & B
    : MergePrimitives<A, B>
  : MergePrimitives<A, B>

export type Merge<A, B> = A extends Array<infer I1>
  ? B extends Array<infer I2>
    ? Array<I1 & I2>
    : MergeMaybeObjects<A, B>
  : MergeMaybeObjects<A, B>

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never

type LengthToArray<
  N extends string,
  T extends any[] = [],
> = `${T['length']}` extends N ? T : LengthToArray<N, [any, ...T]>

type MinusPositiveOne<T extends number> = T extends 0
  ? never
  : LengthToArray<`${T}`> extends [infer _, ...infer S]
  ? S['length']
  : never

export type PathsOf<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ?
            | `${K}`
            | (PathsOf<T[K], MinusPositiveOne<D>> extends infer R
                ? Join<K, R>
                : never)
        : never
    }[keyof T]
  : ''
