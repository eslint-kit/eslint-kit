import { testConfig } from '../../shared/lib/testing'
import { base } from '../base'
import { PRIORITY } from '../priority'
import { compilePresets } from '../shared'
import { typescript } from '../typescript'
import { solidJs } from './index'

describe('[Presets] Solid', () => {
  it('should correctly lint .js', async () => {
    await testConfig({
      config: compilePresets([base(), solidJs()], PRIORITY),
      basePath: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'js',
    })
  })

  it('should correctly lint .ts', async () => {
    await testConfig({
      config: compilePresets([base(), typescript(), solidJs()], PRIORITY),
      basePath: __dirname,
      files: ['typescript-error'],
      extension: 'tsx',
    })
  })
})
