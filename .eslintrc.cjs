const { configure, presets } = require('./dist')

module.exports = configure({
  presets: [
    presets.imports(),
    presets.typescript({ enforceUsingType: true }),
    presets.prettier(),
    presets.node(),
  ],
})
