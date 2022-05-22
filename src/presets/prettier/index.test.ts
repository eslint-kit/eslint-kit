import { testConfig } from '../../shared/lib/testing'
import { prettier } from './index'

describe('[Presets] Prettier', () => {
  it('should match snapshots', async () => {
    await testConfig({
      presets: [prettier()],
      dirname: __dirname,
      files: ['basic-clear', 'basic-warn'],
      extension: 'js',
    })
  })
})
