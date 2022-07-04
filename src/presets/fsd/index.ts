import { conditional } from '../../shared/lib/eslint'
import { publicPresetNames } from '../names'
import { createPreset } from '../shared'

export interface Options {
  importOrder?: 'experimental'
  publicApi?: 'lite'
}

export const fsd = createPreset<Options | void>({
  name: publicPresetNames.fsd,
  compile: ({ meta, options: { importOrder, publicApi } = {} }) => {
    return {
      extends: [
        ...conditional.extends(meta.presets.has('imports'), [
          importOrder === 'experimental'
            ? '@feature-sliced/eslint-config/rules/import-order/experimental'
            : '@feature-sliced/eslint-config/rules/import-order',
        ]),
        publicApi === 'lite'
          ? '@feature-sliced/eslint-config/rules/public-api/lite'
          : '@feature-sliced/eslint-config/rules/public-api',
        '@feature-sliced/eslint-config/rules/layers-slices',
      ],
    }
  },
})
