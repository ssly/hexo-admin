/**
 * 补充月日时分等为两位数字格式
 * @param {string|number} val 原始格式
 * @returns {string}
 */
function format (val) {
  return String(val).padStart(2, '0')
}

function getNowTime () {
  const date = new Date()
  const dataStr = `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(date.getDate())}`
  const timeStr = `${format(date.getHours())}:${format(date.getMinutes())}:${format(date.getSeconds())}`
  return `${dataStr} ${timeStr}`
}

module.exports = {
  getNowTime, // 获取当前时间（yyyy-mm-dd hh:mm:ss)
}
