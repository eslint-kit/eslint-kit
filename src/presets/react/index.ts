import { createPreset } from '../shared'

export interface Options {
  version?: string | 'detect'
}

export const react = createPreset<'react', Options | void>({
  name: 'react',
  compile: ({ options }) => ({
    env: {
      browser: true,
    },
    parserOptions: {
      babelOptions: {
        presets: ['@babel/preset-react'],
      },
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: options?.version ?? 'detect',
      },
    },
    plugins: ['react', 'react-hooks'],
    rules: {
      'react/jsx-uses-react': 'warn',
      'react/jsx-uses-vars': 'warn',
      'react/destructuring-assignment': 'warn',
      'react/no-access-state-in-setstate': 'warn',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-typos': 'error',
      'react/no-unsafe': 'error',
      'react/no-unknown-property': 'error',
      'react/react-in-jsx-scope': 'error',
      'react/self-closing-comp': 'warn',
      'react/sort-comp': 'warn',
      'react/state-in-constructor': ['warn', 'never'],
      'react/style-prop-object': 'error',
      'react/jsx-key': 'warn',
      'react/no-array-index-key': 'warn',
      'react/jsx-no-bind': [
        'warn',
        {
          allowArrowFunctions: true,
        },
      ],
      'react/jsx-props-no-spreading': [
        'error',
        {
          html: 'ignore',
        },
      ],
      'react/jsx-curly-brace-presence': 'warn',
      'react/jsx-pascal-case': 'warn',
      'react/jsx-no-undef': 'error',

      // hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  }),
})
