/**
 * 文档相关的 api
 */

const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec

// 读取配置文件
const configPath = path.join(__dirname, '../../config/app.yml')
const yaml = require('../yaml')
let config = yaml.read(configPath)

module.exports = function (router) {
  // 获取所有文章的列表
  router.get('/api/config/getBlogList', async ctx => {
    const res = await new Promise(resolve => {
      const filePath = path.join(config.hexo.source, 'source/_posts') // md文档的路径
      fs.readdir(filePath, (err, files) => {
        if (err) {
          resolve(false)
          return
        }
        let nameArr = []
        files.forEach(file => {
          const name = file.replace(/\.md$/, '')
          nameArr.push({name})
        })
        resolve(nameArr)
      })
    })
    if (res === false) {
      ctx.status = 400
      ctx.body = 'hexo 路径无效'
      return
    }

    ctx.body = {
      code: 0,
      data: res
    }
  })

  // 根据name删除某个文章
  router.post('/api/config/delete', async ctx => {
    const body = ctx.request.body
    if (!body.name) {
      ctx.status = 400
      ctx.body = '错误的参数格式'
      return
    }
    const filePath = path.join(config.hexo.source, 'source/_posts', `${body.name}.md`)

    const res = await new Promise(resolve => {
      fs.unlink(filePath, (err) => {
        if (err) {
          resolve({ code: 1, errMsg: '删除hexo文档失败' })
          return
        }

        // 执行hexo编译
        const buildHexo = 'hexo deploy --generate'
        exec(`cd ${config.hexo.source} && rm -rf public && ${buildHexo}`, (err, stdout) => {
          if (err) {
            resolve({ code: 1, errMsg: 'hexo打包部署失败' })
            return
          }
          resolve({ code: 0 })
        })
      })
    })

    ctx.body = res
  })

  // 查询某一篇文章
  router.get('/api/config/getDetailByName', async ctx => {
    const query = ctx.request.query
    if (!query.name) {
      ctx.status = 400
      ctx.body = '错误的参数格式'
      return
    }

    const filePath = path.join(config.hexo.source, 'source/_posts', `${query.name}.md`)
    const res = await new Promise(resolve => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          resolve({ code: 1, errMsg: '查询失败' })
          return
        }

        const dataStr = data.toString()
        const titleStr = dataStr.match(/^---([^-]+-{0,2}[^-]*)+---/i)[0]
        const content = dataStr.replace(/^---([^-]+-{0,2}[^-]*)+---/i, '')

        const title = titleStr.match(/title:([\w\W]*)(\r|\n)date/)[1].trim()
        const categories = ~titleStr.indexOf('categories') ? titleStr.match(/categories:([\w\W]*)(\r|\n)tags/)[1].trim() : ''
        const tagsStr = titleStr.match(/tags:([\w\W]*)(\r|\n)/)[1].trim()
        const tags = tagsStr.replace(/[[]]/g, '').replace(', ', ',').split(',')

        resolve({
          code: 0,
          data: {
            content,
            categories,
            tags,
            title
          }})
      })
    })

    ctx.body = res
  })
}
