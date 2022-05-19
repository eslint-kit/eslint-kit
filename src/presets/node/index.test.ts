import { testConfig } from '../../shared/lib/testing'
import { base } from '../base'
import { PRIORITY } from '../priority'
import { compilePresets } from '../shared'
import { node } from './index'

describe('[Presets] Node', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: compilePresets([base(), node()], PRIORITY),
      basePath: __dirname,
      files: ['env-clear'],
      extension: 'js',
    })
  })
})
