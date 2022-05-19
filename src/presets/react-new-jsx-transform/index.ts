import { createPreset } from '../shared'

export const reactNewJSXTransform = createPreset({
  name: 'react-new-jsx-transform',
  compile: () => ({
    env: {
      browser: true,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  }),
})
