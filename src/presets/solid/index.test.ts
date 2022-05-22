import { testConfig } from '../../shared/lib/testing'
import { typescript } from '../typescript'
import { solidJs } from './index'

describe('[Presets] Solid', () => {
  it('should correctly lint .js', async () => {
    await testConfig({
      presets: [solidJs()],
      dirname: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'js',
    })
  })

  it('should correctly lint .ts', async () => {
    await testConfig({
      presets: [typescript(), solidJs()],
      dirname: __dirname,
      files: ['typescript-error'],
      extension: 'tsx',
    })
  })
})
