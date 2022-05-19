import { testConfig } from '../../shared/lib/testing'
import { PRIORITY } from '../priority'
import { compilePresets } from '../shared'
import { base } from './index'

describe('[Presets] Base', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: compilePresets([base()], PRIORITY),
      basePath: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error', 'env-error'],
      extension: 'js',
    })
  })
})
