// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store' // 引入store
import App from './App'
import router from './router'
// import { Cascader } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import './assets/common.less'
import commonPlugin from './plugins/common'
// import 'lib-flexible/flexible.js'
import './plugins/node_models_lib/lib-flexible/flexible.js' // 适配pc端的rem时，由于flexible.js不支持，更改下源码
import {$httpGET, $httpPOST, $httpForm} from './api/api' // 请求
import i18n from '@/locales'

// 定义全局变量
Vue.prototype.$httpGET = $httpGET
Vue.prototype.$httpPOST = $httpPOST
Vue.prototype.$httpForm = $httpForm

Vue.config.productionTip = false // 阻止启动生产消息
Vue.use(ElementUI)
Vue.use(commonPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store, // 使用store
  components: {App},
  template: '<App/>',
  beforeMount () {
    // // rem适配
    // let fn = function () {
    //   let html = document.getElementsByTagName('html')[0]
    //   let clientWidth = document.body.clientWidth || document.documentElement.clientWidth
    //   if (!clientWidth) return
    //   clientWidth = clientWidth > 1920 ? 1920 : clientWidth <= 1024 ? 1024 : clientWidth
    //   html.style.fontSize = (clientWidth / 19.2) + 'px'
    // }
    // fn()
    // window.addEventListener('resize', fn, false)
    // echarts resize
    this.$reCharts.windowResizeECharts()
  }
})
