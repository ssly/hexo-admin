/* eslint-disable */

const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec

const Koa = require('koa')
const statics = require('koa-static')
const bodyParser = require('koa-bodyparser')
// const router2 = require('./api/index')
const router = require('./api')

// 读取配置文件
const configPath = path.join(__dirname, '../config/app.yml')
const yaml = require('./yaml')
let config = yaml.read(configPath)

const app = new Koa()

app.use(statics(path.join(__dirname, '../dist')))
app.use(bodyParser())
app.use(router.routes())

app.listen(config.port)
