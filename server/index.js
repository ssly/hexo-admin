/* eslint-disable */

const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec

const Koa = require('koa')
const Router = require('koa-router')
const statics = require('koa-static')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');

// 读取配置文件
const configPath = path.join(__dirname, '../config/app.yml')
const yaml = require('./yaml')
let config = yaml.read(configPath)

const app = new Koa()
const router = new Router()

app.use(statics(path.join(__dirname, '../dist')))
app.use(cors())
app.use(bodyParser())
app.use(router.routes())

// 获取配置文件
router.get('/config/get', async ctx => {
  ctx.body = {
    code: 0,
    data: config,
  }
})

// 获取所有文章的列表
router.get('/config/getBlogList', async ctx => {

  const res = await new Promise(resolve => {
    const filePath = path.join(config.hexo.source, 'source/_posts') // md文档的路径
    fs.readdir(filePath, (err, files) => {
      if(err) {
        return
      }
      let nameArr = new Array()
      files.forEach(file => {
        const name = file.replace(/\.md$/, '')
        nameArr.push({name})
      })
      resolve(nameArr)

    })
  })
  ctx.body = {
    code: 0,
    data: res
  }
})

// 根据name删除某个文章
router.post('/config/delete', async ctx => {
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

router.get('/config/getDetailByName', async ctx => {
  const query = ctx.request.query;
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
      const titleStr =  dataStr.match(/^---([^-]+-{0,2}[^-]*)+---/i)[0]
      const content = dataStr.replace(/^---([^-]+-{0,2}[^-]*)+---/i, '')

      const title = titleStr.match(/title:([\w\W]*)(\r|\n)date/)[1].trim()
      const categories = ~titleStr.indexOf('categories') ? titleStr.match(/categories:([\w\W]*)(\r|\n)tags/)[1].trim() : ''
      const tagsStr = titleStr.match(/tags:([\w\W]*)(\r|\n)/)[1].trim()
      const tags = tagsStr.replace(/([\[\]])/g, '').replace(', ', ',').split(',')

      resolve({code: 0, data: {
        content,
        categories,
        tags,
        title
      }})
    })
  })



  ctx.body = res
})


router.post('/config/save', async ctx => {
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

      if(body.name) {
        const oldFilePath = path.join(config.hexo.source, 'source/_posts', `${body.name}.md`)
        fs.unlinkSync(oldFilePath, err => {
          if (err) {
            resolve({ code: 1, errMsg: '删除原hexo文档失败'})
            return
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

app.listen(config.port)
