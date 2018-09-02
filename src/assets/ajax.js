import axios from 'axios'

function submit (data) {
  return axios.post('/submit', data).then(res => {
    console.log('response', res)
  })
}

function getConfig () {
  return axios.get('/config/get').then(({ data }) => data)
}

export {
  submit, // 提交文档
  getConfig, // 获取配置信息
}
