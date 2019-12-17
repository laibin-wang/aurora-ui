
// 核心插件
import Plugin from './plugin'

import ScrollBar from './components/scrollbar'

const components = [ ScrollBar ]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.use(Plugin)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ScrollBar
}
