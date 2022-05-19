import { testConfig } from '../../shared/lib/testing'
import { base } from '../base'
import { PRIORITY } from '../priority'
import { compilePresets } from '../shared'
import { nextJs } from './index'

describe('[Presets] Next.js', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: compilePresets([base(), nextJs()], PRIORITY),
      basePath: __dirname,
      files: ['env-clear'],
      extension: 'js',
    })
  })
})
