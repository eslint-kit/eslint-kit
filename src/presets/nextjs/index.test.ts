import { testConfig } from '../../shared/lib/testing'
import { react } from '../react'
import { nextJs } from './index'

describe('[Presets] Next.js', () => {
  it('should match snapshots', async () => {
    await testConfig({
      presets: [react(), nextJs()],
      dirname: __dirname,
      files: ['basic-clear'],
      extension: 'js',
    })
  })
})
