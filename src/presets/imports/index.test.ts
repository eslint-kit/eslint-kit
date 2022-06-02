import { testConfig } from '../../shared/lib/testing'
import { typescript } from '../typescript'
import { imports } from './index'

describe('[Presets] Imports', () => {
  it('should match snapshots', async () => {
    await testConfig({
      presets: [imports()],
      dirname: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'js',
    })
  })

  it('should respect newline=true', async () => {
    await testConfig({
      presets: [imports({ sort: { newline: true } })],
      dirname: __dirname,
      files: ['newline-true'],
      extension: 'js',
    })
  })

  it('should respect newline=false', async () => {
    await testConfig({
      presets: [imports({ sort: { newline: false } })],
      dirname: __dirname,
      files: ['newline-false'],
      extension: 'js',
    })
  })

  it('should respect paths from jsconfig.json', async () => {
    await testConfig({
      presets: [imports()],
      dirname: __dirname,
      files: ['alias-jsconfig-clear', 'alias-jsconfig-error'],
      extension: 'js',
      disableLogs: true
    })
  })

  it('should respect paths from tsconfig.json', async () => {
    await testConfig({
      presets: [typescript(), imports()],
      dirname: __dirname,
      files: ['alias-tsconfig-clear', 'alias-tsconfig-error'],
      extension: 'ts',
      disableLogs: true
    })
  })
})
