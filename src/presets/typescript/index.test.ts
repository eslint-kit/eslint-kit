import { testConfig } from '../../shared/lib/testing'
import { base } from '../base'
import { PRIORITY } from '../priority'
import { compilePresets } from '../shared'
import { typescript } from './index'

describe('[Presets] TypeScript', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: compilePresets([base(), typescript()], PRIORITY),
      basePath: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'ts',
    })
  })
})
