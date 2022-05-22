import { testConfig } from '../../shared/lib/testing'
import { effector } from './index'

describe('[Presets] Effector', () => {
  it('should match snapshots', async () => {
    await testConfig({
      presets: [effector()],
      dirname: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'js',
    })
  })
})
