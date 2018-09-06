import axios from 'axios'
import { Loading } from 'element-ui'
const loadingOptions = {
  fullscreen: true,
  text: '拼命加载中……',
  lock: true,
  background: 'rgba(0, 0, 0, .7)',
}

const HOST = 'http://localhost:3000'

function submit (data) {
  const loading = Loading.service(loadingOptions)
  return axios.post(`${HOST}/submit`, data).then(res => {
    loading.close()
    return res
  })
}

function saveConifg (data) {
  const loading = Loading.service(loadingOptions)
  console.log(loading)
  return axios.post(`${HOST}/config/save`, data).then(({ data }) => {
    loading.close()
    return data
  })
}

function getConfig () {
  const loading = Loading.service(loadingOptions)
  return axios.get(`${HOST}/config/get`).then(({ data }) => {
    loading.close()
    return data
  })
}

export {
  submit, // 提交文档
  getConfig, // 获取配置信息
  saveConifg, // 保存配置信息
}
