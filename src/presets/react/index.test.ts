import { testConfig } from '../../shared/lib/testing'
import { react } from './index'

describe('[Presets] React', () => {
  it('should match snapshots', async () => {
    await testConfig({
      presets: [react()],
      dirname: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'js',
    })
  })

  it('should respect oldJSXTransform option', async () => {
    await testConfig({
      presets: [react({ oldJSXTransform: true })],
      dirname: __dirname,
      files: ['old-jsx-transform-error'],
      extension: 'js',
    })
  })
})
