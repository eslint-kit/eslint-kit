import { mergeConfigs } from '../../shared/lib/eslint'
import { testConfig } from '../../shared/lib/testing'
import { presetBase } from '../base'
import { presetReact } from '../react'
import { presetReactNewJSXTransform } from './index'

describe('[Presets] React New JSX Transform', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: mergeConfigs([
        presetBase,
        presetReact,
        presetReactNewJSXTransform,
      ]),
      basePath: __dirname,
      files: ['basic-clear'],
      extension: 'js',
    })
  })
})
