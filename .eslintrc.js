const { configure } = require('./dist')

module.exports = configure({
  presets: ['node', 'prettier', 'typescript'],
})
