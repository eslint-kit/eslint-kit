import { testConfig } from '../../shared/lib/testing'
import { presetReact } from './index'

describe('[Presets] React', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: presetReact,
      basePath: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'js',
    })
  })
})
