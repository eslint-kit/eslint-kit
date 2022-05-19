import { mergeConfigs } from '../../shared/lib/eslint'
import { testConfig } from '../../shared/lib/testing'
import { presetBase } from '../base'
import { presetNode } from './index'

describe('[Presets] Node', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: mergeConfigs([presetBase, presetNode]),
      basePath: __dirname,
      files: ['env-clear'],
      extension: 'js',
    })
  })
})
