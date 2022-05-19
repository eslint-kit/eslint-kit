import { mergeConfigs } from '../../shared/lib/eslint'
import { testConfig } from '../../shared/lib/testing'
import { presetBase } from '../base'
import { presetReact } from './index'

describe('[Presets] React', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: mergeConfigs([presetBase, presetReact]),
      basePath: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'js',
    })
  })
})
