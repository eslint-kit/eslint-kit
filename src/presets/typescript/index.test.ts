import { testConfig } from '../../shared/lib/testing'
import { typescript } from './index'

describe('[Presets] TypeScript', () => {
  it('should match snapshots', async () => {
    await testConfig({
      presets: [typescript()],
      dirname: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'ts',
    })
  })
})
