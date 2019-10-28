/**
 * 一些公用方法
 */
let commonPlugin = {}
commonPlugin.install = function (Vue, options) {
  /**
   *  页面charts resize
   * */
  let reCharts = {
    /**
     * 页面echarts resie
     * */
    resizeCharts () {
      let echarts = require('echarts/lib/echarts') // 引入基本模板
      let $echartsDoms = document.querySelectorAll('[_echarts_instance_]')
      let einstance = null

      for (let i = 0, len = $echartsDoms.length; i < len; i++) {
        einstance = echarts.getInstanceByDom($echartsDoms[i])
        if (einstance && einstance.resize) {
          einstance.resize()
        }
      }
    },
    /**
     *  window resize时resize 所有的echarts
     * */
    windowResizeECharts () {
      // 页面echarts resize
      let timer
      let _this = this
      window.onresize = function () {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }

        timer = setTimeout(function () {
          _this.resizeCharts()
        }, 500)
      }
    }
  }

  Vue.prototype.$reCharts = reCharts

  /**
   * 获取图片的容错处理
   * @name 图片名称
   * @path 图片的路径
   * @defaultName 默认图片
   * */
  Vue.prototype.$getImg = function (name, path = 'img/icon/', defaultName = 'default') {
    let thisImg = ''
    try {
      thisImg = require(`@/assets/${path}${name}.png`)
    } catch (e) {
      defaultName && (thisImg = require(`@/assets/${path}${defaultName}.png`))
    }
    return thisImg
  }

  /**
   *  当前对象是否为空对象
   * */
  Vue.prototype.$isEmptyObj = function (obj) {
    for (let x in obj) {
      return false
    }
    return true
  }
}
export default commonPlugin
