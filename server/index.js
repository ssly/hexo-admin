/* eslint-disable */

const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec

const Koa = require('koa')
const Router = require('koa-router')
const statics = require('koa-static')
const bodyParser = require('koa-bodyparser')

// 读取配置文件
const configPath = path.join(__dirname, '../config/app.yml')
const config = require('./yaml')(configPath)

const app = new Koa()
const router = new Router()

app.use(statics(path.join(__dirname, '../dist')))
app.use(bodyParser())
app.use(router.routes())

// 获取配置文件
router.get('/config/get', async ctx => {
  ctx.body = {
    code: 0,
    data: config,
  }
})

// 提交文档
router.post('/submit', async ctx => {
  const body = ctx.request.body
  const title = body.title // 标题
  const date = new Date().toLocaleString() // 发布时间
  const categories = body.categories // 分类
  const content = body.content // 正文
  const tags = formatTags(body.tags) // 标签

  // 至少有一个标签
  if (tags === '') {
    ctx.status = 400
    ctx.body = '错误的参数格式'
    return
  }

  // 转换成标准的hexo文档格式
  const markdown = `\
---
title: ${title}
date: ${date}
categories: ${categories}
${tags}
---

${content}
`

  const res = await new Promise(resolve => {
    const fileName = `./${title}.md`
    const filePath = path.join(__dirname, fileName) // 生成的文档名称

    fs.writeFile(filePath, markdown, () => {
      const sourceFile = path.join(__dirname, fileName)
      const targetFile = path.join(config.hexo.source, 'source/_posts', fileName)
      fs.rename(sourceFile, targetFile, err => {
        if (err) {
          resolve({ code: 1, errMsg: '生成hexo文档失败' })
          return
        }
        // 执行hexo编译
        exec(`cd ${config.hexo.source} && hexo d`, (err, stdout) => {
          if (err) {
            resolve({ code: 1, errMsg: 'hexo打包部署失败' })
            return
          }
          resolve({ code: 0 })
        })
      })
    })
  })

  if (res.code !== 0) {
    ctx.body = res.errMsg
    return
  }

  ctx.body = res
})

/**
 * 处理tags格式
 * @param {string} tagString 逗号分隔的tag
 * @returns {string} 标准hexo文档的tags格式
 */
function formatTags (tagString) {
  if (typeof tagString !== 'string') {
    return ''
  }
  const tagList = tagString.split(/[,，]/g)
  // tagList是长度大于0的数组
  if (!(Array.isArray(tagList) && tagList.length > 0)) {
    return ''
  }
  let newTags = 'tags: '
  if (tagList.length === 1) {
    newTags += tagList[0]
  } else {
    tagList.forEach(tag => {
      newTags += `\n  - ${tag}`
    })
  }
  return newTags
}

app.listen(config.port)
