import { testConfig } from '../../shared/lib/testing'
import { presetTypescript } from './index'

describe('[Presets] TypeScript', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: presetTypescript,
      basePath: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'ts',
    })
  })
})
