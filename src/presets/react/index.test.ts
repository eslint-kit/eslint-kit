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

  it('should respect newJSXTransform option', async () => {
    await testConfig({
      presets: [react({ newJSXTransform: true })],
      dirname: __dirname,
      files: ['new-jsx-transform-clear'],
      extension: 'js',
    })
  })
})
