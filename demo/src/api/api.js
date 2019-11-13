/**
 * 封装axios请求方法
 */
import axios from 'axios'
import Cookies from 'js-cookie'
import qs from 'qs'
// import qs from 'qs'
// import {router} from '@/router/index' // 引入路由实例

/**
 * 基础配置
 */
export const URL = window.location.protocol + '//' + window.location.host // 域名（开发中应该从某个全局配置文件中导入）
export const Axios = axios.create({
  baseURL: URL,
  timeout: 10000, // 请求超时时间
  responseType: 'json'
})

/**
 * *添加请求拦截器
 */
Axios.interceptors.request.use(config => {
    config.url = URL + '/api' + config.url + '?_t=' + new Date().getTime()
    // axios的默认请求头是Content-Type: application/json
    // 使用这个请求头会出现向服务器请求两次的情况
    // config.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
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
    case '00': // 成功
    case '8000': // 重新登陆
      // if (globalObj.checkLogin) {
      //   let redirect = router.currentRoute.fullPath
      //   setTimeout(() => {
      //     router.replace({name: 'login', query: {goBack: redirect}})
      //   }, 2000)
      // }'
      break
    case '01': // 失败
    case '02': // 参数错误
    case '99': // 系统繁忙，请稍后再试
    case '8008': // 系统繁忙，请稍后再试
    case '0002': // 没有权限
    case '0003': // token失效
      break
    default:
      // if (msgObj[res.config.url]) { // 错误提示
      //   errorAlert(res.data ? res.data.retMsg : '')
      // }
      break
  }

  // 其他状态直接返回
  return res.data
}, error => {
  // removePending(error.config) // 不管成功与否都从记录中移除请求记录
  // 如果授权码过期则返回登录页
  // 接口请求报错
  let status = error.response ? error.response.status : ''
  switch (status) {
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
export function $httpPOST (url, data = {}, config = {
  headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
  transformRequest: [function (data) {
    data = qs.stringify(data)
    return data
  }]
}) {
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
export function $httpForm (url, data = {}, config = {
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}) {
  // return new Promise((resolve, reject) => {
  //   Axios.post(url, data, {
  //     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  //   }).then(response => {
  //     resolve(response.data)
  //   })
  // })
// Axios本身返回的也是promise
  return Axios.post(url, data, config)
}
