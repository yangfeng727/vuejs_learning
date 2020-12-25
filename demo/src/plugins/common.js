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

  // 对象获取值
  Vue.prototype.$getObjVal = function (obj, key) {
    return obj && obj[key] ? obj[key] : ''
  }

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

  // let globIndex = 0
  // a标签download实现下载 base64图片文件下载
  Vue.prototype.$aDownload = function (imgUrlBase64) {
    // 这里是获取到的图片base64编码,这里只是个例子哈，要自行编码图片替换这里才能测试看到效果
    // const imgUrl = 'data:image/png;base64,...'
    // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
    if (window.navigator.msSaveOrOpenBlob) {
      window.downloadbase64IE = function (imgUrlBase64) {
        // 截取base64的数据内容（去掉前面的描述信息，类似这样的一段：data:image/png;base64,）并解码为2进制数据
        let bstr = atob(imgUrlBase64.split(',')[1])
        // 获取解码后的二进制数据的长度，用于后面创建二进制数据容器
        let n = bstr.length
        // 创建一个Uint8Array类型的数组以存放二进制数据
        let u8arr = new Uint8Array(n)
        // 将二进制数据存入Uint8Array类型的数组中
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        // 创建blob对象
        let blob = new Blob([u8arr])
        // 调用浏览器的方法，调起IE的下载流程
        window.navigator.msSaveOrOpenBlob(blob, 'default' + '.' + 'png')
      }
      // 这里得用encodeURIComponent转换base64，不然会提示字符错误
      return `<a onclick="downloadbase64IE(decodeURIComponent('${encodeURIComponent(imgUrlBase64)}'))"><img style="max-width: 200px;max-height: 117px" src="${imgUrlBase64}"></a>`
    } else {
      // 这里就按照chrome等新版浏览器来处理
      // const a = document.createElement('a')
      // a.href = imgUrl
      // a.setAttribute('download', 'chart-download')
      // a.click()
    }
    return `<a href="${imgUrlBase64}" download="default"><img style="max-width: 200px;max-height: 117px" src="${imgUrlBase64}"></a>`
  }

  //  base64/图片地址 显示
  Vue.prototype.$rImg = function (val) {
    if (!val) return ''
    if (typeof val === 'string') {
      if (this.$checkIsImg(val)) { // 图片地址直接显示
        return '<a href="' + val + '" target="_blank"><img style="max-width: 200px;max-height: 117px" src="' + val + '"></a>'
      } else { // base64图片显示
        let _src = 'data:image/png;base64,' + val
        // return '<a href="' + _src + '" download><img style="max-width: 200px;max-height: 117px" src="' + _src + '"></a>'
        return this.$aDownload(_src)
      }
    }
    return val
  }

  // 显示返回的图片（图片数组，字符串）=》显示图片
  Vue.prototype.$imgHtML = function (value) {
    let str = ''
    // 返回的图片是数组形式
    if (Object.prototype.toString.call(value) === '[object Array]') {
      value.map((item) => {
        str += this.$rImg(item) + '<br/>'
      })
    } else {
      str = this.$rImg(value)
    }
    return str
    // if (typeof value === 'string' && this.$checkIsImg(value)) {
    //   return '<a href="' + value + '" target="_blank"><img style="max-width: 200px;max-height: 117px" src="' + value + '"></a>'
    // }
    // return value
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
    } else if (this.$checkIsImg(url)) { // 图片
      return url // 返回当前图片地址
    }
    if (str !== '') {
      return `/static/icon/${str}`
    }
    return str
  }

  /**
   *  判断文件类型excel,word,png等，并显示相应的图片 文件名称
   * */
  Vue.prototype.$downloadFile = function (url) {
    if (typeof url !== 'string' || url === '') {
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
      } else { // 默认显示的文件图标
        content = `<i class="el-icon-document"></i> ${fileName}`
      }
    }
    return `<a href="${url}" download target="_blank" style="margin-right:5px;">${content}</a>`
  }

  // 详情页返回的数据，本来为对象，却返回null造成页面渲染失败  按照defaultObj的初始格式来给mergObj设置初值
  Vue.prototype.$objMerge = function (defaultObj, mergObj) {
    for (let x in mergObj) {
      if (!mergObj[x]) {
        if (Object.prototype.toString.call(defaultObj[x]) === '[object Array]') {
          mergObj[x] = []
        } else if (Object.prototype.toString.call(defaultObj[x]) === '[object Object]') {
          mergObj[x] = {}
        }
      }
    }
    return mergObj
  }

  // canvas下载图片
  Vue.prototype.$saveImg = function () {
    let canvas = document.querySelector('.qrcode canvas')
    let url = canvas.toDataURL('image/png')
    let oA = document.createElement('a')
    oA.download = '二维码.png' // 设置下载的文件名，默认是'下载'
    oA.href = url
    document.body.appendChild(oA)
    oA.click()
    oA.remove() // 下载之后把创建的元素删除
  }

  /**
   * js根据节点名称，查找某节点的特定父节点
   * @className 父节点中含有当前class的节点
   * */
  Vue.prototype.$getParentNode = function (node, className) {
    if (!node) return ''
    if (node.nodeName == 'BODY') return node
    let tnode = node.parentNode
    let cName = tnode.getAttribute('class')
    if (cName === className) return tnode
    return this.getParentNode(tnode, className)
  }
  /**
   * js根据节点名称，查找某节点的特定子节点
   * @className 子节点中含有当前class的节点
   * */
  Vue.prototype.$getChildrenNode = function (node, className) {
    if (!node) return ''
    let tnode = node.children
    if (!tnode || !tnode.length) return ''
    for (let i = 0; i < tnode.length; i++) {
      let item = tnode[i]
      let cName = item.getAttribute('class')
      if (cName === className) return item
      let findNode = this.getChildrenNode(item, className)
      if (findNode) {
        return findNode
      }
    }
    return ''
  }
}
export default commonPlugin
