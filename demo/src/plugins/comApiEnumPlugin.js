/**
 * 一些公用请求数据的方法,主要是枚举类获取
 */
let commonPlugin = {}
commonPlugin.install = function (Vue, options) {
  // 存储多次调用的数据
  let gblData = {}
  /**
   * 公共获取枚举类方法,返回值都为 " 对象 "
   * 说明:数据只获取一次,然后存储在gblData中
   * @self 当前vue对象，调用_$getJson方法
   * @obj 第二个参数，包含请求相关信息
   * @everyTime 是否每次都要重新获取
   * */
  let getEnumData = function (self, {callback, url, str}, everyTime = false) {
    if (!everyTime && gblData[str]) {
      let data = {...gblData[str]} // 一层深拷贝
      callback && callback(data)
    } else {
      self._$getJson({
        url,
        callback: function (vue, res) {
          if (res.content) {
            gblData[str] = res.content
            callback && callback(gblData[str])
          }
        }
      })
    }
  }
  /**
   *  获取角色
   * */
  Vue.prototype.$getRoleTypeMapFn = function (callback) {
    let str = 'roleTypeMap' // 字段名
    getEnumData(this, {url: '/adminUser/roleTypeList.do', str, callback})
  }
}
export default commonPlugin
