import { testConfig } from '../../shared/lib/testing'
import { base } from '../base'
import { PRIORITY } from '../priority'
import { compilePresets } from '../shared'
import { react } from './index'

describe('[Presets] React', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: compilePresets([base(), react()], PRIORITY),
      basePath: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'js',
    })
  })

  it('should respect newJSXTransform option', async () => {
    await testConfig({
      config: compilePresets(
        [base(), react({ newJSXTransform: true })],
        PRIORITY
      ),
      basePath: __dirname,
      files: ['new-jsx-transform-clear'],
      extension: 'js',
    })
  })
})
