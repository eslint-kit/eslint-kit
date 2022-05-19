const { configure, presets } = require('./dist')

module.exports = configure({
  presets: [presets.typescript(), presets.prettier(), presets.node()],
})
