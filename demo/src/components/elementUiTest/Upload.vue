<template>
  <div>
    <el-upload :url-val.sync="model.upload"/>
    <!--自定义上传3-->
    <div>
      <input type="file" @change="changeImg" accept="image/jpg,image/jpeg"/>
      <el-button type="primary" @click="submitImg">保 存</el-button>
    </div>
  </div>
</template>

<script>
  import ElUpload from './common/ElUpload'

  export default {
    name: 'upload',
    components: {
      ElUpload
    },
    data: function () {
      return {
        model: {
          img: ''
        }
      }
    },
    beforeCreate: function () {
      // let caseId = this.$route.params.caseId
      // this.$getJson({
      //   url: '/identityVerification/detail.do?caseId=' + caseId,
      //   callback: function (vue, ret) {
      //     vue.content = ret['content']
      //   }
      // })
    },
    methods: {
      changeImg (e) {
        let fil = e.target.files[0]
        let bool = false
        !fil.type && (bool = true)
        fil.type.toUpperCase().indexOf('JPG') > 0 && (bool = true)
        fil.type.toUpperCase().indexOf('JPEG') > 0 && (bool = true)
        if (!bool) {
          this.$warningMessage('只能上传jpg格式！')
          return
        }
        // if (fil.size > 5*1024*1024) {
        //   alert('请选择5M以内的图片！');
        //   return false
        // }
        let self = this
        let reader = new FileReader()
        reader.onloadend = (re) => {
          console.log(re.target.result)
          self.model.img = re.target.result
        }
        reader.onerror = (e) => {
          this.$errorMessage('文件上传失败，请重试！')
        }
        reader.readAsDataURL(fil)
      },
      /**
       *  上传图片
       * */
      submitImg () {
        let img = this.model.img.split('base64,')[1]
        console.log(img)
        // this.$httpPOST({
        //   url: this.$xhrConfig.main.uploadimg,
        //   data: {
        //     img: img
        //   }
        // }).then((res) => {
        //   if (res.sus) {
        //     this.imgVisible = false
        //     this.$successMessage(res.msg)
        //     // 图片需要审核才更新
        //     // this.getPortraitImg()
        //   }
        // })
      }
    }
  }
</script>

<style scoped lang="less">
</style>
