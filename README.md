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
  <a href="https://www.npmjs.com/package/eslint-kit" rel="nofollow">
    <img src="https://img.shields.io/npm/dw/eslint-kit.svg" alt="npm">
  </a>
  <a href="https://www.npmjs.com/package/eslint-kit" rel="nofollow">
    <img src="https://img.shields.io/github/stars/eslint-kit/eslint-kit" alt="stars">
  </a>
</p>

## Before you start

The README on `main` branch can contain some unreleased changes.

Go to [`release`](https://github.com/eslint-kit/eslint-kit/tree/release) branch to see the actual README for the latest version from NPM.

## Navigation

- [Why?](#why)
- [Installation](#installation)
- [configure API](#configure-api)
- [Presets](#presets)
  - [TypeScript](#typescript)
  - [Prettier](#prettier)
  - [Node](#node)
  - [React](#react)
  - [Vue](#vue)
  - [Solid.js](#solidjs)
  - [Effector](#effector)
  - [Svelte](#svelte)
  - [Next.js](#nextjs)
  - [Alias](#alias)
- [Common issues](#common-issues)
- [Setting up editors](#setting-up-editors)
  - [VSCode](#vscode)
- [Contrubuting](#contributing)
- [Maintenance](#maintenance)

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
const { configure, presets } = require('eslint-kit')

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

`eslint-kit` package contains all the dependencies you might need. It's ok - this is a development dependency, so you won't get any bundle size problems.

The ESLint Kit presets try to contain only the best-practice rules to make overwriting as rare as possible. But you can still easily override them by using `extend` property.

## Installation

NPM:

```sh
npm install -D eslint-kit
```

Yarn:

```sh
yarn add -D eslint-kit
```

After installing, add the `.eslintrc.js` file in your project root:

```js
const { configure, presets } = require('eslint-kit')

module.exports = configure({
  presets: [],
})
```

Now, just select the `presets` you need. The full information about them is located in [Presets](#presets) section.

You can also [set up your editor](#setting-up-editors) if you haven't already.

## configure API

```ts
configure({
  // (optional) Project root
  root: __dirname,

  // presets
  presets: [],

  // (optional) Custom eslint config
  // It gets merged with presets at the end
  extend: { rules: { /* ... */ } }
})
```

## Presets

<details>
<summary>TypeScript</summary>
<br>

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

</details>

<details>
<summary>Prettier</summary>
<br>

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

</details>

<details>
<summary>Node</summary>
<br>

- Enables `node` environment

```ts
configure({
  presets: [presets.node()]
})
```

</details>

<details>
<summary>React</summary>
<br>

- Adds some React and React Hooks rules
- Enables `browser` environment and `jsx` ecma feature

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

</details>

<details>
<summary>Vue</summary>
<br>

- Adds `vue` plugin
- Changes parser to `vue-eslint-parser`
- Detects installed vue version and enables `/recommended` rules for it
- Enables `@typescript-eslint/parser` for `<script>` blocks when `typescript` preset is used
- Enables `browser` environment and `jsx` ecma feature
- Allows `export default`

You still need to setup your editor / IDE to lint `.vue` files. You can use [this guide](https://eslint.vuejs.org/user-guide/#editor-integrations) from Vue documentation. 

```ts
configure({
  presets: [
    presets.vue({
      // (optional) Allows to specify Vue version
      version: 'detect'
    })
  ]
})
```

</details>

<details>
<summary>Solid.js</summary>
<br>

- Adds `solid` plugin and enables `/recommended` rules
- Enables `/typescript` rules when `typescript` preset is active

```ts
configure({
  presets: [presets.solidJs()]
})
```

</details>

<details>
<summary>Effector</summary>
<br>

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

</details>

<details>
<summary>Svelte</summary>
<br>

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

</details>

<details>
<summary>Next.js</summary>
<br>

- Enables `@next/eslint-plugin-next` plugin rules
- Allows the usage of `export default`

```ts
configure({
  presets: [presets.nextJs()]
})
```

</details>

<details>
<summary>Alias</summary>
<br>

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

      // (optional) A custom path to jsconfig
      // Defaults to jsconfig.json
      jsconfig: 'jsconfig.json'
    })
  ]
})
```

</details>

## Common issues

**Q**: My `.eslintrc.js` doesn't work, why?  
**A**: It's a regular issue with tools like `@vue/cli` and `create-react-app`. Check `package.json` and remove `eslintConfig` if you find it. Otherwise, try to restart your editor.

**Q**: I get some error when using `eslint-kit` in monorepo  
**A**: We didn't test monorepos much. They often have different issues with eslint and plugins resolving. And we also don't guarantee that your aliases settings will work in monorepo.

## Setting up editors

### VSCode

Install ESLint VSCode extension:

<img width="360" alt="CleanShot 2022-05-22 at 02 12 33@2x" src="https://user-images.githubusercontent.com/35740512/169671833-75706ff1-93c7-4002-a540-00fce3e9384d.png">

Next, select from the following and click on it:

<details>
<summary>Using a keybind</summary>
<br>

Click on Settings icon:

<img width="47" alt="Opening settings menu" src="https://user-images.githubusercontent.com/35740512/169671780-194c01ca-bc5b-4972-a450-0c7bff70f932.png">

Select "Keyboard shortcuts"

<img width="314" alt="Selecting keybind settings" src="https://user-images.githubusercontent.com/35740512/169671809-6f6005f1-c7cb-4d91-b2a3-dd5e5d731c92.png">

Type "eslint" and click on "edit" button:

<img width="719" alt="Adding a keybind" src="https://user-images.githubusercontent.com/35740512/169671924-ad3215d9-ceff-46ff-9ee3-699fd759302a.png">

Finally, choose the keybind you like.

</details>

<details>
<summary>Linting on file save</summary>
<br>

Click on Settings icon:

<img width="47" alt="Opening settings menu" src="https://user-images.githubusercontent.com/35740512/169671780-194c01ca-bc5b-4972-a450-0c7bff70f932.png">

Select "Settings"

<img width="314" alt="Selecting settings" src="https://user-images.githubusercontent.com/35740512/169671992-39adbda7-b08a-4b75-963e-cba35ed61719.png">

Switch to text mode:

<img width="540" alt="Switching to text mode" src="https://user-images.githubusercontent.com/35740512/169672014-6673c180-fb4c-4974-8e0f-d65220d96508.png">

Finally, add the following and save:

```ts
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
  },
}
```

</details>

## Contributing

1. Fork this repo
2. Switch to new branch, it should start with `feat/`, `fix/`, `docs/`, `refactor/`, and etc., depending on the changes you want to propose
3. Make changes
4. Create a Pull Request into this repo's `main` branch
5. When the checks is done and review is passed, I'll merge it into `main` and it will create a new record in the changelog. Then, when release is finally ready, your changes will be released.

## Maintenance

The dev branch is `main` - any developer changes is merged in there. Also, there is a `release` branch. It always contains the actual published release source code and tag.

All changes is made using Pull Requests - push is forbidden. PR can be merged only after successfull `test-and-build` workflow checks.

When PR is merged, `release-drafter` workflow creates/updates a draft release. The changelog is built from the merged branch scope (`feat`, `fix`, etc) and PR title. When release is ready - we publish the draft.

Then, the `release` workflow handles everything:

1. We run tests and build a package
2. Then, we merge release tag into the `release` branch
3. After, we restore build artifacts and publish it to NPM

Also, this repo has Renovate bot set up to auto-update `typescript` preset dependencies (they change frequently).

That's how it works:

1. Renovate bot creates a PR into `release` branch, cause we want to create a new release from the old one, without any pending dev changes
2. PR automatically merges after successfull checks
3. It triggers `release-auto-update` workflow
4. We take last tag from `release` branch, bump its minor number, and set the newly created tag at the latest commit from `release`
5. Then, we can create a Github release using this tag
6. A published release triggers `release` workflow, and it works just like the regular release