import Vue from 'vue'
import Vuex from 'vuex'
import modulesA from './modules/a'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    message: '这是根state的变量',
    products: [
      {name: '鼠标', price: 20},
      {name: '键盘', price: 40},
      {name: '耳机', price: 60},
      {name: '显示屏', price: 80}
    ]
  },
  getters: {
    saleProducts: (state) => {
      return state.products.map(product => {
        return {
          name: product.name,
          price: product.price / 2
        }
      })
    }
  },
  mutations: {
    minusPrice (state, payload) {
      if (!payload) return
      state.products.forEach(product => {
        product.price -= payload
      })
    }
  },
  actions: { // 添加actions
    minusPriceAsync ({state, commit}, payload) {
      // 使用promise可以使用then方法处理事件
      // store.dispatch('actionA').then(() => {
      //   // ...
      // })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('minusPrice', payload) // context提交
          resolve()
        }, 2000)
      })
    }
  },
  modules: {
    modulesA
  }
})
