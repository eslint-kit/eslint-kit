import { testConfig } from '../../shared/lib/testing'
import { base } from '../base'
import { PRIORITY } from '../priority'
import { react } from '../react'
import { compilePresets } from '../shared'
import { nextJs } from './index'

describe('[Presets] Next.js', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: compilePresets([base(), react(), nextJs()], PRIORITY),
      basePath: __dirname,
      files: ['basic-clear'],
      extension: 'js',
    })
  })
})
