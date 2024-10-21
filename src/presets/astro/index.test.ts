import { testConfig } from '../../shared/lib/testing'
import { imports } from '../imports'
import { prettier } from '../prettier'
import { typescript } from '../typescript'
import { astro } from './index'

describe('[Presets] Astro', () => {
  it('should match snapshots', async () => {
    await testConfig({
      presets: [astro()],
      dirname: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'js',
    })
  })

  it('should lint .astro files', async () => {
    await testConfig({
      presets: [astro()],
      dirname: __dirname,
      files: ['astro-clear', 'astro-warn', 'astro-error'],
      extension: 'astro',
    })
  })

  it('should work with typescript', async () => {
    await testConfig({
      presets: [typescript(), astro()],
      dirname: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'ts',
    })
  })

  it('should lint typescript in .astro files', async () => {
    await testConfig({
      presets: [typescript(), astro()],
      dirname: __dirname,
      files: ['ts-astro-clear', 'ts-astro-warn', 'ts-astro-error'],
      extension: 'astro',
    })
  })

  it('should not conflict with prettier', async () => {
    await testConfig({
      presets: [prettier(), astro()],
      dirname: __dirname,
      files: ['astro-warn'],
      extension: 'astro',
    })
  })

  it('should not complain about astro imports', async () => {
    await testConfig({
      presets: [imports(), astro()],
      dirname: __dirname,
      files: ['astro-import-clear', 'astro-import-error'],
      extension: 'astro',
    })
  })

  it('should not complain about astro imports (typescript)', async () => {
    await testConfig({
      presets: [typescript(), imports(), astro()],
      dirname: __dirname,
      files: ['ts-astro-import-clear', 'ts-astro-import-error'],
      extension: 'astro',
    })
  })
})
