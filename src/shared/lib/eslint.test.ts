import { overrideOverrides, splitOverrides } from './eslint'

describe('eslint utils', () => {
  test('split overrides', () => {
    expect(
      splitOverrides([
        {
          files: ['*.ts', '*.tsx'],
          rules: {
            one: 'error',
            two: 'warn',
          },
        },
        {
          files: ['*.*'],
          rules: {
            three: 'off',
          },
        },
        {
          files: ['some/deep/file.js'],
          rules: {
            four: 'error',
          },
        },
      ])
    ).toEqual([
      {
        files: ['*.ts'],
        rules: {
          one: 'error',
          two: 'warn',
        },
      },
      {
        files: ['*.tsx'],
        rules: {
          one: 'error',
          two: 'warn',
        },
      },
      {
        files: ['*.*'],
        rules: {
          three: 'off',
        },
      },
      {
        files: ['some/deep/file.js'],
        rules: {
          four: 'error',
        },
      },
    ])
  })

  test('override overrides', () => {
    expect(
      overrideOverrides([
        {
          files: ['*.ts'],
          rules: {
            one: 'error',
            two: 'warn',
            three: 'error',
          },
        },
        {
          files: ['*.tsx'],
          rules: {
            one: 'error',
            two: 'warn',
          },
        },
        {
          files: ['*.ts'],
          rules: {
            one: 'off',
            two: 'error',
          },
        },
        {
          files: ['*.*'],
          rules: {
            two: 'error',
          },
        },
        {
          files: ['some/deep/file.js'],
          rules: {
            four: 'error',
            three: 'off',
          },
        },
      ])
    ).toEqual([
      {
        files: ['*.ts'],
        rules: {
          three: 'error',
        },
      },
      {
        files: ['*.tsx'],
        rules: {
          one: 'error',
        },
      },
      {
        files: ['*.ts'],
        rules: {
          one: 'off',
        },
      },
      {
        files: ['*.*'],
        rules: {
          two: 'error',
        },
      },
      {
        files: ['some/deep/file.js'],
        rules: {
          four: 'error',
          three: 'off',
        },
      },
    ])
  })
})
