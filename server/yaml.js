const fs = require('fs')

const yaml = require('yamljs')

function read (file) {
  return yaml.parse(fs.readFileSync(file).toString())
}

/**
 * 对象信息写入 yaml 文件
 * @param {string} file 文件路径
 * @param {object} data 对象
 */
function write (file, data) {
  return new Promise(resolve => {
    const yamlString = yaml.stringify(data)
    fs.writeFile(file, yamlString, err => {
      resolve(err)
    })
  })
}

module.exports = {
  read, // 读取文件
  write, // 写入文件
}
