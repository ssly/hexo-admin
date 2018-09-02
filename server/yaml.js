const fs = require('fs')

const yaml = require('yamljs')

module.exports = function (file) {
  return yaml.parse(fs.readFileSync(file).toString())
}
