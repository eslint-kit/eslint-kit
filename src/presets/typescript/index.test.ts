import { mergeConfigs } from '../../shared/lib/eslint'
import { testConfig } from '../../shared/lib/testing'
import { presetBase } from '../base'
import { presetTypescript } from './index'

describe('[Presets] TypeScript', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: mergeConfigs([presetBase, presetTypescript]),
      basePath: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'ts',
    })
  })
})
