const Router = require('koa-router')
const articleRouter = require('./article')
const hexoRouter = require('./hexo')

const router = new Router()

articleRouter(router) // 文档相关
hexoRouter(router) // hexo 配置相关

module.exports = router
