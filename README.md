<p align="center">
  <img src="logo.svg" width="280" align="center" alt="ESLint Kit" style="max-width: 100%;" />
  <h1></h1>
  <p align="center">
    ✨ All-in-one solution for configuring ESLint in all of your projects ✨
  </p>
</p>
<br/>
<p align="center">
  <a href="https://github.com/eslint-kit/eslint-kit/actions?query=branch%3Amain">
    <img src="https://github.com/eslint-kit/eslint-kit/actions/workflows/test-and-build.yml/badge.svg?event=push&branch=main" alt="eslint-kit CI Status" />
  </a>
  <a href="https://opensource.org/licenses/MIT" rel="nofollow">
    <img src="https://img.shields.io/github/license/eslint-kit/eslint-kit" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/@eslint-kit/configure" rel="nofollow">
    <img src="https://img.shields.io/npm/dw/eslint-kit.svg" alt="npm">
  </a>
  <a href="https://www.npmjs.com/package/@eslint-kit/configure" rel="nofollow">
    <img src="https://img.shields.io/github/stars/eslint-kit/eslint-kit" alt="stars">
  </a>
</p>

## Before you start

The README on `main` branch can contain some unreleased changes.

Go to [`release`](/tree/release) branch to see the actual README for the latest version from NPM.

## Navigation

- [Why?](#why)
- [Installation](#installation)
- [Presets](#presets)
  - [TypeScript](#typescript)
  - [Prettier](#prettier)
  - [Node](#node)
  - [React](#react)
  - [Solid.js](#solidjs)
  - [Effector](#effector)
  - [Svelte](#svelte)
  - [Next.js](#nextjs)
  - [Alias](#alias)

## Why?

- Most configs contain too common rules inside, so you need to do a lot of things to finalize them for your project
- The other configs are bound to specific stack/technology, so it's hard to extend them in a way you're like
- Sometimes, configs use formatting rules. Formatting is not the ESLint's job, so it's a high chance to get the conflict someday
- Together, above means that most likely you'll need a different ESLint config for each of your project
- You may often need to install a lot of dependencies: eslint, plugins, configs, parser, etc.
- You may often face the problems with eslint/parser/plugin/config versions. It takes time to find the issue and solution.

**ESLint Kit** is solving all these problems by providing a many small presets, each performing a specific task.

You can select presets by using `configure` function in your `.eslintrc.js` file:

```js
const { configure, presets } = require('@eslint-kit/configure')

module.exports = configure({
  presets: [
    presets.typescript(),
    presets.prettier(),
    presets.node(),
    presets.react({ version: '18.0' }),
    presets.alias({
      root: './src',
      paths: { '@app': './' }
    })
  ],
  extend: {
    rules: {
      'some-rule': 'off'
    }
  }
})
```

`@eslint-kit/configure` package contains all the dependencies you might need. It's ok - this is a development dependency, so you won't get any bundle size problems.

The ESLint Kit presets try to contain only the best-practice rules to make overwriting as rare as possible. But you can still easily override them by using `extend` property.

## Installation

NPM:

```sh
npm install -D @eslint-kit/configure@beta
```

Yarn:

```sh
yarn add -D @eslint-kit/configure@beta
```

After installing, add the `.eslintrc.js` file in your project root:

```js
const { configure, presets } = require('@eslint-kit/configure')

module.exports = configure({
  presets: [],
})
```

Now, just select the `presets` you need. The full information about them is located in [Presets](#presets) section.

## Presets

### TypeScript

- Changes parser to `@typescript-eslint/parser`
- Allows the usage of `.ts` and `.tsx` extensions
- Adds some TypeScript specific rules (for TS files)
- Replaces some default ESLint rules with their TypeScript analogues (for TS files)

```ts
configure({
  presets: [
    presets.typescript({
      // (optional) Project's root
      root: './',

      // (optional) A path to tsconfig file
      tsconfig: 'tsconfig.json'
    })
  ]
})
```

### Prettier

- Enables the rule `prettier/prettier` from Prettier ESLint plugin

```ts
configure({
  presets: [
    /*
     * Optionally, you can pass the Prettier config
     * Note: it will merge and override any options set with .prettierrc files
     */
    presets.prettier({
      semi: false,
      singleQuote: true
      // ...
    })
  ]
})
```

The recommended Prettier config:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "quoteProps": "consistent",
  "endOfLine": "lf",
  "importOrder": [
    "^(child_process|crypto|events|fs|http|https|os|path)(\\/(.*))?$",
    "<THIRD_PARTY_MODULES>",
    "^~(\\/(.*))?$",
    "^@(\\/(.*))?$",
    "^@app(\\/(.*))?$",
    "^[./]"
  ],
  "experimentalBabelParserPluginsList": [
    "jsx",
    "typescript"
  ]
}
```

As you see, we use [@trivago/prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports). You can find the options on its README page.

### Node

- Enables `node` environment

```ts
configure({
  presets: [presets.node()]
})
```

### React

- Enables `browser` environment and `jsx` ecma feature
- Adds some React and React Hooks rules

```ts
configure({
  presets: [
    presets.react({
      // (optional) Allows to specify React version
      version: 'detect',
      // (optional) Allows using JSX without importing `React`
      newJSXTransform: false
    })
  ]
})
```

### Solid.js

- Adds `solid` plugin and enables `/recommended` rules
- Enables `/typescript` rules when `typescript` preset is active

```ts
configure({
  presets: [presets.solidJs()]
})
```

### Effector

- Adds `effector` plugin and enables `/recommended`, `/scope`, and `/react` rules

```ts
configure({
  presets: [
    presets.effector({
      // (optional) Enables /future rules
      onlySample: false
    })
  ]
})
```

### Svelte

- Adds `svelte3` plugin and configures it
- Enables some TypeScript settings when `typescript` preset is active

You still need to setup your editor / IDE to lint `.svelte` files. You can use [this guide](https://github.com/sveltejs/eslint-plugin-svelte3/blob/master/INTEGRATIONS.md) from `svelte3` plugin repo. 

```ts
configure({
  presets: [
    presets.svelte({
      // (optional) Disable type checking for .svelte files
      noTypeCheck: true
    })
  ]
})
```

### Next.js

- Enables `@next/eslint-plugin-next` plugin rules
- Allows the usage of `export default`

```ts
configure({
  presets: [presets.nextJs()]
})
```

### Alias

- Allows to set the aliases for `import` plugin
- Automatically uses `tsconfig.json` when `typescript` preset is applied

```ts
configure({
  presets: [
    presets.alias({
      // (optional) Base path for all aliases
      // Defaults to './'
      root: './src',

      // (optional) Alises, all paths should be relative or absolute
      // Defaults to empty object
      paths: { '@app': './' },

      // (optional) A path to jsconfig
      // When specified, also respects jsconfig's "compilerOptions.paths"
      jsconfig: 'jsconfig.json'
    })
  ]
})
```