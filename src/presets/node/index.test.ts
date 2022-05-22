import { testConfig } from '../../shared/lib/testing'
import { node } from './index'

describe('[Presets] Node', () => {
  it('should match snapshots', async () => {
    await testConfig({
      presets: [node()],
      dirname: __dirname,
      files: ['env-clear'],
      extension: 'js',
    })
  })
})
