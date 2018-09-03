import axios from 'axios'

const HOST = ''

function submit (data) {
  return axios.post(`${HOST}/submit`, data).then(res => {
    console.log('response', res)
  })
}

function saveConifg (data) {
  return axios.post(`${HOST}/config/save`, data).then(res => {
    console.log('response', res)
  })
}

function getConfig () {
  return axios.get(`${HOST}/config/get`).then(({ data }) => data)
}

export {
  submit, // 提交文档
  getConfig, // 获取配置信息
  saveConifg, // 保存配置信息
}
