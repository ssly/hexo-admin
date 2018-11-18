/**
 * 重新编译hexo的public
 */
const path = require('path')
const os = require('os')
const exec = require('child_process').exec
const yaml = require('../yaml')

// 读取配置文件
const configPath = path.join(__dirname, '../../config/app.yml')
let config = yaml.read(configPath)

/**
 * 在windows系统下采用不同的删除命令
 * @param {String} listDir 目录文件夹
 * @param {String} dir 删除文件夹
 */
function getRemoveDirCmd (listDir, dir) {
  const osType = os.type()
  let removeCmd = `cd ${listDir} && rm -rf`
  if (osType === 'Windows_NT') {
    removeCmd = `cd /d ${listDir} && rd /s /q`
  }

  return `${removeCmd} ${dir}`
}

// 重新编译hexo
function compile () {
  return new Promise(resolve => {
    // 执行hexo编译
    const buildHexo = 'hexo deploy --generate'
    exec(`${getRemoveDirCmd(config.hexo.source, 'public')} && ${buildHexo}`, (err, stdout) => {
      if (err) {
        resolve({ code: 1, errMsg: 'hexo打包部署失败' })
        return
      }
      resolve({ code: 0 })
    })
  })
}

module.exports = compile
