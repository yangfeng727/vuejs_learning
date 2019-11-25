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

  // 判断是否是图片
  Vue.prototype.$checkIsImg = function (str) {
    if (typeof str === 'string') {
      return (str.match(/\.(jpeg|jpg|gif|png|svg)$/) != null)
    }
    return str
  }

  // 判断是否是excel
  Vue.prototype.$checkIsXls = function (str) {
    if (typeof str === 'string') {
      return (str.match(/\.(xlsx|xls)$/) != null)
    }
    return str
  }

  // 判断是否是word
  Vue.prototype.$checkIsDoc = function (str) {
    if (typeof str === 'string') {
      return (str.match(/\.(docx|doc)$/) != null)
    }
    return str
  }

  // 判断是否是ppt
  Vue.prototype.$checkIsPpt = function (str) {
    if (typeof str === 'string') {
      return (str.match(/\.(ppt|pptx)$/) != null)
    }
    return str
  }

  // 判断是否是压缩包
  Vue.prototype.$checkIsRar = function (str) {
    if (typeof str === 'string') {
      return (str.match(/\.(rar|zip|7z)$/) != null)
    }
    return str
  }

  // 截取http文件地址，返回文件名称
  Vue.prototype.$getFileName = function (url) {
    if (typeof url === 'string') {
      let str = url.split('/')
      return str[str.length - 1]
    }
    return url
  }

  Vue.prototype.$imgHtML = function (value) {
    if (typeof value === 'string' && this.$checkIsImg(value)) {
      return '<a href="' + value + '" target="_blank"><img style="max-width: 200px;max-height: 117px" src="' + value + '"></a>'
    }
    return value
  }

  /**
   *  获取当前文件对应显示图片的名称如ppt文件返回/static/icon/fu_ppt.gif
   * */
  Vue.prototype.$FIName = function (url) {
    let str = ''
    if (this.$checkIsXls(url)) { // excel
      str = 'fu_exl.gif'
    } else if (this.$checkIsDoc(url)) { // doc
      str = 'fu_doc.gif'
    } else if (this.$checkIsPpt(url)) { // ppt
      str = 'fu_ppt.gif'
    } else if (this.$checkIsRar(url)) { // zip
      str = 'fu_rar.gif'
    }
    if (str !== '') {
      return `/static/icon/${str}`
    }
    return str
  }

  /**
   *  判断文件类型，并显示相应的图片 文件名称
   * */
  /**
   *  判断文件类型，并显示相应的图片 文件名称
   * */
  Vue.prototype.$downloadFile = function (url) {
    if (typeof url !== 'string') {
      return url
    }
    let fileName = this.$getFileName(url) // 文件名称
    let content = ''
    if (this.$checkIsImg(url)) { // 图片
      content = `<img src="${url}" style="width:40px;height:40px;"/>`
    } else {
      let str = this.$FIName(url)
      if (str !== '') {
        content = `<img src="${str}" style="width:32px;height:32px;"/> ${fileName}`
      } else {
        content = `<i class="el-icon-document"></i> ${fileName}`
      }
    }
    return `<a href="${url}" download target="_blank" style="margin-right:5px;">${content}</a>`
  }
}
export default commonPlugin
