import { conditional } from '../../shared/lib/eslint'
import { publicPresetNames } from '../names'
import { createPreset } from '../shared'

export type Options = {
  version?: string | 'detect'
  oldJSXTransform?: boolean
}

export const react = createPreset<Options>({
  name: publicPresetNames.react,
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
    extends: ['plugin:jsx-a11y/recommended'],
    rules: {
      'react/jsx-uses-vars': 'warn',
      'react/destructuring-assignment': 'warn',
      'react/no-access-state-in-setstate': 'warn',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-typos': 'error',
      'react/no-unsafe': 'error',
      'react/no-unknown-property': 'error',
      'react/self-closing-comp': 'warn',
      'react/sort-comp': 'warn',
      'react/state-in-constructor': ['warn', 'never'],
      'react/style-prop-object': 'error',
      'react/no-array-index-key': 'warn',
      'react/jsx-no-bind': [
        'warn',
        {
          allowArrowFunctions: true,
        },
      ],
      'react/jsx-curly-brace-presence': 'warn',
      'react/jsx-pascal-case': 'warn',
      'react/jsx-no-undef': 'error',
      'react/jsx-sort-props': [
        'warn',
        {
          noSortAlphabetically: true,
          reservedFirst: ['key'],
        },
      ],
      'react/jsx-key': [
        'warn',
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
        },
      ],

      // hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      ...conditional.rules(options?.oldJSXTransform, {
        'react/jsx-uses-react': 'warn',
        'react/react-in-jsx-scope': 'error',
      }),

      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/aria-role': ['warn', { ignoreNonDOM: true }],
      'jsx-a11y/click-events-have-key-events': 'off',
    },
  }),
})
