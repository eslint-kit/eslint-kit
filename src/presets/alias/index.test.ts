import { testConfig } from '../../shared/lib/testing'
import { typescript } from '../typescript'
import { alias } from './index'

describe('[Presets] Alias', () => {
  it('should respect paths from jsconfig.json', async () => {
    await testConfig({
      presets: [alias()],
      dirname: __dirname,
      files: ['jsconfig-clear', 'jsconfig-error'],
      extension: 'js',
    })
  })

  it('should respect paths from tsconfig.json', async () => {
    await testConfig({
      presets: [typescript(), alias()],
      dirname: __dirname,
      files: ['tsconfig-clear', 'tsconfig-error'],
      extension: 'ts',
    })
  })
})
