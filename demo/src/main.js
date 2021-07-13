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

// 引入echarts
let echarts = require('echarts') // 引入基本模板
require('./assets/js/echartsTheme/mytest-theme') // 引入echarts 官网下载的主题（需要改一点点echarts引入的代码）
Vue.prototype.$echarts = echarts

// 定义全局变量
Vue.prototype.$httpGET = $httpGET
Vue.prototype.$httpPOST = $httpPOST
Vue.prototype.$httpForm = $httpForm

Vue.config.productionTip = false // 阻止启动生产消息
Vue.use(ElementUI)
Vue.use(commonPlugin)

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    let ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
    // 聚焦元素
    ele.focus()
  }
})

/**
 * [setValueWithExpressionVue 更新数据模型]
 * @param {[type]}  $data    [当前的数据模型]
 * @param {[type]}  expression [指令表达式]
 * @param {[type]}  value      [input处理后的值]
 * @param {[type]}  key        [数组循环时，用于批量渲染时的跟踪键]
 * @param {[type]}  arg        [数组循环时，指令的参数]
 */
function setValueWithExpressionVue (option) {
  let arr = option.expression.split('-') // 若是数组循环，使用-分割 【循环的数组-当前item所在index-数组里面的哪个item】
  let expression = arr[0].split('.') // 获取对象层级
  expression.forEach(function (item, i) {
    if (i < expression.length - 1) {
      option.$data = option.$data[item]
    } else {
      if (arr[1] != undefined) { // 针对数组循环
        let inx = arr[1]
        let abrr = arr[2]?arr[2].split('.'):[] // item 也可能有多个层级
        let obj = option.$data[item][inx]
        abrr.map(sub => {
          obj = obj[sub]
        })
        obj = option.value
      } else {
        option.$data[item] = option.value
      }
    }
  })
}

/**
 * [handleInput 在输入阶段的处理逻辑]
 * @param  {[DOM]} ele   [当前指令操作的dom对象]
 * @param  {[虚拟节点]} vnode [当前指令渲染的虚拟节点]
 * @param  {[指令信息]} rel   [当前指令的所有指令信息]
 * @param  {[校验类型]} type  [输入阶段的校验类型]
 *      "number": 仅支持输入数字
 *      "float": 仅支持数字和小数点
 */
function handleInput (ele, vnode, rel) {
  let rule
  let val = ele.value
  switch (true) {
    case rel.modifiers.float: // 浮点型
      rule = /[^\d\.]/g
      val = val.replace(rule, '')
      break
    default:
      if(vnode.data.attrs && vnode.data.attrs['number-reg']){ // 可以自由设置正则
        rule = vnode.data.attrs['number-reg']
      }else{ // 默认仅支持输入数字
        rule = /\D/g
      }
      val = val.replace(rule, '')
  }
  // 长度限制
  let maxLen = vnode.data.attrs && vnode.data.attrs['max-len'] ? vnode.data.attrs['max-len'] : 0
  if (maxLen > 0) {
    val = val.substr(0, maxLen)
  }
  setValueWithExpressionVue({
    $data: vnode.context.$data,
    expression: rel.expression,
    value: val,
    key: vnode.key,
    arg: rel.arg,
    // toString: rel.modifiers.string || rel.modifiers.float
  })
}

// 指令的方式暂时不行，没法解决在指令里面更改值后重新调用input的事件，和事件美没同步
Vue.directive('number', {
  inserted: function (el, binding, vnode) {
    el.handleInputEvent = function(e){
      console.log(vnode, 666)
      // 获取相关的指令配置信息
      let rel = vnode.data.directives.filter(item => {
        return item.name === binding.name
      })[0]
      vnode.context.$nextTick(() => {
        handleInput(ele, vnode, rel)
      })
    }
    let ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
    // 不用input事件是因为微软中文输入时不触发
    ele.addEventListener("input", function(e) {
      el.handleInputEvent(e)
    },false);
  },
  unbind (el) {
    let inputDom = el.tagName === 'INPUT' ? el : el.querySelector('input')
    inputDom && inputDom.removeEventListener('input', el.handleInputEvent, false)
  }
})

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
