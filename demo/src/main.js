// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store' // 引入store
import App from './App'
import router from './router'
// import { Cascader } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 使用store
  components: { App },
  template: '<App/>'
})
