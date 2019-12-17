import { addResizeListener, removeResizeListener } from '../libs/resize-event'
import util from '../libs/util'
import { scrollTop } from '../libs/dom'

export default {
  async install (Vue, options) {
    Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示 https://cn.vuejs.org/v2/api/#productionTip

    Vue.prototype.$util = util
    Vue.prototype.$scrollTop = scrollTop
    Vue.prototype.$resize = { addResizeListener, removeResizeListener }
  }
}