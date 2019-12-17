import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '../styles/index.less'
import '@/assets/styles/color-brewer.css'
import '@/assets/styles/icon.less'
import '@/assets/styles/common.less'
import '@/assets/styles/button.less'
import '@/assets/styles/index.less'

import AuroraUI from '~/index'

import DemoBlock from './components/demo-block.vue'
import MainHeader from './components/main-header.vue'
import MainFooter from './components/main-footer.vue'
import SideNav from './components/side-nav.vue'

Vue.use(AuroraUI)

Vue.component('DemoBlock', DemoBlock)
Vue.component('MainHeader', MainHeader)
Vue.component('MainFooter', MainFooter)
Vue.component('SideNav', SideNav)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
