import { testConfig } from '../../shared/lib/testing'
import { react } from '../react'
import { remix } from './index'

describe('[Presets] Remix', () => {
  it('should match snapshots', async () => {
    await testConfig({
      presets: [react(), remix()],
      dirname: __dirname,
      files: ['basic-clear'],
      extension: 'js',
    })
  })
})
