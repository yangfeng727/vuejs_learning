export default {
  namespaced: true,
  state: {
    msg: 100
  },
  getters: {
    aMget (state) {
      return state.msg + '元'
    }
  },
  mutations: {
    minusPrice (state, payload) {
      state.msg -= payload
    }
  },
  actions: { // 添加actions
    minusPriceAsync ({commit}, payload) {
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
  }
}
