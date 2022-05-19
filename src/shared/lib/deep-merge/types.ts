/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type DeepMerge<T1, T2> = T1 extends Array<infer A1>
  ? T2 extends Array<infer A2>
    ? Array<A1 | A2>
    : T2
  : T1 extends object
  ? T2 extends object
    ? MergeToOne<
        {
          [K in keyof T2 & keyof T1 & RequiredKeys<T1 | T2>]: DeepMerge<
            T1[K],
            T2[K]
          >
        } &
          {
            [K in keyof T2 & keyof T1 & OptionalKeys<T1 | T2>]?: DeepMerge<
              T1[K],
              T2[K]
            >
          } &
          { [K in Exclude<RequiredKeys<T1>, keyof T2>]: T1[K] } &
          { [K in Exclude<OptionalKeys<T1>, keyof T2>]?: T1[K] } &
          { [K in Exclude<RequiredKeys<T2>, keyof T1>]: T2[K] } &
          { [K in Exclude<OptionalKeys<T2>, keyof T1>]?: T2[K] }
      >
    : T1 extends object
    ? T2
    : T1 | T2
  : T2 extends object
  ? T2
  : T2

// so you don't get "T & {} & {}"
// also assumes that "undefined" is only ever a value included by optional params... I couldn't find a way around this
type MergeToOne<T> = T extends object
  ? {
      [K in keyof T]: K extends RequiredKeys<T>
        ? Exclude<T[K], undefined>
        : T[K]
    }
  : never

type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]
type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[keyof T]

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never

type Prev = [
  never,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  ...0[]
]

export type PathsOf<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | (PathsOf<T[K], Prev[D]> extends infer R ? Join<K, R> : never)
        : never
    }[keyof T]
  : ''
