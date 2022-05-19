import { testConfig } from '../../shared/lib/testing'
import { base } from '../base'
import { PRIORITY } from '../priority'
import { compilePresets } from '../shared'
import { prettier } from './index'

describe('[Presets] Prettier', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: compilePresets([base(), prettier()], PRIORITY),
      basePath: __dirname,
      files: ['basic-clear', 'basic-warn'],
      extension: 'js',
    })
  })
})
