/**
 * util 扩展
 */
const util = {}

/**
 * 更新标题
 * @param {String} title 标题
 */
util.title = function (title) {
  window.document.title = title || 'aurora-ui'
}

export default util
