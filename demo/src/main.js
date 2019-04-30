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
import {$httpGET, $httpPOST, $httpForm} from './api/api' // 请求

// 定义全局变量
Vue.prototype.$httpGET = $httpGET
Vue.prototype.$httpPOST = $httpPOST
Vue.prototype.$httpForm = $httpForm

Vue.config.productionTip = false // 阻止启动生产消息
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 使用store
  components: {App},
  template: '<App/>'
})
