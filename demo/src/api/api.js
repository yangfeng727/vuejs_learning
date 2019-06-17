/**
 * 封装axios请求方法
 */
import axios from 'axios'
import Cookies from 'js-cookie'
// import qs from 'qs'
// import {router} from '@/router/index' // 引入路由实例

/**
 * 基础配置
 */
export const URL = '' // 域名（开发中应该从某个全局配置文件中导入）
export const Axios = axios.create({
  baseURL: URL,
  timeout: 10000, // 请求超时时间
  responseType: 'json'
})

/**
 * *添加请求拦截器
 */
Axios.interceptors.request.use(config => {
  config.url = '/api' + config.url
  // config.cancelToken = new CancelToken((c) => { // cancelToken的使用，取消请求
  //   // cancel = c; // 本来是这样调用
  //   removePending(config, c)
  // })
  /* 检查权限,添加授权码 */
  if (Cookies('authCode')) {
    /*       config.headers.post['Authorization'] = Cookies('authCode');
             config.headers.get['Authorization'] = Cookies('authCode'); */
  }
  return config
},
error => {
  return Promise.reject(error)
})

/**
 * 添加响应拦截器
 */
Axios.interceptors.response.use(res => {
  // removePending(res.config) // 不管成功与否都从记录中移除请求记录
  /*  检查授权码是否过期 */
  switch (res.data.retCode) {
    case '0000': // 成功
      return res
    case '0001': // 请先登陆
      return res
    case '0002': // 没有权限
      return res
    case '0003': // token失效
      return res
  }
}, error => {
  // removePending(error.config) // 不管成功与否都从记录中移除请求记录
  // 如果授权码过期则返回登录页
  // 接口请求报错
  switch (error.response.status) {
    case '404':
      // router.push({path: '/404'})
      break
    case '403':
      break
    case '502':
      break
    case '500':
      break
  }
  console.log(`请求失败:${error.response.status}`)
  /* 注意这里返回的是resolve，而不是reject，
  目的：在成功的回调中就算请求失败也都能收到通知,然后可以关闭一些加载动画 */
  return Promise.resolve(error.response)
})

/**
 *  解決重复请求
 *
 */
// let pending = [] // 存储网络请求列表
// let CancelToken = axios.CancelToken
// let removePending = (config, cancleHandle) => {
//   let flagUrl = config.url
//   if (flagUrl.indexOf('http') !== 0) flagUrl = config.baseURL + flagUrl
//   if (pending.indexOf(flagUrl) !== -1) { // 如果要检索的字符串值没有出现，则该方法indexOf返回 -1
//     if (cancleHandle) {
//       console.log('重复的请求已取消')
//       cancleHandle() // 执行取消操作
//     } else {
//       pending.splice(pending.indexOf(flagUrl), 1)// 把这条记录从数组中移除
//     }
//   } else {
//     pending.push(flagUrl)
//   }
// }

/**
 *  get的网络请求
 */
export function $httpGET (url, config = {}) {
  // return new Promise((resolve, reject) => {
  //   Axios.get(url, config)
  //     .then(response => {
  //       resolve(response.data)
  //     })
  // })

  return Axios.get(url, config)
}

/**
 *  提交JSON格式的网络请求
 */
export function $httpPOST (url, data = {}, config = {}) {
  // config = {
  //   headers: {'Content-Type': 'application/json;charset=utf-8'},
  //   transformRequest: [function (data) {
  //     data = qs.stringify(data)
  //     return data
  //   }]
  // }
  // return new Promise((resolve, reject) => {
  //   Axios.post(url, data, config)
  //     .then(response => {
  //       resolve(response.data)
  //     })
  // })
  return Axios.post(url, data, config)
}

/**
 *  提交表单形式的网络请求
 */
export function $httpForm (url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    Axios.post(url, data, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(response => {
      resolve(response.data)
    })
  })
}
