const { configure, presets } = require('./dist')

module.exports = configure({
  presets: [
    presets.imports(),
    presets.typescript(),
    presets.prettier(),
    presets.node(),
  ],
})
