import { testConfig } from '../../shared/lib/testing'
import { base } from '../base'
import { PRIORITY } from '../priority'
import { react } from '../react'
import { compilePresets } from '../shared'
import { reactNewJSXTransform } from './index'

describe('[Presets] React New JSX Transform', () => {
  it('should match snapshots', async () => {
    await testConfig({
      config: compilePresets(
        [base(), react(), reactNewJSXTransform()],
        PRIORITY
      ),
      basePath: __dirname,
      files: ['basic-clear'],
      extension: 'js',
    })
  })
})
