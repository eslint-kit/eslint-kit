import { mergeConfigs } from '../../shared/lib/eslint'
import { testConfig } from '../../shared/lib/testing'
import { presetBase } from '../base'
import { presetNextJs } from './index'

describe('[Presets] Next.js', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: mergeConfigs([presetBase, presetNextJs]),
      basePath: __dirname,
      files: ['env-clear'],
      extension: 'js',
    })
  })
})
