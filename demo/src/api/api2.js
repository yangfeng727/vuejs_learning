/**
 * 封装axios请求方法
 */
import axios from 'axios'
// import Cookies from 'js-cookie'
import qs from 'qs'
import {errorAlert, loading} from './msgDig' // 弹窗
import i18n from '../locales/index'
import {getRouter} from '../router' // 引入路由实例
const router = getRouter()

let globalObj = {
  offLoad: true, // 显示loading提示
  offMsg: true, // 是否显示错误提示
  checkLogin: true // 是否验证登陆-没有登陆则跳转回登陆界面
}

let msgObj = { // 防止错误提示混乱，使用键值对保证提示的是当前请求
  del (key) { // 删除key的方法
    this[key] && (delete this[key])
  }
}

/**
 *  对象是否为空
 * */
// let isEmptyObj = function (obj) {
//   for (let x in obj) {
//     return true
//   }
//   return false
// }
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
    config.url = URL + '/api' + config.url
    // 显示loading
    if (globalObj.offLoad) {
      loading.loadingAlert()
    }
    // 当前请求需要显示错误提示
    if (globalObj.offMsg) {
      msgObj[config.url] = true // 写入当前需要显示错误提示的请求
    }

    //在所有请求头部添加语言
    let lang = window.i18n = i18n
    config.headers['Accept-Language'] = lang.locale
    // config.headers.Authorization = lang;

    // config.cancelToken = new CancelToken((c) => { // cancelToken的使用，取消请求
    //   // cancel = c; // 本来是这样调用
    //   removePending(config, c)
    // })
    /* 检查权限,添加授权码 */
    // if (Cookies('authCode')) {
    //   /*       config.headers.post['Authorization'] = Cookies('authCode');
    //            config.headers.get['Authorization'] = Cookies('authCode'); */
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  })

/**
 * 添加响应拦截器
 */
Axios.interceptors.response.use(res => {
  // 移除loading
  if (globalObj.offLoad) {
    loading.removeLoading()
    globalObj.offLoad = true
  }
  // removePending(res.config) // 不管成功与否都从记录中移除请求记录
  /*  检查授权码是否过期 */
  switch (res.data.retCode) {
    case '00': // 成功
      break
    case '8000': // 重新登陆
      if (globalObj.checkLogin) {
        let redirect = router.currentRoute.fullPath
        setTimeout(() => {
          router.replace({name: 'login', query: {goBack: redirect}})
        }, 2000)
      }
    case '01': // 失败
    case '02': // 参数错误
    case '99': // 系统繁忙，请稍后再试
    case '8008': // 系统繁忙，请稍后再试
    default:
      if (msgObj[res.config.url]) { // 错误提示
        errorAlert(res.data ? res.data.retMsg : '')
      }
      break
    // case '0003': // token失效
    //   return res
  }
  msgObj.del(res.config.url) // 统一移除当前错误标识

  // 其他状态直接返回
  return res.data
}, error => {
  // 移除loading
  if (globalObj.offLoad) {
    loading.removeLoading()
  }

  if (msgObj[error.config.url]) { // 错误提示
    errorAlert(i18n.t('tips.serverConFail'))
  }
  msgObj.del(error.config.url) // 统一移除当前错误标识
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
  // return Promise.resolve(error)
  return Promise.reject(error)
})

/**
 *  统一变量处理
 *  @offMsg 是否关闭错误提示弹窗
 *  @offLoad 是否关闭消息loading提示
 *  @checkLogin 是否检验登陆
 * */
let dealVariable = ({offMsg, offLoad, checkLogin}) => {
  globalObj = {
    offMsg,
    offLoad,
    checkLogin
  }
}

/**
 *  get的网络请求
 *  @config 其他配置
 *  @offMsg 是否关闭错误提示弹窗
 *  @offLoad 是否关闭消息loading提示
 *  @checkLogin 是否检验登陆
 */
export function $httpGET ({url, data = {}, config = {}, offMsg = true, offLoad = true, checkLogin = true}) {
  dealVariable({offMsg, offLoad, checkLogin})

  return Axios.get(`${url}?_t=${new Date().getTime()}`, {params: data}, config)
}

/**
 *  提交JSON格式的网络请求
 *  @config 其他配置
 *  @offMsg 是否关闭错误提示弹窗
 *  @offLoad 是否关闭消息loading提示
 *  @checkLogin 是否检验登陆
 */
export function $httpPOST ({
                             url = '',
                             data = {},
                             config = {
                               headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'},
                               transformRequest: [function (data) {
                                 data = qs.stringify(data)
                                 return data
                               }]
                             },
                             offMsg = true,
                             offLoad = true,
                             checkLogin = true
                           }) {
  dealVariable({offMsg, offLoad, checkLogin})

  return Axios.post(`${url}?_t=${new Date().getTime()}`, data, config)
}

/**
 *  提交表单形式的网络请求 一般表单
 */
export function $httpForm (url, data = {}, config = {}) {
  return Axios.post(url, data, {
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
  })
}
