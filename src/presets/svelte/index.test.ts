import { testConfig } from '../../shared/lib/testing'
import { base } from '../base'
import { PRIORITY } from '../priority'
import { compilePresets } from '../shared'
import { typescript } from '../typescript'
import { svelte } from './index'

describe('[Presets] Svelte', () => {
  it('should correctly lint .js', async () => {
    await testConfig({
      config: compilePresets([base(), svelte()], PRIORITY),
      basePath: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'js',
    })
  })

  it('should correctly lint .ts', async () => {
    await testConfig({
      config: compilePresets([base(), typescript(), svelte()], PRIORITY),
      basePath: __dirname,
      files: ['typescript-clear'],
      extension: 'ts',
    })
  })

  it('should correctly lint .svelte', async () => {
    await testConfig({
      config: compilePresets([base(), svelte()], PRIORITY),
      basePath: __dirname,
      files: ['svelte-clear', 'svelte-warn'],
      extension: 'svelte',
    })
  })

  it('should correctly lint .svelte with type-checking', async () => {
    await testConfig({
      config: compilePresets([base(), typescript(), svelte()], PRIORITY),
      basePath: __dirname,
      files: ['svelte-clear', 'svelte-warn', 'svelte-type-warn'],
      extension: 'svelte',
    })
  })
})
