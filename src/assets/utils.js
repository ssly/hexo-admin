/**
 * 过滤数据中空白项及头尾空白字符
 * @props {string | array} data 需要过滤的数据
 */
function filterForData (data) {
  const type = typeof data
  if (!/^(string|array)$/.test(type)) {
    return data
  }

  if (typeof type === 'string') {
    data = data.split(',')
  }

  for (let i = data.length - 1; i >= 0; i--) {
    data[i] = data[i].replace(/^(\s\s*)|(\s\s*$)/g, '')
    if (data[i] === '') {
      data.splice(i, 1)
    }
  }

  console.log(data)
  return type === 'array' ? data : data.join(',')
}

export {
  filterForData, // 过滤数据中空白项及头尾空白字符
}
