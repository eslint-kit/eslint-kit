import { testConfig } from '../../shared/lib/testing'
import { presetReactNewJSXTransform } from './index'

describe('[Presets] React New JSX Transform', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: presetReactNewJSXTransform,
      basePath: __dirname,
      files: ['basic-clear'],
      extension: 'js',
    })
  })
})
