import { mergeConfigs } from '../../shared/lib/eslint'
import { testConfig } from '../../shared/lib/testing'
import { presetBase } from '../base'
import { presetPrettier } from './index'

describe('[Presets] Prettier', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: mergeConfigs([presetBase, presetPrettier]),
      basePath: __dirname,
      files: ['basic-clear', 'basic-warn'],
      extension: 'js',
    })
  })
})
