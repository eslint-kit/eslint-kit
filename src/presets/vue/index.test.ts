import { testConfig } from '../../shared/lib/testing'
import { prettier } from '../prettier'
import { typescript } from '../typescript'
import { vue } from './index'

describe('[Presets] Vue', () => {
  it('should match snapshots', async () => {
    await testConfig({
      presets: [vue()],
      dirname: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'js',
    })
  })

  it('should lint .vue files', async () => {
    await testConfig({
      presets: [vue()],
      dirname: __dirname,
      files: ['vue-clear', 'vue-warn', 'vue-error'],
      extension: 'vue',
    })
  })

  it('should work with typescript', async () => {
    await testConfig({
      presets: [typescript(), vue()],
      dirname: __dirname,
      files: ['basic-clear', 'basic-warn', 'basic-error'],
      extension: 'ts',
    })
  })

  it('should lint typescript in .vue files', async () => {
    await testConfig({
      presets: [typescript(), vue()],
      dirname: __dirname,
      files: ['ts-vue-clear', 'ts-vue-warn', 'ts-vue-error'],
      extension: 'vue',
    })
  })

  it('should not conflict with prettier', async () => {
    await testConfig({
      presets: [
        prettier({
          semi: false,
          singleQuote: true,
          tabWidth: 2,
          quoteProps: 'consistent',
          endOfLine: 'lf',
        }),
        vue(),
      ],
      dirname: __dirname,
      files: ['vue-warn'],
      extension: 'vue',
    })
  })
})
