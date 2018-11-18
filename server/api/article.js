/**
 * 文档相关的 api
 */

const fs = require('fs')
const path = require('path')
// const exec = require('child_process').exec
const compile = require('../utils/compile')

// 读取配置文件
const configPath = path.join(__dirname, '../../config/app.yml')
const yaml = require('../yaml')

module.exports = function (router) {
  // 获取所有文章的列表
  router.get('/api/config/getBlogList', async ctx => {
    const source = yaml.read(configPath).hexo.source || ''
    const res = await new Promise(resolve => {
      const filePath = path.join(source, 'source/_posts') // md文档的路径
      fs.readdir(filePath, (err, files) => {
        if (err) {
          resolve(false)
          return
        }
        let nameArr = []
        files.forEach((file, index) => {
          // 过滤掉非 markdown 文件
          if (file.slice(-3) !== '.md') {
            return
          }
          const name = file.replace(/\.md$/, '')
          const fileContent = fs.readFileSync(path.join(source, 'source/_posts', file), 'utf-8')
          const dataReg = /date: (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})/
          const updateTime = (fileContent.match(dataReg) || [])[1]
          nameArr.push({ name, updateTime })
        })
        // 按时间顺序排列
        nameArr.sort((a, b) => {
          return new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()
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
    const source = yaml.read(configPath).hexo.source || ''
    const body = ctx.request.body
    if (!body.name) {
      ctx.status = 400
      ctx.body = '错误的参数格式'
      return
    }
    const filePath = path.join(source, 'source/_posts', `${body.name}.md`)

    const res = await new Promise(resolve => {
      fs.unlink(filePath, async err => {
        if (err) {
          resolve({ code: 1, errMsg: '删除hexo文档失败' })
          return
        }

        // 执行hexo编译
        const result = await compile()
        resolve(result)
      })
    })

    ctx.body = res
  })

  // 查询某一篇文章
  router.get('/api/config/getDetailByName', async ctx => {
    const source = yaml.read(configPath).hexo.source || ''
    const query = ctx.request.query
    if (!query.name) {
      ctx.status = 400
      ctx.body = '错误的参数格式'
      return
    }

    const filePath = path.join(source, 'source/_posts', `${query.name}.md`)
    const res = await new Promise(resolve => {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          resolve({ code: 1, errMsg: '查询失败' })
          return
        }

        const dataStr = data.toString()
        const titleStr = dataStr.match(/^---([^-]+-{0,2}[^-]*)+---/i)[0]
        const content = dataStr.replace(/^---([^-]+-{0,2}[^-]*)+---/i, '').replace(/(^\s*)/g, '')

        const title = titleStr.match(/title:([\w\W]*)(\r|\n)date/)[1].trim()
        const categories = ~titleStr.indexOf('categories') ? titleStr.match(/categories:([\w\W]*)(\r|\n)tags/)[1].trim() : ''
        const tagsStr = titleStr.match(/tags:([\w\W]*)(\r|\n)/)[1].trim()
        const tags = tagsStr.replace(/[[\] ]/g, '').split(',')

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
