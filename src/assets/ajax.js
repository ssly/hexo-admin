import axios from 'axios'
import { Loading, Message } from 'element-ui'
const loadingOptions = {
  fullscreen: true,
  text: '拼命加载中……',
  lock: true,
  background: 'rgba(0, 0, 0, .7)',
}

const HOST = ''

function submit (data) {
  const loading = Loading.service(loadingOptions)
  return axios.post(`${HOST}/submit`, data).then(res => {
    loading.close()
    return res
  })
}

function saveConfig (data) {
  const loading = Loading.service(loadingOptions)
  return axios.post(`${HOST}/config/save`, data).then(({ data }) => {
    loading.close()
    return data
  }).catch(({ response }) => {
    loading.close()
    Message.error(response.data)
    throw new Error(response.data)
  })
}

function getConfig () {
  const loading = Loading.service(loadingOptions)
  return axios.get(`${HOST}/config/get`).then(({ data }) => {
    loading.close()
    if (data.code !== 0) {
      return {}
    }
    return data.data
  })
}

function getBlogList () {
  const loading = Loading.service(loadingOptions)
  return axios.get(`${HOST}/config/getBlogList`).then(({data}) => {
    loading.close()
    return data
  })
}

function deleteByName (data) {
  const loading = Loading.service(loadingOptions)
  return axios.post(`${HOST}/config/delete`, data).then(({data}) => {
    loading.close()
    return data
  })
}

function getDetailByName (data) {
  const loading = Loading.service(loadingOptions)
  return axios.get(`${HOST}/config/getDetailByName?name=${data}`).then(({data}) => {
    loading.close()
    return data
  })
}

export {
  submit, // 提交文档
  getConfig, // 获取配置信息
  saveConfig, // 保存配置信息
  getBlogList, // 获取文章列表
  deleteByName, // 删除单条文章
  getDetailByName, // 获取单条文章内容
}
