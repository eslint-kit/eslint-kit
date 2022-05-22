import { testConfig } from '../../shared/lib/testing'

describe('[Presets] Base', () => {
  it('should match snapshots', async () => {
    await testConfig({
      presets: [],
      dirname: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error', 'env-error'],
      extension: 'js',
    })
  })
})
