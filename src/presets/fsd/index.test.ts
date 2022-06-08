import { readdir } from 'fs/promises'
import { basename, resolve } from 'path'
import { testConfig } from '../../shared/lib/testing'
import { presets } from '../presets'

describe('[Presets] FSD', () => {
  it('should match snapshots', async () => {
    const includedSlices = [
      'pages/slice',
      'widgets/slice',
      'features/slice',
      'entities/slice',
      'shared/ui',
    ]
    const excludedFiles = ['index.ts', 'ui.ts', 'model.ts']
    const files = await Promise.all(
      includedSlices.map((name) =>
        readdir(resolve(__dirname, 'tests', name)).then((files) =>
          files
            .filter((file) => !excludedFiles.includes(file))
            .map((file) => `${name}/${basename(file, '.ts')}`)
        )
      )
    ).then((nestedFiles) => nestedFiles.flat())

    await testConfig({
      presets: [
        presets.typescript({
          root: resolve(__dirname, 'tests'),
          tsconfig: resolve(__dirname, 'tests', 'tsconfig.json'),
        }),
        presets.imports(),
        presets.fsd({
          importOrder: 'experimental',
        }),
      ],
      dirname: __dirname,
      files,
      extension: 'ts',
    })
  })
})
