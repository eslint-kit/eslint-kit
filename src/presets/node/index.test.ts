import { testConfig } from '../../shared/lib/testing'
import { presetNode } from './index'

describe('[Presets] Node', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: presetNode,
      basePath: __dirname,
      files: ['env-clear'],
      extension: 'js',
    })
  })
})
