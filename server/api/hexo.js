/**
 * hexo 相关的 api
 */

const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec

const yaml = require('../yaml')
const utils = require('../utils')

// 读取配置文件
const configPath = path.join(__dirname, '../../config/app.yml')
let config = yaml.read(configPath)

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
      newTags += newTags === 'tags: ' ? `[${tag}` : `, ${tag}`
    })
    newTags += ']'
  }
  return newTags
}

module.exports = function (router) {
  // 获取 config 配置文件信息( config/app.yml )
  router.get('/api/config/get', async ctx => {
    ctx.body = {
      code: 0,
      data: config,
    }
  })

  router.post('/api/config/save', async ctx => {
    const body = ctx.request.body
    const source = body.source
    const categories = body.categories
    const tags = body.tags
    if (!source || !categories || !tags) {
      ctx.status = 400
      ctx.body = '错误的参数格式'
      return
    }

    const hexo = {
      source,
      categories,
      tags,
    }
    const newConfig = { ...config, ...{ hexo } }
    const err = await yaml.write(configPath, newConfig)

    if (err) {
      ctx.body = { code: 1, errMsg: '保存配置文件失败' }
      return
    }
    // 更新当前的config文件
    config = yaml.read(configPath)

    ctx.body = { code: 0 }
  })

  // 提交文档
  router.post('/api/submit', async ctx => {
    const body = ctx.request.body
    const title = body.title // 标题
    const date = utils.getNowTime() // 发布时间
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

        if (body.name) {
          const oldFilePath = path.join(config.hexo.source, 'source/_posts', `${body.name}.md`)
          fs.unlinkSync(oldFilePath, err => {
            if (err) {
              resolve({ code: 1, errMsg: '删除原hexo文档失败' })
            }
          })
        }

        fs.rename(sourceFile, targetFile, err => {
          if (err) {
            resolve({ code: 1, errMsg: '生成hexo文档失败' })
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
    })

    if (res.code !== 0) {
      ctx.body = res.errMsg
      return
    }

    ctx.body = res
  })
}
