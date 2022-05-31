import { Linter } from 'eslint'
import { applyMode } from './mode'

describe('eslint utils', () => {
  const input: Linter.Config = {
    rules: {
      one: 'error',
      two: 'warn',
      three: 'off',
      four: 0,
      five: 1,
      six: 2,
    },
    overrides: [
      {
        files: [],
        rules: {
          one: 'error',
          two: 'warn',
          three: 'off',
          four: 0,
          five: 1,
          six: 2,
        },
      },
    ],
  }

  test('default mode', () => {
    expect(applyMode(input, 'default')).toEqual({
      rules: {
        one: 'error',
        two: 'warn',
        three: 'off',
        four: 'off',
        five: 'warn',
        six: 'error',
      },
      overrides: [
        {
          files: [],
          rules: {
            one: 'error',
            two: 'warn',
            three: 'off',
            four: 'off',
            five: 'warn',
            six: 'error',
          },
        },
      ],
    })
  })

  test('only-errors mode', () => {
    expect(applyMode(input, 'only-errors')).toEqual({
      rules: {
        one: 'error',
        two: 'error',
        three: 'off',
        four: 'off',
        five: 'error',
        six: 'error',
      },
      overrides: [
        {
          files: [],
          rules: {
            one: 'error',
            two: 'error',
            three: 'off',
            four: 'off',
            five: 'error',
            six: 'error',
          },
        },
      ],
    })
  })

  test('only-warns mode', () => {
    expect(applyMode(input, 'only-warns')).toEqual({
      rules: {
        one: 'warn',
        two: 'warn',
        three: 'off',
        four: 'off',
        five: 'warn',
        six: 'warn',
      },
      overrides: [
        {
          files: [],
          rules: {
            one: 'warn',
            two: 'warn',
            three: 'off',
            four: 'off',
            five: 'warn',
            six: 'warn',
          },
        },
      ],
    })
  })

  test('disable-warns mode', () => {
    expect(applyMode(input, 'disable-warns')).toEqual({
      rules: {
        one: 'error',
        two: 'off',
        three: 'off',
        four: 'off',
        five: 'off',
        six: 'error',
      },
      overrides: [
        {
          files: [],
          rules: {
            one: 'error',
            two: 'off',
            three: 'off',
            four: 'off',
            five: 'off',
            six: 'error',
          },
        },
      ],
    })
  })

  test('decrease-level mode', () => {
    expect(applyMode(input, 'decrease-level')).toEqual({
      rules: {
        one: 'warn',
        two: 'off',
        three: 'off',
        four: 'off',
        five: 'off',
        six: 'warn',
      },
      overrides: [
        {
          files: [],
          rules: {
            one: 'warn',
            two: 'off',
            three: 'off',
            four: 'off',
            five: 'off',
            six: 'warn',
          },
        },
      ],
    })
  })
})
