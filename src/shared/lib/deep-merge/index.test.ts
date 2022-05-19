import { deepMerge, Merge } from './index'

describe('deepMerge', () => {
  it('should return second argument when there is a primitive in the args', () => {
    const a = deepMerge(123, 'sdfsdf')
    expect(a).toBe('sdfsdf')

    const b = deepMerge([], 'sdfsdf')
    expect(b).toBe('sdfsdf')

    const c = deepMerge(123, {})
    expect(c).toEqual({})
  })

  it('should merge arrays', () => {
    const merged = deepMerge([123, '123'], [true])
    expect(merged).toStrictEqual([123, '123', true])
  })

  it('should merge objects', () => {
    const merged = deepMerge({ one: 1 }, { two: 2 })
    expect(merged).toEqual({ one: 1, two: 2 })
  })

  it('should deep merge objects', () => {
    const merged = deepMerge({ yuuki: { xyu: 123 } }, { yuuki: { loh: '123' } })
    expect(merged).toEqual({ yuuki: { xyu: 123, loh: '123' } })
  })

  it('should deep merge objects with arrays', () => {
    const merged = deepMerge(
      { yuuki: { xyu: 123, array: [1, 2] } },
      { yuuki: { loh: '123', array: ['321'] } }
    )

    expect(merged).toEqual({
      yuuki: { xyu: 123, loh: '123', array: [1, 2, '321'] },
    })
  })

  it('should properly merge array and object', () => {
    expect(deepMerge([], {})).toEqual({})
  })

  describe('strategies', () => {
    it('should respect Override strategy', () => {
      const merged = deepMerge(
        { yuuki: { xyu: 123, array: [1, 2] } },
        { yuuki: { loh: '123', array: ['321'] } },
        () => Merge.Override
      )

      expect(merged).toEqual({ yuuki: { loh: '123', array: ['321'] } })
    })

    it('should respect Shallow strategy', () => {
      const merged = deepMerge(
        { yuuki: { xyu: 123, array: [1, 2] }, test: 123 },
        { yuuki: { loh: '123', array: ['321'] } },
        () => Merge.Shallow
      )

      expect(merged).toEqual({
        yuuki: { loh: '123', array: ['321'] },
        test: 123,
      })
    })

    it('should respect Shallow strategy in nested fields', () => {
      const merged = deepMerge(
        { yuuki: { xyu: 123, array: [1, 2] }, test: { a: 1 } },
        { yuuki: { loh: '123', array: ['321'] }, test: { b: 2 } },
        (path) => {
          if (path === 'yuuki') return Merge.Shallow
          return Merge.Deep
        }
      )

      expect(merged).toEqual({
        yuuki: { xyu: 123, loh: '123', array: ['321'] },
        test: { a: 1, b: 2 },
      })
    })

    it('should respect Override strategy in nested fields', () => {
      const merged = deepMerge(
        { yuuki: { xyu: 123, array: [1, 2] }, test: { a: 1 } },
        { yuuki: { loh: '123', array: ['321'] }, test: { b: 2 } },
        (path) => {
          if (path === 'yuuki') return Merge.Override
          return Merge.Deep
        }
      )

      expect(merged).toEqual({
        yuuki: { loh: '123', array: ['321'] },
        test: { a: 1, b: 2 },
      })
    })
  })
})
