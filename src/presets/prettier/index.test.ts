import { testConfig } from '../../shared/lib/testing'
import { presetPrettier } from './index'

describe('[Presets] Prettier', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: presetPrettier,
      basePath: __dirname,
      files: ['basic-clear', 'basic-warn'],
      extension: 'js',
    })
  })
})
