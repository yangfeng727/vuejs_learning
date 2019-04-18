export default {
  namespaced: true,
  state: {
    msg: 100
  },
  getters: {
    aMget (state, getters, rootState) {
      console.log(rootState.message, 111111111)
      return state.msg + '元'
    }
  },
  mutations: {
    minusPrice (state, payload) {
      state.msg -= payload
    }
  },
  actions: { // 添加actions
    minusPriceAsync ({state, commit, rootState}, payload) {
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
