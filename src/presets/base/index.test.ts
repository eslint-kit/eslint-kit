import { testConfig } from '../../shared/lib/testing'
import { presetBase } from './index'

describe('[Presets] Base', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: presetBase,
      basePath: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error', 'env-error'],
      extension: 'js',
    })
  })
})
